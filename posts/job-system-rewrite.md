---
title: Rewriting the engine job system
date: 2026-10-12
summary: Moving from one thread per system to a work-stealing job queue, and what broke along the way.
tags: [engine, c++, threading]
---

Open with what you set out to do and why. One short paragraph is enough.

## What I tried

The approach, with a code snippet or diagram if it helps:

```cpp
void JobQueue::Push(Job* job) {
    const uint32_t b = m_bottom.load(std::memory_order_relaxed);
    m_jobs[b & kMask] = job;
    m_bottom.store(b + 1, std::memory_order_release);
}
```

## What I learned

- Results and numbers
- What surprised you
- What you would do next

You can also link to things, like [the project's source](https://github.com/MegaRGJ).
