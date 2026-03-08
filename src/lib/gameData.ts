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
  "/images/char-23.jpg",
  "/images/char-24.jpg",
  "/images/char-25.jpg",
  "/images/char-26.png",
  "/images/char-27.png",
  "/images/char-28.png",
  "/images/char-29.png",
  "/images/char-30.png",
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

// Shuffle helper
export function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Pick N random items from array
export function pickRandom<T>(arr: T[], n: number): T[] {
  return shuffleArray(arr).slice(0, n);
}

// =============================================
// こくご
// =============================================

// --- もじをえらぼう (全問題プール) ---
export const mojiPool = [
  // どうぶつ
  { emoji: "\u{1F431}", answer: "ねこ", options: ["ねこ", "いぬ", "うさぎ"] },
  { emoji: "\u{1F436}", answer: "いぬ", options: ["ねこ", "いぬ", "さる"] },
  { emoji: "\u{1F407}", answer: "うさぎ", options: ["ねずみ", "うさぎ", "りす"] },
  { emoji: "\u{1F434}", answer: "うま", options: ["うま", "うし", "しか"] },
  { emoji: "\u{1F42D}", answer: "ねずみ", options: ["ねずみ", "りす", "うさぎ"] },
  { emoji: "\u{1F437}", answer: "ぶた", options: ["ぶた", "うし", "ひつじ"] },
  { emoji: "\u{1F428}", answer: "こあら", options: ["こあら", "ぱんだ", "くま"] },
  { emoji: "\u{1F43B}", answer: "くま", options: ["くま", "たぬき", "きつね"] },
  { emoji: "\u{1F438}", answer: "かえる", options: ["かえる", "かめ", "へび"] },
  { emoji: "\u{1F422}", answer: "かめ", options: ["かめ", "かえる", "わに"] },
  { emoji: "\u{1F412}", answer: "さる", options: ["さる", "ごりら", "いぬ"] },
  { emoji: "\u{1F418}", answer: "ぞう", options: ["ぞう", "きりん", "かば"] },
  { emoji: "\u{1F427}", answer: "ぺんぎん", options: ["ぺんぎん", "あひる", "とり"] },
  { emoji: "\u{1F424}", answer: "ひよこ", options: ["ひよこ", "にわとり", "すずめ"] },
  { emoji: "\u{1F40C}", answer: "かたつむり", options: ["かたつむり", "むし", "あり"] },
  { emoji: "\u{1F41F}", answer: "さかな", options: ["さかな", "とり", "かめ"] },
  { emoji: "\u{1F419}", answer: "たこ", options: ["たこ", "いか", "えび"] },
  { emoji: "\u{1F42C}", answer: "いるか", options: ["いるか", "くじら", "さめ"] },
  { emoji: "\u{1F433}", answer: "くじら", options: ["くじら", "いるか", "さめ"] },
  { emoji: "\u{1F98B}", answer: "ちょうちょ", options: ["ちょうちょ", "はち", "とんぼ"] },
  // くだもの・たべもの
  { emoji: "\u{1F34E}", answer: "りんご", options: ["りんご", "みかん", "ばなな"] },
  { emoji: "\u{1F34C}", answer: "ばなな", options: ["もも", "ばなな", "りんご"] },
  { emoji: "\u{1F353}", answer: "いちご", options: ["いちご", "すいか", "ぶどう"] },
  { emoji: "\u{1F34A}", answer: "みかん", options: ["みかん", "れもん", "りんご"] },
  { emoji: "\u{1F347}", answer: "ぶどう", options: ["ぶどう", "いちご", "もも"] },
  { emoji: "\u{1F351}", answer: "もも", options: ["もも", "りんご", "なし"] },
  { emoji: "\u{1F349}", answer: "すいか", options: ["すいか", "めろん", "かぼちゃ"] },
  { emoji: "\u{1F348}", answer: "めろん", options: ["めろん", "すいか", "きゅうり"] },
  { emoji: "\u{1F352}", answer: "さくらんぼ", options: ["さくらんぼ", "いちご", "ぶどう"] },
  { emoji: "\u{1F95D}", answer: "きうい", options: ["きうい", "みかん", "れもん"] },
  { emoji: "\u{1F346}", answer: "なす", options: ["なす", "きゅうり", "にんじん"] },
  { emoji: "\u{1F955}", answer: "にんじん", options: ["にんじん", "だいこん", "ごぼう"] },
  { emoji: "\u{1F33D}", answer: "とうもろこし", options: ["とうもろこし", "ばなな", "きゅうり"] },
  { emoji: "\u{1F344}", answer: "きのこ", options: ["きのこ", "たけのこ", "くり"] },
  { emoji: "\u{1F950}", answer: "ぱん", options: ["ぱん", "けーき", "くっきー"] },
  { emoji: "\u{1F354}", answer: "はんばーがー", options: ["はんばーがー", "ぱん", "おにぎり"] },
  { emoji: "\u{1F359}", answer: "おにぎり", options: ["おにぎり", "すし", "おもち"] },
  { emoji: "\u{1F363}", answer: "すし", options: ["すし", "おにぎり", "おべんとう"] },
  { emoji: "\u{1F366}", answer: "あいす", options: ["あいす", "けーき", "ぷりん"] },
  { emoji: "\u{1F370}", answer: "けーき", options: ["けーき", "あいす", "ぷりん"] },
  // しぜん・そのた
  { emoji: "\u{1F338}", answer: "さくら", options: ["さくら", "ばら", "たんぽぽ"] },
  { emoji: "\u{1F33B}", answer: "ひまわり", options: ["ひまわり", "たんぽぽ", "さくら"] },
  { emoji: "\u{1F337}", answer: "ちゅーりっぷ", options: ["ちゅーりっぷ", "ばら", "ひまわり"] },
  { emoji: "\u2B50", answer: "ほし", options: ["つき", "ほし", "くも"] },
  { emoji: "\u{1F319}", answer: "つき", options: ["つき", "ほし", "たいよう"] },
  { emoji: "\u2600\uFE0F", answer: "たいよう", options: ["たいよう", "ほし", "つき"] },
  { emoji: "\u{1F308}", answer: "にじ", options: ["にじ", "くも", "あめ"] },
  { emoji: "\u2601\uFE0F", answer: "くも", options: ["くも", "ゆき", "あめ"] },
  { emoji: "\u2614", answer: "あめ", options: ["あめ", "ゆき", "くも"] },
  { emoji: "\u2744\uFE0F", answer: "ゆき", options: ["ゆき", "あめ", "こおり"] },
  { emoji: "\u{1F30A}", answer: "うみ", options: ["うみ", "かわ", "みずうみ"] },
  { emoji: "\u{1F3D4}\uFE0F", answer: "やま", options: ["やま", "もり", "おか"] },
  { emoji: "\u{1F525}", answer: "ひ", options: ["ひ", "みず", "かぜ"] },
  { emoji: "\u{1F697}", answer: "くるま", options: ["くるま", "でんしゃ", "ばす"] },
  { emoji: "\u{1F682}", answer: "でんしゃ", options: ["でんしゃ", "くるま", "ひこうき"] },
  { emoji: "\u2708\uFE0F", answer: "ひこうき", options: ["ひこうき", "でんしゃ", "ふね"] },
  { emoji: "\u{1F6A2}", answer: "ふね", options: ["ふね", "ひこうき", "くるま"] },
  { emoji: "\u{1F3E0}", answer: "いえ", options: ["いえ", "しろ", "がっこう"] },
  { emoji: "\u{1F381}", answer: "ぷれぜんと", options: ["ぷれぜんと", "はこ", "ふくろ"] },
  { emoji: "\u{1F514}", answer: "べる", options: ["べる", "たいこ", "ふえ"] },
];

