# P101 Unit 8 - Sampling a signal
# LibraUni, 24 October 2026. Code: MIT.
# Synthetic cosine model; no empirical data or apparatus claim.
# Requirements: Python 3, NumPy, Matplotlib (existing P101 setup).
# Start with the benchmark. Complete Activity 8.14 and 8.15 in your own
# cells or a copy: compare sampling rates, phase, and observation duration.
# Keep manual checks, parameters, environment notes and a conclusion.
import numpy as np

def crossing_period(times, values, level=0.0, atol=1e-12):
    """Seconds and metres in; return period (s), upward crossings (s).

    atol is an absolute zero tolerance in metres for this simulation.
    It is not a measurement uncertainty.
    """
    t = np.asarray(times, dtype=float)
    y = np.asarray(values, dtype=float)
    if t.ndim != 1 or y.ndim != 1 or len(t) != len(y) or len(t) < 2:
        raise ValueError("Use equally long one-dimensional records")
    if not np.all(np.isfinite(t)) or not np.all(np.isfinite(y)):
        raise ValueError("All times and values must be finite")
    if not np.isfinite(level) or not np.isfinite(atol) or atol < 0:
        raise ValueError("Use a finite level and nonnegative tolerance")
    if not np.all(np.diff(t) > 0):
        raise ValueError("Times must increase strictly")
    z = y - level
    z[np.abs(z) <= atol] = 0.0
    crossings = []
    for i in range(len(t) - 1):
        if z[i] <= 0 < z[i+1]:
            fraction = -z[i] / (z[i+1] - z[i])
            crossing = t[i] + fraction * (t[i+1] - t[i])
            crossings.append(float(crossing))
    if len(crossings) < 2:
        raise ValueError("Fewer than two resolved upward crossings")
    period = (crossings[-1] - crossings[0]) / (len(crossings) - 1)
    return period, crossings


def sampled_model(f=2.0, fs=20.0, amplitude=0.01, phase=0.0,
                  duration=4.0, level=0.0):
    """Pure synthetic cosine: Hz, samples/s, m, rad, s, m.

    Return timestamps no later than duration; endpoints included only
    when duration*fs is an integer (within numerical rounding).
    """
    params = [f, fs, amplitude, phase, duration, level]
    if not all(np.isfinite(p) for p in params):
        raise ValueError("Parameters must be finite")
    if f <= 0 or fs <= 0 or duration <= 0 or amplitude < 0:
        raise ValueError("Positive frequencies/duration; nonnegative amplitude")
    intervals = int(np.floor(duration*fs + 1e-10))
    if intervals < 1 or intervals > 100000:
        raise ValueError("Use between 1 and 100000 sampling intervals")
    t = np.arange(intervals + 1) / fs
    y = level + amplitude*np.cos(2*np.pi*f*t + phase)
    return t, y


def benchmark():
    import matplotlib.pyplot as plt
    t, x = sampled_model()
    estimate, crossings = crossing_period(t, x)
    print("First five values / m:", x[:5])
    print("Crossings / s:", crossings)
    print("Intervals / s:", np.diff(crossings))
    print("Estimated period / s:", estimate)
    print("Known period / s:", 0.5)
    print("Difference / s:", estimate - 0.5)
    fine_t = np.linspace(0, 4, 1601)
    fine_x = 0.01*np.cos(2*np.pi*2*fine_t)
    fig, ax = plt.subplots()
    ax.plot(fine_t, fine_x, label="known 2 Hz model")
    ax.plot(t, x, "o", label="20 samples/s")
    ax.set(xlabel="Time / s", ylabel="Displacement / m")
    ax.legend()
    fig.tight_layout()
    return fig

if __name__ == "__main__":
    import matplotlib.pyplot as plt
    benchmark()
    plt.show()
