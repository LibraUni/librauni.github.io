# P101 U03-L03 | LibraUni | Code MIT
# Activity 3.18, same60min as notebook. Requires NumPy and Matplotlib.
# Keep CSV in working directory; read metadata. All values invented.
# Predict C position/residual before running. PNG replaced on rerun.

import numpy as np
import matplotlib.pyplot as plt

data = np.loadtxt(
    "p101-u03-l03.csv", delimiter=",", skiprows=1, ndmin=2
)
time_s = data[:, 0]
position_m = data[:, 1]
reference_time_s = time_s[0]
reference_position_m = position_m[0]
velocity_m_per_s = (
    (position_m[1] - reference_position_m)
    / (time_s[1] - reference_time_s)
)

def predict_position(times_s, t_ref_s, x_ref_m, velocity_m_per_s):
    return x_ref_m + velocity_m_per_s * (times_s - t_ref_s)

predicted_m = predict_position(
    time_s, reference_time_s, reference_position_m, velocity_m_per_s
)
residual_m = position_m - predicted_m
print("M1 predicted position / m:", predicted_m)
print("M1 residual (observed - predicted) / m:", residual_m)

line_time_s = np.linspace(time_s[0], time_s[-1], 100)
line_position_m = predict_position(
    line_time_s, reference_time_s, reference_position_m, velocity_m_per_s
)
fig, axes = plt.subplots(2, 1, sharex=True, figsize=(7, 7), layout="constrained")
position_ax = axes[0]
residual_ax = axes[1]
position_ax.plot(time_s, position_m, "o", label="Invented observations")
position_ax.plot(line_time_s, line_position_m, "--", label="M1: A-B rate")
position_ax.set_ylabel("Position / m")
position_ax.set_title("Invented record P101-U03-L01-A")
position_ax.legend()
position_ax.grid(alpha=0.3)
residual_ax.plot(time_s, residual_m, "o")
residual_ax.axhline(0, color="grey", linewidth=1)
residual_ax.set_ylabel("Residual: observed - predicted / m")
residual_ax.set_xlabel("Clock reading / s")
residual_ax.grid(alpha=0.3)
fig.savefig("p101-u03-l03-m1.png", dpi=160)
plt.show()

# Your work: calculate M2 from A/D, keep M1 arrays, draw a new labelled figure.
# Check B/C by hand, reference-time and zero-velocity cases.
# Run afresh and report source, conventions, choices, check and limits.
# Full prompt and hidden solution are in Activity 3.18 online.
