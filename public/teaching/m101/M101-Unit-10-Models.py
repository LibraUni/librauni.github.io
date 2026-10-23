# M101 Unit 10: Part A, model inspection (Activity 10.13)
# Numerical units: minutes, litres, litres/minute.
# Model interval 0 <= t <= 6; vessel capacity 20 L.
# Physical interpretation stops if volume leaves [0, 20].
from math import sqrt

def net_rate(t, outlet=2.0):
    return 6.0 - t - outlet

def volume(t, outlet=2.0):
    return 10.0 + (6.0 - outlet)*t - t**2/2.0

outlet = 2.0  # Try 4.0 and 6.0 after predicting the changes.
times = [i/10.0 for i in range(61)]
rates = [net_rate(t, outlet) for t in times]
volumes = [volume(t, outlet) for t in times]
print("outlet / (L/min):", outlet)
for t in [0.0, 2.0, 4.0, 6.0]:
    print("t / min:", t, "net rate / (L/min):", net_rate(t, outlet),
          "volume / L:", volume(t, outlet))
print("Sampled volumes stay within capacity:",
      all(0.0 <= value <= 20.0 for value in volumes))
# Sampling is an inspection aid. Use algebra for extrema and boundaries.
try:
    import matplotlib.pyplot as plt
except ImportError:
    print("Plotting unavailable: use the printed values and draw the curves on paper.")
else:
    fig, axes = plt.subplots(2, 1, figsize=(7, 7), sharex=True)
    axes[0].plot(times, rates, label="Net rate")
    axes[0].axhline(0, color="grey", linewidth=0.8)
    axes[0].set_ylabel("Net rate / (L/min)")
    axes[1].plot(times, volumes, label="Volume formula")
    axes[1].axhline(0, color="grey", linewidth=0.8)
    axes[1].axhline(20, color="grey", linestyle="--", label="Capacity")
    axes[1].set_ylabel("Volume / L")
    axes[1].set_xlabel("Time / min")
    for ax in axes:
        ax.grid(alpha=0.25)
        ax.legend()
    fig.tight_layout()
    plt.show()


# M101 Unit 10 Part B: audit distance (Activity 10.19).
# Numerical units: seconds and metres. Model interval [0, 1].
def velocity(t):
    return 100.0*(t - 0.45)*(t - 0.55)

def F(t):
    return 100.0*t**3/3.0 - 50.0*t**2 + 24.75*t

coarse_times = [i/5.0 for i in range(6)]
print("Part B: coarse velocity samples, t / s and v / (m/s)")
for t in coarse_times:
    print(t, velocity(t))
print("Displacement / m:", F(1.0) - F(0.0))
# PROVISIONAL: deliberately wrong for distance if direction reverses.
# Diagnose and repair this interpretation in Activity 10.19.
provisional_distance = abs(F(1.0) - F(0.0))
print("Provisional distance to audit / m:", provisional_distance)
try:
    import matplotlib.pyplot as plt
except ImportError:
    print("Also evaluate velocity(0.5) and solve the two factors for zero.")
else:
    fine_times = [i/1000.0 for i in range(1001)]
    fine_values = [velocity(t) for t in fine_times]
    fig, axes = plt.subplots(2, 1, figsize=(7, 7))
    for ax in axes:
        ax.plot(fine_times, fine_values, label="Fine samples of model")
        ax.plot(coarse_times, [velocity(t) for t in coarse_times],
                "o--", label="Coarse samples joined")
        ax.axhline(0, color="grey", linewidth=0.8)
        ax.set_xlabel("Time / s")
        ax.set_ylabel("Velocity / (m/s)")
        ax.grid(alpha=0.25)
        ax.legend()
    axes[0].set_title("Whole interval")
    axes[1].set_title("Inspect the neighbourhood of the zeros")
    axes[1].set_xlim(0.4, 0.6)
    axes[1].set_ylim(-0.35, 0.85)
    fig.tight_layout()
    plt.show()
