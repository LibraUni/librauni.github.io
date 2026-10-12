# P101 U03 L05 | starter for Activity 3.25 | code MIT
# Read README.txt; run from the lesson folder. Requires NumPy/Matplotlib.
# All data invented. Same work as notebook, not an extra assignment.

from pathlib import Path
import platform
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

project_dir = Path.cwd()
data_path = project_dir / "data" / "record.csv"
print("Working directory:", project_dir)
print("File exists:", data_path.is_file())
raw = np.genfromtxt(
    data_path, delimiter=",", skip_header=1, dtype=float,
    filling_values=np.nan, ndmin=2, loose=False
)
print("Rows, columns:", raw.shape)
if raw.shape != (5, 2):
    raise ValueError("Expected five rows and two columns; inspect the source.")
time_all_s = raw[:, 0]
position_all_m = raw[:, 1]
if not np.all(np.isfinite(time_all_s)):
    raise ValueError("A clock reading is unavailable; inspect the source.")
usable = np.isfinite(time_all_s) & np.isfinite(position_all_m)
time_s = time_all_s[usable]
position_m = position_all_m[usable]
if len(time_s) == 0:
    raise ValueError("No complete pairs remain.")
print("Retained times / s:", time_s)
print("Retained positions / m:", position_m)
print("Omitted times / s:", time_all_s[~usable])

def predict_position(times_s, t_ref_s, x_ref_m, velocity_m_per_s):
    return x_ref_m + velocity_m_per_s * (times_s - t_ref_s)

reference_time_s = 20.0
reference_position_m = 1.0
velocity_c1 = (3.0 - 1.0) / (22.0 - 20.0)
predicted_c1_m = predict_position(
    time_s, reference_time_s, reference_position_m, velocity_c1
)
residual_c1_m = position_m - predicted_c1_m
print("C1 predictions / m:", predicted_c1_m)
print("C1 residuals / m:", residual_c1_m)

# YOUR WORK: add C2 with the endpoint rate, preserving C1.
# Plot available observations, model lines20–32s and residual markers.
# Label units, model choices and missing29s position. Save comparison PNG.
# Check C2 at22/25s by hand, reference-time and zero-velocity cases.
# Print package versions; rerun afresh and from a second complete folder.
# Write your actual run note and report as in Activity3.26.
# Separate hints and feedback are in the online lesson.
