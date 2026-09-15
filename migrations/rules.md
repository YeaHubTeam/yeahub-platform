# План миграции зависимостей yeahub-platform

Документ предназначен для постановки задач LLM-агенту. Каждый этап автономен: содержит контекст, точный список действий, критерии приёмки и известные ловушки. Один этап = одна ветка = один PR в `develop`. Не объединять этапы и не забегать вперёд.

Дата составления: 14.09.2026. Версии «Latest» указаны на эту дату — перед выполнением этапа сверять через `npm view <pkg> version`.

---

## 0. Как использовать этот документ

При постановке задачи LLM передавать:

1. Раздел «1. Контекст проекта» (целиком).
2. Раздел «2. Общие правила» (целиком).
3. Раздел конкретного этапа (целиком).
4. Актуальный `package.json`.

Формулировка задачи: «Выполни этап N из `migrations/rules.md`. Не выходи за границы этапа. По завершении пройди чеклист приёмки из раздела 2 и приложи результаты команд».

После завершения этапа агент должен отметить его в разделе «10. Статус» (заменить `[ ]` на `[x]`, указать ветку/PR).

---

## 1. Контекст проекта

- SPA на React 18.3 + TypeScript 5.9, сборка **webpack 5** (не Vite), транспиляция через **Babel** (`babel.config.json`: preset-env, preset-typescript, preset-react automatic). TypeScript используется только для проверки типов (`fork-ts-checker-webpack-plugin` в dev, `ts-loader` в devDeps фактически не участвует в сборке).
- Архитектура FSD (`src/app|pages|widgets|features|entities|shared`), линтинг архитектуры — `steiger` + `@feature-sliced/steiger-plugin`, а также eslint-плагины `@feature-sliced/eslint-config`, `@conarti/eslint-plugin-feature-sliced`, `eslint-plugin-boundaries`.
- Стили: CSS Modules (`*.module.css`, импорт `import styles from './X.module.css'`, 581 файл), PostCSS (`postcss-preset-env`), Stylelint.
- Состояние: Redux Toolkit 2 + RTK Query, react-redux 9.
- Роутинг: react-router-dom 6.30, **data router** (`createBrowserRouter` + `RouterProvider` в `src/app/providers/router/routeConfig.tsx`, `src/app/index.tsx`). ~185 файлов импортируют из `react-router-dom`.
- i18n: i18next 23 + react-i18next 14 + `i18next-http-backend` + `i18next-browser-languagedetector`. Конфиг `src/shared/config/i18n/i18n.ts`. 414 файлов используют `useTranslation`, 1 — `<Trans>`. Переводы в `public/locales/{lng}/{ns}.json`.
- Формы: react-hook-form 7 + yup 1 + `@hookform/resolvers` (30 вызовов `yupResolver`).
- Редактор: tiptap 2.x (`src/shared/ui/TextEditor`), код-редактор `@monaco-editor/react`.
- Мониторинг: `@sentry/react` 8 (`src/shared/config/sentry/*`). Импорты только из `@sentry/react`.
- Тесты: Jest 29, окружение `@happy-dom/jest-environment` (jsdom тоже установлен), `@testing-library/react` 14, `msw` 2 (моки в `__mocks__`), конфиг `config/jest/*`. 56 тестовых файлов. В CI unit-тесты сейчас **закомментированы** (`.github/workflows/pr-checks.yml`).
- Storybook 7.6 (`config/storybook/main.ts`, `preview.ts`, `webpack.config.ts`), 29 stories, визуальные тесты `loki` + `reg-cli`.
- Конфиги webpack: `webpack.config.ts` (корень) → `config/webpack/webpackConfig.ts`, `webpackLoaders.ts`, `webpackPlugins.ts`, `webpackDevServer.ts`, `webpackResolvers.ts`, `webpackOutput.ts`. Dev-сервер по HTTPS с сертификатами из `cert/`.
- CI: `.github/workflows/pr-checks.yml` (prettier, eslint, stylelint, steiger, commitlint), `deploy.yml` (docker build → helm), `storybook-pages.yml`. Всё на Node 20.
- Docker: `Dockerfile` (prod, **`npm ci --legacy-peer-deps`**), `Dockerfile.production`, `Dockerfile.test` (Node 20), `Dockerfile.dev` (**Node 16**).
- Git-хуки: husky (`.husky/pre-commit` — lint-staged + steiger; `.husky/commit-msg` — commitlint). Ветки строго `feature/YH-XXX`, `fix/YH-XXX`, `release/X.X.X` — проверяется хуком и CI.
- Локальный Node: 22.17.1, npm 11.5.

---

## 2. Общие правила

### 2.1. Процесс

- Ветка от актуального `develop`, название по правилам проекта (`feature/YH-XXX`).
- Коммиты по conventional commits (проверяет commitlint): `chore(deps): ...`, `refactor: ...`, `fix: ...`.
- Автоформатирование (Prettier) и авто-фиксы линтеров — **отдельными коммитами**, чтобы содержательные изменения были читаемы в review.
- Не менять бизнес-логику. Если для совместимости требуется изменить поведение — описать в PR отдельно.
- Не добавлять `--legacy-peer-deps` / `--force` / `overrides` как способ «заставить установиться». Peer-конфликты решать обновлением пакетов. Исключение — явно описано в этапе.
- Не менять `package-lock.json` руками; только через `npm install`/`npm update`.
- После `npm install` проверять `npm ls` — не должно быть `ERESOLVE`, `invalid`, `missing`.
- Если пакет требует более новый Node, чем зафиксирован в проекте — сначала выполнить этап 0.

### 2.2. Чеклист приёмки (выполнять в конце каждого этапа, результаты прикладывать к PR)

```bash
node -v                       # должен соответствовать .nvmrc
npm ci                        # чистая установка без флагов
npm ls --depth=0              # без ошибок peer/invalid
npx tsc --noEmit              # 0 ошибок
npm run lint:ts               # 0 ошибок (warnings допустимы, если были до этапа)
npm run lint:css              # 0 ошибок
npx steiger ./src             # 0 ошибок
npx prettier --check "**/*.{ts,tsx,json}"
npm run test:unit             # все тесты зелёные
npm run build                 # production-сборка успешна, посмотреть размер чанков в bundle-report.html
npm run storybook:build       # пока Storybook 7 не обновлён — сборка должна оставаться зелёной
```

**Браузерные проверки выполняет владелец проекта вручную — агент браузер не запускает.** Агент обязан только убедиться, что `npm run dev` стартует без ошибок компиляции (можно запустить, дождаться `compiled successfully` и остановить), и перечислить в отчёте, что именно нужно проверить руками:

- `npm run dev`: приложение открывается по https://localhost:3001, HMR работает (изменить любой компонент и убедиться, что обновилось без перезагрузки), консоль браузера без новых ошибок/warning.
- Ручной smoke (минимум): логин/регистрация, главная, прохождение квиза, страница вопроса (TextHtml/highlight), админка — форма с TextEditor (tiptap), задача с Monaco, календарь (`EventCalendar`), слайдер (`Slider`), загрузка аватара (`ImageLoader` — cropper), смена языка, смена темы.
- Storybook (`npm run storybook`) — на этапах, где меняется что-то, влияющее на истории.

### 2.3. Baseline (зафиксирован на этапе 0, коммит `f8481579`)

Эти проблемы существовали **до** начала миграции. Агент не должен принимать их за регрессию своего этапа, но и не должен «чинить заодно» — они закрываются отдельными задачами.

- **Unit-тесты: 7 наборов / 23 теста падают** на исходном коммите (проверено на чистом worktree): `Stepper.test.tsx`, `Modal.test.tsx`, `KeywordInput.test.tsx`, `SkillSelect.test.tsx`, `SpecializationSelect.test.tsx`, `LanguageSwitcher.test.tsx`, `AuthLayout.test.tsx`. Итог baseline: `Test Suites: 7 failed, 49 passed, 56 total; Tests: 23 failed, 532 passed, 555 total`. Критерий для этапов 0–2: **набор падающих тестов не расширился**. Починка этих тестов — обязательный prerequisite этапа 3 (перед включением unit-тестов в CI).
- **ESLint:** 0 ошибок, 175 warnings (`react-hooks/exhaustive-deps`, `react/jsx-max-depth`, `import/order`). Критерий: ошибок 0, число warnings не растёт.
- **steiger:** 0 ошибок, 20 warnings (`fsd/repetitive-naming`, `fsd/excessive-slicing` и др.).
- **Stylelint:** 0 ошибок, deprecation-warning правила `indentation` (убирается на этапе 6b).
- **`npm run build`:** 2 warnings о размере ассетов (`main.js` ~780 KiB, `core.js` ~330 KiB, png 348 KiB) — известное состояние, не регрессия.
- **`npx tsc --noEmit`:** на исходном коммите падал на `.d.ts` внутри `node_modules` (`goober`, `@open-draft/deferred-promise`) из-за `target: es5`; после этапа 1 таких ошибок стало 9 (msw 2.15, `type-fest`). Решено на этапе 1 добавлением `skipLibCheck: true` — см. отклонения в разделе 11.
- Размеры именованных чанков после этапа 1 (production, байты): `runtime` 8127, `react` 139812, `text-editor` 294183, `core` 346888, `ui` 88750, `vendors` 652200, `main` 793234, `css/main` 114715. Использовать как точку отсчёта для этапа 2 (допуск ±5%).
- Сгенерированный `storybook-static/` **не** входит в `.gitignore`, `.prettierignore` и `ignoreFiles` Stylelint — после `npm run storybook:build` он засоряет `prettier --check` и `lint:css`. Удалять после сборки (`rm -rf storybook-static`) либо добавить в ignore-файлы (предложение, не сделано).

### 2.4. Особенности локального запуска

