import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";

export function FixedCta({ href, label, icon = "arrow" }: { href: string; label: string; icon?: "arrow" | "pen" }) {
  return (
    <div className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/95 px-4 pt-3 backdrop-blur-xl">
      <div className="mx-auto max-w-[680px]"><Link href={href} className="button-primary w-full">{icon === "pen" ? <PenLine size={20} /> : null}{label}{icon === "arrow" ? <ArrowRight size={20} /> : null}</Link></div>
    </div>
  );
}
