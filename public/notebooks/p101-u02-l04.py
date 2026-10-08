
# %% [markdown]
# # P101 · Unit 2 · Lesson 4
# ## Precision, provenance and awkward data
# Activity 2.24 · 120 minutes · Python 3, no external packages
# 
# All measurements and source facts are simulated. This notebook implements the supplied evidence-based decisions; it does not inspect real apparatus. Keep learner responses private.
# 
# Time guide: 40 min record/predictions; 40 min functions; 20 min checks; 20 min report and clean restart. Read the lesson for dictionary syntax, None, membership, elif, continue and formatting.
# 
# ## Record metadata
# P101-U02-L04-A: one fixed card edge A–B, mm; ruler divisions 1 mm; nearest-millimetre readings from above; fresh placement on each attempt. Seven chronological attempts. Attempt 4 has a stipulated paper source reading 126 mm and a first electronic transcription 162 mm. Keep those distinct. No acquisition date, observer identity or calibration evidence is supplied. Do not invent them.
# 
# ## 1. Predict before running
# Write the included attempt IDs and values, the reasons for correction/exclusion, and the expected count, mean, range and mean absolute deviation about the mean. Explain why 136 stays included and missing is not zero.
# 
# **Your prediction and working:**

# %%
# P101-U02-L04-A. All source facts are simulated and stipulated.
source_records = [
    {"trial": 1, "entered_mm": 126, "note": "Fresh placement"},
    {"trial": 2, "entered_mm": 127, "note": "Fresh placement"},
    {"trial": 3, "entered_mm": None, "note": "Interrupted; no reading"},
    {"trial": 4, "entered_mm": 162, "note": "Paper log says 126 mm"},
    {"trial": 5, "entered_mm": 125, "note": "Corner B less distinct"},
    {"trial": 6, "entered_mm": 136, "note": "No fault documented"},
    {"trial": 7, "entered_mm": 130, "note": "Measured C-D, not A-B"},
]

# Each trial ID has an explicit reviewed decision.
decisions = {
    1: {"action": "keep", "reason": "Specified A-B procedure"},
    2: {"action": "keep", "reason": "Specified A-B procedure"},
    3: {"action": "exclude", "reason": "No reading obtained"},
    4: {"action": "correct", "replacement_mm": 126,
        "reason": "Supplied paper-log entry for attempt 4 says 126 mm"},
    5: {"action": "keep", "reason": "Note does not establish invalidity"},
    6: {"action": "keep", "reason": "Unusual alone is not invalid"},
    7: {"action": "exclude", "reason": "Source identifies wrong edge C-D"},
}
print("First entered value / mm:", source_records[0]["entered_mm"])
print("Attempt 4 decision:", decisions[4]["action"])


# %% [markdown]
# Trace `source_records[3]["entered_mm"]` and `decisions[4]["action"]`. Why do 3 and 4 identify the same attempt here? Which is a list position, which a dictionary key?
# 
# **Your explanation:**

# %%
def prepare_readings(source_records, decisions):
    processed = []
    seen_trials = []
    for record in source_records:
        trial = record["trial"]
        if trial in seen_trials:
            raise ValueError("Duplicate trial ID")
        seen_trials.append(trial)
        if trial not in decisions:
            raise ValueError("Every trial needs a decision")
        decision = decisions[trial]
        action = decision["action"]
        reason = decision["reason"]
        if reason == "":
            raise ValueError("Every decision needs a reason")
        if action == "keep":
            value = record["entered_mm"]
        elif action == "correct":
            value = decision["replacement_mm"]
        elif action == "exclude":
            continue
        else:
            raise ValueError("Unknown action")
        if value is None:
            raise ValueError("An included reading cannot be missing")
        processed.append({"trial": trial, "value_mm": value,
                          "action": action, "reason": reason})
    return processed

processed = prepare_readings(source_records, decisions)
values_mm = []
for record in processed:
    values_mm.append(record["value_mm"])
print("Included values / mm:", values_mm)
print("Original attempt 4 entry / mm:", source_records[3]["entered_mm"])


