"""P101 Unit 11: radial work. Original LibraUni code, MIT.
All parameters use SI units. C has units N m^2; radius/a/b are in m.
This computes work from a supplied fixed-source model, not observations.
"""
from math import isfinite


def radial_work(C, a, b, n, radius=0.0):
    """Midpoint sum for F_r = C/r**2 on an exterior radial path."""
    if isinstance(n, bool) or not isinstance(n, int) or n <= 0:
        raise ValueError("n must be a positive integer")
    if not all(isfinite(x) for x in (C, a, b, radius)):
        raise ValueError("Use finite model parameters")
    if radius < 0 or min(a, b) <= 0 or min(a, b) < radius:
        raise ValueError("The whole path must be at positive exterior radii")
    width = (b - a) / n
    total = 0.0
    for i in range(n):
        r = a + (i + 0.5) * width
        force = C / r**2
        total += force * width
    return total


def exact_work(C, a, b, radius=0.0):
    """Analytic benchmark with the same physical-domain checks."""
    radial_work(C, a, b, 1, radius)
    return C * (1 / a - 1 / b)

import matplotlib.pyplot as plt

C = -6.0             # N m^2: -GMm for the Lesson 2 benchmark
radius = 1.0         # m: chosen source radius, inside both endpoints
a, b = 2.0, 6.0      # m
counts = [4, 8, 16, 32]
benchmark = exact_work(C, a, b, radius)
errors = []
for n in counts:
    estimate = radial_work(C, a, b, n, radius)
    error = estimate - benchmark
    errors.append(abs(error))
    print(f"{n:3d} pieces: {estimate:.8f} J; error {error:+.8f} J")
print(f"Analytic benchmark: {benchmark:.8f} J")
fig, ax = plt.subplots()
ax.plot(counts, errors, "o-")
ax.set_xlabel("Number of equal radial intervals")
ax.set_ylabel("Absolute work error / J")
ax.set_title("Midpoint approximation: fixed gravitational model")
ax.grid(True, alpha=0.3)
fig.tight_layout()
plt.show()

# ## Activity 11.14 · Trace, then implement (60 minutes)
# Read the supplied functions. Hand-trace two midpoint contributions from2to6m with C=-6 N m². Then write your own `my_radial_work` function in the empty cell, using a loop. Compare both versions at n=2 and explain each factor and guard. Keep your hand values visible. Use the lesson discussion only after attempting. The supplied implementation remains runnable as a reference.
# ## Activity 11.15 · Refine and interpret (50 minutes)
# Predict whether midpoint estimates will be more or less negative than the exact result. Run the supplied benchmark table. Add n=64 and128; compare error magnitudes and their approximate ratios on doubling n. Repeat in reverse and with C doubled. Explain which checks test orientation, scaling and approximation. Restart and run all cells.
# ## Activity 11.16 · An electric case and a boundary (45 minutes)
# Use k_e=8.99e9 N m²/C², Q=4e-9 C, q=-2e-9 C, a=0.10m, b=0.30m, radius=0.02m. Form C=k_e*Q*q. Derive exact work by integrating the force and independently from -qΔV. Choose n giving absolute error below1e-9J. Reverse q and explain the changes. Test equal endpoints, a=0, a=0.01m with the stated radius, n=0, and n=2.5. Catch expected ValueError exceptions so Run All still finishes. Do not bypass the domain guards.
# ## Report and clean rerun (25 minutes)
# Write a short report: question, fixed-source/radial/exterior assumptions, units, hand benchmark, n/error table, one sign/scaling check, one rejected domain and what agreement establishes. Include one physical limitation that numerical refinement cannot remove. Supply your own reasoning; leave no unexplained outputs. Restart and run all.
#
# A completed notebook should contain your implementation, predictions, calculations and interpretation. This starter deliberately contains no completed answers to those tasks.