- `npx steiger ./src` может упасть с `EMFILE` при ограниченном лимите файловых дескрипторов — запускать в обычном терминале.
- Jest использует watchman; если он недоступен — `npx jest --config ./config/jest/jest.config.ts --no-watchman`.
- Docker локально может отсутствовать — тогда проверка `Dockerfile` ограничивается тем, что `npm ci` без флагов проходит на той же версии Node, что и в образе.

### 2.5. Что не делать

- Не обновлять Storybook и его аддоны до этапа 7.
- Не обновлять TypeScript до 7.x (см. этап 6 — почему).
- Не переезжать с webpack на Vite/Rspack в рамках этой миграции.
- Не переписывать `forwardRef` на `ref`-проп «заодно» (отдельная задача после миграции).

---

## 3. Этап 0. Подготовка окружения и чистка зависимостей

**Риск:** низкий. **Зависимости:** нет.

### Цель

Перевести проект на Node 22 LTS, убрать мусор и неиспользуемые пакеты из `package.json`, устранить рассинхрон между Docker и CI.

### Действия

1. **Node 22.**
   - Создать `.nvmrc` с содержимым `22`.
   - В `package.json` добавить `"engines": { "node": ">=22.15.0", "npm": ">=10" }`.
   - `Dockerfile`, `Dockerfile.production`, `Dockerfile.test`: `FROM node:20-alpine` → `FROM node:22-alpine`.
   - `Dockerfile.dev`: `FROM node:16-alpine` → `FROM node:22-alpine`.
   - `.github/workflows/pr-checks.yml`, `.github/workflows/storybook-pages.yml`: `node-version: 20` → `node-version: 22`.
   - `@types/node`: `^20.11.17` → `^22` (не 24/26 — типы должны соответствовать runtime).
   - Причина: Node 20 EOL с апреля 2026; `webpack-dev-server@6` требует ≥22.15, `@testing-library/jest-dom@7` ≥22, ESLint 10 ≥22.13, Storybook 10 ≥22.12.

2. **Убрать `--legacy-peer-deps` из `Dockerfile`** (строка `RUN npm ci --legacy-peer-deps` → `RUN npm ci`). Если `npm ci` без флага падает — это нужно починить в этом же этапе (см. п. 3–4), а не возвращать флаг.

3. **Удалить неиспользуемые пакеты** (проверено grep по `src/` и `config/`):
   - `react-input-mask`, `@types/react-input-mask` — не импортируются; библиотека использует `findDOMNode` и упадёт на React 19.
   - `react-device-detect` — не импортируется; упоминается только в regex `splitChunks.cacheGroups.ui.test` в `config/webpack/webpackConfig.ts` (строка ~73) — убрать из regex.
   - `graphql` — не импортируется (опциональный peer у msw, не нужен).
   - `regenerator-runtime` — не импортируется; Babel с текущим browserslist не требует.
   - `@sentry/tracing` (7.x, deprecated, конфликтует с 8.x) и `@sentry/browser` (не импортируется напрямую, приходит транзитивно из `@sentry/react`).
   - `i`, `npm` в devDependencies — мусор (результат случайного `npm i i`).
   - `@types/dompurify` — dompurify ≥3.2 поставляет собственные типы.
   - `@types/testing-library__jest-dom` — jest-dom поставляет свои типы; в `tsconfig.json` уже `"types": [..., "@testing-library/jest-dom"]`.
   - `@types/webpack`, `@types/webpack-dev-server` — оба пакета поставляют собственные типы; стабы устарели.
   - `ts-loader` — в сборке не используется (Babel), проверить grep по `config/` и удалить, если нет упоминаний.
   - Перед удалением каждого пакета — `rg "<имя>" src config webpack.config.ts` для подтверждения.

4. **Убрать дубли и разложить по секциям:**
   - Дубли в `dependencies` и `devDependencies`: `@hookform/resolvers`, `react-hook-form`, `yup`, `yup-password` — оставить только в `dependencies`.
   - Перенести из `dependencies` в `devDependencies`: `steiger`, `msw`, `storybook-react-i18next`, `@types/hast`, `@types/react-cropper`, `undici`.
   - `undici` и `web-streams-polyfill` используются только в `config/jest/jest.polyfill.ts` — devDependencies.

5. **Prettier-плагин сортировки импортов.** `@trivago/prettier-plugin-sort-imports` установлен, но в `.prettierrc.json` нет поля `plugins`, поэтому в Prettier 3 он не активен. Принять решение и зафиксировать в PR:
   - вариант A — удалить пакет (порядок импортов уже контролирует `import/order` из `@feature-sliced/eslint-config`);
   - вариант B — включить (`"plugins": ["@trivago/prettier-plugin-sort-imports"]`, настроить `importOrder` под FSD) и переформатировать репозиторий отдельным коммитом.
   - Рекомендация: вариант A.

6. **Хук `.husky/pre-commit`:** исправить опечатку `npx npx steiger ./src` → `npx steiger ./src`.

7. `npm install` (обновить lock), затем чеклист приёмки.

### Критерии приёмки

- Все команды чеклиста 2.2 зелёные на Node 22.
- `docker build -f Dockerfile .` проходит (можно с заглушками build-args).
- В `package.json` нет перечисленных пакетов и дублей; `npm ls --depth=0` чистый.
- `npm run build` — состав чанков не изменился, кроме исчезновения `react-device-detect`.

### Ловушки

- `Dockerfile.dev` на Node 16 — если кто-то им пользуется, после обновления нужен `npm install` внутри контейнера заново.
- Если `npm ci` без `--legacy-peer-deps` падает уже сейчас — зафиксировать причину в PR; чаще всего это `@sentry/tracing@7` vs `@sentry/react@8`, что решается их удалением.

---

## 4. Этап 1. Безопасные minor/patch обновления

**Риск:** низкий. **Зависимости:** этап 0.

### Цель

Поднять всё, что обновляется в пределах текущих semver-диапазонов, чтобы последующие мажорные этапы не смешивались с шумом.

### Действия

1. `npm update` (обновляет в рамках диапазонов `^`). Убедиться, что поднялись как минимум:
   - `@babel/*` → 7.29.x
   - `webpack` → 5.111.x, `html-webpack-plugin` 5.6.8, `mini-css-extract-plugin` 2.10.x, `postcss` 8.5.x, `postcss-loader` 8.2.x
   - `@reduxjs/toolkit` → 2.12.x, `react-redux` → 9.3.x
   - `react-hook-form` → 7.88.x (нужно ≥7.55 для `@hookform/resolvers@5` на этапе 4)
   - `msw` → 2.15.x
   - `@floating-ui/react` → 0.27.20
   - `yup` → 1.7.x
   - `prettier` → 3.9.x, `eslint-plugin-prettier` 5.5.x, `eslint-plugin-import` 2.32
   - `dompurify` → 3.4.x
   - `@tiptap/*` → 2.27.x — **все пакеты tiptap одной версии** (сейчас `extension-character-count` 2.27, остальные 2.12 — это уже рассинхрон). Проверить `npm ls @tiptap/core` — одна версия.
   - `@sentry/react` → 8.55.x
   - `react-hot-toast` → 2.6, `highlight.js` 11.12, `ts-loader` (если остался), `typescript-plugin-css-modules` 5.2, `steiger` 0.5.13, `@feature-sliced/steiger-plugin` 0.5.8, `stylelint-declaration-strict-value` 1.12, `@pmmmwh/react-refresh-webpack-plugin` 0.5.17, `react-refresh-typescript` 2.0.12, `@types/react` 18.3.31.
2. Пакеты с жёстко закреплённой версией (без `^`) — поднять руками, оставаясь в мажоре: `@commitlint/cli`/`config-conventional` 19.5 → последняя 19.x, `web-streams-polyfill` 4.0.0 → 4.3.x, `undici` 6.19.8 → последняя 6.x, `happy-dom`/`@happy-dom/jest-environment` 15.7.4 → последняя 15.x, `jest-environment-jsdom` 29.7 (уже последняя 29), `reg-cli` не трогать (latest — rc).
3. **`stylelint-declaration-strict-value`**: версии 1.11+ требуют `stylelint >=16` → `npm update` падает с ERESOLVE. Зафиксировать `~1.10.11` до этапа 6b (там снять пин вместе с обновлением Stylelint).
4. **msw ≥2.12 тянет ESM-only пакет `rettime` (`.mjs`)** — Jest его не транспилирует, падают все наборы, импортирующие msw-моки. Правка `config/jest/jest.config.ts`: `transform: { '\\.m?[jt]sx?$': 'babel-jest' }` (дефолтный паттерн не покрывает `.mjs`). Обратить внимание: исходный `transformIgnorePatterns: ['node_modules/(?!hast-util-to-html)/']` из-за `/` после lookahead **никогда не совпадал**, то есть весь `node_modules` и так транспилировался (на этом держатся ESM-only `lowlight`, `hast-*`). Не «уточнять» его — иначе развалится ~40 наборов. Сделано явным: `transformIgnorePatterns: []`.
5. Прогнать `npm run prettier` — если Prettier 3.9 изменил форматирование, закоммитить отдельно (`style: prettier 3.9`).
6. Чеклист приёмки.

### Критерии приёмки

- Чеклист 2.2 зелёный.
- `npm outdated` показывает только мажорные обновления (колонки Current == Wanted для всех строк).

### Ловушки

- Prettier 3.9 vs 3.5 — изменилось форматирование `interface X extends Omit<...>` с длинными дженериками (12 файлов); не смешивать с остальным.
- Обновление `msw` 2.8 → 2.15 может изменить предупреждения о необработанных запросах в тестах (`onUnhandledRequest`) — проверить вывод `test:unit`.
- `@tiptap/*` 2.12 → 2.27: API стабильно, но проверить TextEditor руками (character count, code block с lowlight, text-align, underline).

---

## 5. Этап 2. Webpack-тулчейн

