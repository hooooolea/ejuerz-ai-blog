---
title: "Agent Link: Run Multiple AI Agents in Parallel, With Automatic Quality Review"
description: "A single AI agent session handles one thing at a time. Agent Link is an open-source orchestration platform that breaks a big task into subtasks, runs them in parallel across multiple Hermes workers, and automatically audits the results."
pubDatetime: 2026-05-21T08:00:00Z
tags:
  - ai-tools
  - workflow
  - hermes
  - open-source
featured: true
---

> **Work in progress** — Agent Link is under active development. Some features described here may not be fully stable yet. Follow the [repo](https://github.com/hooooolea/agent-link) for updates.

Most AI agent workflows look like this: you give the agent a task, it works through it step by step, and you wait. That's fine for simple tasks. But if you need to process a hundred documents, run a research job across dozens of topics, or execute a complex multi-step pipeline — a single agent session becomes a bottleneck.

[Agent Link](https://github.com/hooooolea/agent-link) is an open-source platform built to solve that. It splits a large task into subtasks, dispatches them to multiple Hermes workers running in parallel, and then runs a separate Review Agent that audits every output and retries anything that doesn't pass quality checks.

## How It Works

The architecture is deliberately simple:

```
Input Files
     ↓
Manager (parse + dispatch)
     ↓
Redis Queue
     ↓
Worker 1   Worker 2   Worker N   (all Hermes agents)
     ↓          ↓          ↓
           Outputs
               ↓
        Review Agent
        ├─ audit quality
        └─ retry failed tasks
               ↓
         final_report.md
```

Three components, each with a clear job:

**Manager** — pure Python, no LLM. It parses your input files, breaks them into chunks, routes chunks to the Redis queue, monitors worker health, and collects results. No AI involved here — just deterministic scheduling.

**Workers** — each one is a Hermes agent session running `hermes chat -q`. The Manager spawns and recycles them based on load. You can set a minimum and maximum pool size, or scale manually via API.

**Review Agent** — an independent Hermes session that reads all worker outputs, flags anything that looks low-quality, and sends failed tasks back into the queue for retry. The final output is a `final_report.md` consolidating everything.

## What You Can Feed It

Agent Link handles three input formats out of the box.

**Text or Markdown files** — split by line count, by a separator string like `---`, or treated as one whole chunk.

**JSON files** — either a root array (each element becomes one task) or a root object (each top-level key becomes one task).

A basic job submission looks like this:

```bash
curl -X POST http://localhost:8001/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "input_path": "data/samples/questions.txt",
    "prompt_template": "Answer concisely:\n\n{content}",
    "split_strategy": "separator",
    "separator": "---",
    "review_enabled": true
  }'
```

Each chunk gets processed by a worker, all in parallel. With `review_enabled: true`, the Review Agent runs after all workers finish.

## DAG Pipelines

Beyond file batches, Agent Link also supports DAG (directed acyclic graph) pipelines — multi-step workflows where later tasks depend on the results of earlier ones.

```bash
python -m parent.main --pipeline scripts/pipeline_example.json
```

This lets you chain agent tasks: for example, a research step that feeds into a synthesis step, which feeds into a formatting step — all orchestrated automatically, with dependencies respected.

## Getting Started

Requirements: Python 3.10+, Docker (for Redis, PostgreSQL, Qdrant).

```bash
# Install dependencies
pip install -r requirements.txt

# Start infrastructure
docker compose up -d

# Start the Manager
python -m manager.main --port 8001

# Start a Worker
python -m worker.main --worker-id worker-1

# Or auto-spawn workers on startup
MIN_WORKERS=2 MAX_WORKERS=8 python -m manager.main
```

Run the full end-to-end test to confirm everything is working:

```bash
bash scripts/run_full_test.sh
```

The test suite covers single tasks, parallel batches, pipeline execution, and worker failover. 42 unit tests, no Docker required for those.

## Why This Matters

The bottleneck in most AI agent workflows isn't the model — it's serialization. One agent, one task at a time. Agent Link treats the agent as a worker unit and scales it horizontally, the same way you'd scale any distributed system.

The Review Agent layer is the other piece that's usually missing. Running tasks in parallel is useful, but without quality auditing you're just generating a lot of unverified output. The retry loop means Agent Link doesn't just run fast — it keeps running until the outputs actually pass.

---

The project is open source under MIT. Code and setup instructions at [github.com/hooooolea/agent-link](https://github.com/hooooolea/agent-link).
