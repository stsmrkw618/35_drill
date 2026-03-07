"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import CharacterPopup from "@/components/CharacterPopup";
import StickerAward from "@/components/StickerAward";
import ProgressDots from "@/components/ProgressDots";
import {
  kazoePool,
  tashizanPool,
  ookiiPool,
  pickRandom,
  shuffleArray,
  characterImages,
  QUESTIONS_PER_GAME,
} from "@/lib/gameData";
import { playCorrect, playWrong, playComplete, playBgm, speakText } from "@/lib/sounds";
import { addSticker, type Sticker } from "@/lib/stickers";

type GameType = "kazoe" | "tashizan" | "ookii";

const games: { id: GameType; label: string; icon: string; desc: string }[] = [
  { id: "kazoe", label: "かぞえよう", icon: "\u{1F34E}", desc: "いくつ あるかな？" },
  { id: "tashizan", label: "たしざん", icon: "\u2795", desc: "あわせて いくつ？" },
  { id: "ookii", label: "おおきいのどっち？", icon: "\u{1F449}", desc: "おおきいほうを えらぼう" },
];

function generateQuestions(game: GameType) {
  switch (game) {
    case "kazoe":
      return pickRandom(kazoePool, QUESTIONS_PER_GAME.kazoe);
    case "tashizan":
      return pickRandom(tashizanPool, QUESTIONS_PER_GAME.tashizan);
    case "ookii":
      return pickRandom(ookiiPool, QUESTIONS_PER_GAME.ookii);
  }
}

