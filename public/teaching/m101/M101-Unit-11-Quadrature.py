from math import isfinite, log
# Numerical arguments use the units stated in the lesson.
def midpoint(f, a, b, n):
    if type(n) is not int or n < 1:
        raise ValueError("n must be a positive integer")
    if not (isfinite(a) and isfinite(b)):
        raise ValueError("bounds must be finite")
    if a == b:
        return 0.0
    h = (b - a)/n
    total = 0.0
    for i in range(n):
        x = a + (i + 0.5)*h
        y = f(x)
        if not isfinite(y):
            raise ValueError("non-finite sampled value")
        total += y
    return h*total

def left_sum(f, a, b, n):
    # TODO: write your guarded left-endpoint implementation.
    return None

def trapezoid(f, a, b, n):
    # TODO in Lesson 2: endpoint half-weights, interior full-weights.
    return None

def q(t):
    return 1 + t*t

print("Midpoint hand benchmark:", midpoint(q, 0, 2, 4))
print("Your left hand benchmark:", left_sum(q, 0, 2, 4))
# Add constant, reversed, zero-interval and invalid-count tests here.


panels = [4, 8, 16, 32]
def reciprocal(x):
    return 1/(1 + x)

ready = trapezoid(q, 0, 2, 4) is not None
if ready:
    for n in panels:
        m = midpoint(reciprocal, 0, 1, n)
        t = trapezoid(reciprocal, 0, 1, n)
        print(n, m, t, abs(m-log(2)), abs(t-log(2)))
else:
    print("Complete trapezoid before running the comparison.")
# Add your refinement differences and labelled error plot here.


def pulse(x):
    return max(0.0, 1.0 - abs(x - 0.37)/0.004)

def jump(x):
    return 1.0 if x < 0.3 else 3.0

if ready:
    for n in [8, 16, 32, 64, 128, 256, 512]:
        print("pulse", n, midpoint(pulse, 0, 1, n),
              trapezoid(pulse, 0, 1, n))
    for n in [4, 8, 16, 32]:
        print("jump", n, midpoint(jump, 0, 1, n),
              trapezoid(jump, 0, 1, n))
# Write your split calculation and stopping-rule test here.


# Plotting starter: change n and explain the sampled positions.
# A paper plot using the lesson's values is a static alternative.
try:
    import numpy as np
    import matplotlib.pyplot as plt
except ImportError:
    print("Use the lesson diagrams and tables; install the P101 plotting tools before completing the plotting task.")
else:
    n = 32
    x = np.linspace(0, 1, 10001)
    y = [pulse(float(v)) for v in x]
    endpoints = np.linspace(0, 1, n+1)
    midpoints = (np.arange(n) + 0.5)/n
    fig, axes = plt.subplots(2, 1, figsize=(8, 6))
    for ax in axes:
        ax.plot(x, y, label="Pulse model")
        ax.scatter(endpoints, [pulse(float(v)) for v in endpoints],
                   marker="s", label="Trapezoidal nodes")
        ax.scatter(midpoints, [pulse(float(v)) for v in midpoints],
                   marker="x", label="Midpoint nodes")
        ax.set_xlabel("x / dimensionless")
        ax.set_ylabel("p(x) / dimensionless")
        ax.grid(alpha=0.25)
        ax.legend()
    axes[1].set_xlim(0.35, 0.39)
    fig.tight_layout()
    plt.show()


def response(x):
    return 1/(1 + x**4)

if ready and left_sum(response, 0, 2, 4) is not None:
    # Choose a justified sequence, compute your table and write your report.
    pass
else:
    print("Complete and test both routines before the final audit.")
