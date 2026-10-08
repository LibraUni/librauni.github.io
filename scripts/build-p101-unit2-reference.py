"""Render the Unit 2 web/PDF reference from one data source."""
from pathlib import Path
import json,re,html
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,Flowable,Image
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
root=Path(__file__).resolve().parents[1]
font=Path('/Users/iker/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/fonts/DejaVuSans.ttf')
if not font.exists():font=Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf')
pdfmetrics.registerFont(TTFont('Reference',str(font)))
data=json.loads((root/'content/p101/unit2-reference.json').read_text())
M='http://www.w3.org/1998/Math/MathML'
xbar='<mover><mi>x</mi><mo>¯</mo></mover>'
x1='<msub><mi>x</mi><mn>1</mn></msub>';xn='<msub><mi>x</mi><mi>n</mi></msub>'
mean=xbar+'<mo>=</mo><mfrac><mrow>'+x1+'<mo>+</mo><mo>⋯</mo><mo>+</mo>'+xn+'</mrow><mi>n</mi></mfrac>'
rang='<mi>R</mi><mo>=</mo><msub><mi>x</mi><mtext>max</mtext></msub><mo>−</mo><msub><mi>x</mi><mtext>min</mtext></msub>'
dev='<mi>D</mi><mo>=</mo><mfrac><mrow><mo fence="true" stretchy="true">|</mo>'+x1+'<mo>−</mo>'+xbar+'<mo fence="true" stretchy="true">|</mo><mo>+</mo><mo>⋯</mo><mo>+</mo><mo fence="true" stretchy="true">|</mo>'+xn+'<mo>−</mo>'+xbar+'<mo fence="true" stretchy="true">|</mo></mrow><mi>n</mi></mfrac>'
web='<section class="chapter" id="P101-U02-L05-S06"><h2>2.30 Unit 2 reference and conclusion</h2><p>Version '+data['version']+' · '+data['date']+'. <a href="/teaching/p101/P101-Unit-2-Reference.pdf" download>Download the matching printable reference PDF</a>. Recall the central distinctions, understand how to reconstruct the formulas, and consult the practical details when needed.</p>'
for i,page in enumerate(data['pages']):
 web+='<h3>'+page['title']+'</h3><p>'+page['intro']+'</p>'
 if i==1:
  for name,formula in [('Arithmetic mean',mean),('Range',rang),('Mean absolute deviation about the mean',dev)]:web+='<p><strong>'+name+'</strong></p><div class="equation" tabindex="0" role="region" aria-label="'+name+' formula; scroll horizontally if needed"><math xmlns="'+M+'" display="block">'+formula+'</math></div>'
 web+='<div class="l5-table" tabindex="0" role="region" aria-label="'+page['title']+' reference table; scroll horizontally if needed"><table><caption>'+page['title']+'</caption><thead><tr><th scope="col">Idea</th><th scope="col">Method and conditions</th></tr></thead><tbody>'
 for title,body in page['rows']:web+='<tr><th scope="row">'+html.escape(title)+'</th><td>'+html.escape(body)+'</td></tr>'
 web+='</tbody></table></div>'
