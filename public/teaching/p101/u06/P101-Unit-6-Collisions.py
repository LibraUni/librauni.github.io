# P101 Unit6. Activity6.9: 60 minutes. Constructed models, not observations. First hand-check (0.60,1.5,0.40,-0.50). Predict the co-moving limit. Read, run, then change one input. Standard library only; run from a fresh kernel.
from math import isfinite

def sticking(m_a, u_a, m_b, u_b):
    """kg, m/s -> v (m/s), Pi, Pf (kg m/s), Ki, Kf (J)."""
    if not all(isfinite(x) for x in (m_a, u_a, m_b, u_b)):
        raise ValueError("Inputs must be finite numbers")
    if m_a <= 0 or m_b <= 0:
        raise ValueError("Masses must be positive")
    p_i = m_a * u_a + m_b * u_b
    v = p_i / (m_a + m_b)
    p_f = (m_a + m_b) * v
    k_i = 0.5 * m_a * u_a**2 + 0.5 * m_b * u_b**2
    k_f = 0.5 * (m_a + m_b) * v**2
    return v, p_i, p_f, k_i, k_f

cases = [(0.60, 1.5, 0.40, -0.50),
         (0.20, 3.0, 0.40, 0.0),
         (0.60, 1.2, 0.40, 1.2)]
for case in cases:
    v, p_i, p_f, k_i, k_f = sticking(*case)
    print(f"v={v:.3f} m/s; residual={p_f-p_i:.3g} kg m/s; "
          f"K decrease={k_i-k_f:.3f} J")

# Write your conclusion here: state the system, impulse approximation and what the residual checks. Test zero mass and explain ValueError. Compare the three cases by hand; do not call agreement experimental validation. Feedback in Lesson2 Activity6.9.
