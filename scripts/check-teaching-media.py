#!/usr/bin/env python3
"""Structural checks only. Run on every changed teaching fragment before release."""
from html.parser import HTMLParser
from pathlib import Path
import re, sys
class Check(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True); self.path=path; self.fig=None; self.cap=False; self.errors=[]; self.figures=0; self.images=0; self.numbers=[]
    def fail(self, msg): self.errors.append(f'{self.path}: {msg}')
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='figure':
            if self.fig is not None:self.fail('nested figure')
            self.fig={'caption':'','images':0,'links':0};self.figures+=1
        if tag=='figcaption':self.cap=True
        if tag=='a' and self.cap and self.fig is not None:self.fig['links']+=1
        if tag=='img':
            self.images+=1
            if not a.get('alt','').strip():self.fail('image missing meaningful alt text')
            if not a.get('width') or not a.get('height'):self.fail('image missing intrinsic dimensions')
            src=a.get('src','')
            if not src:self.fail('image missing source')
            if src.startswith('/') and not (Path('public')/src.lstrip('/')).is_file():self.fail('missing local image '+src)
            if self.fig is None:self.fail('teaching image outside captioned figure')
            else:self.fig['images']+=1
    def handle_data(self,s):
        if self.cap and self.fig is not None:self.fig['caption']+=s
    def handle_endtag(self,tag):
        if tag=='figcaption':self.cap=False
        if tag=='figure' and self.fig is not None:
            c=self.fig['caption'].strip(); m=re.match(r'Figure\s+([A-Za-z0-9.]+)\s+',c)
            if not m:self.fail('missing numbered figure caption')
            else:
                if m[1] in self.numbers:self.fail('duplicate figure number '+m[1])
                self.numbers.append(m[1])
            if len(c.split())<10:self.fail('caption needs explanatory editorial review')
            if self.fig['images'] and ('Credit:' not in c or self.fig['links']<2):self.fail('image needs credit/source and reuse links')
            self.fig=None
if len(sys.argv)<2:sys.exit('Supply the changed teaching HTML fragments; this is not a whole-programme quality certificate.')
errors=[]
for name in sys.argv[1:]:
    c=Check(name);c.feed(Path(name).read_text());errors+=c.errors
    print(f'{name}: {c.figures} figures, {c.images} sourced images')
    if not c.images:print('  EDITORIAL REVIEW REQUIRED: no sourced imagery; confirm illustrated richness against M101, do not infer an exemption.')
if errors:sys.exit('\n'.join(errors))
print('Structural checks passed. Source accuracy, reuse and comparative visual/editorial review are still required.')
