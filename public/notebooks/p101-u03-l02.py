# P101 Unit 3 Lesson 2 | LibraUni | Code MIT
# Activity 3.12: the same 60-minute notebook task, not additional work.
# Requires NumPy and Matplotlib. Run with the CSV in the working directory.
# Read the metadata; predict shape, A position and C time before running.
# All values are invented. Saved PNG is replaced on rerun.

import numpy as np

data = np.loadtxt(
    "p101-u03-l02.csv",
    delimiter=",",
    skiprows=1,
    ndmin=2,
)
print("Array shape (rows, columns):", data.shape)
print(data)

time_s = data[:, 0]
position_m = data[:, 1]
print("First position / m:", data[0, 1])
print("C clock reading / s:", data[2, 0])
elapsed_s = time_s - time_s[0]

import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(6, 4), layout="constrained")
ax.plot(time_s, position_m, marker="o", linestyle="none")
ax.set_xlabel("Clock reading / s")
ax.set_ylabel("Position / m")
ax.set_title("Invented carriage record P101-U03-L01-A")
ax.grid(alpha=0.3)
fig.savefig("p101-u03-l02-clock.png", dpi=160)
plt.show()

# Your work: make a second figure using elapsed_s, correct labels and a new filename.
# Make a third with figsize=(6, 6); keep data and meaning unchanged.
# Check all rows, saved labels and C-D average velocity.
# Run afresh, then write the source/convention/check/limitation report.
# Full prompts and separate feedback are in the lesson.
