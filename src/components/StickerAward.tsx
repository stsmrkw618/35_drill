"use client";

import { useEffect, useState } from "react";
import type { Sticker } from "@/lib/stickers";

export default function StickerAward({
  sticker,
  onClose,
}: {
  sticker: Sticker | null;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<"enter" | "placed">("enter");

  useEffect(() => {
    if (sticker) {
      setPhase("enter");
      const timer = setTimeout(() => setPhase("placed"), 800);
      return () => clearTimeout(timer);
    }
  }, [sticker]);

  if (!sticker) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={onClose}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Sticker */}
        <div
          className={`relative transition-all duration-700 ease-out ${
            phase === "enter"
              ? "scale-0 rotate-[-180deg]"
              : "scale-100 rotate-0"
          }`}
        >
          {/* Sparkles around sticker */}
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="absolute text-3xl"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-130px)`,
                animation:
                  phase === "placed"
                    ? `star-burst 1.5s ease-out ${i * 0.08}s forwards`
                    : "none",
                opacity: phase === "placed" ? 1 : 0,
              }}
            >
              {
                [
                  "\u2B50",
                  "\u{1F31F}",
                  "\u2728",
                  "\u{1F496}",
                  "\u2B50",
                  "\u{1F31F}",
                  "\u2728",
                  "\u{1F496}",
                ][i]
              }
            </span>
          ))}

          {/* Circular sticker */}
          <div className="w-56 h-56 rounded-full overflow-hidden border-[6px] border-white shadow-2xl bg-gradient-to-br from-pink-100 to-yellow-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sticker.imageUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* Glossy effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Text */}
        <div
          className={`transition-all duration-500 delay-500 ${
            phase === "placed"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-white/90 rounded-full px-10 py-4 shadow-xl">
            <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500">
              シール ゲット！
            </p>
          </div>
        </div>

        <p
          className={`text-2xl text-white font-bold transition-all duration-500 delay-700 ${
            phase === "placed"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          さわって つぎに すすもう
        </p>
      </div>
    </div>
  );
}
