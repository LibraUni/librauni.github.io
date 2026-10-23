"""M101 Unit 8: transparent endpoint sums. Original LibraUni code, MIT."""
from math import isfinite


def rectangles(f, a, b, n, right=False):
    """Endpoint sum on [a,b]; reversing limits negates the same partition."""
    if isinstance(n, bool) or not isinstance(n, int) or n <= 0:
        raise ValueError("n must be a positive integer")
    if not isfinite(a) or not isfinite(b):
        raise ValueError("Use finite endpoints")
    if a == b:
        return 0.0
    if b < a:
        return -rectangles(f, b, a, n, right)
    width = (b - a) / n
    total = 0.0
    for i in range(n):
        x = a + (i + (1 if right else 0)) * width
        value = f(x)
        if not isfinite(value):
            raise ValueError("The sampled value must be finite")
        total += value * width
    return total


def rate(t):
    return 2 + t


if __name__ == "__main__":
    for n in [4, 8, 16, 32]:
        left = rectangles(rate, 0.0, 4.0, n)
        right = rectangles(rate, 0.0, 4.0, n, right=True)
        print(n, left, right, abs(left - 16.0))
