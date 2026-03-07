"use client";

let audioCtx: AudioContext | null = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

// 正解音: 明るい上昇音（ピンポン！）
export function playCorrect() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1音目
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(880, now);
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc1.connect(gain1).connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.15);

    // 2音目（高い）
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1320, now + 0.12);
    gain2.gain.setValueAtTime(0.01, now);
    gain2.gain.setValueAtTime(0.3, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    osc2.connect(gain2).connect(ctx.destination);
    osc2.start(now + 0.12);
    osc2.stop(now + 0.4);
  } catch {}
}

// 不正解音: やさしいブッ
export function playWrong() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.linearRampToValueAtTime(150, now + 0.2);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {}
}

// 完了音: ファンファーレ風
export function playComplete() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523, 659, 784, 1047];

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const t = now + i * 0.15;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + (i === 3 ? 0.6 : 0.2));
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + (i === 3 ? 0.6 : 0.2));
    });
  } catch {}
}

// BGM管理
let bgmAudio: HTMLAudioElement | null = null;

export function playBgm() {
  try {
    if (!bgmAudio) {
      bgmAudio = new Audio("/sounds/ほんわかぷっぷー.mp3");
      bgmAudio.loop = true;
      bgmAudio.volume = 0.25;
    }
    if (bgmAudio.paused) {
      bgmAudio.play().catch(() => {});
    }
  } catch {}
}

export function stopBgm() {
  if (bgmAudio && !bgmAudio.paused) {
    bgmAudio.pause();
    bgmAudio.currentTime = 0;
  }
}

// iOS Safari では最初のタッチイベントで AudioContext を resume する必要がある
export function resumeAudio() {
  try {
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  } catch {}
}
