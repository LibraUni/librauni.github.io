# P101 Block 1 · Lesson map

Local proposal · 28 September 2026 · v0.1

The approved block remains 60 hours, including 20 hours of Python. Orientation (6 hours) and TMA 01 (6 hours) are separate. No change to the approved module scope. M101 connections are advisory; both modules retain their own sequence. Existing knowledge can supply a prerequisite without waiting for another lesson to be published or ticked complete. This does not create an attainment record.

## U01 · 18 hours / 8 included Python hours

### U01-L01 · Quantities, units and physical scale

**Prerequisites:** Basic arithmetic; no M101 completion required. **Outcomes:** P101-O1, P101-O7.

**Purpose:** Explain what a numerical physical claim means; convert units and test its scale.

**Scope:** Quantity/value/unit; SI length, time and mass, prefixes, scientific notation, area conversion, dimensions and bounded estimates.

**Boundaries:** No code, calculus, significant-figure rules or uncertainty propagation.

**Practice and evidence:** Unit-labelled calculation, dimensional diagnosis and an explained range estimate.

**Visual plan:** Original ruler, area grid and scale ladder; separate hints and discussions.

**Handover:** L02 turns a carefully specified quantity into a model.

**Allocation:** 3 h total, 0 h included Python. Minutes for explanation / written practice / Python / feedback: 75 / 75 / 0 / 30.

### U01-L02 · Position, time and a first model

**Prerequisites:** U01-L01. **Outcomes:** P101-O1, P101-O6, P101-O7.

**Purpose:** Build a constant-rate model from a stated reference and elapsed time.

**Scope:** One-dimensional position, initial value, elapsed time, x=x0+vΔt, assumptions and simple substitutions; first numeric expressions and named values in Python.

**Boundaries:** No force laws, instantaneous velocity or arrays; full speed/velocity contrast returns in U03.

**Practice and evidence:** Predict by hand, run the same scalar calculation, compare starting-time and zero-rate cases.

**Visual plan:** Track sketch and time line; explain why clock reading is not elapsed time.

**Handover:** L03 makes the calculation readable and reusable.

**Allocation:** 3 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 45 / 45 / 60 / 30.

### U01-L03 · From a calculation to a readable program

**Prerequisites:** U01-L02. **Outcomes:** P101-O1, P101-O6, P101-O7.

**Purpose:** Translate model quantities into explicit, unit-labelled program inputs.

**Scope:** Integers/floats, expressions, assignment, comments, descriptive names, execution order and printed results.

**Boundaries:** No generic programming survey or unexplained libraries.

**Practice and evidence:** Repair a stale-variable result; independently write a scalar calculation and its interpretation.

**Visual plan:** Annotated notebook cells and hand-trace table.

**Handover:** L04 compares results and repeats calculations.

**Allocation:** 3 h total, 2 h included Python. Minutes for explanation / written practice / Python / feedback: 30 / 15 / 120 / 15.

### U01-L04 · Decisions and repeated calculations

**Prerequisites:** U01-L03. **Outcomes:** P101-O1, P101-O6, P101-O7.

**Purpose:** Make explicit decisions and evaluate a small set of model inputs.

**Scope:** Comparisons, booleans, if/else, lists, zero-based indexing and for loops; hand-trace before running.

**Boundaries:** No nested algorithms, NumPy or silent handling of invalid physical input.

**Practice and evidence:** Check positive elapsed time, retain a short position list, interpret a boundary case.

**Visual plan:** Trace table with one row per iteration.

**Handover:** L05 encapsulates the model with a returning function.

**Allocation:** 3 h total, 2 h included Python. Minutes for explanation / written practice / Python / feedback: 30 / 15 / 120 / 15.

### U01-L05 · Functions and checks you can explain

**Prerequisites:** U01-L04. **Outcomes:** P101-O1, P101-O6, P101-O7.

**Purpose:** Write and test a small model function independently.

**Scope:** Inputs, parameters, return versus print, local values, ordinary/zero/boundary checks, unit conventions and model validity.

**Boundaries:** No test-framework prerequisite or claim that passing examples proves a physical law.

**Practice and evidence:** Explain a returning function, test it against a hand result and diagnose a unit mismatch.

**Visual plan:** Input–calculation–output diagram; checked counterexample.

**Handover:** Sufficient scalar/list/function support for M101 when wanted.

