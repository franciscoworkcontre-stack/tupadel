import Image from "next/image";

type LogoProps = {
  variant?: "full" | "icon";
  dark?: boolean;
  className?: string;
};

export function Logo({ variant = "full", dark = false, className = "" }: LogoProps) {
  // On light bg: multiply removes the white/gray background
  // On dark bg: brightness-0 invert makes the whole logo white and clean
  const filter = dark ? "brightness-0 invert" : "mix-blend-mode-multiply";

  if (variant === "icon") {
    return (
      <Image
        src="/logo-icon.png"
        alt="Pulso Pádel"
        width={40}
        height={44}
        style={{ mixBlendMode: dark ? undefined : "multiply" }}
        className={`object-contain ${dark ? "brightness-0 invert" : ""} ${className}`}
      />
    );
  }

  return (
    <Image
      src="/logo-full.png"
      alt="Pulso Pádel — La guía para jugar mejor"
      width={180}
      height={64}
      style={{ mixBlendMode: dark ? undefined : "multiply" }}
      className={`object-contain h-11 w-auto ${dark ? "brightness-0 invert" : ""} ${className}`}
      priority
    />
  );
}
