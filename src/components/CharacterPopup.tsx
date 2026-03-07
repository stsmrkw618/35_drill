"use client";

import { useEffect, useState } from "react";
import { characterImages, praiseMessages } from "@/lib/gameData";

export default function CharacterPopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  const [imgSrc, setImgSrc] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (show) {
      setImgSrc(
        characterImages[Math.floor(Math.random() * characterImages.length)]
      );
      setMessage(
        praiseMessages[Math.floor(Math.random() * praiseMessages.length)]
      );
      const timer = setTimeout(onClose, 3500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onClose}
    >
      <div className="animate-bounce-in flex flex-col items-center gap-6">
        {/* Stars burst */}
        <div className="relative">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="absolute text-5xl"
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-160px)`,
                animation: `star-burst 1.2s ease-out ${i * 0.1}s forwards`,
              }}
            >
              {["\u2B50", "\u{1F31F}", "\u2728", "\u{1F496}", "\u{1F308}", "\u{1F389}"][i]}
            </span>
          ))}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt=""
            className="w-64 h-64 object-contain drop-shadow-2xl"
          />
        </div>
        <div className="bg-white/90 rounded-full px-12 py-5 shadow-xl">
          <p className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-400 to-yellow-500">
            {message}
          </p>
        </div>
        <p className="text-2xl text-white font-bold mt-2">
          さわって つぎへすすもう
        </p>
      </div>
    </div>
  );
}
