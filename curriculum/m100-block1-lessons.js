// Original lesson blueprint; no teaching sections or assessed questions released.
export const block1Lessons = {
  "version": "0.1",
  "date": "26 September 2026",
  "status": "Complete Block 1 lesson blueprint — proposed for review",
  "block": "B01",
  "hours": 80,
  "pythonHours": 14,
  "lessons": [
    {
      "id": "U01-L01",
      "unit": "U01",
      "title": "Signed quantities and ordered calculations",
      "hours": 4.0,
      "allocation": [
        1,
        1.5,
        1,
        0,
        0.5
      ],
      "requires": [],
      "outcomes": [
        "O1",
        "O6"
      ],
      "criteria": [
        "E1a",
        "E4a"
      ],
      "purpose": "Read a number line, distinguish sign from subtraction, use absolute value and evaluate brackets in the correct order.",
      "python": "Predict arithmetic cells; introduce integers, decimal literals, +, -, *, / and parentheses. Inspect a simple syntax error rather than generate a repair.",
      "practice": "Sequence single operations, grouped expressions and a wrong-order explanation. Evidence: justified hand calculation and independently typed matching code.",
      "visuals": "Number line with labelled direction and distance; expression tree with reading order.",
      "handover": "Fractions and named values follow. No powers or algebraic solving yet."
    },
    {
      "id": "U01-L02",
      "unit": "U01",
      "title": "Fractions, decimals and named values",
      "hours": 4.0,
      "allocation": [
        1,
        1.5,
        1,
        0.5,
        0
      ],
      "requires": [
        "U01-L01"
      ],
      "outcomes": [
        "O1",
        "O6"
      ],
      "criteria": [
        "E1a",
        "E4a"
      ],
      "purpose": "Find equivalent fractions, use common denominators and distinguish an exact fraction from a rounded decimal.",
      "python": "Introduce names, assignment, int/float values and print; explain that assignment stores a value and is not an equation to solve. Use ordinary arithmetic, not a fraction library.",
      "practice": "Worked-to-independent fraction combinations; compare an exact hand result with a decimal display. Use a supplied elapsed-time ratio with units.",
      "visuals": "Fraction strips with accessible labels; exact and approximate representations side by side.",
      "handover": "Retain exact work before rounding. Percentages build on ratios next."
    },
    {
      "id": "U01-L03",
      "unit": "U01",
      "title": "Percentages, estimates and precision",
      "hours": 4.0,
      "allocation": [
        1,
        1.5,
        1,
        0.5,
        0
      ],
      "requires": [
        "U01-L02"
      ],
      "outcomes": [
        "O1",
        "O6",
        "O7"
      ],
      "criteria": [
        "E1a",
        "E1c",
        "E4c"
      ],
      "purpose": "Interpret percentages against a stated base; estimate before calculating and justify rounding without inventing measurement precision.",
      "python": "Reassign a named input, predict changes and read a simple NameError. Explain that a long decimal display does not establish accuracy.",
      "practice": "Abstract percentage practice followed by a supplied measurement comparison; diagnose the wrong reference base and report a sensible result.",
      "visuals": "Same percentage applied to different bases; labelled estimate and calculation comparison.",
      "handover": "Scientific notation waits for U02. Floating-point analysis is outside this lesson."
    },
    {
      "id": "U01-L04",
      "unit": "U01",
      "title": "A calculation worth trusting",
      "hours": 4.0,
      "allocation": [
        1,
        0.5,
        1,
        1,
        0.5
      ],
      "requires": [
        "U01-L03"
      ],
      "outcomes": [
        "O1",
        "O6",
        "O7"
      ],
      "criteria": [
        "E1a",
        "E1c",
        "E4c",
        "E5c"
      ],
      "purpose": "Combine signs, fractions and precision; explain a result and a genuinely independent plausibility check.",
      "python": "Write a short named-variable notebook from a blank cell, restart and rerun in order, save and explain outputs. Reuse orientation skills without repeating installation.",
      "practice": "Compare two supplied physical timescales using manageable ordinary numbers. A mixed retrieval task checks reasoning; targeted backup addresses identified errors.",
      "visuals": "Annotated calculation record: inputs, estimate, result, units and limitation.",
      "handover": "U02 extends scale representation. One successful checkpoint is not whole-module mastery."
    },
    {
      "id": "U02-L01",
      "unit": "U02",
      "title": "Powers and roots with restrictions",
      "hours": 4,
      "allocation": [
        1,
        2,
        1,
        0,
        0
      ],
      "requires": [
        "U01-L04"
      ],
      "outcomes": [
        "O1",
        "O6"
      ],
      "criteria": [
        "E1a",
        "E4a"
      ],
      "purpose": "Use integer and rational powers, roots and exponent rules with the real-number restrictions stated.",
      "python": "Introduce ** and precedence with parentheses; import math and use sqrt only for valid non-negative inputs. Contrast unary minus with a bracketed negative base.",
      "practice": "Interleave numeric exponent laws, roots and invalid real cases. Check selected results by multiplication or an inverse operation.",
      "visuals": "Power-expression grouping and a small root-domain diagram.",
      "handover": "Complex values are excluded; scientific notation is next."
    },
    {
      "id": "U02-L02",
      "unit": "U02",
      "title": "Scientific notation and orders of magnitude",
      "hours": 4,
      "allocation": [
        1,
        1,
        1,
        1,
        0
      ],
      "requires": [
        "U02-L01"
      ],
      "outcomes": [
        "O1",
        "O5",
        "O6",
        "O7"
      ],
      "criteria": [
        "E1a",
        "E1c",
        "E4a"
      ],
      "purpose": "Write and compare powers-of-ten representations; distinguish significant figures from orders of magnitude.",
      "python": "Use e notation, named quantities and explicit unit labels; compare rounded displays with retained values.",
      "practice": "Progress from abstract scale comparisons to supplied light-travel values. Estimate the power of ten before calculating.",
      "visuals": "Labelled scale ladder; no logarithmic axis assumed.",
      "handover": "Apply representation to unit conversions; logarithms remain U09."
    },
    {
      "id": "U02-L03",
      "unit": "U02",
      "title": "Units that cancel correctly",
      "hours": 5.0,
      "allocation": [
        1,
        2,
        0.5,
        1,
        0.5
      ],
      "requires": [
        "U02-L02"
      ],
      "outcomes": [
        "O1",
        "O5",
        "O6",
        "O7"
      ],
      "criteria": [
        "E1b",
        "E1c",
        "E5c"
      ],
      "purpose": "Convert SI-prefixed and compound quantities, including squared units; distinguish a quantity from its numerical value.",
      "python": "Write a scalar conversion with units in names and explanation. Inspect a unit-mixing error; ordinary Python numbers carry no automatic units.",
      "practice": "Conversion chains advance from length to area and speed; explain why a length factor must be squared for area.",
      "visuals": "Cancelling-unit chains and matching length/area diagrams.",
      "handover": "Dimensional checking and direct/inverse scaling follow."
    },
    {
      "id": "U02-L04",
      "unit": "U02",
      "title": "Proportions, dimensions and a checkpoint",
      "hours": 5.0,
      "allocation": [
        1,
        1,
        0.5,
        1,
        1.5
      ],
      "requires": [
        "U02-L03"
      ],
      "outcomes": [
        "O1",
        "O5",
        "O6",
        "O7"
      ],
      "criteria": [
        "E1b",
        "E1c",
        "E5a",
        "E5c"
      ],
      "purpose": "Predict direct/inverse and inverse-square scaling; use dimensional compatibility as a necessary but insufficient check.",
      "python": "Evaluate two supplied scenarios with named inputs and verify the direction of change against a hand ratio.",
      "practice": "Use supplied travel-time and inverse-square laws with assumptions explicit. Includes the existing one-hour iCMA41 and half an hour of retrieval/checkpoint interpretation, not an additional test.",
      "visuals": "Scaling comparison with fixed quantities labelled; compatible dimensions with differing predictions.",
      "handover": "U03 turns relations into expressions; no derivation of a physical inverse-square law is assumed."
    },
    {
      "id": "U03-L01",
      "unit": "U03",
      "title": "Symbols with a job to do",
      "hours": 4,
      "allocation": [
        1,
        2,
        0,
        1,
        0
      ],
      "requires": [
        "U02-L04"
      ],
      "outcomes": [
        "O2",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E5c"
      ],
      "purpose": "Identify variables, constants and parameters; translate a verbal relation and substitute values with units.",
      "python": "No new Python instruction; reserve computational practice for subsequent lessons.",
      "practice": "Compare abstract expressions and a supplied sensor offset/scale model. Evidence: annotated symbol roles and a correct substitution.",
      "visuals": "Expression annotated by roles and units.",
      "handover": "Do not formalise function notation before U06. Brackets make structure explicit next."
    },
    {
      "id": "U03-L02",
      "unit": "U03",
      "title": "Brackets and equivalent expressions",
      "hours": 4.0,
      "allocation": [
        1,
        2,
        0.5,
        0.5,
        0
      ],
      "requires": [
        "U03-L01"
      ],
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E4a"
      ],
      "purpose": "Collect like terms, distribute multiplication and preserve negative signs through brackets.",
      "python": "Translate a short algebraic expression into Python; compare evaluation with a hand calculation using an already taught input.",
      "practice": "Move from single expansion to nested signs and offset-order mistakes. Explain which terms can be combined.",
      "visuals": "Grouped terms and two distinct offset/scale orders.",
      "handover": "Reverse distributivity by factorisation next; no quadratic solving."
    },
    {
      "id": "U03-L03",
      "unit": "U03",
      "title": "Factorisation and algebraic fractions",
      "hours": 5.0,
      "allocation": [
        1,
        2,
        1,
        0.5,
        0.5
      ],
      "requires": [
        "U03-L02"
      ],
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E4c"
      ],
      "purpose": "Extract common factors, simplify fractions and retain excluded inputs; reject cancellation across addition.",
      "python": "Evaluate a candidate simplification at permitted values. Read ZeroDivisionError from a deliberately invalid input and locate the offending denominator.",
      "practice": "Mix abstract factoring with a supplied relation. Evidence: an equivalence chain with restrictions and a counterexample to a faulty cancellation.",
      "visuals": "Factor-group highlighting; restrictions remain visible alongside every step.",
      "handover": "Domain guards follow. Full quadratic factorisation remains U07."
    },
    {
      "id": "U03-L04",
      "unit": "U03",
      "title": "Conditions that protect a calculation",
      "hours": 5.0,
      "allocation": [
        1,
        1,
        1.5,
        1,
        0.5
      ],
      "requires": [
        "U03-L03"
      ],
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E4a",
        "E4c"
      ],
      "purpose": "State a numerical input restriction and explain why the calculation must be guarded.",
      "python": "Introduce Boolean values, ==, !=, <, >, <=, >= and a short if/else with indentation. Begin with one condition; combined Boolean logic is optional backup, not required.",
      "practice": "Trace a valid and invalid sensor-model input before writing a guard. Repair an indentation or assignment/comparison error.",
      "visuals": "Two-branch decision diagram tied to a denominator restriction.",
      "handover": "Checking validity does not prove an identity. No user input, exceptions framework or functions required."
    },
    {
      "id": "U03-L05",
      "unit": "U03",
      "title": "Identity, equation or coincidence?",
      "hours": 4,
      "allocation": [
        1,
        1,
        1,
        0,
        1
      ],
      "requires": [
        "U03-L04"
      ],
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E4c",
        "E5c"
      ],
      "purpose": "Distinguish identities from equations and explain the different force of a counterexample and several agreeing examples.",
      "python": "Test two expressions at individually assigned inputs, then explain the limit of the test. Do not introduce loops early.",
      "practice": "Mixed simplification and fresh counterexamples; written algebra supplies justification when numerical agreement is insufficient.",
      "visuals": "Comparison of claim, permitted domain, example and counterexample.",
      "handover": "U04 asks which inputs solve an equation. TMA01 later samples these distinctions."
    },
    {
      "id": "U04-L01",
      "unit": "U04",
      "title": "Equality and linear equations",
      "hours": 4,
      "allocation": [
        1,
        2,
        0,
        1,
        0
      ],
      "requires": [
        "U03-L05"
      ],
      "outcomes": [
        "O2",
        "O5",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E2b",
        "E5c"
      ],
      "purpose": "Solve linear equations using equivalent steps, including fractions, and check the original relation.",
      "python": "No new programming: keep focus on the algebraic argument.",
      "practice": "Move from one unknown on one side to brackets/fractions and a supplied physical relation; explain every transformation.",
      "visuals": "Balanced operations and an annotated solution chain.",
      "handover": "General formula rearrangement follows; graphical solutions wait for U05."
    },
    {
      "id": "U04-L02",
      "unit": "U04",
      "title": "Changing the subject without losing cases",
      "hours": 4.0,
      "allocation": [
        1,
        2,
        0.5,
        0.5,
        0
      ],
      "requires": [
        "U04-L01"
      ],
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E2b",
        "E4c"
      ],
      "purpose": "Rearrange formulas, record non-zero restrictions and check exceptional parameter cases; recognise that irreversible operations can add candidates.",
      "python": "Use a taught if/else to test a denominator before checking an isolated quantity numerically.",
      "practice": "Rearrange abstract and supplied measurement relations, including a parameter that may vanish. A simple squaring counterexample motivates checking without starting nonlinear solution methods.",
      "visuals": "Branch for a zero/non-zero coefficient; restrictions beside the formula.",
      "handover": "Two unknowns require two independent constraints next."
    },
    {
      "id": "U04-L03",
      "unit": "U04",
      "title": "Two unknowns, two relations",
      "hours": 4,
      "allocation": [
        1,
        2,
        0,
        1,
        0
      ],
      "requires": [
        "U04-L02"
      ],
      "outcomes": [
        "O2",
        "O5",
        "O7"
      ],
      "criteria": [
        "E2b",
        "E5a",
        "E5c"
      ],
      "purpose": "Solve two linear equations by substitution and elimination, compare methods and interpret units.",
      "python": "No numerical solver or matrix package; preserve independent hand reasoning.",
      "practice": "Abstract systems then two supplied measurement constraints; substitute both recovered values into both original equations.",
      "visuals": "Two labelled information constraints, not a graph requiring U05.",
      "handover": "Independent, inconsistent and dependent systems are distinguished next."
    },
    {
      "id": "U04-L04",
      "unit": "U04",
      "title": "When a system does not determine one answer",
      "hours": 4.0,
      "allocation": [
        1,
        1.5,
        0.5,
        0.5,
        0.5
      ],
      "requires": [
        "U04-L03"
      ],
      "outcomes": [
        "O2",
        "O5",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2b",
        "E4c",
        "E5c"
      ],
      "purpose": "Recognise contradiction, unique solution and a free parameter; explain insufficient information.",
      "python": "Check selected candidate pairs with previously taught expressions and conditions; no arrays, matrices or automated solving.",
      "practice": "Compare closely related systems yielding each case. Evidence: classification supported by algebra and an explanation of information content.",
      "visuals": "Constraint comparison with redundant and contradictory statements.",
      "handover": "Inequalities replace equality with bounds next; graphical interpretations remain U05."
    },
    {
      "id": "U04-L05",
      "unit": "U04",
      "title": "Inequalities, intervals and repeated checks",
      "hours": 4.0,
      "allocation": [
        0.5,
        1.5,
        1,
        0.5,
        0.5
      ],
      "requires": [
        "U04-L04"
      ],
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2b",
        "E4a"
      ],
      "purpose": "Solve linear inequalities, justify sign reversal after multiplying by a negative, and represent open/closed interval bounds.",
      "python": "Introduce a list and a for loop over explicit candidate values; predict each comparison. Teach iteration before range; range is optional here.",
      "practice": "Abstract inequalities followed by a supplied physical bound. Evidence: interval reasoning and explanation of why finite candidates do not establish the entire solution set.",
      "visuals": "Number line with unambiguous open/closed endpoints and accessible labels.",
      "handover": "Integrate candidate checks and assertions in the final lesson; loops do not replace proof."
    },
    {
      "id": "U04-L06",
      "unit": "U04",
      "title": "Explain, check and hand over",
      "hours": 4.0,
      "allocation": [
        0.5,
        1,
        1,
        0.5,
        1
      ],
      "requires": [
        "U04-L05"
      ],
      "outcomes": [
        "O2",
        "O5",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E2b",
        "E4a",
        "E4c",
        "E5a",
        "E5c"
      ],
      "purpose": "Select and explain methods for a mixed problem, retain restrictions and prepare a checkable record.",
      "python": "Write a short list/loop check and introduce assert with exact integer examples, including a deliberately failing check. Avoid float equality as a general accuracy test.",
      "practice": "Integrate two measurement relations and a stated bound. Use fresh formative tasks, not the future TMA answers; checkpoint indicates targeted practice needs.",
      "visuals": "Compact solution audit: assumptions, steps, restrictions, checks and interpretation.",
      "handover": "TMA01 follows separately within its existing6h. U05 receives linear relations, inequalities and short list/loop code; graphs and arrays are taught there."
    }
  ]
};
