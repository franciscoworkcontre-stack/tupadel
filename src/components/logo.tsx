import Image from "next/image";

type LogoProps = {
  variant?: "full" | "icon";
  dark?: boolean;
  className?: string;
};

export function Logo({ variant = "full", dark = false, className = "" }: LogoProps) {
  if (variant === "icon") {
    return (
      <Image
        src="/logo-icon.png"
        alt="Pulso Pádel"
        width={44}
        height={48}
        className={`object-contain ${dark ? "brightness-0 invert" : ""} ${className}`}
      />
    );
  }

  return (
    <Image
      src="/logo-full.png"
      alt="Pulso Pádel — La guía para jugar mejor"
      width={200}
      height={70}
      className={`object-contain h-11 w-auto ${dark ? "brightness-0 invert" : ""} ${className}`}
      priority
    />
  );
}
