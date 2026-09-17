# Әдебиет Әлемі

Қазақ мектептеріне арналған әдебиет платформасы — Next.js (App Router) + TypeScript + Tailwind CSS.

Kazakh school literature platform with books, videos, tasks, literary music, and writer bios. All UI copy in Kazakh (Cyrillic).

## Іске қосу / Run

```bash
cd adebiet-alemi
npm install
npm run dev
```

Браузерде ашыңыз: [http://localhost:3000](http://localhost:3000)

Өндірістік құрастыру:

```bash
npm run build
npm start
```

## Демо кіру / Demo logins

| Рөл | Логин | Құпия сөз |
|-----|--------|-----------|
| Оқушы (student) | `student` | `student123` |
| Мұғалім (teacher) | `teacher` | `teacher123` |

Авторизация клиенттік демо: `localStorage` + тұқымдық пайдаланушылар (`lib/auth.tsx`, `lib/data.ts`).

## Мүмкіндіктер / Features

1. **Auth** — кіру/шығу, оқушы және мұғалім рөлдері
2. **Dashboard** — рөлге сай жеке кабинет
3. **Кітаптар** — ~8 кітап, CSS мұқаба, сипаттама + үзінді
4. **Видеолар** — ~6 YouTube картасы + модальді плеер
5. **Тапсырмалар** — 5–9 әдебиет, 10–11 оқу сауаттылығы; тест/ашық жауап + кері байланыс
6. **Музыка әдеби** — HTML audio тректер (демо royalty-free URL)
7. **Ақындар** — Абай, Әуезов, Мағжан, Мұқағали, Фариза, Ілияс

## Маршруттар / Routes

| Жол | Бет |
|-----|-----|
| `/` | Басты бет |
| `/login` | Кіру |
| `/dashboard` | Жеке кабинет (auth) |
| `/kitaptar` | Кітаптар тізімі |
| `/kitaptar/[id]` | Кітап толығырақ |
| `/videolar` | Видеолар |
| `/tapsyrmalar` | Тапсырмалар (auth) |
| `/muzyka` | Музыка |
| `/aqyndar` | Ақындар тізімі |
| `/aqyndar/[id]` | Ақын толығырақ |

## Технологиялар

- Next.js 14 App Router
- TypeScript
- Tailwind CSS (burgundy / cream / gold)
- lucide-react
- Google Fonts: PT Serif + Source Sans 3 (кириллица)

## Құрылым

```
app/           — беттер
components/    — UI компоненттер
lib/data.ts    — тұқымдық контент
lib/auth.tsx   — auth контекст
```

Дизайн: терең burgundy (#4A0E1F), крем, алтын акценттер, кітап эстетикасы.
