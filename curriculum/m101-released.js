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
export const m101Lessons = [...m101Unit1Lessons,...m101Unit2Lessons];
