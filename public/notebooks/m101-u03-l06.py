# M101 U03 L06 Activity3.36 — labelled faulty and repaired checks
# CC BY-NC-SA 4.0. Predict first; full discussion in the lesson.

def residual2(m, candidate, target):
    first = m[0] * candidate[0] + m[1] * candidate[1]
    second = m[2] * candidate[0] + m[3] * candidate[1]
    return [first - target[0], second - target[1]]


def faulty_accepts(m, candidate, target):
    r = residual2(m, candidate, target)
    # Deliberate fault: diagnose before repairing.
    return r[0] == 0 or r[1] == 0

def satisfies_both(m, candidate, target):
    r = residual2(m, candidate, target)
    return r[0] == 0 and r[1] == 0

m = [1, 2, 0, 1]
target = [5, 2]
for candidate in [[1, 2], [3, 1]]:
    print("Candidate:", candidate)
    print("Residual:", residual2(m, candidate, target))
    print("Deliberately faulty:", faulty_accepts(m, candidate, target))
    print("Repaired:", satisfies_both(m, candidate, target))

m = [1, 1, 2, 2]
target = [3, 6]
for candidate in [[0, 3], [1, 2]]:
    print("Dependent-system candidate:", candidate)
    print("Residual:", residual2(m, candidate, target))
    print("Repaired:", satisfies_both(m, candidate, target))