web+='<h3>From readings to evidence</h3><p>'+data['conclusion']+'</p><p>Continue to the <a href="/learn/physics/stage-1/p101/b01/u03/">Unit 3 outline</a> when ready. Publishing this unit makes its teaching available; your investigation and corrections remain your own learning work.</p></section>'
p=root/'content/p101/unit2-lesson5.html';s=p.read_text()
if '<!-- UNIT2_REFERENCE -->' in s:s=s.replace('<!-- UNIT2_REFERENCE -->',web)
else:s=re.sub(r'<section class="chapter" id="P101-U02-L05-S06">.*?</section>',lambda _:web,s,flags=re.S)
p.write_text(s)
body=ParagraphStyle('body',fontName='Reference',fontSize=9,leading=13,textColor=colors.HexColor('#203d48'),spaceAfter=4)
heading=ParagraphStyle('heading',parent=body,fontSize=18,leading=24,spaceAfter=8)
subhead=ParagraphStyle('subhead',parent=body,fontSize=13,leading=18,spaceAfter=7)
def para(t,style=body):return Paragraph(html.escape(t).replace('\n','<br/>'),style)
class FormulaPanel(Flowable):
 """Vector typesetting: real fraction bars, explicit subscripts and overbars."""
 def __init__(self):Flowable.__init__(self);self.width=500;self.height=118
 def draw(self):
  c=self.canv;c.setFillColor(colors.HexColor('#203d48'));c.setStrokeColor(colors.HexColor('#203d48'))
  def token(text,x,y,size=12):c.setFont('Reference',size);c.drawString(x,y,text);return x+pdfmetrics.stringWidth(text,'Reference',size)
  def xsub(x,y,label):x=token('x',x,y);return token(label,x,y-3,8)+2
  def bar(x,y):z=token('x',x,y);c.line(x,y+11,z,y+11);return z
  # mean
  bar(5,94);token(' =',16,94);x=65;x=xsub(x,104,'1');x=token(' + ... + ',x,104);x=xsub(x,104,'n');c.line(61,100,x+4,100);token('n',(61+x)/2-3,84)
  # range
  token('R =',5,53);x=xsub(61,53,'max');x=token(' - ',x,53);xsub(x,53,'min')
  # average absolute deviation
  token('D =',5,14);x=65
  for k,label in enumerate(['1','n']):
   if k:x=token(' + ... + ',x,25)
   x=token('|',x,25);x=xsub(x,25,label);x=token(' - ',x,25);x=bar(x,25);x=token('|',x,25)
  c.line(61,21,x+4,21);token('n',(61+x)/2-3,5)

def footer(c,doc):
 c.saveState();c.setFont('Reference',7);c.setFillColor(colors.HexColor('#52636a'));c.drawString(42,27,'P101 Unit 2 | v1.0 | 8 October 2026 | CC BY-NC-SA 4.0; code MIT')
 c.drawRightString(A4[0]-42,27,str(doc.page));c.drawString(42,16,'LibraUni branding excluded. Full explanation and source context in the online lessons.');c.restoreState()
story=[]
for i,page in enumerate(data['pages']):
 if i:story.append(PageBreak())
 if i==0:
  logo=Image(str(root/'public/brand/librauni-symbol-transparent.png'),width=42,height=29,kind='proportional')
  brand=Table([[logo,para('LibraUni',heading)]],colWidths=[52,459]);brand.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE')]));story.extend([brand,para('KNOWLEDGE PURSUED FREELY'),Spacer(1,6)])
 story.extend([para('P101 | Unit 2 | Quick reference',heading),para(data['title']),para(page['title'],subhead),para(page['intro']),Spacer(1,7)])
 if i==1:story.extend([FormulaPanel(),Spacer(1,8)])
 rows=[[para(t),para(b)] for t,b in page['rows']]
 table=Table(rows,colWidths=[118,393]);table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(0,-1),colors.HexColor('#edf3ef')),('LEFTPADDING',(0,0),(-1,-1),8),('RIGHTPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#cad5d1'))]));story.append(table)
 if i==0:story.extend([Spacer(1,12),para('Readings are evidence only when their quantity, method and history remain visible.')])
 if i==2:story.extend([Spacer(1,12),para('Use alongside Lessons 1-5, the investigation notebook and Unit 2 exercises. The reference is a lookup aid, not a substitute for the worked reasoning.'),para('librauni.github.io/learn/physics/stage-1/p101/b01/u02/')])
out=root/'public/teaching/p101/P101-Unit-2-Reference.pdf'
SimpleDocTemplate(str(out),pagesize=A4,leftMargin=42,rightMargin=42,topMargin=30,bottomMargin=46,title='P101 Unit 2 Quick Reference',author='LibraUni').build(story,onFirstPage=footer,onLaterPages=footer)
print(out)
