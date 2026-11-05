import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <article
      className={`rounded-xl border border-slate-200 bg-white p-5 shadow-sm ${className}`.trim()}
    >
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <div className="mt-3">{children}</div>
    </article>
  );
}
