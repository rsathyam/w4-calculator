# Repository Guidelines

## Project Structure & Module Organization
- `client/`: Create React App project root.
- `client/src/`: Application code (React 19, functional components).
- `client/src/components/`: UI components (`PascalCase.jsx`).
- `client/src/components/utils/`: Pure helpers (e.g., `calculateTax.js`, `fillW4Template.js`).
- `client/public/`: Static assets and HTML template.
- `client/build/`: Production build output (do not edit, not tracked for source changes).
- Tests live as `*.test.js(x)` beside files and under `client/src/components/__tests__/`.

## Build, Test, and Development Commands
- `cd client`
- `npm start` — Run dev server at `http://localhost:3000` with fast refresh.
- `npm test` — Run Jest in watch mode (React Testing Library).
- `npm test -- --coverage` — Show coverage report.
- `npm run build` — Create production build in `build/`.
- `npm run eject` — One‑way; avoid unless absolutely necessary.

## Coding Style & Naming Conventions
- Indentation: 2 spaces; include semicolons; single quotes or project‑consistent quotes.
- Components: `PascalCase.jsx` (e.g., `StepIncomeDetails.jsx`).
- Utilities: `camelCase.js` (e.g., `calculateIncome.js`).
- Prefer functional components and hooks; keep logic in small, testable helpers under `utils/`.
- Styling: Bootstrap utility classes + local CSS (`index.css`, `components.css`); avoid inline styles when possible.
- Linting: CRA ESLint config (`react-app`, `react-app/jest`). Fix warnings before PR.

## Testing Guidelines
- Framework: Jest + React Testing Library (`setupTests.js`).
- Naming: `ComponentName.test.jsx` or colocated `*.test.js(x)`.
- Write user‑centric tests (assert visible text/roles). Minimal mocking; keep helpers pure.
- Run `npm test` locally; optional `--coverage` for visibility.

## Commit & Pull Request Guidelines
- Commits: imperative, present tense, concise (e.g., “Add footer with FAQ navigation”). Optionally include scope (`StepIndicator:`).
- PRs must include: clear description, motivation, linked issues, screenshots/GIFs for UI changes, and steps to validate.
- Before opening: run `npm test` and `npm run build`; don’t commit `build/` changes; keep diffs focused.

## Architecture Overview & Tips
- Single‑page React app; local component state; analytics via `@vercel/analytics`.
- PDF generation via `pdf-lib`/`jspdf`; keep these calls in helpers.
- No secrets in repo. If adding config, prefer CRA env vars (`REACT_APP_*`) and `.env.local` (untracked).