export default function SansuPage() {
  const [game, setGame] = useState<GameType | null>(null);
  const [questions, setQuestions] = useState(() => generateQuestions("kazoe"));
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [awardedSticker, setAwardedSticker] = useState<Sticker | null>(null);

  const total = questions.length;

  const startGame = (g: GameType) => {
    setGame(g);
    setQuestions(generateQuestions(g));
    setQIndex(0);
    setScore(0);
    setShowPopup(false);
    setShakeId(null);
    setCompleted(false);
    setAwardedSticker(null);
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
      const sticker = addSticker(game!);
      setAwardedSticker(sticker);
    } else {
      setQIndex((i) => i + 1);
    }
  }, [qIndex, total, game]);

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
          href={game ? "#" : "/"}
          onClick={(e) => {
            if (game) {
              e.preventDefault();
              setGame(null);
              setCompleted(false);
            }
          }}
          className="text-3xl bg-white/20 rounded-full w-14 h-14 flex items-center justify-center active:scale-90 transition-transform"
        >
          {"\u2190"}
        </Link>
        <h1 className="text-3xl font-black flex-1">
          {"\u{1F522}"} さんすう
        </h1>
        {game && (
          <div className="text-2xl font-bold">
            {"\u2B50"} {score}もん
          </div>
        )}
      </header>

      {!game ? (
        /* Game selection cards */
        <div className="flex-1 flex flex-col items-center justify-center gap-6 p-6">
          <p className="text-3xl text-gray-500 font-bold animate-fade-in-up">
            どれで あそぶ？
          </p>
          <div className="flex flex-col gap-5 w-full max-w-md">
            {games.map((g, i) => (
              <button
                key={g.id}
                onClick={() => startGame(g.id)}
                className="bg-white rounded-3xl p-6 shadow-lg active:scale-95 transition-transform flex items-center gap-5 border-4 border-sky-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-7xl w-24 h-24 flex items-center justify-center bg-sky-50 rounded-2xl">
                  {g.icon}
                </span>
                <div className="flex flex-col items-start gap-1">
                  <span className="text-3xl font-black text-sky-500">{g.label}</span>
                  <span className="text-xl text-gray-400 font-bold">{g.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Progress dots */}
          {!completed && (
            <ProgressDots current={qIndex} total={total} color="sky" />
          )}

          {/* Game area */}
          <div className="flex-1 flex items-center justify-center p-6">
            {completed ? (
              <CompletionScreen
                score={score}
                total={total}
                onRetry={() => startGame(game)}
              />
            ) : game === "kazoe" ? (
              <KazoeGame
                key={`kazoe-${qIndex}`}
                question={questions[qIndex] as (typeof kazoePool)[number]}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
                shakeId={shakeId}
              />
            ) : game === "tashizan" ? (
              <TashizanGame
                key={`tashi-${qIndex}`}
                question={questions[qIndex] as (typeof tashizanPool)[number]}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
                shakeId={shakeId}
              />
            ) : (
              <OokiiGame
                key={`ookii-${qIndex}`}
                question={questions[qIndex] as (typeof ookiiPool)[number]}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
                shakeId={shakeId}
              />
            )}
          </div>
        </>
      )}

      <CharacterPopup show={showPopup} onClose={handlePopupClose} />
      <StickerAward
        sticker={awardedSticker}
        onClose={() => {
          setAwardedSticker(null);
          setCompleted(true);
        }}
      />
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
  question: (typeof kazoePool)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const emojis = Array(question.count).fill(question.emoji);
  const [shuffled, setShuffled] = useState<number[]>([]);
  useEffect(() => {
    setShuffled(shuffleArray(question.options));
    speakText("いくつ あるかな？");
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

// --- Tashizan Game (段階表示) ---
function TashizanGame({
  question,
  onCorrect,
  onWrong,
  shakeId,
}: {
  question: (typeof tashizanPool)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const answer = question.a + question.b;
  const [shuffled, setShuffled] = useState<number[]>([]);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setShuffled(shuffleArray(question.options));
    setStep(0);
    speakText("あわせて いくつ？");

    const t1 = setTimeout(() => setStep(1), 800);
    const t2 = setTimeout(() => setStep(2), 1500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [question]);

  if (shuffled.length === 0) return null;

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl">
      <p className="text-3xl text-gray-500 font-bold">あわせて いくつ？</p>

      {/* Visual representation */}
      <div className="flex items-center gap-4 bg-white rounded-3xl p-6 shadow-lg animate-fade-in-up">
        <div className="flex flex-wrap gap-1 justify-center max-w-[160px]">
          {Array(question.a)
            .fill(question.emoji)
            .map((e, i) => (
              <span key={`a${i}`} className="text-6xl animate-pop" style={{ animationDelay: `${i * 0.08}s` }}>
                {e}
              </span>
            ))}
        </div>
        <span className="text-6xl font-black text-sky-500">+</span>
        <div className="flex flex-wrap gap-1 justify-center max-w-[160px]">
          {Array(question.b)
            .fill(question.emoji)
            .map((e, i) => (
              <span key={`b${i}`} className="text-6xl animate-pop" style={{ animationDelay: `${(question.a + i) * 0.08}s` }}>
                {e}
              </span>
            ))}
        </div>
        <span className="text-6xl font-black text-sky-500">=</span>
        <span className="text-6xl font-black text-sky-400">？</span>
      </div>

      {/* Number formula - step 1 */}
      <div
        className={`text-6xl font-black text-gray-700 transition-all duration-500 ${
          step >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {question.a} + {question.b} = ？
      </div>

      {/* Options - step 2 */}
      <div
        className={`grid grid-cols-3 gap-4 w-full transition-all duration-500 ${
          step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
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
  question: (typeof ookiiPool)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const answer = question.left > question.right ? "left" : "right";

  useEffect(() => {
    speakText("おおきいほうを えらんでね！");
  }, [question]);

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
    speakText(
      score === total
        ? "すごーい！ぜんもん せいかい！"
        : `${score}もん せいかい！がんばったね！`
    );
  }, [score, total]);

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
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex gap-4">
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
        <Link
          href="/stickers"
          className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-2xl font-black py-3 px-8 rounded-full shadow-lg active:scale-95 transition-transform flex items-center gap-2"
        >
          {"\u2B50"} シールちょうを みる
        </Link>
      </div>
    </div>
  );
}
