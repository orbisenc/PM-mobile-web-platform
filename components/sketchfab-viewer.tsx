"use client";

import { AlertCircle, Box, Expand, Rotate3D } from "lucide-react";
import { useEffect, useState } from "react";
import type { ModelItem } from "@/lib/types";
import { getSketchfabEmbedUrl } from "@/lib/validation";

export function SketchfabViewer({ models }: { models: ModelItem[] }) {
  const [active, setActive] = useState(models[0]?.id || "");
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);
  const model = models.find((item) => item.id === active) || models[0];
  const url = model ? getSketchfabEmbedUrl(model.uid) : null;
  useEffect(() => { setLoaded(false); setStarted(false); }, [active]);

  return <div>
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2" role="tablist">{models.map(item => <button key={item.id} role="tab" aria-selected={active === item.id} onClick={() => setActive(item.id)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold ${active === item.id ? "bg-navy text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{item.label}</button>)}</div>
    <div className="card mt-3 overflow-hidden">
      <div className="relative aspect-[4/3] bg-[#0d1726]">
        {!url ? <div className="absolute inset-0 grid place-items-center p-8 text-center text-white"><div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/10"><AlertCircle /></span><h3 className="mt-4 font-bold">등록된 3D 모델이 없습니다</h3><p className="mt-2 text-sm leading-6 text-slate-400">관리자가 Sketchfab 모델 UID를 등록하면 여기에 표시됩니다.</p></div></div>
        : !started ? <button onClick={() => setStarted(true)} className="hero-grid absolute inset-0 flex w-full flex-col items-center justify-center p-8 text-center text-white"><span className="grid size-16 place-items-center rounded-full bg-primary shadow-xl shadow-blue-900"><Box size={30} /></span><strong className="mt-5 text-lg">3D 모델 불러오기</strong><span className="mt-2 max-w-xs text-sm leading-6 text-slate-400">외부 Sketchfab 콘텐츠는 버튼을 누른 뒤 로드됩니다.</span></button>
        : <>{!loaded && <div className="shimmer absolute inset-0" />}<iframe src={url} title={model.modelTitle || `${model.label} 3D 모델`} className="absolute inset-0 h-full w-full border-0" allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen onLoad={() => setLoaded(true)} referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-presentation" /></>}
      </div>
      <div className="p-5"><div className="flex items-center justify-between gap-3"><h2 className="section-title">{model?.label}</h2><span className="inline-flex items-center gap-1 text-xs font-bold text-primary"><Expand size={14} /> 전체화면 지원</span></div><p className="body-copy mt-2">{model?.description}</p>{model?.modelTitle && <p className="mt-3 text-xs leading-5 text-slate-500"><a href={model.modelUrl || `https://sketchfab.com/models/${model.uid}`} target="_blank" rel="nofollow noreferrer" className="font-bold text-primary">{model.modelTitle}</a>{model.authorName && <> by <a href={model.authorUrl} target="_blank" rel="nofollow noreferrer" className="font-bold text-primary">{model.authorName}</a></>} on Sketchfab</p>}{url && <div className="mt-4 flex items-center gap-2 rounded-xl bg-blue-50 p-3 text-xs font-semibold text-blue-800"><Rotate3D size={18} className="shrink-0" /> 한 손가락으로 회전, 두 손가락으로 확대할 수 있습니다.</div>}</div>
    </div>
  </div>;
}
