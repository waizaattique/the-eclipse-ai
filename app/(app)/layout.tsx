import AppNav from "@/components/AppNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:flex">
      <AppNav />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
