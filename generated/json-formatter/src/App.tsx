import { useState } from 'react';
import { Button } from './components/Button';

export default function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    setError(null);
    setCopied(false);

    const trimmed = input.trim();
    if (!trimmed) {
      setError('Please enter some JSON to format.');
      setOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(trimmed);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid JSON format.';
      setError(`Invalid JSON: ${message}`);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError('Failed to copy to clipboard.');
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
    setCopied(false);
  };

  return (
    <main className="shell">
      <section className="card card--wide">
        <p className="eyebrow">Utility</p>
        <h1>JSON Formatter</h1>
        <p className="lede">
          Paste raw JSON below to validate, format with 2-space indentation, and copy to clipboard.
        </p>

        <div className="editor-grid">
          <div className="editor-panel">
            <label htmlFor="json-input" className="panel-label">
              Input JSON
            </label>
            <textarea
              id="json-input"
              className="code-textarea"
              placeholder='e.g. {"name":"Micro","active":true,"tags":["react","vite"]}'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={12}
              spellCheck={false}
            />
          </div>

          <div className="editor-panel">
            <label htmlFor="json-output" className="panel-label">
              Formatted Output
            </label>
            <textarea
              id="json-output"
              className="code-textarea code-textarea--output"
              placeholder="Formatted JSON will appear here..."
              value={output}
              readOnly
              rows={12}
              spellCheck={false}
            />
          </div>
        </div>

        {error && (
          <div className="alert alert--error" role="alert">
            {error}
          </div>
        )}

        <div className="actions-row">
          <Button onClick={handleFormat}>Format</Button>
          <Button
            variant="secondary"
            onClick={handleCopy}
            disabled={!output}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="secondary"
            onClick={handleClear}
            disabled={!input && !output && !error}
          >
            Clear
          </Button>
        </div>
      </section>
    </main>
  );
}
