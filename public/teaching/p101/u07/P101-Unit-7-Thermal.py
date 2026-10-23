# P101 U07 Activity7.8 · capacities J/K; temperatures Celsius.
# Original code MIT; run with Python3.
from math import isfinite

def equilibrium(c_hot, t_hot, c_cold, t_cold):
    values = [c_hot, t_hot, c_cold, t_cold]
    if not all(isfinite(x) for x in values):
        raise ValueError("Inputs must be finite")
    if c_hot <= 0 or c_cold <= 0:
        raise ValueError("Capacities must be positive")
    if min(t_hot, t_cold) < -273.15:
        raise ValueError("Celsius input below absolute zero")
    final = (c_hot*t_hot + c_cold*t_cold) / (c_hot+c_cold)
    change_hot = c_hot * (final-t_hot)
    change_cold = c_cold * (final-t_cold)
    return final, change_hot, change_cold

print(equilibrium(300, 80, 900, 20))
# Activity 7.8: predict before running.
capacities = [300, 600, 900, 1200]
# Add a loop to print the final temperature for each cooler capacity.
# Try equal temperatures, swap the bodies, and test zero capacity.
# Catch the expected ValueError if you keep an invalid trial in this file.
# Conclude: which checks concern code, and which need measurements?
