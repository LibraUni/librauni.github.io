# M101 Unit 7 — Numerical derivatives
# Python 3; code MIT. Run in a fresh process.

def forward(f, a, h):
    if h <= 0:
        raise ValueError("Use a positive step.")
    if a + h == a:
        raise ValueError("The forward input did not change.")
    return (f(a + h) - f(a)) / h

def central(f, a, h):
    if h <= 0:
        raise ValueError("Use a positive step.")
    if a + h == a or a - h == a:
        raise ValueError("A sampled input did not change.")
    return (f(a + h) - f(a - h)) / (2 * h)

def cube(x):
    return x ** 3

for h in [0.2, 0.1, 0.05]:
    dp = forward(cube, 1.0, h)
    dc = central(cube, 1.0, h)
    print(h, dp, dc, abs(dp - 3.0), abs(dc - 3.0))

# TASK: Activity 7.9: derive the cube forward expression and predict every row before comparing output.
# TASK: Define a linear function and a square; test both rules at stated inputs against hand-derived results.
# TASK: Test absolute value at zero. Explain why the stable central answer is not a derivative.
# TASK: Record the function, input, steps, expected and observed values, limitations and a clean-run check.
