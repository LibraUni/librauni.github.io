// Section plans only; no lesson text or learner evidence is released.
export const openingSections = {
  "version": "1.0",
  "date": "26 September 2026",
  "status": "Opening lesson section blueprint — approved",
  "lesson": "U01-L01",
  "minutes": 240,
  "sections": [
    {
      "id": "U01-L01-S01",
      "title": "Before we begin: read, predict, explain",
      "minutes": 20,
      "allocationMinutes": [
        5,
        5,
        0,
        0,
        10
      ],
      "requires": [],
      "purpose": "Understand the lesson goal and retrieve elementary arithmetic without a speed test.",
      "scope": "Assume only the module entry readiness and guided notebook orientation. Explain the difference between an answer, the steps producing it and a check. No algebra notation or prior programming is required.",
      "practice": "Three short retrieval prompts on ordering whole numbers, subtraction and a bracketed calculation; then one model of an explained answer. These identify the support needed and do not award exemption or completion.",
      "feedback": "Immediate explanatory feedback identifies a sign, reading or arithmetic issue; direct the learner to the appropriate later section. Avoid treating hesitation as lack of ability.",
      "visuals": "A compact lesson route with text labels; no decorative image is required.",
      "handover": "A learner can state what to predict and what to explain. S02 introduces signed positions; unresolved elementary calculation needs get targeted support."
    },
    {
      "id": "U01-L01-S02",
      "title": "Position, direction and distance from zero",
      "minutes": 40,
      "allocationMinutes": [
        15,
        25,
        0,
        0,
        0
      ],
      "requires": [
        "U01-L01-S01"
      ],
      "purpose": "Locate and order positive and negative numbers; distinguish signed position from absolute value.",
      "scope": "Define a reference zero, increasing direction, opposite numbers and absolute-value notation. Distinguish distance from zero from a signed coordinate. A number line is a mathematical representation, not a graph of a function.",
      "practice": "Two annotated examples, four increasingly independent number-line/order/absolute-value tasks and one error-analysis prompt. Include zero and two negative values. Short coordinate examples illustrate meaning without a separate physics investigation.",
      "feedback": "Feedback explains why a negative number with larger magnitude is smaller, and why distance is non-negative. An optional pair of scaffolded items replaces equivalent practice when needed.",
      "visuals": "Original SVG number line with evenly spaced ticks, marked origin and increasing direction; matching text description and distance annotations. Colour must not carry meaning alone.",
      "handover": "Explain sign and magnitude separately. S03 uses positions and directed changes; formal vectors and graph axes remain later work."
    },
    {
      "id": "U01-L01-S03",
      "title": "A sign is not always a subtraction",
      "minutes": 45,
      "allocationMinutes": [
        15,
        30,
        0,
        0,
        0
      ],
      "requires": [
        "U01-L01-S02"
      ],
      "purpose": "Calculate with signed numbers and distinguish a unary sign from a binary operation.",
      "scope": "Explain addition/subtraction using directed change and additive inverses, then signed multiplication/division. Justify the multiplication sign rules through distributivity at a numerical level. State that division by zero is undefined.",
      "practice": "Three worked examples with progressively reduced scaffolding, six mixed calculations and two explain-the-error items. Include subtracting a negative and distinguishing a negative result from an impossible division.",
      "feedback": "Give a reasoning path, not merely a sign-rule slogan. Back-up items target one diagnosed sign issue; do not add an unbounded compulsory drill.",
      "visuals": "Paired number lines distinguish the starting value and change. Use labelled arrows and a text equivalent; do not suggest multiplication is always literal movement.",
      "handover": "Explain the role of each sign in a short expression. S04 adds operation order; symbolic distributivity is taught fully in U03."
    },
    {
      "id": "U01-L01-S04",
      "title": "Which operation happens first?",
      "minutes": 45,
      "allocationMinutes": [
        20,
        25,
        0,
        0,
        0
      ],
      "requires": [
        "U01-L01-S03"
      ],
      "purpose": "Evaluate expressions by their structure, respecting brackets and the equal precedence of multiplication/division and addition/subtraction.",
      "scope": "Use brackets first; multiply/divide left to right at the same precedence, then add/subtract left to right. Distinguish a negative literal from subtraction. Explain mathematical multiplication symbols and explicit grouping. Exponents and ambiguous implicit-multiplication conventions are excluded.",
      "practice": "Three worked chains including equal-precedence operations, five independent expressions, and one comparison of a plausible wrong solution with a justified solution. Parentheses change the structure, not merely the appearance.",
      "feedback": "Feedback identifies the first invalid step and reconstructs the expression. Include an item that exposes the mistaken rule that multiplication always precedes division.",
      "visuals": "A small expression tree and a parallel annotated reduction chain, both readable in text. Explain tree nodes before using the diagram; no tree terminology is a prerequisite.",
      "handover": "Predict and justify a grouped expression by hand. S05 translates the same structure into Python without relying on code to supply the prediction."
    },
    {
      "id": "U01-L01-S05",
      "title": "Type the calculation yourself",
      "minutes": 60,
      "allocationMinutes": [
        0,
        0,
        60,
        0,
        0
      ],
      "requires": [
        "U01-L01-S04"
      ],
      "purpose": "Translate a short arithmetic expression into Python, predict its result and explain a simple syntax repair.",
      "scope": "Reuse the prepared notebook and kernel. Teach integer and decimal literals, +, -, *, / and parentheses; introduce the final-expression display in a code cell. A result such as 2.0 can represent the same numerical value as 2; formal type distinctions come in L02. No variables, print, powers, functions, arrays or generated code required.",
      "practice": "Budget the Python hour as 15 minutes guided examples, 30 minutes for four predict/type/run/explain cycles, 10 minutes repairing a supplied unmatched-parenthesis error, and 5 minutes saving/checking the notebook. The final expression is chosen and typed independently from a short specification.",
      "feedback": "Read the location and message of SyntaxError without assuming every reported location is the original cause. Compare with a separately written calculation. Distinguish repairing syntax from verifying mathematical intent; a successful run alone proves neither.",
      "visuals": "Annotated code/output/error panels rendered as accessible text, not screenshots that hide code. A notation key relates mathematical multiplication to *.",
      "handover": "A saved short calculation with a prior prediction and explained repair. S06 reviews this evidence; assignment and named values remain L02. Extra environment troubleshooting is recorded separately rather than counted as conceptual failure."
    },
    {
      "id": "U01-L01-S06",
      "title": "Check the reasoning and carry it forward",
      "minutes": 30,
      "allocationMinutes": [
        5,
        5,
        0,
        0,
        20
      ],
      "requires": [
        "U01-L01-S05"
      ],
      "purpose": "Bring together signed-number interpretation, ordered calculation and an explanation of what a computer check establishes.",
      "scope": "Retrieve the distinction between position and distance, sign and operation, valid syntax and intended calculation. The checkpoint is formative and uses only material taught in S01–S05.",
      "practice": "Within 30 minutes: five minutes synthesis, five minutes one mixed practice item, 15 minutes for four brief checkpoint prompts, and five minutes feedback/next-step planning. Checkpoint coverage: negative-number order/absolute value; signed operations; equal precedence/brackets; interpretation of the saved Python result. No further execution is required in this section.",
      "feedback": "Provide worked reasoning after an attempt and link each misconception to its teaching section. No percentage threshold or timed speed requirement; unresolved essentials receive focused practice before dependent work. Tutor judgement and later independent assessment establish mastery, not ticking this page.",
      "visuals": "A concise text-first recap with links to the relevant diagrams and a four-part self-check; no new representation introduced.",
      "handover": "Hand over reliable signed calculation and explicit grouping to U01-L02 fractions, decimals and named values. E1a/E4a are rehearsed only in part; TMA01 provides later independent evidence."
    }
  ]
};
