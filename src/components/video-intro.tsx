"use client";

import { useEffect, useRef, useState } from "react";

export function VideoIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<"intro" | "fading" | "done">("intro");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    if (localStorage.getItem("tp_intro_seen")) {
      setPhase("done");
    }
  }, []);

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
    const handleEnded = () => {
      localStorage.setItem("tp_intro_seen", "1");
      setPhase("fading");
    };
    video.addEventListener("ended", handleEnded);

    // Safety: if video stalls or is too long, cap at 10s of play
    const cap = setTimeout(() => {
      if (phase === "intro") {
        localStorage.setItem("tp_intro_seen", "1");
        setPhase("fading");
      }
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
        <source src={isMobile ? "/hero-intro-mobile.mp4" : "/hero-intro.mp4"} type="video/mp4" />
      </video>

      {/* Skip button */}
      <button
        onClick={() => { localStorage.setItem("tp_intro_seen", "1"); setPhase("fading"); }}
        className="absolute bottom-8 right-8 text-white/50 hover:text-white text-xs mono uppercase tracking-widest transition-colors"
      >
        Saltar →
      </button>
    </div>
  );
}
