# P101 Unit 5 — Scaling circular orbits
# 
# One-hour Activity 5.15. Predict before execution. This is algebraic scenario evaluation, not time integration. All radii must be in metres and outside the hypothetical source. Source parameter is in m^3/s^2.

import numpy as np

mu = 8.0e12                 # m^3/s^2: hypothetical central source
r0 = 2.0e6                  # m: centre distance, outside the source
radius_factor = np.array([1.0, 4.0, 9.0])
radius = r0 * radius_factor
speed = np.sqrt(mu / radius)
period = 2 * np.pi * radius / speed
field = mu / radius**2

print("speed / m/s:", speed)
print("period / s:", period)
print("field / m/s^2:", field)
print("period ratios:", period / period[0])

# Tasks
# 
# 1. Predict the values for radius factors 1, 4, 9 by hand, then run.
# 2. Change factors to 1, 2, 4 and explain the middle entry.
# 3. Restore 1, 4, 9 and quadruple mu; predict all three changes.
# 4. In a separately labelled unit-error test enter r0=2000.0, identify the factors caused by treating kilometres as metres, then restore metres.
# 5. Explain what agreement checks, and what observational evidence is still absent.
# 
# Expected original speeds: 2000, 1000, 666.667 m/s; period ratios 1, 8, 27; fields 2, 0.125, 0.0246914 m/s^2. Feedback is in Lesson 3.
