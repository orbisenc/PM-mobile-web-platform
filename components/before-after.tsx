"use client";

import Image from "next/image";
import { ArrowLeftRight } from "lucide-react";
import { useState } from "react";

export function BeforeAfter() {
  const [position, setPosition] = useState(52);
  const before = "/assets/uiwang/render-3.png";
  const after = "/assets/uiwang/existing-view.png";
  return <div className="card overflow-hidden">
    <div className="relative aspect-[4/3] select-none overflow-hidden bg-slate-200">
      <Image src={before} alt="사업 전 환경 데모 이미지" fill sizes="680px" className="object-cover" />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${position}%` }}><div className="relative h-full" style={{ width: `${10000 / position}%` }}><Image src={after} alt="사업 대상지 기존 조망" fill sizes="680px" className="object-cover" /></div></div>
      <div className="absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${position}%` }}><span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-lg"><ArrowLeftRight size={18}/></span></div>
      <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white">기존 조망</span><span className="absolute bottom-3 right-3 rounded-full bg-navy/80 px-3 py-1 text-xs font-bold text-white">단지 전체 조망</span>
      <input aria-label="사업 전후 이미지 비교" type="range" min="12" max="88" value={position} onChange={e=>setPosition(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"/>
    </div><p className="px-5 py-4 text-xs leading-5 text-slate-500">좌우로 움직여 기존 부지와 계획 조망을 비교해 보세요. 계획 이미지는 제공된 홍보 렌더링이며 실제 설계와 다를 수 있습니다.</p>
  </div>;
}
