import { playgroundSecondaryButton } from "./styles";

interface CardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function Card({ title, children, footer }: CardProps) {
  return (
    <article className="flex min-h-52 flex-col rounded-[14px] border border-line bg-paper p-5 shadow-[2px_2px_5px_rgba(0,0,0,0.12)]">
      <h2 className="font-heading text-xl font-bold text-ink">{title}</h2>
      <div className="mt-3 flex-1 font-body text-sm leading-6 text-ink-soft">{children}</div>
      {footer && <footer className="mt-5 border-t border-line pt-4">{footer}</footer>}
    </article>
  );
}

const CARD_DATA = [
  { title: "This week", body: "Three focused sessions are planned before Friday." },
  { title: "Notes reviewed", body: "Twelve pages are ready for your next recall pass." },
  { title: "Next deadline", body: "Organic chemistry problem set · Thursday, 5 PM." },
] as const;

export default function CardPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-12">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">Overview</p>
        <h1 className="font-heading text-3xl font-bold text-ink">A quiet view of the work ahead.</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {CARD_DATA.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            footer={<button type="button" className={playgroundSecondaryButton}>View details</button>}
          >
            <p>{card.body}</p>
          </Card>
        ))}
      </div>
    </main>
  );
}
