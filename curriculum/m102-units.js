export const m102Units = {
  "version": "1.0",
  "date": "26 September 2026",
  "status": "Complete unit blueprint approved",
  "units": [
    {
      "id": "U01",
      "block": "B01",
      "title": "Complex arithmetic and geometry",
      "hours": 18,
      "pythonHours": 2,
      "requires": [],
      "outcomes": [
        "M102-O1",
        "M102-O7"
      ],
      "scope": "Complex numbers, real/imaginary parts, conjugates, modulus and argument; arithmetic and geometric interpretation. Explain angle conventions and distinguish a number from its representation.",
      "boundary": "No complex analysis; retrieve algebra and trigonometry without repeating M100.",
      "python": "Check hand calculations with built-in complex arithmetic and simple plots; test conjugation/modulus identities.",
      "evidence": "Explain arithmetic and geometry, including division and argument ambiguity. TMA 01.",
      "handover": "Prepares polar/exponential methods in U02 and complex eigenvalue examples."
    },
    {
      "id": "U02",
      "block": "B01",
      "title": "Polar form, roots and oscillatory representations",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U01"
      ],
      "outcomes": [
        "M102-O1",
        "M102-O7"
      ],
      "scope": "Cartesian/polar/exponential conversion, Euler representation and elementary identities, integer powers and roots; phase relationships and real parts of supplied oscillatory models.",
      "boundary": "Euler representation is introduced through explicit identities and geometric interpretation; power-series justification is a later connection in U05. No phasor circuit course.",
      "python": "Plot roots and compare representations; explain phase conventions rather than trusting a display.",
      "evidence": "Find roots, interpret phase and justify a representation choice. Formative checkpoint; TMA 01 after U05.",
      "handover": "Complex roots support U08/U10; A101 phase enrichment only after this unit."
    },
    {
      "id": "U03",
      "block": "B02",
      "title": "Further integration techniques",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U02"
      ],
      "outcomes": [
        "M102-O2",
        "M102-O7"
      ],
      "scope": "Elementary partial fractions for simple rational functions; selected trigonometric identities/substitution; further integration by parts. Differentiate candidate antiderivatives and preserve definite limits/constants.",
      "boundary": "Bounded repertoire: distinct linear factors and simple repeated-factor examples; no comprehensive integration catalogue or special functions.",
      "python": "Compare a verified antiderivative with numerical endpoint calculations; numerical agreement supplements the derivative check.",
      "evidence": "Select a method and explain a domain restriction. TMA 01.",
      "handover": "Extends M101 U09; supplies U04 improper integrals and U09 integrating factors."
    },
    {
      "id": "U04",
      "block": "B02",
      "title": "Improper integrals and limiting behaviour",
      "hours": 12,
      "pythonHours": 1,
      "requires": [
        "U03"
      ],
      "outcomes": [
        "M102-O2",
        "M102-O7"
      ],
      "scope": "Infinite endpoints and singular integrands through explicit limits, basic p-integral examples and elementary comparisons; split at interior singularities. Distinguish finite cutoff from convergence.",
      "boundary": "No general real-analysis treatment or principal-value replacement for a divergent ordinary integral.",
      "python": "Vary a cutoff and compare against a known convergent/divergent case.",
      "evidence": "State and evaluate defining limits; reject a misleading numerical result. TMA 01.",
      "handover": "Supplies convergence discipline and later density normalisation; extends M101 deferred scope."
    },
    {
      "id": "U05",
      "block": "B02",
      "title": "Sequences, series and controlled approximation",
      "hours": 18,
      "pythonHours": 3,
      "requires": [
        "U04"
      ],
      "outcomes": [
        "M102-O2",
        "M102-O7"
      ],
      "scope": "Sequences and partial sums, geometric series, necessary term-to-zero test and selected simple convergence examples. Taylor polynomials, elementary power series, validity intervals and finite-order error examples; distinguish an approximation from infinite equality.",
      "boundary": "No exhaustive convergence-test catalogue, Fourier series or general convergence theorem proofs. Required error control uses justified bounds in selected examples, not a general theorem course.",
      "python": "Vary approximation order and evaluation point; compare errors with a known function and show failure outside validity.",
      "evidence": "Explain validity and truncation; embedded iCMA 01 and TMA 01 after U05 cover U01–U05.",
      "handover": "Prepares numerical-error reasoning and M201; A101 core does not depend on this unit."
    },
    {
      "id": "U06",
      "block": "B03",
      "title": "Span, independence and change of basis",
      "hours": 16,
      "pythonHours": 1,
      "requires": [
        "U05"
      ],
      "outcomes": [
        "M102-O3",
        "M102-O7"
      ],
      "scope": "Finite coordinate spaces, span, independence, basis, dimension and rank in small examples; coordinate changes and consistency with M101 elimination.",
      "boundary": "No abstract vector-space axiomatic course; use small matrices and avoid re-teaching basic elimination.",
      "python": "Check a coordinate reconstruction by matrix multiplication and a hand example.",
      "evidence": "Justify a basis and convert coordinates. TMA 02.",
      "handover": "Prepares projections/eigenvectors and later physical representations."
    },
    {
      "id": "U07",
      "block": "B03",
      "title": "Orthogonality and projections",
      "hours": 16,
      "pythonHours": 2,
      "requires": [
        "U06"
      ],
      "outcomes": [
        "M102-O3",
        "M102-O7"
      ],
      "scope": "Orthogonal/orthonormal bases, normalisation, projections and elementary Gram–Schmidt in small examples. Interpret residual perpendicularity geometrically.",
      "boundary": "No general least-squares inference or numerical-conditioning theory; these require later explicit allocation.",
      "python": "Check norms, inner products and reconstruction; explain floating-point residuals.",
      "evidence": "Construct a small orthonormal basis and justify a projection. TMA 02.",
      "handover": "Prepares symmetric eigenproblems and later M201/quantum methods."
    },
    {
      "id": "U08",
      "block": "B03",
      "title": "Eigenvalues, eigenvectors and diagonalisation",
      "hours": 16,
      "pythonHours": 3,
      "requires": [
        "U01",
        "U06",
        "U07"
      ],
      "outcomes": [
        "M102-O3",
        "M102-O7"
      ],
      "scope": "Small eigenproblems; distinct/repeated and complex eigenvalues, real symmetric examples, diagonalisation when enough independent eigenvectors exist. Relate matrix action to invariant directions.",
      "boundary": "Mostly two-by-two, with simple structured three-by-three examples; no Jordan form, SVD or full spectral theorem proof.",
      "python": "Compare hand results with NumPy eigenvalues, check residuals and explain ordering, scaling and sign ambiguity.",
      "evidence": "Solve and verify a small problem; diagnose a non-diagonalisable example. Embedded iCMA 02; TMA 02 after U08.",
      "handover": "Stage 2 extends normal modes and matrix dynamics; not a hidden A101 prerequisite."
    },
    {
      "id": "U09",
      "block": "B04",
      "title": "First-order equations and initial conditions",
      "hours": 24,
      "pythonHours": 3,
      "requires": [
        "U03",
        "U08"
      ],
      "outcomes": [
        "M102-O4",
        "M102-O7"
      ],
      "scope": "Formulate bounded rate laws; separable and linear first-order equations, integrating factors, initial values and domains. Check solutions by substitution; do not lose equilibrium solutions when dividing.",
      "boundary": "No general existence/uniqueness proofs or nonlinear equation catalogue. Physical assumptions are supplied or retrieved from P101.",
      "python": "Evaluate analytic solutions and plot/check an initial value and limiting behaviour.",
      "evidence": "Choose a method, solve and explain a domain/initial condition. TMA 03.",
      "handover": "Provides the analytical benchmark for U11 and later modelling."
    },
    {
      "id": "U10",
      "block": "B04",
      "title": "Second-order equations and oscillators",
      "hours": 24,
      "pythonHours": 3,
      "requires": [
        "U02",
        "U09"
      ],
      "outcomes": [
        "M102-O4",
        "M102-O7"
      ],
      "scope": "Homogeneous constant-coefficient second-order equations, distinct/repeated/complex characteristic roots and initial conditions. A bounded set of constant, exponential and sinusoidal forcing examples using justified trial forms; distinguish transient and driven response, including a simple resonance case.",
      "boundary": "No general forcing-method catalogue, transforms or coupled-system solution course. Keep forcing examples small enough for meaningful practice.",
      "python": "Compare explicit solutions with differential-equation residuals and physical limiting cases.",
      "evidence": "Solve, impose initial conditions and verify an elementary forced solution. TMA 03.",
      "handover": "Makes P101 supplied oscillator models explicable; Stage 2 deepens dynamics."
    },
    {
      "id": "U11",
      "block": "B04",
      "title": "Numerical evolution, error and stability",
      "hours": 18,
      "pythonHours": 6,
      "requires": [
        "U09",
        "U10"
      ],
      "outcomes": [
        "M102-O4",
        "M102-O5",
        "M102-O7"
      ],
      "scope": "Derive Euler stepping from a local slope; implement scalar rate-law evolution, initial value and endpoint handling. Compare with an exact solution, refine step size and distinguish error from instability. A supplied oscillator state update illustrates energy drift without teaching a general systems course.",
      "boundary": "Euler is the required method; improved Euler may substitute an enrichment example within hours. No opaque solver as evidence of method understanding.",
      "python": "Write a clean-runnable Euler notebook; compare exact/approximate values, halve step size and explain a failure case.",
      "evidence": "Independent code, analytical benchmark and defended limitations. Embedded iCMA 03; TMA 03 after U11.",
      "handover": "Stage 2 extends numerical methods; optional A101 modelling only after readiness."
    },
    {
      "id": "U12",
      "block": "B05",
      "title": "Events, conditioning and probability models",
      "hours": 14,
      "pythonHours": 2,
      "requires": [
        "U11"
      ],
      "outcomes": [
        "M102-O6",
        "M102-O7"
      ],
      "scope": "Finite sample spaces and events, counting by elementary products/combinations, addition/multiplication rules, conditional probability, independence and Bayes reasoning with tables/trees.",
      "boundary": "No general combinatorics course or statistical inference; distinguish conditional probability from reversing a condition.",
      "python": "Enumerate a small finite model exactly and compare simulated frequencies with a declared seed and sample size.",
      "evidence": "Explain a conditional calculation and assumptions. Formative practice; final examination O6 evidence.",
      "handover": "Supports U13 and later inference; A101 required work does not wait for this late unit."
    },
    {
      "id": "U13",
      "block": "B05",
      "title": "Random variables, expectation and variance",
      "hours": 14,
      "pythonHours": 2,
      "requires": [
        "U12"
      ],
      "outcomes": [
        "M102-O6",
        "M102-O7"
      ],
      "scope": "Discrete random variables, probability tables, expectation and variance; Bernoulli and bounded binomial examples, with the independence assumption explicit. Distinguish distribution spread from observed sample spread.",
      "boundary": "No distribution catalogue, joint continuous models or central-limit proof.",
      "python": "Compute exact finite moments, compare with reproducible simulations and explain sampling variation.",
      "evidence": "Normalise a table and calculate/interpret moments. Formative evidence and final examination; no fourth TMA.",
      "handover": "Prepares continuous densities and Stage 2 statistical reasoning."
    },
    {
      "id": "U14",
      "block": "B05",
      "title": "Continuous densities and probabilistic judgement",
      "hours": 14,
      "pythonHours": 2,
      "requires": [
        "U04",
        "U13"
      ],
      "outcomes": [
        "M102-O6",
        "M102-O7"
      ],
      "scope": "Density versus point probability, normalisation, cumulative/interval probability and moments using single-variable integrals. Uniform and simple polynomial densities, plus a bounded exponential example connecting improper integrals; check domains and units.",
      "boundary": "No confidence intervals, hypothesis testing, regression or full normal-distribution theory. Those remain later responsibilities.",
      "python": "Check analytic normalisation and moments against elementary quadrature or sampling; state numerical limitations.",
      "evidence": "Explain a valid density and defend a probability result. Embedded iCMA 04 and formative written checkpoint; final exam explicitly samples U12–U14.",
      "handover": "M201/X201/P201 must extend distributions, uncertainty propagation and inference; probability code here is formative."
    }
  ],
  "assessments": [
    {
      "id": "TMA 01",
      "after": "U05",
      "hours": 6,
      "outcomes": [
        "M102-O1",
        "M102-O2",
        "M102-O7"
      ]
    },
    {
      "id": "TMA 02",
      "after": "U08",
      "hours": 6,
      "outcomes": [
        "M102-O3",
        "M102-O7"
      ]
    },
    {
      "id": "TMA 03",
      "after": "U11",
      "hours": 6,
      "outcomes": [
        "M102-O4",
        "M102-O5",
        "M102-O7"
      ]
    },
    {
      "id": "Final written examination",
      "after": "U14",
      "hours": 18,
      "outcomes": [
        "M102-O1",
        "M102-O2",
        "M102-O3",
        "M102-O4",
        "M102-O5",
        "M102-O6",
        "M102-O7"
      ]
    }
  ],
  "sources": [
    [
      "MIT 18.03SC differential equations (2011)",
      "https://ocw.mit.edu/courses/18-03sc-differential-equations-fall-2011/pages/syllabus/syllabus/",
      "Read 26 September 2026 at the corrected URL. First/second-order equations, model checks and Euler methods inform the comparison. Its transforms, general systems and nonlinear scope remain outside this bounded M102 strand."
    ],
    [
      "MIT 18.05 probability and statistics (2022)",
      "https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/syllabus/",
      "Read 26 September 2026. Finite/continuous variables, conditioning and moments checked as foundations. Its multivariable prerequisite and substantial inference scope are not claimed here; M102 is not the full course."
    ],
    [
      "Imperial statistics of measurement/project (2023–24)",
      "https://www.imperial.ac.uk/media/imperial-college/faculty-of-natural-sciences/department-of-physics/public/students/current-students/course-list/PHYS40005_StatisticsOfMeasurementSummerProject_2023-24.pdf",
      "Historical official search-indexed outcome mentions discrete/continuous distributions. Direct retrieval failed; limited corroboration only, not a fully read module specification. Fuller Imperial audit remains open."
    ]
  ]
};
