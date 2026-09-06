export default function PagePlaceholder({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-10 lg:px-12 lg:py-16">
      <h1 className="text-3xl font-bold text-ink lg:text-4xl">{title}</h1>
      <p className="mt-3 max-w-md text-ink-soft">{description}</p>

      {children ?? (
        <div className="mt-10 rounded-md border border-dashed border-line px-6 py-14 text-center text-sm text-ink-soft">
          This screen is scaffolded but not built yet.
        </div>
      )}
    </div>
  );
}
