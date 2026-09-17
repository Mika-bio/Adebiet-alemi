import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookMarked,
  Lightbulb,
  MapPin,
  Sparkles,
} from "lucide-react";
import { WRITERS, getWriter } from "@/lib/data";
import { WriterPortrait } from "@/components/WriterPortrait";
import { WorkPanel } from "@/components/WorkPanel";

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
        Ақын-жазушыларға оралу
      </Link>

      <article className="overflow-hidden rounded-2xl border border-burgundy/10 bg-cream-50 shadow-book">
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
            {(writer.birthPlace || writer.deathPlace) && (
              <p className="mt-3 flex items-start gap-2 text-sm text-burgundy/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                <span>
                  {writer.birthPlace && <>Туған жері: {writer.birthPlace}</>}
                  {writer.birthPlace && writer.deathPlace && " · "}
                  {writer.deathPlace && <>Қайтыс болған жері: {writer.deathPlace}</>}
                </span>
              </p>
            )}
            <div className="ornament !mx-0 !my-4" />
            <p className="prose-literary leading-relaxed">{writer.bio}</p>
          </div>
        </div>

        <section className="border-t border-burgundy/10 px-6 py-6 md:px-8">
          <h2 className="mb-3 font-serif text-xl font-bold text-burgundy">
            Өмірі
          </h2>
          <p className="prose-literary leading-relaxed text-burgundy/85">
            {writer.life}
          </p>
        </section>

        <section className="border-t border-burgundy/10 px-6 py-6 md:px-8">
          <h2 className="mb-3 font-serif text-xl font-bold text-burgundy">
            Шығармашылығы
          </h2>
          <p className="prose-literary leading-relaxed text-burgundy/85">
            {writer.creativity}
          </p>
        </section>

        <section className="border-t border-burgundy/10 px-6 py-6 md:px-8">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-burgundy">
            <Sparkles className="h-5 w-5 text-gold" />
            Маңызды кезеңдер
          </h2>
          <ol className="space-y-2">
            {writer.periods.map((p) => (
              <li
                key={p}
                className="rounded-xl border border-burgundy/10 bg-cream px-4 py-3 text-sm text-burgundy/85"
              >
                {p}
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-burgundy/10 px-6 py-6 md:px-8">
          <h2 className="mb-2 flex items-center gap-2 font-serif text-xl font-bold text-burgundy">
            <BookMarked className="h-5 w-5 text-gold" />
            Негізгі шығармалары
          </h2>
          <p className="mb-4 text-sm text-burgundy/60">
            Әр шығарманы басып ашыңыз — қысқаша мазмұны, үзінді және кітап
            оқырманына сілтеме көрсетіледі.
          </p>
          <div className="grid gap-3">
            {writer.works.map((work, i) => (
              <WorkPanel
                key={work.id}
                work={work}
                writerId={writer.id}
                defaultOpen={i === 0}
              />
            ))}
          </div>
        </section>

        <section className="border-t border-burgundy/10 px-6 py-6 md:px-8">
          <h2 className="mb-4 flex items-center gap-2 font-serif text-xl font-bold text-burgundy">
            <Lightbulb className="h-5 w-5 text-gold" />
            Қызықты деректер
          </h2>
          <ul className="space-y-2">
            {writer.facts.map((f) => (
              <li
                key={f}
                className="rounded-xl border border-gold/20 bg-gold/5 px-4 py-3 text-sm text-burgundy/85"
              >
                {f}
              </li>
            ))}
          </ul>
        </section>
      </article>
    </div>
  );
}
