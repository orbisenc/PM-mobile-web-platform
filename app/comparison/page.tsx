"use client";
import Image from "next/image";
import { ChevronDown, Download, FileText } from "lucide-react";
import { FixedCta } from "@/components/fixed-cta";
import { SiteHeader } from "@/components/site-header";
import { faqs } from "@/lib/demo-data";
import { BeforeAfter } from "@/components/before-after";
const highlightImages = [
  { src: "/assets/uiwang/highlight-masterplan.png", alt: "3개 블록이 만드는 하나의 주거 생활권" },
  { src: "/assets/uiwang/highlight-bl1.png", alt: "BL1 배치계획, 개방감을 높인 6개 동" },
  { src: "/assets/uiwang/highlight-bl2.png", alt: "BL2 배치계획, 시야를 여는 7개 동" },
  { src: "/assets/uiwang/highlight-bl3.png", alt: "BL3 배치계획, 연결을 완성한 7개 동" },
];
export default function ComparisonPage(){return <main className="page-shell"><SiteHeader title="사업 비교" back="/video"/><div className="mobile-content pt-8">
<section><h2 className="section-title">공간 변화 미리보기</h2><div className="mt-4"><BeforeAfter/></div></section>
<section className="mt-10 space-y-4">{highlightImages.map((image)=><div key={image.src} className="card relative aspect-[43/24] overflow-hidden bg-[#061c18]"><Image src={image.src} alt={image.alt} fill sizes="680px" className="object-contain"/></div>)}</section>
<section className="mt-8"><h2 className="section-title">자주 묻는 질문</h2><div className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-[24px] border border-slate-200 bg-white">{faqs.map(item=><details key={item.q} className="group p-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold"><span>{item.q}</span><ChevronDown className="shrink-0 transition group-open:rotate-180" size={18}/></summary><p className="body-copy mt-3">{item.a}</p></details>)}</div></section>
<a href="/assets/uiwang/catalog.pdf" download className="button-secondary mt-6 w-full"><FileText size={19}/> 홍보 카탈로그 받기 <Download size={18}/></a>
</div><FixedCta href="/consent" label="동의서 작성하기" icon="pen"/></main>}
