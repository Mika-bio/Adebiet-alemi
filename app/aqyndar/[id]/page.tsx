import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookMarked } from "lucide-react";
import { WRITERS, getWriter } from "@/lib/data";
import { WriterPortrait } from "@/components/WriterPortrait";

export function generateStaticParams() {
  return WRITERS.map((w) => ({ id: w.id }));
}

export default function WriterDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const writer = getWriter(params.id);
  if (!writer) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <Link
        href="/aqyndar"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-burgundy/70 hover:text-burgundy"
      >
        <ArrowLeft className="h-4 w-4" />
        Ақындарға оралу
      </Link>

      <div className="overflow-hidden rounded-2xl border border-burgundy/10 bg-cream-50 shadow-book">
        <div className="grid md:grid-cols-[280px_1fr]">
          <div className="aspect-square md:aspect-auto md:min-h-[320px]">
            <WriterPortrait
              name={writer.name}
              portraitUrl={writer.portraitUrl}
              className="h-full w-full"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-sm uppercase tracking-wider text-gold-dark">
              {writer.years}
            </p>
            <h1 className="mt-1 font-serif text-3xl font-bold text-burgundy md:text-4xl">
              {writer.name}
            </h1>
            <p className="mt-2 text-burgundy/65">{writer.role}</p>
            <div className="ornament !mx-0 !my-4" />
            <p className="prose-literary leading-relaxed">{writer.bio}</p>
          </div>
        </div>

        <div className="border-t border-burgundy/10 px-6 py-6 md:px-8">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-burgundy">
            <BookMarked className="h-5 w-5 text-gold" />
            Негізгі шығармалар
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {writer.works.map((work) => (
              <li
                key={work}
                className="rounded-xl border border-burgundy/10 bg-cream px-4 py-3 text-sm font-medium text-burgundy"
              >
                «{work}»
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
