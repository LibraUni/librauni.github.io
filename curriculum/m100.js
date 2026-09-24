// Original LibraUni outline. No lesson content or learner records belong here.
export const m100 = {
  code: 'LU-M100', title: 'Mathematics & Python bridge', version: '0.7', date: '24 September 2026', credits: 30,
  status: 'Optional bridge · outside the degree · specifications awaiting review',
  purpose: 'Rebuild the mathematical language needed to begin calculus and quantitative physics: move confidently between words, symbols, numbers, graphs and short Python calculations.',
  entry: 'No calculus or programming is assumed. Recognising basic arithmetic operations and reading a simple table is sufficient to begin; fractions, signed numbers and algebra are rebuilt. A readiness conversation will identify any additional support. Existing qualifications do not automatically establish readiness or earn exemption.',
  exit: 'Prepare for Stage 1: M101 Mathematics for physics I alongside P101, followed by M102 alongside A101. This optional 30-credit bridge is outside the 360-credit degree. Take the full module only if needed; targeted preparation requires its own scope and does not earn the full module credit. Completion is not assumed.',
  blocks: [
  {
    "id": "B01",
    "title": "Calculate and express relationships",
    "units": [
      "U01",
      "U02",
      "U03",
      "U04"
    ],
    "purpose": "Build reliable calculation and algebra, alongside learner-written Python calculations, conditions, loops and checks."
  },
  {
    "id": "B02",
    "title": "Understand functions and models",
    "units": [
      "U05",
      "U06",
      "U07",
      "U08"
    ],
    "purpose": "Connect graphs, functions and geometry; handle small datasets, write functions and tests, and begin critically reviewing assistance."
  },
  {
    "id": "B03",
    "title": "Investigate and explain",
    "units": [
      "U09",
      "U10",
      "U11",
      "U12"
    ],
    "purpose": "Combine exponential, vector and data reasoning in reproducible investigations, with controlled assistance and independent explanations."
  }
],
  exitStandard: [
  [
    "E1",
    "Reliable quantitative reasoning",
    [
      "O1",
      "O5"
    ],
    "Estimate, calculate with fractions and powers, convert compound units and use scientific notation. Explain precision and recognise an implausible result.",
    "A fresh hand-worked calculation and dimensional/order-of-magnitude check."
  ],
  [
    "E2",
    "Algebra and functions",
    [
      "O2",
      "O3"
    ],
    "Rearrange formulas, solve linear and quadratic equations, track excluded values, and connect a function to its table and graph. Explain an inverse and its domain.",
    "Unseen short problems with written reasoning, substitution checks and graph interpretation."
  ],
  [
    "E3",
    "Geometry, change and direction",
    [
      "O3",
      "O4",
      "O5"
    ],
    "Use radians and trigonometry, resolve a two-dimensional vector, and interpret exponential/logarithmic relationships with appropriate units and restrictions.",
    "A labelled diagram and an explained solution using an appropriate representation."
  ],
  [
    "E4",
    "Independent scientific Python",
    [
      "O6"
    ],
    "Write a small function and loop, use conditions and arrays, load a documented small dataset, produce a labelled plot and repair a simple error.",
    "A learner-written task without generated code, with documentation allowed; predict results and test ordinary and edge cases."
  ],
  [
    "E5",
    "Model, verify and communicate",
    [
      "O5",
      "O6",
      "O7"
    ],
    "Use a supplied physical relationship to investigate a bounded question, state assumptions, check results independently and explain limitations.",
    "A clean-rerun notebook, handwritten mathematical reasoning and a short explanation of modelling choices."
  ],
  [
    "E6",
    "Control computational assistance",
    [
      "O6",
      "O7"
    ],
    "Specify a bounded change, inspect proposed code and file changes, test independently, reject faulty output and restore an earlier version.",
    "An explained review and correction of a supplied change. Hands-on agent operation must be recorded separately from critique of a supplied trace."
  ]
],
  outcomes: [
    ['O1', 'Calculate and estimate reliably', 'Use signed numbers, fractions, powers, scientific notation and appropriate precision; detect implausible results.'],
    ['O2', 'Manipulate mathematical statements', 'Simplify expressions, rearrange formulas, solve equations and inequalities, and state restrictions that make the steps valid.'],
    ['O3', 'Connect functions and representations', 'Translate between tables, graphs, formulas and descriptions; interpret parameters, domains, transformations and inverse relationships.'],
    ['O4', 'Reason about shape and direction', 'Use geometry, radians, elementary trigonometry and two-dimensional vector components with stated conventions.'],
    ['O5', 'Build and question elementary models', 'Use units, proportionality, elementary data summaries and probability to compare a model with information and explain its limits.'],
    ['O6', 'Use Python transparently', 'Write, debug and organise short Python calculations and plots; check them independently, preserve a reproducible notebook, and explain, test and accept or reject AI-suggested changes. Distinguish reviewing an agent trace from operating an agent yourself.'],
    ['O7', 'Communicate and connect reasoning', 'Write a coherent solution, explain assumptions and checks, and combine methods in an unfamiliar but bounded problem.'],
  ],
  units: [
    {id:'U01',title:'Numbers, notation & reliable calculation',hours:16,requires:[],outcomes:['O1','O6','O7'],
      scope:'Signed numbers; operation order; fractions, decimals and percentages; absolute value; number lines; exact versus approximate values; rounding and estimation. Introduce mathematical statements and the difference between an example and a general claim.',
      can:'Calculate with fractions and signs, justify an estimate and explain the precision retained in a result.',
      computing:'Open and save a notebook; run arithmetic cells; distinguish mathematical notation from Python operators and a displayed approximation from an exact value.',
      context:'Compare everyday and astronomical numerical scales without requiring astronomy knowledge.',
      evidence:'Short hand calculations with estimates and an explained computer cross-check.',
      boundary:'Powers, roots and scientific notation are developed next; floating-point error analysis belongs later.'},
    {id:'U02',title:'Powers, units & proportional reasoning',hours:18,requires:['U01'],outcomes:['O1','O5','O6','O7'],
      scope:'Integer and rational powers, roots and real-number restrictions; scientific notation; ratios and direct/inverse proportionality; SI prefixes, compound-unit conversions, dimensions and scale factors.',
      can:'Compare scales, convert a derived quantity consistently and test a proposed relation for dimensional compatibility.',
      computing:'Use named variables and math functions; attach units in names, labels and explanations rather than treating plain numbers as automatically unit-aware.',
      context:'Light-travel times and inverse-square scaling with all physical relations supplied.',
      evidence:'A unit conversion and a scaling argument with an order-of-magnitude check.',
      boundary:'Dimensional consistency is a necessary check, not proof of a physical law. Dimensional-analysis theorems are deferred.'},
    {id:'U03',title:'Algebra as a language',hours:22,requires:['U01','U02'],outcomes:['O2','O6','O7'],
      scope:'Variables, constants and parameters; substitution; collecting terms; distributivity, brackets and simple factorisation; algebraic fractions; equivalent expressions and excluded values; identities versus equations.',
      can:'Translate a verbal relationship into symbols and simplify it without changing its domain unnoticed.',
      computing:'Evaluate two proposed expressions at selected inputs and recognise that numerical agreement does not prove an identity.',
      context:'Rearrangements used in measurement formulas, with no new physics assumed.',
      evidence:'A justified simplification and a counterexample to an invalid cancellation.',
      boundary:'Full quadratic factorisation is reserved for U07; symbolic-algebra software is not required.'},
    {id:'U04',title:'Equations, inequalities & changing the subject',hours:24,requires:['U03'],outcomes:['O2','O5','O7'],
      scope:'Linear equations; formulas with several variables; two simultaneous linear equations; inequalities and intervals; sign changes; extraneous solutions; checking answers by substitution.',
      can:'Choose a solution method, retain restrictions and distinguish no solution, one solution and an underdetermined relationship.',
      computing:'Use Boolean comparisons to check candidates, alongside a written algebraic argument.',
      context:'Infer two unknown quantities from two supplied measurement relations.',
      evidence:'An independently explained formula rearrangement, system of equations and inequality.',
      boundary:'General matrix solution methods belong to M101/M102. Nonlinear root-finding algorithms are deferred.'},
    {id:'U05',title:'Coordinates, graphs & linear models',hours:20,requires:['U02','U04'],outcomes:['O3','O5','O6','O7'],
      scope:'Axes, scales and units; ordered pairs; slope and intercept; line equations and intersections; piecewise linear graphs; secant slopes and average rates; interpolation versus extrapolation.',
      can:'Recover and interpret a linear relationship from a graph or table and identify when a visual presentation is misleading.',
      computing:'Create a labelled plot with supplied plotting scaffolding; introduce lists or arrays only as needed to represent coordinate pairs.',
      context:'Position–time and calibration plots: distinguish a graph of a quantity from a picture of motion.',
      evidence:'A graph, its mathematical model and a plain-language interpretation with units.',
      boundary:'A secant slope is not a derivative. Least-squares fitting and inferential claims belong to X201.'},
    {id:'U06',title:'Functions, transformations & inverse relationships',hours:24,requires:['U03','U05'],outcomes:['O2','O3','O6','O7'],
      scope:'Function notation, inputs and outputs, domain and range; multiple representations; composition; translations and rescaling; symmetry; piecewise and absolute-value functions; one-to-one restrictions and inverses.',
      can:'Trace a composition, specify a meaningful domain and distinguish an inverse function from a reciprocal.',
      computing:'Define a small Python function, generate values and check behaviour against a sketch and known cases.',
      context:'Convert between a sensor reading and a modelled physical quantity.',
      evidence:'A function interpreted in three representations and an inverse with a justified domain.',
      boundary:'Limits and continuity become explicit concepts in M101; no hidden calculus requirement here.'},
    {id:'U07',title:'Quadratic & rational relationships',hours:22,requires:['U04','U06'],outcomes:['O2','O3','O7'],
      scope:'Polynomial arithmetic at elementary level; quadratic factorisation, completing the square and quadratic formula; discriminants and real roots; parabolas; rational expressions, excluded inputs and qualitative asymptotes.',
      can:'Select a suitable quadratic method and connect its solutions to a graph, while checking the original equation.',
      computing:'Compare a plot with analytical roots and investigate a plotting artefact near an excluded input.',
      context:'Geometric constraints and supplied trajectory formulas; no mechanics derivation is assumed.',
      evidence:'A quadratic problem solved and checked in two representations; a rational-domain explanation.',
      boundary:'Complex roots, general polynomial theory and partial fractions are later work. Asymptotes are qualitative here.'},
    {id:'U08',title:'Geometry, angles & trigonometric relationships',hours:24,requires:['U02','U06','U07'],outcomes:['O3','O4','O5','O7'],
      scope:'Similarity and Pythagoras; circle, area and volume formulas; degrees and radians; unit-circle sine, cosine and tangent; triangle methods including sine/cosine rules; basic identities; periodic graphs; inverse trig and elementary trig equations on stated intervals.',
      can:'Choose a geometric construction, resolve a triangle and interpret a periodic graph with a correct angle convention.',
      computing:'Plot periodic functions using radians and check special angles and period against hand reasoning.',
      context:'Sightlines, triangulation and a supplied oscillation model.',
      evidence:'A labelled geometric diagram and a justified trigonometric solution, including ambiguous cases where relevant.',
      boundary:'Advanced identities, complex-exponential representations and calculus of trig functions are deferred. This is the densest unit; its hours need pilot review.'},
    {id:'U09',title:'Exponential change, logarithms & scale',hours:22,requires:['U02','U04','U06'],outcomes:['O2','O3','O5','O6'],
      scope:'Exponential functions and repeated factors; logarithms as inverses, bases and laws; simple exponential equations; logarithmic axes; linearisation of supplied exponential and power-law models; positive, dimensionless log arguments.',
      can:'Distinguish additive, multiplicative and power-law change, and interpret the scale and restrictions of a logarithmic plot.',
      computing:'Compare ordinary, semilog and log–log plots; check a recovered parameter by substitution.',
      context:'Half-life and brightness-ratio models, with their physical assumptions stated rather than derived.',
      evidence:'Interpret a model parameter and explain why a particular axis scale is useful.',
      boundary:'Differential-equation derivations of exponential behaviour and derivatives of logarithms belong later.'},
    {id:'U10',title:'Vectors & the geometry of direction',hours:18,requires:['U05','U08'],outcomes:['O1','O4','O6','O7'],
      scope:'Scalars versus vectors; two-dimensional components; addition, subtraction and scaling; magnitude and direction; unit-vector notation; Cartesian/polar conversion; projections and the geometric dot product.',
      can:'Move between a diagram and components, combine vectors and check a projection using geometry.',
      computing:'Represent vectors as small arrays and compare component calculations with a labelled diagram.',
      context:'Displacement and vector quantities in a supplied model; physical laws are taught in P101.',
      evidence:'A diagram, component solution and independent magnitude/direction check.',
      boundary:'Three-dimensional cross products, vector spaces, eigenvectors and vector calculus belong to M101/M102/M201.'},
    {id:'U11',title:'Data, variation & elementary probability',hours:14,requires:['U02','U05','U06'],outcomes:['O1','O5','O6','O7'],
      scope:'Data types; mean, median and descriptive spread including standard deviation; simple distributions and plots; samples versus populations; systematic versus random effects; finite sample spaces, complements and simple independent events.',
      can:'Describe a small dataset honestly, distinguish precision from accuracy and interpret a simple probability without claiming certainty.',
      computing:'Summarise and plot supplied repeated observations, explain every reported quantity and compare selected calculations by hand.',
      context:'Repeated measurements and their variation. Observed spread is not automatically the uncertainty of a mean.',
      evidence:'A descriptive data note and a finite-probability calculation with stated assumptions.',
      boundary:'Conditional probability, continuous distributions, inference, uncertainty propagation and weighted fitting must be allocated later; this is orientation, not a statistics course.'},
    {id:'U12',title:'From a question to a defensible model',hours:16,requires:['U07','U08','U09','U10','U11'],outcomes:['O1','O2','O3','O4','O5','O6','O7'],
      scope:'Combine existing tools to define a question, select representations, state assumptions, compare model and supplied observations, test limiting cases and explain limitations. No new mathematical topic is introduced.',
      can:'Explain why a model is suitable, what its results mean and what the available evidence cannot establish.',
      computing:'Organise a small notebook with headings, readable calculations, labelled figures and a clean rerun; record source and units of supplied data.',
      context:'A guided geometric or scaling investigation linking a concrete observation with an abstract relationship.',
      evidence:'A formative model review and oral or written explanation of method choices.',
      boundary:'This rehearses integration; the independently assessed notebook has its own separate workload allocation.'},
  ],
  additionalWork: [
    {name:'Orientation and study/computing setup',hours:6,detail:'Navigation, accessible tools, file organisation and an initial non-graded readiness conversation. No diagnostic is administered by this preview.'},
    {name:'Three tutor-marked assignments (TMAs)',hours:18,detail:'Six hours each after U04, U07 and U10. Scope: quantitative/algebraic reasoning; functions/graphs including a short explained Python notebook; geometry/trigonometry/exponentials/vectors. TMA 02 allocates four hours to written reasoning and two to the notebook, including a clean rerun and independent hand check; this replaces part of its task load rather than adding hours. Pre-scheduled cut-offs in the module planner; personal changes remain possible.'},
    {name:'EMA: written mathematics, modelling notebook and explanation',hours:18,detail:'One end-of-module assessment after U12, with one submission deadline. Component A: independent Python modelling notebook (10 hours). Component B: handwritten mathematical work (4 hours) and scanning/checking its PDF (1 hour). Component C: notebook interpretation (2 hours) and a tutor discussion (1 hour). These are work budgets, not a separate timed examination.'},
    {name:'Cumulative revision',hours:12,detail:'Spaced mixed practice across units, with a targeted plan based on earlier feedback.'},
    {name:'Feedback review and targeted corrections',hours:6,detail:'Review feedback, explain corrections and revisit identified misconceptions. Additional reassessment needs, if any, will be recorded separately rather than disguised within the estimate.'},
  ],
  assessment: [
    {name:'iCMA 41',units:['U01','U02'],outcomes:['O1','O5']},
    {name:'iCMA 42',units:['U05','U06','U07'],outcomes:['O2','O3']},
    {name:'iCMA 43',units:['U09','U10','U11'],outcomes:['O3','O4','O5']},
    {name:'TMA 01',units:['U01','U02','U03','U04'],outcomes:['O1','O2','O5','O7']},
    {name:'TMA 02',units:['U05','U06','U07'],outcomes:['O2','O3','O6','O7']},
    {name:'TMA 03',units:['U08','U09','U10'],outcomes:['O1','O2','O3','O4','O5','O7']},
    {name:'EMA · Written mathematics, notebook and explanation',units:['U01','U02','U03','U04','U05','U06','U07','U08','U09','U10','U11','U12'],outcomes:['O1','O2','O3','O4','O5','O6','O7']},
  ],
};
