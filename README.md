# MarTech Data Flow Blueprint

An interactive walkthrough of how leads and prospect data move through a B2B MarTech stack, built with React + Vite.

Each flow covers one way a visitor can enter the pipeline (paid ads, off-platform lead gen, third-party vendors, event registration) and lets you flip between two perspectives:

- **Visitor View** — what the visitor actually sees and clicks
- **Systems View** — what's happening under the hood across Marketo, Salesforce, and the rest of the stack, with clickable terms that open plain-English definitions

It also includes a standalone architecture diagram ("The Core Data Flow Engine") and a searchable Glossary of every technical term used throughout.

## Tech stack

Marketo Engage and Salesforce CRM as the primary core stack, alongside tools like Google Tag Manager, LeanData, Zapier, and custom webhooks.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Outputs a static site to `dist/`, ready to deploy (configured for Netlify via `netlify.toml`).
