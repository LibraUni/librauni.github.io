# # M101 Unit 12 — Validation investigation
# Four hours of Python distributed across Lessons 2 (1 h), 3 (2 h) and 4 (1 h). Work through the matching teaching first. Predict, run, explain, then restart and run all cells. Starter cells run safely; add your investigation where prompted.
#
# Numerical pump units: t,T in minutes; a in L/min; b in L/min³; amount in L. Model interval 0–3 min, no outflow. Original code MIT; teaching CC BY-NC-SA 4.0; LibraUni branding excluded.

import sys
print("Python", sys.version)

# ## Lesson 2 — Activity 12.8 (60 min)
# Predict and tabulate a=2.98,3,3.02 at b=.25,T=3; then b=.245,.25,.255 at a=3,T=3. Keep fixed inputs explicit. Compare exact changes at T=2 for dT=-.1,.1,.5 against q(2)*dT. Explain an independently hand-checked row. Stay within 0–3 minutes.

def delivered(T, a=3.0, b=0.25):
    return a*T-b*T**3/3

baseline = delivered(3.0)
for a in [2.98, 3.0, 3.02]:
    print(a, delivered(3.0, a=a), delivered(3.0, a=a)-baseline)

# Add remaining input/time tables and your predictions here.


# ## Lesson 3 — Activity 12.11 (60 min)
# The following function is deliberately flawed. Predict a failing result before running it. Keep the original and write your repaired version in a separate cell. Check constants, shifted linear functions, reversed/zero intervals, invalid n, non-finite samples and the three-panel pump result. Explain which defect each test exposes. The lesson contains feedback after your attempt.

# Deliberately flawed: diagnose before using.
def suspect(f, u, v, n):
    h = (v-u)/n
    total = (f(u) + f(v))/2
    for i in range(n):
        total += f(i*h)
    return round(h*total, 2)

q1 = suspect(lambda t: 3-t*t/4, 0, 3, 100)
q2 = suspect(lambda t: 3-t*t/4, 0, 3, 200)
print("validated:", q1-q2 < 0.1)

# Define your repaired trapezoid function and tests here.


# ## Lesson 3 — Activity 12.12 (60 min)
# With your repaired function: predict and record n=3,6,12,24 at baseline. Compare each with the analytical amount. Separately hold n=24 and vary the input ranges from Lesson 2. Check an independent row. Explain numerical error versus input range, and what evidence is needed for a real-water claim within .01 L.

# Add resolution table, input table and checks here.


# ## Lesson 4 — Activity 12.14 (60 min)
# Supplied dimensionless response f(x)=1/(1+c*x), 0<=x<=2, with c in [.45,.55]. Baseline c=.5. Derive the analytical integral for c>0; benchmark at c=0 separately. Predict how the integral changes with c. Compare analytical and quadrature results at n=4,8,16,32. Include one hand panel, an absolute tolerance, a domain check and a fresh run. Write a short report distinguishing calculation evidence from assumptions. State any assistance used.
#
# This is formative work, not an extra TMA or evidence of attainment by itself.

# Add the response investigation here.


# ## Your report
# Quantity and domain:
#
# Predictions and independent benchmark:
#
# Observed results, tolerance and interpretation:
#
# Model/input limitations:
#
# Repair evidence and fresh-run status:
#
# Assistance used (if any):
