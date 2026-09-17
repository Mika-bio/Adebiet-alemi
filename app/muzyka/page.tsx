"use client";

import { Music, Info } from "lucide-react";
import { TRACKS } from "@/lib/data";

export default function MuzykaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <Music className="h-4 w-4" />
          Әдеби атмосфера
        </p>
        <h1 className="section-title">Музыка әдеби</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Оқу мен поэзияға арналған тыныш әуендер. Төмендегі плеер арқылы
          тыңдаңыз.
        </p>
      </div>

      <div className="mb-6 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/10 p-4 text-sm text-burgundy/80">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
        <p>
          Демода royalty-free үлгі тректер (SoundHelix) қолданылған. Өндірістік
          нұсқада қазақ халық әуендері мен лицензияланған музыка қосылады.
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
                <h3 className="font-serif text-lg font-bold text-burgundy">
                  {track.title}
                </h3>
                <p className="text-sm text-burgundy/60">{track.artist}</p>
                <p className="mt-1 text-sm text-burgundy/70">
                  {track.description}
                </p>
                <p className="mt-1 text-xs text-burgundy/40">{track.duration}</p>
              </div>
            </div>
            <audio
              controls
              preload="none"
              className="w-full accent-burgundy"
              src={track.audioUrl}
            >
              Браузеріңіз audio элементін қолдамайды.
            </audio>
          </article>
        ))}
      </div>
    </div>
  );
}