**Allocation:** 3 h total, 2 h included Python. Minutes for explanation / written practice / Python / feedback: 30 / 15 / 120 / 15.

### U01-L06 · Putting an executable model together

**Prerequisites:** U01-L05. **Outcomes:** P101-O1, P101-O6, P101-O7.

**Purpose:** Consolidate the whole unit through an explained notebook and cumulative practice.

**Scope:** Small model notebook, clean rerun, mixed exercises across all six lessons, short conclusion and web/PDF reference.

**Boundaries:** No new syntax or extra formal submission.

**Practice and evidence:** Independent attempt, checked solutions and corrections; notebook states units, assumptions and limits.

**Visual plan:** One synthesis diagram; unit reference distinguishes recall, reasoning and lookup.

**Handover:** U02 asks how measured input values were obtained.

**Allocation:** 3 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 15 / 75 / 60 / 30.

## U02 · 22 hours / 6 included Python hours

### U02-L01 · What exactly are we measuring?

**Prerequisites:** U01-L06. **Outcomes:** P101-O5, P101-O6, P101-O7.

**Purpose:** Choose an operational definition and a repeatable procedure.

**Scope:** Measurand, endpoints, instruments, resolution, recording method; lists for raw readings.

**Boundaries:** No probability model; no required purchase or hazardous activity.

**Practice and evidence:** Specify a safe everyday length/timing measurement; supplied-data route clearly distinguished.

**Visual plan:** Instrument sketch; contrasting definitions and a raw-record table.

**Handover:** L02 distinguishes variation from systematic effects.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 60 / 30.

### U02-L02 · Variation, bias and a fair comparison

**Prerequisites:** U02-L01. **Outcomes:** P101-O5, P101-O6, P101-O7.

**Purpose:** Explain why readings vary and what repetition cannot repair.

**Scope:** Repeatability, random variation, systematic shifts, controlled conditions and calibration concept.

**Boundaries:** No confidence intervals or uncertainty propagation.

**Practice and evidence:** Compare two procedures and diagnose a common offset; loop through preserved readings.

**Visual plan:** Repeated readings on a number line, with a separate shifted set.

**Handover:** L03 summarises without erasing provenance.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 60 / 30.

### U02-L03 · Summarising a set of readings

**Prerequisites:** U02-L02. **Outcomes:** P101-O5, P101-O6, P101-O7.

**Purpose:** Use mean and descriptive spread with a physical interpretation.

**Scope:** Mean, range and an explicitly taught descriptive spread measure; explain small samples; use list/function arithmetic.

**Boundaries:** No normal-distribution assumptions, significance tests or formal standard-error claims.

**Practice and evidence:** Hand-check a small list, write the corresponding calculation and discuss an outlying reading without deleting it.

**Visual plan:** Table linked to a dot plot supplied as teaching artwork.

**Handover:** L04 chooses an honest reported precision.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 60 / 30.

### U02-L04 · Precision, provenance and awkward data

**Prerequisites:** U02-L03. **Outcomes:** P101-O5, P101-O6, P101-O7.

**Purpose:** Report a value with justified digits and an auditable data trail.

**Scope:** Rounding, instrument resolution versus justified precision, missing/invalid readings, raw/processed data and metadata.

**Boundaries:** No automatic outlier removal or fabricated measurements.

**Practice and evidence:** Repair a misleading report; document a missing reading and retain original observations.

**Visual plan:** Before/after reporting examples and data-record schematic.

**Handover:** L05 assembles and critiques an investigation.

**Allocation:** 5 h total, 2 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 120 / 30.

### U02-L05 · A small investigation, fully explained

**Prerequisites:** U02-L04. **Outcomes:** P101-O5, P101-O6, P101-O7.

**Purpose:** Complete a bounded repeat-measurement investigation and whole-unit review.

**Scope:** Question, method, data, descriptive result and limitations; mixed unit exercises, conclusion, web/PDF reference.

**Boundaries:** Supplied data do not demonstrate apparatus handling; no extra TMA.

**Practice and evidence:** Short notebook/report, independent exercise attempt, worked feedback and correction.

**Visual plan:** Results figure with meaningful labels and a concise method sketch.

**Handover:** U03 uses provenance and reporting conventions for motion data.

**Allocation:** 5 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 45 / 150 / 60 / 45.

## U03 · 20 hours / 6 included Python hours

### U03-L01 · Position, displacement and average rates

