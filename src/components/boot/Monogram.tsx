/** AT mark — compact interlocking initials. */
export function Monogram({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      <path
        d="M10 52 L26 12 H36 L30 28 H42 L48 12 H58 L42 52 H32 L38 36 H26 L20 52 Z"
        fill="currentColor"
      />
      <path d="M18 52 H46" stroke="currentColor" strokeWidth="3.5" opacity="0.4" />
    </svg>
  );
}
