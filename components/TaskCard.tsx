"use client";

import { useState } from "react";
import { CheckCircle2, XCircle, Lightbulb, Send } from "lucide-react";
import type { Task } from "@/lib/data";

export function TaskCard({ task }: { task: Task }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [openAnswer, setOpenAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const isCorrect =
    task.type === "quiz" &&
    submitted &&
    selected === task.correctIndex;

  const handleSubmit = () => {
    if (task.type === "quiz" && selected === null) return;
    if (task.type === "open" && openAnswer.trim().length < 10) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelected(null);
    setOpenAnswer("");
    setSubmitted(false);
    setShowHint(false);
  };

  return (
    <article className="card">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-burgundy/10 px-2.5 py-0.5 text-xs font-semibold text-burgundy">
          {task.grade}-сынып
        </span>
        <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-semibold text-gold-dark">
          {task.gradeBand === "5-9" ? "Әдебиет" : "Оқу сауаттылығы"}
        </span>
        <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs text-burgundy/60">
          {task.type === "quiz" ? "Тест" : "Ашық жауап"}
        </span>
      </div>

      <h3 className="font-serif text-xl font-bold text-burgundy">{task.title}</h3>
      <p className="mt-2 prose-literary">{task.question}</p>

      {task.type === "quiz" && task.options && (
        <div className="mt-4 space-y-2">
          {task.options.map((opt, i) => {
            let style =
              "border-burgundy/15 bg-cream hover:border-burgundy/30";
            if (submitted) {
              if (i === task.correctIndex) {
                style = "border-green-600 bg-green-50 text-green-900";
              } else if (i === selected) {
                style = "border-red-400 bg-red-50 text-red-900";
              }
            } else if (selected === i) {
              style = "border-burgundy bg-burgundy/5";
            }
            return (
              <button
                key={i}
                type="button"
                disabled={submitted}
                onClick={() => setSelected(i)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition ${style}`}
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current/20 text-xs font-bold">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {task.type === "open" && (
        <textarea
          className="input-field mt-4 min-h-[120px] resize-y"
          placeholder="Жауабыңызды жазыңыз..."
          value={openAnswer}
          disabled={submitted}
          onChange={(e) => setOpenAnswer(e.target.value)}
        />
      )}

      {submitted && (
        <div
          className={`mt-4 flex items-start gap-2 rounded-xl p-3 text-sm ${
            task.type === "open" || isCorrect
              ? "bg-green-50 text-green-900"
              : "bg-amber-50 text-amber-900"
          }`}
        >
          {task.type === "quiz" ? (
            isCorrect ? (
              <>
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                <span>Дұрыс! Жарайсыз!</span>
              </>
            ) : (
              <>
                <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                <span>
                  Қате жауап. Дұрыс нұсқа белгіленді. Қайта көріңіз!
                </span>
              </>
            )
          ) : (
            <>
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Жауабыңыз қабылданды!</p>
                {task.sampleAnswer && (
                  <p className="mt-1 text-green-800/80">
                    <span className="font-medium">Үлгі жауап: </span>
                    {task.sampleAnswer}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {!submitted ? (
          <button type="button" onClick={handleSubmit} className="btn-primary">
            <Send className="h-4 w-4" />
            Жіберу
          </button>
        ) : (
          <button type="button" onClick={handleReset} className="btn-secondary">
            Қайта тапсыру
          </button>
        )}
        <button
          type="button"
          onClick={() => setShowHint((v) => !v)}
          className="btn-secondary"
        >
          <Lightbulb className="h-4 w-4" />
          Кеңес
        </button>
      </div>

      {showHint && (
        <p className="mt-3 rounded-lg bg-gold/10 px-3 py-2 text-sm text-gold-dark">
          💡 {task.hint}
        </p>
      )}
    </article>
  );
}
