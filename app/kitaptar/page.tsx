import Link from "next/link";
import { BOOKS } from "@/lib/data";
import { BookCover } from "@/components/BookCover";
import { BookOpen } from "lucide-react";

export default function KitaptarPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <BookOpen className="h-4 w-4" />
          Кітапхана
        </p>
        <h1 className="section-title">Кітаптар</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          Қазақ классикасы мен әлем әдебиетінің таңдаулы шығармалары. Мұқабаны
          басып, сипаттама мен үзіндіні оқыңыз.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4 md:gap-6">
        {BOOKS.map((book) => (
          <Link
            key={book.id}
            href={`/kitaptar/${book.id}`}
            className="group"
          >
            <BookCover
              title={book.title}
              author={book.author}
              coverClass={book.coverClass}
              className="transition duration-300 group-hover:scale-[1.03] group-hover:shadow-book"
            />
            <div className="mt-3 text-center">
              <p className="text-xs font-medium text-burgundy/50">{book.year}</p>
              <p className="text-sm text-burgundy/70">{book.genre}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
