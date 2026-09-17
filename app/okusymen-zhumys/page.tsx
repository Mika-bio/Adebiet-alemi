"use client";

import { useMemo, useState } from "react";
import {
  ClipboardList,
  Clock,
  GraduationCap,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import { CLASSROOM_ACTIVITIES } from "@/lib/data";
import { useAuth } from "@/lib/auth";

const methods = ["Барлығы", "Оқу", "Талдау", "Топтық жұмыс", "Қатемен жұмыс", "Бағалау"];

export default function OkusymenZhumysPage() {
  const { user, isTeacher } = useAuth();
  const [method, setMethod] = useState("Барлығы");
  const [grade, setGrade] = useState("Барлығы");

  const grades = useMemo(() => {
    const set = new Set<string>();
    CLASSROOM_ACTIVITIES.forEach((a) => set.add(a.grades));
    return ["Барлығы", ...Array.from(set)];
  }, []);

  const filtered = CLASSROOM_ACTIVITIES.filter((a) => {
    const byMethod = method === "Барлығы" || a.method === method;
    const byGrade = grade === "Барлығы" || a.grades === grade;
    return byMethod && byGrade;
  });

  const roleTitle = isTeacher
    ? "Мұғалімге арналған әдістеме"
    : user
      ? "Оқушыға арналған белсенділіктер"
      : "Оқушымен жұмыс";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <ClipboardList className="h-4 w-4" />
          Әдебиет сабағы
        </p>
        <h1 className="section-title">Оқушымен жұмыс</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-2xl text-burgundy/70">
          {isTeacher
            ? "Оқу, талдау, топтық жұмыс, қатемен жұмыс және бағалау критерийлері — сабаққа дайын практикалық белсенділіктер."
            : "Әдебиетті түсінуге арналған бірлескен тапсырмалар мен кеңестер. Мұғаліммен бірге орындаңыз."}
        </p>
        {user && (
          <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-burgundy/5 px-3 py-1 text-sm text-burgundy/70">
            <GraduationCap className="h-4 w-4 text-gold-dark" />
            {roleTitle} · {isTeacher ? "Мұғалім" : "Оқушы"}
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {methods.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMethod(m)}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
              method === m
                ? "bg-burgundy text-cream"
                : "bg-cream border border-burgundy/10 text-burgundy/70 hover:border-gold"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {grades.map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGrade(g)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              grade === g
                ? "bg-gold/30 text-burgundy"
                : "bg-cream border border-burgundy/10 text-burgundy/60 hover:border-gold"
            }`}
          >
            {g === "Барлығы" ? "Барлық сынып" : `${g} сынып`}
          </button>
        ))}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {filtered.map((a) => (
          <article key={a.id} className="card flex flex-col">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-burgundy px-2.5 py-0.5 text-xs font-semibold text-cream">
                {a.method}
              </span>
              <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-medium text-gold-dark">
                {a.grades} сынып
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-burgundy/45">
                <Clock className="h-3 w-3" />
                {a.duration}
              </span>
            </div>
            <h2 className="font-serif text-xl font-bold text-burgundy">
              {a.title}
            </h2>
            <p className="mt-2 flex items-start gap-2 text-sm text-burgundy/75">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
              <span>
                <strong>Мақсаты:</strong> {a.goal}
              </span>
            </p>

            <div className="mt-4">
              <h3 className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-burgundy">
                <Users className="h-4 w-4 text-gold-dark" />
                Қадамдар
              </h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-burgundy/80">
                {a.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>

            {(isTeacher || !user) && (
              <div className="mt-4 rounded-xl border border-burgundy/10 bg-cream px-3 py-3">
                <h3 className="mb-2 text-sm font-semibold text-burgundy">
                  Бағалау критерийлері
                </h3>
                <ul className="list-disc space-y-1 pl-5 text-sm text-burgundy/80">
                  {a.assessment.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <p className="mt-3 flex items-start gap-2 text-xs text-burgundy/70">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-dark" />
                  <span>
                    <strong>Мұғалімге кеңес:</strong> {a.teacherTip}
                  </span>
                </p>
              </div>
            )}

            <div className="mt-4 rounded-xl border border-gold/25 bg-gold/5 px-3 py-3 text-sm text-burgundy/80">
              <strong>Оқушыға:</strong> {a.studentTip}
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-burgundy/60">
          Таңдалған сүзгіге сай белсенділік жоқ.
        </p>
      )}
    </div>
  );
}
