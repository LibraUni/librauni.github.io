# P101 U07 Activity7.13 · SI numerical values · original code MIT
from math import isfinite

def motion(t):
    """Input seconds; return x (m), v (m/s), a (m/s**2)."""
    if not isfinite(t) or not 0 <= t <= 4:
        raise ValueError("Use 0 <= time <= 4 seconds")
    x = 1 + 2*t - 0.5*t**2
    v = 2 - t
    a = -1.0
    return x, v, a

def centred_velocity(t, h):
    if not isfinite(h) or h <= 0:
        raise ValueError("Step must be finite and positive")
    x_plus = motion(t+h)[0]
    x_minus = motion(t-h)[0]
    return (x_plus-x_minus) / (2*h)

print(motion(1.0))
print(centred_velocity(1.0, 0.2))
# Activity7.13: build the five-row table and centred checks.
times = [0, 1, 2, 3, 4]
steps = [0.5, 0.2, 0.02]
# Add loops; then define q(t) and its hand derivative.
# For the cubic: q(t) = 1 + 2*t - 0.5*t**2 + 0.1*t**3.
# Use separate labelled panels for position and velocity.
# Catch ValueError for a deliberately invalid endpoint check.
