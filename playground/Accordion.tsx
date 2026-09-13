"use client";

import { useId, useState } from "react";
import { playgroundSecondaryButton } from "./styles";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const baseId = useId();
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  function toggle(index: number) {
    setOpenIndexes((current) => {
      const isOpen = current.includes(index);
      if (isOpen) return current.filter((openIndex) => openIndex !== index);
      return allowMultiple ? [...current, index] : [index];
    });
  }

  return (
    <div className="divide-y divide-line rounded-[14px] border border-line bg-paper">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const buttonId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <section key={item.title}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className={`${playgroundSecondaryButton} flex w-full items-center justify-between gap-4 rounded-none border-0 px-5 py-4 text-left shadow-none hover:translate-y-0 hover:scale-100 hover:shadow-none`}
              >
                <span>{item.title}</span>
                <span aria-hidden="true" className="text-lg">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="px-5 pb-5 font-body text-sm leading-6 text-ink-soft"
            >
              {item.content}
            </div>
          </section>
        );
      })}
    </div>
  );
}

const FAQ_ITEMS: AccordionItem[] = [
  {
    title: "How is my study plan built?",
    content:
      "Your deadlines, available time, and completed sessions shape a practical weekly plan.",
  },
  {
    title: "Can I change a reminder?",
    content:
      "Yes. Reminders remain editable, so a plan can follow your actual schedule rather than an ideal one.",
  },
  {
    title: "What happens when I miss a task?",
    content:
      "The task stays visible for review; a future version can help reschedule it around new priorities.",
  },
  {
    title: "Is my course material shared?",
    content:
      "This prototype keeps the example local. Production privacy controls should make sharing explicit.",
  },
];

export default function AccordionPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-12">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
          Study support
        </p>
        <h1 className="font-heading text-3xl font-bold text-ink">Questions, answered.</h1>
        <p className="font-body text-sm leading-6 text-ink-soft">
          A single-open FAQ accordion. Each question is a native button and can
          be opened with Enter or Space.
        </p>
      </div>
      <Accordion items={FAQ_ITEMS} />
    </main>
  );
}
