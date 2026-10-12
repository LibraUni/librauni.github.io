export const p101Block2Lessons = {
  "version": "1.0",
  "date": "2026-10-12",
  "status": "Production blueprint within approved block scope; only U04-L01 released",
  "lessons": [
    {
      "id": "U04-L01",
      "unit": "U04",
      "block": "B02",
      "title": "Systems, interactions and force diagrams",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Choose a system and identify external interactions before calculating.",
      "scope": "System boundaries; agent\u2013recipient labels; contact/gravity; particle diagrams; supplied force components and resultant; audit omissions.",
      "boundary": "No Newton-law calculation, force coefficients or calculus.",
      "evidence": "Annotated scene, force inventory and corrected diagram.",
      "requires": [
        "P101-U03",
        "M101-U01",
        "M101-U02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 70,
        "writtenPractice": 80,
        "python": 0,
        "feedback": 30
      },
      "handover": "Newton\u2019s laws and equilibrium"
    },
    {
      "id": "U04-L02",
      "unit": "U04",
      "block": "B02",
      "title": "Newton\u2019s laws and equilibrium",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Connect resultant force with change in velocity.",
      "scope": "Physical acceleration and inertial reference; mass; first/second/third laws; balanced forces; distinguish interaction pairs from forces on one body.",
      "boundary": "No calculus, turning moments or rotating frames.",
      "evidence": "Explain rest versus steady motion; solve signed force\u2013acceleration cases.",
      "requires": [
        "U04-L01"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 0,
        "feedback": 30
      },
      "handover": "Weight, support, tension and friction"
    },
    {
      "id": "U04-L03",
      "unit": "U04",
      "block": "B02",
      "title": "Weight, support, tension and friction",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Turn named interactions into defensible quantitative models.",
      "scope": "Weight mg; normal as perpendicular contact component; ideal taut rope; static friction inequality and sliding friction model; inclined-plane components.",
      "boundary": "No general pulley networks, rigid-body statics or universal friction claims.",
      "evidence": "Select directions, state assumptions, test equilibrium and incipient slip.",
      "requires": [
        "U04-L02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 85,
        "writtenPractice": 125,
        "python": 0,
        "feedback": 30
      },
      "handover": "Constant-acceleration motion"
    },
    {
      "id": "U04-L04",
      "unit": "U04",
      "block": "B02",
      "title": "Constant-acceleration motion",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Predict motion using a constant acceleration with explicit initial conditions.",
      "scope": "Average versus instantaneous rate; velocity\u2013time area for constant acceleration; algebraic kinematic relations; vertical motion and signs.",
      "boundary": "No differentiation requirement or variable-acceleration integration.",
      "evidence": "Derive and select a relation; check initial, zero-acceleration and turning cases.",
      "requires": [
        "U04-L03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 0,
        "feedback": 30
      },
      "handover": "Projectile motion and unit synthesis"
    },
    {
      "id": "U04-L05",
      "unit": "U04",
      "block": "B02",
      "title": "Projectile motion and unit synthesis",
      "hours": 5,
      "pythonHours": 2,
      "purpose": "Combine perpendicular motion models and test a predicted trajectory.",
      "scope": "Independent components under uniform gravity without drag; launch components; landing conditions; Python algebraic functions/plots; cumulative exercises, conclusion and compact web/PDF reference.",
      "boundary": "No ODE integration, drag solver or optimisation calculus.",
      "evidence": "Diagram-led trajectory with hand benchmark and qualified conclusion; mixed unit solutions.",
      "requires": [
        "U04-L04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 35,
        "writtenPractice": 100,
        "python": 120,
        "feedback": 45
      },
      "handover": "U05 circular motion"
    },
    {
      "id": "U05-L01",
      "unit": "U05",
      "block": "B02",
      "title": "Direction changes in circular motion",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Describe changing velocity at constant speed.",
      "scope": "Radial direction; period, frequency and speed; geometric motivation for radial acceleration.",
      "boundary": "No calculus derivation required.",
      "evidence": "Velocity-vector sketches and radial-acceleration scaling.",
      "requires": [
        "U04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 0,
        "feedback": 30
      },
      "handover": "Forces that sustain a circle"
    },
    {
      "id": "U05-L02",
      "unit": "U05",
      "block": "B02",
      "title": "Forces that sustain a circle",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Identify the physical interactions supplying the inward resultant.",
      "scope": "Radial Newton equation; horizontal and simple vertical-circle instants; contact limits.",
      "boundary": "No new centripetal interaction or rotating reference frame.",
      "evidence": "Force diagrams with inward signs and contact checks.",
      "requires": [
        "U05-L01"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 75,
        "writtenPractice": 135,
        "python": 0,
        "feedback": 30
      },
      "handover": "Gravitation and a circular orbit"
    },
    {
      "id": "U05-L03",
      "unit": "U05",
      "block": "B02",
      "title": "Gravitation and a circular orbit",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Connect inverse-square attraction to an ideal orbit.",
      "scope": "Newtonian gravitation, mass versus weight; circular speed and period; central-body approximation.",
      "boundary": "No general orbit integration, Kepler derivation or relativity.",
      "evidence": "Hand calculation plus scalar/array scaling checks.",
      "requires": [
        "U05-L02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "handover": "Comparing orbital models"
    },
    {
      "id": "U05-L04",
      "unit": "U05",
      "block": "B02",
      "title": "Comparing orbital models",
      "hours": 4,
      "pythonHours": 2,
      "purpose": "Use computation to compare radius and mass dependence.",
      "scope": "Transparent algebraic orbit functions; units; benchmark; model versus evidence.",
      "boundary": "No new fitting or numerical solver.",
      "evidence": "Rerunnable two-scenario comparison and limitations.",
      "requires": [
        "U05-L03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 45,
        "writtenPractice": 45,
        "python": 120,
        "feedback": 30
      },
      "handover": "Gravity across scales and unit review"
    },
    {
      "id": "U05-L05",
      "unit": "U05",
      "block": "B02",
      "title": "Gravity across scales and unit review",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Consolidate force selection and orbital interpretation.",
      "scope": "Mixed exercises, scientific context, conclusion and synchronised reference.",
      "boundary": "No claim to cover general central-force mechanics.",
      "evidence": "Independently reasoned mixed problems and corrections.",
      "requires": [
        "U05-L04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 35,
        "writtenPractice": 100,
        "python": 0,
        "feedback": 45
      },
      "handover": "U06 balances"
    },
    {
      "id": "U06-L01",
      "unit": "U06",
      "block": "B02",
      "title": "Momentum and a chosen system",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Build signed momentum and external impulse accounting.",
      "scope": "Momentum; constant/average force over a bounded interval; system choice.",
      "boundary": "No continuous-force integration.",
      "evidence": "Signed momentum changes with units and interaction inventory.",
      "requires": [
        "U04",
        "U05",
        "M101-U02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 0,
        "feedback": 30
      },
      "handover": "Collisions and conservation"
    },
    {
      "id": "U06-L02",
      "unit": "U06",
      "block": "B02",
      "title": "Collisions and conservation",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Decide when momentum conservation is justified.",
      "scope": "Isolated approximation, one-dimensional collisions, before/after bookkeeping, qualitative kinetic-energy comparison.",
      "boundary": "No general centre-of-mass theory or coefficient-of-restitution course.",
      "evidence": "Collision record/model checked by hand and code.",
      "requires": [
        "U06-L01"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "handover": "Work and kinetic energy"
    },
    {
      "id": "U06-L03",
      "unit": "U06",
      "block": "B02",
      "title": "Work and kinetic energy",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Connect constant-force work with motion changes.",
      "scope": "Work via displacement projection; work\u2013kinetic energy relation; negative/zero work; method choice.",
      "boundary": "Variable-force work reserved for U11.",
      "evidence": "Explained work balance with component/dot-product retrieval.",
      "requires": [
        "U06-L02"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 75,
        "writtenPractice": 135,
        "python": 0,
        "feedback": 30
      },
      "handover": "Potential energy and transfers"
    },
    {
      "id": "U06-L04",
      "unit": "U06",
      "block": "B02",
      "title": "Potential energy and transfers",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Choose an energy system and track storage and transfer.",
      "scope": "Near-surface gravitational potential; mechanical energy; dissipative transfers; bounded computation.",
      "boundary": "No rotational energy or general field potentials.",
      "evidence": "Hand/code energy ledger including an impossible result.",
      "requires": [
        "U06-L03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "handover": "Choosing a balance and unit review"
    },
    {
      "id": "U06-L05",
      "unit": "U06",
      "block": "B02",
      "title": "Choosing a balance and unit review",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Select force, momentum or energy reasoning.",
      "scope": "Mixed exercises, collision-analysis synthesis, conclusion and reference.",
      "boundary": "No extra assessed submission.",
      "evidence": "Method selection with assumptions and corrected solutions.",
      "requires": [
        "U06-L04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 35,
        "writtenPractice": 100,
        "python": 0,
        "feedback": 45
      },
      "handover": "U07 thermal transfers"
    },
    {
      "id": "U07-L01",
      "unit": "U07",
      "block": "B02",
      "title": "Temperature, heat and internal energy",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Separate a measured thermal state from transfer and storage.",
      "scope": "Operational temperature; heat transfer; internal energy; limited microscopic picture.",
      "boundary": "No entropy, cycles or statistical mechanics.",
      "evidence": "Classify claims and explain a microscopic model\u2019s limits.",
      "requires": [
        "U06"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 0,
        "feedback": 30
      },
      "handover": "Thermal energy balances"
    },
    {
      "id": "U07-L02",
      "unit": "U07",
      "block": "B02",
      "title": "Thermal energy balances",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Apply elementary balances with stated system boundaries.",
      "scope": "Heating/cooling, specific heat and simple work/heat accounting; supplied parameters and code checks.",
      "boundary": "No phase-diagram survey or thermodynamic-cycle analysis.",
      "evidence": "Energy ledger and hand-computable numerical benchmark.",
      "requires": [
        "U07-L01"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "handover": "Motion as a rate of change"
    },
    {
      "id": "U07-L03",
      "unit": "U07",
      "block": "B02",
      "title": "Motion as a rate of change",
      "hours": 3,
      "pythonHours": 1,
      "purpose": "Revisit velocity and acceleration after M101 differentiation.",
      "scope": "Derivatives of supplied elementary position expressions; physical units/signs; numerical substitution.",
      "boundary": "Requires M101 U05; no new calculus course or ODEs.",
      "evidence": "Hand derivatives checked at chosen times and interpreted.",
      "requires": [
        "U07-L02",
        "M101-U05"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 40,
        "writtenPractice": 50,
        "python": 60,
        "feedback": 30
      },
      "handover": "Testing competing motion assumptions"
    },
    {
      "id": "U07-L04",
      "unit": "U07",
      "block": "B02",
      "title": "Testing competing motion assumptions",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Compare models with documented observations.",
      "scope": "Common observations, residuals, measurement limitations versus numerical errors, reproducible handover.",
      "boundary": "No formal fitting, inference or uncertainty propagation.",
      "evidence": "Bounded comparison and qualified report; source licensing checked at authoring.",
      "requires": [
        "U07-L03"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 60,
        "writtenPractice": 90,
        "python": 60,
        "feedback": 30
      },
      "handover": "Block synthesis and formative checkpoint"
    },
    {
      "id": "U07-L05",
      "unit": "U07",
      "block": "B02",
      "title": "Block synthesis and formative checkpoint",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Connect mechanics and thermal reasoning before TMA02.",
      "scope": "Whole-unit exercises, block synthesis, embedded iCMA02, conclusion and compact reference.",
      "boundary": "TMA02 retains separate six hours; no invented assessment completion.",
      "evidence": "Mixed written reasoning, formative feedback and corrections.",
      "requires": [
        "U07-L04"
      ],
      "outcomes": [
        "P101-O1",
        "P101-O2",
        "P101-O5",
        "P101-O6",
        "P101-O7"
      ],
      "allocationMinutes": {
        "explanation": 40,
        "writtenPractice": 100,
        "python": 0,
        "feedback": 100
      },
      "handover": "Separate TMA02; B03 oscillation"
    }
  ]
};
