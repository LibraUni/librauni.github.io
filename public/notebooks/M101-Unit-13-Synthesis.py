"""M101 Unit 13 — SI numerical values; standard-library Python 3.
Original LibraUni code: MIT. Model domain: 0 <= time <= 4 seconds.
Run this file for the worked baseline. Modify one input at a time.
"""
from math import hypot, isclose, isfinite


def position(t, u=2.0, w=4.0, k=1.0):
    if not all(isfinite(a) for a in (t, u, w, k)) or not 0 <= t <= 4:
        raise ValueError("Finite inputs and time in [0, 4] seconds required")
    return (u*t, w*t-k*t*t)


def velocity(t, u=2.0, w=4.0, k=1.0):
    position(t, u, w, k)  # same input/domain checks
    return (u, w-2*k*t)


def encode(vector):
    x, y = vector
    return (x+y, x-y)


def decode(channels):
    p, q = channels
    return ((p+q)/2, (p-q)/2)


def trapezoid(f, a, b, n):
    if isinstance(n, bool) or not isinstance(n, int) or n < 1:
        raise ValueError("n must be a positive integer")
    if not (isfinite(a) and isfinite(b)):
        raise ValueError("Finite integration bounds required")
    h = (b-a)/n
    total = 0.5*(f(a)+f(b))
    for j in range(1, n):
        total += f(a+j*h)
    return h*total


def investigate(n, u=2.0, w=4.0, k=1.0):
    vx = lambda t: velocity(t, u, w, k)[0]
    vy = lambda t: velocity(t, u, w, k)[1]
    speed = lambda t: hypot(vx(t), vy(t))
    displacement = (trapezoid(vx, 0, 4, n), trapezoid(vy, 0, 4, n))
    distance = trapezoid(speed, 0, 4, n)
    start, end = position(0, u, w, k), position(4, u, w, k)
    benchmark = tuple(end[i]-start[i] for i in range(2))
    return displacement, benchmark, distance


def checks():
    assert isclose(trapezoid(lambda t: 3, 1, 4, 7), 9, abs_tol=1e-12)
    assert isclose(trapezoid(lambda t: 2*t-1, 1, 4, 7), 12, abs_tol=1e-12)
    assert isclose(trapezoid(lambda t: 2*t-1, 4, 1, 7), -12, abs_tol=1e-12)
    assert trapezoid(lambda t: 3, 2, 2, 7) == 0
    for v in ((1, 0), (0, 1), (-3, 5)):
        assert decode(encode(v)) == v
    for n in (1, 2, 4, 8, 16):
        delta, exact, distance = investigate(n)
        assert all(isclose(a, b, abs_tol=1e-12) for a, b in zip(delta, exact))
        assert isclose(investigate(n, k=0)[2], 4*hypot(2, 4), abs_tol=1e-12)
        assert distance >= hypot(*delta)
    return True


def main():
    checks()
    print("Baseline: u=2 m/s, w=4 m/s, k=1 m/s^2; 0 to 4 s")
    for n in (4, 8, 16, 32, 64, 128):
        delta, exact, distance = investigate(n)
        print(f"n={n:3d}: displacement={delta}, endpoint={exact}, distance={distance:.8f} m")
    print("Tangent prediction: exact minus predicted position at t=1 s")
    for h in (.4, .2, .1, .05):
        r, v, actual = position(1), velocity(1), position(1+h)
        error = tuple(actual[i]-(r[i]+h*v[i]) for i in range(2))
        print(f"h={h:g} s: error={error}, magnitude={hypot(*error):.8f} m")


if __name__ == "__main__":
    main()
