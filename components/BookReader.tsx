"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight, Maximize2, Minimize2, X } from "lucide-react";

function splitIntoPages(text: string, maxLen = 560): string[] {
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const pages: string[] = [];
  let current = "";

  for (const para of paragraphs) {
    const candidate = current ? `${current}\n\n${para}` : para;
    if (candidate.length <= maxLen) {
      current = candidate;
      continue;
    }
    if (current) pages.push(current);
    if (para.length <= maxLen) {
      current = para;
    } else {
      const words = para.split(/\s+/);
      let chunk = "";
      for (const w of words) {
        const next = chunk ? `${chunk} ${w}` : w;
        if (next.length > maxLen && chunk) {
          pages.push(chunk);
          chunk = w;
        } else {
          chunk = next;
        }
      }
      current = chunk;
    }
  }
  if (current) pages.push(current);
  return pages.length ? pages : [text];
}

export function BookReader({
  title,
  author,
  fullText,
}: {
  title: string;
  author: string;
  fullText: string;
}) {
  const pages = useMemo(() => splitIntoPages(fullText), [fullText]);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [flipping, setFlipping] = useState<"next" | "prev" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  const go = useCallback(
    (dir: "next" | "prev") => {
      setPage((p) => {
        const next = dir === "next" ? p + 1 : p - 1;
        if (next < 0 || next >= pages.length) return p;
        setFlipping(dir);
        window.setTimeout(() => setFlipping(null), 320);
        return next;
      });
    },
    [pages.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go("next");
      if (e.key === "ArrowLeft") go("prev");
      if (e.key === "Escape") {
        setOpen(false);
        setFullscreen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openReader = () => {
    setPage(0);
    setOpen(true);
  };

  return (
    <>
      <button type="button" onClick={openReader} className="btn-gold w-full sm:w-auto">
        <BookOpen className="h-4 w-4" />
        Кітапты оқу
      </button>

      {open && (
        <div
          className={`fixed inset-0 z-[70] flex items-center justify-center bg-burgundy-900/85 p-3 backdrop-blur-sm sm:p-6 ${
            fullscreen ? "!p-0" : ""
          }`}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} оқырманы`}
        >
          <div
            className={`relative flex w-full flex-col overflow-hidden bg-cream shadow-book ${
              fullscreen
                ? "h-full max-w-none rounded-none"
                : "max-h-[92vh] max-w-3xl rounded-2xl"
            }`}
          >
            <div className="flex items-center justify-between gap-3 border-b border-burgundy/10 bg-burgundy px-4 py-3 text-cream">
              <div className="min-w-0">
                <p className="truncate font-serif text-lg font-bold">{title}</p>
                <p className="truncate text-xs text-cream/70">{author}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFullscreen((v) => !v)}
                  className="rounded-lg p-2 hover:bg-cream/10"
                  aria-label={fullscreen ? "Кішірейту" : "Толық экран"}
                >
                  {fullscreen ? (
                    <Minimize2 className="h-5 w-5" />
                  ) : (
                    <Maximize2 className="h-5 w-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setFullscreen(false);
                  }}
                  className="rounded-lg p-2 hover:bg-cream/10"
                  aria-label="Жабу"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden bg-[linear-gradient(90deg,#f0e6d4_0%,#f7f1e8_8%,#f7f1e8_92%,#eadfca_100%)]">
              <div
                key={page}
                className={`book-page mx-auto flex h-full max-w-2xl flex-col px-6 py-8 sm:px-10 sm:py-10 ${
                  flipping === "next"
                    ? "animate-page-next"
                    : flipping === "prev"
                      ? "animate-page-prev"
                      : ""
                }`}
              >
                <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-wider text-burgundy/40">
                  <span>Бет</span>
                  <span className="font-serif normal-case tracking-normal text-burgundy/60">
                    {page + 1} / {pages.length}
                  </span>
                </div>
                <div className="prose-literary flex-1 overflow-y-auto font-serif text-base leading-[1.85] text-burgundy-800 sm:text-lg whitespace-pre-wrap">
                  {pages[page]}
                </div>
                <div className="mt-6 flex items-center justify-center gap-1">
                  {pages.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all ${
                        i === page ? "w-6 bg-gold" : "w-1.5 bg-burgundy/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-burgundy/10 bg-cream-50 px-4 py-3">
              <button
                type="button"
                onClick={() => go("prev")}
                disabled={page === 0}
                className="btn-secondary disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Алдыңғы
              </button>
              <p className="hidden text-sm font-medium text-burgundy/70 sm:block">
                {page + 1} / {pages.length}
              </p>
              <button
                type="button"
                onClick={() => go("next")}
                disabled={page >= pages.length - 1}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Келесі
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
