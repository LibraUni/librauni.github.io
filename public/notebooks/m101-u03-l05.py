# M101 Unit 3 Lesson 5 — worked code for Activities 3.34–3.35
# LibraUni teaching: CC BY-NC-SA 4.0.
# Predict and implement before consulting this companion.
# No packages required; finite, modest, dimensionless values.
# Deliberately wrong tests are labelled, never used as final checks.

def apply2(m, v):
    first = m[0] * v[0] + m[1] * v[1]
    second = m[2] * v[0] + m[3] * v[1]
    return [first, second]


def determinant2(m):
    return m[0] * m[3] - m[1] * m[2]


def residual2(m, candidate, target):
    output = apply2(m, candidate)
    return [output[0] - target[0], output[1] - target[1]]

A = [2, 1, 1, 1]
target = [4, 3]
candidate = [1, 2]
r = residual2(A, candidate, target)
print("Residual:", r)
if r[0] == 0 and r[1] == 0:
    print("This candidate satisfies both equations.")
else:
    print("This candidate fails at least one equation.")

C = [3, 1, 1, 1]
target = [7, 3]
print("C determinant:", determinant2(C))
for candidate in [[2, 1], [1, 2]]:
    print("Candidate:", candidate)
    print("Output:", apply2(C, candidate))
    print("Residual:", residual2(C, candidate, target))

D = [2, 3, 0, 1]
exchanged_D = [2, 0, 3, 1]
for v in [[1, 0], [0, 1]]:
    print("D column test:", v, apply2(D, v))
    print("Exchanged entries:", v, apply2(exchanged_D, v))

C_inverse = [0.5, -0.5, -0.5, 1.5]
print("Recovered input:", apply2(C_inverse, target))

A = [2, 1, 1, 1]
S = [1, 2, 2, 4]
print("A, correct:", residual2(A, [1, 2], [4, 3]))
print("A, cancellation:", residual2(A, [3, -1], [4, 3]))
print("S, first solution:", residual2(S, [6, 0], [6, 12]))
print("S, second solution:", residual2(S, [2, 2], [6, 12]))
print("S, incompatible target:", residual2(S, [2, 2], [6, 13]))
print("Determinants A and S:", determinant2(A), determinant2(S))

# A deliberately inadequate check, for diagnosis only.
r = residual2(A, [3, -1], [4, 3])
print("Wrong sum-only test accepts:", r[0] + r[1] == 0)
print("Both-entry test accepts:", r[0] == 0 and r[1] == 0)

B = [1, -1, -1, 2]
wrong_B = [1, -1, -1, 1]
for v in [[1, 0], [0, 1], [-2, 3]]:
    print("Input:", v)
    print("B after A:", apply2(B, apply2(A, v)))
    print("A after B:", apply2(A, apply2(B, v)))
    print("Deliberately wrong B after A:", apply2(wrong_B, apply2(A, v)))

print("Decimal subtraction:", 0.1 + 0.2 - 0.3)
E = [1.0, 1.0, 1.0, 1.001]
print("E residual:", residual2(E, [0.0, 2.0], [2.0, 2.001]))
