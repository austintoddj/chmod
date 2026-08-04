# What. The. Chmod.

A simple, beautiful Unix permissions calculator for that once-a-year occasion when you need to modify file access.

**https://whatthechmod.vercel.app**

## Features

- Toggle **user / group / other** × **read / write / execute**
- Live **octal**, **symbolic**, and human-readable output
- Type an octal mode (e.g. `755` or `4755`) to drive the bits
- Common **presets** (644, 755, 600, …)
- Optional **setuid / setgid / sticky** bits
- One-click **copy** of the `chmod` command
- Security strength hint (strong / moderate / weak)

## Develop

```bash
npm install
npm run dev
```

## Scripts

| Command                 | What it does                  |
| ----------------------- | ----------------------------- |
| `npm run dev`           | Vite dev server               |
| `npm run build`         | Production build → `dist/`    |
| `npm run preview`       | Serve the production build    |
| `npm run lint`          | ESLint                        |
| `npm run format`        | Prettier write                |
| `npm run test:unit`     | Vitest (unit + UI smoke)      |
| `npm run test:watch`    | Vitest watch mode             |
| `npm run test:coverage` | Vitest with coverage          |
| `npm run preflight`     | Lint → format → tests → build |

## Preflight

Before committing, run the same checklist as sibling projects:

```bash
npm run preflight
# or
bin/preflight.sh
```

That installs deps if needed, then runs lint, format, unit tests, and a production build.

## Deploy (Vercel)

Static Vite app. Connect the repo in the Vercel dashboard, or:

```bash
npx vercel
```

`vercel.json` points the build at `dist/`.

### Analytics

The app ships with **[Vercel Web Analytics](https://vercel.com/docs/analytics)** and **[Speed Insights](https://vercel.com/docs/speed-insights)** via `@vercel/analytics` and `@vercel/speed-insights`.

After deploy:

1. Open the project in the [Vercel dashboard](https://vercel.com/dashboard)
2. Enable **Analytics** (sidebar) → Enable
3. Enable **Speed Insights** (sidebar) → Enable
4. Redeploy once if the dashboard asks you to (so the `/_vercel/*` routes go live)

Page views and Web Vitals then show up under those tabs. In the browser Network tab on production, you should see requests under `/_vercel/insights/` and `/_vercel/speed-insights/`.

## Stack

- Vite
- Vanilla JS + CSS
- Vercel Web Analytics + Speed Insights
- Vitest + happy-dom
- ESLint + Prettier
- Zero backend — pure static hosting
