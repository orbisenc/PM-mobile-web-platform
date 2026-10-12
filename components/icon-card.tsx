import type { LucideIcon } from "lucide-react";

export function IconCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="card p-5">
      <div className="mb-4 grid size-11 place-items-center rounded-2xl bg-blue-50 text-primary"><Icon size={22} /></div>
      <h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{children}</p>
    </div>
  );
}
