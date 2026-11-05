---
id: javascript-event-loop
title: JavaScript Event Loop
type: concept
tags:
  - javascript
  - concurrency
  - runtime
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./python-asyncio.md"
  - "../topics/javascript.md"
sources:
  - title: "JavaScript execution model"
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model
    author: "MDN Web Docs"
    accessed: "2026-11-05"
  - title: "HTML Standard — Event loops"
    url: https://html.spec.whatwg.org/multipage/webappapis.html#event-loops
    author: "WHATWG"
    accessed: "2026-11-05"
  - title: "The Node.js event loop"
    url: https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick
    author: "Node.js Project"
    accessed: "2026-11-05"
demo: true
---

# JavaScript Event Loop

> **Demonstration note.** This note is part of the MVP example set. It demonstrates the note schema and is not a personal knowledge entry. Replace or remove it only with human approval when the knowledge base goes into real use.

## Summary

The event loop is the scheduling mechanism that lets a JavaScript agent perform concurrent, non-blocking work while executing JavaScript on one thread at a time. Work arrives as tasks and microtasks; the loop runs a task, drains the microtask queue, and periodically performs rendering or other host work.

The event loop is provided by the host environment, not by the JavaScript language itself. Browsers and Node.js implement related but not identical models.

## Key facts

- The HTML specification defines an event loop for each agent. A browser page normally uses one agent; Web Workers use separate agents and can run in parallel. Within one agent, JavaScript execution is not preempted.
- A **task** (often called a macrotask) is run to completion. Timers, I/O completion, and user-interface events enqueue tasks. `setTimeout(fn, 0)` requests a task with a minimum delay; it does not run `fn` immediately.
- A **microtask** is a short job that runs after the current task and whenever the JavaScript stack empties. Promise reactions, `queueMicrotask()` callbacks, and `MutationObserver` callbacks use the microtask queue.
- The microtask queue is drained completely before the next task runs. Microtasks queued while draining are also processed, so a recursive microtask can starve tasks and rendering.
- In browsers, rendering is not guaranteed after every task. Rendering updates happen when the browser decides an update is due; `requestAnimationFrame()` callbacks run as part of that rendering update, before the paint.
- `async`/`await` does not create a thread. An `await` suspends the current async function and schedules its continuation through the promise machinery, which uses microtasks.
- Node.js has its own event-loop phases (timers, pending callbacks, idle/prepare, poll, check, and close callbacks) plus a `process.nextTick()` queue. Its exact ordering differs from a browser's.

## How it works

1. Synchronous code runs on the call stack until it returns.
2. Completed asynchronous operations and events enqueue tasks or microtasks.
3. When the stack is empty, the loop performs a microtask checkpoint and drains the microtask queue.
4. The loop takes the next task and runs it to completion.
5. Between tasks, the host may update rendering and I/O, then repeat.

A long synchronous computation blocks all of these steps: timers do not fire, promise continuations do not run, and the page cannot render. Web Workers in browsers and `worker_threads` in Node.js provide actual parallelism; the event loop alone provides concurrency, not parallel execution of JavaScript.

## Example

```js
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => console.log("C"));

console.log("D");

// Output: A, D, C, B
```

The synchronous code logs `A` and `D` first. The promise reaction is a microtask, so it runs before the timer task. The `setTimeout` callback runs in a later task.

## Common misconceptions

- **"`setTimeout(fn, 0)` runs immediately."** It queues a task after the current task and its microtasks. The delay is a minimum, not a guarantee.
- **"`async`/`await` creates a new thread."** It uses promises and the event loop on the same thread.
- **"Tasks and microtasks are interchangeable."** Microtasks run to completion before the next task; a flood of microtasks can delay timers and rendering.
- **"The event loop is part of ECMAScript."** ECMAScript defines execution contexts and jobs such as promise jobs; the host environment defines the event loop that integrates them with I/O and rendering.

## Related notes

- [Python asyncio](./python-asyncio.md) — another single-threaded event-loop concurrency model, with different primitives and scheduling rules.
- [JavaScript](../topics/javascript.md) — topic index for JavaScript notes.

## Sources

- [JavaScript execution model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model) — MDN Web Docs; accessed 2026-11-05.
- [HTML Standard — Event loops](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) — WHATWG; accessed 2026-11-05.
- [The Node.js event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick) — Node.js Project; accessed 2026-11-05.
