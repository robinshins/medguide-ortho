// Blueprint grid — the Axis signature backdrop for dark sections. Two-axis 1px
// hairlines at 40px spacing via CSS gradients, low opacity. Pure CSS, no SVG.
export function BlueprintGrid({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className ?? ''}`}
      style={{
        backgroundImage:
          'linear-gradient(rgba(143,168,255,0.07) 1px, transparent 1px), ' +
          'linear-gradient(90deg, rgba(143,168,255,0.07) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />
  );
}
