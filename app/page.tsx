"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Building2, CalendarDays, CirclePlay, ClipboardCheck, Cuboid, HousePlug, Landmark } from "lucide-react";
import { benefits } from "@/lib/demo-data";
import { useDemoContent } from "@/lib/use-demo-content";
import { SiteHeader } from "@/components/site-header";
import { FixedCta } from "@/components/fixed-cta";
import { ProjectHeroImage } from "@/components/project-hero-image";

const quickLinks = [
  { href: "/model", icon: Cuboid, image: "/assets/uiwang/nav-3d.png", label: "3D 모델", note: "공간을 직접 돌려보기" },
  { href: "/video", icon: CirclePlay, image: "/assets/uiwang/nav-video.png", label: "홍보 영상", note: "영상으로 사업 이해하기" },
  { href: "/comparison", icon: ClipboardCheck, image: "/assets/uiwang/nav-comparison.png", label: "사업 비교", note: "계획 내용을 한눈에" },
];

export default function HomePage() {
  const { project } = useDemoContent();
  return (
    <main className="page-shell">
      <SiteHeader />
      <div className="mx-auto max-w-[680px] bg-white sm:mt-6 sm:overflow-hidden sm:rounded-[32px] sm:shadow-soft">
        <ProjectHeroImage src={project.heroImage} alt="사업 조감도 데모" priority />
        <section className="px-5 pb-7 pt-6">
          <div className="flex items-center justify-between gap-3"><span className="eyebrow">주민 안내 페이지</span><span className="demo-badge">DEMO PROJECT</span></div>
          <h1 className="mt-3 text-[31px] font-extrabold leading-[1.22] tracking-[-0.045em]">{project.name}</h1>
          <p className="body-copy mt-4">{project.summary}</p>
          <Link href="/overview" className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary">사업 개요 자세히 보기 <ArrowRight size={16} /></Link>
        </section>
      </div>

      <section className="mobile-content mt-6">
        <h2 className="section-title">무엇을 확인할 수 있나요?</h2>
        <div className="no-scrollbar -mx-5 mt-4 flex snap-x gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:px-0">
          {quickLinks.map(({ href, icon: Icon, image, label, note }) => (
            <Link key={href} href={href} className="card group min-w-[72%] snap-center overflow-hidden transition hover:-translate-y-1 hover:border-blue-200 sm:min-w-0">
              <div className="relative aspect-[4/3] overflow-hidden bg-blue-50"><Image src={image} alt={`${label} 메뉴 일러스트`} fill sizes="(max-width: 680px) 72vw, 220px" className="object-cover transition duration-500 group-hover:scale-105"/><span className="absolute left-4 top-4 grid size-10 place-items-center rounded-xl bg-white/90 text-primary shadow-md backdrop-blur"><Icon size={21}/></span></div>
              <div className="p-5"><strong className="text-lg">{label}</strong><span className="mt-1.5 block text-sm text-slate-500">{note}</span><span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">바로가기 <ArrowRight size={14}/></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mobile-content mt-10">
        <div className="flex items-end justify-between"><div><p className="eyebrow">기대 효과</p><h2 className="section-title mt-1">달라지는 일상</h2></div><span className="text-xs text-slate-400">시연 수치</span></div>
        <div className="card mt-4 overflow-hidden">
          <div className="relative aspect-video bg-slate-200"><Image src="/assets/uiwang/render-2.png" alt="의왕 학의지구 중앙공원과 주거단지 계획 렌더링" fill sizes="680px" className="object-cover"/></div>
          <div className="p-5"><h3 className="font-bold">중앙공원과 자연을 누리는 일상</h3><p className="mt-2 text-sm leading-6 text-slate-500">중앙공원과 하천, 녹지축이 주거단지와 이어지는 계획 모습을 담은 제공 렌더링 이미지입니다.</p></div>
        </div>
        <div className="mt-5 space-y-3">
          {benefits.map((item, i) => {
            const Icon = [Building2, CalendarDays, HousePlug][i];
            return <div key={item.label} className="card flex items-center gap-4 p-5"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-blue-50 text-primary"><Icon size={23} /></span><div className="min-w-0"><p className="text-sm font-bold text-slate-600">{item.label}</p><p className="mt-0.5 text-2xl font-extrabold tracking-tight">{item.value}</p><p className="mt-1 text-xs text-slate-400">{item.note}</p></div></div>;
          })}
        </div>
      </section>

      <FixedCta href="/consent" label="동의서 작성하기" icon="pen" />
    </main>
  );
}
