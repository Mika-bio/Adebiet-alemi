import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";
import { WRITERS } from "@/lib/data";
import { WriterPortrait } from "@/components/WriterPortrait";

export default function AqyndarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <Users className="h-4 w-4" />
          Ұлы есімдер
        </p>
        <h1 className="section-title">Ақындар мен жазушылар</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Қазақ әдебиетінің классиктері. Өмірбаяны, шығармалары және рухани
          мұрасы.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WRITERS.map((writer) => (
          <Link
            key={writer.id}
            href={`/aqyndar/${writer.id}`}
            className="card group overflow-hidden !p-0"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <WriterPortrait
                name={writer.name}
                portraitUrl={writer.portraitUrl}
                className="h-full w-full transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-wider text-gold-dark">
                {writer.years}
              </p>
              <h2 className="mt-1 font-serif text-xl font-bold text-burgundy">
                {writer.name}
              </h2>
              <p className="mt-1 text-sm text-burgundy/60">{writer.role}</p>
              <p className="mt-3 line-clamp-3 text-sm text-burgundy/75">
                {writer.bio}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-burgundy group-hover:text-gold-dark">
                Толығырақ <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
