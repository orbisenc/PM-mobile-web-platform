"use client";
import { FixedCta } from "@/components/fixed-cta";
import { PageIntro } from "@/components/page-intro";
import { SiteHeader } from "@/components/site-header";
import { SketchfabViewer } from "@/components/sketchfab-viewer";
import { useDemoContent } from "@/lib/use-demo-content";
export default function ModelPage(){ const { project } = useDemoContent(); return <main className="page-shell"><SiteHeader title="3D 모델" back="/overview"/><div className="mobile-content"><PageIntro step="02 · 공간 살펴보기" title="직접 돌려보는 미래 단지">모델을 터치해 단지 배치와 주요 시설을 여러 각도에서 확인해 보세요.</PageIntro><SketchfabViewer models={project.models}/></div><FixedCta href="/video" label="홍보 영상 보기"/></main> }
