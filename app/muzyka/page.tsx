"use client";

import { useState } from "react";
import { Music, Info, X } from "lucide-react";
import { TRACKS } from "@/lib/data";

export default function MuzykaPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeTrack = TRACKS.find((t) => t.id === active);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <Music className="h-4 w-4" />
          Лиро-эпикалық мұра
        </p>
        <h1 className="section-title">Қазақ жыр-терме-күй</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Эпостық жырдар, терме, күй және Абай әндері. Қазақ лиро-эпикалық
          дәстүрін тыңдаңыз.
        </p>
      </div>

      <div className="mb-6 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-burgundy/80">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
        <p>
          Мұнда Қобыланды, Алпамыс жырлары, терме, Құрманғазы күйі және Абай
          әндері берілген. Картаны басып, бейнеарна арқылы тыңдаңыз.
        </p>
      </div>

      <div className="space-y-4">
        {TRACKS.map((track, i) => (
          <article key={track.id} className="card">
            <div className="mb-3 flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-burgundy font-serif text-xl font-bold text-gold">
                {i + 1}
              </div>
              <div className="min-w-0 flex-1">
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold-dark">
                  {track.genre}
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-burgundy">
                  {track.title}
                </h3>
                <p className="text-sm text-burgundy/60">{track.artist}</p>
                <p className="mt-1 text-sm text-burgundy/70">
                  {track.description}
                </p>
                <p className="mt-1 text-xs text-burgundy/40">{track.duration}</p>
              </div>
            </div>
            {track.youtubeId ? (
              <button
                type="button"
                onClick={() => setActive(track.id)}
                className="btn-primary w-full sm:w-auto"
              >
                <Music className="h-4 w-4" />
                Тыңдау
              </button>
            ) : track.audioUrl ? (
              <audio
                controls
                preload="none"
                className="w-full accent-burgundy"
                src={track.audioUrl}
              >
                Дыбыстық ойнатқыш қолдау таппады.
              </audio>
            ) : null}
          </article>
        ))}
      </div>

      {activeTrack?.youtubeId && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-900/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-cream shadow-book"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-burgundy/10 px-4 py-3">
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold text-burgundy line-clamp-1">
                  {activeTrack.title}
                </h3>
                <p className="text-xs text-burgundy/60">{activeTrack.genre}</p>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-lg p-2 text-burgundy hover:bg-burgundy/5"
                aria-label="Жабу"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${activeTrack.youtubeId}?autoplay=1`}
                title={activeTrack.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
