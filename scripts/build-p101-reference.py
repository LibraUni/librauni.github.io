"""Build matched concise web/PDF references from one shared source."""
from pathlib import Path
import html,json,re,xml.etree.ElementTree as ET
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,Image,Preformatted,KeepTogether
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
root=Path(__file__).resolve().parents[1]
fonts=[Path('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'),Path('/Users/iker/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/fonts/DejaVuSans.ttf')]
font=next((p for p in fonts if p.exists()),None)
if font is None:raise RuntimeError('Install DejaVu Sans or configure its path for this reference renderer.')
pdfmetrics.registerFont(TTFont('Reference',str(font)))
style=ParagraphStyle('body',fontName='Reference',fontSize=9,leading=13,textColor=colors.HexColor('#243740'),spaceAfter=4)
heading=ParagraphStyle('heading',parent=style,fontSize=17,leading=22,spaceAfter=6)
section=ParagraphStyle('section',parent=style,fontSize=11,leading=15,spaceBefore=10,spaceAfter=6)
code=ParagraphStyle('code',fontName='Courier',fontSize=8.5,leading=12,textColor=colors.HexColor('#243740'))
def flatten(el):
 tag=el.tag.split('}')[-1];kids=list(el)
 if tag=='msub':return flatten(kids[0])+'<sub>'+flatten(kids[1])+'</sub>'
 if tag=='mspace':return ' '
 if tag=='mo':return ' '+(el.text or '')+' '
 return (el.text or '')+''.join(flatten(k) for k in kids)
def fmt(text):
 text=re.sub(r'<math.*?</math>',lambda m:flatten(ET.fromstring(m[0])),text)
 return text.replace('−','-').replace('x₀','x<sub>0</sub>').replace('t₀','t<sub>0</sub>')
def p(t,st=style):return Paragraph(fmt(t),st)
data=json.loads((root/'content/p101/unit1-reference.json').read_text())
web='<section class="chapter" id="P101-U01-L06-S05"><h2>1.35 Unit 1 reference</h2>\n<p>A quick lookup sheet. <a href="/teaching/p101/P101-Unit-1-Reference.pdf" download>Download the printable reference</a>.</p>\n<h3>Physics</h3><dl class="reference-physics">'
for label,value in data['physics']:web+='<dt>'+label+'</dt><dd>'+value+'</dd>'
web+='</dl><p>'+data['reminder']+'</p><h3>Python · Consult</h3><div class="reference-code-grid">'
for item in data['python']:web+='<div><h4>'+item['title']+'</h4><pre><code class="language-python">'+html.escape(item['code'])+'</code></pre></div>'
web+='</div><ul>'+''.join('<li>'+html.escape(n)+'</li>' for n in data['notes'])+'</ul></section>'
lesson=root/'content/p101/lesson6.html'
lesson.write_text(re.sub(r'<section class="chapter" id="P101-U01-L06-S05">.*?</section>',lambda _:web,lesson.read_text(),flags=re.S))
logo=Image(str(root/'public/brand/librauni-symbol-transparent.png'),width=42,height=29,kind='proportional')
brand=Table([[logo,p('LibraUni',heading)]],colWidths=[52,459]);brand.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE')]))
story=[brand,p('KNOWLEDGE PURSUED FREELY'),Spacer(1,8),p('P101 · Unit 1 · Quick reference',heading),p('Physical quantities and executable models · Version 1.1 · 3 October 2026'),p('Physics',section)]
rows=[[p(label),p(value)] for label,value in data['physics']]
table=Table(rows,colWidths=[130,381]);table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#d3dedd'))]))
story.extend([table,Spacer(1,7),p(data['reminder']),p('Python · Consult',section)])
cards=[[p(i['title']),Preformatted(i['code'],code),Spacer(1,9)] for i in data['python']]
rows=[[cards[0],cards[1]],[cards[2],cards[3]],[cards[4],[]]]
table=Table(rows,colWidths=[255.5,255.5]);table.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(-1,-1),colors.HexColor('#f1f5f4')),('LEFTPADDING',(0,0),(-1,-1),9),('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),2)]))
story.extend([table,Spacer(1,8)]+[p(html.escape(n)) for n in data['notes']])
def footer(canvas,doc):
 canvas.saveState();canvas.setFont('Reference',7);canvas.setFillColor(colors.HexColor('#777777'));canvas.drawString(42,24,'CC BY-NC-SA 4.0 · Code MIT · LibraUni branding excluded.');canvas.linkURL('https://creativecommons.org/licenses/by-nc-sa/4.0/',(42,22,125,32),relative=0);canvas.restoreState()
target=root/'public/teaching/p101/P101-Unit-1-Reference.pdf'
SimpleDocTemplate(str(target),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=28,bottomMargin=42,title='P101 Unit 1 Quick Reference',author='LibraUni').build(story,onFirstPage=footer,onLaterPages=footer)
print(target)
