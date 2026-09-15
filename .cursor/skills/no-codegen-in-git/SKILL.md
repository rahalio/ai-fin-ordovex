---
name: no-codegen-in-git
description: >-
  Never commit or push .codegen. Use when staging files, writing .gitignore,
  running git add/commit/push, or copying the codegen scaffold.
---

# Never commit `.codegen`

The `zero-codegen` Python tool lives in `.codegen/` after cloning the scaffold. It is **local-only**.

- `.gitignore` must include `.codegen/`.
- Never `git add .codegen`, never force-add, never push it to GitHub.
- Agents: if a commit would include `.codegen`, stop and unstage it.
