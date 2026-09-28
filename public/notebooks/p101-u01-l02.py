# P101 Unit 1 Lesson 2 — plain Python companion (MIT code)
# In this file, lines beginning with # are notes; Python ignores them.
# All positions are in metres, times in seconds; positive is to the right.
# Predict first. Run this file in your Python editor; print displays output.
print(-2.0 + 0.75 * (20.0 - 12.0))

# Activity 1.13: explain the difference between the next two outputs.
print(-2.0 + 0.75 * (20.0 - 12.0))
print(-2.0 + 0.75 * 20.0 - 12.0)

# Named-value example. Run the whole file after changing inputs.
x0_m = -2.0
v_m_per_s = 0.75
t0_s = 12.0
t_s = 20.0
elapsed_s = t_s - t0_s
x_m = x0_m + v_m_per_s * elapsed_s
print(x_m)

# Activity 1.14: make three copies of the named-value calculation.
# (a) final time 12 s; (b) zero rate and final time 20 s;
# (c) initial position 5 m, rate -0.50 m/s, start 4 s, finish 10 s.
# Record predictions, outputs and explanations in a text file.

# Activity 1.15: write a new named-value calculation below.
# Initial position 1.5 m at 30 s; rate -0.25 m/s; finish at 38 s.
# Also test the starting event and zero rate. Explain units and limitations.
# Save your code and explanation, run from the beginning and reopen both.
