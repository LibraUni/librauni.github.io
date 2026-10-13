# M101 Unit 6 investigation · Code licensed MIT
# See the lesson/notebook for the four activities (120 minutes).

# Sampling a smooth function
import numpy as np
import matplotlib.pyplot as plt

# Dimensionless input and output; trigonometric arguments in radians.
left, right = 0.0, 1.0
n = 21
low, high = -0.15, 1.15
x = np.linspace(left, right, n)
y = x + 0.08 * np.sin(20 * np.pi * x)
plt.figure(figsize=(8, 4))
plt.plot(x, y, "o-", label=f"{n} sampled values")
plt.xlim(left, right)
plt.ylim(low, high)
plt.xlabel("x (dimensionless)")
plt.ylabel("f(x) (dimensionless)")
plt.title("A sampled curve: inspect the spacing and window")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()

# A deliberately misleading connection
x = np.linspace(0.0, 1.0, 20)  # no sample equals 0.5
plt.figure(figsize=(8, 4))
plt.plot(x, 1 / (x - 0.5), "o-", label="one connected sample list")
plt.xlim(0, 1)
plt.ylim(-25, 25)
plt.xlabel("x (dimensionless)")
plt.ylabel("g(x) (dimensionless)")
plt.title("Deliberate error: a line drawn across an excluded input")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()

# Separate the domain components
x_left = np.linspace(0.0, 0.49, 200)
x_right = np.linspace(0.51, 1.0, 200)
plt.figure(figsize=(8, 4))
plt.plot(x_left, 1 / (x_left - 0.5), label="left component")
plt.plot(x_right, 1 / (x_right - 0.5), "--", label="right component")
plt.xlim(0, 1)
plt.ylim(-25, 25)
plt.xlabel("x (dimensionless)")
plt.ylabel("g(x) (dimensionless)")
plt.title("Separate lines: no connection across x = 0.5")
plt.grid(True)
plt.legend()
plt.tight_layout()
plt.show()