**Риск:** средний. **Зависимости:** этапы 0–1.

### Цель

Обновить сборочный тулчейн до актуальных мажоров, не меняя результат сборки.

### Целевые версии

| Пакет | Было | Стало |
|---|---|---|
| `webpack-cli` | ^5.1.4 | ^7 |
| `webpack-dev-server` | ^4.15.1 | ^6 |
| `webpack-bundle-analyzer` | ^4.10.1 | ^5 |
| `css-loader` | ^6.10.0 | ^7 |
| `style-loader` | ^3.3.4 | ^4 |
| `babel-loader` | ^9.1.3 | ^10 |
| `copy-webpack-plugin` | ^12.0.2 | ^14 |
| `compression-webpack-plugin` | ^11.1.0 | ^12 |
| `css-minimizer-webpack-plugin` | ^7.0.2 | ^8 |
| `dotenv-webpack` | ^8.1.0 | ^9 |
| `postcss-preset-env` | ^9.3.0 | ^11 |
| `react-refresh` | ^0.14.0 | ^0.19 |
| `@pmmmwh/react-refresh-webpack-plugin` | ^0.5.x | ^0.6 |
| `fork-ts-checker-webpack-plugin` | ^9.0.2 | ^9.1 (minor) |

### Действия

1. **`css-loader` 7 — главный риск этапа.** В v7 для CSS Modules по умолчанию `modules.namedExport: true` и `exportLocalsConvention: 'as-is'`. Это ломает все `import styles from './X.module.css'` (581 файл) — `styles` станет `undefined`/пустым объектом. **Решение:** в `config/webpack/webpackLoaders.ts` в опциях css-loader явно задать:
   ```ts
   modules: {
     auto: (resourcePath: string) => resourcePath.endsWith('.module.css'),
     localIdentName: ...,
     namedExport: false,
     exportLocalsConvention: 'as-is',
   },
   ```
   Не переходить на `import * as styles` — это отдельная большая задача, и `typescript-plugin-css-modules`/`global.d.ts` настроены под default export.
   `style-loader` 4 — согласованно с css-loader 7, дополнительных опций не требует.

2. **`webpack-dev-server` 6.**
   - Требует Node ≥22.15 и webpack ≥5.101 (оба условия выполнены после этапов 0–1).
   - Пакет ESM-only с CJS-сборкой через `exports`; `import type { Configuration } from 'webpack-dev-server'` в `webpackDevServer.ts` продолжает работать.
   - Удалены: SockJS, `spdy`, `bypass` в proxy, статические `internalIP*`, CLI-флаги. В проекте не используются. Текущий конфиг (`server: { type: 'https', options: { cert, key } }`, `historyApiFallback`, `hot`, `open`, `port`) совместим.
   - Проверить, что `open: { app: { name: process.env.BROWSER } }` всё ещё валидная форма (в v5/v6 схема `open` не менялась).
   - Внутри Express 5 — на проект не влияет (кастомных middleware нет).

3. **`webpack-cli` 7.** Требует Node ≥20.9, peer `webpack-dev-server ^5 || ^6`, `webpack-bundle-analyzer ^4 || ^5`. Команды `webpack serve` / `webpack --mode production --env mode=production` не меняются. Загрузка `webpack.config.ts`: webpack-cli использует `ts-node`/`tsx`/нативный Node — `ts-node` пока остаётся (убираем на этапе 6). Если после обновления конфиг не загружается — проверить вывод `webpack --help` на предмет `--config-loader`.

4. **`babel-loader` 10.** Требует Node ^18.20 || ^20.10 || ≥22, `@babel/core ^7.12`. Изменений API для нашего использования (`loader: 'babel-loader'` без опций) нет.

5. **`copy-webpack-plugin` 14, `compression-webpack-plugin` 12, `css-minimizer-webpack-plugin` 8, `dotenv-webpack` 9** — мажоры из-за подъёма Node; API `patterns`, `algorithm/test/filename/threshold/minRatio/deleteOriginalAssets`, `path/silent/systemvars` без изменений. Проверить типы при `tsc`.

6. **`react-refresh` 0.19 + `@pmmmwh/react-refresh-webpack-plugin` 0.6.** Старый `react-refresh@0.14` официально не поддерживает React 19 — обновляем заранее. Плагин 0.6 — без изменений конфигурации (`new ReactRefreshWebpackPlugin()`), peer `webpack-dev-server ^4.8 || 5 || 6`. `react-refresh-typescript` — оставить (используется ли? проверить grep; если нет — удалить).

7. **`postcss-preset-env` 11.** Требует Node ≥18. Изменились дефолты некоторых фич по стадиям и набор плагинов. Проверка: собрать `build/css/*.css` до и после обновления и сравнить diff (например, `npm run build` → скопировать `build/css` → обновить → собрать → `diff -r`). Изменения допустимы только в форматировании/порядке fallback'ов; если пропали `@media (width >= ...)`-трансформации или custom properties — задать явно `stage`/`features` в `postcss.config.ts`.

8. `npm install`, чеклист приёмки. Дополнительно:
   - `npm run dev` — HMR: изменить текст в любом компоненте → должен обновиться без full reload; изменить `.module.css` → стили применились.
   - `npm run dev:http`, `npm run dev:mock` — тоже стартуют.
   - `npm run build` → сравнить `bundle-report.html`/`statoscope-report.html` до/после: размеры чанков ±5%, состав cacheGroups не изменился.

### Критерии приёмки

- Чеклист 2.2 зелёный.
- Диф собранного CSS между «до» и «после» — только косметический.
- HMR работает; в консоли браузера нет `[HMR]`/`[React Refresh]` ошибок.
- `npm ls` без peer-предупреждений от `webpack-cli`/`webpack-dev-server`/`react-refresh-webpack-plugin`.

### Ловушки

- Если после обновления css-loader классы в приложении «пропали» (элементы без класса) — забыли `namedExport: false`.
- `webpack-dev-server@6` не стартует на Node < 22.15 с невнятной ошибкой про `require(esm)` — проверить `node -v`.
- `webpack-cli@7` ругается на `webpack-bundle-analyzer@4`? — поднять до 5 (в таблице).
- Storybook 7 использует **свою** копию webpack-тулчейна (`@storybook/builder-webpack5` тянет css-loader/style-loader сам), поэтому обновление корневых лоадеров на него не влияет; но `npm run storybook:build` всё равно прогнать.

---

## 6. Этап 3. Тестовая инфраструктура

**Риск:** средний. **Зависимости:** этапы 0–2. **Обязателен до этапа 4** (`@testing-library/react@14` не поддерживает React 19).

### Целевые версии

| Пакет | Было | Стало |
|---|---|---|
| `jest` | ^29.7.0 | ^30 |
| `jest-environment-jsdom` | 29.7.0 | ^30 |
| `@types/jest` | ^29.5.12 | ^30 |
| `happy-dom` | 15.7.4 | ^20 |
| `@happy-dom/jest-environment` | 15.7.4 | ^20 |
| `@testing-library/react` | ^14.2.2 | ^16 |
| `@testing-library/dom` | — | ^10 (новый, обязательный peer) |
| `@testing-library/jest-dom` | ^6.4.2 | ^7 |
| `undici` | 6.x | ^7 |
| `identity-obj-proxy` | 3.0.0 | без изменений |

### Действия

1. **Jest 30.**
   - Удалены alias-матчеры (`toBeCalled`, `toBeCalledWith`, `toBeCalledTimes`, `lastCalledWith`, `nthCalledWith`, `toReturn*`, `toThrowError`). В `src/` их нет (проверено), но перепроверить после merge других веток: `rg "\.(toBeCalled|toReturn|toThrowError|lastCalledWith|nthCalledWith)\(" src`.
   - CLI: `--testPathPattern` → `--testPathPatterns` (в `package.json` скриптах не используется).
   - `jest.config.ts` загружается через `ts-node` — оставить до этапа 6.
   - После этапа 1 `transformIgnorePatterns: []` и `transform: { '\\.m?[jt]sx?$': 'babel-jest' }` — весь `node_modules` транспилируется Babel (так было и до миграции, см. этап 1 п. 4). Это медленно, но безопасно; при желании ускорить — собрать явный allow-list ESM-only пакетов (`lowlight`, `hast-util-to-html` и его зависимости `hast-util-*`, `property-information`, `comma-separated-tokens`, `space-separated-tokens`, `stringify-entities`, `character-entities-*`, `zwitch`, `ccount`, `html-void-elements`, `rettime`, …) и проверить, что все 56 наборов запускаются. В Jest 30 проверить, что `transform` с `.mjs` всё ещё нужен.
   - **Prerequisite:** починить 7 наборов из baseline (раздел 2.3) до включения тестов в CI.
   - Babel-трансформ остаётся (`babel-jest` идёт с jest).
2. **happy-dom 20 + `@happy-dom/jest-environment` 20.** Скачок в 5 мажоров. Ожидаемые проблемы: более строгие реализации `fetch`/`Blob`/`FormData` (могут конфликтовать с полифиллами из `config/jest/jest.polyfill.ts`), изменения в таймерах/`requestAnimationFrame`, `matchMedia` уже реализован в happy-dom (мок в `jestSetup.ts` может стать лишним или конфликтовать). Порядок:
   - Обновить, запустить `npm run test:unit`.
   - Для каждого падения — сначала попробовать убрать соответствующий полифилл/мок из `jest.polyfill.ts`/`jestSetup.ts` (на Node 22 `fetch`, `Blob`, `File`, `FormData`, `Headers`, `Request`, `Response`, `ReadableStream`, `TextEncoder/Decoder`, `BroadcastChannel`, `setImmediate` — нативные). Цель — минимальный полифилл, в идеале только `process.env.API_URL` и `@testing-library/jest-dom`.
   - Если happy-dom 20 несовместим с msw 2 или RTL 16 в каких-то тестах — **запасной вариант**: `testEnvironment: 'jsdom'` (`jest-environment-jsdom@30`, jsdom 26). Тогда полифиллы `fetch`/streams через `undici` вероятно понадобятся снова. Зафиксировать выбор в PR.
