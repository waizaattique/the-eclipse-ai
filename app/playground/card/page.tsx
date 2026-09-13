import CardPage from "@/playground/Card";

export const metadata = { title: "Card — Playground" };

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-5xl p-6 md:p-10">
      <CardPage />
    </div>
  );
}
