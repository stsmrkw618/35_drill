"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getStickers, type Sticker } from "@/lib/stickers";
import { characterImages } from "@/lib/gameData";

const gameLabels: Record<string, string> = {
  moji: "もじを えらぼう",
  aiueo: "あいうえお",
  kotoba: "ことば づくり",
  kazoe: "かぞえよう",
  tashizan: "たしざん",
  ookii: "おおきいのどっち？",
};

const SLOTS_PER_PAGE = 8;

// ページごとのテーマ定義
const pageThemes = [
  {
    name: "おはなばたけ",
    bg: "from-green-50 via-yellow-50 to-pink-50",
    borderColor: "border-green-200",
    completedMsg: "おはなばたけ かんせい！",
    emptyEmojis: ["\u{1F337}", "\u{1F33B}", "\u{1F33C}", "\u{1F33A}"],
    decos: [
      { emoji: "\u{1F337}", top: "12%", left: "4%" },
      { emoji: "\u{1F33B}", top: "18%", right: "5%" },
      { emoji: "\u{1F33C}", top: "45%", left: "3%" },
      { emoji: "\u{1F33A}", top: "55%", right: "4%" },
      { emoji: "\u{1F98B}", top: "30%", left: "7%" },
      { emoji: "\u{1F41D}", top: "70%", right: "6%" },
    ],
  },
  {
    name: "うみのなか",
    bg: "from-cyan-50 via-blue-50 to-sky-100",
    borderColor: "border-cyan-200",
    completedMsg: "うみのなか かんせい！",
    emptyEmojis: ["\u{1F41F}", "\u{1F420}", "\u{1F419}", "\u{1F42C}"],
    decos: [
      { emoji: "\u{1F41F}", top: "10%", left: "5%" },
      { emoji: "\u{1F420}", top: "20%", right: "4%" },
      { emoji: "\u{1F419}", top: "50%", left: "3%" },
      { emoji: "\u{1F42C}", top: "60%", right: "5%" },
      { emoji: "\u{1F30A}", top: "35%", left: "6%" },
      { emoji: "\u{1FAB8}", top: "75%", right: "7%" },
    ],
  },
  {
    name: "ほしぞら",
    bg: "from-indigo-100 via-purple-50 to-pink-50",
    borderColor: "border-indigo-200",
    completedMsg: "ほしぞら かんせい！",
    emptyEmojis: ["\u2B50", "\u{1F31F}", "\u{1FA90}", "\u{1F319}"],
    decos: [
      { emoji: "\u2B50", top: "8%", left: "6%" },
      { emoji: "\u{1F31F}", top: "15%", right: "4%" },
      { emoji: "\u{1FA90}", top: "40%", left: "3%" },
      { emoji: "\u{1F319}", top: "55%", right: "5%" },
      { emoji: "\u2B50", top: "70%", left: "5%" },
      { emoji: "\u{1F31F}", top: "80%", right: "6%" },
    ],
  },
  {
    name: "どうぶつえん",
    bg: "from-amber-50 via-lime-50 to-green-50",
    borderColor: "border-amber-200",
    completedMsg: "どうぶつえん かんせい！",
    emptyEmojis: ["\u{1F981}", "\u{1F418}", "\u{1F992}", "\u{1F43C}"],
    decos: [
      { emoji: "\u{1F333}", top: "10%", left: "4%" },
      { emoji: "\u{1F333}", top: "15%", right: "5%" },
      { emoji: "\u{1F43F}\uFE0F", top: "40%", left: "6%" },
      { emoji: "\u{1F99C}", top: "50%", right: "4%" },
      { emoji: "\u{1F333}", top: "70%", left: "3%" },
      { emoji: "\u{1F333}", top: "75%", right: "6%" },
    ],
  },
  {
    name: "おかしのくに",
    bg: "from-pink-50 via-rose-50 to-fuchsia-50",
    borderColor: "border-pink-200",
    completedMsg: "おかしのくに かんせい！",
    emptyEmojis: ["\u{1F36D}", "\u{1F370}", "\u{1F369}", "\u{1F36A}"],
    decos: [
      { emoji: "\u{1F36D}", top: "10%", left: "5%" },
      { emoji: "\u{1F370}", top: "18%", right: "4%" },
      { emoji: "\u{1F36B}", top: "45%", left: "3%" },
      { emoji: "\u{1F369}", top: "55%", right: "5%" },
      { emoji: "\u{1F382}", top: "30%", left: "7%" },
      { emoji: "\u{1F36A}", top: "72%", right: "6%" },
    ],
  },
  {
    name: "にじのそら",
    bg: "from-sky-50 via-violet-50 to-rose-50",
    borderColor: "border-violet-200",
    completedMsg: "にじのそら かんせい！",
    emptyEmojis: ["\u{1F308}", "\u2601\uFE0F", "\u{1F984}", "\u{1F388}"],
    decos: [
      { emoji: "\u{1F308}", top: "8%", left: "4%" },
      { emoji: "\u2601\uFE0F", top: "15%", right: "5%" },
      { emoji: "\u{1F984}", top: "42%", left: "5%" },
      { emoji: "\u{1F388}", top: "55%", right: "4%" },
      { emoji: "\u2601\uFE0F", top: "70%", left: "6%" },
      { emoji: "\u{1F308}", top: "78%", right: "6%" },
    ],
  },
  {
    name: "ようせいのもり",
    bg: "from-emerald-50 via-teal-50 to-cyan-50",
    borderColor: "border-emerald-200",
    completedMsg: "ようせいのもり かんせい！",
    emptyEmojis: ["\u{1F9DA}", "\u{1F344}", "\u{1F33F}", "\u{1F98B}"],
    decos: [
      { emoji: "\u{1F344}", top: "10%", left: "5%" },
      { emoji: "\u{1F9DA}", top: "18%", right: "4%" },
      { emoji: "\u{1F33F}", top: "45%", left: "3%" },
      { emoji: "\u{1F98B}", top: "52%", right: "5%" },
      { emoji: "\u{1F344}", top: "72%", left: "6%" },
      { emoji: "\u{1F9DA}", top: "80%", right: "7%" },
    ],
  },
  {
    name: "ゆきのくに",
    bg: "from-slate-50 via-blue-50 to-sky-50",
    borderColor: "border-blue-200",
    completedMsg: "ゆきのくに かんせい！",
    emptyEmojis: ["\u26C4", "\u2744\uFE0F", "\u{1F3BF}", "\u{1F427}"],
    decos: [
      { emoji: "\u2744\uFE0F", top: "8%", left: "4%" },
      { emoji: "\u26C4", top: "18%", right: "5%" },
      { emoji: "\u2744\uFE0F", top: "40%", left: "6%" },
      { emoji: "\u{1F427}", top: "55%", right: "4%" },
      { emoji: "\u2744\uFE0F", top: "70%", left: "3%" },
      { emoji: "\u26C4", top: "78%", right: "6%" },
    ],
  },
  {
    name: "おうちパーティー",
    bg: "from-yellow-50 via-orange-50 to-red-50",
    borderColor: "border-yellow-200",
    completedMsg: "おうちパーティー かんせい！",
    emptyEmojis: ["\u{1F389}", "\u{1F381}", "\u{1F382}", "\u{1F3B5}"],
    decos: [
      { emoji: "\u{1F389}", top: "10%", left: "5%" },
      { emoji: "\u{1F381}", top: "20%", right: "4%" },
      { emoji: "\u{1F3B5}", top: "42%", left: "3%" },
      { emoji: "\u{1F382}", top: "55%", right: "5%" },
      { emoji: "\u{1F388}", top: "30%", left: "7%" },
      { emoji: "\u{1F389}", top: "75%", right: "6%" },
    ],
  },
  {
    name: "きょうりゅうランド",
    bg: "from-lime-50 via-yellow-50 to-orange-50",
    borderColor: "border-lime-200",
    completedMsg: "きょうりゅうランド かんせい！",
    emptyEmojis: ["\u{1F995}", "\u{1F996}", "\u{1F30B}", "\u{1F95A}"],
    decos: [
      { emoji: "\u{1F995}", top: "10%", left: "4%" },
      { emoji: "\u{1F996}", top: "18%", right: "5%" },
      { emoji: "\u{1F30B}", top: "45%", left: "5%" },
      { emoji: "\u{1F95A}", top: "55%", right: "4%" },
      { emoji: "\u{1F334}", top: "72%", left: "6%" },
      { emoji: "\u{1F995}", top: "80%", right: "7%" },
    ],
  },
  {
    name: "おまつり",
    bg: "from-red-50 via-orange-50 to-yellow-50",
    borderColor: "border-red-200",
    completedMsg: "おまつり かんせい！",
    emptyEmojis: ["\u{1F386}", "\u{1F3EE}", "\u{1F3B6}", "\u{1F367}"],
    decos: [
      { emoji: "\u{1F3EE}", top: "10%", left: "4%" },
      { emoji: "\u{1F386}", top: "18%", right: "5%" },
      { emoji: "\u{1F3B6}", top: "42%", left: "5%" },
      { emoji: "\u{1F367}", top: "55%", right: "4%" },
      { emoji: "\u{1F3EE}", top: "72%", left: "6%" },
      { emoji: "\u{1F386}", top: "80%", right: "7%" },
    ],
  },
  {
    name: "くだものパラダイス",
    bg: "from-red-50 via-yellow-50 to-green-50",
    borderColor: "border-red-200",
    completedMsg: "くだものパラダイス かんせい！",
    emptyEmojis: ["\u{1F353}", "\u{1F34E}", "\u{1F34A}", "\u{1F347}"],
    decos: [
      { emoji: "\u{1F353}", top: "10%", left: "5%" },
      { emoji: "\u{1F34E}", top: "18%", right: "4%" },
      { emoji: "\u{1F34A}", top: "45%", left: "3%" },
      { emoji: "\u{1F347}", top: "55%", right: "5%" },
      { emoji: "\u{1F34C}", top: "30%", left: "7%" },
      { emoji: "\u{1F352}", top: "72%", right: "6%" },
    ],
  },
  {
    name: "おひめさまのおしろ",
    bg: "from-pink-50 via-purple-50 to-indigo-50",
    borderColor: "border-pink-300",
    completedMsg: "おひめさまのおしろ かんせい！",
    emptyEmojis: ["\u{1F451}", "\u{1F3F0}", "\u{1F48E}", "\u{1F470}"],
    decos: [
      { emoji: "\u{1F3F0}", top: "8%", left: "4%" },
      { emoji: "\u{1F451}", top: "15%", right: "5%" },
      { emoji: "\u{1F48E}", top: "42%", left: "6%" },
      { emoji: "\u{1F470}", top: "55%", right: "4%" },
      { emoji: "\u{1F451}", top: "72%", left: "3%" },
      { emoji: "\u{1F48E}", top: "80%", right: "6%" },
    ],
  },
  {
    name: "うちゅうたんけん",
    bg: "from-gray-100 via-indigo-50 to-violet-50",
    borderColor: "border-gray-300",
    completedMsg: "うちゅうたんけん かんせい！",
    emptyEmojis: ["\u{1F680}", "\u{1FA90}", "\u{1F30D}", "\u{1F47E}"],
    decos: [
      { emoji: "\u{1F680}", top: "10%", left: "5%" },
      { emoji: "\u{1FA90}", top: "18%", right: "4%" },
      { emoji: "\u{1F30D}", top: "45%", left: "3%" },
      { emoji: "\u{1F47E}", top: "55%", right: "5%" },
      { emoji: "\u{1F31F}", top: "30%", left: "7%" },
      { emoji: "\u{1F680}", top: "75%", right: "6%" },
    ],
  },
  {
    name: "のうじょう",
    bg: "from-yellow-50 via-amber-50 to-lime-50",
    borderColor: "border-yellow-300",
    completedMsg: "のうじょう かんせい！",
    emptyEmojis: ["\u{1F404}", "\u{1F413}", "\u{1F416}", "\u{1F411}"],
    decos: [
      { emoji: "\u{1F33E}", top: "10%", left: "4%" },
      { emoji: "\u{1F404}", top: "18%", right: "5%" },
      { emoji: "\u{1F413}", top: "42%", left: "5%" },
      { emoji: "\u{1F411}", top: "55%", right: "4%" },
      { emoji: "\u{1F33E}", top: "72%", left: "6%" },
      { emoji: "\u{1F69C}", top: "80%", right: "7%" },
    ],
  },
  {
    name: "むしのもり",
    bg: "from-green-50 via-emerald-50 to-lime-50",
    borderColor: "border-green-300",
    completedMsg: "むしのもり かんせい！",
    emptyEmojis: ["\u{1F41B}", "\u{1F98B}", "\u{1F41E}", "\u{1F41C}"],
    decos: [
      { emoji: "\u{1F41B}", top: "10%", left: "5%" },
      { emoji: "\u{1F98B}", top: "18%", right: "4%" },
      { emoji: "\u{1F41E}", top: "45%", left: "3%" },
      { emoji: "\u{1F41C}", top: "52%", right: "5%" },
      { emoji: "\u{1F33F}", top: "30%", left: "7%" },
      { emoji: "\u{1F41B}", top: "75%", right: "6%" },
    ],
  },
  {
    name: "のりものだいしゅうごう",
    bg: "from-blue-50 via-sky-50 to-cyan-50",
    borderColor: "border-blue-300",
    completedMsg: "のりものだいしゅうごう かんせい！",
    emptyEmojis: ["\u{1F697}", "\u{1F682}", "\u2708\uFE0F", "\u{1F6A2}"],
    decos: [
      { emoji: "\u{1F697}", top: "10%", left: "4%" },
      { emoji: "\u{1F682}", top: "18%", right: "5%" },
      { emoji: "\u2708\uFE0F", top: "42%", left: "5%" },
      { emoji: "\u{1F6A2}", top: "55%", right: "4%" },
      { emoji: "\u{1F681}", top: "72%", left: "6%" },
      { emoji: "\u{1F697}", top: "80%", right: "7%" },
    ],
  },
  {
    name: "にほんのしき",
    bg: "from-pink-50 via-green-50 to-orange-50",
    borderColor: "border-pink-200",
    completedMsg: "にほんのしき かんせい！",
    emptyEmojis: ["\u{1F338}", "\u{1F33B}", "\u{1F341}", "\u2744\uFE0F"],
    decos: [
      { emoji: "\u{1F338}", top: "10%", left: "5%" },
      { emoji: "\u{1F33B}", top: "18%", right: "4%" },
      { emoji: "\u{1F341}", top: "45%", left: "3%" },
      { emoji: "\u2744\uFE0F", top: "55%", right: "5%" },
      { emoji: "\u{1F338}", top: "72%", left: "7%" },
      { emoji: "\u{1F341}", top: "80%", right: "6%" },
    ],
  },
  {
    name: "すいぞくかん",
    bg: "from-blue-50 via-teal-50 to-cyan-50",
    borderColor: "border-teal-200",
    completedMsg: "すいぞくかん かんせい！",
    emptyEmojis: ["\u{1F422}", "\u{1F988}", "\u{1F40B}", "\u{1F9AD}"],
    decos: [
      { emoji: "\u{1F422}", top: "10%", left: "4%" },
      { emoji: "\u{1F988}", top: "18%", right: "5%" },
      { emoji: "\u{1F40B}", top: "42%", left: "5%" },
      { emoji: "\u{1F9AD}", top: "55%", right: "4%" },
      { emoji: "\u{1F30A}", top: "72%", left: "6%" },
      { emoji: "\u{1F422}", top: "80%", right: "7%" },
    ],
  },
  {
    name: "ピクニック",
    bg: "from-green-50 via-yellow-50 to-sky-50",
    borderColor: "border-green-200",
    completedMsg: "ピクニック かんせい！",
    emptyEmojis: ["\u{1F9FA}", "\u{1F96A}", "\u{1F3D5}\uFE0F", "\u{1F33F}"],
    decos: [
      { emoji: "\u{1F9FA}", top: "10%", left: "5%" },
      { emoji: "\u{1F96A}", top: "18%", right: "4%" },
      { emoji: "\u{1F33F}", top: "45%", left: "3%" },
      { emoji: "\u{1F33B}", top: "55%", right: "5%" },
      { emoji: "\u{1F3D5}\uFE0F", top: "30%", left: "7%" },
      { emoji: "\u{1F9FA}", top: "75%", right: "6%" },
    ],
  },
];

