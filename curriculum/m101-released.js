export const m101Unit1Lessons = [
  {
    "id": "U01-L01",
    "unit": "U01",
    "title": "Coordinates, position and displacement",
    "hours": 3.0,
    "purpose": "Distinguish a point, its position vector and a displacement; calculate displacement from endpoints."
  },
  {
    "id": "U01-L02",
    "unit": "U01",
    "title": "Adding and scaling vectors",
    "hours": 4.0,
    "purpose": "Add, subtract and scale vectors, connecting component calculations with geometry."
  },
  {
    "id": "U01-L03",
    "unit": "U01",
    "title": "Magnitude and unit vectors",
    "hours": 4.0,
    "purpose": "Calculate lengths in two and three dimensions and construct a unit vector when defined."
  },
  {
    "id": "U01-L04",
    "unit": "U01",
    "title": "Resolving and reconstructing components",
    "hours": 4.0,
    "purpose": "Resolve a plane vector into signed components and reconstruct its magnitude and direction."
  },
  {
    "id": "U01-L05",
    "unit": "U01",
    "title": "Vector fluency and unit review",
    "hours": 3.0,
    "purpose": "Choose and explain a vector representation independently, then identify and correct remaining gaps."
  }
];

// Approved Unit 2 lesson map; only L01 teaching is released.
export const m101Unit2Lessons = [
  {
    "id": "U02-L01",
    "unit": "U02",
    "title": "Scalar products and angles",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 1,
      "mathematicalPractice": 1.5,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U01-L05"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O3",
      "M101-O6"
    ],
    "purpose": "Compute a scalar product and relate its sign and value to geometric angle.",
    "scope": "Coordinate and magnitude-angle definitions; orthogonality, acute/obtuse angles, symmetry and distributivity through small examples; angle recovery for two nonzero vectors.",
    "boundary": "Angle recovery excludes either vector being zero. A zero dot product with a zero vector does not define a right angle. No abstract inner-product theory.",
    "practiceAndEvidence": "Compare component and geometric calculations; classify angles from signs; construct a perpendicular example and explain exceptional zero cases.",
    "visualPlan": "Aligned, perpendicular and opposed vectors with signed scalar-product labels.",
    "python": "No coding required.",
    "handover": "L02 uses the scalar product to separate parallel and perpendicular parts."
  },
  {
    "id": "U02-L02",
    "unit": "U02",
    "title": "Signed projections and perpendicular parts",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 1,
      "mathematicalPractice": 1.5,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U02-L01"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O3",
      "M101-O6"
    ],
    "purpose": "Distinguish signed scalar projection from vector projection and verify a perpendicular remainder.",
    "scope": "Projection onto a specified nonzero direction; unit-direction form and dot-product formula; decomposition into parallel/perpendicular components; invariance of the projection vector under rescaling its target direction.",
    "boundary": "No projection onto the zero vector, least-squares fitting or general subspace projection.",
    "practiceAndEvidence": "Calculate both projection types and check the remainder by dot product; compare positive and negative target rescaling; explain why scalar projection can be negative. Predict geometry before arithmetic.",
    "visualPlan": "Projection foot, signed length, parallel arrow and perpendicular remainder with explicit labels.",
    "python": "No coding required.",
    "handover": "P101 force-resolution tasks can use projections after this lesson and U01 readiness; L05 checks the calculation computationally."
  },
  {
    "id": "U02-L03",
    "unit": "U02",
    "title": "Cross products and orientation",
    "hours": 3.5,
    "allocation": {
      "explanationAndExamples": 1.25,
      "mathematicalPractice": 1.75,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U02-L02"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O3",
      "M101-O6"
    ],
    "purpose": "Find and interpret an elementary 3D cross product, including magnitude and orientation.",
    "scope": "Right-handed coordinate convention; coordinate formula taught explicitly, perpendicularity, oriented parallelogram area, operand order and parallel/zero cases; embed plane vectors in 3D.",
    "boundary": "No determinant prerequisite, vector calculus or triple-product identities. Formula use must retain orientation and units.",
    "practiceAndEvidence": "Begin with coordinate basis directions, then general small integer components; verify perpendicularity to both inputs and reversal under swapped order; distinguish parallel nonzero inputs from zero input.",
    "visualPlan": "Right-handed axes, orientation arrows and a labelled parallelogram with static/text alternatives.",
    "python": "No coding required.",
    "handover": "L04 contrasts scalar and vector products; U03 later introduces determinants independently."
  },
  {
    "id": "U02-L04",
    "unit": "U02",
    "title": "Choosing a product and explaining its meaning",
    "hours": 3.5,
    "allocation": {
      "explanationAndExamples": 1,
      "mathematicalPractice": 2,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U02-L03"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O3",
      "M101-O6"
    ],
    "purpose": "Choose between scalar product, projection and cross product and explain the output and assumptions.",
    "scope": "Compare scalar versus vector outputs, signs, direction and units; abstract mixed problems plus supplied constant-force work and torque examples with definitions and assumptions stated.",
    "boundary": "P101 owns derivations and physical laws. No variable-force integration, equilibrium course or calculus prerequisite.",
    "practiceAndEvidence": "Select and justify a method before calculation; diagnose taking a magnitude when a signed result is needed; explain the zero result in parallel/perpendicular configurations for the appropriate product.",
    "visualPlan": "Paired diagrams showing parallel contribution and perpendicular lever-arm geometry; include definitions in captions.",
    "python": "No coding required.",
    "handover": "L05 consolidates geometry and validates one transparent code calculation; P101 develops the physical interpretation in its own sequence."
  },
  {
    "id": "U02-L05",
    "unit": "U02",
    "title": "Checking vector calculations and unit review",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 0.5,
      "mathematicalPractice": 0.5,
      "python": 1,
      "retrievalAndFeedback": 1
    },
    "requires": [
      "U02-L04"
    ],
    "externalRequires": [
      "P101 U01: independently run a notebook, index a list, evaluate scalar expressions, use a condition and define/call a returning function; demonstrate before coding."
    ],
    "outcomes": [
      "M101-O3",
      "M101-O6"
    ],
    "purpose": "Validate a short projection calculation against independent hand work and explain its limits.",
    "scope": "One short scalar/list/function implementation of projection; nonzero input check, ordinary and perpendicular cases, deliberate wrong-sign diagnosis; mixed unit retrieval and reference-sheet review.",
    "boundary": "No NumPy, plotting, solver, new installation course or required test framework. Numerical agreement on examples is not proof of a general identity.",
    "practiceAndEvidence": "Predict outputs, write the short function, compare hand and code values, reject a zero target vector and explain a repaired error. Reserve the final 30 review minutes for the web/PDF reference sheet and correction priorities.",
    "visualPlan": "Hand calculation and component output alongside the same projection diagram.",
    "python": "1 hour included: implement and check projection using lists and scalar arithmetic; fixed examples with hand-computable results; explain decimal discrepancies qualitatively if encountered.",
    "handover": "U03 uses the verified scalar/list/function workflow. Independent coding evidence waits for P101 readiness."
  }
];
export const m101Unit3Lessons = [
  {
    "id": "U03-L01",
    "unit": "U03",
    "title": "Matrices acting on vectors",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 1,
      "mathematicalPractice": 1.5,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U02-L05"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O4",
      "M101-O6"
    ],
    "purpose": "Read matrix dimensions and apply a small matrix to a column vector.",
    "scope": "Rows, columns, dimensions and entry notation; matrix-vector multiplication as a weighted combination of columns; identity and zero matrices; plane scaling, reflection and shear.",
    "boundary": "No abstract basis theory or eigenvectors. Use explicit coordinate geometry; dimensions must be compatible.",
    "practiceAndEvidence": "Calculate transformed points/vectors and predict basic shapes; identify columns from the images of coordinate unit vectors; diagnose a dimension mismatch.",
    "visualPlan": "Coordinate grid before/after reflection and shear with labelled basis arrows.",
    "python": "No coding required.",
    "handover": "L02 composes these transformations; L03 reuses matrix notation for coupled equations."
  },
  {
    "id": "U03-L02",
    "unit": "U03",
    "title": "Composing transformations in order",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 1,
      "mathematicalPractice": 1,
      "python": 0.5,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U03-L01"
    ],
    "externalRequires": [
      "P101 U01 programming readiness as specified at U02-L05."
    ],
    "outcomes": [
      "M101-O4",
      "M101-O6"
    ],
    "purpose": "Compute a product of two small matrices and relate order to successive transformations.",
    "scope": "Derive the 2-by-2 product from successive matrix-vector application; rightmost transformation acts first; contrast a noncommuting pair with identity and a simple commuting pair.",
    "boundary": "Do not generalise noncommutativity to a claim that every pair fails to commute. No general rotation-angle formula or new trigonometry syllabus.",
    "practiceAndEvidence": "Calculate a shear/reflection composition both ways, compare on coordinate vectors and an independent vector; hand-trace and run a supplied short scalar/list function.",
    "visualPlan": "Two transformation paths from the same starting figure, with intermediate states.",
    "python": "0.5 hour included: reuse P101 functions/lists to compare successive applications with the hand-computed product; no matrix library.",
    "handover": "L03\u2013L04 solve coupled equations; L05 returns to reversible and collapsed transformations."
  },
  {
    "id": "U03-L03",
    "unit": "U03",
    "title": "Solving simultaneous equations by elimination",
    "hours": 4.0,
    "allocation": {
      "explanationAndExamples": 1.25,
      "mathematicalPractice": 2.25,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U03-L02"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O4",
      "M101-O6"
    ],
    "purpose": "Solve small coupled linear equations using justified elimination and check against the original equations.",
    "scope": "Translate supplied relationships into a system; equation and augmented-matrix forms; reversible elementary row operations; two unknowns first and one guided three-unknown example; back substitution.",
    "boundary": "No general-purpose algorithm implementation or unqualified division by a coefficient that may be zero. Introduce row exchange explicitly.",
    "practiceAndEvidence": "Move from worked to partially completed to independent two-unknown systems; carry out a guided three-unknown solution; substitute into every original equation and explain preservation of solutions.",
    "visualPlan": "Aligned equations and row operations; intersecting lines for the two-unknown case.",
    "python": "No coding required.",
    "handover": "L04 handles cases in which elimination does not produce one unique answer; L06 samples independent reasoning."
  },
  {
    "id": "U03-L04",
    "unit": "U03",
    "title": "When solutions fail or are not unique",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 1,
      "mathematicalPractice": 1.5,
      "python": 0,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U03-L03"
    ],
    "externalRequires": [],
    "outcomes": [
      "M101-O4",
      "M101-O6"
    ],
    "purpose": "Classify unique, inconsistent and dependent small systems and represent a simple solution family.",
    "scope": "Contradiction versus redundant equation after elimination; parallel/coincident lines; a free parameter in a dependent two-unknown system; interpret a parameterised family by substitution.",
    "boundary": "No rank theorem or abstract null spaces. A singular coefficient matrix alone cannot distinguish no solutions from infinitely many.",
    "practiceAndEvidence": "Classify deliberately similar systems with different right-hand sides; show one inconsistent and one dependent case; check two members of a solution family and explain why examples alone do not describe the whole family.",
    "visualPlan": "Intersecting, parallel and coincident line pairs aligned with their reduced equations.",
    "python": "No coding required.",
    "handover": "L05 connects 2D invertibility and determinant with this distinction."
  },
  {
    "id": "U03-L05",
    "unit": "U03",
    "title": "Determinants, invertibility and computational checks",
    "hours": 4.0,
    "allocation": {
      "explanationAndExamples": 0.75,
      "mathematicalPractice": 0.75,
      "python": 2,
      "retrievalAndFeedback": 0.5
    },
    "requires": [
      "U03-L04"
    ],
    "externalRequires": [
      "P101 U01 programming readiness as specified at U02-L05."
    ],
    "outcomes": [
      "M101-O4",
      "M101-O6"
    ],
    "purpose": "Interpret a 2-by-2 determinant and validate transformation and solution calculations transparently.",
    "scope": "ad\u2212bc, signed area scale and collapse in 2D; determinant nonzero as the invertibility condition; obtain/check a simple inverse by reversing a transformation or solving for its columns; substitute hand solutions into original systems.",
    "boundary": "No 3-by-3 determinant expansion, general inverse algorithm or eigenmethods. Coding checks a supplied candidate, not an automatic solver. A zero residual is not evidence of uniqueness.",
    "practiceAndEvidence": "Use contrasting invertible and singular integer matrices; compare transformed unit-square area with determinant; write a 2-by-2 transformation function and residual calculation; test a valid, invalid and dependent-system candidate. Explain each check\u2019s limits.",
    "visualPlan": "Unit square transformed into parallelogram or collapsed line, with orientation clearly labelled.",
    "python": "2 hours included: independently implement a fixed small matrix-vector calculation and residual check with lists/functions, explain results and rerun cleanly. No solver, arrays or plotting required.",
    "handover": "L06 integrates O4/O6 evidence; M102 will extend bases, orthogonality and eigenmethods."
  },
  {
    "id": "U03-L06",
    "unit": "U03",
    "title": "Block synthesis, iCMA 01 and unit review",
    "hours": 3.0,
    "allocation": {
      "explanationAndExamples": 0.25,
      "mathematicalPractice": 0.75,
      "python": 0.5,
      "retrievalAndFeedback": 1.5
    },
    "requires": [
      "U03-L05"
    ],
    "externalRequires": [
      "P101 U01 programming readiness as specified at U02-L05."
    ],
    "outcomes": [
      "M101-O4",
      "M101-O6"
    ],
    "purpose": "Connect vector, transformation and equation methods and prepare for TMA 01 using formative evidence.",
    "scope": "Interleaved block practice, one short code interpretation/correction, embedded iCMA 01 and explanatory feedback; U03 reference table/PDF; assess readiness for the separately budgeted TMA.",
    "boundary": "No new content, additional graded assignment, invented pass threshold or claim of mastery. iCMA is formative; TMA 01 questions and criteria are released separately, with a private worked marking guide.",
    "practiceAndEvidence": "Use 1 hour of retrieval/feedback for iCMA attempt plus feedback and targeted correction, and 0.5 hour for the unit reference-sheet review. Mixed practice samples vector signs/products, composition order and system classification; the code check asks what it cannot establish.",
    "visualPlan": "Concise decision diagram connecting representation, method and independent check.",
    "python": "0.5 hour included: interpret and repair a short scalar/list residual check, using already taught syntax.",
    "handover": "TMA 01 follows with its existing separate 6 hours and O3/O4/O6 remit. B02 U04 retrieves algebra/functions; M102 extends linear algebra after relevant readiness."
  }
];

