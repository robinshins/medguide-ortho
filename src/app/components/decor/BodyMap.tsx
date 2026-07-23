// Human frame, front view — the site's primary navigation surface. A geometric
// mannequin drawn with straight 2px segments, square caps, joint nodes, and a
// dashed center axis, like a figure in an engineering drawing. The home page
// overlays BODY_POINTS as absolutely positioned links.
import type { SVGProps } from 'react';

export interface BodyPoint {
  slug: string;
  label: string;
  /** percentage coordinates within the 240x560 viewBox */
  x: number;
  y: number;
  /** which direction the callout text extends from the marker */
  side: 'left' | 'right';
}

export const BODY_POINTS: BodyPoint[] = [
  { slug: 'neck-disc',         label: '목',          x: 50.0, y: 15.0, side: 'right' },
  { slug: 'rotator-cuff',      label: '어깨',        x: 30.8, y: 17.9, side: 'left' },
  { slug: 'lumbar-disc',       label: '허리',        x: 50.0, y: 32.1, side: 'right' },
  { slug: 'joint-replacement', label: '골반',        x: 41.7, y: 39.3, side: 'left' },
  { slug: 'carpal-tunnel',     label: '팔꿈치·손목', x: 75.8, y: 39.6, side: 'right' },
  { slug: 'knee',              label: '무릎',        x: 42.9, y: 57.5, side: 'left' },
  { slug: 'plantar-fasciitis', label: '발목',        x: 57.5, y: 75.7, side: 'right' },
];

export function BodyMap(props: SVGProps<SVGSVGElement>) {
  const seg = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'square',
    strokeLinejoin: 'miter',
  } as const;

  return (
    <svg viewBox="0 0 240 560" fill="none" aria-hidden="true" {...props}>
      {/* center axis + datum ticks */}
      <path d="M120 6V554" stroke="currentColor" strokeWidth="1" strokeDasharray="3 7" opacity="0.35" />
      <path d="M114 84h12M114 180h12M114 322h12M114 424h12" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* frame */}
      <g opacity="0.85">
        {/* head + neck */}
        <circle cx="120" cy="42" r="24" {...seg} />
        <path d="M112 68v14M128 68v14" {...seg} />
        {/* shoulder girdle */}
        <path d="M112 82L76 98M128 82L164 98" {...seg} />
        {/* arms */}
        <path d="M74 100L62 164L58 222L56 246" {...seg} />
        <path d="M166 100L178 164L182 222L184 246" {...seg} />
        {/* torso */}
        <path d="M84 106L92 178L88 216" {...seg} />
        <path d="M156 106L148 178L152 216" {...seg} />
        {/* spine segment (thoracolumbar) */}
        <path d="M120 92V238" stroke="currentColor" strokeWidth="2" strokeDasharray="6 5" opacity="0.55" />
        {/* pelvis */}
        <path d="M88 216H152" {...seg} />
        <path d="M100 216L120 246L140 216" {...seg} />
        {/* legs */}
        <path d="M88 216L94 322L96 424" {...seg} />
        <path d="M120 246L112 322L108 424" {...seg} />
        <path d="M152 216L146 322L144 424" {...seg} />
        <path d="M120 246L128 322L132 424" {...seg} />
        {/* feet */}
        <path d="M96 424L94 440h18l-4-16" {...seg} />
        <path d="M144 424l2 16h-18l4-16" {...seg} />
      </g>

      {/* joint nodes */}
      <g stroke="currentColor" strokeWidth="1.5" opacity="0.9">
        <circle cx="120" cy="84" r="3.5" />
        <circle cx="74" cy="100" r="3.5" />
        <circle cx="166" cy="100" r="3.5" />
        <circle cx="62" cy="164" r="3.5" />
        <circle cx="178" cy="164" r="3.5" />
        <circle cx="58" cy="222" r="3.5" />
        <circle cx="182" cy="222" r="3.5" />
        <circle cx="120" cy="180" r="3.5" />
        <circle cx="100" cy="220" r="3.5" />
        <circle cx="140" cy="220" r="3.5" />
        <circle cx="103" cy="322" r="3.5" />
        <circle cx="137" cy="322" r="3.5" />
        <circle cx="102" cy="424" r="3.5" />
        <circle cx="138" cy="424" r="3.5" />
      </g>
    </svg>
  );
}
