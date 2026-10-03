"""Render the shared Unit 1 reference entries with ReportLab; inspect every PDF page."""
from pathlib import Path
import json,re,xml.etree.ElementTree as ET
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Table,TableStyle,PageBreak,Image
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
style=ParagraphStyle('body',fontName='Reference',fontSize=9.4,leading=13,textColor=colors.HexColor('#243740'),spaceAfter=5)
heading=ParagraphStyle('heading',parent=style,fontSize=17,leading=22,spaceAfter=8)
small=ParagraphStyle('small',parent=style,fontSize=9,leading=12)
def flatten(el):
 tag=el.tag.split('}')[-1];kids=list(el)
 if tag=='msub':return flatten(kids[0])+'<sub>'+flatten(kids[1])+'</sub>'
 if tag=='mspace':return ' '
 if tag=='mo':return ' '+(el.text or '')+' '
 return (el.text or '')+''.join(flatten(k) for k in kids)
def fmt(text):
 text=re.sub(r'<math.*?</math>',lambda m:flatten(ET.fromstring(m[0])),text)
 return text.replace('&','&amp;').replace('<strong>','<b>').replace('</strong>','</b>').replace('−','-').replace('x₀','x<sub>0</sub>').replace('t₀','t<sub>0</sub>').replace('<br>','<br/>')
def p(t,st=style):return Paragraph(fmt(t),st)
rows=json.loads((root/'content/p101/unit1-reference.json').read_text())
target=root/'public/teaching/p101/P101-Unit-1-Reference.pdf';target.parent.mkdir(parents=True,exist_ok=True)
story=[]
for num,group in enumerate([rows[:6],rows[6:]],1):
 if num>1:story.append(PageBreak())
 logo=Image(str(root/'public/brand/librauni-symbol-transparent.png'),width=50,height=34,kind='proportional')
 brand=Table([[logo,p('LibraUni',heading)]],colWidths=[62,440]);brand.setStyle(TableStyle([('VALIGN',(0,0),(-1,-1),'MIDDLE')]))
 story.extend([brand,p('KNOWLEDGE PURSUED FREELY',small),Spacer(1,12),p('P101 · Unit 1 reference',heading),p('Physical quantities and executable models',style),p('Version 1.0 · 3 October 2026 · '+('Quantities, units and the model' if num==1 else 'Computation and interpretation'),small),p('<b>Recall</b> fluently · <b>Understand</b> the reasoning · <b>Consult</b> when needed.',small),Spacer(1,8)])
 data=[[p('<b>'+t+'</b>',small) for t in ['Use','Idea and relationship','Conditions / reminders']]]
 data += [[p(a,small),p('<b>'+b+'</b><br/>'+c),p(d)] for a,b,c,d in group]
 table=Table(data,colWidths=[67,217,227],repeatRows=1,hAlign='LEFT');table.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),colors.HexColor('#e8f0ed')),('VALIGN',(0,0),(-1,-1),'TOP'),('LEFTPADDING',(0,0),(-1,-1),7),('RIGHTPADDING',(0,0),(-1,-1),7),('TOPPADDING',(0,0),(-1,-1),9),('BOTTOMPADDING',(0,0),(-1,-1),9),('LINEBELOW',(0,0),(-1,-1),.4,colors.HexColor('#c8d2d3'))]));story.append(table)
def footer(canvas,doc):
 canvas.saveState();canvas.setFont('Reference',7);canvas.setFillColor(colors.HexColor('#777777'));canvas.drawString(42,24,'CC BY-NC-SA 4.0 · Code MIT · LibraUni branding excluded.');canvas.linkURL('https://creativecommons.org/licenses/by-nc-sa/4.0/',(42,22,125,32),relative=0);canvas.drawRightString(A4[0]-42,24,str(doc.page)+' / 2');canvas.restoreState()
SimpleDocTemplate(str(target),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=32,bottomMargin=42,title='P101 Unit 1 Reference',author='LibraUni').build(story,onFirstPage=footer,onLaterPages=footer)
print(target)
