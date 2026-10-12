export function ConsentSteps({ current }: { current: 1 | 2 | 3 }) {
  const steps = ["약관 동의", "정보 확인", "제출 완료"];
  return <div className="mt-6 flex items-start" aria-label={`동의서 ${current}단계`}>
    {steps.map((label, index) => { const step = index + 1; const active = step <= current; return <div key={label} className="relative flex flex-1 flex-col items-center text-center">
      {index > 0 && <span className={`absolute right-1/2 top-3 h-0.5 w-full ${step <= current ? "bg-primary" : "bg-slate-200"}`} />}
      <span className={`relative z-10 grid size-7 place-items-center rounded-full text-xs font-extrabold ${active ? "bg-primary text-white" : "bg-slate-200 text-slate-500"}`}>{step}</span>
      <span className={`mt-2 text-[11px] font-bold ${step === current ? "text-primary" : "text-slate-400"}`}>{label}</span>
    </div>})}
  </div>;
}
