"use client";

import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  PlayCircle,
  Users,
  Music,
  ClipboardList,
  Sparkles,
} from "lucide-react";
import { RequireAuth } from "@/components/RequireAuth";
import { useAuth } from "@/lib/auth";
import { BOOKS, TASKS, VIDEOS } from "@/lib/data";

function DashboardContent() {
  const { user, isTeacher } = useAuth();
  const roleLabel = isTeacher ? "Мұғалім" : "Оқушы";

  const studentLinks = [
    {
      href: "/kitaptar",
      title: "Кітап оқу",
      desc: `${BOOKS.length} кітап қолжетімді`,
      icon: BookOpen,
    },
    {
      href: "/tapsyrmalar",
      title: "Тапсырмалар орындау",
      desc: `${TASKS.length} тапсырма күтуде`,
      icon: GraduationCap,
    },
    {
      href: "/videolar",
      title: "Тарихи кино",
      desc: `${VIDEOS.length} тарихи фильм`,
      icon: PlayCircle,
    },
    {
      href: "/muzyka",
      title: "Жыр-терме-күй",
      desc: "Лиро-эпикалық мұра",
      icon: Music,
    },
  ];

  const teacherLinks = [
    {
      href: "/tapsyrmalar",
      title: "Тапсырмалар банкы",
      desc: "5–11 сынып тапсырмаларын қарау",
      icon: ClipboardList,
    },
    {
      href: "/kitaptar",
      title: "Кітапхана",
      desc: "Оқу материалдарын қарау және ұйымдастыру",
      icon: BookOpen,
    },
    {
      href: "/videolar",
      title: "Тарихи фильмдер",
      desc: "Сабаққа арналған кино",
      icon: PlayCircle,
    },
    {
      href: "/aqyndar",
      title: "Ақындар картотекасы",
      desc: "Өмірбаяндық материалдар",
      icon: Users,
    },
  ];

  const links = isTeacher ? teacherLinks : studentLinks;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 rounded-2xl bg-burgundy p-6 text-cream md:p-8">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold">
          <Sparkles className="h-4 w-4" />
          Жеке кабинет
        </p>
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Сәлем, {user?.name}!
        </h1>
        <p className="mt-2 text-cream/75">
          Сіз <span className="text-gold font-semibold">{roleLabel}</span>{" "}
          рөлімен кірдіңіз. Төмендегі бөлімдерден бастаңыз.
        </p>
      </div>

      {isTeacher ? (
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="card text-center">
            <p className="text-3xl font-bold text-burgundy">{TASKS.length}</p>
            <p className="text-sm text-burgundy/60">Тапсырма</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-burgundy">{BOOKS.length}</p>
            <p className="text-sm text-burgundy/60">Кітап</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-bold text-burgundy">{VIDEOS.length}</p>
            <p className="text-sm text-burgundy/60">Видео</p>
          </div>
        </div>
      ) : (
        <div className="mb-8 rounded-2xl border border-gold/30 bg-gold/10 p-5">
          <h2 className="font-serif text-lg font-bold text-burgundy">
            Бүгінгі ұсыныс
          </h2>
          <p className="mt-1 text-sm text-burgundy/70">
            «{BOOKS[0].title}» — {BOOKS[0].author}. Немесе{" "}
            {TASKS.filter((t) => t.gradeBand === "5-9").length} әдебиет
            тапсырмасын орындаңыз.
          </p>
        </div>
      )}

      <h2 className="mb-4 font-serif text-2xl font-bold text-burgundy">
        {isTeacher ? "Мұғалім құралдары" : "Оқу жолы"}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {links.map(({ href, title, desc, icon: Icon }) => (
          <Link key={href} href={href} className="card group flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-burgundy text-gold transition group-hover:bg-gold group-hover:text-burgundy">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-burgundy">
                {title}
              </h3>
              <p className="text-sm text-burgundy/65">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <RequireAuth>
      <DashboardContent />
    </RequireAuth>
  );
}