export default function StickersPage() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    const s = getStickers();
    setStickers(s);
    // 最新のページ（最後に埋めているページ）を初期表示
    const lastPage = Math.max(0, Math.ceil(s.length / SLOTS_PER_PAGE) - 1);
    setPageIndex(lastPage);
  }, []);

  const totalPages = Math.max(1, Math.ceil(stickers.length / SLOTS_PER_PAGE));
  // 次のページは、現ページが埋まっていれば解放
  const unlockedPages = Math.min(
    pageThemes.length,
    Math.floor(stickers.length / SLOTS_PER_PAGE) + 1
  );

  const currentPage = Math.min(pageIndex, unlockedPages - 1);
  const theme = pageThemes[currentPage % pageThemes.length];
  const pageStickers = stickers.slice(
    currentPage * SLOTS_PER_PAGE,
    (currentPage + 1) * SLOTS_PER_PAGE
  );
  const isPageComplete = pageStickers.length >= SLOTS_PER_PAGE;
  const remaining = SLOTS_PER_PAGE - pageStickers.length;

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
      <div className="flex-1 overflow-hidden relative flex flex-col">
        {/* テーマ背景 */}
        <div className={`absolute inset-0 bg-gradient-to-b ${theme.bg} pointer-events-none transition-all duration-500`} />

        {/* 背景デコレーション */}
        {theme.decos.map((d, i) => (
          <span
            key={`${currentPage}-${i}`}
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

        <div className="relative flex-1 flex flex-col p-4">
          {stickers.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 gap-6 text-center">
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
              {/* ページタイトルと進捗 */}
              <div className="text-center mb-3">
                <p className="text-lg font-bold text-gray-400 mb-1">
                  {currentPage + 1}ページめ
                </p>
                {isPageComplete ? (
                  <p className="text-2xl font-black text-pink-500 animate-bounce-in">
                    {"\u{1F389}"} {theme.completedMsg} {"\u{1F389}"}
                  </p>
                ) : (
                  <p className="text-xl font-bold text-gray-400">
                    あと {remaining}まいで {theme.name} かんせい！
                  </p>
                )}
              </div>

              {/* 台紙グリッド */}
              <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto flex-1 content-center">
                {Array.from({ length: SLOTS_PER_PAGE }).map((_, i) => {
                  const sticker = pageStickers[i];
                  if (sticker) {
                    return (
                      <div key={sticker.id} className="flex flex-col items-center gap-1">
                        <div
                          className="w-full aspect-square rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-gradient-to-br from-pink-100 to-yellow-100 relative animate-fade-in-up"
                          style={{ animationDelay: `${i * 0.05}s` }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={sticker.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const img = e.currentTarget;
                              const fallback = characterImages[Math.floor(Math.random() * characterImages.length)];
                              if (img.src !== fallback) img.src = fallback;
                            }}
                          />
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
                      <div className={`w-full aspect-square rounded-2xl border-4 border-dashed ${theme.borderColor} bg-white/50 flex items-center justify-center`}>
                        <span className="text-4xl opacity-30">
                          {theme.emptyEmojis[i % theme.emptyEmojis.length]}
                        </span>
                      </div>
                      <span className="text-xs text-transparent">.</span>
                    </div>
                  );
                })}
              </div>

              {/* ページ切り替え＋ボタン */}
              <div className="flex items-center justify-center gap-6 mt-3 pb-2">
                <button
                  onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
                  disabled={currentPage <= 0}
                  className={`text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg active:scale-90 transition-transform ${
                    currentPage <= 0 ? "opacity-30" : ""
                  }`}
                >
                  {"\u2190"}
                </button>

                {/* ページドット */}
                <div className="flex gap-2">
                  {Array.from({ length: unlockedPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPageIndex(i)}
                      className={`w-4 h-4 rounded-full transition-all ${
                        i === currentPage
                          ? "bg-orange-400 scale-125"
                          : "bg-gray-300"
                      }`}
                    />
                  ))}
                  {unlockedPages < pageThemes.length && (
                    <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px] text-gray-400">?</span>
                  )}
                </div>

                <button
                  onClick={() => setPageIndex((p) => Math.min(unlockedPages - 1, p + 1))}
                  disabled={currentPage >= unlockedPages - 1}
                  className={`text-4xl bg-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg active:scale-90 transition-transform ${
                    currentPage >= unlockedPages - 1 ? "opacity-30" : ""
                  }`}
                >
                  {"\u2192"}
                </button>

                <Link
                  href="/"
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xl font-black py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform ml-4"
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
