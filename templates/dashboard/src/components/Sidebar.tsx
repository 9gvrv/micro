const links = [
  { label: 'Overview', href: '#overview' },
  { label: 'Details', href: '#details' },
];

export function Sidebar() {
  return (
    <aside className="w-full shrink-0 border-b border-slate-200 bg-white md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <div className="px-4 py-5 md:px-6">
        <p className="text-lg font-semibold tracking-tight">Micro</p>
        <p className="mt-1 text-xs text-slate-500">Dashboard template</p>
      </div>
      <nav
        aria-label="Primary"
        className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3"
      >
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
