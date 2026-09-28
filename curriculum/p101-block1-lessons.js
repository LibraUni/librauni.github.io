export const p101Block1Lessons = {
  "version": "0.1",
  "date": "28 September 2026",
  "status": "Block 1 lesson map; Unit 1 Lesson 1 available, subsequent teaching in preparation",
  "pairing": "Preserve natural module progression. Cross-links advise; existing knowledge may supply prerequisites. No completion locks or inferred attainment.",
  "lessons": [
    {
      "id": "U01-L01",
      "unit": "U01",
      "block": "B01",
      "title": "Quantities, units and physical scale",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Explain what a numerical physical claim means; convert units and test its scale.",
      "scope": "Quantity/value/unit; SI length, time and mass, prefixes, scientific notation, area conversion, dimensions and bounded estimates.",
      "boundary": "No code, calculus, significant-figure rules or uncertainty propagation.",
      "evidence": "Unit-labelled calculation, dimensional diagnosis and an explained range estimate.",
      "visual": "Original ruler, area grid and scale ladder; separate hints and discussions.",
      "handover": "L02 turns a carefully specified quantity into a model.",
      "allocationMinutes": {
        "explanation": 75,
        "writtenPractice": 75,
        "python": 0,
        "feedback": 30
      },
      "requires": [],
      "outcomes": [
        "P101-O1",
        "P101-O7"
      ]
    },
    {
      "id": "U01-L02",
      "unit": "U01",
      "block": "B01",
      "title": "Position, time and a first model",
      "hours": 3,
      "pythonHours": 1,
      "purpose": "Build a constant-rate model from a stated reference and elapsed time.",
      "scope": "One-dimensional position, initial value, elapsed time, x=x0+v\u0394t, assumptions and simple substitutions; first numeric expressions and named values in Python.",
      "boundary": "No force laws, instantaneous velocity or arrays; full speed/velocity contrast returns in U03.",
      "evidence": "Predict by hand, run the same scalar calculation, compare starting-time and zero-rate cases.",
      "visual": "Track sketch and time line; explain why clock reading is not elapsed time.",
      "handover": "L03 makes the calculation readable and reusable.",
      "allocationMinutes": {
        "explanation": 45,
        "writtenPractice": 45,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U01-L01"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U01-L03",
      "unit": "U01",
      "block": "B01",
      "title": "From a calculation to a readable program",
      "hours": 3,
      "pythonHours": 2,
      "purpose": "Translate model quantities into explicit, unit-labelled program inputs.",
      "scope": "Integers/floats, expressions, assignment, comments, descriptive names, execution order and printed results.",
      "boundary": "No generic programming survey or unexplained libraries.",
      "evidence": "Repair a stale-variable result; independently write a scalar calculation and its interpretation.",
      "visual": "Annotated notebook cells and hand-trace table.",
      "handover": "L04 compares results and repeats calculations.",
      "allocationMinutes": {
        "explanation": 30,
        "writtenPractice": 15,
        "python": 120,
        "feedback": 15
      },
      "requires": [
        "U01-L02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U01-L04",
      "unit": "U01",
      "block": "B01",
      "title": "Decisions and repeated calculations",
      "hours": 3,
      "pythonHours": 2,
      "purpose": "Make explicit decisions and evaluate a small set of model inputs.",
      "scope": "Comparisons, booleans, if/else, lists, zero-based indexing and for loops; hand-trace before running.",
      "boundary": "No nested algorithms, NumPy or silent handling of invalid physical input.",
      "evidence": "Check positive elapsed time, retain a short position list, interpret a boundary case.",
      "visual": "Trace table with one row per iteration.",
      "handover": "L05 encapsulates the model with a returning function.",
      "allocationMinutes": {
        "explanation": 30,
        "writtenPractice": 15,
        "python": 120,
        "feedback": 15
      },
      "requires": [
        "U01-L03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U01-L05",
      "unit": "U01",
      "block": "B01",
      "title": "Functions and checks you can explain",
      "hours": 3,
      "pythonHours": 2,
      "purpose": "Write and test a small model function independently.",
      "scope": "Inputs, parameters, return versus print, local values, ordinary/zero/boundary checks, unit conventions and model validity.",
      "boundary": "No test-framework prerequisite or claim that passing examples proves a physical law.",
      "evidence": "Explain a returning function, test it against a hand result and diagnose a unit mismatch.",
      "visual": "Input\u2013calculation\u2013output diagram; checked counterexample.",
      "handover": "Sufficient scalar/list/function support for M101 when wanted.",
      "allocationMinutes": {
        "explanation": 30,
        "writtenPractice": 15,
        "python": 120,
        "feedback": 15
      },
      "requires": [
        "U01-L04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U01-L06",
      "unit": "U01",
      "block": "B01",
      "title": "Putting an executable model together",
      "hours": 3,
      "pythonHours": 1,
      "purpose": "Consolidate the whole unit through an explained notebook and cumulative practice.",
      "scope": "Small model notebook, clean rerun, mixed exercises across all six lessons, short conclusion and web/PDF reference.",
      "boundary": "No new syntax or extra formal submission.",
      "evidence": "Independent attempt, checked solutions and corrections; notebook states units, assumptions and limits.",
      "visual": "One synthesis diagram; unit reference distinguishes recall, reasoning and lookup.",
      "handover": "U02 asks how measured input values were obtained.",
      "allocationMinutes": {
        "explanation": 15,
        "writtenPractice": 75,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U01-L05"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U02-L01",
      "unit": "U02",
      "block": "B01",
      "title": "What exactly are we measuring?",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Choose an operational definition and a repeatable procedure.",
      "scope": "Measurand, endpoints, instruments, resolution, recording method; lists for raw readings.",
      "boundary": "No probability model; no required purchase or hazardous activity.",
      "evidence": "Specify a safe everyday length/timing measurement; supplied-data route clearly distinguished.",
      "visual": "Instrument sketch; contrasting definitions and a raw-record table.",
      "handover": "L02 distinguishes variation from systematic effects.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U01-L06"
      ],
      "outcomes": [
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U02-L02",
      "unit": "U02",
      "block": "B01",
      "title": "Variation, bias and a fair comparison",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Explain why readings vary and what repetition cannot repair.",
      "scope": "Repeatability, random variation, systematic shifts, controlled conditions and calibration concept.",
      "boundary": "No confidence intervals or uncertainty propagation.",
      "evidence": "Compare two procedures and diagnose a common offset; loop through preserved readings.",
      "visual": "Repeated readings on a number line, with a separate shifted set.",
      "handover": "L03 summarises without erasing provenance.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U02-L01"
      ],
      "outcomes": [
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U02-L03",
      "unit": "U02",
      "block": "B01",
      "title": "Summarising a set of readings",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Use mean and descriptive spread with a physical interpretation.",
      "scope": "Mean, range and an explicitly taught descriptive spread measure; explain small samples; use list/function arithmetic.",
      "boundary": "No normal-distribution assumptions, significance tests or formal standard-error claims.",
      "evidence": "Hand-check a small list, write the corresponding calculation and discuss an outlying reading without deleting it.",
      "visual": "Table linked to a dot plot supplied as teaching artwork.",
      "handover": "L04 chooses an honest reported precision.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U02-L02"
      ],
      "outcomes": [
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U02-L04",
      "unit": "U02",
      "block": "B01",
      "title": "Precision, provenance and awkward data",
      "hours": 5,
      "pythonHours": 2,
      "purpose": "Report a value with justified digits and an auditable data trail.",
      "scope": "Rounding, instrument resolution versus justified precision, missing/invalid readings, raw/processed data and metadata.",
      "boundary": "No automatic outlier removal or fabricated measurements.",
      "evidence": "Repair a misleading report; document a missing reading and retain original observations.",
      "visual": "Before/after reporting examples and data-record schematic.",
      "handover": "L05 assembles and critiques an investigation.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 120,
        "feedback": 30
      },
      "requires": [
        "U02-L03"
      ],
      "outcomes": [
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U02-L05",
      "unit": "U02",
      "block": "B01",
      "title": "A small investigation, fully explained",
      "hours": 5,
      "pythonHours": 1,
      "purpose": "Complete a bounded repeat-measurement investigation and whole-unit review.",
      "scope": "Question, method, data, descriptive result and limitations; mixed unit exercises, conclusion, web/PDF reference.",
      "boundary": "Supplied data do not demonstrate apparatus handling; no extra TMA.",
      "evidence": "Short notebook/report, independent exercise attempt, worked feedback and correction.",
      "visual": "Results figure with meaningful labels and a concise method sketch.",
      "handover": "U03 uses provenance and reporting conventions for motion data.",
      "allocationMinutes": {
        "explanation": 45,
        "writtenPractice": 150,
        "python": 60,
        "feedback": 45
      },
      "requires": [
        "U02-L04"
      ],
      "outcomes": [
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U03-L01",
      "unit": "U03",
      "block": "B01",
      "title": "Position, displacement and average rates",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Distinguish distance, displacement, average speed and signed average velocity.",
      "scope": "One-dimensional paths, elapsed intervals and rate calculation; reuse scalar functions.",
      "boundary": "No calculus-derived instantaneous rate or accelerated-motion laws.",
      "evidence": "Explain a return journey with zero displacement but nonzero distance.",
      "visual": "Path and time table; model statements kept separate from observations.",
      "handover": "L02 moves from tables to graphs.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U02-L05"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U03-L02",
      "unit": "U03",
      "block": "B01",
      "title": "From a table to a labelled graph",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Read and construct position\u2013time graphs without confusing them with paths.",
      "scope": "CSV fields, units in metadata, small NumPy arrays/indexing, first Matplotlib plot, axes and captions.",
      "boundary": "No plotting library assumed; no fitted curve.",
      "evidence": "Load a small documented file, check rows by hand, produce a readable graph.",
      "visual": "Same data as table/path/graph, with contrasts made explicit.",
      "handover": "L03 compares predictions and observations.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U03-L01"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U03-L03",
      "unit": "U03",
      "block": "B01",
      "title": "Comparing a model with observations",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Interpret discrepancies without claiming more than the evidence supports.",
      "scope": "Constant-rate predictions, residual = observed minus predicted, patterns, interpolation and extrapolation limits.",
      "boundary": "No regression theory or synthetic-data empirical validation.",
      "evidence": "Calculate residuals by hand/code and identify a pattern that challenges an assumption.",
      "visual": "Two-panel data/model and residual plot.",
      "handover": "L04 makes the analysis reproducible.",
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "requires": [
        "U03-L02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U03-L04",
      "unit": "U03",
      "block": "B01",
      "title": "An analysis another person can rerun",
      "hours": 4,
      "pythonHours": 2,
      "purpose": "Make the source, processing and environment of a small analysis explicit.",
      "scope": "File paths, CSV loading, arrays, labelled plots, missing values, clean kernel execution, versions and provenance.",
      "boundary": "No unexplained cleaning pipeline, remote paid service or automatic fitting.",
      "evidence": "Repair a broken notebook and rerun from a clean state with original data preserved.",
      "visual": "File-to-result diagram; intentionally misleading plot repaired.",
      "handover": "L05 integrates reasoning and prepares TMA 01.",
      "allocationMinutes": {
        "explanation": 45,
        "writtenPractice": 45,
        "python": 120,
        "feedback": 30
      },
      "requires": [
        "U03-L03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "U03-L05",
      "unit": "U03",
      "block": "B01",
      "title": "Motion evidence and block synthesis",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Integrate model, measurement and computation across Block 1.",
      "scope": "Bounded notebook investigation; cumulative U03 exercises, iCMA 01 with feedback, conclusion and unit reference resources.",
      "boundary": "TMA 01 remains separate six-hour work; no new physics or syntax.",
      "evidence": "Explain model limits, independent mixed practice and corrections, formative checkpoint.",
      "visual": "One evidence comparison and compact reference table.",
      "handover": "B02 explains interactions; TMA 01 draws on U01\u2013U03.",
      "allocationMinutes": {
        "explanation": 30,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 60
      },
      "requires": [
        "U03-L04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    }
  ]
};
