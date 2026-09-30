# P101 U01 L03 — runnable examples
# Local review draft. Code: MIT.
# All cases are stipulated. See the HTML lesson for explanations and discussions.
# Run with Python 3; no packages required.

# Example 1.11
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
t_s = 20.0

elapsed_s = t_s - t0_s
displacement_m = v_m_per_s * elapsed_s
x_m = x0_m + displacement_m
print(x_m)

# Example 1.12
print(type(8))
print(type(8.0))
print(9 / 4)
print(8 / 4)

# Example 1.13
v_m_per_s = 0.75
elapsed_s = 8.0
displacement_m = v_m_per_s * elapsed_s
elapsed_s = 12.0
print(displacement_m)
displacement_m = v_m_per_s * elapsed_s
print(displacement_m)

# Example 1.15
# Fixed laboratory origin; positive direction is right.
# Constant signed rate is assumed throughout this interval.
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
t_s = 20.0

# Both clock readings are in seconds, with the same origin.
elapsed_s = t_s - t0_s
displacement_m = v_m_per_s * elapsed_s
x_m = x0_m + displacement_m

print("Elapsed time:", elapsed_s, "s")
print("Predicted position:", x_m, "m")

# Activity 1.18
t_s = 20.0
saved_t_s = t_s
t_s = t_s + 4.0
print(t_s)
print(saved_t_s)

# Complete Activities 1.16–1.21 in your own working file or notebook.
# Notebook cell-order experiments require the notebook; a script executes top to bottom.
