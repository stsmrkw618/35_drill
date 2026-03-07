"use client";

import { characterImages } from "./gameData";

export interface Sticker {
  id: string;
  imageUrl: string;
  game: string;
  earnedAt: number;
}

const STORAGE_KEY = "obenkyou-stickers";

export function getStickers(): Sticker[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addSticker(game: string): Sticker {
  const stickers = getStickers();
  const imageUrl =
    characterImages[Math.floor(Math.random() * characterImages.length)];
  const sticker: Sticker = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    imageUrl,
    game,
    earnedAt: Date.now(),
  };
  stickers.push(sticker);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers));
  } catch {}
  return sticker;
}

export function getStickerCount(): number {
  return getStickers().length;
}
