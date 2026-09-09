import Link from "next/link";

export const metadata = { title: "Component Playground" };

const entries = [
  {
    href: "/playground/disclosure",
    label: "Disclosure",
    description:
      "ARIA APG Show/Hide pattern — button with aria-expanded, hidden attribute, Enter/Space toggle.",
    badge: "WAI-ARIA",
  },
  {
    href: "/playground/tabs",
    label: "Tabs",
    description:
      "ARIA APG Tabs pattern — tablist / tab / tabpanel roles, roving tabindex, arrow-key navigation.",
    badge: "WAI-ARIA",
  },
  {
    href: "/playground/modal",
    label: "Modal",
    description:
      "ARIA APG Dialog pattern — focus trap, focus return, scroll lock, dismissible & enforced variants.",
    badge: "WAI-ARIA",
  },
] as const;

export default function PlaygroundIndexPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-10 space-y-1">
        <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
          TheEclipse.ai
        </p>
        <h1 className="font-mono text-2xl text-ink">Component Playground</h1>
        <p className="text-sm text-ink-soft">
          Accessible UI primitives built to the W3C ARIA Authoring Practices
          Guide. Each demo is self-contained — open, inspect, and test with a
          keyboard or screen reader.
        </p>
      </div>

      <nav aria-label="Playground components">
        <ul className="space-y-3">
          {entries.map(({ href, label, description, badge }) => (
            <li key={href}>
              <Link
                href={href}
                className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-paper px-5 py-4 transition-colors hover:border-ink hover:bg-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-corona focus-visible:ring-offset-2"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-ink">
                      {label}
                    </span>
                    <span className="rounded bg-mist px-1.5 py-0.5 font-mono text-xs text-ink-soft group-hover:bg-paper">
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm text-ink-soft">{description}</p>
                </div>

                {/* Arrow — slides right on hover */}
                <svg
                  aria-hidden="true"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0 text-ink-soft transition-transform group-hover:translate-x-1 group-hover:text-ink"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-10 border-t border-line pt-6">
        <Link
          href="/"
          className="font-mono text-xs text-ink-soft underline decoration-line underline-offset-4 hover:text-ink"
        >
          ← Back to app
        </Link>
      </div>
    </main>
  );
}
