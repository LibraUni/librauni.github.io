
# %% [markdown]
# # P101 · Unit 2 · Lesson 5
# ## A small investigation, fully explained
# Activity 2.28 · 60 minutes · Python 3; no external packages
# 
# This is a supplied-data investigation. All measurements and source facts are simulated; running it does not demonstrate physical apparatus handling. Keep your work private.
# 
# Time: 10 min predictions, 20 min analysis, 15 min independent checks, 15 min interpretation and clean restart. The written report and cumulative exercises have separate time in the lesson budget.
# 
# ## Question and metadata
# P101-U02-L05-A compares recorded lengths of one fixed straight card edge A–B, viewed from above (T) and from a fixed oblique direction (O). Same ruler with 1 mm divisions, card, observer, support, endpoints and nearest-mm recording rule. Fresh ruler placement each attempt. No reference length or precise oblique angle is supplied. Units: mm.
# 
# Chronological order is preserved in source_records. T3 and O6 were interrupted. O3 was entered 58 mm but its stipulated paper source says 85 mm. No fault is documented for O5 at 88 mm.
# 
# Predict included IDs and values, counts, mean, range and D for each method before running. Explain why pooling changes the question.
# 
# **Predictions and working:**

# %%
source_records = [{'trial': 'T1', 'method': 'T', 'entered_mm': 84, 'note': 'Fresh placement'},
 {'trial': 'O1', 'method': 'O', 'entered_mm': 86, 'note': 'Fresh placement'},
 {'trial': 'O2', 'method': 'O', 'entered_mm': 87, 'note': 'Fresh placement'},
 {'trial': 'T2', 'method': 'T', 'entered_mm': 85, 'note': 'Fresh placement'},
 {'trial': 'T3',
  'method': 'T',
  'entered_mm': None,
  'note': 'Interrupted before reading'},
 {'trial': 'O3',
  'method': 'O',
  'entered_mm': 58,
  'note': 'Paper source clearly reads 85 mm'},
 {'trial': 'O4', 'method': 'O', 'entered_mm': 86, 'note': 'Fresh placement'},
 {'trial': 'T4', 'method': 'T', 'entered_mm': 84, 'note': 'Fresh placement'},
 {'trial': 'T5', 'method': 'T', 'entered_mm': 83, 'note': 'Fresh placement'},
 {'trial': 'O5',
  'method': 'O',
  'entered_mm': 88,
  'note': 'Unusual value; no fault documented'},
 {'trial': 'O6',
  'method': 'O',
  'entered_mm': None,
  'note': 'Interrupted before reading'},
 {'trial': 'T6', 'method': 'T', 'entered_mm': 84, 'note': 'Fresh placement'},
 {'trial': 'T7', 'method': 'T', 'entered_mm': 84, 'note': 'Fresh placement'},
 {'trial': 'O7', 'method': 'O', 'entered_mm': 84, 'note': 'Fresh placement'}]

decisions = {'T1': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'O1': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'O2': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'T2': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'T3': {'action': 'exclude', 'reason': 'Interrupted before a reading'},
 'O3': {'action': 'correct',
        'replacement_mm': 85,
        'reason': 'Stipulated paper source for O3 clearly reads 85 mm'},
 'O4': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'T4': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'T5': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'O5': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'O6': {'action': 'exclude', 'reason': 'Interrupted before a reading'},
 'T6': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'T7': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'},
 'O7': {'action': 'keep',
        'reason': 'No independent invalidity documented; stated procedure'}}


# %% [markdown]
# ## Reuse inspected functions
# The summary functions require nonempty finite real values in a common unit. The preparation function creates a new list from reviewed decisions and refuses missing included values, duplicate IDs, missing decisions and unknown actions. It does not validate arbitrary files or establish the truth of a reason. See Lessons 3–4 for their development.

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



# %% [markdown]
# ## Group and describe
# Trace both loops by hand for T1, T3 and O3. Dictionary membership uses trial IDs; grouping uses the supplied method. The source ledger remains unchanged.

# %%
# Run after the notebook's source records, decisions and prior functions.
processed = prepare_readings(source_records, decisions)
values_T_mm = []
values_O_mm = []
method_by_id = {}
for record in source_records:
    method_by_id[record["trial"]] = record["method"]

for record in processed:
    method = method_by_id[record["trial"]]
    if method == "T":
        values_T_mm.append(record["value_mm"])
    elif method == "O":
        values_O_mm.append(record["value_mm"])
    else:
        raise ValueError("Unknown method")

print("T values / mm:", values_T_mm)
print("O values / mm:", values_O_mm)


# %%
def describe(label, values_mm):
    if len(values_mm) == 0:
        print(label, "has no eligible readings")
        return
    print(label, "included count:", len(values_mm))
    print(label, "mean / mm:", format(mean_value(values_mm), ".1f"))
    print(label, "range / mm:", range_value(values_mm))
    print(label, "D / mm:",
          format(mean_absolute_deviation(values_mm), ".1f"))

describe("T", values_T_mm)
describe("O", values_O_mm)


# %% [markdown]
# Print the source O3 entry, included IDs and missing attempt IDs. Verify source preservation and counts independently of the displayed summaries. Do not turn a corrected entry into an additional observation.
# 
# **Observed checks:**

# %%
# Add labelled prints/checks here using loops and dictionary lookups.


# %% [markdown]
# ## Independent numerical and record checks
# 1. Hand-check `[2, 4, 6]` mm, then call the three summaries.
# 2. Build a separate record with a retained zero and an explicitly excluded None. Predict the processed list. Do not alter source_records.
# 3. Convert the T values to metres in a new list with a loop. Predict and compute all three summaries. Do not format them to one decimal in metres: that would erase useful detail.
# 4. In a separate scratch call, verify that keeping None is refused. Record the error and comment out the deliberate failing call before your final run.
# 
# **Predictions:**

# %%
check_mm = [2, 4, 6]
# Add labelled summary calls and your separate record checks.
T_m = []
for value_mm in values_T_mm:
    T_m.append(value_mm / 1000)
# Add summaries in metres and compare with predictions.


# %% [markdown]
# ## Interpret and restart
# Explain the difference between T and O in this record, the missing/correction decisions and why a difference of means is not a known measurement error. Link back to the method and lack of reference. State what your independent checks verify and what they cannot verify.
# 
# **Your interpretation:**
# 
# Restart and run all final cells in order. Check the source, order and units again. Complete Activity 2.29’s report in its separate 15-minute written allocation. Feedback is available in the lesson after your attempt. This notebook is practice, not an additional marked assessment.
# 
# Original teaching: CC BY-NC-SA 4.0. Code: MIT. LibraUni branding excluded.
