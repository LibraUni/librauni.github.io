from pathlib import Path
import json,html,re
R=Path(__file__).resolve().parents[1]
def esc(s):return html.escape(str(s))
def mi(s):return '<mi>'+s+'</mi>'
def mn(s):return '<mn>'+str(s)+'</mn>'
def op(s):return '<mo>'+s+'</mo>'
def sub(s,t):return '<msub>'+mi(s)+'<mtext>'+t+'</mtext></msub>'
def frac(a,b):return '<mfrac><mrow>'+a+'</mrow><mrow>'+b+'</mrow></mfrac>'
def math(s):return '<math xmlns="http://www.w3.org/1998/Math/MathML">'+s+'</math>'
def eq(s):return '<div class="equation" tabindex="0" role="region" aria-label="Calculation; scroll horizontally if needed">'+math(s)+'</div>'
def unit(s):return '<mspace width="0.2em"/><mtext>'+s+'</mtext>'
def code(s):return '<pre><code class="language-python">'+esc(s)+'</code></pre>'
def details(label,s):return '<details><summary>'+label+'</summary>'+s+'</details>'
def p(s):return '<p>'+s+'</p>'
def table(caption,headers,rows):return '<div class="l5-table" tabindex="0" role="region" aria-label="'+caption+'; scroll horizontally if needed"><table><caption>'+caption+'</caption><thead><tr>'+''.join('<th scope="col">'+h+'</th>' for h in headers)+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+str(c)+'</td>' for c in row)+'</tr>' for row in rows)+'</tbody></table></div>'
def activity(n,title,prompt,hint,solution):return f'<div class="activity" id="p101-u03-activity-{n}"><h4>Activity 3.{n} · {title}</h4>'+prompt+details(f'Hint for Activity 3.{n}',hint)+details(f'Discussion of Activity 3.{n}',solution)+'</div>'
def example(n,title,s):return f'<div class="example" id="p101-u03-example-{n}"><h4>Example 3.{n} · {title}</h4>'+s+'</div>'
def section(n,title,s):return f'<section class="chapter" id="P101-U03-L05-S{n:02}"><h2>3.{24+n} {title}</h2>'+s+'</section>'
def figure(n,file,alt,caption,cls='generated-plot'):
 return f'<figure id="p101-u03-figure-{n}"><div class="diagram {cls}" tabindex="0" role="region" aria-label="{alt}; scroll horizontally if needed">[[FIG:{file}]]</div><figcaption><b>Figure 3.{n}.</b> {caption} <span class="media-credit">Original LibraUni figure · CC BY-NC-SA 4.0.</span></figcaption></figure>'

data=json.loads((R/"content/p101/unit3-reference.json").read_text())
rows=data["rows"];codesref=data["python"]
web=p('Version 1.0 · 12 October 2026. <a href="/teaching/p101/P101-Unit-3-Reference.pdf" download>Download the matching two-page reference PDF</a>. Recall the central results; understand their reasoning and limits; consult the practical details. Use this within your correction and review time.')
# Structured mathematical formulas replace the plain lookup notation in the web table.
formula={
'Elapsed time':math(op('Δ')+mi('t')+op('=')+sub('t','2')+op('−')+sub('t','1')+op('>')+mn(0))+'; unit s. Clock reading and elapsed time differ.',
'Average rates':math(sub('v','avg')+op('=')+frac(op('Δ')+mi('x'),op('Δ')+mi('t')))+'; average speed = '+math(frac('<mtext>total distance</mtext>',op('Δ')+mi('t')))+'. Include stops in the interval. Units m/s.',
'Constant-velocity model':math(sub('x','pred')+op('(')+mi('t')+op(')')+op('=')+sub('x','ref')+op('+')+mi('v')+op('(')+mi('t')+op('−')+sub('t','ref')+op(')'))+'. One fixed coordinate system; '+math(mi('v'))+' constant over the modelled interval.',
'Residual':math(mi('r')+op('=')+sub('x','observed')+op('−')+sub('x','predicted'))+', at the same time; unit m. Positive: observed position lies on positive side of prediction.',
'Position and change':math(mi('x'))+': position from a stated origin; chosen positive direction; unit m. '+math(op('Δ')+mi('x')+op('=')+sub('x','2')+op('−')+sub('x','1'))+'. A position is not a distance travelled.'}
web+=table('Unit 3 reference: ideas, conditions and methods',['Use','Idea','Result or condition'],[[k,t,formula.get(t,b)] for k,t,b in rows])
web+='<h3>Python lookup · Consult</h3>'+p('Previously taught patterns; inspect the source and expected shape before calculation. The selection excerpt assumes the clock readings have already passed Lesson 4’s finite-time check. Confirm increasing distinct times by inspection for these small records. Stop and inspect an empty selection.')
for title,c in codesref:web+='<h4>'+title+'</h4>'+code(c)
web+='<h3>What this block has established</h3>'+p('The unit began with a journey whose endpoint did not tell its whole story. Positions and times let us calculate changes; graphs made their relationships visible; models added explicit assumptions about what might happen between or beyond readings. Comparing predictions with observations then gave us evidence about those assumptions. Preserving the source and the calculation made that reasoning available to another reader.')+p('Across Block 1, quantities, measurement and computation have become parts of one argument. Units constrain a formula without proving it correct. Repeated measurements reveal spread without excluding a common bias. A successful program makes a procedure repeatable without making its physical interpretation true. These distinctions are productive: they tell us what to check next and what a careful conclusion can say now.')+p('The next block develops interactions to explain changes in motion. Continue to the <a href="/learn/physics/stage-1/p101/b02/u04/">Unit 4 outline</a> for that direction. TMA 01 will draw on Units 1–3 in its separate six-hour allocation; its task and permitted-assistance instructions remain to be released. Keep your investigation and corrections for your own study. Completing or checking this page does not submit an assessment or record attainment.')
web=section(6,'Reference and block conclusion',web)
footer='<section class="references" id="references"><h2>Further reading and context</h2>'+p('For optional technical lookup, return to the references in <a href="/learn/physics/stage-1/p101/b01/u03/l04/#references">Lesson 4</a>. They cover the file, array and notebook tools reused here. The Apollo photograph’s source and reuse terms are beside Figure 3.22. All required teaching and feedback are on this page.')+p('Original teaching, data and figures: CC BY-NC-SA 4.0. Code: MIT. The NASA photograph retains its separately stated terms. LibraUni branding is excluded. All numerical records in this lesson are invented teaching cases.')+'</section>'
pth=R/'content/p101/unit3-lesson5.html';s=pth.read_text();s=re.sub(r'<section class="chapter" id="P101-U03-L05-S06">.*$',lambda _:web+footer,s,flags=re.S);pth.write_text(s)
# Compact two-page PDF, sharing the data above with the web reference.
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,Preformatted,Image,Flowable
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
F=Path('/Users/iker/.cache/codex-runtimes/codex-primary-runtime/dependencies/native/poppler/poppler/fonts/DejaVuSans.ttf')
pdfmetrics.registerFont(TTFont('Ref',str(F)))
body=ParagraphStyle('body',fontName='Ref',fontSize=9.5,leading=14,textColor=colors.HexColor('#203d48'))
heading=ParagraphStyle('heading',parent=body,fontSize=17,leading=23,spaceAfter=7)
small=ParagraphStyle('small',parent=body,fontSize=8,leading=12)
subhead=ParagraphStyle('sub',parent=body,fontSize=11,leading=16,spaceBefore=8,spaceAfter=5)
def para(t,st=body):return Paragraph(t,st)
def identity():
 logo=Image(str(R/'public/brand/librauni-symbol-transparent.png'),width=39,height=29,kind='proportional')
 return Table([[logo,para('LibraUni<br/><font size="8">KNOWLEDGE PURSUED FREELY</font>',heading)]],colWidths=[50,465])
