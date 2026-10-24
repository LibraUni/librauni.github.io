# P101 Unit 9 · Waves
# Run with Python3, NumPy and Matplotlib. Code MIT.

# Travelling profile
import numpy as np
import matplotlib.pyplot as plt

def travelling(x, t, A, wavelength, frequency, phase=0.0, direction=1):
    if wavelength <= 0 or frequency <= 0 or A < 0:
        raise ValueError("Use positive wavelength/frequency and nonnegative A")
    if direction not in (-1, 1):
        raise ValueError("direction must be +1 or -1")
    k = 2*np.pi/wavelength
    omega = 2*np.pi*frequency
    return A*np.cos(k*np.asarray(x) - direction*omega*t + phase)

x = np.linspace(-1.0, 3.0, 401)
for t in (0.0, 0.25):
    plt.plot(x, travelling(x, t, 0.010, 2.0, 1.0), label=f"t = {t} s")
plt.xlabel("Position x / m")
plt.ylabel("Displacement y / m")
plt.legend()
plt.grid()
plt.show()

# Phase comparison
A, wavelength, frequency = 0.003, 2.0, 1.0
x = np.linspace(0.0, 4.0, 401)
t, delta = 0.0, 2*np.pi/3
y1 = travelling(x, t, A, wavelength, frequency)
y2 = travelling(x, t, A, wavelength, frequency, phase=delta)
y = y1 + y2
expected = 2*A*np.cos(delta/2)*np.cos(
    2*np.pi*x/wavelength - 2*np.pi*frequency*t + delta/2)
print(np.max(np.abs(y - expected)))
for values, label in [(y1, "wave 1"), (y2, "wave 2"), (y, "sum")]:
    plt.plot(x, values, label=label)
plt.xlabel("Position x / m")
plt.ylabel("Displacement y / m")
plt.legend()
plt.grid()
plt.show()

# Standing pattern
A, wavelength, frequency = 0.002, 1.20, 5.0
x = np.linspace(0.0, 1.20, 241)
t = 0.03
right = travelling(x, t, A, wavelength, frequency, phase=-np.pi/2)
left = travelling(x, t, A, wavelength, frequency,
                  phase=-np.pi/2, direction=-1)
summed = right + left
product = (2*A*np.sin(2*np.pi*x/wavelength)
           * np.cos(2*np.pi*frequency*t))
print(np.max(np.abs(summed - product)))

nodes = np.array([0.0, 0.60, 1.20])
for t in (0.0, 0.03, 0.05, 0.10):
    y_nodes = (2*A*np.sin(2*np.pi*nodes/wavelength)
               * np.cos(2*np.pi*frequency*t))
    assert np.allclose(y_nodes, 0.0, rtol=0, atol=1e-12)
