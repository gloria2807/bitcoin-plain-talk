# Duolingo-style Bitcoin Learning App — Planning Doc

Status: brainstorm, not yet built. Nothing in this doc has been scaffolded in the codebase yet.

## Goal

A gamified, lesson-based Bitcoin education experience for an African audience, living
alongside the existing glossary in this repo (`bitcoin-plain-talk-web`, Next.js 16 /
React 19 / Tailwind 4).

## Core decisions made so far

- **Content source**: the existing glossary is the seed content. Each glossary term
  becomes a micro-lesson, not a brand-new curriculum written from scratch. This avoids
  a second content-authoring pipeline — reuse what's already in `glossary/` and
  `scripts/generate-glossary.mjs` as the pattern for pulling structured content.
- **Scope for v1**: tiny proof-of-concept. One lesson path (5–10 lessons), no user
  accounts, no backend — progress/streak/XP stored in `localStorage`. Goal is to
  validate the lesson/quiz format works before investing in accounts or a database.
- **Primary differentiator vs. a generic Duolingo clone**: localized examples tied to
  real African use cases (remittances, mobile money comparisons like M-Pesa, saving
  against currency devaluation), not just translated generic Bitcoin content.

## Content model

```
Glossary term
  -> Micro-lesson (1-2 short cards, plain-language explainer)
  -> Quiz (3-5 questions: multiple choice / matching / fill-in-blank)
  -> XP awarded on completion
```

## Suggested curriculum shape (units, not alphabetical glossary order)

1. **Money Basics** — inflation, fiat, scarcity
2. **How Bitcoin Works** — blockchain, mining, halving
3. **Wallets & Keys** — private key, seed phrase, custody
4. **Using Bitcoin Here** — remittances, mobile money comparison, saving against
   currency devaluation

Unit 4 is the localization payoff — it's what makes this different from a translated
international app, not just a language swap.

## Low-connectivity design constraints (important — read before building)

This audience skews toward constrained data plans, feature phones, and intermittent
connectivity. Design decisions should assume this from day one, not retrofit it later:

- **No heavy assets**: skip audio/video and large images even in the POC. Text and
  lightweight illustrations only.
- **Offline-first for the web app**: lessons should be small downloadable bundles that
  cache on first load (PWA / service worker), so a user can complete a quiz offline and
  sync XP/streak when back online. Avoid a chatty per-question API round-trip model —
  it punishes exactly the users this app is for.
- **Client-side state for POC**: no backend round-trips needed for v1 since everything
  lives in localStorage — this is naturally low-bandwidth-friendly, but don't let a
  future backend migration reintroduce chattiness.

## Alternative low-bandwidth channels (future, not part of POC)

These are **not** Next.js features — they require separate infrastructure and should be
scoped as distinct future projects, not folded into the web app build:

### USSD (e.g. `*384*99#` style menus)
- Runs over the GSM signaling channel — zero data cost, works on any feature phone, no
  app install.
- **Cannot be self-hosted.** Shortcodes are carrier-controlled; you need a telco
  aggregator (Africa's Talking, Infobip, Onfon, etc.) that forwards session requests to
  your backend.
- Backend is a stateless webhook: aggregator POSTs `{sessionId, phoneNumber, text}`, you
  respond `CON <menu text>` (continue) or `END <text>` (close session). ~182 characters
  per screen — very terse content only (basic Q&A quizzes, not full lessons).
- Progress must be tracked server-side keyed by phone number, since the phone stores
  nothing between sessions.
- Coverage is fragmented per country/carrier (separate aggregator relationships for
  Kenya/Nigeria/Uganda/etc.), and sessions typically carry a small per-use cost.
- Verdict: legitimate reach channel for feature-phone users, but a distinct
  infrastructure project (telco contracts + session server), not a POC-phase task.

### SMS drip lessons
- One lesson per day via SMS. Works on any phone, no session-timeout pressure like
  USSD, but interaction is closer to one-directional than a true quiz loop.

### WhatsApp
- Very high penetration in Africa, works on minimal data via WhatsApp Business API /
  chatbot. Richer interaction than USSD/SMS, still far lighter than a full app.

## Tech approach for the POC

- New route: `/learn` in the existing Next.js app.
- Lesson data derived from glossary content, following the existing
  `scripts/generate-glossary.mjs` pattern for structured extraction.
- Quiz components as plain React state — no external state library needed at this
  scale.
- All progress (XP, streak, unit completion) in `localStorage`. No accounts, no DB, no
  API routes for v1.

## Open questions for the next session

- Exact mapping of glossary terms to the 4 suggested units (needs a pass over the
  actual glossary content in `glossary/`).
- Visual/gamification details: hearts/lives mechanic on quizzes? progress bar per unit?
  badge system? (Kept minimal for POC — streak + XP + progress bar was the working
  assumption.)
- Whether `/learn` should share the existing brand design system (see
  `docs/` or prior memory: Sora/Manrope fonts, color tokens) — presumably yes, for
  consistency with the rest of the site.
