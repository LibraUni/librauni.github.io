export const p101Units = {
  "version": "1.0",
  "date": "26 September 2026",
  "status": "Complete unit blueprint approved",
  "units": [
    {
      "id": "U01",
      "block": "B01",
      "title": "Physical quantities and executable models",
      "hours": 18,
      "pythonHours": 8,
      "requires": [],
      "mathRequires": [],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Physical quantities and executable models.",
      "scope": "SI units, dimensional consistency, scale estimates, position and elapsed time; a constant-rate model. Explain variables and assumptions before calculating.",
      "python": "First programming strand: numeric types, expressions, variables, comparisons, conditions, lists, iteration, functions and returned values. Small hand-traced examples; no arrays yet. Setup is in the separate six-hour orientation.",
      "practical": "Deliver a short notebook with a unit-aware scalar model, independently typed functions, a hand calculation and a clean rerun.",
      "boundary": "No prior Python or M100 assumed; no calculus or formal uncertainty theory. Eight coding hours require careful introductory scaffolding.",
      "handover": "Supplies scalar/list/function/loop readiness before M101 U02 code and U03 matrix checks; demonstrate readiness rather than rely on elapsed time.",
      "evidence": "TMA 01 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U02",
      "block": "B01",
      "title": "Measurement, variation and justified precision",
      "hours": 22,
      "pythonHours": 6,
      "requires": [
        "U01"
      ],
      "mathRequires": [],
      "outcomes": [
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Measurement, variation and justified precision.",
      "scope": "Operational definitions, instrument resolution, repeat measurements, mean and spread, random/systematic effects and reporting precision. Explain why repeated readings do not remove bias.",
      "python": "Use lists/functions to summarise a small measurement table, preserve raw values and compare with hand calculations. Introduce data provenance and missing/invalid readings.",
      "practical": "Plan and document a small repeat-measurement activity using available everyday equipment, or analyse supplied documented measurements. Submit table, short method, limitations and a justified reported value.",
      "boundary": "Descriptive spread is not a probability distribution or confidence interval. Supplied data cannot demonstrate instrument handling; no required purchases.",
      "handover": "Measurement conventions underpin every later practical and A101; formal probability belongs to M102, inference/propagation later.",
      "evidence": "TMA 01 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U03",
      "block": "B01",
      "title": "Motion graphs and reproducible data work",
      "hours": 20,
      "pythonHours": 6,
      "requires": [
        "U01",
        "U02"
      ],
      "mathRequires": [],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Motion graphs and reproducible data work.",
      "scope": "Position versus displacement, speed versus signed average velocity; straight-line motion graphs and constant-rate predictions. Distinguish observed data, model and residual differences.",
      "python": "Load a small CSV, basic NumPy arrays and indexing, labelled Matplotlib plots, notebook execution order and source/environment notes. Check a subset manually.",
      "practical": "Compare a small recorded motion table with an algebraic model; deliver a reproducible notebook and concise evidence-based conclusion. Embedded iCMA 01; TMA 01 follows U03.",
      "boundary": "No regression theory or calculus-derived instantaneous rate; no automatic claim of empirical validation from synthetic data.",
      "handover": "Supplies arrays/plots before M101 U05 graph options and U06 onward; M101 U04 scalar limit tables only need U01.",
      "evidence": "TMA 01 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U04",
      "block": "B02",
      "title": "Interactions, diagrams and motion",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U03"
      ],
      "mathRequires": [
        "U01",
        "U02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Interactions, diagrams and motion.",
      "scope": "Newton’s laws, system boundaries, free-body diagrams, weight/normal force, friction/tension and equilibrium. Algebraic constant-acceleration motion and projectiles with explicit assumptions.",
      "python": "Evaluate supplied algebraic motion functions and compare limiting cases; explain code and components.",
      "practical": "A diagram-led motion problem and small predicted trajectory, with dimensions and an independent hand check.",
      "boundary": "Vector resolution follows M101 U01/U02. Do not assume M101 derivatives are ready; instantaneous acceleration is introduced physically with constant-acceleration relations.",
      "handover": "Establishes force models for U05 and balances for U06; derivative interpretation is revisited in U07.",
      "evidence": "TMA 02 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U05",
      "block": "B02",
      "title": "Circular motion and gravitation",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U04"
      ],
      "mathRequires": [
        "U01",
        "U02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Circular motion and gravitation.",
      "scope": "Uniform circular motion, radial acceleration, Newtonian gravitation and simple satellite/planetary scaling. Distinguish an inward resultant force from a new type of force.",
      "python": "Explore radius/mass dependence using algebraic formulas and arrays; check units and a known limiting/scaling case.",
      "practical": "Compare two ideal circular-orbit scenarios in a notebook and explain neglected effects.",
      "boundary": "No numerical orbit integration, Kepler-law derivation, relativity or angular-momentum course.",
      "handover": "Provides A101 gravity/scale context; later P201 must cover central forces, angular momentum and deeper orbit models.",
      "evidence": "TMA 02 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U06",
      "block": "B02",
      "title": "Momentum, work and energy balances",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U04",
        "U05"
      ],
      "mathRequires": [
        "U02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Momentum, work and energy balances.",
      "scope": "Momentum, constant/average-force impulse, isolated-system collisions, kinetic/potential energy and constant-force work. Choose systems and signs; distinguish conservation from conversion.",
      "python": "Check simple collision and energy balances with hand-computable cases, including an impossible proposed result.",
      "practical": "Deliver a documented-data collision analysis or equivalent transparent model comparison with stated limitations.",
      "boundary": "No continuous-force integrals yet; variable-force work/impulse moves to U11. Rotational energy and general centre-of-mass theory need later homes.",
      "handover": "Energy accounting prepares U07 thermal transfers and U12 circuits; TMA 02 samples balances.",
      "evidence": "TMA 02 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U07",
      "block": "B02",
      "title": "Thermal transfers and testing a motion model",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U06"
      ],
      "mathRequires": [
        "U05"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Thermal transfers and testing a motion model.",
      "scope": "Heat versus temperature/internal energy, elementary energy balances and an idealised microscopic interpretation. Revisit velocity/acceleration as derivatives after M101 U05; compare a simple motion model with documented observations.",
      "python": "Compute derivatives of supplied elementary motion expressions by hand then check numerical/data values; inspect residual differences without formal fitting.",
      "practical": "Report a bounded model comparison and separate assumptions, measurement limitations and computation errors. Embedded iCMA 02; TMA 02 follows U07, including thermal and mechanical reasoning.",
      "boundary": "No thermodynamic cycles, entropy/statistical mechanics or numerical ODEs. Mathematical differentiation is retrieval, not a duplicate lesson.",
      "handover": "Supplies quantitative rate reasoning to later physics; formal thermal depth remains P201, not satisfied by this introduction.",
      "evidence": "TMA 02 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U08",
      "block": "B03",
      "title": "Oscillation and sampled signals",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U07"
      ],
      "mathRequires": [],
      "outcomes": [
        "P101-O3",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Oscillation and sampled signals.",
      "scope": "Amplitude, phase, period and frequency; supplied sinusoidal/simple-harmonic models; physical limits, qualitative damping and resonance. Sampling choices and misleading apparent periods.",
      "python": "Generate and sample a sinusoid, estimate its period transparently, compare with the known value and vary sampling.",
      "practical": "A signal notebook with two sampling choices, labelled graphs and a defended limitation.",
      "boundary": "No complex amplitudes, Fourier transform or derivation from ODEs; distinguish supplied model predictions from measurements.",
      "handover": "A101 time-series readiness; M102 later derives oscillator solutions.",
      "evidence": "TMA 03 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U09",
      "block": "B03",
      "title": "Travelling waves and superposition",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U08"
      ],
      "mathRequires": [],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Travelling waves and superposition.",
      "scope": "Frequency/wavelength/speed relation, propagation, superposition, standing-wave patterns; qualitative interference and diffraction with assumptions and physical scale.",
      "python": "Add two sampled wave profiles and check nodes/phase against hand reasoning; no unexplained spectral library.",
      "practical": "A controlled wave-model investigation: prediction, parameter change, comparison and statement of what the model omits.",
      "boundary": "No wave-equation solution or full quantitative diffraction theory.",
      "handover": "Prepares U10 light and later P201 wave theory; TMA 03 tests explanation as well as calculation.",
      "evidence": "TMA 03 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U10",
      "block": "B03",
      "title": "Light, images and observational limits",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U09"
      ],
      "mathRequires": [],
      "outcomes": [
        "P101-O3",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Light, images and observational limits.",
      "scope": "Reflection/refraction, elementary ray/image geometry, electromagnetic spectrum, intensity and inverse-square spreading. Relate finite resolution and sampling to what observations can establish.",
      "python": "Plot a simple optical or intensity relation and compare with a hand-computed point and scale estimate.",
      "practical": "Interpret an optical diagram and a small supplied signal with documented provenance; explain a measurement limitation. Embedded iCMA 03; TMA 03 follows U10.",
      "boundary": "No telescope required, detector calibration or astronomical distance/spectral-shift derivations; those belong to A101.",
      "handover": "A101 receives light, intensity and signal foundations; U13 builds spectral evidence on this unit.",
      "evidence": "TMA 03 samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U11",
      "block": "B04",
      "title": "Fields, potentials and accumulated work",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U06",
        "U10"
      ],
      "mathRequires": [
        "U08",
        "U09"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O4",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Fields, potentials and accumulated work.",
      "scope": "Field versus force, potential versus potential energy; elementary gravitational/electric cases and charge, qualitative magnetic interactions. Revisit variable-force work or continuous impulse using M101 integration, explaining signs and bounds.",
      "python": "Compare a simple field/work calculation with an analytic result and a small numerical sum; use existing methods.",
      "practical": "A bounded field/work comparison with a hand benchmark, dimensional check and explicit model domain.",
      "boundary": "No Gauss/Maxwell laws, vector-calculus formulation or electromagnetism survey; singular points excluded and explained.",
      "handover": "Provides conceptual field readiness for later core physics; it does not replace quantitative electromagnetism.",
      "evidence": "EMA samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U12",
      "block": "B04",
      "title": "DC circuits as testable models",
      "hours": 18,
      "pythonHours": 4,
      "requires": [
        "U11"
      ],
      "mathRequires": [
        "U03"
      ],
      "outcomes": [
        "P101-O2",
        "P101-O4",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "DC circuits as testable models.",
      "scope": "Current, voltage, resistance, series/parallel networks, power and charge/energy balance. Small algebraic systems; distinguish ideal components from measurements and model outputs.",
      "python": "Implement or inspect a small transparent circuit calculation; vary a resistance and check a limiting case and energy balance.",
      "practical": "Virtual-circuit investigation using an original local notebook model, with a documented-data alternative when available. Submit diagram, method, parameter table, benchmark and limitations.",
      "boundary": "No mains work or purchases, AC impedance or circuit ODEs; virtual work does not demonstrate wiring or instrument competence.",
      "handover": "Supplies a bounded investigation model for EMA preparation and later field/circuit work.",
      "evidence": "EMA samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    },
    {
      "id": "U13",
      "block": "B04",
      "title": "Atoms, spectra and the limits of a model",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U12"
      ],
      "mathRequires": [],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O3",
        "P101-O4",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "purpose": "Atoms, spectra and the limits of a model.",
      "scope": "Atomic structure, discrete levels and photon/spectral evidence; microscopic conduction/material pictures and their limits. A short synthesis compares how motion, waves and circuits support claims from evidence.",
      "python": "Inspect a small documented line list or explicitly synthetic energy-level example, calculate photon energies and validate units; consolidate a clean-runnable notebook.",
      "practical": "Formative atomic/spectral interpretation and cross-topic evidence checkpoint prepare the EMA. Actual EMA work remains in its separate 18-hour budget.",
      "boundary": "No wavefunction/quantum-mechanics course, band theory or nuclear/particle depth; synthetic examples are labelled and empirical dataset rights remain a release gate.",
      "handover": "A101 receives spectral/measurement foundations; later compulsory quantum/matter modules must supply formal depth. EMA samples all seven outcomes, not just the chosen investigation.",
      "evidence": "EMA samples the mapped outcomes through explained reasoning and the stated deliverable; formative checks occur within unit hours. No assessment tasks are released."
    }
  ],
  "assessments": [
    {
      "id": "TMA 01",
      "after": "U03",
      "hours": 6,
      "units": [
        "U01",
        "U02",
        "U03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "TMA 02",
      "after": "U07",
      "hours": 6,
      "units": [
        "U04",
        "U05",
        "U06",
        "U07"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "TMA 03",
      "after": "U10",
      "hours": 6,
      "units": [
        "U08",
        "U09",
        "U10"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    },
    {
      "id": "EMA",
      "after": "U13",
      "hours": 18,
      "units": [
        "U01",
        "U02",
        "U03",
        "U04",
        "U05",
        "U06",
        "U07",
        "U08",
        "U09",
        "U10",
        "U11",
        "U12",
        "U13"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O3",
        "P101-O4",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ]
    }
  ],
  "ema": [
    [
      "Investigation component",
      10,
      "Bounded question, short notebook/report, checks and limitations; independent code with documentation allowed, generated solutions excluded."
    ],
    [
      "Written breadth component",
      6,
      "Conceptual/quantitative questions sampling O1–O4, including fields/circuits/atomic evidence independently of the investigation topic."
    ],
    [
      "Instructions, final checks and submission",
      2,
      "Required preparation, file/scan checks and submission within the 18-hour envelope."
    ]
  ],
  "handovers": [
    [
      "P101 U01 → M101 U02/U03",
      "Scalar/list/function/iteration readiness after 18 P101 study hours; M101 U02 starts after 18 study hours. Its one-hour coding activity must follow the demonstrated handover, not precede it."
    ],
    [
      "P101 U03 → M101 graph work",
      "Arrays/plots ready after 60 P101 study hours; M101 U05 begins after 70 and U06 after 94. M101 U04 uses scalar functions, supplied by P101 U01."
    ],
    [
      "M101 U01/U02 → P101 U04",
      "Vector/projection teaching complete after 34 M101 study hours; P101 U04 begins after 60."
    ],
    [
      "M101 U05 → P101 U07",
      "Derivatives complete after 94 M101 study hours; P101 U07 begins after 114. U04–U06 remain algebraic."
    ],
    [
      "M101 U08/U09 → P101 U11",
      "Integration methods complete after 170 M101 study hours; P101 U11 begins after 186."
    ],
    [
      "M101 U03 → P101 U12",
      "Small-system methods complete after 54 M101 study hours; P101 U12 begins after 204."
    ]
  ]
};
