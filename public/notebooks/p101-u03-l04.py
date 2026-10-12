# P101 U03-L04 | LibraUni | Code MIT
# DELIBERATELY BROKEN repair exercise; see README and Activity3.23.
# Save a -repaired copy. Run from extracted lesson folder. Keep data/record.csv unchanged.
# Timings:20min locate/inspect;35 comparison;30 figure/checks;35 clean rerun/handover.

from pathlib import Path
import platform
import numpy as np
import matplotlib
import matplotlib.pyplot as plt

project_dir = Path.cwd()
data_path = project_dir / "record.csv"
print("Working directory:", project_dir)
print("Data file:", data_path)
print("File exists:", data_path.is_file())

raw = np.loadtxt(data_path, delimiter=",", skiprows=1, ndmin=2)
print("Rows, columns:", raw.shape)
print(raw)
if raw.shape != (4, 2):
    raise ValueError("Expected four data rows and two columns; inspect the file.")
time_all_s = raw[:, 0]
position_all_m = raw[:, 1]
if not np.all(np.isfinite(time_all_s)):
    raise ValueError("A clock reading is missing or non-finite; inspect the source.")

usable = np.isfinite(time_all_s) & np.isfinite(position_all_m)
time_s = time_all_s
position_m = position_all_m[usable]
print("Usable pairs:", len(time_s), "of", len(time_all_s))
print("Times without a usable position / s:", time_all_s[~usable])
if len(time_s) == 0:
    raise ValueError("No complete pairs are available for comparison.")

def predict_position(times_s, t_ref_s, x_ref_m, velocity_m_per_s):
    return x_ref_m + velocity_m_per_s * (times_s - t_ref_s)

# M1 is retained from Lesson 3, not re-estimated after selection.
reference_time_s = 10.0
reference_position_m = -2.0
velocity_m_per_s = 1 / 3
predicted_m = predict_position(
    time_s, reference_time_s, reference_position_m, velocity_m_per_s
)
residual_m = predicted_m - position_m
print("Clock readings / s:", time_s)
print("M1 predictions / m:", predicted_m)
print("Residuals (observed - predicted) / m:", residual_m)

fig, ax = plt.subplots()
ax.plot(position_m, "o-")
ax.set_xlabel("Clock reading / s")
ax.set_ylabel("Position / m")
ax.set_title("The model follows the observations")
fig.savefig(project_dir / "p101-u03-l04-result.png", dpi=160)
plt.show()

print("Python:", platform.python_version())
print("NumPy:", np.__version__)
print("Matplotlib:", matplotlib.__version__)
print("Input: data/record.csv | record P101-U03-L04-B | version 1")
print("M1: t_ref = 10 s; x_ref = -2 m; velocity = 1.5 m/s")
print("Selection: complete finite pairs; no replacement or reordering")

# Add your checks, then save, run afresh and test from a second extracted folder.
# Keep a change log and dated run note; instructions/hints/solutions are online.
