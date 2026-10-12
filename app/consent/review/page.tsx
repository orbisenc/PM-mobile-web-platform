"use client";

import Image from "next/image";
import { AlertTriangle, CheckCircle2, Edit3, FileCheck2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { ConsentSteps } from "@/components/consent-steps";
import { DRAFT_KEY, SUBMISSION_KEY } from "@/lib/demo-data";
import type { ConsentDraft, DemoSubmission } from "@/lib/types";

export default function ReviewPage(){
  const router=useRouter(); const [draft,setDraft]=useState<ConsentDraft|null>(null); const [loading,setLoading]=useState(false);
  useEffect(()=>{const raw=sessionStorage.getItem(DRAFT_KEY); if(!raw){router.replace("/consent");return;} try{setDraft(JSON.parse(raw))}catch{router.replace("/consent")}},[router]);
  const submit=()=>{if(!draft)return; setLoading(true); const now=new Date(); const submission:DemoSubmission={...draft,receiptNumber:`DEMO-${now.getFullYear()}-${String(now.getTime()).slice(-8)}`,submittedAt:now.toISOString()}; sessionStorage.setItem(SUBMISSION_KEY,JSON.stringify(submission)); setTimeout(()=>router.push("/complete"),600)};
  if(!draft)return <main className="page-shell"><SiteHeader title="최종 확인" back="/consent"/><div className="grid h-80 place-items-center"><Loader2 className="animate-spin text-primary"/></div></main>;
  return <main className="page-shell pb-10"><SiteHeader title="최종 확인" back="/consent"/><div className="mobile-content pt-1"><ConsentSteps current={2}/><div className="pt-7"><p className="eyebrow">06 · 제출 전 확인</p><h1 className="page-title">이 내용으로 제출할까요?</h1><p className="body-copy mt-3">제출 버튼을 누르기 전 입력한 정보와 선택한 의견을 확인해 주세요.</p></div>
  <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><AlertTriangle className="mt-0.5 shrink-0" size={20}/><span><strong className="block">이 제출은 DEMO입니다</strong>실제 시스템이나 기관으로 전송되지 않습니다.</span></div>
  <section className="card mt-5 overflow-hidden"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="font-bold">동의자 정보</h2><Link href="/consent" className="inline-flex items-center gap-1 text-sm font-bold text-primary"><Edit3 size={15}/> 수정</Link></div><dl className="grid grid-cols-[90px_1fr] gap-y-4 p-5 text-sm"><dt className="text-slate-500">이름</dt><dd className="font-bold">{draft.name}</dd><dt className="text-slate-500">주소</dt><dd className="font-bold">{draft.building}동 {draft.unit}호</dd><dt className="text-slate-500">연락처</dt><dd className="font-bold">{draft.phone}</dd><dt className="text-slate-500">문서 버전</dt><dd className="font-bold">{draft.documentVersion}</dd></dl></section>
  <section className={`mt-4 rounded-[24px] border-2 p-5 ${draft.decision==="agree"?"border-blue-300 bg-blue-50":"border-slate-300 bg-slate-100"}`}><div className="flex items-center gap-3"><CheckCircle2 className={draft.decision==="agree"?"text-primary":"text-slate-600"}/><div><p className="text-xs font-bold text-slate-500">선택한 의견</p><p className="mt-1 text-xl font-extrabold">{draft.decision==="agree"?"동의합니다":"동의하지 않습니다"}</p></div></div></section>
  <section className="card mt-4 p-5"><p className="text-sm font-bold">작성한 서명</p><div className="relative mt-3 h-32 overflow-hidden rounded-xl border border-slate-100 bg-white"><Image src={draft.signature} alt="작성한 서명" fill className="object-contain" unoptimized/></div></section>
  <div className="mt-5 flex items-center gap-2 text-xs text-slate-500"><FileCheck2 size={16}/> 필수 고지 확인 완료 · 선택 동의 {draft.marketingOptional?"동의":"미동의"}</div>
  <button onClick={submit} disabled={loading} className="button-primary mt-7 w-full">{loading?<><Loader2 className="animate-spin"/> DEMO 제출 처리 중</>:"DEMO 제출 완료하기"}</button><Link href="/consent" className="mt-3 flex min-h-12 items-center justify-center text-sm font-bold text-slate-500">입력 화면으로 돌아가기</Link>
  </div></main>;
}