3. **`@testing-library/react` 16.** Добавить `@testing-library/dom@^10` в devDependencies (в 16 стал peer). API `render`, `screen`, `renderHook`, `waitFor`, `act` — без изменений. `src/shared/libs/jest/renderComponent/renderComponent.tsx` — проверить типы.
4. **`@testing-library/jest-dom` 7.** Node ≥22, peer `@testing-library/dom >=10 <11`. Импорт `import '@testing-library/jest-dom'` в `jestSetup.ts` остаётся; `tsconfig.types` уже содержит его.
5. **`undici` 7** — используется только в `jest.polyfill.ts`; если после п. 2 полифилл `fetch` из undici больше не нужен — удалить пакет вместе с `web-streams-polyfill`.
6. **Раскомментировать шаг `Unit tests` в `.github/workflows/pr-checks.yml`** — тесты должны гоняться в CI, иначе следующие этапы (React 19) нечем проверять автоматически. Если есть flaky-тесты — пометить `test.skip` с TODO и ссылкой на задачу, не отключать шаг целиком.
7. Чеклист приёмки. Дополнительно `npm run test:unit:coverage` — покрытие не должно упасть относительно `develop`.

### Критерии приёмки

- Все 56 тестовых файлов зелёные локально и в CI (шаг `Unit tests` включён).
- `config/jest/jest.polyfill.ts` и `jestSetup.ts` содержат только действительно необходимые полифиллы, каждый — с комментарием почему.
- Нет warning'ов `A worker process has failed to exit gracefully` / `open handles` (при необходимости `--detectOpenHandles` для поиска).

### Ловушки

- happy-dom не реализует часть layout-API (`getBoundingClientRect` возвращает нули) — тесты компонентов на `@floating-ui/react` (Popover, Dropdown, Tooltip) могут потребовать моков.
- RTL 16 + React 18 выводит warning про `act` только если тест сам вызывает обновление вне `act` — исправлять тесты, не глушить консоль.
- Jest 30 сменил дефолт `testEnvironmentOptions.customExportConditions` — если msw начнёт резолвиться в browser-сборку, задать `customExportConditions: ['node', 'node-addons']` для окружения.

---

## 7. Этап 4. React 19

**Риск:** высокий. **Зависимости:** этапы 0–3. Самый большой PR; делать по подэтапам-коммитам.

### Целевые версии

| Пакет | Было | Стало |
|---|---|---|
| `react`, `react-dom` | ^18.2.0 | ^19.3 |
| `@types/react`, `@types/react-dom` | ^18.2.x | ^19.3 |
| `react-slick` | ^0.30.3 | ^0.31 |
| `slick-carousel` | ^1.8.1 | оставить 1.8.1 (2.0.0 — проверить changelog отдельно; react-slick рассчитан на CSS 1.8) |
| `react-calendar` | ^5.0.0 | ^6 |
| `react-cropper` | ^2.3.3 | без изменений (последняя), peer `react >=17` |
| `@hookform/resolvers` | ^3.9.0 | ^5 |
| `react-hook-form` | 7.88 (после этапа 1) | без изменений |
| `react-responsive`, `react-hot-toast`, `@floating-ui/react`, `@monaco-editor/react`, `@tiptap/react` 2.27, `react-redux`, `@sentry/react` 8.55, `msw` | — | без изменений, поддержка React 19 уже задекларирована в peer |

`react-router-dom`, `i18next`/`react-i18next`, `@sentry/*` → 9/10, tiptap 3, date-fns 4 — **не в этом этапе** (этап 5).

### Действия

1. **Обновить react/react-dom/types до 19.3.x.** Дополнительно `npm ls react` — только одна копия.
2. **Codemods** (запускать, затем ревьюить diff руками):
   - `npx types-react-codemod@latest preset-19 ./src` — типы: убирает глобальный `JSX`, `useRef()` без аргумента, `ReactElement<any>` и др.
   - `npx codemod@latest react/19/migration-recommended` — runtime-паттерны (в нашем коде почти нечего менять, но прогнать).
3. **Известные точки в кодовой базе (проверено grep):**
   - **Глобальный namespace `JSX` удалён** из `@types/react@19`: 20 использований `JSX.Element` / `JSX.IntrinsicElements` в 17 файлах (в т.ч. `shared/ui/Toast/Toast.tsx`, `shared/ui/Dropdown/Dropdown/Dropdown.tsx`, `shared/ui/Tabs/types.ts`, `shared/ui/Stepper/types.ts`, `shared/ui/Text/Text.tsx`, `shared/ui/Button/Button.tsx`, `shared/ui/Radio/Radio.tsx`, `shared/ui/Switch/Switch.tsx`, `shared/ui/TextArea/TextArea.tsx`, `shared/ui/Chip/*`, `shared/ui/IconButton/IconButton.tsx`, `shared/ui/charts/*`, `entities/user/ui/RoleSelect/RoleSelect.tsx`). Заменять на `React.JSX.Element` / `ReactElement` / `ReactNode` / `React.JSX.IntrinsicElements`. Найти все: `rg --pcre2 '(?<!React\.)\bJSX\.' src`.
   - `useRef()` без начального значения — 1 место: `src/widgets/interview/PassedQuizzesList/ui/FullPassedQuizzesList/FullPassedQuizzesList.tsx`. Теперь `useRef<T>(null)` обязателен.
   - `ReactElement` без дженерика: `props` теперь `unknown` вместо `any` — ждать ошибок там, где читают `element.props.xxx` (`Tabs`, `Stepper`, `Dropdown`, `Toast`). Типизировать дженериком `ReactElement<Props>`.
   - `forwardRef` — 8 компонентов в `shared/ui` (`Button`, `Chip`, `Radio`, `Checkbox`, `RangeLabel`, `PopoverFabric` ×5). Продолжает работать. **Не переписывать** в этом этапе.
   - `createRoot` уже используется (`src/app/index.tsx`); `ReactDOM.render`, `findDOMNode`, `propTypes`, `defaultProps` у функциональных компонентов, string refs, legacy context — в `src/` отсутствуют.
   - `element.ref` больше не доступен (только `element.props.ref`) — grep `\.ref\b` по `src/shared/ui`, если кто-то читает ref у чужого элемента.
   - `useFormState` → `useActionState` — не используется.
   - `act` теперь экспортируется из `react`, а не `react-dom/test-utils` — в тестах используется `act` из RTL, менять не нужно.
   - Ошибки рендера: React 19 больше не пробрасывает их через `console.error` повторно; `SentryErrorBoundary` (`src/shared/config/sentry/ErrorBoundary.tsx`) — проверить, что `captureException` всё ещё вызывается (руками бросить ошибку в компоненте в dev).
   - `useId` формат сменился на `_r_` — если где-то есть тесты со снапшотами id, обновить.
4. **`@hookform/resolvers` 3 → 5.** Требует `react-hook-form ≥7.55` (есть). Сильно изменились дженерики `yupResolver`: разделены input/output-типы, `Resolver<Input, Context, Output>`. 30 вызовов `yupResolver` (`rg yupResolver src`). Типовые ошибки: `useForm<FormValues>({ resolver: yupResolver(schema) })` не компилируется, если `yup.InferType<typeof schema>` не совпадает с `FormValues` (optional vs `undefined`, `.transform()`, `.default()`). Исправлять схему/тип формы, а не `as any`. Паттерн: `useForm<yup.InferType<typeof schema>>`.
5. **`react-calendar` 6.** Сверить CHANGELOG 5→6 (изменения пропсов, CSS-классов, peer). Проверить `src/shared/ui/Calendar/EventCalendar.tsx`, `EventCalendar.css`, `EventCalendar.skeleton.tsx`.
6. **`react-slick` 0.31** — peer React 19 задекларирован. Проверить `src/shared/ui/Slider/Slider.tsx` (стрелки, dots, responsive).
7. **`react-cropper` 2.3.3** — не обновлялся давно; на React 19 должен работать (обёртка над cropperjs 1.x без legacy API), проверить руками `src/shared/ui/ImageLoader/ImageLoader.tsx`.
8. **Storybook 7** формально работает с React 19 (рендерит через `react-dom/client`), но возможны warning'и — терпимо до этапа 7. `npm run storybook:build` должен проходить.
9. **Тесты** (после этапа 3 RTL 16 уже стоит): `npm run test:unit`. React 19 строже к обновлениям вне `act` — исправлять тесты.
10. **Sentry** — `@sentry/react@8.55` поддерживает React 19 (peer `19.x`). Ничего не менять.
11. Чеклист приёмки + полный ручной smoke из 2.2. Особое внимание: формы (все `yupResolver`), TextEditor, Popover/Dropdown (floating-ui), Slider, Calendar, ImageLoader, Toaster, Monaco.

### Критерии приёмки

- `npx tsc --noEmit` — 0 ошибок без `// @ts-expect-error`/`any`-заплаток (правило `@typescript-eslint/no-explicit-any: error` не ослаблять).
- Все тесты зелёные; в выводе тестов нет `Warning: ...` от React.
- В dev-консоли нет React-warning'ов на ключевых экранах.
- `npm ls react react-dom @types/react` — по одной копии.

### Ловушки

- `@types/react@19` может подтянуться транзитивно раньше времени и «сломать» типы на этапах 0–3 — если `npm ls @types/react` показывает 19 до этого этапа, зафиксировать `overrides` временно и убрать здесь.
- Библиотеки без peer на React 19 (`react-cropper >=17` ок; `react-device-detect` удалён на этапе 0). Если появится `ERESOLVE` — искать виновника через `npm ls react`, не ставить `--legacy-peer-deps`.
- `react-refresh` должен быть ≥0.16 (обновлён до 0.19 на этапе 2), иначе HMR с React 19 ведёт себя нестабильно.

