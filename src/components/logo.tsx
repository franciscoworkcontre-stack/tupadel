type LogoProps = {
  variant?: "full" | "icon";
  dark?: boolean;
  className?: string;
};

export function Logo({ variant = "full", dark = false, className = "" }: LogoProps) {
  const navy = dark ? "#FFFFFF" : "#0D1B2A";
  const lime = "#A8E63A";
  const white = dark ? "#0D1B2A" : "#FFFFFF";

  const icon = (
    <svg viewBox="0 0 88 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* P body — vertical bar + rounded head */}
      <path
        d="M10 4 L44 4 C66 4 76 16 76 30 C76 44 66 56 44 56 L28 56 L28 76 C28 82 23 86 17 86 L13 86 C9 86 6 83 6 79 L6 10 C6 6.7 7.8 4 10 4Z"
        fill={navy}
      />
      {/* Speed lines — lower left */}
      <line x1="0" y1="67" x2="22" y2="72" stroke={navy} strokeWidth="6" strokeLinecap="round"/>
      <line x1="0" y1="79" x2="19" y2="83" stroke={navy} strokeWidth="5" strokeLinecap="round"/>
      <line x1="2" y1="91" x2="16" y2="93" stroke={navy} strokeWidth="4" strokeLinecap="round"/>
      {/* Handle line inside loop */}
      <line x1="30" y1="50" x2="58" y2="20" stroke={white} strokeWidth="6.5" strokeLinecap="round"/>
      {/* Ball — lime circle */}
      <circle cx="62" cy="17" r="13" fill={lime}/>
    </svg>
  );

  if (variant === "icon") return <div className={className}>{icon}</div>;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="w-7 h-8 flex-shrink-0">{icon}</div>
      <div className="flex flex-col leading-none">
        <span
          className="font-extrabold text-[17px] tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)", color: navy, letterSpacing: "-0.02em" }}
        >
          PULSO
        </span>
        <span
          className="font-extrabold text-[17px] tracking-tight"
          style={{ fontFamily: "var(--font-montserrat)", color: lime, letterSpacing: "-0.02em", marginTop: "-2px" }}
        >
          PÁDEL
        </span>
      </div>
    </div>
  );
}
