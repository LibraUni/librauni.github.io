P101 TMA03 · Patterns, light and the limits of a record
Assessment/data version 1.0 · 27 October 2026 · LibraUni
Original invented assessment record, CC BY-NC-SA 4.0. No real experiment or measured instrument performance is represented.
signal.csv columns: sample (identifier), group (schedule), time_s (seconds), raw_au and control_au (arbitrary linear response units).
There are 9 regular rows at integer seconds 0–8 and 2 extra rows at 0.5 and 1.5 s. Both groups refer to the same stipulated repeatable history and time origin. File order is not chronological; keep every identifier and its aligned values.
The target channel contains source plus background; the simultaneous matched control contains that same additive background on the same response scale. The model treats samples as instantaneous and unsaturated. Numerical responses are printed to 0.01 a.u.; no complete accuracy/timing specification or statistical noise distribution is supplied.
Keep the original file unchanged at data/signal.csv beside your notebook/script. Implement the two fixed models from the question sheet independently; do not fit them or replace the source record with generated values. Retain raw values, identify transformations and report group-wise comparisons.
Use Python 3 with the already taught NumPy/Matplotlib tools or standard-library CSV reader. Restart/run all or use a fresh process; repeat from a second folder with the same relative layout. Preserve printed outputs and plots, actual outcomes and environment versions. Declare assistance. No solution code is included.