---

## 8. Этап 5. Прикладные библиотеки (несколько независимых PR)

**Риск:** средний. **Зависимости:** этап 4. Подэтапы 5a–5e независимы, каждый — отдельный PR. Порядок рекомендуемый: 5a → 5b → 5c → 5d; 5e — по решению.

### 5a. react-router 6.30 → 7.x

- Проект использует data router (`createBrowserRouter`, `RouterProvider`, `Outlet`, `useBlocker` в `LeavingPageBlocker`, `useNavigate`, `useSearchParams`, `useLocation`, `Navigate`, `Link`/`NavLink`). ~185 файлов импортируют из `react-router-dom`.
- **Шаг 1 (ещё на v6.30):** включить `future`-флаги в `createBrowserRouter(routes, { future: {...} })` **по одному коммиту на флаг**, каждый раз проверяя навигацию:
  - `v7_relativeSplatPath` — **самый опасный**: меняет резолв относительных путей внутри splat-роутов (`path: '*'`, `path: 'x/*'`). Проверить все `<Link to="...">`/`navigate('...')` с относительными путями внутри таких роутов.
  - `v7_startTransition` — рендер навигации оборачивается в `startTransition`; проверить Suspense-fallback'и (`Loader`) и `.lazy.ts`-страницы.
  - `v7_fetcherPersist`, `v7_normalizeFormMethod`, `v7_partialHydration`, `v7_skipActionErrorRevalidation` — loaders/actions/fetchers в проекте не используются, риск минимальный.
- **Шаг 2:** `react-router-dom` → `^7`. Требует Node ≥20, React ≥18. В v7 `react-router-dom` — тонкий re-export `react-router`; массовый rename импортов **не обязателен** (можно сделать позже кодмодом). Убрать `future`-объект (флаги стали дефолтом).
- `json()`/`defer()` deprecated — не используются.
- `src/shared/config/storybook/RouterDecorator/RouterDecorator.tsx` (`BrowserRouter`) — работает без изменений.
- `SentryRouteTracker.tsx` — проверить, что события навигации по-прежнему отправляются.
- Обновить regex `splitChunks.cacheGroups.core` в `webpackConfig.ts`: добавить `react-router` рядом с `react-router-dom`.
- Приёмка: чеклист + прокликать все разделы sidebar, редиректы `AuthRoute`/`UnAuthRoute`/`PremiumRoute`/`VerifiedEmailRoute`/`InterviewRoute`, страница 404, `LeavingPageBlocker` при уходе с несохранённой формы, query-параметры фильтров (`useQueryFilterParams`).

### 5b. i18next 23 → 26, react-i18next 14 → 17, детектор 7 → 8, http-backend 2 → 4

- В `src/shared/config/i18n/i18n.ts` нет удалённых опций (`initImmediate`, `interpolation.format`, `showSupportNotice`, `simplifyPluralSuffix`) — конфиг совместим.
- `i18next@26` peer `typescript ^5 || ^6 || ^7` — ок.
- `react-i18next@17` требует `i18next ≥26.2`. Изменение поведения: смена языка больше не триггерит Suspense по умолчанию. Если при переключении языка (`features/internationalization/switch-language`) появляются «мигания» ключей — добавить в init `react: { bindI18n: 'languageChanged languageChanging' }`.
- Типы `t()` стали строже; при 414 использованиях `useTranslation` возможны единичные ошибки (например, `t(key, { returnObjects: true })`, динамические ключи `t(\`${prefix}.${x}\`)`). Исправлять типизацией ключей, не `as string`.
- `i18next-http-backend@4`: только `fetch`, без XHR-fallback — в браузере и тестах (msw) ок. Проверить `loadPath`.
- `i18next-browser-languagedetector@8`: изменений API для дефолтного использования нет.
- `storybook-react-i18next` **оставить 3.x** — 10.x требует Storybook ≥9 (этап 7). Peer у 3.3.1: `i18next ^22–^25`, `react-i18next ^12–^15` → после этого подэтапа появится peer-warning. Допустимо; если `npm ci` падает с ERESOLVE — временно `overrides` для `storybook-react-i18next` с комментарием «убрать на этапе 7».
- Приёмка: переключение языка на всех разделах, плюрализация (счётчики вопросов/квизов), `<Trans>` (1 место), Storybook с переключателем locale.

### 5c. Sentry 8 → 10

- Удалить `@sentry/tracing`/`@sentry/browser` (сделано на этапе 0). Обновить только `@sentry/react` → `^10`.
- Используемые API (`init`, `browserTracingIntegration`, `replayIntegration`, `captureException`, `addBreadcrumb`, `setContext`, `setUser`, `setTag`, `ErrorBoundary`, `beforeSend`, `tracePropagationTargets`, `tracesSampleRate`, `replays*SampleRate`) существуют в 10.x.
- Breaking из v9, которые нужно проверить отсутствием в коде: `autoSessionTracking`, `enableTracing`, `getCurrentHub`, `startTransaction`, `transactionNamingScheme`, `_experiments`. В `src/shared/config/sentry/*` их нет.
- Типы `beforeSend`/`event.request` ужесточены — возможны ошибки в `sentry.ts` при мутации `event.request.data`/`headers`; переписать через создание нового объекта.
- Sentry 9+ таргетит ES2020 — согласуется с `.browserslistrc` (`> 0.5%, not dead`).
- Приёмка: в dev с заданным `SENTRY_DSN` бросить тестовую ошибку → событие в Sentry; breadcrumbs от Redux middleware (`middleware.ts`, `sentryApiErrorMiddleware.ts`) приходят.

### 5d. date-fns 3 → 4

- 10 файлов (`from 'date-fns'`, 2 — `from 'date-fns/locale'`). v4 почти без breaking: добавлены `in`-опции для таймзон, изменены сигнатуры некоторых редких функций. Обновить, `tsc`, проверить `formatDate` (`src/shared/libs/fp/formatDate`), календарь, историю интервью.

### 5e. tiptap 2.27 → 3.x (по решению; можно оставить 2.x)

- Изменения: `StarterKit` теперь включает `Underline`, `Link`, `ListKeymap`, `TrailingNode`, `UndoRedo` (ex-`History`) → отдельные `@tiptap/extension-underline`/`extension-strike` дублируются (warning `Duplicate extension names`) — убрать дубли или отключить в `StarterKit.configure({ underline: false })`. `CharacterCount` переехал в `@tiptap/extensions`. `@tiptap/extension-code`, `extension-heading` — входят в StarterKit. `TextAlign`, `CodeBlockLowlight` — по-прежнему отдельные пакеты.
- `useEditor`: по умолчанию `shouldRerenderOnTransaction: false` — тулбар, читающий `editor.isActive(...)`/`editor.can()` при рендере, перестанет обновляться. Использовать `useEditorState({ editor, selector })` или явно `shouldRerenderOnTransaction: true` (проще, но медленнее).
- `immediatelyRender` — для SPA оставить дефолт.
- Peer `@tiptap/pm` должен быть установлен явно.
- Обновить regex `splitChunks.cacheGroups.text_editor` при появлении новых пакетов (`@tiptap/extensions`).
- Приёмка: все кнопки тулбара TextEditor, счётчик символов, code block с подсветкой, undo/redo, сохранение/загрузка HTML (`TextHtml`, `isEmptyHtml`).

---

## 9. Этап 6. Линтеры и TypeScript

**Риск:** средний, много механики. **Зависимости:** этап 4 (иначе `eslint-plugin-react-hooks@7` и React-правила будут дважды переписываться).

### 6a. ESLint 8 → 10 (flat config)

Целевые версии: `eslint ^10`, `@eslint/js ^10`, `@eslint/eslintrc` (для `FlatCompat`), `typescript-eslint ^8` (единый пакет вместо `@typescript-eslint/parser` + `eslint-plugin`), `eslint-plugin-react ^7.37`, `eslint-plugin-react-hooks ^7`, `eslint-plugin-jsx-a11y ^6.10`, `eslint-plugin-import ^2.32`, `eslint-plugin-boundaries ^7`, `eslint-config-prettier ^10`, `eslint-plugin-prettier ^5.5`, `globals`.

- ESLint 10 **полностью** удалил eslintrc: `.eslintrc.json`, `.eslintignore`, `ESLINT_USE_FLAT_CONFIG` не работают. Нужен `eslint.config.mjs` в корне.
- Node ≥22.13 — есть.
- Перенос настроек из `.eslintrc.json`:
  - `env` → `languageOptions.globals` из пакета `globals` (`browser`, `node`, `es2022`) + `__IS_DEV__: 'readonly'`.
  - `parser`/`parserOptions` → `languageOptions.parser: tseslint.parser`, `parserOptions.ecmaFeatures.jsx`.
  - `extends`: `eslint:recommended` → `js.configs.recommended`; `plugin:@typescript-eslint/recommended` → `tseslint.configs.recommended`; `plugin:react/recommended` → `react.configs.flat.recommended`; `plugin:react-hooks/recommended` → `reactHooks.configs.flat.recommended` (см. ниже про новые правила); `plugin:jsx-a11y/recommended` → `jsxA11y.flatConfigs.recommended`; `prettier` → `eslintConfigPrettier`.
  - **`@feature-sliced/eslint-config` (0.1.1) и `@conarti/eslint-plugin-feature-sliced` (1.0.5)** — старые eslintrc-конфиги без flat-экспорта. Подключать через `FlatCompat` из `@eslint/eslintrc` (`compat.extends('@feature-sliced', '@feature-sliced/eslint-config/rules/import-order/experimental', 'plugin:@conarti/feature-sliced/recommended')`). Если `FlatCompat` не справляется (плагин использует удалённые API) — заменить: правила слоёв уже покрывает `steiger`, `import/order` можно настроить напрямую через `eslint-plugin-import` `flatConfigs`. Решение зафиксировать в PR.
  - `settings.react.version: '999.999.999'` → `'detect'`.
  - `.eslintignore` → `ignores: [...]` в конфиге.
  - Все `rules` переносятся как есть.
