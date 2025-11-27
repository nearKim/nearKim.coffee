"""
Generate a diagram showing two different bases for R².
Run this script to create the SVG file.
"""
import matplotlib.pyplot as plt
import numpy as np

# Set up the figure with two subplots
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))

# Common settings
arrow_props = dict(head_width=0.1, head_length=0.08, fc='none', linewidth=2)
grid_alpha = 0.3

# ==================== Left plot: Standard Basis ====================
ax1.set_xlim(-2, 2)
ax1.set_ylim(-2, 2)
ax1.set_aspect('equal')
ax1.axhline(y=0, color='gray', linewidth=0.5)
ax1.axvline(x=0, color='gray', linewidth=0.5)
ax1.grid(True, alpha=grid_alpha)

# Standard basis vectors e1 = [1, 0], e2 = [0, 1]
ax1.arrow(0, 0, 0.9, 0, **arrow_props, ec='#2563eb')  # Blue for e1
ax1.arrow(0, 0, 0, 0.9, **arrow_props, ec='#dc2626')  # Red for e2

# Labels (simplified without bmatrix)
ax1.text(1.1, 0.1, r'$\mathbf{e}_1 = (1, 0)$', fontsize=12, color='#2563eb')
ax1.text(0.1, 1.1, r'$\mathbf{e}_2 = (0, 1)$', fontsize=12, color='#dc2626')

# Show an example vector as combination
example_vec = np.array([1.5, 1.2])
ax1.arrow(0, 0, example_vec[0]-0.05, example_vec[1]-0.05,
          head_width=0.08, head_length=0.06, fc='#16a34a', ec='#16a34a', linewidth=2)
ax1.plot([example_vec[0], example_vec[0]], [0, example_vec[1]], 'k--', alpha=0.4, linewidth=1)
ax1.plot([0, example_vec[0]], [example_vec[1], example_vec[1]], 'k--', alpha=0.4, linewidth=1)
ax1.text(example_vec[0]+0.1, example_vec[1]+0.1, r'$\mathbf{v} = 1.5\mathbf{e}_1 + 1.2\mathbf{e}_2$',
         fontsize=10, color='#16a34a')

ax1.set_title('Standard Basis', fontsize=14, fontweight='bold')
ax1.set_xlabel('x')
ax1.set_ylabel('y')

# ==================== Right plot: Alternative Basis ====================
ax2.set_xlim(-2, 2)
ax2.set_ylim(-2, 2)
ax2.set_aspect('equal')
ax2.axhline(y=0, color='gray', linewidth=0.5)
ax2.axvline(x=0, color='gray', linewidth=0.5)
ax2.grid(True, alpha=grid_alpha)

# Alternative basis vectors v1 = [1, 1], v2 = [1, -1]
# Normalize for display (scale to length ~1 for visual clarity)
scale = 0.7
ax2.arrow(0, 0, scale*1-0.05, scale*1-0.05, **arrow_props, ec='#2563eb')  # Blue for v1
ax2.arrow(0, 0, scale*1-0.05, scale*(-1)+0.05, **arrow_props, ec='#dc2626')  # Red for v2

# Labels (simplified without bmatrix)
ax2.text(scale*1+0.1, scale*1+0.1, r'$\mathbf{v}_1 = (1, 1)$', fontsize=12, color='#2563eb')
ax2.text(scale*1+0.1, scale*(-1)-0.2, r'$\mathbf{v}_2 = (1, -1)$', fontsize=12, color='#dc2626')

# Show the same example vector as combination in new basis
# v = [1.5, 1.2] = c1*[1,1] + c2*[1,-1]
# Solving: c1 + c2 = 1.5, c1 - c2 = 1.2 => c1 = 1.35, c2 = 0.15
c1, c2 = 1.35, 0.15
ax2.arrow(0, 0, example_vec[0]-0.05, example_vec[1]-0.05,
          head_width=0.08, head_length=0.06, fc='#16a34a', ec='#16a34a', linewidth=2)

# Show decomposition along new basis
v1_component = c1 * np.array([1, 1])
v2_component = c2 * np.array([1, -1])
ax2.plot([0, v1_component[0]], [0, v1_component[1]], '--', color='#2563eb', alpha=0.5, linewidth=1.5)
ax2.plot([v1_component[0], example_vec[0]], [v1_component[1], example_vec[1]], '--', color='#dc2626', alpha=0.5, linewidth=1.5)

ax2.text(example_vec[0]+0.1, example_vec[1]+0.1, r'$\mathbf{v} = 1.35\mathbf{v}_1 + 0.15\mathbf{v}_2$',
         fontsize=10, color='#16a34a')

ax2.set_title('Alternative Basis', fontsize=14, fontweight='bold')
ax2.set_xlabel('x')
ax2.set_ylabel('y')

# Overall title
fig.suptitle(r'Two Different Bases for $\mathbb{R}^2$: Same Vector, Different Coordinates',
             fontsize=14, fontweight='bold', y=1.02)

plt.tight_layout()

# Save as SVG and PNG
output_dir = '../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/'
plt.savefig(f'{output_dir}basis_vectors_r2.svg', format='svg', bbox_inches='tight', dpi=150)
plt.savefig(f'{output_dir}basis_vectors_r2.png', format='png', bbox_inches='tight', dpi=150)
print(f"Saved: {output_dir}basis_vectors_r2.svg and {output_dir}basis_vectors_r2.png")

# Uncomment to show interactively:
# plt.show()
