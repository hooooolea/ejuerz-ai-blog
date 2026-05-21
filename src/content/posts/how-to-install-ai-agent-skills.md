---
title: "How to Install Custom Skills in Your AI Agent"
description: "A skill file does nothing sitting in your Downloads folder. Here's the exact steps to install one in Claude Code, Hermes, or any compatible agent so it actually works."
pubDatetime: 2026-05-20T12:00:00Z
tags:
  - claude
  - hermes
  - workflow
  - ai-tools
featured: false
---

If you downloaded the [session summary skill](/posts/claude-session-summary-skill/) — or any other skill file — here's how to put it to use.

## Claude Code

Skills in Claude Code live in a named folder under `~/.claude/skills/`. The file inside must be called `SKILL.md`.

```bash
mkdir -p ~/.claude/skills/session-summary
cp session-summary-skill.md ~/.claude/skills/session-summary/SKILL.md
```

That's it. The skill loads automatically in your next Claude Code session — no restart needed. You can invoke it directly with `/session-summary`, or Claude will pick it up when you say "summarize the session" or "save state."

To make it available only in one project instead of globally, put it under the project root:

```bash
mkdir -p .claude/skills/session-summary
cp session-summary-skill.md .claude/skills/session-summary/SKILL.md
```

Edits to `SKILL.md` take effect immediately, mid-session.

## Hermes Agent

Hermes stores skills as flat `.md` files under `~/.hermes/skills/`.

```bash
cp session-summary-skill.md ~/.hermes/skills/session-summary.md
```

Verify it's detected:

```bash
hermes skills list
```

Skills take effect in new sessions. If you want it available right now without starting a new chat, add `--now`:

```bash
hermes skills install --now session-summary
```

To install a skill from the Hermes community hub instead of a local file:

```bash
hermes skills install <skill-name>
hermes skills search "summarize"   # browse available skills
```

## Checking it works

In either tool, ask the agent what skills it has access to. In Claude Code: type `/session-summary` and see if it responds. In Hermes: ask "What skills do you have?" or check `hermes skills list`.

If it doesn't show up, double-check the path — the most common mistake in Claude Code is nesting the file one level too deep (`skills/session-summary/subfolder/SKILL.md` instead of `skills/session-summary/SKILL.md`).