def foot(c,d):
 c.saveState();c.setFont('Ref',7.3);c.setFillColor(colors.HexColor('#64716d'));c.drawString(42,28,'P101 Unit 3 | v1.0 | 12 October 2026 | CC BY-NC-SA 4.0; code MIT; branding excluded.');c.drawRightString(A4[0]-42,16,f'{d.page} / 2');c.restoreState()
# Vector formula panel supplies true fractions and subscripts.
class Formulas(Flowable):
 def __init__(self):super().__init__();self.width=500;self.height=113
 def draw(self):
  c=self.canv;c.setFillColor(colors.HexColor('#203d48'));c.setStrokeColor(colors.HexColor('#203d48'))
  def t(s,x,y,z=11):c.setFont('Ref',z);c.drawString(x,y,s);return x+pdfmetrics.stringWidth(s,'Ref',z)
  def subf(s,k,x,y):x=t(s,x,y);return t(k,x,y-3,7.5)+2
  x=t('Δx = ',4,93);x=subf('x','2',x,93);x=t(' − ',x,93);subf('x','1',x,93)
  x=t('Δt = ',250,93);x=subf('t','2',x,93);x=t(' − ',x,93);x=subf('t','1',x,93);t(' > 0',x,93)
  t('Average velocity =',4,62);t('Δx',127,70);c.line(124,66,145,66);t('Δt',127,51)
  t('Average speed =',250,62);t('total distance',352,70);c.line(349,66,431,66);t('Δt',382,51)
  x=subf('x','pred',4,29);x=t('(t) = ',x,29);x=subf('x','ref',x,29);x=t(' + v(t − ',x,29);x=subf('t','ref',x,29);t(')',x,29)
  x=t('r = ',250,29);x=subf('x','observed',x,29);x=t(' − ',x,29);subf('x','predicted',x,29)
  t('Positions / m · times / s · rates / m/s · residuals / m',4,6,9)
story=[identity(),Spacer(1,8),para('P101 · Unit 3 · Quick reference',heading),para(data['title']),Spacer(1,9),Formulas(),Spacer(1,7)]
# Avoid repeating formula prose: keep conditions in compact rows.
pdfrows=data["compact_rows"]
rows2=[[para(esc(c),small) for c in row] for row in pdfrows];tb=Table(rows2,colWidths=[64,77,370]);tb.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'TOP'),('BACKGROUND',(0,0),(1,-1),colors.HexColor('#edf3ef')),('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#bdcec4'))]));story.append(tb)
story += [PageBreak(),identity(),Spacer(1,8),para('Unit 3 · Python lookup',heading),para('Consult · Previously taught patterns; no new syntax.',small),para('Inspect source identity, units, increasing distinct times and expected shape. Check finite clock readings before selecting pairs; inspect an empty selection.',small)]
cs=ParagraphStyle('code',fontName='Courier',fontSize=9,leading=12,backColor=colors.HexColor('#edf3ef'),borderPadding=8,spaceAfter=5)
for title,c in codesref:story += [para(title,subhead),Preformatted(c,cs)]
story.append(para('Restart and run all in order; check by hand; record actual versions and outcomes.',small))
SimpleDocTemplate(str(R/'public/teaching/p101/P101-Unit-3-Reference.pdf'),title="P101 Unit 3 Reference",author="LibraUni",pagesize=A4,rightMargin=42,leftMargin=42,topMargin=30,bottomMargin=44).build(story,onFirstPage=foot,onLaterPages=foot)
print('Web reference and PDF generated from shared definitions.')
