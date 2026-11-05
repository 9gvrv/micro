const repositoryUrl = 'https://github.com/9gvrv/second-brain';

export default function App() {
  return (
    <div className="page">
      <header className="site-header">
        <div className="identity">
          <span className="wordmark">Micro</span>
          <span className="descriptor">AI prototyping agent</span>
        </div>
        <a
          className="repo-link"
          href={repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </header>

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <h1 id="intro-title">
            Idea in.{' '}
            <br />
            App out.
          </h1>
          <p className="lead">
            Micro turns ideas into working web prototypes through a simple
            conversation.
          </p>
          <p className="intro-copy">
            Describe an application in Mattermost. Micro connects to an existing
            coding agent through Switch, which builds a runnable application that
            you can preview and refine through conversation.
          </p>
        </section>

        <section className="document-section" aria-labelledby="how-title">
          <h2 id="how-title">How it works</h2>
          <ol className="steps">
            <li className="step">
              <span className="step-number" aria-hidden="true">
                01
              </span>
              <div>
                <h3>Describe</h3>
                <p>Send your application idea through Mattermost.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-number" aria-hidden="true">
                02
              </span>
              <div>
                <h3>Build</h3>
                <p>A coding agent creates the application using suitable templates.</p>
              </div>
            </li>
            <li className="step">
              <span className="step-number" aria-hidden="true">
                03
              </span>
              <div>
                <h3>Refine</h3>
                <p>Preview, test and request changes through the same conversation.</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="document-section" aria-labelledby="system-title">
          <h2 id="system-title">Under the hood</h2>
          <p className="flow">
            <span>Mattermost</span>
            <span className="flow-arrow" aria-hidden="true">
              {' → '}
            </span>
            <span className="flow-switch">Switch</span>
            <span className="flow-arrow" aria-hidden="true">
              {' → '}
            </span>
            <span>Coding Agent</span>
            <span className="flow-arrow" aria-hidden="true">
              {' → '}
            </span>
            <span>Generated App</span>
            <span className="flow-arrow" aria-hidden="true">
              {' → '}
            </span>
            <span>Verification</span>
          </p>
          <p className="section-copy">
            Switch is the bridge between the communication platform and the
            coding agent. Micro uses the existing agent and tooling rather than
            rebuilding them.
          </p>
        </section>

        <section className="document-section" aria-labelledby="example-title">
          <h2 id="example-title">Example</h2>
          <figure className="prompt">
            <figcaption>Example prompt</figcaption>
            <blockquote>
              “Build me a Pomodoro timer with session tracking and dark mode.”
            </blockquote>
          </figure>
          <p className="section-copy">
            Micro builds an actual runnable application, not just a mockup or a
            code suggestion. The result can be opened, tested and changed through
            the same conversation.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <p>Built to turn ideas into something you can actually run.</p>
        <a
          className="repo-link"
          href={repositoryUrl}
          target="_blank"
          rel="noreferrer"
        >
          GitHub repository
        </a>
      </footer>
    </div>
  );
}
