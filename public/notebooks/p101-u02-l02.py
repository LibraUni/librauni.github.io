
# %% [markdown]
# # P101 · Unit 2 · Lesson 2
# ## Variation, bias and a fair comparison
# Local review draft · Activity 2.12 · 60 minutes
# 
# All values are simulated. This file is an exercise in preserving and checking records, not evidence of a real calibration. Python 3; no external packages. Use the lesson for explanation and feedback.
# 
# Suggested time: 10 min predictions, 20 run/extend, 15 checks, 15 interpretation. Restart the kernel and run all cells in order before saving your work. Keep your personal answers private.

# %% [markdown]
# ## 1. Predict
# For record A, predict indication minus reference for all five entries. Write the units and explain the sign.
# 
# **Your prediction:**
# 
# Then predict the values after subtracting a supplied offset of +2 mm. This offset is a teaching assumption, not inferred from the list.
# 
# **Your prediction:**

# %%
# P101-U02-L02-A: simulated direct-gauge indications.
# Stipulated reference; not an actual calibration.
raw_mm = [52, 53, 51, 52, 52]
reference_mm = 50

def discrepancy_mm(reading_mm, reference_mm):
    return reading_mm - reference_mm

differences_mm = []
for reading_mm in raw_mm:
    differences_mm.append(discrepancy_mm(reading_mm, reference_mm))

print("Raw / mm:", raw_mm)
print("Indication minus reference / mm:", differences_mm)


# %%
# Supplied teaching assumption, not inferred calibration evidence.
assumed_offset_mm = 2
corrected_mm = []
for reading_mm in raw_mm:
    corrected_mm.append(reading_mm - assumed_offset_mm)

print("Derived values under the offset model / mm:", corrected_mm)
print("Preserved raw values / mm:", raw_mm)


# %% [markdown]
# ## 2. A separate practice record
# Use 48, 50 and 52 mm against a 50 mm reference. Predict each discrepancy first. Form a new list with a loop; preserve record A and the practice inputs.
# 
# **Prediction and units:**

# %%
practice_mm = [48, 50, 52]
practice_reference_mm = 50
# Write your discrepancy loop here using a new result list.


# %% [markdown]
# ## 3. Apply a supplied offset
# Write `apply_offset(readings_mm, offset_mm)` to return a new list. Initialise an empty result list inside the function, append one corrected value per loop pass, then return it after the loop. Do not change the input.
# 
# Write your function in the following cell. The lesson contains a hint and a separately opened solution.

# %%
# Write your function here.


# %% [markdown]
# ## 4. Check the edge cases
# Before running your own calls, predict the result for:
# - An empty list with offset 2.
# - `[48, 50, 52]` with offset 0.
# - `[48, 50, 52]` with offset -2.
# 
# **Predictions:**
# 
# Call your function, compare with your predictions, and print the original input after each case. A successful run alone is not a check of the physical model.

# %%
# Add your calls and input-preservation checks here.


# %% [markdown]
# ## 5. Interpret and audit
# Write three sentences distinguishing an individual discrepancy, a supplied constant-offset model and the evidence needed for a real calibration.
# 
# **Your account:**
# 
# Restart and run all cells in order. Check units, signed differences, order and preserved inputs. If you changed an assumption, retain its earlier value and explain why. No mean or uncertainty estimate is required.
# 
# Original teaching: CC BY-NC-SA 4.0. Code: MIT. LibraUni branding excluded.
