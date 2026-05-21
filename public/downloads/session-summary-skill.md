---
name: session-summary-generator
description: Create a comprehensive session summary for seamless agent handoff. Generates a .session_summary.md that lets any new AI session resume work with zero context loss — works with Claude, Claude Code, Hermes, or any LLM-based agent.
triggers:
  - "summarize"
  - "save state"
  - "session summary"
  - "help me document"
  - session ending with incomplete work
  - milestone reached
---

# session-summary-generator

Create a comprehensive, self-contained session summary that enables any new AI session — regardless of model or agent framework — to seamlessly resume work without context loss.

## When to Use

After any significant milestone, debugging session, or multi-step workflow. Also useful whenever you notice the agent's quality starting to drift — that's often a sign to start a fresh session rather than push further into a degraded one. A summary file makes starting fresh practical: zero re-explaining required.

## Triggers

- Task spans 5+ tool calls
- User asks for a summary or status record
- Complex multi-phase work is in progress but session is ending
- A bug was solved and the fix should be documented for the record

## Output Location

Create a `.session_summary.md` file in the project's root directory. For example:

- `/Users/you/projects/my-project/.session_summary.md`
- Or wherever the project root is

## Summary Structure

```markdown
# Session Summary — [Project Name]

**Created**: YYYY-MM-DD HH:MM
**Last Agent**: Claude (claude-sonnet-4-x / claude-opus-4-x)

---

## Project Overview
[2-3 sentences: what this project is, its purpose, tech stack]

## Current Active Work
[What is currently in progress RIGHT NOW — exact file, line, job ID, state]

## Goal
[The specific goal this session was working toward]

## Completed Actions (Chronological)

1. **[Action name]** — [1 sentence: what was done and why]
   - File: `/full/path/to/file`
   - Lines: NNN
   - Result: [outcome]

2. **[Action name]** — [what/why/result]
   ...

## Current State
[Exactly where work stopped — job ID, line number, progress %, etc.]

## Key Files Modified
| File | Purpose | Last Modified |
|------|---------|---------------|
| `/path/a.py` | What it does | YYYY-MM-DD |
| `/path/b.js` | What it does | YYYY-MM-DD |

## Known Issues / Blockers
- **[Issue name]**: [description], [status/attempted fix]
- ...

## Next Steps (Priority Order)
1. [Next immediate action — exact command or file]
2. [Next action]
3. ...

## Critical Context
- Service running: [PID, port, status]
- API keys: [REDACTED — never expose actual keys]
- Restart command: [exact command to bring service back up]
- Backup files: [/path/to/backup, description]

## Environment & Config
- [Key environment variables required (values REDACTED)]
- [Any non-obvious setup steps: e.g., "must run `source .env` first"]
- [Ports used by this project]

## Git / Version Control
- [What branch we're on]
- [Uncommitted changes, if any]
- [Push rules: what can be pushed vs. what must stay local]
- E.g. "Never push `.env` or any file containing credentials"

## Resolved in This Session
- [Bug/issue]: root cause → fix applied
- ...

## User Preferences & Conventions
- [Any preferences learned during the session]
- [E.g. "User prefers to run git commands themselves"]
- [E.g. "User wants brief responses, no bullet walls"]
```

## How to Generate

1. **Review the session history** — scan tool calls and results for what was actually done
2. **Check current state** — service PID, job status, recently modified files
3. **Read key modified files** to document accurate line numbers and content
4. **Write the summary** to `.session_summary.md` in the project root
5. **Commit any uncommitted fixes** before the session ends — don't leave fixes in limbo

## How to Resume from a Summary

At the start of a new session, tell Claude:

> "Read `.session_summary.md` and resume from where we left off."

Claude will read the summary file and pick up the work immediately — no re-explaining needed.

## Rules

- **NEVER expose API keys** — write `[REDACTED]` or `***` in their place
- Include **exact file paths** — not relative, not "the file we edited"
- Include **exact line numbers** for important changes
- Include **restart commands** for any running services
- **Language** — match the user's language preference (English or otherwise)
- Make it **self-contained** — a new agent with zero context should be able to read this and resume immediately

## Tips

- If the user is mid-task (job running, background process, etc.), note the exact job ID and current progress so the new session can check status immediately
- Include `kill -9 PID` commands if services need to be force-stopped and restarted
- If there are backup files created during the session, note their exact paths and what they contain
- Add a "Conversation summary" section if there were important decisions or discussions worth preserving
- Note whether the user wants Claude to execute git operations directly or prefers to do it themselves
- If tests pass locally but fail on CI, document the discrepancy and any known causes
