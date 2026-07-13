export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 420 70"
      width="168"
      height="28"
      className={className}
      aria-label="Bitcoin Plain Talk"
    >
      <g strokeWidth="2.6" fill="none" strokeLinecap="round">
        <g stroke="#C1440E">
          <line x1="35" y1="9" x2="35" y2="19" />
          <line x1="35" y1="51" x2="35" y2="61" />
          <line x1="9" y1="35" x2="19" y2="35" />
          <line x1="51" y1="35" x2="61" y2="35" />
        </g>
        <g stroke="#10514A">
          <line x1="16.4" y1="16.4" x2="23.5" y2="23.5" />
          <line x1="46.5" y1="46.5" x2="53.6" y2="53.6" />
          <line x1="16.4" y1="53.6" x2="23.5" y2="46.5" />
          <line x1="46.5" y1="23.5" x2="53.6" y2="16.4" />
        </g>
        <circle cx="35" cy="35" r="15" fill="#F7931A" stroke="none" />
      </g>
      <text
        x="80"
        y="45"
        fontFamily="Sora, sans-serif"
        fontWeight="800"
        fontSize="32"
        fill="#1C1410"
      >
        Bitcoin Plain Talk
      </text>
    </svg>
  );
}
