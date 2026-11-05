import { useEffect, useState } from 'react';
import { Button } from './components/Button';

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

type Phase = 'work' | 'break';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('work');
  const [secondsLeft, setSecondsLeft] = useState(WORK_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((remaining) => Math.max(remaining - 1, 0));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (secondsLeft > 0) return;

    setIsRunning(false);

    if (phase === 'work') {
      setCompletedSessions((count) => count + 1);
      setPhase('break');
      setSecondsLeft(BREAK_SECONDS);
    } else {
      setPhase('work');
      setSecondsLeft(WORK_SECONDS);
    }
  }, [phase, secondsLeft]);

  const phaseLabel = phase === 'work' ? 'Work session' : 'Break session';
  const phaseDuration = phase === 'work' ? WORK_SECONDS : BREAK_SECONDS;
  const statusText = isRunning
    ? phase === 'work'
      ? 'Focus in progress'
      : 'Break in progress'
    : secondsLeft === phaseDuration
      ? phase === 'work'
        ? 'Ready for a focus session'
        : 'Ready for a break'
      : 'Paused';

  function resetTimer() {
    setIsRunning(false);
    setPhase('work');
    setSecondsLeft(WORK_SECONDS);
    setCompletedSessions(0);
  }

  return (
    <main className={`shell shell--${phase}`}>
      <section className="timer-card">
        <header>
          <p className="eyebrow">Focus timer</p>
          <div className="title-row">
            <h1>Pomodoro</h1>
            <span className={`phase phase--${phase}`}>{phaseLabel}</span>
          </div>
        </header>

        <p
          className="timer"
          role="timer"
          aria-label={`${phaseLabel}: ${formatTime(secondsLeft)} remaining`}
        >
          {formatTime(secondsLeft)}
        </p>

        <p className="status" aria-live="polite">
          {statusText}
        </p>

        <div className="controls">
          <Button onClick={() => setIsRunning((running) => !running)}>
            {isRunning ? 'Pause' : 'Start'}
          </Button>
          <Button variant="secondary" onClick={resetTimer}>
            Reset
          </Button>
        </div>

        <footer className="stats">
          <span>Sessions completed</span>
          <strong>{completedSessions}</strong>
        </footer>
      </section>
    </main>
  );
}
