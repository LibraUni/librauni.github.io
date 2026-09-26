// Original unit blueprint. Hours include practice, computing and embedded checkpoints.
export const m101Units = {
  "version": "0.1",
  "date": "26 September 2026",
  "status": "Complete unit proposal — awaiting review",
  "units": [
    {
      "id": "U01",
      "block": "B01",
      "title": "Coordinates, vectors and components",
      "hours": 18,
      "pythonHours": 0,
      "requires": [],
      "outcomes": [
        "M101-O3"
      ],
      "purpose": "Represent magnitude and direction consistently.",
      "scope": "Coordinates in two and three dimensions; displacement vectors, magnitude, unit vectors, addition and scalar multiplication; resolve components using trigonometry. Retrieve algebra, angles and units through short entry checks and abstract practice.",
      "boundary": "No force laws, abstract vector spaces or calculus. Longer readiness remediation is separately scoped.",
      "python": "Hand and diagram work; no coding prerequisite.",
      "evidence": "Resolve and reconstruct vectors, distinguish position from displacement and explain signs and units. Practice contributes to TMA 01 readiness.",
      "handover": "P101 may use components after this unit, before the rest of B01 is complete."
    },
    {
      "id": "U02",
      "block": "B01",
      "title": "Products, projections and orientation",
      "hours": 16,
      "pythonHours": 1,
      "requires": [
        "U01"
      ],
      "outcomes": [
        "M101-O3",
        "M101-O6"
      ],
      "purpose": "Relate vector calculations to angles and geometry.",
      "scope": "Scalar product, angle and orthogonality; scalar/vector projections; elementary cross product, magnitude, orientation and parallel cases. Distinguish scalar and vector outputs; supplied work/torque contexts explain their assumptions.",
      "boundary": "Vector calculus and physical derivations of work or torque are outside scope.",
      "python": "Requires P101 scalar arithmetic, lists and functions first. Check a projection or cross product using transparent component calculations.",
      "evidence": "Explain a projection geometrically, check perpendicularity and right-hand orientation; compare hand/code results, including a degenerate case. TMA 01 evidence.",
      "handover": "P101 projections before force resolution; product geometry before later work/torque applications."
    },
    {
      "id": "U03",
      "block": "B01",
      "title": "Matrices, transformations and simultaneous equations",
      "hours": 20,
      "pythonHours": 3,
      "requires": [
        "U01",
        "U02"
      ],
      "outcomes": [
        "M101-O4",
        "M101-O6"
      ],
      "purpose": "Represent and classify small coupled linear relationships.",
      "scope": "Matrix-vector multiplication and composition in order; two-dimensional transformations; elimination in small systems, including a guided three-unknown example. Unique, inconsistent and dependent systems; elementary determinants and invertibility in two dimensions.",
      "boundary": "No general determinant expansion syllabus, abstract vector-space theory or eigenproblems; those need M102 allocation.",
      "python": "P101 list/function foundation required. Code a small transformation and verify a hand-solved system by substitution, without a black-box solver.",
      "evidence": "Solve and classify systems, explain composition order and interpret a zero determinant. Embedded iCMA 01 then TMA 01 samples U01–U03.",
      "handover": "M102 extends bases, orthogonality and eigenmethods; P101 need not wait for this unit to use vectors."
    },
    {
      "id": "U04",
      "block": "B02",
      "title": "Functions, limits and continuity",
      "hours": 16,
      "pythonHours": 1,
      "requires": [
        "U03"
      ],
      "outcomes": [
        "M101-O1",
        "M101-O5",
        "M101-O6"
      ],
      "purpose": "Establish when local reasoning about a function is justified.",
      "scope": "Targeted retrieval of domains, composition and elementary functions; finite and one-sided limits, algebraic simplification and continuity; examples where a function value and limiting value differ. Numerical evidence and its limitations.",
      "boundary": "No full epsilon-delta development or infinite-series theory. Arrays/plots are only used after their P101 handover.",
      "python": "Evaluate a sequence of nearby inputs with scalar functions; compare numerical suggestions with algebraic reasoning.",
      "evidence": "Determine a limit, state a domain restriction and give a continuity counterexample; explain why a table is not a proof. TMA 02 preparation.",
      "handover": "Limits support derivative and integral definitions; discontinuities reappear in U11 validation."
    },
    {
      "id": "U05",
      "block": "B02",
      "title": "Derivatives and differentiation methods",
      "hours": 24,
      "pythonHours": 2,
      "requires": [
        "U04"
      ],
      "outcomes": [
        "M101-O1",
        "M101-O6"
      ],
      "purpose": "Connect a local rate to a precise mathematical operation.",
      "scope": "Difference quotient and derivative definition; a simple first-principles derivation; power, exponential, logarithmic and trigonometric derivatives (radians). Product, quotient and chain rules; implicit differentiation and second derivatives. Plenty of abstract fluency practice.",
      "boundary": "No ODE solution methods or multivariable differentiation.",
      "python": "After P101 functions, compare a hand derivative with nearby secant slopes. Plotting is conditional on P101 array/plot induction.",
      "evidence": "Derive a simple derivative, explain each rule choice, distinguish derivative value from function value and check units. TMA 02 evidence.",
      "handover": "P101 calculus-based velocity and acceleration follow this unit; earlier mechanics can use supplied constant-rate models."
    },
    {
      "id": "U06",
      "block": "B02",
      "title": "Rates, extrema and the shape of a function",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U05"
      ],
      "outcomes": [
        "M101-O1",
        "M101-O5",
        "M101-O6"
      ],
      "purpose": "Use derivatives to make justified claims about behaviour.",
      "scope": "Monotonicity, stationary points, second derivative and concavity; extrema on a closed interval including endpoints. Related rates in supplied models; mean-value theorem statement, hypotheses and geometric meaning. Counterexamples to careless inference.",
      "boundary": "No general optimisation algorithms or proof-based real analysis.",
      "python": "After P101 plotting induction, compare analytical features with a graph and deliberately vary the plotting window or sampling.",
      "evidence": "Justify an extremum and its domain, formulate a related-rate relation and diagnose a misleading graph. TMA 02 evidence.",
      "handover": "P101 rate interpretation and M102 model analysis; calculus claims retain their hypotheses."
    },
    {
      "id": "U07",
      "block": "B02",
      "title": "Linear approximation and numerical derivatives",
      "hours": 14,
      "pythonHours": 3,
      "requires": [
        "U05",
        "U06"
      ],
      "outcomes": [
        "M101-O1",
        "M101-O5",
        "M101-O6"
      ],
      "purpose": "Choose and test a local approximation.",
      "scope": "Tangent-line approximation, locality and units; forward and central finite differences; step-size experiments distinguishing truncation and floating-point cancellation. Compare against a known derivative; contrast empirical error with a proved bound.",
      "boundary": "Systematic Taylor expansions and advanced error analysis belong later; sensitivity is not a full uncertainty course.",
      "python": "Write finite-difference functions, test ordinary and problematic points, tabulate step size and error; plotting only after P101 induction.",
      "evidence": "Explain where linearisation fails and why reducing step size need not improve a numerical derivative. Embedded iCMA 02 then TMA 02 samples U04–U07.",
      "handover": "M102 series extends the local idea; A101 expects approximation checks, not blind numerical trust."
    },
    {
      "id": "U08",
      "block": "B03",
      "title": "Accumulation and the fundamental theorem",
      "hours": 20,
      "pythonHours": 1,
      "requires": [
        "U07"
      ],
      "outcomes": [
        "M101-O2",
        "M101-O6"
      ],
      "purpose": "Connect a rate with the quantity accumulated over an interval.",
      "scope": "Finite sums leading to definite integrals; signed accumulation, interval orientation, antiderivatives and constants. Both directions of the fundamental theorem with appropriate continuity conditions; elementary antiderivatives and initial values.",
      "boundary": "No differential-equation solution catalogue, improper integrals or multiple integration.",
      "python": "Construct a small rectangle sum with existing loops/functions and compare with an exactly integrable case.",
      "evidence": "Explain the rate/accumulation connection, differentiate an accumulation function and evaluate an integral with units. TMA 03 preparation.",
      "handover": "P101 integral-based work/flow follows U08 plus U02; M102 ODE/probability work relies on this foundation."
    },
    {
      "id": "U09",
      "block": "B03",
      "title": "Choosing an integration method",
      "hours": 24,
      "pythonHours": 2,
      "requires": [
        "U08"
      ],
      "outcomes": [
        "M101-O2",
        "M101-O6"
      ],
      "purpose": "Select and verify elementary antiderivatives.",
      "scope": "Elementary integral fluency, substitution with transformed limits and introductory integration by parts. Recognise structure and check an antiderivative by differentiating; distinguish definite and indefinite answers.",
      "boundary": "Further rational/trigonometric techniques, improper integrals and systematic series are deferred explicitly to M102.",
      "python": "Evaluate selected results at sample endpoints; numerical agreement supplements a derivative check and does not establish an identity.",
      "evidence": "Explain method choice, preserve constants/limits and reject an incorrect antiderivative. TMA 03 evidence.",
      "handover": "M102 extends techniques; P101 applications use only techniques already available."
    },
    {
      "id": "U10",
      "block": "B03",
      "title": "Integral models, signs and dimensions",
      "hours": 18,
      "pythonHours": 2,
      "requires": [
        "U08",
        "U09",
        "U02"
      ],
      "outcomes": [
        "M101-O2",
        "M101-O6"
      ],
      "purpose": "Translate a bounded physical or geometric question into an integral.",
      "scope": "Area versus signed area, displacement versus distance with reversal, mean value of a function and simple volumes by slices. Supplied work and accumulated-flow models; identify integrand, bounds, dimensions and assumptions.",
      "boundary": "No new physical laws assumed; no surface/line integrals or general solids techniques.",
      "python": "Use existing functions and plots to inspect domains, sign changes and plausible scale before calculation.",
      "evidence": "Formulate and explain an integral, split an interval where required and check dimensions and limiting cases. TMA 03 evidence.",
      "handover": "P101 owns the physical theory; A101 later interprets accumulated signals using these distinctions."
    },
    {
      "id": "U11",
      "block": "B03",
      "title": "Numerical integration and trustworthy checks",
      "hours": 16,
      "pythonHours": 5,
      "requires": [
        "U09",
        "U10"
      ],
      "outcomes": [
        "M101-O2",
        "M101-O5",
        "M101-O6"
      ],
      "purpose": "Compute an approximation and test whether it is credible.",
      "scope": "Rectangle, midpoint and trapezoidal quadrature; resolution refinement and analytical benchmarks. Smooth versus problematic functions, interval orientation, missed features and misleading convergence; distinguish an estimate from a justified bound.",
      "boundary": "No adaptive-library methods, Simpson-rule syllabus or formal numerical-analysis course required.",
      "python": "P101 arrays/plotting and prior functions required. Implement transparent quadrature, check a hand-computable subset and a known integral, test an edge case and explain refinement results.",
      "evidence": "Independent readable code with numerical/analytical comparisons, an identified failure mode and limitations. Embedded iCMA 03 then TMA 03 samples U08–U11 and stated cumulative items.",
      "handover": "A101 numerical signal work; later computational modules deepen convergence and error analysis."
    },
    {
      "id": "U12",
      "block": "B04",
      "title": "Validation, sensitivity and competing answers",
      "hours": 18,
      "pythonHours": 4,
      "requires": [
        "U03",
        "U07",
        "U11"
      ],
      "outcomes": [
        "M101-O1",
        "M101-O2",
        "M101-O4",
        "M101-O5",
        "M101-O6"
      ],
      "purpose": "Distinguish disagreement caused by assumptions, approximations or code.",
      "scope": "Within a supplied bounded model, compare hand, graphical and computational answers; vary an input or resolution, identify domain/scale restrictions and separate model, approximation and implementation error. Critique and repair a supplied flawed check.",
      "boundary": "Reuse established methods; no new ODE, eigenvalue or series syllabus. Newton iteration is an optional substitution for an example within these hours, not extra required work.",
      "python": "Clean-runnable notebook, independent benchmark and edge case; explain any assistance. No required AI agent use.",
      "evidence": "Formative feedback on justified checks, sensitivity and error diagnosis; written reasoning informs final exam preparation. No extra TMA.",
      "handover": "M102/A101 receive expectations for reproducibility and explicit model limitations."
    },
    {
      "id": "U13",
      "block": "B04",
      "title": "Connecting mathematical representations",
      "hours": 18,
      "pythonHours": 4,
      "requires": [
        "U12"
      ],
      "outcomes": [
        "M101-O1",
        "M101-O2",
        "M101-O3",
        "M101-O4",
        "M101-O5",
        "M101-O6"
      ],
      "purpose": "Transfer the module’s tools to a coherent unfamiliar setting.",
      "scope": "A scaffolded synthesis using a supplied planar motion or transport model with explicit assumptions: vector/matrix representation, local rate and accumulated quantity. Choose methods, compare representations and explain approximation limits; short transfer questions vary the setting.",
      "boundary": "Taught synthesis, not the separate 12-hour revision allocation, an EMA or a demand to discover new physics. Assess independence through existing TMAs, not participation.",
      "python": "Combine known functions into a reproducible short investigation, include an analytical and edge-case check and communicate limitations.",
      "evidence": "Formative synthesis checkpoint covers all six outcomes. Final written examination samples reasoning and supplied-code interpretation; executed coding evidence remains in TMAs.",
      "handover": "Ready for M102/A101 only through demonstrated capabilities; this outline does not establish learner attainment."
    }
  ]
};
