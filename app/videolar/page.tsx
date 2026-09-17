"use client";

import { useState } from "react";
import { PlayCircle, Clock, X, Link2, ExternalLink } from "lucide-react";
import { VIDEOS, youtubeUrl } from "@/lib/data";

export default function VideolarPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeVideo = VIDEOS.find((v) => v.id === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <PlayCircle className="h-4 w-4" />
          Қазақ тарихи кино
        </p>
        <h1 className="section-title">Тарихи фильмдер</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Көшпенділер, Абылай, Кенесары/Аманат, Амангелді, Қыз Жібек, соғыс
          қаһармандары және басқа тек жұмыс істейтін YouTube бейнелері.
          Әр картада сілтеме көрінеді.
        </p>
        <p className="mt-2 text-sm font-medium text-burgundy/50">
          Барлығы: {VIDEOS.length} бейне
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((video) => {
          const url = youtubeUrl(video.youtubeId);
          return (
            <div key={video.id} className="card group flex flex-col text-left">
              <button
                type="button"
                onClick={() => setActive(video.id)}
                className="w-full text-left"
              >
                <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-burgundy">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="h-full w-full object-cover opacity-80 transition group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/80 text-gold shadow-lg backdrop-blur transition group-hover:scale-110">
                      <PlayCircle className="h-8 w-8" />
                    </span>
                  </div>
                  <span className="absolute bottom-2 right-2 rounded bg-burgundy/80 px-2 py-0.5 text-xs text-cream">
                    {video.duration}
                  </span>
                </div>
              </button>
              <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold-dark">
                {video.category}
              </span>
              <h3 className="mt-2 font-serif text-lg font-bold text-burgundy">
                {video.title}
              </h3>
              <p className="mt-1 flex-1 text-sm text-burgundy/65">
                {video.description}
              </p>
              <p className="mt-2 flex items-center gap-1 text-xs text-burgundy/40">
                <Clock className="h-3 w-3" />
                {video.duration}
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-start gap-1.5 break-all rounded-lg border border-burgundy/10 bg-cream px-2.5 py-2 text-xs font-medium text-burgundy/80 transition hover:border-gold hover:text-gold-dark"
                onClick={(e) => e.stopPropagation()}
              >
                <Link2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  Сілтеме: {url}
                  <ExternalLink className="ml-1 inline h-3 w-3" />
                </span>
              </a>
              <button
                type="button"
                onClick={() => setActive(video.id)}
                className="btn-secondary mt-3 w-full justify-center !py-2 text-sm"
              >
                <PlayCircle className="h-4 w-4" />
                Көру
              </button>
            </div>
          );
        })}
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-900/80 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-cream shadow-book"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-burgundy/10 px-4 py-3">
              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold text-burgundy line-clamp-1">
                  {activeVideo.title}
                </h3>
                <a
                  href={youtubeUrl(activeVideo.youtubeId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 block truncate text-xs text-gold-dark hover:underline"
                >
                  {youtubeUrl(activeVideo.youtubeId)}
                </a>
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
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
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
