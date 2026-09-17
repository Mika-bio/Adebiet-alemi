import { BookMarked } from "lucide-react";

interface BookCoverProps {
  title: string;
  author: string;
  coverClass: string;
  className?: string;
}

export function BookCover({
  title,
  author,
  coverClass,
  className = "",
}: BookCoverProps) {
  return (
    <div
      className={`book-spine relative flex aspect-[2/3] flex-col justify-between overflow-hidden rounded-lg p-4 text-cream shadow-book ${coverClass} ${className}`}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute right-2 top-2 h-16 w-16 rounded-full border-2 border-gold/40" />
        <div className="absolute bottom-8 left-4 h-24 w-24 rounded-full border border-cream/20" />
      </div>
      <div className="relative z-10">
        <BookMarked className="mb-2 h-6 w-6 text-gold" />
        <p className="text-[10px] uppercase tracking-widest text-gold/80">
          Әдебиет Әлемі
        </p>
      </div>
      <div className="relative z-10">
        <h3 className="font-serif text-lg font-bold leading-tight drop-shadow md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-xs text-cream/80 md:text-sm">{author}</p>
        <div className="mt-3 h-0.5 w-12 bg-gold" />
      </div>
    </div>
  );
}
