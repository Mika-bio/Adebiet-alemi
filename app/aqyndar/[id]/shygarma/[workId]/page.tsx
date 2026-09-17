import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen } from "lucide-react";
import { WRITERS, getWriter, getWriterWork } from "@/lib/data";

export function generateStaticParams() {
  return WRITERS.flatMap((w) =>
    w.works.map((work) => ({ id: w.id, workId: work.id }))
  );
}

export default function WorkDetailPage({
  params,
}: {
  params: { id: string; workId: string };
}) {
  const writer = getWriter(params.id);
  const work = getWriterWork(params.id, params.workId);
  if (!writer || !work) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href={`/aqyndar/${writer.id}`}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-burgundy/70 hover:text-burgundy"
      >
        <ArrowLeft className="h-4 w-4" />
        {writer.name} бетіне оралу
      </Link>

      <article className="rounded-2xl border border-burgundy/10 bg-cream-50 p-6 shadow-book md:p-8">
        <p className="text-sm text-gold-dark">{writer.name}</p>
        <h1 className="mt-1 font-serif text-3xl font-bold text-burgundy">
          «{work.title}»
        </h1>
        <p className="mt-2 text-sm text-burgundy/60">
          {[work.year, work.genre].filter(Boolean).join(" · ")}
        </p>
        <div className="ornament !mx-0 !my-5" />

        <section className="mb-6">
          <h2 className="mb-2 font-serif text-xl font-bold text-burgundy">
            Қысқаша мазмұны
          </h2>
          <p className="prose-literary leading-relaxed text-burgundy/85">
            {work.summary}
          </p>
        </section>

        <section className="mb-6 rounded-xl bg-burgundy/5 p-5">
          <h2 className="mb-2 font-serif text-xl font-bold text-burgundy">
            Кеңейтілген үзінді
          </h2>
          <p className="prose-literary whitespace-pre-line leading-relaxed text-burgundy/90">
            {work.excerpt}
          </p>
        </section>

        {work.bookId ? (
          <Link
            href={`/kitaptar/${work.bookId}`}
            className="btn-primary inline-flex"
          >
            <BookOpen className="h-4 w-4" />
            Кітап оқырманында толық оқу
          </Link>
        ) : (
          <p className="text-sm text-burgundy/55">
            Бұл шығарманың толық мәтіні кітапханада әзірге жоқ — жоғарыдағы
            үзінді мен мазмұнды пайдаланыңыз.
          </p>
        )}
      </article>
    </div>
  );
}
