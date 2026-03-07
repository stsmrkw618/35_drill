"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import CharacterPopup from "@/components/CharacterPopup";
import StickerAward from "@/components/StickerAward";
import ProgressDots from "@/components/ProgressDots";
import {
  mojiPool,
  aiueoPool,
  kotobaPool,
  pickRandom,
  shuffleArray,
  characterImages,
  QUESTIONS_PER_GAME,
} from "@/lib/gameData";
import { playCorrect, playWrong, playComplete, playBgm } from "@/lib/sounds";
import SpeakButton from "@/components/SpeakButton";
import { addSticker, type Sticker } from "@/lib/stickers";

type GameType = "moji" | "aiueo" | "kotoba";

const games: { id: GameType; label: string; icon: string; desc: string }[] = [
  { id: "moji", label: "もじを えらぼう", icon: "\u{1F4AC}", desc: "えを みて こたえよう" },
  { id: "aiueo", label: "あいうえお", icon: "\u{1F520}", desc: "はじまる もじ どーれ？" },
  { id: "kotoba", label: "ことば づくり", icon: "\u2728", desc: "もじを ならべよう" },
];

function generateQuestions(game: GameType) {
  switch (game) {
    case "moji":
      return pickRandom(mojiPool, QUESTIONS_PER_GAME.moji);
    case "aiueo":
      return pickRandom(aiueoPool, QUESTIONS_PER_GAME.aiueo);
    case "kotoba":
      return pickRandom(kotobaPool, QUESTIONS_PER_GAME.kotoba);
  }
}

