import Link from "next/link";
import {
  BookOpen,
  PlayCircle,
  GraduationCap,
  Music,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { BOOKS, WRITERS } from "@/lib/data";
import { BookCover } from "@/components/BookCover";

const features = [
  {
    href: "/kitaptar",
    title: "Кітаптар",
    desc: "Классикалық қазақ және әлем әдебиеті кітапханасы",
    icon: BookOpen,
  },
  {
    href: "/videolar",
    title: "Тарихи кино",
    desc: "Қазақ тарихи киносы: хандар, батырлар, қаһармандар",
    icon: PlayCircle,
  },
  {
    href: "/tapsyrmalar",
    title: "Тапсырмалар",
    desc: "5–11 сыныпқа арналған әдебиет және сауаттылық",
    icon: GraduationCap,
  },
  {
    href: "/muzyka",
    title: "Жыр-терме-күй",
    desc: "Қазақ лиро-эпикалық мұра: жыр, терме, күй, Абай әндері",
    icon: Music,
  },
  {
    href: "/aqyndar",
    title: "Ақындар",
    desc: "Ұлы қаламгерлердің өмірі мен мұрасы",
    icon: Users,
  },
];

export default function HomePage() {
  const featured = BOOKS.slice(0, 4);
  const featuredWriters = WRITERS.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-burgundy text-cream">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-burgundy-400/30 blur-3xl" />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-burgundy-800/50 px-3 py-1 text-xs text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              Мектеп әдебиет платформасы
            </p>
            <h1 className="font-serif text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Әдебиет{" "}
              <span className="text-gold">Әлеміне</span> қош келдіңіз
            </h1>
            <div className="ornament !mx-0 !w-32" />
            <p className="mt-4 max-w-lg text-base leading-relaxed text-cream/80 md:text-lg">
              Қазақ классикасы, әлем әдебиеті, интерактивті тапсырмалар және
              ұлы ақындар мұрасы — бір платформада. Оқушылар мен мұғалімдерге
              арналған.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kitaptar" className="btn-gold">
                Кітапханаға өту
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-cream/30 px-5 py-2.5 text-sm font-semibold text-cream transition hover:border-gold hover:text-gold"
              >
                Жүйеге кіру
              </Link>
            </div>
          </div>
          <div className="hidden grid-cols-2 gap-4 md:grid">
            {featured.slice(0, 2).map((book) => (
              <Link key={book.id} href={`/kitaptar/${book.id}`}>
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverClass={book.coverClass}
                  className="transition hover:scale-[1.02]"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="section-title">Не бар платформада?</h2>
          <div className="ornament" />
          <p className="mx-auto max-w-xl text-burgundy/70">
            Оқу, тыңдау, көру және ойлау — әдебиетті жан-жақты меңгеруге
            арналған бөлімдер.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ href, title, desc, icon: Icon }) => (
            <Link key={href} href={href} className="card group">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-burgundy text-gold transition group-hover:bg-gold group-hover:text-burgundy">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-burgundy">
                {title}
              </h3>
              <p className="mt-1 text-sm text-burgundy/70">{desc}</p>
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="card group flex flex-col justify-center border-dashed border-2 border-gold/40 bg-gold/5"
          >
            <h3 className="font-serif text-xl font-bold text-burgundy">
              Жеке кабинет
            </h3>
            <p className="mt-1 text-sm text-burgundy/70">
              Оқушы немесе мұғалім ретінде кіріп, рөлге сай басты бетті ашыңыз.
            </p>
          </Link>
        </div>
      </section>

      {/* Featured books */}
      <section className="bg-burgundy/5 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="section-title">Таңдаулы кітаптар</h2>
              <div className="ornament !mx-0" />
            </div>
            <Link
              href="/kitaptar"
              className="hidden items-center gap-1 text-sm font-semibold text-burgundy hover:text-gold-dark sm:flex"
            >
              Барлығы <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {featured.map((book) => (
              <Link key={book.id} href={`/kitaptar/${book.id}`} className="group">
                <BookCover
                  title={book.title}
                  author={book.author}
                  coverClass={book.coverClass}
                  className="transition group-hover:scale-[1.02]"
                />
                <p className="mt-2 text-center text-xs text-burgundy/60">
                  {book.genre}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Writers teaser */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 text-center">
          <h2 className="section-title">Ақындар мен жазушылар</h2>
          <div className="ornament" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredWriters.map((w) => (
            <Link key={w.id} href={`/aqyndar/${w.id}`} className="card">
              <p className="text-xs uppercase tracking-wider text-gold-dark">
                {w.years}
              </p>
              <h3 className="mt-1 font-serif text-xl font-bold text-burgundy">
                {w.name}
              </h3>
              <p className="mt-1 text-sm text-burgundy/60">{w.role}</p>
              <p className="mt-3 line-clamp-3 text-sm text-burgundy/75">
                {w.bio}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/aqyndar" className="btn-primary">
            Барлық ақындар
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Quote */}
      <section className="bg-burgundy py-14 text-center text-cream">
        <blockquote className="mx-auto max-w-2xl px-4">
          <p className="font-serif text-2xl italic leading-relaxed md:text-3xl">
            «Білімдіден шыққан сөз, талаптыға болсын кез.»
          </p>
          <footer className="mt-4 text-gold">— Абай Құнанбайұлы</footer>
        </blockquote>
      </section>
    </div>
  );
}
