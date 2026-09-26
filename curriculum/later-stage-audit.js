// Original capacity hypotheses, not approved blocks or teaching.
export const laterAudit = {
  "version": "0.1",
  "date": "26 September 2026",
  "status": "Provisional progression and capacity proposal — awaiting review",
  "modules": [
    {
      "code": "M201",
      "stage": 2,
      "credits": 30,
      "study": [
        {
          "title": "Multivariable calculus and optimisation",
          "hours": 60
        },
        {
          "title": "Vector calculus and integral theorems",
          "hours": 60
        },
        {
          "title": "Fourier methods, PDEs and boundary conditions",
          "hours": 72
        },
        {
          "title": "ODE systems, eigenmethods and numerical checks",
          "hours": 48
        }
      ],
      "other": [
        {
          "title": "Orientation",
          "hours": 6
        },
        {
          "title": "TMAs",
          "hours": 24
        },
        {
          "title": "Written final including scanning/submission",
          "hours": 12
        },
        {
          "title": "Revision and feedback",
          "hours": 18
        }
      ],
      "entry": "M101 and M102; P101 physical interpretation.",
      "handover": "First teach partial derivatives before P201 analytical mechanics; vector calculus before quantitative fields; Fourier/separation methods before wave and quantum boundary problems.",
      "evidence": "Derive and solve a boundary-value problem; verify limiting cases and numerical convergence. TMAs include independent Python; written final samples all mathematical domains."
    },
    {
      "code": "P201",
      "stage": 2,
      "credits": 60,
      "study": [
        {
          "title": "Rotations, central forces and analytical mechanics",
          "hours": 108
        },
        {
          "title": "Special relativity",
          "hours": 42
        },
        {
          "title": "Thermodynamics and statistical foundations",
          "hours": 96
        },
        {
          "title": "Fields, induction and circuits",
          "hours": 78
        },
        {
          "title": "Coupled oscillations, waves and optics",
          "hours": 60
        },
        {
          "title": "Wave mechanics and introductory quantum physics",
          "hours": 96
        }
      ],
      "other": [
        {
          "title": "Orientation",
          "hours": 8
        },
        {
          "title": "TMAs",
          "hours": 48
        },
        {
          "title": "Written final preparation, sitting and submission",
          "hours": 28
        },
        {
          "title": "Revision and feedback",
          "hours": 36
        }
      ],
      "entry": "Stage 1; named M201 methods before their use.",
      "handover": "Mechanics includes angular momentum, generalised coordinates, Euler–Lagrange equations and elementary Hamiltonian dynamics. Thermal work includes entropy, thermodynamic potentials and canonical probabilities. Quantum begins after waves and the required M201 methods.",
      "evidence": "Derivations and quantitative unfamiliar problems across all six domains; independent computational validation in TMAs. No optional route replaces this breadth."
    },
    {
      "code": "X201",
      "stage": 2,
      "credits": 30,
      "study": [
        {
          "title": "Design, calibration and uncertainty propagation",
          "hours": 54
        },
        {
          "title": "Fitting, inference and model criticism",
          "hours": 60
        },
        {
          "title": "Numerical experiments and reproducible software",
          "hours": 48
        },
        {
          "title": "Two contrasting investigations and reporting practice",
          "hours": 66
        }
      ],
      "other": [
        {
          "title": "Orientation and access checks",
          "hours": 6
        },
        {
          "title": "TMAs",
          "hours": 24
        },
        {
          "title": "EMA with report and discussion",
          "hours": 24
        },
        {
          "title": "Revision and feedback",
          "hours": 18
        }
      ],
      "entry": "P101 and A101 investigations; M102 probability; M201 derivatives before multivariate propagation.",
      "handover": "Own covariance-aware propagation, likelihood/least-squares, intervals, residuals and simulation checks. P201 supplies physical theory before each investigation. No requirement for an advanced module taught later.",
      "evidence": "Calibrated analysis, justified uncertainty model, code tests, a reproducible report and oral explanation. Simulation and archived data cannot evidence apparatus handling or teamwork."
    },
    {
      "code": "P301",
      "stage": 3,
      "credits": 30,
      "study": [
        {
          "title": "Electrostatic boundary problems and materials",
          "hours": 60
        },
        {
          "title": "Magnetostatics and induction",
          "hours": 48
        },
        {
          "title": "Maxwell equations, conservation and waves",
          "hours": 72
        },
        {
          "title": "Radiation and physical applications",
          "hours": 48
        }
      ],
      "other": [
        {
          "title": "Orientation",
          "hours": 6
        },
        {
          "title": "TMAs",
          "hours": 24
        },
        {
          "title": "Written final including submission",
          "hours": 18
        },
        {
          "title": "Revision and feedback",
          "hours": 24
        }
      ],
      "entry": "P201 fields/waves/relativity; M201 vector calculus and boundary methods.",
      "handover": "Move from P201 integral laws to quantitative boundary-value fields, energy flow and radiation; avoid spending this allocation reteaching Stage 2 tools.",
      "evidence": "Analytical field solutions, boundary and conservation checks, numerical comparison; written examination covers the shared electromagnetic core."
    },
    {
      "code": "P302",
      "stage": 3,
      "credits": 30,
      "study": [
        {
          "title": "Quantum formalism, spin and angular momentum",
          "hours": 72
        },
        {
          "title": "Approximation methods and atomic applications",
          "hours": 60
        },
        {
          "title": "Solid-state foundations",
          "hours": 54
        },
        {
          "title": "Nuclear and particle foundations",
          "hours": 42
        }
      ],
      "other": [
        {
          "title": "Orientation",
          "hours": 6
        },
        {
          "title": "TMAs",
          "hours": 24
        },
        {
          "title": "Written final including submission",
          "hours": 18
        },
        {
          "title": "Revision and feedback",
          "hours": 24
        }
      ],
      "entry": "P201 quantum, statistical physics and relativity; M201 methods; M102 eigenproblems.",
      "handover": "Solid-state minimum: periodic structures, diffraction, lattice vibrations, bands and elementary semiconductor models. Nuclear/particle minimum: binding, decay, reaction energetics, conservation laws, interactions and experimental evidence. These are compulsory introductory foundations, not complete specialist courses.",
      "evidence": "Quantum calculations plus explicit assessed solid-state and nuclear/particle problems. High capacity risk: 132 hours for advanced quantum and 96 for matter breadth need problem-level testing before block approval."
    },
    {
      "code": "R300",
      "stage": 3,
      "credits": 30,
      "study": [
        {
          "title": "Question, literature, feasibility and proposal",
          "hours": 45
        },
        {
          "title": "Pilot and method validation",
          "hours": 45
        },
        {
          "title": "Main investigation with reproducible records",
          "hours": 120
        },
        {
          "title": "Synthesis, report and reproducibility package",
          "hours": 60
        },
        {
          "title": "Defence preparation and discussion",
          "hours": 15
        },
        {
          "title": "Feedback and contingency",
          "hours": 15
        }
      ],
      "other": [],
      "entry": "X201 investigative evidence plus relevant P201/M201 and Stage 3 subject prerequisites.",
      "handover": "Scope must be feasible with free tools/data and an undergraduate method. Resolve any specialist prerequisite before the corresponding project phase. No new compulsory core physics hidden in project study.",
      "evidence": "Proposal and pilot checkpoints, validated results, limitations, report, archived reproducible work and defence; all assessed production is already inside the 300 hours."
    }
  ],
  "options": [
    [
      "A301",
      "P201 thermal/quantum, M201 methods; relevant P302 atomic knowledge before stellar microphysics.",
      "Stellar structure/evolution and exoplanet interpretation; A101 supplies data experience, not advanced theory."
    ],
    [
      "A302",
      "P201 relativity/thermal physics, M201 ODEs and calculus.",
      "Expansion, cosmological observations and a budgeted introduction to curved spacetime; no full general-relativity course promised."
    ],
    [
      "C301",
      "M201 numerical/boundary methods, X201 validation and software; physics prerequisites selected by problem.",
      "Advanced numerical models and error analysis; every required basic computing skill already belongs to core modules."
    ],
    [
      "T301",
      "P201 analytical mechanics, M201 systems, M102 probability and X201 inference.",
      "Nonlinear dynamics, chaos and stochastic models; elementary Lagrangian mechanics cannot be deferred here."
    ],
    [
      "T302",
      "P201 conservation/thermal physics, M201 vector calculus/PDEs.",
      "Continuum balances, transport and fluids; constitutive assumptions and validation."
    ],
    [
      "P303",
      "P201 statistical physics and P302 quantum/solid-state foundations.",
      "Collective behaviour and deeper condensed matter; schedule after relevant P302 teaching, not an unrestricted concurrent option."
    ]
  ]
};