export const m101Unit4Lessons = [{"id": "U04-L01", "unit": "U04", "title": "Functions and their domains", "hours": 4, "purpose": "Specify functions and their domains, interpret elementary graphs, and compose rules while preserving input restrictions."}, {"id": "U04-L02", "unit": "U04", "title": "Limits", "hours": 3.5, "purpose": "Distinguish a value from a finite limit, use one-sided approaches and explain limitations of tables and graphs."}, {"id": "U04-L03", "unit": "U04", "title": "Calculating limits", "hours": 3.5, "purpose": "Use limit laws and justified algebraic simplification with domain conditions."}, {"id": "U04-L04", "unit": "U04", "title": "Continuity and numerical evidence", "hours": 5, "purpose": "Check continuity, compare numerical evidence with algebra and consolidate the whole unit."}];

export const m101Unit5Lessons = [{"id": "U05-L01", "unit": "U05", "title": "From secants to a derivative", "hours": 4, "purpose": "Difference quotient and first principles"}, {"id": "U05-L02", "unit": "U05", "title": "Elementary derivative families", "hours": 4, "purpose": "Powers, exponential, logarithmic and trigonometric derivatives, radians"}, {"id": "U05-L03", "unit": "U05", "title": "Products and quotients", "hours": 4, "purpose": "Product/quotient rules with domains"}, {"id": "U05-L04", "unit": "U05", "title": "The chain rule", "hours": 4, "purpose": "Composition, inner and outer changes"}, {"id": "U05-L05", "unit": "U05", "title": "Implicit and second derivatives", "hours": 4, "purpose": "Implicit differentiation, second derivatives"}, {"id": "U05-L06", "unit": "U05", "title": "Checking derivative calculations", "hours": 4, "purpose": "Independent scalar checks; cumulative exercises/reference/conclusion"}];

