"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Music,
  Info,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ListMusic,
} from "lucide-react";
import { TRACKS } from "@/lib/data";

export default function MuzykaPage() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState("");
  const track = TRACKS[index];

  const playIndex = useCallback((i: number) => {
    const next = ((i % TRACKS.length) + TRACKS.length) % TRACKS.length;
    setIndex(next);
    setError("");
    setPlaying(true);
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.src = TRACKS[index].audioUrl;
    el.load();
    if (playing) {
      el.play().catch(() => {
        setError("Аудио жүктелмеді — келесі трекке өтуге болады.");
        setPlaying(false);
      });
    }
  }, [index]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.play().catch(() => {
        setError("Аудио ойнатылмады.");
        setPlaying(false);
      });
    } else {
      el.pause();
    }
  }, [playing]);

  const onEnded = () => {
    playIndex(index + 1);
  };

  const toggle = () => {
    setError("");
    setPlaying((p) => !p);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold">
          <Music className="h-4 w-4" />
          Лиро-эпикалық мұра
        </p>
        <h1 className="section-title">Қазақ жыр-терме-күй</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Терме мен күй кезегімен ойнатылады. Кезек тізімінен кез келген
          тректі таңдаңыз.
        </p>
      </div>

      <div className="mb-6 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-burgundy/80">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <p>
          Мұнда терме, күй және жыр-сарын үлгілері берілген. Плеер тректерді
          кезегімен ойнатады (YouTube емес — HTML аудио).
        </p>
      </div>

      {/* Now playing / sequential controls */}
      <div className="card mb-8 !p-5 shadow-soft">
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold">
          <ListMusic className="h-4 w-4" />
          Қазір ойнатылуда
        </div>
        <h2 className="font-serif text-xl font-bold text-burgundy">
          {track.title}
        </h2>
        <p className="text-sm text-burgundy/60">
          {track.artist} · {track.genre} · {track.duration}
        </p>
        <p className="mt-2 text-sm text-burgundy/70">{track.description}</p>

        <audio
          ref={audioRef}
          preload="metadata"
          onEnded={onEnded}
          onError={() => {
            setError("Аудио көзі қолжетімсіз.");
            setPlaying(false);
          }}
          className="mt-4 w-full"
        />

        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            className="btn-secondary !px-4"
            onClick={() => playIndex(index - 1)}
            aria-label="Алдыңғы"
          >
            <SkipBack className="h-4 w-4" />
            Алдыңғы
          </button>
          <button
            type="button"
            className="btn-primary !px-6"
            onClick={toggle}
            aria-label={playing ? "Тоқтату" : "Ойнату"}
          >
            {playing ? (
              <>
                <Pause className="h-4 w-4" />
                Тоқтату
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Ойнату
              </>
            )}
          </button>
          <button
            type="button"
            className="btn-secondary !px-4"
            onClick={() => playIndex(index + 1)}
            aria-label="Келесі"
          >
            Келесі
            <SkipForward className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-3 text-center text-xs text-burgundy/50">
          {index + 1} / {TRACKS.length} · кезегімен ойнату қосулы
        </p>
        {error && (
          <p className="mt-2 text-center text-sm text-red-600">{error}</p>
        )}
      </div>

      <div className="space-y-3">
        {TRACKS.map((t, i) => (
          <article
            key={t.id}
            className={`card cursor-pointer transition ${
              i === index ? "ring-2 ring-gold" : ""
            }`}
            onClick={() => playIndex(i)}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-serif text-xl font-bold ${
                  i === index
                    ? "bg-gold text-burgundy"
                    : "bg-burgundy text-gold"
                }`}
              >
                {i === index && playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  i + 1
                )}
              </div>
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold">
                  {t.genre}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-burgundy">
                  {t.title}
                </h3>
                <p className="text-sm text-burgundy/60">{t.artist}</p>
                <p className="mt-1 text-sm text-burgundy/70">{t.description}</p>
                <p className="mt-1 text-xs text-burgundy/40">{t.duration}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
