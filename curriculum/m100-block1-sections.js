// Detailed blueprint, not released teaching or assessment questions.
export const block1Sections = {
  "version": "1.0",
  "date": "27 September 2026",
  "status": "Defined for review; teaching release remains separate",
  "lessons": [
    {
      "id": "U01-L02",
      "unit": "U01",
      "title": "Fractions, decimals and named values",
      "minutes": 240,
      "outcomes": [
        "O1",
        "O6"
      ],
      "criteria": [
        "E1a",
        "E4a"
      ],
      "sections": [
        {
          "title": "Equivalent fractions and a common unit",
          "scope": "Use fraction strips to explain equivalence and a common denominator; distinguish numerator from denominator.",
          "minutes": 72,
          "allocationMinutes": [
            36,
            36,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Worked-to-independent fraction combinations; compare an exact hand result with a decimal display. Use a supplied elapsed-time ratio with units.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Fraction strips with accessible labels; exact and approximate representations side by side.",
          "id": "U01-L02-S01",
          "requires": [
            "U01-L01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Combine fractions; retain an exact answer."
        },
        {
          "title": "Combine fractions; retain an exact answer",
          "scope": "Add, subtract, multiply and divide fractions; explain reciprocal division and non-zero restrictions. Compare a terminating and a recurring decimal.",
          "minutes": 78,
          "allocationMinutes": [
            24,
            54,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Worked-to-independent fraction combinations; compare an exact hand result with a decimal display. Use a supplied elapsed-time ratio with units.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Fraction strips with accessible labels; exact and approximate representations side by side.",
          "id": "U01-L02-S02",
          "requires": [
            "U01-L02-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Names, assignment and printed values."
        },
        {
          "title": "Names, assignment and printed values",
          "scope": "Type a named calculation, predict reassignment, and distinguish = from equality; compare exact hand work with int/float output.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Introduce names, assignment, int/float values and print; explain that assignment stores a value and is not an equation to solve. Use ordinary arithmetic, not a fraction library.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U01-L02-S03",
          "requires": [
            "U01-L02-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into An elapsed-time ratio."
        },
        {
          "title": "An elapsed-time ratio",
          "scope": "Use supplied durations in the same units; give the exact ratio before a rounded decimal and explain what it compares.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Use supplied durations in the same units; give the exact ratio before a rounded decimal and explain what it compares.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Fraction strips with accessible labels; exact and approximate representations side by side.",
          "id": "U01-L02-S04",
          "requires": [
            "U01-L02-S03"
          ],
          "handover": "Retain exact work before rounding. Percentages build on ratios next."
        }
      ]
    },
    {
      "id": "U01-L03",
      "unit": "U01",
      "title": "Percentages, estimates and precision",
      "minutes": 240,
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
      "sections": [
        {
          "title": "A percentage needs a reference base",
          "scope": "Translate percentage to a fraction of a named whole; distinguish percentage change from percentage points.",
          "minutes": 72,
          "allocationMinutes": [
            36,
            36,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Abstract percentage practice followed by a supplied measurement comparison; diagnose the wrong reference base and report a sensible result.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Same percentage applied to different bases; labelled estimate and calculation comparison.",
          "id": "U01-L03-S01",
          "requires": [
            "U01-L02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Estimate first, round last."
        },
        {
          "title": "Estimate first, round last",
          "scope": "Compare increases and decreases using their correct bases; estimate magnitude and justify significant figures without claiming extra measurement accuracy.",
          "minutes": 78,
          "allocationMinutes": [
            24,
            54,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Abstract percentage practice followed by a supplied measurement comparison; diagnose the wrong reference base and report a sensible result.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Same percentage applied to different bases; labelled estimate and calculation comparison.",
          "id": "U01-L03-S02",
          "requires": [
            "U01-L03-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Change the input, explain the output."
        },
        {
          "title": "Change the input, explain the output",
          "scope": "Reassign a measurement, predict the new percentage and diagnose a misspelled name from NameError.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Reassign a named input, predict changes and read a simple NameError. Explain that a long decimal display does not establish accuracy.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U01-L03-S03",
          "requires": [
            "U01-L03-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Reporting a measurement comparison."
        },
        {
          "title": "Reporting a measurement comparison",
          "scope": "Compare supplied measurements, identify the denominator and explain why displayed digits are not evidence of precision.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Compare supplied measurements, identify the denominator and explain why displayed digits are not evidence of precision.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Same percentage applied to different bases; labelled estimate and calculation comparison.",
          "id": "U01-L03-S04",
          "requires": [
            "U01-L03-S03"
          ],
          "handover": "Scientific notation waits for U02. Floating-point analysis is outside this lesson."
        }
      ]
    },
    {
      "id": "U01-L04",
      "unit": "U01",
      "title": "A calculation worth trusting",
      "minutes": 240,
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
      "sections": [
        {
          "title": "What makes a calculation checkable?",
          "scope": "Read two calculation records; separate assumptions, inputs, estimate, arithmetic and interpretation.",
          "minutes": 48,
          "allocationMinutes": [
            36,
            12,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Compare two supplied physical timescales using manageable ordinary numbers. A mixed retrieval task checks reasoning; targeted backup addresses identified errors.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Annotated calculation record: inputs, estimate, result, units and limitation.",
          "id": "U01-L04-S01",
          "requires": [
            "U01-L03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Choose a check that could catch an error."
        },
        {
          "title": "Choose a check that could catch an error",
          "scope": "Correct a mixed sign/fraction calculation and use a genuinely different check rather than repeat the same mistaken steps.",
          "minutes": 42,
          "allocationMinutes": [
            24,
            18,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Compare two supplied physical timescales using manageable ordinary numbers. A mixed retrieval task checks reasoning; targeted backup addresses identified errors.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Annotated calculation record: inputs, estimate, result, units and limitation.",
          "id": "U01-L04-S02",
          "requires": [
            "U01-L04-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into A notebook that reruns cleanly."
        },
        {
          "title": "A notebook that reruns cleanly",
          "scope": "Write named inputs and arithmetic from blank cells; restart, rerun in order, save and explain every output.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Write a short named-variable notebook from a blank cell, restart and rerun in order, save and explain outputs. Reuse orientation skills without repeating installation.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U01-L04-S03",
          "requires": [
            "U01-L04-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Compare two physical timescales."
        },
        {
          "title": "Compare two physical timescales",
          "scope": "Use supplied ordinary-number durations and units; estimate the ratio and qualify the interpretation. No scientific notation yet.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Use supplied ordinary-number durations and units; estimate the ratio and qualify the interpretation. No scientific notation yet.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Annotated calculation record: inputs, estimate, result, units and limitation.",
          "id": "U01-L04-S04",
          "requires": [
            "U01-L04-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Unit 1 checkpoint and targeted repair."
        },
        {
          "title": "Unit 1 checkpoint and targeted repair",
          "scope": "Independently calculate, estimate and explain a result; select a short replacement practice set for the actual error.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            30
          ],
          "kind": "checkpoint",
          "activity": "Independently calculate, estimate and explain a result; select a short replacement practice set for the actual error.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Annotated calculation record: inputs, estimate, result, units and limitation.",
          "id": "U01-L04-S05",
          "requires": [
            "U01-L04-S04"
          ],
          "handover": "U02 extends scale representation. One successful checkpoint is not whole-module mastery."
        }
      ]
    },
    {
      "id": "U02-L01",
      "unit": "U02",
      "title": "Powers and roots with restrictions",
      "minutes": 240,
      "outcomes": [
        "O1",
        "O6"
      ],
      "criteria": [
        "E1a",
        "E4a"
      ],
      "sections": [
        {
          "title": "Integer powers and their laws",
          "scope": "Build positive, zero and negative integer powers; state non-zero base restrictions and distinguish a power from multiplication.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Interleave numeric exponent laws, roots and invalid real cases. Check selected results by multiplication or an inverse operation.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Power-expression grouping and a small root-domain diagram.",
          "id": "U02-L01-S01",
          "requires": [
            "U01-L04"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Roots, rational powers and real domains."
        },
        {
          "title": "Roots, rational powers and real domains",
          "scope": "Compare principal square roots with solutions of a squared equation; use rational powers on appropriate real domains and check by an inverse operation.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Interleave numeric exponent laws, roots and invalid real cases. Check selected results by multiplication or an inverse operation.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Power-expression grouping and a small root-domain diagram.",
          "id": "U02-L01-S02",
          "requires": [
            "U02-L01-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Python powers and safe roots."
        },
        {
          "title": "Python powers and safe roots",
          "scope": "Predict -3**2 versus (-3)**2; import math, call sqrt for valid inputs and explain a negative-input error. Avoid negative-base fractional powers as a real-root method.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Introduce ** and precedence with parentheses; import math and use sqrt only for valid non-negative inputs. Contrast unary minus with a bracketed negative base.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U02-L01-S03",
          "requires": [
            "U02-L01-S02"
          ],
          "handover": "Complex values are excluded; scientific notation is next."
        }
      ]
    },
    {
      "id": "U02-L02",
      "unit": "U02",
      "title": "Scientific notation and orders of magnitude",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Write a number as a scale and a coefficient",
          "scope": "Normalise positive and negative exponents of ten; include small values and zero without assigning zero an order of magnitude.",
          "minutes": 60,
          "allocationMinutes": [
            36,
            24,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Progress from abstract scale comparisons to supplied light-travel values. Estimate the power of ten before calculating.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Labelled scale ladder; no logarithmic axis assumed.",
          "id": "U02-L02-S01",
          "requires": [
            "U02-L01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Compare scales before calculating."
        },
        {
          "title": "Compare scales before calculating",
          "scope": "Multiply/divide scientific-notation values and distinguish significant figures from scale. State the order-of-magnitude convention explicitly.",
          "minutes": 60,
          "allocationMinutes": [
            24,
            36,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Progress from abstract scale comparisons to supplied light-travel values. Estimate the power of ten before calculating.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Labelled scale ladder; no logarithmic axis assumed.",
          "id": "U02-L02-S02",
          "requires": [
            "U02-L02-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Scientific notation in code."
        },
        {
          "title": "Scientific notation in code",
          "scope": "Use e notation and labelled inputs; distinguish a rounded display from a stored numerical value.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Use e notation, named quantities and explicit unit labels; compare rounded displays with retained values.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U02-L02-S03",
          "requires": [
            "U02-L02-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Light-travel estimates."
        },
        {
          "title": "Light-travel estimates",
          "scope": "Use supplied distance and speed with units to predict a power of ten, calculate time and explain the approximation.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Use supplied distance and speed with units to predict a power of ten, calculate time and explain the approximation.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Labelled scale ladder; no logarithmic axis assumed.",
          "id": "U02-L02-S04",
          "requires": [
            "U02-L02-S03"
          ],
          "handover": "Apply representation to unit conversions; logarithms remain U09."
        }
      ]
    },
    {
      "id": "U02-L03",
      "unit": "U02",
      "title": "Units that cancel correctly",
      "minutes": 300,
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
      "sections": [
        {
          "title": "Quantities, units and conversion factors",
          "scope": "Distinguish a physical quantity from its numerical value; teach SI prefixes and conversion ratios equal to one.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Conversion chains advance from length to area and speed; explain why a length factor must be squared for area.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Cancelling-unit chains and matching length/area diagrams.",
          "id": "U02-L03-S01",
          "requires": [
            "U02-L02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Compound and squared units."
        },
        {
          "title": "Compound and squared units",
          "scope": "Advance from length to area and speed; show cancelling units and explain why an area conversion squares the length factor.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Conversion chains advance from length to area and speed; explain why a length factor must be squared for area.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Cancelling-unit chains and matching length/area diagrams.",
          "id": "U02-L03-S02",
          "requires": [
            "U02-L03-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into A conversion that does not hide its units."
        },
        {
          "title": "A conversion that does not hide its units",
          "scope": "Type an explicit scalar conversion, compare to hand work and diagnose a mixed-unit result.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            30,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Write a scalar conversion with units in names and explanation. Inspect a unit-mixing error; ordinary Python numbers carry no automatic units.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U02-L03-S03",
          "requires": [
            "U02-L03-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Compare journeys on one consistent scale."
        },
        {
          "title": "Compare journeys on one consistent scale",
          "scope": "Convert supplied lengths and elapsed times to consistent units before comparing speeds; assess plausible magnitude.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Convert supplied lengths and elapsed times to consistent units before comparing speeds; assess plausible magnitude.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Cancelling-unit chains and matching length/area diagrams.",
          "id": "U02-L03-S04",
          "requires": [
            "U02-L03-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Conversion checkpoint."
        },
        {
          "title": "Conversion checkpoint",
          "scope": "Repair a squared-unit conversion and explain why the numerical value changes while the quantity does not.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            30
          ],
          "kind": "checkpoint",
          "activity": "Repair a squared-unit conversion and explain why the numerical value changes while the quantity does not.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Cancelling-unit chains and matching length/area diagrams.",
          "id": "U02-L03-S05",
          "requires": [
            "U02-L03-S04"
          ],
          "handover": "Dimensional checking and direct/inverse scaling follow."
        }
      ]
    },
    {
      "id": "U02-L04",
      "unit": "U02",
      "title": "Proportions, dimensions and a checkpoint",
      "minutes": 300,
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
      "sections": [
        {
          "title": "What changes and what stays fixed?",
          "scope": "Compare direct, inverse and inverse-square dependence using supplied laws; identify fixed parameters before predicting a factor.",
          "minutes": 60,
          "allocationMinutes": [
            36,
            24,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Use supplied travel-time and inverse-square laws with assumptions explicit. Includes the existing one-hour iCMA41 and half an hour of retrieval/checkpoint interpretation, not an additional test.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Scaling comparison with fixed quantities labelled; compatible dimensions with differing predictions.",
          "id": "U02-L04-S01",
          "requires": [
            "U02-L03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Dimensions: a necessary check."
        },
        {
          "title": "Dimensions: a necessary check",
          "scope": "Check dimensional compatibility and construct a compatible but numerically wrong formula; avoid treating dimensions as proof.",
          "minutes": 60,
          "allocationMinutes": [
            24,
            36,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Use supplied travel-time and inverse-square laws with assumptions explicit. Includes the existing one-hour iCMA41 and half an hour of retrieval/checkpoint interpretation, not an additional test.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Scaling comparison with fixed quantities labelled; compatible dimensions with differing predictions.",
          "id": "U02-L04-S02",
          "requires": [
            "U02-L04-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Two scenarios, one transparent calculation."
        },
        {
          "title": "Two scenarios, one transparent calculation",
          "scope": "Calculate named scenarios and check their ratio against a hand prediction; no functions or arrays.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            30,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Evaluate two supplied scenarios with named inputs and verify the direction of change against a hand ratio.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U02-L04-S03",
          "requires": [
            "U02-L04-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Travel time and inverse-square scaling."
        },
        {
          "title": "Travel time and inverse-square scaling",
          "scope": "Use supplied assumptions to compare cases and identify a physical limitation. Do not derive a new physical law.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Use supplied assumptions to compare cases and identify a physical limitation. Do not derive a new physical law.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Scaling comparison with fixed quantities labelled; compatible dimensions with differing predictions.",
          "id": "U02-L04-S04",
          "requires": [
            "U02-L04-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Readiness review and iCMA 41."
        },
        {
          "title": "Readiness review and iCMA 41",
          "scope": "Use 30 minutes for retrieval and planning, then the existing 60-minute iCMA41 allocation; feedback follows the declared assessment policy.",
          "minutes": 90,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            90
          ],
          "kind": "checkpoint",
          "activity": "Use 30 minutes for retrieval and planning, then the existing 60-minute iCMA41 allocation; feedback follows the declared assessment policy.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Scaling comparison with fixed quantities labelled; compatible dimensions with differing predictions.",
          "id": "U02-L04-S05",
          "requires": [
            "U02-L04-S04"
          ],
          "handover": "U03 turns relations into expressions; no derivation of a physical inverse-square law is assumed."
        }
      ]
    },
    {
      "id": "U03-L01",
      "unit": "U03",
      "title": "Symbols with a job to do",
      "minutes": 240,
      "outcomes": [
        "O2",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E5c"
      ],
      "sections": [
        {
          "title": "What a symbol stands for",
          "scope": "Distinguish variables, constants and parameters; annotate their units and meanings in supplied relations.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Compare abstract expressions and a supplied sensor offset/scale model. Evidence: annotated symbol roles and a correct substitution.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Expression annotated by roles and units.",
          "id": "U03-L01-S01",
          "requires": [
            "U02-L04"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Translate and substitute with structure intact."
        },
        {
          "title": "Translate and substitute with structure intact",
          "scope": "Translate words to expressions, substitute signed/fractional values with brackets and compare expressions with different operation order.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Compare abstract expressions and a supplied sensor offset/scale model. Evidence: annotated symbol roles and a correct substitution.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Expression annotated by roles and units.",
          "id": "U03-L01-S02",
          "requires": [
            "U03-L01-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Offset and scale in a measurement."
        },
        {
          "title": "Offset and scale in a measurement",
          "scope": "Interpret a supplied calibration relation; compare offset-then-scale with scale-then-offset using a labelled worked record.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Interpret a supplied calibration relation; compare offset-then-scale with scale-then-offset using a labelled worked record.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Expression annotated by roles and units.",
          "id": "U03-L01-S03",
          "requires": [
            "U03-L01-S02"
          ],
          "handover": "Do not formalise function notation before U06. Brackets make structure explicit next."
        }
      ]
    },
    {
      "id": "U03-L02",
      "unit": "U03",
      "title": "Brackets and equivalent expressions",
      "minutes": 240,
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E4a"
      ],
      "sections": [
        {
          "title": "Terms, coefficients and distributivity",
          "scope": "Identify like terms, explain distribution and distinguish a negative coefficient from subtraction.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Move from single expansion to nested signs and offset-order mistakes. Explain which terms can be combined.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Grouped terms and two distinct offset/scale orders.",
          "id": "U03-L02-S01",
          "requires": [
            "U03-L01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Expand and collect without losing signs."
        },
        {
          "title": "Expand and collect without losing signs",
          "scope": "Progress from one bracket to nested negative signs; locate the first invalid transformation and reverse-check numerically.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Move from single expansion to nested signs and offset-order mistakes. Explain which terms can be combined.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Grouped terms and two distinct offset/scale orders.",
          "id": "U03-L02-S02",
          "requires": [
            "U03-L02-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Two expressions, one chosen input."
        },
        {
          "title": "Two expressions, one chosen input",
          "scope": "Translate the original and expanded expressions into Python and explain agreement without calling it proof.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            30,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Translate a short algebraic expression into Python; compare evaluation with a hand calculation using an already taught input.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U03-L02-S03",
          "requires": [
            "U03-L02-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Which calibration order matches the description?."
        },
        {
          "title": "Which calibration order matches the description?",
          "scope": "Compare supplied offset and scale procedures; choose the expression that represents each and explain the different outputs.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Compare supplied offset and scale procedures; choose the expression that represents each and explain the different outputs.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Grouped terms and two distinct offset/scale orders.",
          "id": "U03-L02-S04",
          "requires": [
            "U03-L02-S03"
          ],
          "handover": "Reverse distributivity by factorisation next; no quadratic solving."
        }
      ]
    },
    {
      "id": "U03-L03",
      "unit": "U03",
      "title": "Factorisation and algebraic fractions",
      "minutes": 300,
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2a",
        "E4c"
      ],
      "sections": [
        {
          "title": "Factor first, then cancel",
          "scope": "Reverse distributivity by extracting a common factor; distinguish factors from terms and reject cancellation across addition.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Mix abstract factoring with a supplied relation. Evidence: an equivalence chain with restrictions and a counterexample to a faulty cancellation.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Factor-group highlighting; restrictions remain visible alongside every step.",
          "id": "U03-L03-S01",
          "requires": [
            "U03-L02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Equivalent expressions with restrictions."
        },
        {
          "title": "Equivalent expressions with restrictions",
          "scope": "Simplify algebraic fractions, retain excluded values from the original expression and give a counterexample to invalid cancellation.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Mix abstract factoring with a supplied relation. Evidence: an equivalence chain with restrictions and a counterexample to a faulty cancellation.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Factor-group highlighting; restrictions remain visible alongside every step.",
          "id": "U03-L03-S02",
          "requires": [
            "U03-L03-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Evaluate only permitted inputs."
        },
        {
          "title": "Evaluate only permitted inputs",
          "scope": "Check candidate simplifications at valid values; read a deliberate ZeroDivisionError and identify its denominator.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Evaluate a candidate simplification at permitted values. Read ZeroDivisionError from a deliberately invalid input and locate the offending denominator.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U03-L03-S03",
          "requires": [
            "U03-L03-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into A ratio in a supplied measurement relation."
        },
        {
          "title": "A ratio in a supplied measurement relation",
          "scope": "Simplify a supplied ratio while keeping meaning, units and permitted inputs visible.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Simplify a supplied ratio while keeping meaning, units and permitted inputs visible.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Factor-group highlighting; restrictions remain visible alongside every step.",
          "id": "U03-L03-S04",
          "requires": [
            "U03-L03-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Restriction checkpoint."
        },
        {
          "title": "Restriction checkpoint",
          "scope": "Explain why a simplified expression can have a larger apparent domain than its original; retain the original exclusions.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            30
          ],
          "kind": "checkpoint",
          "activity": "Explain why a simplified expression can have a larger apparent domain than its original; retain the original exclusions.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Factor-group highlighting; restrictions remain visible alongside every step.",
          "id": "U03-L03-S05",
          "requires": [
            "U03-L03-S04"
          ],
          "handover": "Domain guards follow. Full quadratic factorisation remains U07."
        }
      ]
    },
    {
      "id": "U03-L04",
      "unit": "U03",
      "title": "Conditions that protect a calculation",
      "minutes": 300,
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
      "sections": [
        {
          "title": "A calculation has conditions",
          "scope": "Translate a denominator or physical-input restriction into a precise numerical statement; distinguish validity from correctness.",
          "minutes": 60,
          "allocationMinutes": [
            36,
            24,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Trace a valid and invalid sensor-model input before writing a guard. Repair an indentation or assignment/comparison error.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Two-branch decision diagram tied to a denominator restriction.",
          "id": "U03-L04-S01",
          "requires": [
            "U03-L03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Trace the allowed and forbidden cases."
        },
        {
          "title": "Trace the allowed and forbidden cases",
          "scope": "Use a two-branch decision diagram and evaluate boundary examples before writing code.",
          "minutes": 60,
          "allocationMinutes": [
            24,
            36,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Trace a valid and invalid sensor-model input before writing a guard. Repair an indentation or assignment/comparison error.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Two-branch decision diagram tied to a denominator restriction.",
          "id": "U03-L04-S02",
          "requires": [
            "U03-L04-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Boolean comparisons and if/else."
        },
        {
          "title": "Boolean comparisons and if/else",
          "scope": "Teach True/False, ==, !=, <, >, <=, >=, colon and indentation; type a single-condition guard and repair comparison/assignment confusion.",
          "minutes": 90,
          "allocationMinutes": [
            0,
            0,
            90,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Introduce Boolean values, ==, !=, <, >, <=, >= and a short if/else with indentation. Begin with one condition; combined Boolean logic is optional backup, not required.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U03-L04-S03",
          "requires": [
            "U03-L04-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Guard a sensor calculation."
        },
        {
          "title": "Guard a sensor calculation",
          "scope": "Apply a non-zero denominator guard to supplied valid, invalid and boundary inputs; explain what the guard cannot guarantee.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Apply a non-zero denominator guard to supplied valid, invalid and boundary inputs; explain what the guard cannot guarantee.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Two-branch decision diagram tied to a denominator restriction.",
          "id": "U03-L04-S04",
          "requires": [
            "U03-L04-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Explain the branch taken."
        },
        {
          "title": "Explain the branch taken",
          "scope": "Predict output without running, then justify a repair. Combined Boolean logic is optional replacement practice only.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            30
          ],
          "kind": "checkpoint",
          "activity": "Predict output without running, then justify a repair. Combined Boolean logic is optional replacement practice only.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Two-branch decision diagram tied to a denominator restriction.",
          "id": "U03-L04-S05",
          "requires": [
            "U03-L04-S04"
          ],
          "handover": "Checking validity does not prove an identity. No user input, exceptions framework or functions required."
        }
      ]
    },
    {
      "id": "U03-L05",
      "unit": "U03",
      "title": "Identity, equation or coincidence?",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Three different kinds of claim",
          "scope": "Distinguish identity, equation and agreement at a selected input; state the permitted domain.",
          "minutes": 60,
          "allocationMinutes": [
            36,
            24,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Mixed simplification and fresh counterexamples; written algebra supplies justification when numerical agreement is insufficient.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Comparison of claim, permitted domain, example and counterexample.",
          "id": "U03-L05-S01",
          "requires": [
            "U03-L04"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Proof and counterexample do different jobs."
        },
        {
          "title": "Proof and counterexample do different jobs",
          "scope": "Use algebra to establish a simple identity and one permitted counterexample to refute a false universal claim.",
          "minutes": 60,
          "allocationMinutes": [
            24,
            36,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Mixed simplification and fresh counterexamples; written algebra supplies justification when numerical agreement is insufficient.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Comparison of claim, permitted domain, example and counterexample.",
          "id": "U03-L05-S02",
          "requires": [
            "U03-L05-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Sampling does not prove an identity."
        },
        {
          "title": "Sampling does not prove an identity",
          "scope": "Compare two expressions at individually assigned inputs; explain the limitation of finite agreement without introducing loops.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Test two expressions at individually assigned inputs, then explain the limit of the test. Do not introduce loops early.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U03-L05-S03",
          "requires": [
            "U03-L05-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Unit 3 synthesis."
        },
        {
          "title": "Unit 3 synthesis",
          "scope": "Combine simplification, restrictions and a counterexample in a short explained record; identify the first unsupported claim.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            60
          ],
          "kind": "checkpoint",
          "activity": "Combine simplification, restrictions and a counterexample in a short explained record; identify the first unsupported claim.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Comparison of claim, permitted domain, example and counterexample.",
          "id": "U03-L05-S04",
          "requires": [
            "U03-L05-S03"
          ],
          "handover": "U04 asks which inputs solve an equation. TMA01 later samples these distinctions."
        }
      ]
    },
    {
      "id": "U04-L01",
      "unit": "U04",
      "title": "Equality and linear equations",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Equivalent changes preserve solutions",
          "scope": "Use balance reasoning for adding/subtracting and multiplying/dividing by known non-zero quantities.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Move from one unknown on one side to brackets/fractions and a supplied physical relation; explain every transformation.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Balanced operations and an annotated solution chain.",
          "id": "U04-L01-S01",
          "requires": [
            "U03-L05"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Solve and substitute back."
        },
        {
          "title": "Solve and substitute back",
          "scope": "Progress through unknowns on both sides, brackets and fractions; check every candidate in the original equation.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Move from one unknown on one side to brackets/fractions and a supplied physical relation; explain every transformation.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Balanced operations and an annotated solution chain.",
          "id": "U04-L01-S02",
          "requires": [
            "U04-L01-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Recover a quantity from a supplied relation."
        },
        {
          "title": "Recover a quantity from a supplied relation",
          "scope": "Translate a simple physical statement into a linear equation, solve with units and interpret whether the answer fits its assumptions.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Translate a simple physical statement into a linear equation, solve with units and interpret whether the answer fits its assumptions.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Balanced operations and an annotated solution chain.",
          "id": "U04-L01-S03",
          "requires": [
            "U04-L01-S02"
          ],
          "handover": "General formula rearrangement follows; graphical solutions wait for U05."
        }
      ]
    },
    {
      "id": "U04-L02",
      "unit": "U04",
      "title": "Changing the subject without losing cases",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Change the subject and track restrictions",
          "scope": "Isolate a chosen symbol while recording each non-zero divisor; distinguish rearrangement from numerical substitution.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Rearrange abstract and supplied measurement relations, including a parameter that may vanish. A simple squaring counterexample motivates checking without starting nonlinear solution methods.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Branch for a zero/non-zero coefficient; restrictions beside the formula.",
          "id": "U04-L02-S01",
          "requires": [
            "U04-L01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Exceptional cases and irreversible steps."
        },
        {
          "title": "Exceptional cases and irreversible steps",
          "scope": "Branch on a coefficient that may vanish; distinguish no solution from unrestricted values. Use a simple squaring counterexample to motivate checking.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Rearrange abstract and supplied measurement relations, including a parameter that may vanish. A simple squaring counterexample motivates checking without starting nonlinear solution methods.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Branch for a zero/non-zero coefficient; restrictions beside the formula.",
          "id": "U04-L02-S02",
          "requires": [
            "U04-L02-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Check a rearrangement safely."
        },
        {
          "title": "Check a rearrangement safely",
          "scope": "Use a previously taught if/else denominator guard and compare original and rearranged numerical relations.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            30,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Use a taught if/else to test a denominator before checking an isolated quantity numerically.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U04-L02-S03",
          "requires": [
            "U04-L02-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into A measurement formula with a vanishing parameter."
        },
        {
          "title": "A measurement formula with a vanishing parameter",
          "scope": "Rearrange a supplied relation and explain what information remains when the chosen coefficient is zero.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Rearrange a supplied relation and explain what information remains when the chosen coefficient is zero.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Branch for a zero/non-zero coefficient; restrictions beside the formula.",
          "id": "U04-L02-S04",
          "requires": [
            "U04-L02-S03"
          ],
          "handover": "Two unknowns require two independent constraints next."
        }
      ]
    },
    {
      "id": "U04-L03",
      "unit": "U04",
      "title": "Two unknowns, two relations",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Two constraints for two unknowns",
          "scope": "Introduce substitution and elimination with explicit algebraic operations; explain why each step preserves the system.",
          "minutes": 84,
          "allocationMinutes": [
            36,
            48,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Abstract systems then two supplied measurement constraints; substitute both recovered values into both original equations.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Two labelled information constraints, not a graph requiring U05.",
          "id": "U04-L03-S01",
          "requires": [
            "U04-L02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Choose a method and verify both relations."
        },
        {
          "title": "Choose a method and verify both relations",
          "scope": "Solve abstract systems by both methods, including fractional values; substitute the pair into both original equations.",
          "minutes": 96,
          "allocationMinutes": [
            24,
            72,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Abstract systems then two supplied measurement constraints; substitute both recovered values into both original equations.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Two labelled information constraints, not a graph requiring U05.",
          "id": "U04-L03-S02",
          "requires": [
            "U04-L03-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Infer two quantities from measurements."
        },
        {
          "title": "Infer two quantities from measurements",
          "scope": "Use two supplied linear measurement constraints with units; choose a method and interpret both recovered values.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            60,
            0
          ],
          "kind": "physical application",
          "activity": "Use two supplied linear measurement constraints with units; choose a method and interpret both recovered values.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Two labelled information constraints, not a graph requiring U05.",
          "id": "U04-L03-S03",
          "requires": [
            "U04-L03-S02"
          ],
          "handover": "Independent, inconsistent and dependent systems are distinguished next."
        }
      ]
    },
    {
      "id": "U04-L04",
      "unit": "U04",
      "title": "When a system does not determine one answer",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Unique, contradictory or redundant?",
          "scope": "Compare elimination outcomes: a determined unknown, a false numerical statement and an identity.",
          "minutes": 72,
          "allocationMinutes": [
            36,
            36,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Compare closely related systems yielding each case. Evidence: classification supported by algebra and an explanation of information content.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Constraint comparison with redundant and contradictory statements.",
          "id": "U04-L04-S01",
          "requires": [
            "U04-L03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Describe the entire solution set."
        },
        {
          "title": "Describe the entire solution set",
          "scope": "Recognise dependent relations and use a free parameter; explain why choosing one pair does not identify the only solution.",
          "minutes": 78,
          "allocationMinutes": [
            24,
            54,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Compare closely related systems yielding each case. Evidence: classification supported by algebra and an explanation of information content.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Constraint comparison with redundant and contradictory statements.",
          "id": "U04-L04-S02",
          "requires": [
            "U04-L04-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Candidate pairs are checks, not a classification."
        },
        {
          "title": "Candidate pairs are checks, not a classification",
          "scope": "Evaluate selected pairs with known comparisons; preserve the algebraic argument and avoid matrices or automatic solvers.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            30,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Check selected candidate pairs with previously taught expressions and conditions; no arrays, matrices or automated solving.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U04-L04-S03",
          "requires": [
            "U04-L04-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into When a second measurement adds no information."
        },
        {
          "title": "When a second measurement adds no information",
          "scope": "Compare redundant and inconsistent supplied constraints and state what further independent information would be needed.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Compare redundant and inconsistent supplied constraints and state what further independent information would be needed.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Constraint comparison with redundant and contradictory statements.",
          "id": "U04-L04-S04",
          "requires": [
            "U04-L04-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into System-classification checkpoint."
        },
        {
          "title": "System-classification checkpoint",
          "scope": "Classify fresh near-matching systems and justify the distinction; check the original constraints.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            30
          ],
          "kind": "checkpoint",
          "activity": "Classify fresh near-matching systems and justify the distinction; check the original constraints.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Constraint comparison with redundant and contradictory statements.",
          "id": "U04-L04-S05",
          "requires": [
            "U04-L04-S04"
          ],
          "handover": "Inequalities replace equality with bounds next; graphical interpretations remain U05."
        }
      ]
    },
    {
      "id": "U04-L05",
      "unit": "U04",
      "title": "Inequalities, intervals and repeated checks",
      "minutes": 240,
      "outcomes": [
        "O2",
        "O6",
        "O7"
      ],
      "criteria": [
        "E2b",
        "E4a"
      ],
      "sections": [
        {
          "title": "An inequality describes a range",
          "scope": "Explain order-preserving operations and reversal under multiplication/division by a negative using numerical examples.",
          "minutes": 54,
          "allocationMinutes": [
            18,
            36,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Abstract inequalities followed by a supplied physical bound. Evidence: interval reasoning and explanation of why finite candidates do not establish the entire solution set.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Number line with unambiguous open/closed endpoints and accessible labels.",
          "id": "U04-L05-S01",
          "requires": [
            "U04-L04"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Solve and represent intervals."
        },
        {
          "title": "Solve and represent intervals",
          "scope": "Solve linear inequalities, mark open/closed endpoints and test an endpoint plus values inside/outside the set.",
          "minutes": 66,
          "allocationMinutes": [
            12,
            54,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Abstract inequalities followed by a supplied physical bound. Evidence: interval reasoning and explanation of why finite candidates do not establish the entire solution set.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Number line with unambiguous open/closed endpoints and accessible labels.",
          "id": "U04-L05-S02",
          "requires": [
            "U04-L05-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Lists and repeated candidate checks."
        },
        {
          "title": "Lists and repeated candidate checks",
          "scope": "Introduce a literal list and for iteration with indentation; trace values before execution. range remains optional; finite samples do not prove a full interval.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Introduce a list and a for loop over explicit candidate values; predict each comparison. Teach iteration before range; range is optional here.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U04-L05-S03",
          "requires": [
            "U04-L05-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into A bound on a physical quantity."
        },
        {
          "title": "A bound on a physical quantity",
          "scope": "Translate a supplied linear bound with units, solve it and explain which endpoint is admissible.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Translate a supplied linear bound with units, solve it and explain which endpoint is admissible.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Number line with unambiguous open/closed endpoints and accessible labels.",
          "id": "U04-L05-S04",
          "requires": [
            "U04-L05-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Intervals versus sampled checks."
        },
        {
          "title": "Intervals versus sampled checks",
          "scope": "Explain the exact solution set separately from the output for selected candidates; repair a sign-reversal error.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            30
          ],
          "kind": "checkpoint",
          "activity": "Explain the exact solution set separately from the output for selected candidates; repair a sign-reversal error.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Number line with unambiguous open/closed endpoints and accessible labels.",
          "id": "U04-L05-S05",
          "requires": [
            "U04-L05-S04"
          ],
          "handover": "Integrate candidate checks and assertions in the final lesson; loops do not replace proof."
        }
      ]
    },
    {
      "id": "U04-L06",
      "unit": "U04",
      "title": "Explain, check and hand over",
      "minutes": 240,
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
      "sections": [
        {
          "title": "Plan a mixed solution",
          "scope": "Select methods for a problem involving two relations and a bound; retain assumptions and restrictions.",
          "minutes": 42,
          "allocationMinutes": [
            18,
            24,
            0,
            0,
            0
          ],
          "kind": "concepts",
          "activity": "Integrate two measurement relations and a stated bound. Use fresh formative tasks, not the future TMA answers; checkpoint indicates targeted practice needs.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Compact solution audit: assumptions, steps, restrictions, checks and interpretation.",
          "id": "U04-L06-S01",
          "requires": [
            "U04-L05"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into An auditable algebraic argument."
        },
        {
          "title": "An auditable algebraic argument",
          "scope": "Solve, substitute back and interpret; find the first invalid step in a supplied alternative solution.",
          "minutes": 48,
          "allocationMinutes": [
            12,
            36,
            0,
            0,
            0
          ],
          "kind": "worked practice",
          "activity": "Integrate two measurement relations and a stated bound. Use fresh formative tasks, not the future TMA answers; checkpoint indicates targeted practice needs.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Compact solution audit: assumptions, steps, restrictions, checks and interpretation.",
          "id": "U04-L06-S02",
          "requires": [
            "U04-L06-S01"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Assertions that check a claim."
        },
        {
          "title": "Assertions that check a claim",
          "scope": "Write a short list/loop check and introduce assert with exact integers; deliberately fail and explain a check. Do not teach float equality as a general accuracy test.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            60,
            0,
            0
          ],
          "kind": "Python workshop",
          "activity": "Write a short list/loop check and introduce assert with exact integer examples, including a deliberately failing check. Avoid float equality as a general accuracy test.",
          "deliverable": "A saved notebook with predictions, learner-typed code, outputs and a short explanation; rerun from a clean kernel.",
          "feedback": "Use predict–run–explain, then an annotated reference solution; diagnose syntax separately from reasoning.",
          "visuals": "An annotated code/output pair with a plain-text equivalent.",
          "id": "U04-L06-S03",
          "requires": [
            "U04-L06-S02"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Bring relations and constraints together."
        },
        {
          "title": "Bring relations and constraints together",
          "scope": "Use supplied measurement equations and a bound to build a concise result with units, checks and a limitation.",
          "minutes": 30,
          "allocationMinutes": [
            0,
            0,
            0,
            30,
            0
          ],
          "kind": "physical application",
          "activity": "Use supplied measurement equations and a bound to build a concise result with units, checks and a limitation.",
          "deliverable": "A short calculation record identifying supplied inputs, units, assumptions, result, check and limitation.",
          "feedback": "Provide two worked examples with fading support, then four graduated prompts and one error-analysis item; explain the first invalid step. Adjust item count after timing review, within this allocation.",
          "visuals": "Compact solution audit: assumptions, steps, restrictions, checks and interpretation.",
          "id": "U04-L06-S04",
          "requires": [
            "U04-L06-S03"
          ],
          "handover": "Carry the explained result and any unresolved difficulty into Block review and TMA preparation."
        },
        {
          "title": "Block review and TMA preparation",
          "scope": "Use a fresh ungraded mixed checkpoint and a submission-readiness checklist. TMA01 is a separate six-hour assignment, not part of this lesson.",
          "minutes": 60,
          "allocationMinutes": [
            0,
            0,
            0,
            0,
            60
          ],
          "kind": "checkpoint",
          "activity": "Use a fresh ungraded mixed checkpoint and a submission-readiness checklist. TMA01 is a separate six-hour assignment, not part of this lesson.",
          "deliverable": "Worked reasoning with any correction retained and explained; no requirement to submit every practice item.",
          "feedback": "Attempt before revealing feedback; route each identified gap to its source section, without inferring mastery from completion.",
          "visuals": "Compact solution audit: assumptions, steps, restrictions, checks and interpretation.",
          "id": "U04-L06-S05",
          "requires": [
            "U04-L06-S04"
          ],
          "handover": "TMA01 follows separately within its existing6h. U05 receives linear relations, inequalities and short list/loop code; graphs and arrays are taught there."
        }
      ]
    }
  ]
};
