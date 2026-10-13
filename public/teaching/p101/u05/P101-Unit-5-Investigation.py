# # P101 Unit 5 — Comparing orbital models
# 
# Activity 5.18 · 120 minutes, including code reading. SI units throughout.
# 
# Hypothetical scenarios are not observations. Use the functions, arrays and plots introduced in P101 Unit 1. Follow Lesson 4 for the full explanation and feedback.
# 
# Requires Python 3, NumPy and Matplotlib. Start a fresh kernel and run cells in order. The benchmark assertions should finish silently; subsequent cells print ratios and display three labelled plots.

import numpy as np
import matplotlib.pyplot as plt


def circular_orbit(mu, radius, body_radius):
    """SI inputs; returns speed, period, field for exterior circles."""
    mu = float(mu)
    body_radius = float(body_radius)
    radius = np.asarray(radius, dtype=float)
    if not np.isfinite(mu) or mu <= 0:
        raise ValueError("mu must be finite and positive")
    if not np.isfinite(body_radius) or body_radius <= 0:
        raise ValueError("body_radius must be finite and positive")
    if radius.size == 0 or not np.all(np.isfinite(radius)):
        raise ValueError("radius must contain finite values")
    if np.any(radius <= body_radius):
        raise ValueError("each radius must be outside the source")
    speed = np.sqrt(mu / radius)
    period = 2 * np.pi * radius / speed
    field = mu / radius**2
    return speed, period, field

mu0 = 8.0e12
r0 = 2.0e6
R = 1.0e6
v0, T0, g0 = circular_orbit(mu0, r0, R)
assert np.allclose(v0, 2000.0, rtol=1e-12, atol=0)
assert np.allclose(T0, 2000 * np.pi, rtol=1e-12, atol=0)
assert np.allclose(g0, 2.0, rtol=1e-12, atol=0)

factors = np.array([1.0, 2.0, 4.0])
v_r, T_r, g_r = circular_orbit(mu0, r0 * factors, R)
print("radius factors:", factors)
print("speed ratios:", v_r / v0)
print("period ratios:", T_r / T0)
print("field ratios:", g_r / g0)

for q in [1.0, 4.0, 9.0]:
    v, T, g = circular_orbit(q * mu0, r0, R)
    print("source factor:", q, "ratios:", v / v0, T / T0, g / g0)

k = np.linspace(1.0, 4.0, 121)
v, T, g = circular_orbit(mu0, r0 * k, R)
fig, axes = plt.subplots(1, 3, figsize=(10, 3.2))
for ax, values, label in zip(
        axes, [v / v0, T / T0, g / g0],
        ["speed / reference speed", "period / reference period",
         "field / reference field"]):
    ax.plot(k, values)
    ax.set_xlabel("radius / reference radius")
    ax.set_ylabel(label)
    ax.grid(True)
fig.tight_layout()
plt.show()

mu_earth = 3.986e14       # m^3/s^2, rounded
r_moon = 384400e3        # m, representative centre distance
R_earth = 6.371e6        # m, spherical approximation
v_moon, T_moon, g_moon = circular_orbit(mu_earth, r_moon, R_earth)
print("circular-model period / day:", T_moon / 86400)

# ## Your two-scenario report
# 
# Compare A, with inputs `(mu0, r0)`, with B, using `(8 * mu0, 2 * r0)`. State units and assumptions; predict all ratios; calculate outputs; check `v**2 / r = g` and `v * T = 2 * pi * r` using unrounded values.
# 
# Test an interior radius in a separate cell and explain the expected `ValueError`. Remove or catch that deliberately generated error before running the whole notebook again.
# 
# Write a conclusion distinguishing numerical verification from physical evidence. Name two neglected effects and an observation that could test the circular approximation.
# 
# Time plan: 20 minutes for the contract and benchmark; 25 for controlled comparisons; 25 for A/B; 25 for plots; 25 for evidence and report.
# 
# Expected B: 4000 m/s, 2000π s, 4 m/s². Full worked feedback and report criteria are in Lesson 4. Add your own reasoning before checking these values.
