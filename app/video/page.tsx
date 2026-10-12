"use client";
import { Clock3, Headphones, Maximize } from "lucide-react";
import { FixedCta } from "@/components/fixed-cta";
import { PageIntro } from "@/components/page-intro";
import { SiteHeader } from "@/components/site-header";
import { VideoPlayer } from "@/components/video-player";
import { useDemoContent } from "@/lib/use-demo-content";
export default function VideoPage(){const {project}=useDemoContent();return <main className="page-shell"><SiteHeader title="홍보 영상" back="/model"/><div className="mobile-content"><PageIntro step="03 · 영상으로 이해하기" title="영상으로 만나는 학의지구">홍보영상과 현장 부지 영상을 차례로 확인해 보세요.</PageIntro><VideoPlayer video={project.video}/><div className="mt-4 grid grid-cols-3 gap-2 text-center">{[[Clock3,"제공 영상"],[Headphones,"음성 안내"],[Maximize,"전체화면"]].map(([I,label])=>{const Icon=I as typeof Clock3; return <div key={label as string} className="rounded-2xl border border-slate-200 bg-white p-3"><Icon className="mx-auto text-primary" size={19}/><p className="mt-2 text-xs font-bold">{label as string}</p></div>})}</div><section className="mt-9"><p className="eyebrow">현장 확인</p><h2 className="section-title mt-1">사업 대상지 영상</h2><p className="body-copy mb-4 mt-2">현재 부지와 주변 환경을 함께 살펴보세요.</p><VideoPlayer video={project.siteVideo}/></section></div><FixedCta href="/comparison" label="사업 계획 비교하기"/></main>}
