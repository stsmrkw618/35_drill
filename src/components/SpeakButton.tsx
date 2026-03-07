"use client";

import { speakText } from "@/lib/sounds";

export default function SpeakButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => speakText(text)}
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/80 shadow active:scale-90 transition-transform border-2 border-gray-200 ml-2"
      aria-label="よみあげ"
    >
      <span className="text-2xl">{"\u{1F50A}"}</span>
    </button>
  );
}
