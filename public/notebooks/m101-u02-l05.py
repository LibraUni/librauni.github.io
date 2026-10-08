# M101 Unit 2 Lesson 5 — worked reference for Activity 2.29.
# Predict the six cases in the lesson before running this file.
# P101 notebook/list/condition/returning-function readiness required.
# Inputs: three numeric, dimensionless entries; modest-sized values.
# The activity's prompts and full feedback are in the lesson.

def projection(a, b):
    bb = b[0]*b[0] + b[1]*b[1] + b[2]*b[2]
    if bb == 0:
        return None
    ab = a[0]*b[0] + a[1]*b[1] + a[2]*b[2]
    scale = ab / bb
    return [scale*b[0], scale*b[1], scale*b[2]]

a = [4, 1, 0]
b = [1, 1, 0]
p = projection(a, b)
print("Projection:", p)
q = [a[0]-p[0], a[1]-p[1], a[2]-p[2]]
print("Remainder:", q)
print("Remainder dot reference:", q[0]*b[0]+q[1]*b[1]+q[2]*b[2])
# Use the other five cases from Activity 2.29 in your own notebook.
# Do not index a result returned as None.
