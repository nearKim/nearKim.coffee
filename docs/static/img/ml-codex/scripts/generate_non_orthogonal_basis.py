"""
Generate a diagram showing three types of bases for R²:
1. Orthonormal basis: perpendicular and unit length
2. Orthogonal basis: perpendicular but not unit length
3. Non-orthogonal basis: linearly independent but not perpendicular
"""
import matplotlib.pyplot as plt
import numpy as np

# Set up the figure with three subplots
fig, (ax1, ax2, ax3) = plt.subplots(1, 3, figsize=(18, 5.5))

# Common settings
arrow_props = dict(head_width=0.12, head_length=0.1, fc='none', linewidth=2.5)
grid_alpha = 0.3

def setup_axes(ax):
    ax.set_xlim(-2, 2)
    ax.set_ylim(-2, 2)
    ax.set_aspect('equal')
    ax.axhline(y=0, color='gray', linewidth=0.5)
    ax.axvline(x=0, color='gray', linewidth=0.5)
    ax.grid(True, alpha=grid_alpha)
    ax.set_xlabel('x', fontsize=11)
    ax.set_ylabel('y', fontsize=11)

# ==================== Left plot: Orthonormal Basis ====================
setup_axes(ax1)

# Orthonormal basis vectors e1 = [1, 0], e2 = [0, 1]
ax1.arrow(0, 0, 0.95, 0, **arrow_props, ec='#2563eb')
ax1.arrow(0, 0, 0, 0.95, **arrow_props, ec='#dc2626')

# Labels
ax1.text(1.15, -0.15, r'$\mathbf{e}_1 = (1, 0)$', fontsize=11, color='#2563eb', fontweight='bold')
ax1.text(-0.15, 1.15, r'$\mathbf{e}_2 = (0, 1)$', fontsize=11, color='#dc2626', fontweight='bold')

# Example vector
example_vec = np.array([1.4, 0.9])
ax1.arrow(0, 0, example_vec[0]-0.05, example_vec[1]-0.05,
          head_width=0.08, head_length=0.06, fc='#16a34a', ec='#16a34a', linewidth=2)
ax1.plot([example_vec[0], example_vec[0]], [0, example_vec[1]], 'k--', alpha=0.3, linewidth=1)
ax1.plot([0, example_vec[0]], [example_vec[1], example_vec[1]], 'k--', alpha=0.3, linewidth=1)
ax1.text(example_vec[0]+0.05, example_vec[1]+0.15, r'$\mathbf{v}$',
         fontsize=11, color='#16a34a', fontweight='bold')
ax1.text(example_vec[0]+0.15, example_vec[1]-0.25, r'$= 1.4\mathbf{e}_1 + 0.9\mathbf{e}_2$',
         fontsize=9, color='#16a34a')

# Show right angle
from matplotlib.patches import Rectangle
angle_size = 0.25
angle_patch = Rectangle((0, 0), angle_size, angle_size,
                        fill=False, edgecolor='black', linewidth=1.5, linestyle='--')
ax1.add_patch(angle_patch)

# Dot product annotation
ax1.text(0.02, 0.98,
         r'$\mathbf{e}_1 \cdot \mathbf{e}_2 = 0$' + '\n' +
         r'$\|\mathbf{e}_1\| = \|\mathbf{e}_2\| = 1$',
         transform=ax1.transAxes, fontsize=10,
         verticalalignment='top',
         bbox=dict(boxstyle='round', facecolor='#dbeafe', alpha=0.9))

ax1.set_title('Orthonormal Basis\n(perpendicular + unit length)',
              fontsize=13, fontweight='bold', color='#1e40af')

# ==================== Middle plot: Orthogonal Basis ====================
setup_axes(ax2)

# Orthogonal basis vectors v1 = [1, 1], v2 = [1, -1]
scale = 0.7
v1 = np.array([1, 1]) * scale
v2 = np.array([1, -1]) * scale

ax2.arrow(0, 0, v1[0]-0.05, v1[1]-0.05, **arrow_props, ec='#2563eb')
ax2.arrow(0, 0, v2[0]-0.05, v2[1]-0.05, **arrow_props, ec='#dc2626')

# Labels
ax2.text(v1[0]+0.15, v1[1]+0.15, r'$\mathbf{v}_1 = (1, 1)$',
         fontsize=11, color='#2563eb', fontweight='bold')
ax2.text(v2[0]+0.15, v2[1]-0.25, r'$\mathbf{v}_2 = (1, -1)$',
         fontsize=11, color='#dc2626', fontweight='bold')

# Same example vector: [1.4, 0.9] = 1.15*[1,1] + 0.25*[1,-1]
# Solving: c1 + c2 = 1.4, c1 - c2 = 0.9 => c1 = 1.15, c2 = 0.25
c1, c2 = 1.15, 0.25
ax2.arrow(0, 0, example_vec[0]-0.05, example_vec[1]-0.05,
          head_width=0.08, head_length=0.06, fc='#16a34a', ec='#16a34a', linewidth=2)

# Show decomposition
comp1 = c1 * np.array([1, 1])
comp2 = c2 * np.array([1, -1])
ax2.plot([0, comp1[0]], [0, comp1[1]], '--', color='#2563eb', alpha=0.4, linewidth=1.5)
ax2.plot([comp1[0], example_vec[0]], [comp1[1], example_vec[1]], '--', color='#dc2626', alpha=0.4, linewidth=1.5)

