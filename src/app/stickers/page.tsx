"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStickers, type Sticker } from "@/lib/stickers";

const gameLabels: Record<string, string> = {
  moji: "もじを えらぼう",
  aiueo: "あいうえお",
  kotoba: "ことば づくり",
  kazoe: "かぞえよう",
  tashizan: "たしざん",
  ookii: "どっちが おおきい？",
};

export default function StickersPage() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    setStickers(getStickers());
  }, []);

  // Show at least 12 slots, or enough to fit all stickers + a few empty
  const totalSlots = Math.max(12, stickers.length + 3);

  return (
    <main className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 flex items-center gap-4 shadow-lg">
        <Link
          href="/"
          className="text-3xl bg-white/20 rounded-full w-14 h-14 flex items-center justify-center active:scale-90 transition-transform"
        >
          {"\u2190"}
        </Link>
        <h1 className="text-3xl font-black flex-1">
          {"\u{1F4D6}"} シールちょう
        </h1>
        <div className="text-2xl font-bold">
          {stickers.length}まい
        </div>
      </header>

      {/* Sticker book */}
      <div className="flex-1 p-4 overflow-y-auto">
        {stickers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6 text-center">
            <span className="text-8xl">{"\u{1F4D6}"}</span>
            <p className="text-3xl text-gray-400 font-bold">
              まだ シールが ないよ
            </p>
            <p className="text-2xl text-gray-400">
              もんだいを さいごまで とくと
              <br />
              シールが もらえるよ！
            </p>
            <Link
              href="/"
              className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-2xl font-black py-4 px-10 rounded-full shadow-lg active:scale-95 transition-transform mt-4"
            >
              おべんきょう する！
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {Array.from({ length: totalSlots }).map((_, i) => {
              const sticker = stickers[i];
              if (sticker) {
                return (
                  <div key={sticker.id} className="flex flex-col items-center gap-1">
                    <div className="w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-pink-100 to-yellow-100 relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={sticker.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      {/* Glossy effect */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                    <span className="text-xs text-gray-400 font-bold truncate w-full text-center">
                      {gameLabels[sticker.game] || sticker.game}
                    </span>
                  </div>
                );
              }
              return (
                <div key={`empty-${i}`} className="flex flex-col items-center gap-1">
                  <div className="w-full aspect-square rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center">
                    <span className="text-4xl text-gray-200">？</span>
                  </div>
                  <span className="text-xs text-transparent">.</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
