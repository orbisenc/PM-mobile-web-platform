"use client";

import { Check, Download, Home, Phone, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { ConsentSteps } from "@/components/consent-steps";
import { SUBMISSION_KEY } from "@/lib/demo-data";
import { downloadDemoPdf } from "@/lib/pdf";
import type { DemoSubmission } from "@/lib/types";
import { useDemoContent } from "@/lib/use-demo-content";

export default function CompletePage(){const router=useRouter();const {project}=useDemoContent();const [data,setData]=useState<DemoSubmission|null>(null);useEffect(()=>{const raw=sessionStorage.getItem(SUBMISSION_KEY);if(!raw){router.replace("/");return;}try{setData(JSON.parse(raw))}catch{router.replace("/")}},[router]);if(!data)return null;const date=new Intl.DateTimeFormat("ko-KR",{dateStyle:"long",timeStyle:"short",timeZone:"Asia/Seoul"}).format(new Date(data.submittedAt));return <main className="page-shell pb-10"><SiteHeader title="제출 확인"/><div className="mobile-content pt-1 text-center"><ConsentSteps current={3}/><span className="mx-auto mt-8 grid size-20 place-items-center rounded-full bg-primary text-white shadow-xl shadow-blue-200"><Check size={38} strokeWidth={3}/></span><span className="demo-badge mt-6">DEMO RECEIPT</span><h1 className="page-title">제출 시연이 완료되었습니다</h1><p className="body-copy mt-3">아래 내용은 실제 접수 내역이 아닌 기능 확인용 결과입니다.</p>
<section className="card mt-7 overflow-hidden text-left"><div className="bg-navy p-5 text-white"><p className="text-xs font-bold text-blue-300">DEMO 접수번호</p><p className="mt-2 text-2xl font-extrabold tracking-wide">{data.receiptNumber}</p></div><dl className="grid grid-cols-[100px_1fr] gap-y-4 p-5 text-sm"><dt className="text-slate-500">제출 일시</dt><dd className="text-right font-bold">{date}</dd><dt className="text-slate-500">선택 의견</dt><dd className="text-right font-extrabold text-primary">{data.decision==="agree"?"동의":"비동의"}</dd><dt className="text-slate-500">동·호수</dt><dd className="text-right font-bold">{data.building}동 {data.unit}호</dd><dt className="text-slate-500">문서 버전</dt><dd className="text-right font-bold">{data.documentVersion}</dd></dl></section>
<button onClick={()=>downloadDemoPdf(data.receiptNumber,date,data.decision)} className="button-secondary mt-4 w-full"><Download size={19}/> 샘플 PDF 확인서 받기</button>
<div className="mt-6 rounded-2xl bg-white p-5 text-left"><p className="flex items-center gap-2 font-bold"><Phone size={18} className="text-primary"/> 문의처</p><p className="mt-2 text-sm text-slate-500">{project.contact}</p></div>
<div className="mt-7 grid grid-cols-2 gap-3"><Link href="/" className="button-primary"><Home size={18}/> 메인으로</Link><Link href="/consent" className="button-secondary"><RotateCcw size={18}/> 다시 체험</Link></div></div></main>}
