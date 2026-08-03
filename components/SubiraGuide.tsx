"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const GREETINGS = [
  {
    text: "Hey! I'm Subira 👋 Ask me about any Bitcoin term.",
    audio: "/audio/subira-greeting-en.mp3",
  },
  {
    text: "Habari! Naitwa Subira 👋 Niulize kuhusu neno lolote la Bitcoin.",
    audio: "/audio/subira-greeting-sw.mp3",
  },
];

function SpeakerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 9v6h4l5 5V4L8 9H4z"
        fill="currentColor"
      />
      <path
        d="M16.5 8.5a5 5 0 0 1 0 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M18.8 6.2a8.5 8.5 0 0 1 0 11.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export default function SubiraGuide() {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [query, setQuery] = useState("");

  const handleAsk = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/glossary?search=${encodeURIComponent(trimmed)}`);
    setQuery("");
    setShowBubble(false);
  };

  const playVoice = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.src = GREETINGS[greetingIndex].audio;
    audio.play().catch(() => {
      // Ignore playback errors (e.g. clip not uploaded yet, or blocked by the browser).
    });
  };

  useEffect(() => {
    const popTimer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(popTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const bubbleTimer = setTimeout(() => setShowBubble(true), 550);
    return () => clearTimeout(bubbleTimer);
  }, [visible]);

  useEffect(() => {
    if (!showBubble) return;
    const cycleTimer = setInterval(() => {
      setGreetingIndex(i => (i + 1) % GREETINGS.length);
    }, 3800);
    return () => clearInterval(cycleTimer);
  }, [showBubble]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {showBubble && (
        <div
          className="subira-bubble relative w-60 max-w-[calc(100vw-2.5rem)] rounded-2xl rounded-br-sm px-4 py-3 shadow-lg"
          style={{ background: "var(--brand-shell)", border: "1px solid #e8d9c8" }}
        >
          <button
            onClick={() => setShowBubble(false)}
            aria-label="Dismiss message"
            className="absolute top-1.5 right-2 text-xs font-bold leading-none"
            style={{ color: "#5a3e2b", opacity: 0.6 }}
          >
            ×
          </button>
          <div className="flex items-start gap-1.5 pr-3">
            <p
              key={greetingIndex}
              className="subira-greeting text-sm leading-snug"
              style={{ color: "var(--brand-ink)", fontFamily: "var(--font-manrope)" }}
            >
              {GREETINGS[greetingIndex].text}
            </p>
            <button
              type="button"
              onClick={playVoice}
              aria-label="Play voice greeting"
              className="hover-rust mt-0.5 shrink-0 rounded-full p-1 transition-colors"
              style={{ color: "var(--brand-rust)" }}
            >
              <SpeakerIcon />
            </button>
          </div>
          <audio ref={audioRef} className="hidden" />

          <form onSubmit={handleAsk} className="mt-2 flex items-center gap-1.5">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="e.g. mempool, UTXO..."
              className="w-full min-w-0 rounded-full border px-3 py-1.5 text-xs focus:outline-none"
              style={{
                borderColor: "#e8d9c8",
                background: "var(--brand-sand)",
                color: "var(--brand-ink)",
                fontFamily: "var(--font-manrope)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--brand-orange)")}
              onBlur={e => (e.currentTarget.style.borderColor = "#e8d9c8")}
            />
            <button
              type="submit"
              aria-label="Search"
              className="hover-rust-bg shrink-0 rounded-full px-3 py-1.5 text-xs font-bold text-white transition-colors"
              style={{ background: "var(--brand-orange)", fontFamily: "var(--font-manrope)" }}
            >
              Go
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setShowBubble(b => !b)}
        aria-label="Open Subira, your Bitcoin guide"
        className="subira-avatar h-16 w-16 overflow-hidden rounded-full shadow-lg sm:h-20 sm:w-20"
        style={{ border: "3px solid var(--brand-shell)", background: "var(--brand-shell)" }}
      >
        <img
          src="/subira-avatar.png"
          alt="Subira"
          className="h-full w-full object-cover"
          width={400}
          height={400}
        />
      </button>
    </div>
  );
}
