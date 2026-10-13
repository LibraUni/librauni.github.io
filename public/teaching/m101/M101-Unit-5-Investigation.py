# M101 Unit 5, Activity 5.27. Allow two hours including written work.
# Derive f' on paper first. The proposed function deliberately needs review.
# Test both offset signs and several inputs. Explain evidence and limitations.
# Original example code: MIT. Teaching prompts: CC BY-NC-SA 4.0.

from math import exp, isfinite

def f(x):
    return x**2 * exp(-x)

def proposed(x):
    # A proposed derivative to investigate, not an answer.
    return 2 * x * exp(-x)

def secant(function, x, h):
    if not isfinite(x) or not isfinite(h):
        raise ValueError("Use finite inputs")
    if h == 0 or x + h == x:
        raise ValueError("Choose a nonzero, representable offset")
    first = function(x)
    second = function(x + h)
    if not isfinite(first) or not isfinite(second):
        raise ValueError("Function values must be finite")
    result = (second - first) / h
    if not isfinite(result):
        raise ValueError("Secant result must be finite")
    return result

for x in [0.0, 1.0, 2.0, -1.0]:
    print("input", x, "proposed derivative", proposed(x))
    for h in [0.1, -0.1, 0.01, -0.01, 0.001, -0.001]:
        print("  offset", h, "secant", secant(f, x, h))