- **`eslint-plugin-react-hooks@7`**: пресет `recommended` включает правила React Compiler (`react-hooks/set-state-in-effect`, `react-hooks/refs`, `react-hooks/purity`, `react-hooks/immutability`, `react-hooks/preserve-manual-memoization` и др.). Ожидать десятки новых ошибок. Стратегия: включить весь пресет, прогнать, честно исправить тривиальное; для остального — временно `'warn'` с TODO-комментарием в конфиге и отдельной задачей. Не отключать `rules-of-hooks`/`exhaustive-deps`.
- `typescript-eslint@8`: часть правил `recommended` ужесточилась (`no-unused-expressions`, `no-empty-object-type`, `no-require-imports` вместо `no-var-requires`). Правило `@typescript-eslint/no-var-requires: off` → `no-require-imports: off` (используется в `config/jest/jest.polyfill.ts`).
- Скрипты `lint:ts`/`lint:ts:fix` не меняются. `lint-staged` вызывает их же.
- Приёмка: `npm run lint:ts` — 0 ошибок; количество warning'ов зафиксировано в PR; `npx eslint --print-config src/app/index.tsx` показывает все ожидаемые плагины.

### 6b. Stylelint 15 → 17

Целевые версии: `stylelint ^17`, `stylelint-config-standard ^40`, `stylelint-order ^8`, `stylelint-declaration-strict-value ^1.12`.

- Удалить из `.stylelintrc.json` правило `"indentation": [2]` — удалено в Stylelint 16 (форматирование — на Prettier). Других stylistic-правил в конфиге нет.
- Снять пин `stylelint-declaration-strict-value: ~1.10.11` (поставлен на этапе 1) → `^1.12`.
- `stylelint-config-standard` 34 → 40 добавил правила (`media-feature-range-notation: context`, `selector-not-notation`, `import-notation`, `declaration-property-value-no-unknown`, `lightness-notation`, `hue-degree-notation`…). Прогнать `npm run lint:css:fix` отдельным коммитом; оставшееся — руками или точечно отключить с обоснованием.
- `stylelint-order@8` — правило `order/properties-order` без изменений формата.
- Node ≥20.19 — есть.
- Приёмка: `npm run lint:css` — 0 ошибок.

### 6c. Прочий тулинг

- `lint-staged` 15 → 16 (Node ≥20.17; конфиг `.lintstagedrc` совместим).
- `@commitlint/cli`, `@commitlint/config-conventional` 19 → 21 (проверить `commitlint.config.ts` загружается; Node ≥20).
- `husky` 9 — без изменений.
- `steiger` 0.5 → 0.6, `@feature-sliced/steiger-plugin` 0.5 → 0.7: проверить `steiger.config.ts` (`defineConfig`, `fsd.configs.recommended`), новые правила по умолчанию — прогнать `npx steiger ./src`; новые ошибки либо исправить, либо `'warn'` с TODO.
- `@svgr/webpack` 8, `classnames`, `circular-dependency-plugin`, `html-inline-script-webpack-plugin`, `@statoscope/webpack-plugin` — minor/без изменений.
- `loki` 0.34 → 0.35.1 можно поднять сейчас (peer Storybook ^5–^8 — с 7.6 ок).

### 6d. TypeScript 5.9 → 6.x (не 7)

- **Почему не 7.x:** TypeScript 7 (нативный, Go) не имеет стабильного программного API (`createProgram`, `ts.sys` и т.д.) и не поддерживает language-service плагины. Ломаются `fork-ts-checker-webpack-plugin`, `ts-node`, `typescript-eslint` (явно отказывается работать с TS 7.0), `typescript-plugin-css-modules`. Экосистема целится в TS 7.1+. Пересмотреть после выхода 7.1 и поддержки в перечисленных пакетах.
- TS 6 — «мостовой» релиз: старые опции работают, но выдают deprecation-ошибки, которые глушатся `"ignoreDeprecations": "6.0"`. Наша цель — убрать deprecated-опции, а не глушить.
- Изменения `tsconfig.json`:
  - `"target": "es5"` → `"ES2020"` (Babel всё равно транспилирует по browserslist; TS-таргет влияет только на проверку типов/lib). Убедиться, что `lib` покрывает используемые API (`Array.prototype.at`, `structuredClone` и т.п. — при необходимости `"lib": ["ES2022", "DOM", "DOM.Iterable"]`).
  - `"moduleResolution": "node"` → `"bundler"` (также требование Storybook 10 на этапе 7).
  - Удалить `"baseUrl": "."`; `"paths": { "@/*": ["./src/*"] }` работает относительно расположения tsconfig.
  - Добавить явный `"rootDir"` при необходимости (TS 6 предупреждает TS5011).
  - `esModuleInterop`/`allowSyntheticDefaultImports` — оставить `true` (в 7 нельзя `false`).
  - `skipLibCheck: true` (добавлен на этапе 1) — после смены `target` на ES2020 попробовать убрать и убедиться, что `tsc --noEmit` остаётся зелёным; если `.d.ts` сторонних пакетов всё ещё падают — оставить (это общепринятая настройка).
  - Секция `"ts-node": { "compilerOptions": { "module": "CommonJS" } }` конфликтует с `moduleResolution: bundler` (bundler требует `module: es2015+`/`preserve`). Варианты: (а) убрать `ts-node` полностью и полагаться на нативный type stripping Node ≥22.18 (webpack-cli 7 и Jest 30 умеют грузить `.ts`-конфиги через Node), (б) заменить `ts-node` на `tsx`. Рекомендация — (а), при этом `.nvmrc` → `22.18` или выше и `commitlint.config.ts`, `postcss.config.ts`, `steiger.config.ts` проверить на загрузку.
- `typescript-plugin-css-modules` 5.2 — совместим с TS 6.
- `fork-ts-checker-webpack-plugin` 9.1 — peer `typescript >3.6`, совместим.
- `typescript-eslint@8` — поддержка TS 6 появилась в 8.5x+; проверить `npm view typescript-eslint peerDependencies`.
- `i18next`/`react-i18next` peer `typescript ^5 || ^6 || ^7` — ок.
- Приёмка: `npx tsc --noEmit` без `ignoreDeprecations`; `npm run dev` (fork-ts-checker показывает ошибки типов), `npm run build`, `npm run test:unit`, Storybook 7 собирается (он использует свой TS-резолв, но `moduleResolution: bundler` может изменить резолв `@storybook/*` типов — проверить).

---

## 10. Этап 7. Storybook 7 → 10 (последний)

**Риск:** высокий. **Зависимости:** все предыдущие этапы (особенно 6d — `moduleResolution: bundler` обязателен для SB 10, и Node ≥22.12).

### Целевые версии

`storybook ^10`, `@storybook/react ^10`, `@storybook/react-webpack5 ^10`, `@storybook/addon-webpack5-compiler-swc ^4`, `@storybook/addon-links ^10`, `@storybook/addon-docs ^10`, `@storybook/addon-styling-webpack ^3`, `storybook-react-i18next ^10`, `@storybook/icons ^2` (как библиотека, не аддон).

Удалить: `@storybook/addon-essentials`, `@storybook/addon-interactions`, `@storybook/addon-onboarding`, `@storybook/blocks`, `@storybook/test` (заменяется на `storybook/test` из ядра).

### Действия — строго по мажорам

Не прыгать 7 → 10 напрямую: автомиграции написаны для соседних мажоров.

**7 → 8:** `npx storybook@8 upgrade` (флаг `-c ./config/storybook`, т.к. конфиг не в `.storybook`).
- Удалена `framework.options.builder.useSWC` (в `main.ts` включена) — убрать; компилятор только через `@storybook/addon-webpack5-compiler-swc@2` (уже в `addons`). Опция `swc: () => ({ jsc: { transform: { react: { runtime: 'automatic' } } } })` остаётся.
- `@storybook/testing-library` → `@storybook/test` (у нас уже `@storybook/test`).
- `actions.argTypesRegex` deprecated: заменить на явные `fn()` из `@storybook/test` в `args` историй (29 stories; `rg "on[A-Z]\w+:" src --glob '*.stories.tsx'`).
- `docs.autodocs: 'tag'` → `tags: ['autodocs']` в `preview.ts`.
- Storybook 8 требует React ≥16.8 — ок с React 19.
- Проверить `storybook dev`, `storybook:build`, `loki` (peer SB ^8 поддерживается).

**8 → 9:** `npx storybook@9 upgrade -c ./config/storybook`.
- Консолидация пакетов: `addon-essentials`, `addon-interactions`, `addon-controls`, `addon-actions`, `addon-viewport`, `addon-onboarding`, `@storybook/blocks`, `@storybook/test` — удаляются из `package.json` и из `addons`; функциональность в ядре `storybook`. Импорты: `@storybook/test` → `storybook/test`, `@storybook/blocks` → `@storybook/addon-docs/blocks`, `import type { Meta, StoryObj } from '@storybook/react'` остаётся.
- `argTypesRegex` окончательно удалён — всё должно быть на `fn()` после предыдущего шага.
- `docs.autodocs` удалён — только `tags`.
- `@storybook/icons` в массиве `addons` — это библиотека компонентов, не аддон; убрать из `addons` (оставить в devDeps, если используется в stories/MDX).
- `@storybook/addon-webpack5-compiler-swc` → 3.x, `@storybook/addon-styling-webpack` → 2.x/3.x.
- Node ≥20 — ок.
- **Loki**: peer `@storybook/react ^5–^8` → SB 9 не поддерживается официально. Попробовать запустить `npx loki test` по `storybook-static` (`--reactUri file:./storybook-static`); если работает — оставить с `overrides`/комментарием; если нет — см. ниже.

