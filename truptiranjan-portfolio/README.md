# Truptiranjan Biswal — Portfolio

Frontend-only React portfolio built with Vite. No backend, no API calls.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build     # output in dist/
npm run preview   # serve the build locally
```

## Deploy (Vercel)

- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`

## Project structure

```
src/
├─ main.jsx                 entry
├─ App.jsx                  renders <Portfolio />
├─ index.css                html/body reset
├─ data/
│  ├─ profile.js            name, links, resume ID, nav, career start date
│  └─ content.js            boot lines, skills, projects, experience
├─ hooks/
│  ├─ useBootSequence.js    cold-start curtain state machine
│  ├─ useExperienceClock.js live experience counter
│  ├─ useScrollReveal.js    IntersectionObserver reveals
│  ├─ useScrollSpy.js       active nav link + sticky + reading progress
│  └─ useSmoothScroll.js    anchor click handler
├─ components/              one .jsx + co-located .css per section
└─ styles/
   ├─ tokens.css            all design tokens (colours, type, spacing)
   ├─ base.css              layout, typography, buttons, reveals
   └─ footer.css
```

## Common edits

| Change | File |
|---|---|
| Resume PDF | `src/data/profile.js` → `RESUME_ID` |
| Email / phone / social links | `src/data/profile.js` → `LINKS` |
| Experience counter start date | `src/data/profile.js` → `PROFILE.careerStart` |
| Colours / fonts / spacing | `src/styles/tokens.css` |
| Projects, skills, timeline | `src/data/content.js` |
| Photo | replace `src/assets/truptiranjan.{jpg,webp}` |

## Notes

- The experience counter is calendar-accurate (real months, not 30-day
  approximations) and stops ticking while the tab is hidden.
- Fonts load from Google Fonts in `index.html`. If you self-host later,
  drop the `<link>` and update `--display` / `--body` / `--mono`.
- `prefers-reduced-motion` skips the intro and disables all transitions.
