import { Card } from './components/Card';
import { Header } from './components/Header';
import { Section } from './components/Section';
import { Sidebar } from './components/Sidebar';

const metrics = [
  { label: 'Metric one', value: '12', hint: 'Replace with real data.' },
  { label: 'Metric two', value: '84%', hint: 'Keep values in one place.' },
  { label: 'Metric three', value: '3', hint: 'Remove unused cards.' },
];

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 md:flex-row">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="flex-1 space-y-8 p-4 md:p-8">
          <Section
            id="overview"
            title="Overview"
            description="A responsive grid for the most important information."
          >
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {metrics.map((metric) => (
                <Card key={metric.label} title={metric.label}>
                  <p className="text-3xl font-semibold tracking-tight text-slate-900">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">{metric.hint}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            id="details"
            title="Details"
            description="Use this area for the approved form, table, or list."
          >
            <div className="grid gap-4 lg:grid-cols-2">
              <Card title="Main content">
                <p className="text-sm leading-6 text-slate-600">
                  The main content area is intentionally empty. Add only the
                  functionality required by the approved MVP.
                </p>
              </Card>
              <Card title="Next step">
                <p className="text-sm leading-6 text-slate-600">
                  Replace the placeholder metrics, then update the project
                  README if the run instructions change.
                </p>
              </Card>
            </div>
          </Section>
        </main>
      </div>
    </div>
  );
}