**9 → 10:** `npx storybook@10 upgrade -c ./config/storybook`.
- `config/storybook/main.ts` и `webpack.config.ts` должны быть валидным ESM (расширения в относительных импортах: `./webpack.config.ts` → с явным расширением или через `import.meta.resolve`; `__dirname` → `import.meta.dirname` при Node ≥20.11).
- `tsconfig.moduleResolution: bundler` — обязательно (сделано на этапе 6d).
- Node ≥22.12 — ок.
- `@storybook/addon-webpack5-compiler-swc` → 4.x, `@storybook/addon-styling-webpack` → 3.x, `storybook-react-i18next` → 10.x (peer `storybook ^9 || ^10`, `react-i18next ^12–^17`, `i18next` до ^26).
- `preview.ts`: `parameters.i18n` и `globals.locale/locales` — сверить с README `storybook-react-i18next@10` (формат `initialGlobals`).
- Проверить кастомный `webpack.config.ts` (svgr для svg, `@` alias, `asset/resource` для avif, `DefinePlugin(__IS_DEV__)`) — в SB 10 `webpackFinal` без изменений.
- `.github/workflows/storybook-pages.yml` — команда `storybook build -c ./config/storybook` остаётся.

**Визуальные тесты.** Если Loki не работает с SB 9/10 — заменить, сохранив `reg-cli`-отчёты (`test:ui:json`, `test:ui:html`, `scripts/generate-visual-json-report.js`):
- вариант A: `storycap` (Playwright/Puppeteer, снимает скриншоты всех stories из `storybook-static`) + существующий `reg-cli`;
- вариант B: собственный Playwright-скрипт по `storybook-static/index.json`;
- вариант C: Chromatic (SaaS).
- Vitest-аддон Storybook **не подходит** — только для Vite-проектов.
- Обновить `loki`-секцию в `package.json` и скрипты `test:ui*` под выбранный инструмент; `.loki/reference` мигрировать или пересоздать.

### Критерии приёмки

- `npm run storybook` открывается, все 29 stories рендерятся без ошибок в консоли, переключение locale/background работает, controls/actions видны, docs-страницы (autodocs) генерируются.
- `npm run storybook:build` зелёный локально и в `storybook-pages.yml`.
- Визуальные тесты: `test:ui` проходит, `test:ui:html` формирует отчёт.
- В `package.json` нет пустых пакетов `@storybook/addon-essentials|interactions|onboarding|blocks|test`.

### Ловушки

- SWC-аддон должен получать `runtime: 'automatic'` — иначе `React is not defined` в историях.
- SB 10 ESM-конфиг + `ts-node`-стиль `require` в `webpack.config.ts` Storybook — заменить на `import`.
- После консолидации `storybook/test` — `import { fn, expect, userEvent } from 'storybook/test'` (без `@`).

---

## 11. Статус

