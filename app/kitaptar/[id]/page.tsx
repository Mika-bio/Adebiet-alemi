import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Quote, Calendar, Tag } from "lucide-react";
import { BOOKS, getBook } from "@/lib/data";
import { BookCover } from "@/components/BookCover";
import { BookReader } from "@/components/BookReader";

export function generateStaticParams() {
  return BOOKS.map((b) => ({ id: b.id }));
}

export default function BookDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const book = getBook(params.id);
  if (!book) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link
        href="/kitaptar"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-burgundy/70 hover:text-burgundy"
      >
        <ArrowLeft className="h-4 w-4" />
        Кітаптарға оралу
      </Link>

      <div className="grid gap-10 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <div>
          <BookCover
            title={book.title}
            author={book.author}
            coverClass={book.coverClass}
            className="mx-auto w-full max-w-[240px] md:mx-0"
          />
          <div className="mt-4 flex justify-center md:justify-start">
            <BookReader
              title={book.title}
              author={book.author}
              fullText={book.fullText}
            />
          </div>
        </div>

        <div>
          <h1 className="font-serif text-3xl font-bold text-burgundy md:text-4xl">
            {book.title}
          </h1>
          <p className="mt-2 text-lg text-burgundy/70">{book.author}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-burgundy/10 px-3 py-1 text-burgundy">
              <Calendar className="h-3.5 w-3.5" />
              {book.year}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-gold-dark">
              <Tag className="h-3.5 w-3.5" />
              {book.genre}
            </span>
          </div>

          <div className="mt-8">
            <h2 className="font-serif text-xl font-bold text-burgundy">
              Сипаттама
            </h2>
            <div className="ornament !mx-0 !my-3" />
            <p className="prose-literary leading-relaxed">{book.description}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-burgundy/10 bg-cream-50 p-6 shadow-soft">
            <div className="mb-3 flex items-center gap-2 text-gold-dark">
              <Quote className="h-5 w-5" />
              <h2 className="font-serif text-xl font-bold text-burgundy">
                Үзінді
              </h2>
            </div>
            <blockquote className="font-serif text-lg italic leading-relaxed text-burgundy/85">
              {book.excerpt}
            </blockquote>
            <p className="mt-4 text-sm text-burgundy/55">
              Толық мәтінді оқу үшін жоғарыдағы «Кітапты оқу» түймесін басыңыз.
              Беттерді аударып (алдыңғы / келесі), пернелермен де басқаруға
              болады.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
