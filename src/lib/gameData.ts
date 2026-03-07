// Character images
export const characterImages = [
  "/images/char-01.png",
  "/images/char-02.png",
  "/images/char-03.png",
  "/images/char-04.png",
  "/images/char-05.png",
  "/images/char-06.png",
  "/images/char-07.png",
  "/images/char-08.png",
  "/images/char-09.jpg",
  "/images/char-10.jpg",
  "/images/char-11.jpg",
  "/images/char-12.jpg",
  "/images/char-13.jpg",
  "/images/char-14.jpg",
  "/images/char-15.jpg",
  "/images/char-16.png",
  "/images/char-17.png",
  "/images/char-18.png",
];

export const praiseMessages = [
  "すごーい！",
  "やったね！",
  "てんさい！",
  "かっこいい！",
  "すばらしい！",
  "さすが！",
  "ばっちり！",
  "はなまる！",
  "いいね！",
  "かんぺき！",
];

// --- こくご ---

export const mojiQuestions = [
  { emoji: "\u{1F34E}", answer: "りんご", options: ["りんご", "みかん", "ばなな"] },
  { emoji: "\u{1F431}", answer: "ねこ", options: ["いぬ", "ねこ", "うさぎ"] },
  { emoji: "\u{1F436}", answer: "いぬ", options: ["ねこ", "いぬ", "さる"] },
  { emoji: "\u{1F338}", answer: "さくら", options: ["さくら", "ばら", "たんぽぽ"] },
  { emoji: "\u{1F34C}", answer: "ばなな", options: ["もも", "ばなな", "りんご"] },
  { emoji: "\u2B50", answer: "ほし", options: ["つき", "ほし", "くも"] },
  { emoji: "\u{1F41F}", answer: "さかな", options: ["さかな", "とり", "かめ"] },
  { emoji: "\u2600\uFE0F", answer: "たいよう", options: ["たいよう", "ほし", "つき"] },
  { emoji: "\u{1F353}", answer: "いちご", options: ["いちご", "すいか", "ぶどう"] },
  { emoji: "\u{1F407}", answer: "うさぎ", options: ["ねずみ", "うさぎ", "りす"] },
];

export const aiueoQuestions = [
  {
    char: "あ",
    options: [
      { emoji: "\u{1F36C}", word: "あめ", correct: true },
      { emoji: "\u{1F431}", word: "ねこ", correct: false },
      { emoji: "\u{1F338}", word: "さくら", correct: false },
      { emoji: "\u{1F436}", word: "いぬ", correct: false },
    ],
  },
  {
    char: "い",
    options: [
      { emoji: "\u{1F34E}", word: "りんご", correct: false },
      { emoji: "\u{1F436}", word: "いぬ", correct: true },
      { emoji: "\u{1F431}", word: "ねこ", correct: false },
      { emoji: "\u2B50", word: "ほし", correct: false },
    ],
  },
  {
    char: "う",
    options: [
      { emoji: "\u{1F40E}", word: "うま", correct: true },
      { emoji: "\u{1F431}", word: "ねこ", correct: false },
      { emoji: "\u{1F34E}", word: "りんご", correct: false },
      { emoji: "\u{1F338}", word: "さくら", correct: false },
    ],
  },
  {
    char: "か",
    options: [
      { emoji: "\u2602\uFE0F", word: "かさ", correct: true },
      { emoji: "\u{1F41F}", word: "さかな", correct: false },
      { emoji: "\u2B50", word: "ほし", correct: false },
      { emoji: "\u{1F436}", word: "いぬ", correct: false },
    ],
  },
  {
    char: "さ",
    options: [
      { emoji: "\u{1F431}", word: "ねこ", correct: false },
      { emoji: "\u{1F41F}", word: "さかな", correct: true },
      { emoji: "\u{1F34C}", word: "ばなな", correct: false },
      { emoji: "\u2B50", word: "ほし", correct: false },
    ],
  },
  {
    char: "く",
    options: [
      { emoji: "\u{1F697}", word: "くるま", correct: true },
      { emoji: "\u{1F436}", word: "いぬ", correct: false },
      { emoji: "\u{1F34E}", word: "りんご", correct: false },
      { emoji: "\u{1F338}", word: "さくら", correct: false },
    ],
  },
  {
    char: "た",
    options: [
      { emoji: "\u{1F431}", word: "ねこ", correct: false },
      { emoji: "\u{1F419}", word: "たこ", correct: true },
      { emoji: "\u{1F34C}", word: "ばなな", correct: false },
      { emoji: "\u{1F407}", word: "うさぎ", correct: false },
    ],
  },
  {
    char: "は",
    options: [
      { emoji: "\u{1F33B}", word: "はな", correct: true },
      { emoji: "\u{1F41F}", word: "さかな", correct: false },
      { emoji: "\u{1F697}", word: "くるま", correct: false },
      { emoji: "\u{1F34E}", word: "りんご", correct: false },
    ],
  },
];

