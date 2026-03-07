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
  ookii: "おおきいのどっち？",
};

// お花畑の台紙デコレーション（固定位置）
const gardenDecorations = [
  { emoji: "\u{1F337}", top: "8%", left: "5%" },
  { emoji: "\u{1F33B}", top: "15%", right: "8%" },
  { emoji: "\u{1F33C}", top: "35%", left: "3%" },
  { emoji: "\u{1F33A}", top: "50%", right: "4%" },
  { emoji: "\u{1F337}", top: "65%", left: "6%" },
  { emoji: "\u{1F33B}", top: "80%", right: "6%" },
  { emoji: "\u{1F33C}", top: "90%", left: "4%" },
  { emoji: "\u{1F98B}", top: "25%", left: "8%" },
  { emoji: "\u{1F41D}", top: "55%", right: "9%" },
  { emoji: "\u{1F98B}", top: "75%", right: "3%" },
];

const TOTAL_SLOTS = 24;

export default function StickersPage() {
  const [stickers, setStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    setStickers(getStickers());
  }, []);

  const filledCount = Math.min(stickers.length, TOTAL_SLOTS);

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
          {"\u2B50"} シールちょう
        </h1>
        <div className="text-2xl font-bold">
          {stickers.length}まい
        </div>
      </header>

      {/* Sticker book */}
      <div className="flex-1 overflow-y-auto relative">
        {/* お花畑の背景 */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-yellow-50 to-pink-50 pointer-events-none" />

        {/* 背景の花デコレーション */}
        {gardenDecorations.map((d, i) => (
          <span
            key={i}
            className="absolute text-3xl opacity-20 pointer-events-none animate-float"
            style={{
              top: d.top,
              left: d.left,
              right: d.right,
              animationDelay: `${i * 0.4}s`,
            }}
          >
            {d.emoji}
          </span>
        ))}

        <div className="relative p-4">
          {stickers.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
              <span className="text-8xl">{"\u{1F33B}"}</span>
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
            <>
              {/* 進捗メッセージ */}
              <div className="text-center mb-4">
                {filledCount >= TOTAL_SLOTS ? (
                  <p className="text-2xl font-black text-pink-500 animate-bounce-in">
                    {"\u{1F389}"} おはなばたけ かんせい！ {"\u{1F389}"}
                  </p>
                ) : (
                  <p className="text-xl font-bold text-gray-400">
                    あと {TOTAL_SLOTS - filledCount}まいで おはなばたけ かんせい！
                  </p>
                )}
              </div>

              {/* 台紙グリッド */}
              <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
                {Array.from({ length: TOTAL_SLOTS }).map((_, i) => {
                  const sticker = stickers[i];
                  if (sticker) {
                    return (
                      <div key={sticker.id} className="flex flex-col items-center gap-1">
                        <div className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-pink-100 to-yellow-100 relative animate-fade-in-up"
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sticker.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          {/* Glossy effect */}
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                        </div>
                        <span className="text-xs text-gray-400 font-bold truncate w-full text-center">
                          {gameLabels[sticker.game] || sticker.game}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div key={`empty-${i}`} className="flex flex-col items-center gap-1">
                      <div className="w-full aspect-square rounded-2xl border-4 border-dashed border-green-200 bg-white/50 flex items-center justify-center">
                        <span className="text-4xl opacity-30">
                          {["\u{1F337}", "\u{1F33B}", "\u{1F33C}", "\u{1F33A}"][i % 4]}
                        </span>
                      </div>
                      <span className="text-xs text-transparent">.</span>
                    </div>
                  );
                })}
              </div>

              {/* もっと集めるボタン */}
              <div className="flex justify-center mt-6 pb-4">
                <Link
                  href="/"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-2xl font-black py-4 px-10 rounded-full shadow-lg active:scale-95 transition-transform"
                >
                  もっと あつめる！
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
