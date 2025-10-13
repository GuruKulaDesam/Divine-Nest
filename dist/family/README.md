# Family Life Microsite

This tiny microsite lives under `public/family` and is a static, client-only representation of the "Family Life App Design Blueprint". It contains:

- An interactive onboarding flow to generate a sample profile (no server required)
- AI prompt scaffolding you can copy to an LLM
- TypeScript data model export

How to open

1. Run your dev server (the main project). By default:

```bash
npm run dev
```

2. Open `http://localhost:3001/family/` (port may vary based on your environment).

Notes

- This is a static microsite for sharing the blueprint and prototyping onboarding flows. It does not wire into the app's Dexie stores or authentication.
- If you want the onboarding to persist to the app's real store, I can wire it into the existing Svelte app's routes and Dexie helpers.
