import { BookOpen, Heart } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-burgundy/10 bg-burgundy text-cream">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-gold" />
            <span className="font-serif text-xl font-bold">Әдебиет Әлемі</span>
          </div>
          <p className="text-sm leading-relaxed text-cream/70">
            Қазақ мектептеріне арналған әдебиет платформасы. Кітаптар, тарихи
            фильмдер, тапсырмалар және ұлы ақындар мұрасы — бір жерде.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-serif text-lg text-gold">Бөлімдер</h3>
          <ul className="space-y-2 text-sm text-cream/80">
            <li>
              <Link href="/kitaptar" className="hover:text-gold">
                Кітаптар
              </Link>
            </li>
            <li>
              <Link href="/videolar" className="hover:text-gold">
                Тарихи фильмдер
              </Link>
            </li>
            <li>
              <Link href="/tapsyrmalar" className="hover:text-gold">
                Тапсырмалар
              </Link>
            </li>
            <li>
              <Link href="/aqyndar" className="hover:text-gold">
                Ақындар мен жазушылар
              </Link>
            </li>
            <li>
              <Link href="/okusymen-zhumys" className="hover:text-gold">
                Оқушымен жұмыс
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-serif text-lg text-gold">Платформа туралы</h3>
          <p className="text-sm leading-relaxed text-cream/70">
            Оқушылар мен мұғалімдерге арналған әдебиет кеңістігі. Жеке кабинет
            арқылы кітап оқу, тапсырма орындау және мәдени мұраны тыңдауға
            болады.
          </p>
        </div>
      </div>
      <div className="border-t border-cream/10 py-4 text-center text-xs text-cream/50">
        <p className="inline-flex items-center gap-1">
          Қазақ әдебиетіне деген сүйіспеншілікпен жасалған{" "}
          <Heart className="h-3 w-3 text-gold" />
        </p>
      </div>
    </footer>
  );
}
