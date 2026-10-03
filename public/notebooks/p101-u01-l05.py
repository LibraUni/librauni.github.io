# P101 U01 L05 — runnable worked examples
# Python 3. Code MIT. No additional packages.
# Run in order: later examples use the first function definition.
# Example 1.24 deliberately contrasts displaying and returning.

# Example 1.23
def position_m(x0_m, v_m_per_s, t0_s, t_s):
    """Return position in metres for a constant signed rate.

    Caller supplies finite numbers in m, m/s and s,
    with t_s >= t0_s and common position/time origins.
    """
    elapsed_s = t_s - t0_s
    return x0_m + v_m_per_s * elapsed_s

prediction_m = position_m(-2.0, 0.75, 12.0, 20.0)
print("Position / m:", prediction_m)

# Example 1.24
def display_displacement_m(v_m_per_s, elapsed_s):
    print(v_m_per_s * elapsed_s)

saved_m = display_displacement_m(0.75, 8.0)
print("Saved value:", saved_m)

def displacement_m(v_m_per_s, elapsed_s):
    """Return signed displacement in metres; duration is in seconds."""
    return v_m_per_s * elapsed_s

saved_m = displacement_m(0.75, 8.0)
print("Displacement / m:", saved_m)
print("Position / m:", -2.0 + saved_m)

# Example 1.25
def duration_s(start_s, end_s):
    elapsed_s = end_s - start_s
    return elapsed_s

elapsed_s = 999.0
first_s = duration_s(12.0, 20.0)
second_s = duration_s(5.0, 9.0)
print("First duration / s:", first_s)
print("Second duration / s:", second_s)
print("Outside value:", elapsed_s)

# Example 1.26
actual_m = position_m(-2.0, 0.75, 12.0, 20.0)
expected_m = 4.0
print("Actual / m:", actual_m)
print("Expected / m:", expected_m)
print("Difference / m:", actual_m - expected_m)
print("Exact agreement for this case:", actual_m == expected_m)

# Example 1.27
requested_min = 2.0
wrong_m = position_m(1.0, 0.5, 0.0, requested_min)
requested_s = 60.0 * requested_min
correct_m = position_m(1.0, 0.5, 0.0, requested_s)
print("Minutes mistakenly supplied as seconds / m:", wrong_m)
print("After explicit conversion / m:", correct_m)

# Example 1.28
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
times_s = [20.0, 10.0, 12.0, 16.0]
accepted_times_s = []
positions_m = []

for t_s in times_s:
    if t_s >= t0_s:
        result_m = position_m(x0_m, v_m_per_s, t0_s, t_s)
        accepted_times_s.append(t_s)
        positions_m.append(result_m)
    else:
        print("No prediction at", t_s, "s: before initial event.")

print("Accepted times / s:", accepted_times_s)
print("Positions / m:", positions_m)

# Complete Activities 1.28–1.33 independently in your working copy.
