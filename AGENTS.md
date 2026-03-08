# AGENTS.md

Repository-specific instructions for generating role-specific CV pages.

## Scope

- Applies to the entire repository.
- Primary workflow covered: creating a tailored CV for a specific role.

## Mandatory CV Generation Workflow

When the user asks to create or tailor a CV for any role, the agent MUST follow this sequence.

1. Read `src/pages/index.md` first.
2. Use `src/pages/index.md` as the single source of truth (master GIGA-CV).
3. Select and rewrite content to match the requested role, prioritizing:
   - Work Experience and Projects bullets with clear scope and outcomes
   - Role-relevant keywords, with important role keywords in bold
   - Concise, high-signal phrasing (do not copy the full master CV)
4. Create a new Markdown page in `src/pages/` (never outside this directory for CV pages).
5. Ensure the new page includes frontmatter compatible with this repo:
   - `title`
   - `description`
   - `layout: ../layouts/Minimalist.astro`
   - `pdfLink: resume.pdf`
   - `noIndex: true` (default for tailored/private CV pages)
6. Keep the generated CV focused and ready to render in Astro.

## Output File Rules

- Location: `src/pages/<role-slug>.md`
- Slug format: lowercase kebab-case (for example: `backend-engineer-fastapi.md`).
- Do not overwrite `src/pages/index.md` unless the user explicitly asks to edit the master CV.

## Content Rules

- Preserve factual accuracy from `src/pages/index.md`; do not invent experience.
- Prefer role alignment over exhaustiveness.
- Keep section structure practical for resume scanning (headline, summary, skills, experience, projects, education/publications if relevant).
- Use Markdown that matches existing style in `src/pages/index.md`.

## Validation Checklist (Before Finishing)

- `src/pages/index.md` was read before drafting.
- New file was created under `src/pages/`.
- Frontmatter is present and uses `../layouts/Minimalist.astro`.
- tech keywords like docker are bolded appropriate.
- Content is concise and tailored, not a full copy of the master CV.
- YOU DO NOT RUN ANY build commands
