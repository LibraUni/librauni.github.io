# # M101 Unit 9 · Checks that answer the question
#
# Part A: Lesson 5, 60 minutes. Part B: Lesson 6, 60 minutes. Standard Python only. Predict on paper, run from a fresh kernel, then explain the evidence. Deliberate errors are labelled. Save your own working copy. Original code MIT; teaching CC BY-NC-SA 4.0; branding excluded.

# ## Part A · Endpoint agreement
# Predict differences for the three intervals before running. Add [0.2,0.6] and [1,0], explain which reveals a defect, and compare analytical derivatives at 0,0.5,1. Do not interpret agreement at a finite list of inputs as an identity.

def F(x):
    return x**3

def G(x):
    return x**3 + x*(1-x)

def change(candidate, a, b):
    return candidate(b) - candidate(a)

for a, b in [(0.0, 1.0), (0.0, 0.5), (0.25, 0.75)]:
    print(a, b, change(F, a, b), change(G, a, b))


# These next functions encode derivatives calculated by hand. Check each expression before running; the code performs evaluation, not symbolic differentiation.

def dF(x):
    return 3*x**2

def dG(x):
    return 3*x**2 + 1 - 2*x

for x in [0.0, 0.5, 1.0]:
    print(x, dF(x), dG(x), dG(x)-dF(x))


# ### Your Part A conclusion
# Record the intervals you added, predictions, observed values, and algebraic reason for disagreement. Explain the symmetric interval that hid the defect. Edit this cell or write in your study notes.

# ## Part B · Audit the implementation
# The intended antiderivative of x exp(x) is (x−1)exp(x), obtained by parts. The implementation below is DELIBERATELY INCORRECT. First check the intended formula by differentiation on paper. Predict its values at −1,0,1 and its changes on [0,1], [1,0], [0.5,0.5]. Then run, diagnose the first disagreement, repair only the candidate return expression, and rerun. Add two cases of your own. Record why a zero-width check alone cannot establish correctness.

from math import exp

def candidate(x):
    # DELIBERATE ERROR: audit against the stated formula.
    return x - exp(x)

for x in [-1.0, 0.0, 1.0]:
    print("value", x, candidate(x))

for a, b in [(0.0, 1.0), (1.0, 0.0), (0.5, 0.5)]:
    print("change", a, b, change(candidate, a, b))


# ### Your Part B conclusion
# Explain the algebraic check, the coding defect, your repair, the benchmark and edge cases, and the limits of the evidence. Restart and run all cells. Compare with Activity 9.22 discussion only after completing your audit.
