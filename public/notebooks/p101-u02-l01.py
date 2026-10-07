# %% [markdown]
# # P101 · Unit 2 · Lesson 1
# ## What exactly are we measuring?
# Activity 2.6 · Learner notebook · 7 October 2026
#
# Allow 60 minutes: 10 for description and predictions, 20 for coding, 15 for checks, 15 for clean execution and interpretation. Read Sections 2.1–2.5 first. Use the same Python 3 setup as Unit 1; no additional libraries are required.
#
# **Data source:** Simulated teaching record P101-U02-L01-A. No physical observations were made to produce these values. Keep this label.
#
# | Trial | B reading / mm | Note |
# |---|---|---|
# |1|126|First placement|
# |2|127|Ruler replaced|
# |3|126|Ruler replaced|
# |4|125|Corner B looked less distinct|
# |5|126|Ruler replaced|
#
# Stipulated method: flat card, one identified edge A–B, ruler spanning the object with 1 mm graduations, A at the zero mark, read B from above to the nearest millimetre, fresh ruler placement each trial. Readings therefore supply estimated lengths for this exercise. Preserve the fourth-trial note.

# %% [markdown]
# ### 1. Describe and predict · 10 minutes
# In your own words, state the quantity, origin of the data, endpoint convention, unit, instrument graduation and reset procedure. Explain the fourth-trial note without deleting the value. Predict all five metre values by hand.
#
# **Your description and predictions:**
#
# _Write here._

# %%
# Simulated teaching record P101-U02-L01-A, not observations.
raw_mm = [126, 127, 126, 125, 126]
print("Raw readings / mm:", raw_mm)
print("Number of readings:", len(raw_mm))

# %% [markdown]
# ### 2. Convert while preserving the evidence · 20 minutes
# Define `millimetres_to_metres(value_mm)` to return the value in metres. Create a new empty list before a loop, append each converted reading, and print both lists with units. Use the lesson's examples if needed, but predict their behaviour before copying.
#
# The first entry should represent 126 mm as 0.126 m. The original list must stay in trial order. Do not calculate a mean or discard a reading.

# %%
# Write your function and conversion loop below.
# Keep raw_mm unchanged and store results in a new list.

# %% [markdown]
# ### 3. Independent checks · 15 minutes
# Test 1000 mm, 0 mm and 125 mm. The expected metre results are 1.0, 0.0 and 0.125. Explain how you know them independently of the program. Comments alone do not check an output: inspect what printed.
#
# Try an empty input list through the conversion loop. Predict and explain the result. Restore the original five readings after this experiment. An empty list records no values; it is not a reading of zero length.

# %%
# Add the three conversion calls and inspect their results.
# Try the empty-list case separately, then restore the main dataset.

# %% [markdown]
# ### 4. Clean run and interpretation · 15 minutes
# Restart the kernel and run all cells in order. Check that all five raw values survive and that the fourth converted entry is 0.125 m. Compare entry by entry with the source table.
#
# - What did the calculation checks establish?
# - What did they leave unknown about the method and instrument?
# - Why must this record remain labelled simulated?
# - What would an empty result mean?
#
# **Your interpretation:**
#
# _Write here._
#
# ### Activity 2.7 · Optional place to store your account
# The 30-minute practical/written activity belongs to the lesson's written-practice allocation, separate from Activity 2.6. Follow either Route A (your own measurements) or Route B (simulated-record audit), not both. Include the endpoint sketch, procedure, raw table and two limitations. Keep any own-observation dataset separate from record A, with its own source label.
#
# **Your route and account:**
#
# _Write here._
#
# Original notebook: CC BY-NC-SA 4.0; code: MIT. LibraUni branding excluded.
