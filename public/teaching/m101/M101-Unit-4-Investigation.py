# Activity 4.24 - M101 Unit 4: numerical evidence
# Predict the limit and which side of it each sign of h should give.
# Run the starting calculation. Record the first displayed disagreement.
# Add two moderate offsets; test h=0 and h=-10 separately.
# Explain the exact limit, finite-table evidence and rounding separately.
# Original LibraUni example code: MIT. Teaching prompts: CC BY-NC-SA 4.0.

from math import sqrt

def direct(h):
    if h < -9 or h == 0:
        return None
    return (sqrt(9 + h) - 3) / h

def rearranged(h):
    if h < -9 or h == 0:
        return None
    return 1 / (sqrt(9 + h) + 3)

offsets = [0.1, -0.1, 0.01, -0.01, 1e-4, -1e-4,
           1e-8, -1e-8, 1e-12, -1e-12, 1e-16, -1e-16]
print("         h             direct          rearranged")
for h in offsets:
    print(f"{h: .1e}   {direct(h): .12f}   {rearranged(h): .12f}")