export default function KokugoPage() {
  const [game, setGame] = useState<GameType | null>(null);
  const [questions, setQuestions] = useState(() => generateQuestions("moji"));
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [placedChars, setPlacedChars] = useState<number[]>([]);
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
    setPlacedChars([]);
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
      setPlacedChars([]);
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
      <header className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-6 py-4 flex items-center gap-4 shadow-lg">
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
          {"\u{1F4D6}"} こくご
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
          <div className="flex flex-row gap-5 w-full max-w-3xl">
            {games.map((g, i) => (
              <button
                key={g.id}
                onClick={() => startGame(g.id)}
                className="flex-1 bg-white rounded-3xl p-6 shadow-lg active:scale-95 transition-transform flex flex-col items-center gap-3 border-4 border-pink-200 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-7xl w-24 h-24 flex items-center justify-center bg-pink-50 rounded-2xl">
                  {g.icon}
                </span>
                <span className="text-2xl font-black text-pink-500">{g.label}</span>
                <span className="text-lg text-gray-400 font-bold">{g.desc}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Progress dots */}
          {!completed && (
            <ProgressDots current={qIndex} total={total} color="pink" />
          )}

          {/* Game area */}
          <div className="flex-1 flex items-center justify-center p-6">
            {completed ? (
              <CompletionScreen score={score} total={total} onRetry={() => startGame(game)} />
            ) : game === "moji" ? (
              <MojiGame
                key={`moji-${qIndex}`}
                question={questions[qIndex] as (typeof mojiPool)[number]}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
                shakeId={shakeId}
              />
            ) : game === "aiueo" ? (
              <AiueoGame
                key={`aiueo-${qIndex}`}
                question={questions[qIndex] as (typeof aiueoPool)[number]}
                onCorrect={handleCorrect}
                onWrong={handleWrong}
                shakeId={shakeId}
              />
            ) : (
              <KotobaGame
                key={`kotoba-${qIndex}`}
                question={questions[qIndex] as (typeof kotobaPool)[number]}
                onCorrect={handleCorrect}
                placedChars={placedChars}
                setPlacedChars={setPlacedChars}
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

// --- Moji Game ---
function MojiGame({
  question,
  onCorrect,
  onWrong,
  shakeId,
}: {
  question: (typeof mojiPool)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const [shuffled, setShuffled] = useState<string[]>([]);
  useEffect(() => {
    setShuffled(shuffleArray(question.options));
  }, [question]);

  if (shuffled.length === 0) return null;

  return (
    <div className="flex items-center gap-10 w-full max-w-4xl">
      <div className="flex flex-col items-center gap-4 flex-shrink-0">
        <p className="text-3xl text-gray-500 font-bold flex items-center">
          なんの えかな？
          <SpeakButton text="なんの えかな？" />
        </p>
        <div className="text-[140px] leading-none animate-pop">{question.emoji}</div>
      </div>
      <div className="grid grid-cols-3 gap-4 flex-1">
        {shuffled.map((opt) => (
          <button
            key={opt}
            onClick={() =>
              opt === question.answer ? onCorrect() : onWrong(opt)
            }
            className={`bg-white rounded-2xl py-6 px-4 text-4xl font-black shadow-lg active:scale-95 transition-transform border-4 ${
              shakeId === opt ? "animate-shake border-red-300 bg-red-50" : "border-transparent"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Aiueo Game ---
function AiueoGame({
  question,
  onCorrect,
  onWrong,
  shakeId,
}: {
  question: (typeof aiueoPool)[number];
  onCorrect: () => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const [shuffled, setShuffled] = useState<typeof question.options>([]);
  useEffect(() => {
    setShuffled(shuffleArray(question.options));
  }, [question]);

  if (shuffled.length === 0) return null;

  return (
    <div className="flex items-center gap-10 w-full max-w-4xl">
      <div className="flex flex-col items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-1">
          <p className="text-3xl text-gray-500 font-bold">
            「{question.char}」から はじまる<br />ことば どーれだ？
          </p>
          <SpeakButton text={`${question.char}から はじまる ことば どーれだ？`} />
        </div>
        <div className="text-[120px] font-black text-pink-500 bg-white rounded-3xl w-44 h-44 flex items-center justify-center shadow-lg animate-pop">
          {question.char}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {shuffled.map((opt) => (
          <button
            key={opt.word}
            onClick={() =>
              opt.correct ? onCorrect() : onWrong(opt.word)
            }
            className={`bg-white rounded-2xl py-6 px-4 text-3xl font-bold shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-3 border-4 ${
              shakeId === opt.word ? "animate-shake border-red-300 bg-red-50" : "border-transparent"
            }`}
          >
            <span className="text-5xl">{opt.emoji}</span>
            <span>{opt.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// --- Kotoba Game ---
function KotobaGame({
  question,
  onCorrect,
  placedChars,
  setPlacedChars,
  onWrong,
  shakeId,
}: {
  question: (typeof kotobaPool)[number];
  onCorrect: () => void;
  placedChars: number[];
  setPlacedChars: (chars: number[]) => void;
  onWrong: (id: string) => void;
  shakeId: string | null;
}) {
  const [chars, setChars] = useState<{ char: string; origIndex: number }[]>([]);
  useEffect(() => {
    const arr = question.word.split("").map((c, i) => ({ char: c, origIndex: i }));
    setChars(shuffleArray(arr));
  }, [question]);

  const wordChars = question.word.split("");

  const handleTap = (origIndex: number) => {
    if (placedChars.includes(origIndex)) return;

    const nextExpected = wordChars[placedChars.length];
    const tappedChar = wordChars[origIndex];

    if (tappedChar === nextExpected) {
      const newPlaced = [...placedChars, origIndex];
      setPlacedChars(newPlaced);
      if (newPlaced.length === wordChars.length) {
        onCorrect();
      }
    } else {
      onWrong(`kotoba-${origIndex}`);
    }
  };

  if (chars.length === 0) return null;

  return (
    <div className="flex items-center gap-10 w-full max-w-4xl">
      <div className="flex flex-col items-center gap-4 flex-shrink-0">
        <p className="text-3xl text-gray-500 font-bold flex items-center">
          もじを ならべよう！
          <SpeakButton text="もじを ならべよう！" />
        </p>
        <span className="text-[100px]">{question.emoji}</span>
        <span className="text-2xl text-gray-400 font-bold">ひんと: {question.hint}</span>
      </div>

      <div className="flex flex-col items-center gap-6 flex-1">
        {/* Answer slots */}
        <div className="flex gap-3">
          {wordChars.map((_, i) => (
            <div
              key={i}
              className={`w-24 h-24 rounded-2xl border-4 border-dashed flex items-center justify-center text-5xl font-black transition-all ${
                placedChars.length > i
                  ? "border-pink-400 bg-pink-100 text-pink-600 animate-pop"
                  : "border-gray-300 bg-white"
              }`}
            >
              {placedChars.length > i ? wordChars[placedChars[i]] : ""}
            </div>
          ))}
        </div>

        {/* Character choices */}
        <div className="flex gap-3 flex-wrap justify-center">
          {chars.map((item) => (
            <button
              key={item.origIndex}
              onClick={() => handleTap(item.origIndex)}
              disabled={placedChars.includes(item.origIndex)}
              className={`w-24 h-24 rounded-2xl text-5xl font-black shadow-lg transition-all ${
                placedChars.includes(item.origIndex)
                  ? "bg-gray-200 text-gray-400 scale-90"
                  : "bg-white text-gray-700 active:scale-90 border-4 border-transparent"
              } ${shakeId === `kotoba-${item.origIndex}` ? "animate-shake border-red-300 bg-red-50" : ""}`}
            >
              {item.char}
            </button>
          ))}
        </div>
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
      <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-yellow-500">
        おわり！
      </div>
      <div className="text-4xl font-bold text-gray-600">
        {score}もん せいかい！
      </div>
      <div className="text-6xl">
        {score === total ? "\u{1F389}\u{1F389}\u{1F389}" : score >= total / 2 ? "\u{1F31F}\u{1F31F}" : "\u{1F4AA}"}
      </div>
      <div className="flex flex-col items-center gap-4 mt-4">
        <div className="flex gap-4">
          <button
            onClick={onRetry}
            className="bg-gradient-to-r from-pink-400 to-rose-500 text-white text-3xl font-black py-5 px-12 rounded-full shadow-lg active:scale-95 transition-transform"
          >
            もういっかい
          </button>
          <Link
            href="/"
            className="bg-white text-pink-500 text-3xl font-black py-5 px-12 rounded-full shadow-lg active:scale-95 transition-transform border-2 border-pink-300"
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
