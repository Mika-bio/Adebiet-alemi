"use client";

import Link from "next/link";
import { useState } from "react";
import { BookOpen, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import type { WriterWork } from "@/lib/data";

export function WorkPanel({
  work,
  writerId,
  defaultOpen = false,
}: {
  work: WriterWork;
  writerId: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-xl border border-burgundy/10 bg-cream">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-burgundy/5"
        aria-expanded={open}
      >
        <div>
          <p className="font-serif text-base font-bold text-burgundy">
            «{work.title}»
          </p>
          <p className="mt-0.5 text-xs text-burgundy/55">
            {[work.year, work.genre].filter(Boolean).join(" · ")}
          </p>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 shrink-0 text-gold-dark" />
        ) : (
          <ChevronDown className="h-5 w-5 shrink-0 text-gold-dark" />
        )}
      </button>

      {open && (
        <div className="space-y-3 border-t border-burgundy/10 px-4 py-4">
          <div>
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Қысқаша мазмұны
            </h4>
            <p className="text-sm leading-relaxed text-burgundy/80">
              {work.summary}
            </p>
          </div>
          <div className="rounded-lg bg-burgundy/5 p-3">
            <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-gold-dark">
              Үзінді
            </h4>
            <p className="prose-literary text-sm italic leading-relaxed text-burgundy/85">
              {work.excerpt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/aqyndar/${writerId}/shygarma/${work.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg border border-burgundy/15 bg-cream-50 px-3 py-1.5 text-xs font-semibold text-burgundy hover:border-gold hover:text-gold-dark"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Толық бет
            </Link>
            {work.bookId && (
              <Link
                href={`/kitaptar/${work.bookId}`}
                className="inline-flex items-center gap-1.5 rounded-lg bg-burgundy px-3 py-1.5 text-xs font-semibold text-cream hover:bg-burgundy-600"
              >
                <BookOpen className="h-3.5 w-3.5" />
                Кітап оқырманында ашу
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
