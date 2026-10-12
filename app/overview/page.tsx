"use client";

import Image from "next/image";
import { CalendarDays, Download, FileText, MapPin, Target } from "lucide-react";
import { FixedCta } from "@/components/fixed-cta";
import { IconCard } from "@/components/icon-card";
import { PageIntro } from "@/components/page-intro";
import { ProjectHeroImage } from "@/components/project-hero-image";
import { SiteHeader } from "@/components/site-header";
import { timeline } from "@/lib/demo-data";
import { useDemoContent } from "@/lib/use-demo-content";

export default function OverviewPage() {
  const { project } = useDemoContent();
  return <main className="page-shell"><SiteHeader title="사업 개요" back="/" />
    <div className="mobile-content"><PageIntro step="01 · 사업 이해하기" title="우리 동네가 이렇게 달라집니다">사업의 범위와 목적, 앞으로의 추진 일정을 차근차근 확인해 보세요.</PageIntro>
      <div className="card overflow-hidden"><ProjectHeroImage src={project.heroImage} alt="사업 조감도" /><div className="p-5"><span className="demo-badge">가상 사업 정보</span><h2 className="section-title mt-3">{project.name}</h2><p className="body-copy mt-2">{project.summary}</p></div></div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2"><IconCard icon={MapPin} title="사업 위치">{project.location}</IconCard><IconCard icon={Target} title="사업 규모">{project.scale}</IconCard><IconCard icon={CalendarDays} title="추진 기간">{project.period}</IconCard><IconCard icon={FileText} title="사업 목적">{project.purpose}</IconCard></div>
      <section className="mt-10"><p className="eyebrow">계획 이미지</p><h2 className="section-title mt-1">의왕 학의지구 미리보기</h2><p className="body-copy mt-2">제공된 홍보 렌더링 이미지이며 실제 인허가 및 설계 과정에서 달라질 수 있습니다.</p><div className="no-scrollbar mt-4 flex snap-x gap-3 overflow-x-auto pb-3">{project.galleryImages.map((src,index)=><div key={src} className="relative aspect-[16/10] min-w-[88%] snap-center overflow-hidden rounded-[22px] bg-slate-200"><Image src={src} alt={`의왕 학의지구 계획 렌더링 ${index+1}`} fill sizes="600px" className="object-cover"/><span className="absolute bottom-3 left-3 demo-badge">계획 이미지 {index+1}</span></div>)}</div></section>
      <section className="mt-10"><p className="eyebrow">추진 일정</p><h2 className="section-title mt-1">현재 어디까지 왔나요?</h2><div className="card mt-4 p-5">{timeline.map((item, i) => <div key={item.date} className="relative flex gap-4 pb-7 last:pb-0"><div className={`relative z-10 mt-1 size-3 shrink-0 rounded-full ${i === 0 ? "bg-primary ring-4 ring-blue-100" : "bg-slate-300"}`} />{i < timeline.length - 1 && <span className="absolute left-[5px] top-4 h-full w-px bg-slate-200" />}<div><p className="text-xs font-bold text-primary">{item.date} · {item.state}</p><p className="mt-1 font-bold">{item.title}</p></div></div>)}</div></section>
      <section className="mt-10"><h2 className="section-title">주요 자료</h2><a href="/assets/uiwang/catalog.pdf" download className="card mt-4 flex w-full items-center gap-4 p-5 text-left"><span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-primary"><FileText /></span><span className="flex-1"><strong className="block text-sm">백운밸리 2지구 홍보 카탈로그</strong><small className="mt-1 block text-slate-500">PDF · 제공 자료 · 약 9.5MB</small></span><Download size={20} className="text-slate-400" /></a></section>
    </div><FixedCta href="/model" label="3D 모델 확인하기" /></main>;
}
