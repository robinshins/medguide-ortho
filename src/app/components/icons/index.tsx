// Axis icon grammar: 24 viewBox, stroke 2, SQUARE caps, miter joins — technical
// glyphs drawn like joint diagrams. One small filled square marks the point of
// interest (pain point / nerve / implant) instead of a soft accent dot.
import type { SVGProps } from 'react';

type Icon = (p: SVGProps<SVGSVGElement>) => React.ReactElement;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'square',
  strokeLinejoin: 'miter',
} as const;

// 정형외과 전체 — crosshair reticle with a square datum point.
const General: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <circle cx="12" cy="12" r="6.5" {...base} />
    <path d="M12 1.5V5M12 19v3.5M1.5 12H5M19 12h3.5" {...base} />
    <rect x="10.8" y="10.8" width="2.4" height="2.4" fill="currentColor" stroke="none" />
  </svg>
);

// 도수치료 — two opposed mobilization vectors (shear force pair).
const ManualTherapy: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4.5 8.5H15" {...base} />
    <path d="M12 5l3.5 3.5L12 12" {...base} />
    <path d="M19.5 15.5H9" {...base} />
    <path d="M12 12l-3.5 3.5L12 19" {...base} />
  </svg>
);

// 체외충격파 — probe face, expanding concentric wavefronts, energy bolt.
const Eswt: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4 9.5v5" {...base} />
    <path d="M8.5 7.5a6.5 6.5 0 0 1 0 9" {...base} />
    <path d="M11.5 4.5a10.8 10.8 0 0 1 0 15" {...base} />
    <path d="M19.5 8l-3.2 5h3.4L16.5 18" {...base} />
  </svg>
);

// 허리디스크 — lumbar chevron stack, herniation marked as a filled square.
const LumbarDisc: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M6.5 5.5L12 9l5.5-3.5" {...base} />
    <path d="M6.5 10.5L12 14l5.5-3.5" {...base} />
    <path d="M6.5 15.5L12 19l5.5-3.5" {...base} />
    <rect x="18.9" y="11.2" width="2.4" height="2.4" fill="currentColor" stroke="none" />
  </svg>
);

// 목디스크 — head node above cervical chevrons.
const NeckDisc: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <circle cx="12" cy="5" r="2.8" {...base} />
    <path d="M7.5 11L12 14l4.5-3" {...base} />
    <path d="M7.5 16L12 19l4.5-3" {...base} />
  </svg>
);

// 척추관협착증 — canal walls pinching in, dashed nerve flow through the gap.
const SpinalStenosis: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M8 2.5V8l2.5 4L8 16v5.5" {...base} />
    <path d="M16 2.5V8l-2.5 4 2.5 4v5.5" {...base} />
    <path d="M12 3v18" {...base} strokeDasharray="2 3" />
  </svg>
);

// 무릎관절 — femoral condyle over tibial plateau with joint space.
const Knee: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M12 2.5V7" {...base} />
    <path d="M7.5 10.5a4.5 3.5 0 0 1 9 0" {...base} />
    <path d="M7.5 13.5a4.5 3.5 0 0 0 9 0" {...base} />
    <path d="M12 17v4.5" {...base} />
  </svg>
);

// 어깨회전근개 — acromial arc over the humeral head, shaft below.
const RotatorCuff: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M4.5 10.5A9.5 9.5 0 0 1 19 7" {...base} />
    <circle cx="13.8" cy="12.2" r="3.3" {...base} />
    <path d="M13.8 15.5v6" {...base} />
  </svg>
);

// 족저근막염 — shin-to-toe arch profile on a ground line, heel point marked.
const PlantarFasciitis: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M6.5 6.5V13a5 5 0 0 0 5 5H20" {...base} />
    <path d="M3.5 21h17" {...base} />
    <rect x="5.5" y="18.2" width="2.4" height="2.4" fill="currentColor" stroke="none" />
  </svg>
);

// 손목터널증후군 — carpal arch cross-section, retinaculum line, median nerve square.
const CarpalTunnel: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M9 5v2.5M12 4v2.5M15 5v2.5" {...base} />
    <path d="M6 15.5a6 6 0 0 1 12 0" {...base} />
    <path d="M4.5 15.5h15" {...base} />
    <rect x="10.8" y="11.4" width="2.4" height="2.4" fill="currentColor" stroke="none" />
  </svg>
);

// 교통사고 — side-view car silhouette on two wheels.
const CarAccident: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M2.5 16.5v-4h3.5L8.5 9h6.5l2.5 3.5h4v4" {...base} />
    <path d="M11.8 9v3.5" {...base} />
    <circle cx="7.3" cy="17" r="2.1" {...base} />
    <circle cx="16.7" cy="17" r="2.1" {...base} />
  </svg>
);

// 인공관절 — hip prosthesis: cup arc, ball, neck, stem.
const JointReplacement: Icon = p => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path d="M9.5 3.5A6.5 6.5 0 0 1 18.5 6" {...base} />
    <circle cx="14" cy="8" r="3" {...base} />
    <path d="M12 10.5L9 14" {...base} />
    <path d="M9 14v7.5" {...base} />
  </svg>
);

const REGISTRY: Record<string, Icon> = {
  general: General,
  'manual-therapy': ManualTherapy,
  eswt: Eswt,
  'lumbar-disc': LumbarDisc,
  'neck-disc': NeckDisc,
  'spinal-stenosis': SpinalStenosis,
  knee: Knee,
  'rotator-cuff': RotatorCuff,
  'plantar-fasciitis': PlantarFasciitis,
  'carpal-tunnel': CarpalTunnel,
  'car-accident': CarAccident,
  'joint-replacement': JointReplacement,
};

export function SpecialtyIcon({ slug, className }: { slug: string; className?: string }) {
  const C = REGISTRY[slug] ?? General;
  return <C className={className} focusable="false" />;
}
