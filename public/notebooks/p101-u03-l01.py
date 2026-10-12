# P101 Unit 3 Lesson 1 | LibraUni | 12 October 2026
# Code: MIT. All cases are invented. Finite real inputs; metres and seconds.
# Activity 3.6 is the same hour of Python work as in the lesson, not extra work.

def average_velocity_m_per_s(x_i_m, x_f_m, t_i_s, t_f_s):
    elapsed_s = t_f_s - t_i_s
    if elapsed_s <= 0:
        raise ValueError("Final time must be later than initial time.")
    displacement_m = x_f_m - x_i_m
    return displacement_m / elapsed_s

mean_velocity = average_velocity_m_per_s(-2.0, 1.0, 10.0, 19.0)
print("Average velocity / m/s:", mean_velocity)

def average_speed_m_per_s(distance_m, t_i_s, t_f_s):
    elapsed_s = t_f_s - t_i_s
    if elapsed_s <= 0:
        raise ValueError("Final time must be later than initial time.")
    if distance_m < 0:
        raise ValueError("Travelled distance cannot be negative.")
    return distance_m / elapsed_s

mean_speed = average_speed_m_per_s(9.0, 10.0, 19.0)
print("Average speed / m/s:", mean_speed)

# Activity 3.6: predict, add return-trip and leftward/rest/origin-shift checks.
# See the lesson for the full prompts, hints and hidden discussion.
# Uncomment one invalid call at a time; re-comment before a clean run.
# average_velocity_m_per_s(0.0, 1.0, 5.0, 5.0)
# average_speed_m_per_s(1.0, 5.0, 4.0)
# Finish with a report of source, conventions, assumptions, check and limitation.
