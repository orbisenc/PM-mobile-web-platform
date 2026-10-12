import { AlertTriangle } from "lucide-react";

export function DemoBanner() {
  return (
    <div className="bg-[#fff8e7] px-4 py-2.5 text-center text-[12px] font-semibold leading-5 text-amber-900">
      <span className="inline-flex items-center gap-1.5"><AlertTriangle size={14} /> DEMO · 실제 사업 또는 법적 동의 접수가 아닙니다</span>
    </div>
  );
}
