// 정형외과 — "Axis". Engineering blueprint + sports-performance lab: hard edges,
// 1px hairlines, tabular numerals, zero soft shadows. Separation is always a border.
//
// Literal hexes, NOT `rgb(var(--x) / <alpha-value>)`. Each site has exactly one fixed
// theme, so runtime indirection buys nothing — and sharp/satori cannot resolve CSS
// variables, which would break SVG and OG generation.

export const brand = {
  50: '#EEF3FF', 100: '#DCE6FF', 200: '#BCCCFF', 300: '#8FA8FF', 400: '#5F7CFA',
  500: '#3A57EE', 600: '#2740D6', 700: '#1F32AB', 800: '#1C2C86', 900: '#1B2A6B', 950: '#111842',
} as const;

export const accent = {
  50: '#FFF3EC', 100: '#FFE3D3', 200: '#FFC5A6', 300: '#FFA87E', 400: '#FF8A5B',
  500: '#FF6B2C', 600: '#E8541A', 700: '#C04211', 800: '#963512', 900: '#762D14',
} as const;

export const surface = {
  page: '#F4F6FA', card: '#FFFFFF', sunk: '#E9EDF6', inverse: '#0F1523',
} as const;

export const line = {
  DEFAULT: '#D8DEEA', strong: '#BCC6DA', inverse: 'rgba(255,255,255,0.14)',
} as const;

export const ink = {
  DEFAULT: '#0F1523', muted: '#41506B', soft: '#7C89A5', onDark: '#DCE3F2',
} as const;

// Platform chips are semantic, never re-themed per site.
export const platform = {
  naverBg: '#E9F7EE', naverFg: '#127A3C',
  kakaoBg: '#FEF6DC', kakaoFg: '#8A6A00',
  googleBg: '#EAF1FE', googleFg: '#1A56C4',
} as const;

// 6px everywhere — the drafting-table corner, not a pebble.
export const radius = { sm: '4px', md: '6px', lg: '6px', xl: '8px' } as const;

// No elevation in a blueprint. Shared components consume shadow-card/shadow-lift,
// so both resolve to a ring-as-shadow hairline — separation stays a 1px line.
export const shadow = {
  card: '0 0 0 1px #D8DEEA',
  lift: '0 0 0 1px #BCC6DA',
} as const;

export const typeTokens = {
  sans: ['var(--font-sans)', '-apple-system', 'BlinkMacSystemFont', 'Apple SD Gothic Neo',
         'Pretendard', 'Malgun Gothic', 'sans-serif'],
  display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
  mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
  articleMeasure: '66ch',
  articleLeading: '1.85',
  articleSize: '1.0625rem',
} as const;

export function toCssVars(): Record<string, string> {
  const out: Record<string, string> = {};
  const put = (prefix: string, obj: Record<string, string>) => {
    for (const [k, v] of Object.entries(obj)) {
      out[`--${prefix}-${k === 'DEFAULT' ? 'base' : k}`] = v;
    }
  };
  put('brand', brand as unknown as Record<string, string>);
  put('accent', accent as unknown as Record<string, string>);
  put('surface', surface as unknown as Record<string, string>);
  put('line', line as unknown as Record<string, string>);
  put('ink', ink as unknown as Record<string, string>);
  put('platform', platform as unknown as Record<string, string>);
  put('radius', radius as unknown as Record<string, string>);
  out['--article-measure'] = typeTokens.articleMeasure;
  out['--article-leading'] = typeTokens.articleLeading;
  out['--article-size'] = typeTokens.articleSize;
  return out;
}