| Этап | Статус | Ветка / PR | Примечания |
|---|---|---|---|
| 0. Подготовка окружения и чистка | [x] | `feature/YH-2415` (не закоммичено) | Docker-сборка локально не проверена (docker отсутствует); `npm ci` без флагов проходит. Prettier-плагин сортировки импортов удалён (вариант A). |
| 1. Minor/patch | [x] | `feature/YH-2415` (не закоммичено) | Отклонения от плана: (1) `skipLibCheck: true` в `tsconfig.json` — иначе `tsc --noEmit` красный из-за `.d.ts` в `node_modules` при `target: es5`; (2) `stylelint-declaration-strict-value` запинен `~1.10.11`; (3) правка `config/jest/jest.config.ts` (`transform` для `.mjs`, явный `transformIgnorePatterns: []`). Prettier 3.9 переформатировал 12 файлов в `src/` — отдельным коммитом. Ручная проверка в браузере — за владельцем. |
| 2. Webpack-тулчейн | [x] | `feature/YH-2415` (не закоммичено) | Отклонения: (1) `react-refresh-typescript` удалён (не использовался); (2) диф собранного CSS — `postcss-nesting` 14 (edition `2024-02`) оборачивает сложные родительские селекторы в `:is()`, специфичность и порядок правил не изменились, принято как есть (откат: `features: { 'nesting-rules': { edition: '2021' } }` в `postcss.config.ts`); (3) полный `npm ls` показывает `invalid` для `webpack-dev-server@6` из-за вложенного `@pmmmwh/react-refresh-webpack-plugin@0.5.17` в Storybook 7 (optional peer, на установку не влияет) — уйдёт на этапе 7; (4) удалён `@types/dotenv-webpack` — dotenv-webpack 9 поставляет собственные типы. Размеры чанков идентичны этапу 1, набор падающих тестов = baseline. HMR в браузере — за владельцем. |
| 3. Тестовая инфраструктура | [x] | `feature/YH-2415` (не закоммичено) | Jest 30.5, happy-dom 20.14, RTL 16.3 + `@testing-library/dom` 10.4, jest-dom 7.0, `@types/jest` 30, `jest-environment-jsdom` 30 (оставлен как запасное окружение). happy-dom остался основным окружением — все 56 наборов зелёные без перехода на jsdom. Полифиллы: `undici` и `web-streams-polyfill` удалены; `jest.polyfill.ts` содержит только проброс нативного `BroadcastChannel` из `node:worker_threads` (msw создаёт канал при импорте, happy-dom его не экспортирует); из `jestSetup.ts` убраны моки `matchMedia`/`BroadcastChannel`/`setImmediate` — нативные в happy-dom 20 / Node 22. Явный `transform` для `.mjs` всё ещё нужен (дефолтный паттерн Jest 30 не покрывает `.mjs` → `rettime` из msw). Починены 7 baseline-наборов — во всех случаях устарели тесты, компоненты не менялись: `Stepper` (с YH-1648 переход назад по степперу запрещён), `Modal` (класс `variant-*-modal`), `KeywordInput` (testid чипа `label_text`/`Chip_icon`), `LanguageSwitcher` (компонент стал `Switch`, проверка через `role="switch"` и `i18nForJest`), `AuthLayoutSkeleton` (проверка через `role="complementary"` и `Loader_Wrapper`), `SkillSelect` (с YH-1601 запрос скипается без специализации → `withSpecialization: false` в дефолтных пропсах), `SpecializationSelect` (мок хука возвращал массив вместо `{ data: [...] }` после YH-1976). Итог: 56/56 наборов, 555/555 тестов, `--detectOpenHandles` чисто, консоль без warning'ов; coverage 9.29% → 9.59%. Шаг `Unit tests` в `pr-checks.yml` включён. Чанки production-сборки байт-в-байт равны этапу 1. Полный `npm ls` больше не показывает `invalid` (см. отклонение (3) этапа 2). Ручная проверка в браузере — за владельцем. |
| 4. React 19 | [x] | `feature/YH-2415` (не закоммичено) | react/react-dom/@types 19.3.0, `@hookform/resolvers` 5.9.1, `react-calendar` 6.0.1 (ESM-only; классы/пропсы `EventCalendar` без изменений), `react-slick` 0.31.0, `slick-carousel`/`react-cropper` без изменений. **Отклонение (1): `overrides` в `package.json`** для `@storybook/{blocks,addon-essentials,addon-links,addon-onboarding,react,react-webpack5}` → `react: $react`, `react-dom: $react-dom` — Storybook 7.6 декларирует peer `react ^16.8 \|\| ^17 \|\| ^18` и без этого `npm install`/`npm ci` падает с ERESOLVE (все прикладные библиотеки React 19 уже поддерживают). **Убрать на этапе 7.** Побочный эффект: полный `npm ls` показывает `invalid` — ложные срабатывания npm на переопределённых рёбрах (`react-dom@19.3.0 invalid: "^19.3.0"`) плюс транзитивные peers внутри SB7/loki (`react-remove-scroll` → `@types/react ^18`, `ink` → `react-reconciler ^17`); `npm ls --depth=0` чистый, `npm ci` без флагов проходит. Codemod `types-react-codemod preset-19` — 21 файл, результат отревьюен и поправлен руками: отдельные `import type { JSX } from "react"` перенесены в общий импорт, `ReactElement<any>` в `Toast.test.tsx` → `ReactElement`, сломанные табы в `FullPassedQuizzesItem` восстановлены, `useRef(undefined) as MutableRefObject` → `useRef<HTMLLIElement>(null)` + типы `useInfiniteScroll` переведены на `RefObject<T \| null>`. Рецепт `codemod react/19/migration-recommended` переименован в реестре в `react-19-migration-recipe` — прогнан, 0 изменений. Ручные правки под типы React 19: `CheckboxProps` → `Omit<HTMLAttributes, 'onToggle'>` (конфликт с новым нативным `onToggle: ToggleEventHandler`; проп вынесен из spread на `<input>` — ни один потребитель его не передавал, поведение не изменилось); `Range.handleInput` → `FormEvent` + `currentTarget` (`onInput` теперь `InputEventHandler`); `PopoverFabric` → `isValidElement<React.HTMLProps<HTMLElement>>(children)` (`props` стал `unknown`); Storybook-декораторы `Store/Route/StyleDecorator` типизированы как `Decorator` из `@storybook/react` вместо `StoryFn` (SB7 `AnnotatedStoryFn` с 2 обязательными аргументами не является валидным JSX-компонентом в `@types/react@19`). `@hookform/resolvers` 5 — 0 ошибок типов без правок (типы форм уже выведены из схем). **Отклонение (2):** в `npm run build` и `storybook:build` появились 2 warning'а `export 'act' was not found in 'react'` из `@testing-library/react` — production-код (`features/theme/.../themeUtils.ts`) импортирует баррель `@/shared/libs`, который реэкспортирует `./jest` (`renderComponent`); модуль попадает в граф webpack, но tree-shaking его вырезает — в собранных чанках `@testing-library` отсутствует (проверено grep). Рекомендация отдельной задачей: убрать `export * from './jest'` из барреля и импортировать тест-хелперы из `@/shared/libs/jest` (~36 тестовых файлов). Чанки (байты, vs этап 1): `runtime` 8019, `react` 218801 (+56% — сам React 19.3: `react-dom-client.production.js` 625 KB unminified против ~130 KB min у 18), `text-editor` 294183 (=), `core` 346888 (=), `ui` 79273 (−11%, react-calendar 6 ESM), `vendors` 651489 (≈), `main` 793254 (≈), `css/main` 114715 (=). Итог чеклиста: `npm ci` без флагов, `tsc` 0 ошибок без `any`/`@ts-expect-error`, ESLint 0 ошибок / 173 warnings (=), Stylelint 0, steiger 0 / 20 warnings (=), prettier чистый, 56/56 наборов, 555/555 тестов, `--detectOpenHandles` чисто, React-warning'ов в выводе тестов нет, `npm run build` и `storybook:build` зелёные, `npm run dev` → `compiled successfully`. Ручной smoke в браузере (формы с `yupResolver`, TextEditor, Popover/Dropdown, Slider, Calendar, ImageLoader/cropper, Toaster, Monaco, `SentryErrorBoundary`, HMR) — за владельцем. |
| 5a. react-router 7 | [x] | `feature/YH-2415` (не закоммичено) | `react-router-dom` 7.18.3 (`react-router` 7.18.3 транзитивно). Future-флаги на v6 не включались — сразу v7, флаги стали дефолтом. Массовый rename импортов на `react-router` не делался. В `splitChunks.cacheGroups.core` добавлен `react-router` (иначе код уходит в `vendors`). Splat-роуты только `path: '*'` (404) — риск `v7_relativeSplatPath` низкий. `BrowserRouter` в Storybook-декораторе и `useBlocker` без изменений. Импорты из `react-router-dom` сохранены. |
| 5b. i18next 26 / react-i18next 17 | [x] | `feature/YH-2415` (не закоммичено) | i18next 26.4.2, react-i18next 17.0.14, detector 8.2.1, http-backend 4.0.2. В `i18n.ts` добавлено `react.bindI18n: 'languageChanged languageChanging'` — иначе смена языка в v17 не триггерит Suspense и возможны мигания ключей. Типы `t()` без ошибок (414 `useTranslation`, 1 `<Trans>`). **Отклонение:** `overrides.storybook-react-i18next` → `i18next`/`react-i18next`/`i18next-http-backend` с корня — peer у 3.3.1 только до i18next ^25 / react-i18next ^15 / http-backend ^3; без override `npm ci` падает с ERESOLVE. **Убрать на этапе 7.** |
| 5c. Sentry 10 | [x] | `feature/YH-2415` (не закоммичено) | `@sentry/react` 10.74.0. Используемые API без изменений. `beforeSend` переписан иммутабельно (новый `event`/`request`/`extra` вместо мутации) — типы `event.request` в 10.x ужесточены. `SentryRouteTracker` без изменений. Ручная проверка DSN — за владельцем. |
| 5d. date-fns 4 | [x] | `feature/YH-2415` (не закоммичено) | date-fns 4.4.0. Код не менялся: `format`/`parseISO`/`differenceIn*`/`formatDate` (в runtime по-прежнему алиас `format`) совместимы. `tsc` 0 ошибок. |
| 5e. tiptap 3 | [x] | `feature/YH-2415` (не закоммичено) | Все `@tiptap/*` 3.31.3. Добавлены `@tiptap/core`, `@tiptap/pm`, `@tiptap/extensions`, `@floating-ui/dom`; удалены `@tiptap/extension-character-count`/`extension-code`/`extension-strike`/`extension-underline` (Code/Underline/Strike теперь из StarterKit; CharacterCount из `@tiptap/extensions`). `link: false` в StarterKit — Link не было в v2, поведение вставки URL не меняем. `shouldRerenderOnTransaction: true` (тулбар читает `editor.isActive`/`can()`). BubbleMenu: импорт `@tiptap/react/menus`, `tippyOptions` → Floating UI `options`. ProseMirror — `@tiptap/pm/state`/`model`. **Отклонение (1):** в `tsconfig.paths` маппинг `@tiptap/react/menus` → `node_modules/@tiptap/react/dist/menus/index.d.ts` — `moduleResolution: node` не читает `exports`; webpack 5 резолвит `./menus` сам. **Убрать на этапе 6d** (`bundler`). **Отклонение (2):** regex `text_editor` — `prosemirror` заменён на `prosemirror-[^\\/]+`, иначе hoisted `prosemirror-view`/`model` уходили в `vendors`. Итог чеклиста 5a–5e: `npm ls --depth=0` чистый, `tsc` 0, ESLint 0 ошибок / 173 warnings (=), Stylelint 0, steiger 0 / 20 warnings (=), prettier чистый, 56/56 наборов, 555/555 тестов, `build` и `storybook:build` зелёные (2 warning'а `act` — отклонение этапа 4). Чанки (байты, vs этап 4): `runtime` 8021, `react` 218801 (=), `text-editor` 599848 (+tiptap 3 и prosemirror в своей группе), `core` 609509 (+react-router 7 ~367 KiB и Sentry 10), `ui` 83437, `vendors` 217398 (−router/−prosemirror), `main` 793519 (≈), `css/main` 114715 (=). Ручной smoke (sidebar/редиректы/`LeavingPageBlocker`/фильтры, смена языка/`Trans`, Sentry DSN, даты/календарь, TextEditor: тулбар, счётчик, code block, undo/redo) — за владельцем. |
| 6a. ESLint 10 flat config | [ ] | | |
| 6b. Stylelint 17 | [ ] | | |
| 6c. Прочий тулинг | [ ] | | |
| 6d. TypeScript 6 | [ ] | | |
| 7. Storybook 10 | [ ] | | |

---

## 12. Справочник: текущие и целевые версии (на 14.09.2026)

| Пакет | Current | Latest | Этап |
|---|---|---|---|
| react / react-dom | 18.3.1 | 19.3.0 | 4 |
| @types/react / @types/react-dom | 18.3.x | 19.3.0 | 4 |
| react-router-dom | 6.30.1 | 7.18.3 | 5a |
| @reduxjs/toolkit | 2.8.2 | 2.12.0 | 1 |
| react-redux | 9.2.0 | 9.3.0 | 1 |
| react-hook-form | 7.56.4 | 7.88.0 | 1 |
| @hookform/resolvers | 3.10.0 | 5.9.1 | 4 |
| yup | 1.6.1 | 1.7.1 | 1 |
| i18next | 23.16.8 | 26.4.2 | 5b |
| react-i18next | 14.1.3 | 17.0.14 | 5b |
| i18next-browser-languagedetector | 7.2.2 | 8.2.1 | 5b |
| i18next-http-backend | 2.7.3 | 4.0.2 | 5b |
| @sentry/react | 8.55.0 | 10.74.0 | 5c |
| @tiptap/* | 2.12 / 2.27 | 3.31.3 | 1 (2.27), 5e (3.x) |
| date-fns | 3.6.0 | 4.4.0 | 5d |
| react-calendar | 5.1.0 | 6.0.1 | 4 |
| react-slick | 0.30.3 | 0.31.0 | 4 |
| @floating-ui/react | 0.27.9 | 0.27.20 | 1 |
| msw | 2.8.6 | 2.15.0 | 1 |
| dompurify | 3.2.7 | 3.4.15 | 1 |
| monaco-editor | 0.55.1 | 0.56.0 | 1 |
| webpack | 5.99.9 | 5.111.0 | 1 |
| webpack-cli | 5.1.4 | 7.2.3 | 2 |
| webpack-dev-server | 4.15.2 | 6.0.0 | 2 |
| css-loader | 6.11.0 | 7.1.5 | 2 |
| style-loader | 3.3.4 | 4.0.0 | 2 |
| babel-loader | 9.2.1 | 10.1.1 | 2 |
| postcss-preset-env | 9.6.0 | 11.5.3 | 2 |
| react-refresh | 0.14.2 | 0.19.0 | 2 |
| jest / jest-environment-jsdom | 29.7.0 | 30.5.1 | 3 |
| happy-dom / @happy-dom/jest-environment | 15.7.4 | 20.14.5 | 3 |
| @testing-library/react | 14.3.1 | 16.3.3 | 3 |
| @testing-library/jest-dom | 6.6.3 | 7.0.1 | 3 |
| eslint | 8.57.1 | 10.10.0 | 6a |
| @typescript-eslint/* → typescript-eslint | 7.18.0 | 8.70.0 | 6a |
| eslint-plugin-react-hooks | 4.6.2 | 7.1.1 | 6a |
| eslint-plugin-boundaries | 4.2.2 | 7.2.0 | 6a |
| stylelint | 15.11.0 | 17.15.0 | 6b |
| stylelint-config-standard | 34.0.0 | 40.0.0 | 6b |
| stylelint-order | 6.0.4 | 8.1.1 | 6b |
| lint-staged | 15.5.2 | 16.4.0 | 6c |
| @commitlint/* | 19.5.0 | 21.2.2 | 6c |
| steiger / @feature-sliced/steiger-plugin | 0.5.11 / 0.5.7 | 0.6.0 / 0.7.0 | 6c |
| typescript | 5.9.3 | 7.0.2 (цель — 6.x) | 6d |
| @types/node | 20.17.52 | 26.x (цель — 22.x) | 0 |
| storybook и @storybook/* | 7.6.20 | 10.6.0 | 7 |
| storybook-react-i18next | 3.3.1 | 10.1.2 | 7 |
| loki | 0.34.0 | 0.35.1 | 6c / 7 |
