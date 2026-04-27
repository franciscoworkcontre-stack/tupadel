"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"intro" | "fading" | "done">("intro");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start at second 6
    video.currentTime = 6;
    video.play().catch(() => {
      // Autoplay blocked — skip straight to site
      setPhase("done");
    });

    // When video ends (at ~15s), start fade
    const handleEnded = () => setPhase("fading");
    video.addEventListener("ended", handleEnded);

    // Safety: if video stalls or is too long, cap at 10s of play
    const cap = setTimeout(() => {
      if (phase === "intro") setPhase("fading");
    }, 10000);

    return () => {
      video.removeEventListener("ended", handleEnded);
      clearTimeout(cap);
    };
  }, []);

  // After fade animation completes, unmount overlay entirely
  useEffect(() => {
    if (phase === "fading") {
      const t = setTimeout(() => setPhase("done"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-700 ${
        phase === "fading" ? "opacity-0" : "opacity-100"
      }`}
      style={{ pointerEvents: phase === "fading" ? "none" : "all" }}
    >
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src="/hero-intro.mp4" type="video/mp4" />
      </video>

      {/* Logo centered over video */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="relative w-48 md:w-64 drop-shadow-2xl">
          <Image
            src="/logo-full.png"
            alt="Pulso Pádel"
            width={400}
            height={225}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={() => setPhase("fading")}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white text-xs mono uppercase tracking-widest transition-colors"
      >
        Saltar →
      </button>
    </div>
  );
}
