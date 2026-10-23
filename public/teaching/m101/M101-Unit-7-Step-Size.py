# M101 Unit 7 — Step-size investigation
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

def shifted_cube(x):
    return 100000000.0 + x ** 3

def investigate(f):
    print("h, forward, central, forward error, central error")
    for exponent in range(1, 18):
        h = 10.0 ** (-exponent)
        try:
            dp = forward(f, 1.0, h)
            dc = central(f, 1.0, h)
            print(f"{h:.1e}, {dp:.12g}, {dc:.12g}, "
                  f"{abs(dp - 3.0):.3e}, {abs(dc - 3.0):.3e}")
        except ValueError as problem:
            print(f"{h:.1e}, not evaluated: {problem}")

print("Cube at x = 1; analytical derivative = 3")
investigate(cube)
print("Shifted cube at x = 1; analytical derivative still = 3")
investigate(shifted_cube)

# TASK: Activity 7.14: predict the first three cube rows and identify a range with the expected errors.
# TASK: Find a smaller step that fails to improve the error. Inspect the stored sample inputs near a guarded failure.
# TASK: Compare the shifted cube. Separate exact cancellation of the constant from floating-point loss of the small difference.
# TASK: Choose a useful tested step for each formula/function, report its observed error, state limitations, restart and rerun.
