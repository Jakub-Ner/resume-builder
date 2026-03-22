# Resume Workspace (Fork of astro-resume)

This project is a personal fork of [astro-resume](https://github.com/EmaSuriano/astro-resume) used to generate role-specific resumes from Markdown pages.

## Local Workflow (Preview -> Print -> PDF)

1. Install dependencies:

```bash
npm i
```

2. Start the development server:

```bash
npm run dev
```

3. Open the resume route in your browser (for example, `http://localhost:4321/ai-full-stack`).
4. Review the continuous page preview (it is intentionally shown without hard page separation).
5. Press `Ctrl+P` (or `Cmd+P` on macOS) in the browser.
6. Use print preview to verify page splits and spacing.
7. Choose **Save as PDF** and export your final resume.

(Alternative) Generate a PDF directly from the command line while server is running, it would be saved in out/:

```bash
npm run generate-pdf
```


## Where to Edit Personal Data

Update identity/contact values in:

- `src/constants/cv.ts`

This file controls the name and top header links shown on resume pages.

## Where to Put Resume Content

Add or edit resume pages in:

- `src/pages/`

Each Markdown file in this directory becomes a route (for example, `src/pages/ai-full-stack.md` -> `/ai-full-stack`).

## Where to Keep AI Context

Store private notes, source material, and helper context in:

- `context/`

These files are intended as local inputs for AI-assisted CV tailoring.

## Privacy Defaults

This repository ignores personal resume pages and context files via `.gitignore` so your local content does not get committed by default.
