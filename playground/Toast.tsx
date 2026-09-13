"use client";

import { useEffect, useState } from "react";
import { playgroundIconButton, playgroundPrimaryButton } from "./styles";

interface ToastProps {
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timeout = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timeout);
  }, [duration, onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-between gap-4 rounded-[14px] border border-line bg-paper px-4 py-3 shadow-[3px_3px_8px_rgba(0,0,0,0.2)]"
    >
      <p className="font-body text-sm text-ink">{message}</p>
      <button type="button" aria-label="Dismiss notification" onClick={onClose} className={playgroundIconButton}>
        ×
      </button>
    </div>
  );
}

export default function ToastPage() {
  const [visible, setVisible] = useState(false);

  return (
    <main className="mx-auto max-w-xl space-y-6 px-4 py-12">
      <div className="space-y-2">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft">Feedback</p>
        <h1 className="font-heading text-3xl font-bold text-ink">A saved note, stated plainly.</h1>
        <p className="font-body text-sm leading-6 text-ink-soft">
          The announcement is polite so it does not interrupt a screen reader’s
          current task, and it closes automatically or on request.
        </p>
      </div>
      <button type="button" className={playgroundPrimaryButton} onClick={() => setVisible(true)}>
        Save note
      </button>
      {visible && <Toast message="Note saved." onClose={() => setVisible(false)} />}
    </main>
  );
}
