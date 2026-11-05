import { useState } from 'react';
import { Button } from './components/Button';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="shell">
      <section className="card">
        <p className="eyebrow">Micro template</p>
        <h1>Minimal React</h1>
        <p className="lede">
          A small starting point for a single-purpose application. Replace this
          example with the approved MVP.
        </p>
        <div className="row">
          <Button onClick={() => setCount((value) => value + 1)}>
            Count: {count}
          </Button>
          <Button variant="secondary" onClick={() => setCount(0)}>
            Reset
          </Button>
        </div>
      </section>
    </main>
  );
}
