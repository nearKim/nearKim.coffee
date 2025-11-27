"""
Generate a diagram showing linearly dependent vectors that cannot span R².
These vectors only span a 1D subspace (a line) within R².
"""
import matplotlib.pyplot as plt
import numpy as np

# Create figure
fig, ax = plt.subplots(1, 1, figsize=(8, 8))

# Settings
ax.set_xlim(-3, 3)
ax.set_ylim(-3, 3)
ax.set_aspect('equal')
ax.axhline(y=0, color='black', linewidth=0.8)
ax.axvline(x=0, color='black', linewidth=0.8)
ax.grid(True, alpha=0.3)

# The region that CAN be spanned (the line y=x)
# Fill the area around the line to show what's spanned
x_line = np.linspace(-3, 3, 100)
y_line = x_line
ax.fill_between(x_line, y_line - 0.15, y_line + 0.15,
                color='#3b82f6', alpha=0.3, label='Spanned subspace (line)')

# Draw the actual line more prominently
ax.plot(x_line, y_line, color='#3b82f6', linewidth=2, linestyle='--', alpha=0.6)

# Dependent vectors: v1 = [1, 1] and v2 = [2, 2]
v1 = np.array([1, 1])
v2 = np.array([2, 2])

# Draw the vectors
arrow_props = dict(head_width=0.15, head_length=0.12, linewidth=2.5)
ax.arrow(0, 0, v1[0]-0.05, v1[1]-0.05, **arrow_props, fc='#dc2626', ec='#dc2626',
         label=r'$\mathbf{v}_1 = (1, 1)$')
ax.arrow(0, 0, v2[0]-0.08, v2[1]-0.08, **arrow_props, fc='#dc2626', ec='#dc2626',
         alpha=0.7, linestyle='--')

# Labels for vectors
ax.text(v1[0]+0.15, v1[1]+0.15, r'$\mathbf{v}_1 = (1, 1)$',
        fontsize=13, color='#dc2626', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))
ax.text(v2[0]+0.15, v2[1]+0.15, r'$\mathbf{v}_2 = (2, 2) = 2\mathbf{v}_1$',
        fontsize=13, color='#dc2626', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.3', facecolor='white', alpha=0.8))

# Show some example vectors that CAN be represented
example_on_line = np.array([1.5, 1.5])
ax.scatter(*example_on_line, color='#16a34a', s=100, zorder=5, marker='o', edgecolors='black', linewidths=2)
ax.text(example_on_line[0]+0.15, example_on_line[1]+0.3, r'$(1.5, 1.5)$ ✓',
        fontsize=11, color='#16a34a', fontweight='bold')

example_on_line2 = np.array([-1, -1])
ax.scatter(*example_on_line2, color='#16a34a', s=100, zorder=5, marker='o', edgecolors='black', linewidths=2)
ax.text(example_on_line2[0]-0.6, example_on_line2[1]-0.3, r'$(-1, -1)$ ✓',
        fontsize=11, color='#16a34a', fontweight='bold')

# Show example vectors that CANNOT be represented
example_off_line1 = np.array([1.5, 0.5])
ax.scatter(*example_off_line1, color='#dc2626', s=100, zorder=5, marker='x', linewidths=3)
ax.text(example_off_line1[0]+0.15, example_off_line1[1]+0.2, r'$(1.5, 0.5)$ ✗',
        fontsize=11, color='#dc2626', fontweight='bold')

example_off_line2 = np.array([0.5, 1.5])
ax.scatter(*example_off_line2, color='#dc2626', s=100, zorder=5, marker='x', linewidths=3)
ax.text(example_off_line2[0]+0.15, example_off_line2[1]+0.2, r'$(0.5, 1.5)$ ✗',
        fontsize=11, color='#dc2626', fontweight='bold')

example_off_line3 = np.array([-1.5, 1])
ax.scatter(*example_off_line3, color='#dc2626', s=100, zorder=5, marker='x', linewidths=3)
ax.text(example_off_line3[0]-0.6, example_off_line3[1]+0.2, r'$(-1.5, 1)$ ✗',
        fontsize=11, color='#dc2626', fontweight='bold')

# Title and labels
ax.set_title(r'Linearly Dependent Vectors: Cannot Span All of $\mathbb{R}^2$',
             fontsize=15, fontweight='bold', pad=20)
ax.set_xlabel('x', fontsize=12)
ax.set_ylabel('y', fontsize=12)

# Add annotation
ax.text(0.02, 0.98,
        r'$\mathbf{v}_2 = 2\mathbf{v}_1$ (dependent)' + '\n' +
        r'Only spans the line $y = x$' + '\n' +
        r'Dimension = 1 (not 2)',
        transform=ax.transAxes,
        fontsize=11,
        verticalalignment='top',
        bbox=dict(boxstyle='round', facecolor='wheat', alpha=0.8))

plt.tight_layout()

# Save
output_dir = '../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/'
plt.savefig(f'{output_dir}dependent_vectors_span.png', format='png', bbox_inches='tight', dpi=150)
print(f"Saved: {output_dir}dependent_vectors_span.png")

# Uncomment to display:
# plt.show()
