# Original analysis code MIT. Source data separately GNU GPLv2; see metadata.
import csv
from pathlib import Path

with Path("p101-u07-stopping.csv").open(newline="") as file:
    records = list(csv.DictReader(file))

results = []
for row in records:
    speed = float(row["speed_mph"]) * 0.44704
    observed = float(row["distance_ft"]) * 0.3048
    model_a = speed**2 / (2 * 3.0)
    model_b = 0.50 * speed + model_a
    results.append((speed, observed,
                    observed-model_a, observed-model_b))

mar_a = sum(abs(row[2]) for row in results) / len(results)
mar_b = sum(abs(row[3]) for row in results) / len(results)
print("Rows:", len(results))
print("Mean absolute residuals (m):", mar_a, mar_b)
# Check rows1,39,43 by hand before trusting the summary.
# Keep all50 observations, including repeated speeds.
# Compare b=2.5 with b=3.0; retain tau=0.50s.
# Restore b=3.0 for the final notebook and explain sensitivity.

# Plotting scaffold: complete the prediction and residual displays.
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, figsize=(7, 7))
axes[0].scatter([r[0] for r in results], [r[1] for r in results],
                label="Historical observations")
axes[0].set_ylabel("Stopping distance (m)")
axes[1].axhline(0, color="grey", linewidth=1)
axes[1].set_ylabel("Observed minus predicted (m)")
for ax in axes:
    ax.set_xlabel("Initial speed (m/s)")
# Add both model curves and both residual series; label each.
axes[0].legend()
fig.tight_layout()
plt.show()
