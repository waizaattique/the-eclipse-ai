"use client";

import { cloneElement, useEffect, useId, useState } from "react";
import { playgroundIconButton } from "./styles";

interface TooltipProps {
  label: string;
  children: React.ReactElement<{ "aria-describedby"?: string; onBlur?: () => void; onFocus?: () => void; onKeyDown?: (event: React.KeyboardEvent) => void; onMouseEnter?: () => void; onMouseLeave?: () => void }>;
}

export function Tooltip({ label, children }: TooltipProps) {
  const id = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <span className="relative inline-flex">
      {cloneTooltipChild(
        children,
        open ? id : undefined,
        () => setOpen(true),
        () => setOpen(false),
      )}
      {open && (
        <span
          id={id}
          role="tooltip"
          className="absolute bottom-[calc(100%+0.75rem)] left-1/2 w-max max-w-56 -translate-x-1/2 rounded-[10px] bg-ink px-3 py-2 font-mono text-xs text-paper shadow-[2px_2px_5px_rgba(0,0,0,0.3)]"
        >
          {label}
        </span>
      )}
    </span>
  );
}

function cloneTooltipChild(
  child: TooltipProps["children"],
  tooltipId: string | undefined,
  show: () => void,
  hide: () => void,
) {
  return cloneElement(child, {
    "aria-describedby": tooltipId,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    onKeyDown: (event: React.KeyboardEvent) => {
      if (event.key === "Escape") hide();
      child.props.onKeyDown?.(event);
    },
  });
}

export default function TooltipPage() {
  return (
    <main className="mx-auto max-w-2xl space-y-6 px-4 py-12">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">
          Contextual help
        </p>
        <h1 className="font-heading text-3xl font-bold text-ink">A small explanation, when needed.</h1>
        <p className="font-body text-sm leading-6 text-ink-soft">
          Hover the control or reach it with Tab. Press Escape to dismiss the
          tooltip.
        </p>
      </div>
      <Tooltip label="This opens guidance for keeping a focused study session.">
        <button type="button" aria-label="Study-session guidance" className={playgroundIconButton}>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 10v6M12 7h.01" />
          </svg>
        </button>
      </Tooltip>
    </main>
  );
}