// --- あいうえおタッチ (全問題プール) ---
export const aiueoPool = [
  { char: "あ", options: [{ emoji: "\u{1F36C}", word: "あめ", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }, { emoji: "\u{1F436}", word: "いぬ", correct: false }] },
  { char: "あ", options: [{ emoji: "\u{1F41C}", word: "あり", correct: true }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u{1F41F}", word: "さかな", correct: false }, { emoji: "\u{1F697}", word: "くるま", correct: false }] },
  { char: "い", options: [{ emoji: "\u{1F436}", word: "いぬ", correct: true }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u2B50", word: "ほし", correct: false }] },
  { char: "い", options: [{ emoji: "\u{1F3E0}", word: "いえ", correct: true }, { emoji: "\u{1F353}", word: "いちご", correct: false }, { emoji: "\u{1F407}", word: "うさぎ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }] },
  { char: "う", options: [{ emoji: "\u{1F40E}", word: "うま", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }] },
  { char: "う", options: [{ emoji: "\u{1F407}", word: "うさぎ", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F419}", word: "たこ", correct: false }, { emoji: "\u{1F33B}", word: "ひまわり", correct: false }] },
  { char: "え", options: [{ emoji: "\u{1F4DA}", word: "えほん", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F697}", word: "くるま", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }] },
  { char: "お", options: [{ emoji: "\u{1F47B}", word: "おばけ", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }] },
  { char: "か", options: [{ emoji: "\u2602\uFE0F", word: "かさ", correct: true }, { emoji: "\u{1F41F}", word: "さかな", correct: false }, { emoji: "\u2B50", word: "ほし", correct: false }, { emoji: "\u{1F436}", word: "いぬ", correct: false }] },
  { char: "か", options: [{ emoji: "\u{1F422}", word: "かめ", correct: true }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F419}", word: "たこ", correct: false }] },
  { char: "き", options: [{ emoji: "\u{1F340}", word: "きのこ", correct: true }, { emoji: "\u{1F407}", word: "うさぎ", correct: false }, { emoji: "\u{1F33B}", word: "ひまわり", correct: false }, { emoji: "\u{1F41F}", word: "さかな", correct: false }] },
  { char: "く", options: [{ emoji: "\u{1F697}", word: "くるま", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }] },
  { char: "く", options: [{ emoji: "\u{1F43B}", word: "くま", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u{1F419}", word: "たこ", correct: false }] },
  { char: "け", options: [{ emoji: "\u{1F370}", word: "けーき", correct: true }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }] },
  { char: "さ", options: [{ emoji: "\u{1F41F}", word: "さかな", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u2B50", word: "ほし", correct: false }] },
  { char: "さ", options: [{ emoji: "\u{1F338}", word: "さくら", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F419}", word: "たこ", correct: false }] },
  { char: "す", options: [{ emoji: "\u{1F349}", word: "すいか", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u{1F33B}", word: "ひまわり", correct: false }] },
  { char: "た", options: [{ emoji: "\u{1F419}", word: "たこ", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u{1F407}", word: "うさぎ", correct: false }] },
  { char: "た", options: [{ emoji: "\u2600\uFE0F", word: "たいよう", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u2B50", word: "ほし", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }] },
  { char: "つ", options: [{ emoji: "\u{1F319}", word: "つき", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }] },
  { char: "な", options: [{ emoji: "\u{1F346}", word: "なす", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u{1F41F}", word: "さかな", correct: false }] },
  { char: "に", options: [{ emoji: "\u{1F308}", word: "にじ", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F697}", word: "くるま", correct: false }] },
  { char: "ね", options: [{ emoji: "\u{1F431}", word: "ねこ", correct: true }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F407}", word: "うさぎ", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }] },
  { char: "は", options: [{ emoji: "\u{1F33B}", word: "はな", correct: true }, { emoji: "\u{1F41F}", word: "さかな", correct: false }, { emoji: "\u{1F697}", word: "くるま", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }] },
  { char: "ひ", options: [{ emoji: "\u{1F33B}", word: "ひまわり", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F436}", word: "いぬ", correct: false }] },
  { char: "ほ", options: [{ emoji: "\u2B50", word: "ほし", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F338}", word: "さくら", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }] },
  { char: "み", options: [{ emoji: "\u{1F34A}", word: "みかん", correct: true }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F353}", word: "いちご", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }] },
  { char: "む", options: [{ emoji: "\u{1F41B}", word: "むし", correct: true }, { emoji: "\u{1F431}", word: "ねこ", correct: false }, { emoji: "\u{1F436}", word: "いぬ", correct: false }, { emoji: "\u{1F41F}", word: "さかな", correct: false }] },
  { char: "め", options: [{ emoji: "\u{1F348}", word: "めろん", correct: true }, { emoji: "\u{1F349}", word: "すいか", correct: false }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }] },
  { char: "も", options: [{ emoji: "\u{1F351}", word: "もも", correct: true }, { emoji: "\u{1F34E}", word: "りんご", correct: false }, { emoji: "\u{1F353}", word: "いちご", correct: false }, { emoji: "\u{1F347}", word: "ぶどう", correct: false }] },
  { char: "り", options: [{ emoji: "\u{1F34E}", word: "りんご", correct: true }, { emoji: "\u{1F34C}", word: "ばなな", correct: false }, { emoji: "\u{1F353}", word: "いちご", correct: false }, { emoji: "\u{1F34A}", word: "みかん", correct: false }] },
];

// --- ことばづくり (全問題プール) ---
export const kotobaPool = [
  { emoji: "\u{1F431}", word: "ねこ", hint: "にゃーん" },
  { emoji: "\u{1F436}", word: "いぬ", hint: "わんわん" },
  { emoji: "\u{1F407}", word: "うさぎ", hint: "ぴょんぴょん" },
  { emoji: "\u2B50", word: "ほし", hint: "きらきら" },
  { emoji: "\u{1F34E}", word: "りんご", hint: "あかい くだもの" },
  { emoji: "\u{1F338}", word: "さくら", hint: "はるの はな" },
  { emoji: "\u{1F41F}", word: "さかな", hint: "うみを およぐ" },
  { emoji: "\u{1F34C}", word: "ばなな", hint: "きいろい くだもの" },
  { emoji: "\u{1F422}", word: "かめ", hint: "こうらがある" },
  { emoji: "\u{1F438}", word: "かえる", hint: "けろけろ" },
  { emoji: "\u{1F43B}", word: "くま", hint: "もりにいる" },
  { emoji: "\u{1F319}", word: "つき", hint: "よるの そら" },
  { emoji: "\u2600\uFE0F", word: "たいよう", hint: "あかるくて あったかい" },
  { emoji: "\u{1F308}", word: "にじ", hint: "あめのあとに でる" },
  { emoji: "\u{1F353}", word: "いちご", hint: "あかい くだもの" },
  { emoji: "\u{1F34A}", word: "みかん", hint: "おれんじいろ" },
  { emoji: "\u{1F349}", word: "すいか", hint: "おおきくて まるい" },
  { emoji: "\u{1F697}", word: "くるま", hint: "ぶーぶー" },
  { emoji: "\u{1F419}", word: "たこ", hint: "あしが 8ほん" },
  { emoji: "\u{1F33B}", word: "ひまわり", hint: "おおきな きいろい はな" },
  { emoji: "\u{1F427}", word: "ぺんぎん", hint: "よちよち あるく" },
  { emoji: "\u{1F418}", word: "ぞう", hint: "おはなが ながい" },
  { emoji: "\u{1F437}", word: "ぶた", hint: "ぶーぶー" },
  { emoji: "\u{1F412}", word: "さる", hint: "きのぼり じょうず" },
  { emoji: "\u{1F40C}", word: "かたつむり", hint: "ゆっくり すすむ" },
];

// =============================================
// さんすう
// =============================================

// --- かぞえよう (全問題プール) ---
const emojis = [
  "\u{1F34E}", "\u2B50", "\u{1F338}", "\u{1F431}", "\u{1F34C}",
  "\u{1F41F}", "\u{1F353}", "\u{1F33B}", "\u{1F436}", "\u{1F407}",
  "\u{1F352}", "\u{1F34A}", "\u{1F98B}", "\u{1F427}", "\u{1F438}",
];

function makeKazoePool() {
  const pool: { emoji: string; count: number; options: number[] }[] = [];
  for (let count = 1; count <= 9; count++) {
    for (const emoji of emojis) {
      const options = [count];
      while (options.length < 4) {
        const offset = Math.floor(Math.random() * 3) + 1;
        const wrong = Math.random() > 0.5 ? count + offset : Math.max(1, count - offset);
        if (!options.includes(wrong)) options.push(wrong);
      }
      pool.push({ emoji, count, options });
    }
  }
  return pool;
}
export const kazoePool = makeKazoePool();

// --- たしざん (全問題プール) ---
function makeTashizanPool() {
  const pool: { a: number; b: number; emoji: string; options: number[] }[] = [];
  for (let a = 1; a <= 5; a++) {
    for (let b = 1; b <= 5; b++) {
      const answer = a + b;
      const emoji = emojis[(a + b) % emojis.length];
      const options = [answer];
      while (options.length < 3) {
        const offset = Math.floor(Math.random() * 2) + 1;
        const wrong = Math.random() > 0.5 ? answer + offset : Math.max(1, answer - offset);
        if (!options.includes(wrong)) options.push(wrong);
      }
      pool.push({ a, b, emoji, options });
    }
  }
  return pool;
}
export const tashizanPool = makeTashizanPool();

// --- どっちがおおきい (全問題プール) ---
function makeOokiiPool() {
  const pool: { left: number; right: number }[] = [];
  for (let l = 1; l <= 9; l++) {
    for (let r = 1; r <= 9; r++) {
      if (l !== r) pool.push({ left: l, right: r });
    }
  }
  return pool;
}
export const ookiiPool = makeOokiiPool();

// --- もじをかこう (全問題プール) ---
export const kakikataPool = [
  // あ行
  { char: "あ" }, { char: "い" }, { char: "う" }, { char: "え" }, { char: "お" },
  // か行
  { char: "か" }, { char: "き" }, { char: "く" }, { char: "け" }, { char: "こ" },
  // さ行
  { char: "さ" }, { char: "し" }, { char: "す" }, { char: "せ" }, { char: "そ" },
  // た行
  { char: "た" }, { char: "ち" }, { char: "つ" }, { char: "て" }, { char: "と" },
  // な行
  { char: "な" }, { char: "に" }, { char: "ぬ" }, { char: "ね" }, { char: "の" },
  // は行
  { char: "は" }, { char: "ひ" }, { char: "ふ" }, { char: "へ" }, { char: "ほ" },
  // ま行
  { char: "ま" }, { char: "み" }, { char: "む" }, { char: "め" }, { char: "も" },
  // や行
  { char: "や" }, { char: "ゆ" }, { char: "よ" },
  // ら行
  { char: "ら" }, { char: "り" }, { char: "る" }, { char: "れ" }, { char: "ろ" },
  // わ行
  { char: "わ" }, { char: "を" }, { char: "ん" },
];

// =============================================
// 出題数の設定
// =============================================
export const QUESTIONS_PER_GAME = {
  moji: 8,
  aiueo: 8,
  kotoba: 6,
  kakikata: 5,
  kazoe: 8,
  tashizan: 8,
  ookii: 8,
};
