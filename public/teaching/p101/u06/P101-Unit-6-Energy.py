# P101 Unit6. Activity6.20:60min. Hand-check Example6.14. Constructed SI cases; no measured losses and no trajectory solver. Predict before running. Notebook/script are alternatives.
from math import isfinite, sqrt

def endpoint(m, speed_i, h_i, h_f, dissipated, work_in=0.0, g=9.8):
    """SI inputs -> final K (J), speed (m/s); not a path solver."""
    values = (m, speed_i, h_i, h_f, dissipated, work_in, g)
    if not all(isfinite(x) for x in values):
        raise ValueError("Inputs must be finite numbers")
    if m <= 0 or g <= 0 or speed_i < 0 or dissipated < 0:
        raise ValueError("Check mass, g, speed and dissipation")
    k_i = 0.5 * m * speed_i**2
    k_f = k_i + m * g * (h_i - h_f) + work_in - dissipated
    if k_f < 0:
        raise ValueError("Endpoint requires negative kinetic energy")
    return k_f, sqrt(2 * k_f / m)

for loss in [0.0, 5.0, 7.6, 25.0]:
    try:
        k_f, v = endpoint(2.0, 0.0, 1.0, 0.0, loss)
        print(f"loss={loss:.1f} J; K={k_f:.2f} J; speed={v:.3f} m/s")
    except ValueError as error:
        print(f"loss={loss:.1f} J: {error}")

# Shift both heights by100m and compare. Vary mass at fixed loss and explain the control. Write a conclusion: endpoint-compatible energy is necessary, not proof of a feasible path. Feedback in Lesson4 Activity6.20.
