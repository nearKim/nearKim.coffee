# ML Codex Diagram Generation Scripts

This directory contains Python scripts to generate diagrams for the ML Codex documentation.

## Requirements

```bash
pip install matplotlib numpy
```

## Available Scripts

### `generate_non_orthogonal_basis.py`
Generates a diagram showing three types of bases for R²:
- Orthonormal basis: {(1,0), (0,1)} - perpendicular and unit length
- Orthogonal basis: {(1,1), (1,-1)} - perpendicular but not unit length
- Non-orthogonal basis: {(1,0), (1,1)} - not perpendicular but still valid

**Output:**
- `../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/three_types_of_bases.png`

**Usage:**
```bash
cd scripts
python generate_non_orthogonal_basis.py
```

### `generate_basis_diagram.py` *(legacy)*
Generates diagrams showing two different bases for R²:
- Standard basis: {(1,0), (0,1)}
- Alternative basis: {(1,1), (1,-1)}

**Output:**
- `../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/basis_vectors_r2.png`
- `../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/basis_vectors_r2.svg`

**Usage:**
```bash
cd scripts
python generate_basis_diagram.py
```

### `generate_dependent_vectors.py`
Generates a diagram showing linearly dependent vectors that cannot span R²:
- Shows vectors {(1,1), (2,2)} that only span a line
- Illustrates which vectors can/cannot be represented

**Output:**
- `../01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/dependent_vectors_span.png`

**Usage:**
```bash
cd scripts
python generate_dependent_vectors.py
```

## Regenerating All Diagrams

To regenerate all diagrams at once:

```bash
cd scripts
python generate_non_orthogonal_basis.py && python generate_dependent_vectors.py
```

Or to regenerate all (including legacy diagrams):

```bash
cd scripts
python generate_non_orthogonal_basis.py && python generate_basis_diagram.py && python generate_dependent_vectors.py
```

## Notes

- All scripts must be run from the `scripts/` directory
- Output paths are relative to the script location
- Images are saved in the appropriate documentation structure under `01-foundations/linear-algebra/01-core-linear-system-theory/vector-spaces/`