# %% [markdown]
# ## 2. Summary functions from Lesson 3
# These accept nonempty lists of finite real numbers in a common unit. They do not decide scientific eligibility. Check that your processed values match your prediction before using them.

# %%
def mean_value(values):
    count = len(values)
    if count == 0:
        raise ValueError("A mean needs at least one reading")
    total = 0.0
    for value in values:
        total = total + value
    return total / count

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



# %%
if len(values_mm) == 0:
    print("No eligible readings; no numerical summary")
else:
    mean_mm = mean_value(values_mm)
    spread_mm = mean_absolute_deviation(values_mm)
    print("Attempts:", len(source_records))
    print("Included readings:", len(values_mm))
    print("Descriptive mean / mm:", format(mean_mm, ".1f"))
    print("Range / mm:", range_value(values_mm))
    print("Mean absolute deviation / mm:", format(spread_mm, ".1f"))


# %% [markdown]
# The one-decimal mean is a descriptive display, not evidence of 0.1 mm instrument resolution. `format` returns text; it does not alter `mean_mm`. Print the original transcription and the included IDs below. Compare with your prediction.
# 
# **Observed checks and interpretation:**

# %%
included_ids = []
for record in processed:
    included_ids.append(record["trial"])
print("Included attempt IDs:", included_ids)
print("Preserved source:", source_records)


# %% [markdown]
# ## 3. Small independent checks
# Create a separate two-reading record for 0 and 2 mm, both kept. Predict its processed list and three summaries. Then create a missing entry explicitly excluded, and an all-excluded record. For each, write the expected number included before running. Use new variables, not the main record.
# 
# **Predictions:**

# %%
# Complete these separate small records and their decisions.
zero_test_source = []
zero_test_decisions = {}
# Add records, process them, print and compare with your hand result.


# %% [markdown]
# ### Deliberate failures in scratch cells
# Try a missing entry marked keep; a duplicate trial ID; no decision for a trial; an unknown action; and a correction whose replacement is None. The lesson function should refuse each. Use one scratch call at a time, record the error, then comment out the failing call before a final clean run.
# 
# Also check that a numerical correction to zero remains valid under the input contract. Source entries and replacement values must be finite real numbers or the explicitly allowed missing marker; this teaching function is not an arbitrary-file validator.
# 
# **Observed outcomes and why they matter:**

# %%
# Put separate scratch checks here. Keep deliberate failures commented
# out after recording their behaviour. Do not overwrite source_records.


# %% [markdown]
# ## 4. Display and interpretation
# Predict `round(2.5)`, `round(3.5)` and `round(2.675, 2)`. Explain the binary floating-point caveat from the lesson rather than inferring an instrument fault.
# 
# For the separate simulated list below, hand-check mean 127.4 mm and D = 0.88 mm. Print D to one decimal with format, then print the working D again. Why keep these separate?

# %%
display_case_mm = [126, 127, 127, 128, 129]
working_deviation_mm = mean_absolute_deviation(display_case_mm)
print("Descriptive D / mm:", format(working_deviation_mm, ".1f"))
print("Working D / mm:", working_deviation_mm)
print("Rounding demonstrations:", round(2.5), round(3.5), round(2.675, 2))


# %% [markdown]
# ## 5. Report and restart
# Write a short report identifying record, simulated status, quantity, method, seven attempts versus five included values, correction and exclusions, mean, range, D, display choice and limitations. Keep the unusual 136 mm unless new independent evidence changes the documented decision. Do not use D as a guaranteed bound or fabricate a missing reading.
# 
# **Your report:**
# 
# Restart and run all final cells in order. Check source preservation, processed order, predictions, results and units. If you altered a decision for exploration, keep that as a separately labelled hypothetical case.
# 
# Compare with the separately opened discussion of Activity 2.24 and sample report in Activity 2.25. A successful code run checks calculations for these inputs, not physical accuracy. This is practice, not a submitted assessment.
# 
# Original teaching: CC BY-NC-SA 4.0. Code: MIT. LibraUni branding excluded.