ax2.text(example_vec[0]+0.05, example_vec[1]+0.15, r'$\mathbf{v}$',
         fontsize=11, color='#16a34a', fontweight='bold')
ax2.text(example_vec[0]+0.15, example_vec[1]-0.25, r'$= 1.15\mathbf{v}_1 + 0.25\mathbf{v}_2$',
         fontsize=9, color='#16a34a')

# Show right angle (rotated 45 degrees)
angle_size = 0.25
angle_vec1 = np.array([1, 1]) / np.sqrt(2) * angle_size
angle_vec2 = np.array([1, -1]) / np.sqrt(2) * angle_size
angle_points = np.array([[0, 0], angle_vec1, angle_vec1 + angle_vec2, angle_vec2, [0, 0]])
ax2.plot(angle_points[:, 0], angle_points[:, 1], 'k--', linewidth=1.5)

# Dot product annotation
ax2.text(0.02, 0.98,
         r'$\mathbf{v}_1 \cdot \mathbf{v}_2 = 0$' + '\n' +
         r'$\|\mathbf{v}_1\| = \|\mathbf{v}_2\| = \sqrt{2}$',
         transform=ax2.transAxes, fontsize=10,
         verticalalignment='top',
         bbox=dict(boxstyle='round', facecolor='#dbeafe', alpha=0.9))

ax2.set_title('Orthogonal Basis\n(perpendicular, not unit length)',
              fontsize=13, fontweight='bold', color='#1e40af')

# ==================== Right plot: Non-Orthogonal Basis ====================
setup_axes(ax3)

# Non-orthogonal basis vectors u1 = [1, 0], u2 = [1, 1]
u1 = np.array([1, 0])
u2 = np.array([1, 1]) * 0.7

ax3.arrow(0, 0, u1[0]-0.05, 0, **arrow_props, ec='#2563eb')
ax3.arrow(0, 0, u2[0]-0.05, u2[1]-0.05, **arrow_props, ec='#dc2626')

# Labels
ax3.text(u1[0]+0.15, -0.15, r'$\mathbf{u}_1 = (1, 0)$',
         fontsize=11, color='#2563eb', fontweight='bold')
ax3.text(u2[0]+0.15, u2[1]+0.15, r'$\mathbf{u}_2 = (1, 1)$',
         fontsize=11, color='#dc2626', fontweight='bold')

# Same example vector: [1.4, 0.9] = 0.5*[1,0] + 0.9*[1,1]
# Solving: d1 + d2 = 1.4, d2 = 0.9 => d1 = 0.5, d2 = 0.9
d1, d2 = 0.5, 0.9
ax3.arrow(0, 0, example_vec[0]-0.05, example_vec[1]-0.05,
          head_width=0.08, head_length=0.06, fc='#16a34a', ec='#16a34a', linewidth=2)

# Show decomposition
comp1_u = d1 * np.array([1, 0])
comp2_u = d2 * np.array([1, 1])
ax3.plot([0, comp1_u[0]], [0, comp1_u[1]], '--', color='#2563eb', alpha=0.4, linewidth=1.5)
ax3.plot([comp1_u[0], example_vec[0]], [comp1_u[1], example_vec[1]], '--', color='#dc2626', alpha=0.4, linewidth=1.5)

ax3.text(example_vec[0]+0.05, example_vec[1]+0.15, r'$\mathbf{v}$',
         fontsize=11, color='#16a34a', fontweight='bold')
ax3.text(example_vec[0]+0.15, example_vec[1]-0.25, r'$= 0.5\mathbf{u}_1 + 0.9\mathbf{u}_2$',
         fontsize=9, color='#16a34a')

# Show the angle (NOT 90 degrees)
from matplotlib.patches import Arc
angle = 45  # degrees
arc = Arc((0, 0), 0.5, 0.5, angle=0, theta1=0, theta2=angle,
          color='orange', linewidth=2, linestyle='-')
ax3.add_patch(arc)
ax3.text(0.35, 0.15, r'$45°$', fontsize=10, color='orange', fontweight='bold')

# Dot product annotation
ax3.text(0.02, 0.98,
         r'$\mathbf{u}_1 \cdot \mathbf{u}_2 = 1 \neq 0$' + '\n' +
         r'Not perpendicular!' + '\n' +
         r'But still spans all of $\mathbb{R}^2$',
         transform=ax3.transAxes, fontsize=10,
         verticalalignment='top',
         bbox=dict(boxstyle='round', facecolor='#fef3c7', alpha=0.9))

ax3.set_title('Non-Orthogonal Basis\n(not perpendicular, but valid!)',
              fontsize=13, fontweight='bold', color='#ea580c')

# Overall title
fig.suptitle(r'Three Types of Bases for $\mathbb{R}^2$: All Span the Full Space',
             fontsize=15, fontweight='bold', y=1.00)

plt.tight_layout()

# Save
output_dir = '../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/'
plt.savefig(f'{output_dir}three_types_of_bases.png', format='png', bbox_inches='tight', dpi=150)
print(f"Saved: {output_dir}three_types_of_bases.png")

# Uncomment to display:
# plt.show()
