# P101 Unit 4 · Projectile investigation · v1.0 · 13 October 2026
# Code: MIT. Original explanatory text: CC BY-NC-SA 4.0; branding excluded.
# Finite SI inputs: height >= 0, initial vertical velocity >= 0, gravity > 0.
# No drag; uniform downward gravity; floor y = 0; x0 = 0.
# Run in the NumPy/Matplotlib environment used in P101 Unit 3.
import numpy as np
import matplotlib.pyplot as plt

def landing_time(h_m, uy_m_s, g_m_s2):
    # Contract: finite h >= 0, uy >= 0, g > 0; floor at y = 0.
    return (uy_m_s + np.sqrt(uy_m_s**2 + 2*g_m_s2*h_m)) / g_m_s2

def position(t_s, h_m, ux_m_s, uy_m_s, g_m_s2):
    # x0 = 0; t is a scalar or NumPy array of elapsed seconds.
    x_m = ux_m_s * t_s
    y_m = h_m + uy_m_s*t_s - 0.5*g_m_s2*t_s**2
    return x_m, y_m

g_m_s2 = 9.8
benchmark_tf_s = landing_time(4.9, 0.0, g_m_s2)
benchmark_x_m, benchmark_y_m = position(benchmark_tf_s, 4.9, 6.0, 0.0, g_m_s2)
print("Benchmark time, x, y:", benchmark_tf_s, benchmark_x_m, benchmark_y_m)

h_m = 4.9
ux_m_s = 6.0
uy_m_s = 4.9
tf_s = landing_time(h_m, uy_m_s, g_m_s2)
time_s = np.linspace(0.0, tf_s, 101)
x_m, y_m = position(time_s, h_m, ux_m_s, uy_m_s, g_m_s2)
print("Initial x, y:", x_m[0], y_m[0])
print("Landing time, x, y:", tf_s, x_m[-1], y_m[-1])
print("Floor check:", abs(y_m[-1]) < 1e-10)

fig, ax = plt.subplots(figsize=(7, 4), layout="constrained")
ax.plot(x_m, y_m, label="Uniform gravity; no drag")
ax.plot([x_m[0], x_m[-1]], [y_m[0], y_m[-1]], "o", label="Release / landing")
ax.set_xlabel("Horizontal position x / m")
ax.set_ylabel("Height y / m")
ax.set_title("P101 U04: predicted projectile path")
ax.set_aspect("equal", adjustable="box")
ax.grid(True)
ax.legend(loc="lower left")
fig.savefig("projectile-path.png", dpi=160)
plt.show()

speed_m_s = 10.0
angle_deg = 30.0
angle_rad = np.deg2rad(angle_deg)
ux_from_angle = speed_m_s * np.cos(angle_rad)
uy_from_angle = speed_m_s * np.sin(angle_rad)
print("Launch components:", ux_from_angle, uy_from_angle)
