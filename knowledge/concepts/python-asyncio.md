---
id: python-asyncio
title: Python Asyncio
type: concept
tags:
  - python
  - asyncio
  - concurrency
created: "2026-11-05"
updated: "2026-11-05"
related:
  - "./javascript-event-loop.md"
  - "../topics/python.md"
sources:
  - title: "asyncio — Asynchronous I/O"
    url: https://docs.python.org/3/library/asyncio.html
    author: "Python Software Foundation"
    accessed: "2026-11-05"
  - title: "Developing with asyncio"
    url: https://docs.python.org/3/library/asyncio-dev.html
    author: "Python Software Foundation"
    accessed: "2026-11-05"
  - title: "Coroutines and tasks"
    url: https://docs.python.org/3/library/asyncio-task.html
    author: "Python Software Foundation"
    accessed: "2026-11-05"
  - title: "PEP 3156 — Asynchronous IO Support Rebooted: the 'asyncio' Module"
    url: https://peps.python.org/pep-3156/
    author: "Guido van Rossum"
    published: "2012"
    accessed: "2026-11-05"
demo: true
---

# Python Asyncio

> **Demonstration note.** This note is part of the MVP example set. It demonstrates the note schema and is not a personal knowledge entry. Replace or remove it only with human approval when the knowledge base goes into real use.

## Summary

`asyncio` is Python's standard-library framework for concurrent code built on `async`/`await` and an event loop. It provides cooperative multitasking on a single thread: coroutines voluntarily suspend at `await` points, allowing other tasks to run while one waits for I/O.

`asyncio` is designed primarily for I/O-bound concurrency. It does not make CPU-bound Python code run in parallel by itself.

## Key facts

- A coroutine is declared with `async def`. Calling it returns a coroutine object; the coroutine does not run until it is awaited or scheduled as a task.
- `await` suspends the current coroutine and yields control to the event loop. It does not block the loop while the awaited operation is pending.
- `asyncio.run(coro)` is the usual entry point. It creates an event loop, runs the coroutine to completion, finalizes asynchronous generators, shuts down the default executor, and closes the loop. It cannot be called while another event loop is running in the same thread.
- A `Task` wraps a coroutine and schedules it on the loop. `asyncio.gather()` runs awaitables concurrently and collects their results.
- `asyncio.TaskGroup` (Python 3.11+) provides structured concurrency: tasks created in the group are awaited together, and a failure cancels the remaining tasks and raises an exception group.
- `asyncio.sleep()` is non-blocking. In contrast, `time.sleep()`, synchronous network calls, synchronous file I/O, and long CPU-bound loops block the entire event loop.
- `asyncio.to_thread()` (Python 3.9+) runs a blocking function in a worker thread. It is useful for blocking I/O. CPU-bound Python code is usually better moved to a process pool or another form of parallelism, because standard CPython threads are constrained by the global interpreter lock.
- Cancellation is cooperative. `Task.cancel()` requests cancellation; the coroutine receives `asyncio.CancelledError` at an await point and should perform cleanup. Code can suppress the exception, so cancellation is not guaranteed unless handled correctly.
- `asyncio.timeout()` (Python 3.11+) provides a context manager for timeouts. `asyncio.wait_for()` is the older alternative.
- An event loop is not thread-safe in general. Cross-thread scheduling requires `loop.call_soon_threadsafe()` or an executor; do not call arbitrary loop methods from another thread.

## Example

```python
import asyncio


async def fetch(name: str, delay: float) -> str:
    await asyncio.sleep(delay)  # stand-in for non-blocking I/O
    return name


async def main() -> None:
    async with asyncio.TaskGroup() as group:
        first = group.create_task(fetch("first", 0.2))
        second = group.create_task(fetch("second", 0.1))

    print(first.result(), second.result())


asyncio.run(main())
```

Both tasks make progress concurrently. The `second` task finishes first, but `TaskGroup` waits for both before the context manager exits.

## Common misconceptions

- **"`asyncio` is multithreading."** It is cooperative concurrency on one event loop. Parallel execution requires threads, processes, or another runtime.
- **"`await` blocks the program."** It suspends only the current coroutine and lets the loop run other work.
- **"Making a function `async` makes it faster."** It changes how the function is scheduled. Blocking work still blocks the loop.
- **"Calling an `async def` function runs it."** It returns a coroutine object. Forgetting to await or schedule it produces a `RuntimeWarning` and no execution.
- **"I can mix blocking libraries freely."** A blocking call inside a coroutine stalls every task on that loop unless it is moved to a thread or process.

## Related notes

- [JavaScript Event Loop](./javascript-event-loop.md) — the browser/Node.js analogue; compare tasks and microtasks with Python's event-loop callbacks.
- [Python](../topics/python.md) — topic index for Python notes.

## Sources

- [asyncio — Asynchronous I/O](https://docs.python.org/3/library/asyncio.html) — Python Software Foundation; accessed 2026-11-05.
- [Developing with asyncio](https://docs.python.org/3/library/asyncio-dev.html) — Python Software Foundation; accessed 2026-11-05.
- [Coroutines and tasks](https://docs.python.org/3/library/asyncio-task.html) — Python Software Foundation; accessed 2026-11-05.
- [PEP 3156 — Asynchronous IO Support Rebooted: the 'asyncio' Module](https://peps.python.org/pep-3156/) — Guido van Rossum, 2012; accessed 2026-11-05.
