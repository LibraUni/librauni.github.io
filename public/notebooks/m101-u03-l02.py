# M101 Unit 3 Lesson 2 — Activity 3.14
# Original LibraUni teaching code, CC BY-NC-SA 4.0.
# Predict first. Four matrix entries in row order; two vector entries.

def apply2(m, v):
    first = m[0] * v[0] + m[1] * v[1]
    second = m[2] * v[0] + m[3] * v[1]
    return [first, second]

H = [1, 1, 0, 1]
R = [-1, 0, 0, 1]
HR = [-1, 1, 0, 1]
RH = [-1, -1, 0, 1]
v = [2, 1]

intermediate = apply2(R, v)
successive = apply2(H, intermediate)
print("R then H:", successive)
print("HR product:", apply2(HR, v))

reverse = apply2(R, apply2(H, v))
print("H then R:", reverse)
print("RH product:", apply2(RH, v))

# Repeat with v = [1, 0], [0, 1], and [-2, 3].
# Deliberately use RH in the HR product check, observe, then restore.
# Explain why the zero vector cannot expose reversed order.