export const m101Unit6Lessons = [{"id": "U06-L01", "unit": "U06", "title": "Increase, decrease and stationary points", "hours": 4, "purpose": "Derivative signs and stationary points"}, {"id": "U06-L02", "unit": "U06", "title": "Concavity and extrema", "hours": 4, "purpose": "Second derivative, critical points and endpoints"}, {"id": "U06-L03", "unit": "U06", "title": "Related rates", "hours": 3, "purpose": "Supplied physical models and units"}, {"id": "U06-L04", "unit": "U06", "title": "The mean-value idea", "hours": 3, "purpose": "Statement, hypotheses and counterexamples"}, {"id": "U06-L05", "unit": "U06", "title": "Reading the shape critically", "hours": 4, "purpose": "Graph sampling/window audit and cumulative closing resources"}];

export const m101Unit7Lessons = [
{id:'U07-L01',unit:'U07',title:'Tangent-line approximations',hours:3,purpose:'Build and qualify local linear predictions, with units and exact error checks.'},
 {id:'U07-L02',unit:'U07',title:'Numerical derivatives',hours:3,purpose:'Derive, implement and compare forward and central differences without confusing an estimate with derivative existence.'},
 {id:'U07-L03',unit:'U07',title:'Why smaller is not always better',hours:4,purpose:'Investigate truncation, rounding and cancellation using independent checks and qualified numerical evidence.'},
 {id:'U07-L04',unit:'U07',title:'Block synthesis and formative checkpoint',hours:4,purpose:'Consolidate Unit 7 and Block 2, correct formative practice and prepare for separately released assessment.'}
];
export const m101Unit8Lessons = [{"id": "U08-L01", "unit": "U08", "title": "From rates to finite sums", "hours": 4, "purpose": "From rates to finite sums"}, {"id": "U08-L02", "unit": "U08", "title": "Definite integrals and signed accumulation", "hours": 4, "purpose": "Definite integrals and signed accumulation"}, {"id": "U08-L03", "unit": "U08", "title": "Accumulation functions and the fundamental theorem", "hours": 4, "purpose": "Accumulation functions and the fundamental theorem"}, {"id": "U08-L04", "unit": "U08", "title": "Antiderivatives, evaluation and initial values", "hours": 4, "purpose": "Antiderivatives, evaluation and initial values"}, {"id": "U08-L05", "unit": "U08", "title": "Rectangle sums and unit synthesis", "hours": 4, "purpose": "Rectangle sums and unit synthesis"}];
export const m101Lessons = [...m101Unit1Lessons,...m101Unit2Lessons,...m101Unit3Lessons,...m101Unit4Lessons,...m101Unit5Lessons,...m101Unit6Lessons,...m101Unit7Lessons,...m101Unit8Lessons];
