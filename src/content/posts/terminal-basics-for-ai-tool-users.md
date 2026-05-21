---
title: "Terminal Basics for AI Tool Users"
description: "You don't need to learn the whole terminal. Here are the five commands you actually need to install AI agent skills and navigate your file system — nothing more."
pubDatetime: 2026-05-20T14:00:00Z
tags:
  - basics
  - terminal
  - claude
  - workflow
  - btbuer
featured: false
---

Installing an AI skill requires typing a few commands in the terminal. That's it. You don't need to become a developer — you just need five commands and one concept. This page covers exactly that.

## Opening the Terminal

**Mac**: Press `Cmd + Space`, type `Terminal`, hit Enter.

**Windows**: Press `Win + R`, type `cmd`, hit Enter. Or search for "PowerShell" in the Start menu.

You'll see a blinking cursor waiting for input. Everything below is typed here.

---

## The One Concept: Where You Are

The terminal always has a "current location" — a folder you're standing in. Every command you run happens relative to that location. Before doing anything, it helps to know where you are.

```bash
pwd
```

`pwd` stands for "print working directory." It prints your current location. On a Mac it might show something like `/Users/yourname`. That's your home folder.

---

## The Five Commands

### `~` — Your Home Folder

`~` is shorthand for your home folder. On Mac it means `/Users/yourname`. On Linux it means `/home/yourname`.

You'll see it in skill install instructions like:

```bash
~/.claude/skills/
```

That path means: your home folder → hidden folder called `.claude` → folder called `skills`. You don't need to type out the full path — `~` always works as a shortcut.

---

### `ls` — List What's Here

```bash
ls
```

Lists the files and folders in your current location. Like opening a folder in Finder and seeing what's inside.

```bash
ls ~/.claude/skills/
```

Lists what's inside the `skills` folder specifically. Useful for checking if a skill was installed correctly.

---

### `cd` — Move to a Folder

```bash
cd ~/Documents
```

`cd` stands for "change directory." This moves you into the `Documents` folder inside your home folder.

```bash
cd ..
```

`..` means "go up one level." So if you're in `~/Documents/Projects`, typing `cd ..` takes you back to `~/Documents`.

```bash
cd ~
```

Takes you straight back to your home folder from anywhere.

---

### `mkdir` — Create a Folder

```bash
mkdir ~/.claude/skills/session-summary
```

`mkdir` stands for "make directory." This creates a new folder called `session-summary` inside `~/.claude/skills/`.

```bash
mkdir -p ~/.claude/skills/session-summary
```

The `-p` flag means "create any missing folders along the way." If `.claude/` or `skills/` don't exist yet, this creates them automatically. Always use `-p` when following skill install instructions — it's safer.

---

### `cp` — Copy a File

```bash
cp session-summary-skill.md ~/.claude/skills/session-summary/SKILL.md
```

`cp` copies a file from one location to another. Here it copies `session-summary-skill.md` (in your current folder) to `~/.claude/skills/session-summary/SKILL.md`.

The format is always: `cp [source] [destination]`

> **Note**: `cp` assumes the file you're copying (`session-summary-skill.md`) is in the folder you're currently in. If you just downloaded it, `cd` to your Downloads folder first:
>
> ```bash
> cd ~/Downloads
> cp session-summary-skill.md ~/.claude/skills/session-summary/SKILL.md
> ```

---

## Putting It Together

Here's the full sequence to install a skill file you downloaded:

```bash
cd ~/Downloads
mkdir -p ~/.claude/skills/session-summary
cp session-summary-skill.md ~/.claude/skills/session-summary/SKILL.md
ls ~/.claude/skills/session-summary/
```

The last `ls` confirms the file is there. You should see `SKILL.md` printed back.

---

## If Something Goes Wrong

**"No such file or directory"** — the path doesn't exist. Check for typos, or use `mkdir -p` to create it.

**"Permission denied"** — you don't have access to that folder. This is rare for your own home folder. Try adding `sudo` before the command (it will ask for your password).

**The command did nothing** — that's usually fine. `mkdir` and `cp` are silent when they succeed. Run `ls` to confirm.

---

That's genuinely all you need. Once you've installed a skill, you won't need these commands again until you install the next one.

→ Ready to install? See [How to Install Skills in Claude Code and Hermes](/posts/how-to-install-ai-agent-skills/)