**Prerequisites:** U02-L05. **Outcomes:** P101-O1, P101-O5, P101-O6, P101-O7.

**Purpose:** Distinguish distance, displacement, average speed and signed average velocity.

**Scope:** One-dimensional paths, elapsed intervals and rate calculation; reuse scalar functions.

**Boundaries:** No calculus-derived instantaneous rate or accelerated-motion laws.

**Practice and evidence:** Explain a return journey with zero displacement but nonzero distance.

**Visual plan:** Path and time table; model statements kept separate from observations.

**Handover:** L02 moves from tables to graphs.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 60 / 30.

### U03-L02 · From a table to a labelled graph

**Prerequisites:** U03-L01. **Outcomes:** P101-O1, P101-O5, P101-O6, P101-O7.

**Purpose:** Read and construct position–time graphs without confusing them with paths.

**Scope:** CSV fields, units in metadata, small NumPy arrays/indexing, first Matplotlib plot, axes and captions.

**Boundaries:** No plotting library assumed; no fitted curve.

**Practice and evidence:** Load a small documented file, check rows by hand, produce a readable graph.

**Visual plan:** Same data as table/path/graph, with contrasts made explicit.

**Handover:** L03 compares predictions and observations.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 60 / 30.

### U03-L03 · Comparing a model with observations

**Prerequisites:** U03-L02. **Outcomes:** P101-O1, P101-O5, P101-O6, P101-O7.

**Purpose:** Interpret discrepancies without claiming more than the evidence supports.

**Scope:** Constant-rate predictions, residual = observed minus predicted, patterns, interpolation and extrapolation limits.

**Boundaries:** No regression theory or synthetic-data empirical validation.

**Practice and evidence:** Calculate residuals by hand/code and identify a pattern that challenges an assumption.

**Visual plan:** Two-panel data/model and residual plot.

**Handover:** L04 makes the analysis reproducible.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 60 / 90 / 60 / 30.

### U03-L04 · An analysis another person can rerun

**Prerequisites:** U03-L03. **Outcomes:** P101-O1, P101-O5, P101-O6, P101-O7.

**Purpose:** Make the source, processing and environment of a small analysis explicit.

**Scope:** File paths, CSV loading, arrays, labelled plots, missing values, clean kernel execution, versions and provenance.

**Boundaries:** No unexplained cleaning pipeline, remote paid service or automatic fitting.

**Practice and evidence:** Repair a broken notebook and rerun from a clean state with original data preserved.

**Visual plan:** File-to-result diagram; intentionally misleading plot repaired.

**Handover:** L05 integrates reasoning and prepares TMA 01.

**Allocation:** 4 h total, 2 h included Python. Minutes for explanation / written practice / Python / feedback: 45 / 45 / 120 / 30.

### U03-L05 · Motion evidence and block synthesis

**Prerequisites:** U03-L04. **Outcomes:** P101-O1, P101-O5, P101-O6, P101-O7.

**Purpose:** Integrate model, measurement and computation across Block 1.

**Scope:** Bounded notebook investigation; cumulative U03 exercises, iCMA 01 with feedback, conclusion and unit reference resources.

**Boundaries:** TMA 01 remains separate six-hour work; no new physics or syntax.

**Practice and evidence:** Explain model limits, independent mixed practice and corrections, formative checkpoint.

**Visual plan:** One evidence comparison and compact reference table.

**Handover:** B02 explains interactions; TMA 01 draws on U01–U03.

**Allocation:** 4 h total, 1 h included Python. Minutes for explanation / written practice / Python / feedback: 30 / 90 / 60 / 60.

## Unit-end reservations

U01 L06 reserves 75 written-practice minutes for a whole-unit set, 60 minutes for the notebook, and 30 for feedback/reference use; introduction/conclusion take 15. U02 L05 includes 90 minutes for the measurement investigation and 60 for mixed exercises within its 150 written-practice minutes; Python is 60, feedback/reference 45 and synthesis 45. U03 L05 reserves 60 written minutes for its unit exercise set and 30 for integrating the investigation; 60 Python; 60 feedback/review includes iCMA attempt and feedback (40) plus corrections/reference (20). Its 30 explanation minutes cover synthesis/conclusion. Detailed questions and PDFs are authored when each unit is completed.

All timings are unmeasured planning estimates. Installation is not charged to lessons. Later lessons require their own section plans, source/practice calibration and review before teaching production.
