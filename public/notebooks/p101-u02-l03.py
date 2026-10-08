
# %% [markdown]
# # P101 · Unit 2 · Lesson 3
# ## Summarising a set of readings
# Activity 2.18 · 60 minutes · Python 3, no external packages
# 
# All supplied readings are simulated. This notebook checks descriptive calculations, not a real instrument or measurement uncertainty. Keep your own answers private. Use the full lesson for explanation and separately opened feedback.
# 
# Time guide: 10 min predictions; 20 implement/run; 15 checks; 15 interpretation. Restart and run all final cells in order. Functions assume finite real numerical values in a common unit. Keep each raw list and its order.

# %% [markdown]
# ## 1. Predict before running
# Record P101-U02-L01-A contains `[126, 127, 126, 125, 126]` mm. It stipulates a fresh ruler placement each trial, nearest-millimetre readings, fixed card endpoints and 1 mm divisions. Trial 4 notes: “Corner B looked less distinct”.
# 
# Predict count, mean, range and mean absolute deviation about the mean. Retain the note.
# 
# **Your working:**

# %%
def mean_value(values):
    count = len(values)
    if count == 0:
        raise ValueError("A mean needs at least one reading")
    total = 0.0
    for value in values:
        total = total + value
    return total / count

# P101-U02-L01-A: simulated card-edge readings, in trial order.
raw_mm = [126, 127, 126, 125, 126]
mean_mm = mean_value(raw_mm)
print("Number of entries:", len(raw_mm))
print("Mean / mm:", mean_mm)
print("Preserved readings / mm:", raw_mm)


# %%
def range_value(values):
    if len(values) == 0:
        raise ValueError("A range needs at least one reading")
    return max(values) - min(values)

def mean_absolute_deviation(values):
    centre = mean_value(values)
    total_distance = 0.0
    for value in values:
        total_distance = total_distance + abs(value - centre)
    return total_distance / len(values)

range_mm = range_value(raw_mm)
spread_mm = mean_absolute_deviation(raw_mm)
print("Range / mm:", range_mm)
print("Mean absolute deviation / mm:", spread_mm)


# %% [markdown]
# ## 2. An independent small record
# Before computing, hand-check the simulated list `[10, 10, 10, 10, 15]` mm: sum, mean, extreme values, signed deviations, distances and mean distance. Then call all three functions. Keep this list separate from record A.
# 
# **Predictions and units:**

# %%
practice_mm = [10, 10, 10, 10, 15]
# Add calls and labelled print statements here.


# %% [markdown]
# ## 3. Boundary cases
# Predict then test `[7]`, `[7, 7, 7]` and `[-2, 0, 2]` in one stated common unit. Do the singleton and three repeated values provide the same evidence? Check inputs after running.
# 
# **Predictions:**

# %%
# Add your nonempty test calls here.


# %% [markdown]
# ### Deliberately refuse an empty list
# In a separate scratch cell, uncomment one call below and run it by itself. Each function should raise ValueError, not invent a zero summary. Repeat for each call. Record what happened, then comment out all three calls before the final clean run.
# 
# **Observed behaviour and explanation:**

# %%
# mean_value([])
# range_value([])
# mean_absolute_deviation([])


# %% [markdown]
# ## 4. Change units, preserve the record
# Use a new list `raw_m`, a loop and division by 1000 to convert record A into metres. Predict all three summaries in metres before running. Compare summarising the converted readings with converting each millimetre summary. Allow ordinary floating-point round-off; do not round intermediate values just to tidy the output.
# 
# **Predictions:**

# %%
# Write your conversion loop and three summary calls here.
# Print raw_mm afterwards to check its values and order.


# %% [markdown]
# ## 5. Interpret and rerun
# Explain in a short paragraph:
# - What do the mean, range and mean absolute deviation each describe?
# - Why is D not a guaranteed bound on individual readings or a measurement uncertainty?
# - What do your code checks establish, and what do they leave unknown?
# 
# **Your account:**
# 
# Restart and run all final cells in order, with deliberate failing scratch calls commented out. Verify your predictions, units, list preservation and provenance. This is practice, not a submitted assessment.
# 
# Original teaching: CC BY-NC-SA 4.0. Code: MIT. LibraUni branding excluded.
