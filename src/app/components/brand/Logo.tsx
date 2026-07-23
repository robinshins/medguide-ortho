// Axis — vertebra chevron stack on a dark drafting tile. A vertical alignment tick
// sits on top; one chevron is safety orange (the segment under analysis).
// All geometry, square caps, no fonts in the mark.
import type { SVGProps } from 'react';

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="6" fill="#0F1523" />
      <path d="M16 4.5V8" stroke="#8FA8FF" strokeWidth="2" strokeLinecap="square" />
      <path d="M10 14.5l6-3.5 6 3.5" stroke="#FF6B2C" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M10 19.5l6-3.5 6 3.5" stroke="#8FA8FF" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M10 24.5l6-3.5 6 3.5" stroke="#5F7CFA" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
      <path d="M10 29.5l6-3.5 6 3.5" stroke="#3A57EE" strokeWidth="2.4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

export function Wordmark(props: SVGProps<SVGSVGElement>) {
  // Browser-rendered (never rasterized), so <text> with the document font is safe.
  return (
    <svg viewBox="0 0 86 20" aria-hidden="true" {...props}>
      <text x="0" y="15" fontFamily="inherit" fontSize="15.5" fontWeight="800"
            letterSpacing="-0.01em" fill="currentColor">본앤조인트</text>
    </svg>
  );
}
