"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import CharacterPopup from "@/components/CharacterPopup";
import {
  kazoeQuestions,
  tashizanQuestions,
  ookiiQuestions,
  shuffleArray,
  characterImages,
} from "@/lib/gameData";
import { playCorrect, playWrong, playComplete, playBgm } from "@/lib/sounds";

type GameType = "kazoe" | "tashizan" | "ookii";

const games: { id: GameType; label: string; icon: string }[] = [
  { id: "kazoe", label: "かぞえよう", icon: "\u{1F34E}" },
  { id: "tashizan", label: "たしざん", icon: "\u2795" },
  { id: "ookii", label: "どっちが おおきい？", icon: "\u{1F449}" },
];

function getTotal(game: GameType) {
  switch (game) {
    case "kazoe":
      return kazoeQuestions.length;
    case "tashizan":
      return tashizanQuestions.length;
    case "ookii":
      return ookiiQuestions.length;
  }
}

export default function SansuPage() {
  const [game, setGame] = useState<GameType>("kazoe");
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const total = getTotal(game);

  const resetGame = (g: GameType) => {
    setGame(g);
    setQIndex(0);
    setScore(0);
    setShowPopup(false);
    setShakeId(null);
    setCompleted(false);
  };

  useEffect(() => {
    playBgm();
  }, []);

  const handleCorrect = useCallback(() => {
    playCorrect();
    setScore((s) => s + 1);
    setShowPopup(true);
  }, []);

  const handlePopupClose = useCallback(() => {
    setShowPopup(false);
    if (qIndex + 1 >= total) {
      playComplete();
      setCompleted(true);
    } else {
      setQIndex((i) => i + 1);
    }
  }, [qIndex, total]);

  const handleWrong = (id: string) => {
    playWrong();
    setShakeId(id);
    setTimeout(() => setShakeId(null), 400);
  };

  return (
    <main className="min-h-dvh flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-400 to-blue-500 text-white px-6 py-4 flex items-center gap-4 shadow-lg">
        <Link
          href="/"
          className="text-3xl bg-white/20 rounded-full w-14 h-14 flex items-center justify-center active:scale-90 transition-transform"
        >
          {"\u2190"}
        </Link>
        <h1 className="text-3xl font-black flex-1">
          {"\u{1F522}"} さんすう
        </h1>
        <div className="text-2xl font-bold">
          {"\u2B50"} {score}もん
        </div>
      </header>

      {/* Game tabs */}
      <div className="flex gap-2 p-3 bg-sky-50">
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => resetGame(g.id)}
            className={`flex-1 py-3 px-2 rounded-2xl font-bold text-lg transition-all ${
              game === g.id
                ? "bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-md scale-105"
                : "bg-white text-sky-500 shadow"
            }`}
          >
            {g.icon} {g.label}
          </button>
        ))}
      </div>

      {/* Game area */}
      <div className="flex-1 flex items-center justify-center p-6">
        {completed ? (
          <CompletionScreen
            score={score}
            total={total}
            onRetry={() => resetGame(game)}
          />
        ) : game === "kazoe" ? (
          <KazoeGame
            key={`kazoe-${qIndex}`}
            question={kazoeQuestions[qIndex]}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            shakeId={shakeId}
          />
        ) : game === "tashizan" ? (
          <TashizanGame
            key={`tashi-${qIndex}`}
            question={tashizanQuestions[qIndex]}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            shakeId={shakeId}
          />
        ) : (
          <OokiiGame
            key={`ookii-${qIndex}`}
            question={ookiiQuestions[qIndex]}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            shakeId={shakeId}
          />
        )}
      </div>

      <CharacterPopup show={showPopup} onClose={handlePopupClose} />
    </main>
  );
}

