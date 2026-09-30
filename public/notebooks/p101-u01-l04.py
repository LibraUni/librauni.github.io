# P101 U01 L04 — runnable examples
# Local review draft. Code: MIT. Python 3, no additional packages.
# All motion inputs are stipulated; consult the lesson for explanations.

# Example 1.17
t0_s = 12.0
t_s = 20.0
elapsed_s = t_s - t0_s
allowed = elapsed_s >= 0.0
print(allowed)
print(type(allowed))

# Example 1.18
# Fixed laboratory origin; positive direction is right.
# Constant rate is assumed from t0_s onwards.
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
t_s = 20.0

elapsed_s = t_s - t0_s
if elapsed_s >= 0.0:
    x_m = x0_m + v_m_per_s * elapsed_s
    print("Predicted position:", x_m, "m")
else:
    print("No prediction: time is before the initial event.")

# Example 1.19
times_s = [12.0, 16.0, 20.0, 24.0]
print(times_s)
print(times_s[0])
print(times_s[2])
print(len(times_s))

# Example 1.20
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
times_s = [12.0, 16.0, 20.0, 24.0]

for t_s in times_s:
    elapsed_s = t_s - t0_s
    x_m = x0_m + v_m_per_s * elapsed_s
    print("Time:", t_s, "s; position:", x_m, "m")

# Example 1.21
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
times_s = [12.0, 16.0, 20.0, 24.0]
positions_m = []

for t_s in times_s:
    elapsed_s = t_s - t0_s
    x_m = x0_m + v_m_per_s * elapsed_s
    positions_m.append(x_m)

print("Times / s:", times_s)
print("Positions / m:", positions_m)

# Example 1.22
# Fixed origin, positive right; rate assumed from t0_s onwards.
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
times_s = [12.0, 10.0, 16.0, 20.0]
accepted_times_s = []
positions_m = []

for t_s in times_s:
    elapsed_s = t_s - t0_s
    if elapsed_s >= 0.0:
        x_m = x0_m + v_m_per_s * elapsed_s
        accepted_times_s.append(t_s)
        positions_m.append(x_m)
    else:
        print("No prediction at", t_s, "s: before initial event.")

print("Accepted times / s:", accepted_times_s)
print("Positions / m:", positions_m)

# Complete Activities1.22–1.27 in your own working file or notebook.
# Keep complete cases together, including initialisation of output lists.
