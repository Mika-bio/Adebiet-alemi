"use client";

import { useState } from "react";
import { PlayCircle, Clock, X } from "lucide-react";
import { VIDEOS } from "@/lib/data";

export default function VideolarPage() {
  const [active, setActive] = useState<string | null>(null);
  const activeVideo = VIDEOS.find((v) => v.id === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <PlayCircle className="h-4 w-4" />
          Бейнематериалдар
        </p>
        <h1 className="section-title">Видеолар</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Әдебиет сабақтарына арналған білім беру бейнелері. Картаны басып,
          YouTube арқылы көріңіз.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {VIDEOS.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video.id)}
            className="card group text-left"
          >
            <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-burgundy">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                alt={video.title}
                className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100 group-hover:scale-105"
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
            <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs font-medium text-gold-dark">
              {video.category}
            </span>
            <h3 className="mt-2 font-serif text-lg font-bold text-burgundy">
              {video.title}
            </h3>
            <p className="mt-1 text-sm text-burgundy/65">{video.description}</p>
            <p className="mt-2 flex items-center gap-1 text-xs text-burgundy/40">
              <Clock className="h-3 w-3" />
              {video.duration}
            </p>
          </button>
        ))}
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
            <div className="flex items-center justify-between border-b border-burgundy/10 px-4 py-3">
              <h3 className="font-serif text-lg font-bold text-burgundy line-clamp-1">
                {activeVideo.title}
              </h3>
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