// --- Kazoe Game ---
function KazoeGame({
  question,
  onCorrect,
  onWrong,
  shakeId,
}: {
  question: (typeof kazoeQuestions)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const emojis = Array(question.count).fill(question.emoji);
  const [shuffled, setShuffled] = useState<number[]>([]);
  useEffect(() => {
    setShuffled(shuffleArray(question.options));
  }, [question]);

  if (shuffled.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl">
      <p className="text-3xl text-gray-500 font-bold">いくつ あるかな？</p>
      <div className="flex flex-wrap justify-center gap-4 p-6 bg-white rounded-3xl shadow-lg min-h-[120px]">
        {emojis.map((e, i) => (
          <span
            key={i}
            className="text-7xl animate-pop"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {e}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {shuffled.map((num) => (
          <button
            key={num}
            onClick={() =>
              num === question.count
                ? onCorrect()
                : onWrong(`kazoe-${num}`)
            }
            className={`bg-white rounded-2xl py-7 text-6xl font-black shadow-lg active:scale-95 transition-transform border-4 ${
              shakeId === `kazoe-${num}`
                ? "animate-shake border-red-300 bg-red-50"
                : "border-transparent"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Tashizan Game ---
function TashizanGame({
  question,
  onCorrect,
  onWrong,
  shakeId,
}: {
  question: (typeof tashizanQuestions)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const answer = question.a + question.b;
  const [shuffled, setShuffled] = useState<number[]>([]);
  useEffect(() => {
    setShuffled(shuffleArray(question.options));
  }, [question]);

  if (shuffled.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl">
      <p className="text-3xl text-gray-500 font-bold">あわせて いくつ？</p>

      {/* Visual representation */}
      <div className="flex items-center gap-4 bg-white rounded-3xl p-6 shadow-lg">
        <div className="flex flex-wrap gap-1 justify-center max-w-[160px]">
          {Array(question.a)
            .fill(question.emoji)
            .map((e, i) => (
              <span key={`a${i}`} className="text-6xl">
                {e}
              </span>
            ))}
        </div>
        <span className="text-6xl font-black text-sky-500">+</span>
        <div className="flex flex-wrap gap-1 justify-center max-w-[160px]">
          {Array(question.b)
            .fill(question.emoji)
            .map((e, i) => (
              <span key={`b${i}`} className="text-6xl">
                {e}
              </span>
            ))}
        </div>
        <span className="text-6xl font-black text-sky-500">=</span>
        <span className="text-6xl font-black text-sky-400">？</span>
      </div>

      {/* Number formula */}
      <div className="text-6xl font-black text-gray-700">
        {question.a} + {question.b} = ？
      </div>

      {/* Options */}
      <div className="grid grid-cols-3 gap-4 w-full">
        {shuffled.map((num) => (
          <button
            key={num}
            onClick={() =>
              num === answer ? onCorrect() : onWrong(`tashi-${num}`)
            }
            className={`bg-white rounded-2xl py-7 text-6xl font-black shadow-lg active:scale-95 transition-transform border-4 ${
              shakeId === `tashi-${num}`
                ? "animate-shake border-red-300 bg-red-50"
                : "border-transparent"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Ookii Game ---
function OokiiGame({
  question,
  onCorrect,
  onWrong,
  shakeId,
}: {
  question: (typeof ookiiQuestions)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const answer = question.left > question.right ? "left" : "right";

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl">
      <p className="text-3xl text-gray-500 font-bold">
        おおきいほうを えらんでね！
      </p>
      <div className="flex items-center gap-6 w-full">
        <button
          onClick={() =>
            answer === "left"
              ? onCorrect()
              : onWrong("ookii-left")
          }
          className={`flex-1 bg-white rounded-3xl py-14 flex flex-col items-center gap-2 shadow-xl active:scale-95 transition-transform border-4 ${
            shakeId === "ookii-left"
              ? "animate-shake border-red-300 bg-red-50"
              : "border-transparent"
          }`}
        >
          <span className="text-9xl font-black text-sky-500">
            {question.left}
          </span>
        </button>

        <div className="text-4xl font-black text-gray-400">と</div>

        <button
          onClick={() =>
            answer === "right"
              ? onCorrect()
              : onWrong("ookii-right")
          }
          className={`flex-1 bg-white rounded-3xl py-14 flex flex-col items-center gap-2 shadow-xl active:scale-95 transition-transform border-4 ${
            shakeId === "ookii-right"
              ? "animate-shake border-red-300 bg-red-50"
              : "border-transparent"
          }`}
        >
          <span className="text-9xl font-black text-sky-500">
            {question.right}
          </span>
        </button>
      </div>
    </div>
  );
}

// --- Completion Screen ---
function CompletionScreen({
  score,
  total,
  onRetry,
}: {
  score: number;
  total: number;
  onRetry: () => void;
}) {
  const [imgSrc, setImgSrc] = useState("");
  useEffect(() => {
    setImgSrc(characterImages[Math.floor(Math.random() * characterImages.length)]);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 animate-bounce-in">
      {imgSrc && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imgSrc} alt="" className="w-52 h-52 object-contain" />
      )}
      <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
        おわり！
      </div>
      <div className="text-4xl font-bold text-gray-600">
        {score}もん せいかい！
      </div>
      <div className="text-6xl">
        {score === total
          ? "\u{1F389}\u{1F389}\u{1F389}"
          : score >= total / 2
            ? "\u{1F31F}\u{1F31F}"
            : "\u{1F4AA}"}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={onRetry}
          className="bg-gradient-to-r from-sky-400 to-blue-500 text-white text-3xl font-black py-5 px-12 rounded-full shadow-lg active:scale-95 transition-transform"
        >
          もういっかい
        </button>
        <Link
          href="/"
          className="bg-white text-sky-500 text-3xl font-black py-5 px-12 rounded-full shadow-lg active:scale-95 transition-transform border-2 border-sky-300"
        >
          もどる
        </Link>
      </div>
    </div>
  );
}
