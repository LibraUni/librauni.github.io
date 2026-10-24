export const p101Block3Lessons = {
  "version": "1.0",
  "date": "2026-10-24",
  "status": "Complete B03 construction blueprint within approved 54h/8h Python; U08–U10 teaching and embedded formative iCMA03 available; separate TMA03 remains in preparation.",
  "lessons": [
    {
      "id": "U08-L01",
      "unit": "U08",
      "block": "B03",
      "title": "Describing a repeating motion",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Equilibrium, amplitude, complete cycles, period, frequency and reading time graphs.",
      "scope": "Equilibrium, amplitude, complete cycles, period, frequency and reading time graphs.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U07"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Annotated graph and multi-cycle timing with limits.",
      "handover": "U08-L02",
      "allocation": {
        "reading": 60,
        "activities": 80,
        "feedback": 40
      }
    },
    {
      "id": "U08-L02",
      "unit": "U08",
      "block": "B03",
      "title": "A sinusoidal model of oscillation",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Radian phase, cosine model, offset and phase shifts",
      "scope": "Radian phase, cosine model, offset and phase shifts; supplied SHM rates and linear restoring acceleration; mass\u2013spring scaling.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U08-L01"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Build and interpret a model; test signs, dimensions and scaling.",
      "handover": "U08-L03",
      "allocation": {
        "reading": 85,
        "activities": 105,
        "feedback": 50
      }
    },
    {
      "id": "U08-L03",
      "unit": "U08",
      "block": "B03",
      "title": "Why real oscillations change",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Restoring force and inertia",
      "scope": "Restoring force and inertia; mechanical energy transfer, damping and externally driven resonance, model limits.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U08-L02"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Explain free versus driven responses and controlled comparisons.",
      "handover": "U08-L04",
      "allocation": {
        "reading": 65,
        "activities": 75,
        "feedback": 40
      }
    },
    {
      "id": "U08-L04",
      "unit": "U08",
      "block": "B03",
      "title": "Sampling a signal",
      "hours": 4,
      "pythonHours": 2,
      "purpose": "Uniform samples, transparent same-direction crossing period estimates, aliasing and phase-sensitive failures",
      "scope": "Uniform samples, transparent same-direction crossing period estimates, aliasing and phase-sensitive failures; benchmarked Python.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U08-L03"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Two sampling choices and labelled graphs with hand checks.",
      "handover": "U08-L05",
      "allocation": {
        "reading": 45,
        "written": 40,
        "python": 120,
        "feedback": 35
      }
    },
    {
      "id": "U08-L05",
      "unit": "U08",
      "block": "B03",
      "title": "A defensible signal investigation",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Independent parameter comparison, cumulative exercises, feedback, compact reference and conclusion.",
      "scope": "Independent parameter comparison, cumulative exercises, feedback, compact reference and conclusion.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U08-L04"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Clean-runnable notebook, justified limitation and mixed unit practice.",
      "handover": "U09",
      "allocation": {
        "reading": 15,
        "python": 60,
        "unitExercises": 100,
        "solutionsAndCorrection": 45,
        "referenceAndRevision": 20
      }
    },
    {
      "id": "U09-L01",
      "unit": "U09",
      "block": "B03",
      "title": "From oscillation to propagation",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Spatial versus temporal graphs, wavelength, frequency and wave speed",
      "scope": "Spatial versus temporal graphs, wavelength, frequency and wave speed; supplied travelling profiles.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U08"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7"
      ],
      "evidence": "Labelled profiles and hand-checked wave model.",
      "handover": "U09-L02",
      "allocation": {
        "reading": 75,
        "python": 60,
        "practiceAndFeedback": 105
      }
    },
    {
      "id": "U09-L02",
      "unit": "U09",
      "block": "B03",
      "title": "Adding waves",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Linear superposition, relative phase and constructive/destructive interference.",
      "scope": "Linear superposition, relative phase and constructive/destructive interference.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U09-L01"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7"
      ],
      "evidence": "Two-profile numerical comparison with prediction.",
      "handover": "U09-L03",
      "allocation": {
        "reading": 70,
        "python": 60,
        "practiceAndFeedback": 110
      }
    },
    {
      "id": "U09-L03",
      "unit": "U09",
      "block": "B03",
      "title": "Standing patterns",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Opposite travelling waves, nodes and antinodes with boundary assumptions.",
      "scope": "Opposite travelling waves, nodes and antinodes with boundary assumptions.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U09-L02"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7"
      ],
      "evidence": "Node locations checked by hand and code.",
      "handover": "U09-L04",
      "allocation": {
        "reading": 75,
        "python": 60,
        "practiceAndFeedback": 105
      }
    },
    {
      "id": "U09-L04",
      "unit": "U09",
      "block": "B03",
      "title": "Waves at boundaries and obstacles",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Reflection, qualitative diffraction and wavelength-to-aperture scale.",
      "scope": "Reflection, qualitative diffraction and wavelength-to-aperture scale.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U09-L03"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7"
      ],
      "evidence": "Explain observed patterns within model limits.",
      "handover": "U09-L05",
      "allocation": {
        "reading": 65,
        "python": 0,
        "practiceAndFeedback": 115
      }
    },
    {
      "id": "U09-L05",
      "unit": "U09",
      "block": "B03",
      "title": "Wave investigation and synthesis",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Controlled comparison, cumulative practice and unit reference.",
      "scope": "Controlled comparison, cumulative practice and unit reference.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U09-L04"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7"
      ],
      "evidence": "Documented conclusion and mixed exercises.",
      "handover": "U10",
      "allocation": {
        "reading": 15,
        "python": 0,
        "practiceAndFeedback": 165
      }
    },
    {
      "id": "U10-L01",
      "unit": "U10",
      "block": "B03",
      "title": "Light and rays",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Electromagnetic spectrum, reflection, refraction and angle conventions.",
      "scope": "Electromagnetic spectrum, reflection, refraction and angle conventions.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U09"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Ray diagrams and bounded refraction calculations.",
      "handover": "U10-L02",
      "allocation": {
        "reading": 96,
        "python": 0,
        "practiceAndFeedback": 144
      }
    },
    {
      "id": "U10-L02",
      "unit": "U10",
      "block": "B03",
      "title": "Forming an image",
      "hours": 4,
      "pythonHours": 0,
      "purpose": "Elementary image geometry, converging lenses and magnification with supplied thin-lens relation.",
      "scope": "Elementary image geometry, converging lenses and magnification with supplied thin-lens relation.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U10-L01"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Geometrical construction and interpretation.",
      "handover": "U10-L03",
      "allocation": {
        "reading": 96,
        "python": 0,
        "practiceAndFeedback": 144
      }
    },
    {
      "id": "U10-L03",
      "unit": "U10",
      "block": "B03",
      "title": "Spreading and detecting light",
      "hours": 4,
      "pythonHours": 1,
      "purpose": "Intensity, inverse-square assumptions and signal sampling.",
      "scope": "Intensity, inverse-square assumptions and signal sampling.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U10-L02"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Labelled numerical comparison and manual benchmark.",
      "handover": "U10-L04",
      "allocation": {
        "reading": 72,
        "python": 60,
        "practiceAndFeedback": 108
      }
    },
    {
      "id": "U10-L04",
      "unit": "U10",
      "block": "B03",
      "title": "Observational limits",
      "hours": 3,
      "pythonHours": 1,
      "purpose": "Finite resolution and sampling of documented small signals.",
      "scope": "Finite resolution and sampling of documented small signals.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U10-L03"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Explain what two records can distinguish.",
      "handover": "U10-L05",
      "allocation": {
        "reading": 48,
        "python": 60,
        "practiceAndFeedback": 72
      }
    },
    {
      "id": "U10-L05",
      "unit": "U10",
      "block": "B03",
      "title": "Light and block synthesis",
      "hours": 3,
      "pythonHours": 0,
      "purpose": "Cumulative exercises, formative iCMA03, reference and handover to separate TMA03.",
      "scope": "Cumulative exercises, formative iCMA03, reference and handover to separate TMA03.",
      "boundary": "Approved algebraic/supplied-model scope; no Fourier transforms, complex amplitudes, wave-equation or oscillator ODE derivation. Later units remain plans.",
      "requires": [
        "U10-L04"
      ],
      "outcomes": [
        "P101-O3",
        "P101-O6",
        "P101-O7",
        "P101-O5"
      ],
      "evidence": "Corrected mixed practice and evidence critique.",
      "handover": "U11",
      "allocation": {
        "reading": 72,
        "python": 0,
        "practiceAndFeedback": 108
      }
    }
  ]
};
