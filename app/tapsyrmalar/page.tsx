"use client";

import { useState } from "react";
import { GraduationCap } from "lucide-react";
import { TASKS } from "@/lib/data";
import { TaskCard } from "@/components/TaskCard";
import { RequireAuth } from "@/components/RequireAuth";

function TapsyrmalarContent() {
  const [band, setBand] = useState<"all" | "5-9" | "10-11">("all");

  const filtered =
    band === "all" ? TASKS : TASKS.filter((t) => t.gradeBand === band);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-10 text-center">
        <p className="mb-2 inline-flex items-center gap-2 text-sm text-gold-dark">
          <GraduationCap className="h-4 w-4" />
          Практика
        </p>
        <h1 className="section-title">Тапсырмалар</h1>
        <div className="ornament" />
        <p className="mx-auto max-w-xl text-burgundy/70">
          5–9 сынып — әдебиет тапсырмалары. 10–11 сынып — оқу сауаттылығы.
          Жауап беріп, бірден кері байланыс алыңыз.
        </p>
      </div>

      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {(
          [
            { key: "all", label: "Барлығы" },
            { key: "5-9", label: "5–9 сынып (Әдебиет)" },
            { key: "10-11", label: "10–11 сынып (Сауаттылық)" },
          ] as const
        ).map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setBand(key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              band === key
                ? "bg-burgundy text-cream"
                : "bg-cream-200 text-burgundy hover:bg-burgundy/10"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-5">
        {filtered.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default function TapsyrmalarPage() {
  return (
    <RequireAuth>
      <TapsyrmalarContent />
    </RequireAuth>
  );
}
