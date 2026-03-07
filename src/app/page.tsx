"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { characterImages } from "@/lib/gameData";
import { playBgm, resumeAudio } from "@/lib/sounds";
import { getStickerCount } from "@/lib/stickers";

const decorChars = [0, 3, 8, 10, 14];

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [bgmStarted, setBgmStarted] = useState(false);
  const [stickerCount, setStickerCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    setStickerCount(getStickerCount());
  }, []);

  const startBgm = () => {
    if (!bgmStarted) {
      resumeAudio();
      playBgm();
      setBgmStarted(true);
    }
  };

  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-center px-6 py-8 relative overflow-hidden"
      onTouchStart={startBgm}
      onClick={startBgm}
    >
      {/* Decorative floating characters */}
      {mounted &&
        decorChars.map((ci, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={characterImages[ci]}
            alt=""
            className="absolute w-28 h-28 object-contain opacity-30 animate-float pointer-events-none"
            style={{
              top: `${10 + i * 18}%`,
              left: i % 2 === 0 ? "3%" : "auto",
              right: i % 2 === 1 ? "3%" : "auto",
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}

      {/* Title */}
      <div className="text-center mb-8 animate-slide-up">
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 drop-shadow-sm leading-tight">
          おべんきょう だいすき！
        </h1>
        <p className="text-3xl text-gray-500 mt-4 font-bold">
          さわって はじめよう
        </p>
      </div>

      {/* Category buttons */}
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl">
        <Link
          href="/kokugo"
          className="flex-1 bg-gradient-to-br from-pink-400 to-rose-500 text-white rounded-3xl p-10 shadow-xl active:scale-95 transition-transform flex flex-col items-center gap-4 hover:shadow-2xl"
        >
          <span className="text-8xl">
            {"\u{1F4D6}"}
          </span>
          <span className="text-5xl font-black tracking-wider">もじ</span>
          <span className="text-xl opacity-80">
            もじ・ことば
          </span>
        </Link>

        <Link
          href="/sansu"
          className="flex-1 bg-gradient-to-br from-sky-400 to-blue-500 text-white rounded-3xl p-10 shadow-xl active:scale-95 transition-transform flex flex-col items-center gap-4 hover:shadow-2xl"
        >
          <span className="text-8xl">
            {"\u{1F522}"}
          </span>
          <span className="text-5xl font-black tracking-wider">かず</span>
          <span className="text-xl opacity-80">
            かず・けいさん
          </span>
        </Link>
      </div>

      {/* Sticker book button */}
      <Link
        href="/stickers"
        className="mt-8 bg-gradient-to-br from-yellow-400 to-orange-400 text-white rounded-full py-4 px-10 shadow-xl active:scale-95 transition-transform flex items-center gap-3 hover:shadow-2xl"
      >
        <span className="text-4xl">{"\u2B50"}</span>
        <span className="text-3xl font-black">シールちょう</span>
        {mounted && stickerCount > 0 && (
          <span className="bg-white text-orange-500 font-black text-2xl rounded-full w-10 h-10 flex items-center justify-center ml-1">
            {stickerCount}
          </span>
        )}
      </Link>
    </main>
  );
}
