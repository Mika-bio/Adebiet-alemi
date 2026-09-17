"use client";

import { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  Send,
  BookOpenCheck,
  RotateCcw,
} from "lucide-react";
import type { Task } from "@/lib/data";

type Phase = "answer" | "mistake" | "followup" | "done";

export function TaskCard({ task }: { task: Task }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [openAnswer, setOpenAnswer] = useState("");
  const [phase, setPhase] = useState<Phase>("answer");
  const [showHint, setShowHint] = useState(false);
  const [followSelected, setFollowSelected] = useState<number | null>(null);
  const [followSubmitted, setFollowSubmitted] = useState(false);
  const [followAnswer, setFollowAnswer] = useState("");

  const isQuizCorrect =
    task.type === "quiz" && selected === task.correctIndex;

  const handleSubmit = () => {
    if (task.type === "quiz" && selected === null) return;
    if (task.type === "open" && openAnswer.trim().length < 10) return;

    if (task.type === "quiz" && !isQuizCorrect) {
      setPhase("mistake");
      return;
    }
    setPhase("done");
  };

  const startFollowUp = () => {
    setFollowSelected(null);
    setFollowSubmitted(false);
    setFollowAnswer("");
    setPhase("followup");
  };

  const handleFollowSubmit = () => {
    if (task.followUpOptions && followSelected === null) return;
    if (!task.followUpOptions && followAnswer.trim().length < 5) return;
    setFollowSubmitted(true);
  };

  const handleRetry = () => {
    setSelected(null);
    setOpenAnswer("");
    setPhase("answer");
    setShowHint(false);
    setFollowSelected(null);
    setFollowSubmitted(false);
    setFollowAnswer("");
  };

  const followCorrect =
    task.followUpCorrectIndex !== undefined &&
    followSelected === task.followUpCorrectIndex;

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

      {phase === "answer" && task.type === "quiz" && task.options && (
        <div className="mt-4 space-y-2">
          {task.options.map((opt, i) => {
            const style =
              selected === i
                ? "border-burgundy bg-burgundy/5"
                : "border-burgundy/15 bg-cream hover:border-burgundy/30";
            return (
              <button
                key={i}
                type="button"
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

      {phase === "answer" && task.type === "open" && (
        <textarea
          className="input-field mt-4 min-h-[120px] resize-y"
          placeholder="Жауабыңызды жазыңыз..."
          value={openAnswer}
          onChange={(e) => setOpenAnswer(e.target.value)}
        />
      )}

      {phase === "done" && (
        <div className="mt-4 flex items-start gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-900">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            {task.type === "quiz" ? (
              <p className="font-semibold">Дұрыс! Жарайсыз!</p>
            ) : (
              <>
                <p className="font-semibold">Жауабыңыз қабылданды!</p>
                {task.sampleAnswer && (
                  <p className="mt-1 text-green-800/80">
                    <span className="font-medium">Үлгі жауап: </span>
                    {task.sampleAnswer}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {phase === "mistake" && (
        <div className="mt-4 space-y-3 rounded-xl border-2 border-amber-300/80 bg-amber-50 p-4 text-sm text-amber-950">
          <div className="flex items-start gap-2">
            <BookOpenCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div>
              <p className="font-serif text-base font-bold text-burgundy">
                Қатемен жұмыс
              </p>
              <p className="mt-1 text-burgundy/80">
                Сіздің жауабыңыз:{" "}
                <span className="font-semibold">
                  {selected !== null && task.options
                    ? task.options[selected]
                    : "—"}
                </span>
              </p>
              <p className="mt-1 text-burgundy/80">
                Дұрыс жауап:{" "}
                <span className="font-semibold text-green-800">
                  {task.correctIndex !== undefined && task.options
                    ? task.options[task.correctIndex]
                    : "—"}
                </span>
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-cream/80 px-3 py-2 text-burgundy/90">
            <p className="font-semibold text-burgundy">Түсіндірме</p>
            <p className="mt-1 leading-relaxed">
              {task.mistakeExplanation ||
                "Қатені түсіну үшін кеңесті оқып, қайталап көріңіз."}
            </p>
          </div>
          {task.followUpQuestion && (
            <button type="button" onClick={startFollowUp} className="btn-gold">
              Мини-тапсырманы орындау
            </button>
          )}
        </div>
      )}

      {phase === "followup" && (
        <div className="mt-4 space-y-3 rounded-xl border-2 border-burgundy/20 bg-cream p-4">
          <p className="font-serif text-base font-bold text-burgundy">
            Қатемен жұмыс: мини-тапсырма
          </p>
          <p className="prose-literary text-sm">
            {task.followUpQuestion}
          </p>

          {task.followUpOptions ? (
            <div className="space-y-2">
              {task.followUpOptions.map((opt, i) => {
                let style =
                  "border-burgundy/15 bg-cream hover:border-burgundy/30";
                if (followSubmitted) {
                  if (i === task.followUpCorrectIndex) {
                    style = "border-green-600 bg-green-50 text-green-900";
                  } else if (i === followSelected) {
                    style = "border-red-400 bg-red-50 text-red-900";
                  }
                } else if (followSelected === i) {
                  style = "border-burgundy bg-burgundy/5";
                }
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={followSubmitted}
                    onClick={() => setFollowSelected(i)}
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
          ) : (
            <textarea
              className="input-field min-h-[90px] resize-y"
              placeholder="Қысқа жауап жазыңыз..."
              value={followAnswer}
              disabled={followSubmitted}
              onChange={(e) => setFollowAnswer(e.target.value)}
            />
          )}

          {followSubmitted && (
            <div
              className={`flex items-start gap-2 rounded-lg p-3 text-sm ${
                !task.followUpOptions || followCorrect
                  ? "bg-green-50 text-green-900"
                  : "bg-amber-50 text-amber-950"
              }`}
            >
              {!task.followUpOptions || followCorrect ? (
                <>
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Жақсы! Қатені түсіндіңіз. Енді негізгі сұраққа қайта жауап
                    беріңіз.
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Әлі толық емес. Түсіндірмені қайта оқып, тағы бір рет
                    көріңіз.
                  </span>
                </>
              )}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {!followSubmitted ? (
              <button
                type="button"
                onClick={handleFollowSubmit}
                className="btn-primary"
              >
                <Send className="h-4 w-4" />
                Тексеру
              </button>
            ) : (
              <button type="button" onClick={handleRetry} className="btn-gold">
                <RotateCcw className="h-4 w-4" />
                Негізгі сұраққа қайту
              </button>
            )}
            {followSubmitted && !followCorrect && task.followUpOptions && (
              <button
                type="button"
                onClick={() => {
                  setFollowSubmitted(false);
                  setFollowSelected(null);
                }}
                className="btn-secondary"
              >
                Қайта көру
              </button>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {phase === "answer" && (
          <button type="button" onClick={handleSubmit} className="btn-primary">
            <Send className="h-4 w-4" />
            Жіберу
          </button>
        )}
        {(phase === "done" || phase === "mistake") && (
          <button type="button" onClick={handleRetry} className="btn-secondary">
            <RotateCcw className="h-4 w-4" />
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