export const kotobaQuestions = [
  { emoji: "\u{1F431}", word: "ねこ", hint: "にゃーん" },
  { emoji: "\u2B50", word: "ほし", hint: "きらきら" },
  { emoji: "\u{1F34E}", word: "りんご", hint: "あかい くだもの" },
  { emoji: "\u{1F338}", word: "さくら", hint: "はるの はな" },
  { emoji: "\u{1F41F}", word: "さかな", hint: "うみを およぐ" },
  { emoji: "\u{1F34C}", word: "ばなな", hint: "きいろい くだもの" },
  { emoji: "\u{1F436}", word: "いぬ", hint: "わんわん" },
  { emoji: "\u{1F407}", word: "うさぎ", hint: "ぴょんぴょん" },
];

// --- さんすう ---

export const kazoeQuestions = [
  { emoji: "\u{1F34E}", count: 2, options: [1, 2, 3, 4] },
  { emoji: "\u2B50", count: 3, options: [2, 3, 4, 5] },
  { emoji: "\u{1F338}", count: 5, options: [3, 4, 5, 6] },
  { emoji: "\u{1F431}", count: 1, options: [1, 2, 3, 4] },
  { emoji: "\u{1F34C}", count: 4, options: [2, 3, 4, 5] },
  { emoji: "\u{1F41F}", count: 3, options: [1, 2, 3, 4] },
  { emoji: "\u{1F353}", count: 6, options: [4, 5, 6, 7] },
  { emoji: "\u{1F33B}", count: 2, options: [1, 2, 3, 4] },
];

export const tashizanQuestions = [
  { a: 1, b: 1, emoji: "\u{1F34E}", options: [1, 2, 3] },
  { a: 2, b: 1, emoji: "\u2B50", options: [2, 3, 4] },
  { a: 1, b: 2, emoji: "\u{1F338}", options: [2, 3, 4] },
  { a: 2, b: 2, emoji: "\u{1F34C}", options: [3, 4, 5] },
  { a: 3, b: 1, emoji: "\u{1F431}", options: [3, 4, 5] },
  { a: 2, b: 3, emoji: "\u{1F41F}", options: [4, 5, 6] },
  { a: 3, b: 2, emoji: "\u{1F34E}", options: [4, 5, 6] },
  { a: 4, b: 1, emoji: "\u2B50", options: [4, 5, 6] },
  { a: 1, b: 4, emoji: "\u{1F353}", options: [4, 5, 6] },
  { a: 3, b: 3, emoji: "\u{1F33B}", options: [5, 6, 7] },
];

export const ookiiQuestions = [
  { left: 3, right: 5 },
  { left: 7, right: 2 },
  { left: 1, right: 4 },
  { left: 6, right: 3 },
  { left: 2, right: 8 },
  { left: 9, right: 4 },
  { left: 1, right: 6 },
  { left: 5, right: 2 },
  { left: 4, right: 7 },
  { left: 8, right: 3 },
];

// Shuffle helper
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
