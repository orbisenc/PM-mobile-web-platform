"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, X } from "lucide-react";
import { useState } from "react";
import { DemoBanner } from "./demo-banner";

const links = [
  ["/overview", "사업 개요"],
  ["/model", "3D 모델"],
  ["/video", "홍보 영상"],
  ["/comparison", "사업 비교"],
  ["/consent", "동의서 작성"],
];

export function SiteHeader({ title, back }: { title?: string; back?: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <DemoBanner />
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[66px] max-w-5xl items-center justify-between px-5">
          <div className="flex min-w-0 items-center gap-3">
            {back && <Link href={back} aria-label="이전 화면" className="-ml-2 grid size-10 shrink-0 place-items-center rounded-full hover:bg-slate-100"><ArrowLeft size={22} /></Link>}
            <Link href="/" className="min-w-0">
              <div className="flex items-center gap-2"><span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white"><Image src="/assets/uiwang/symbol-mark.png" alt="의왕 학의지구 심볼 마크" width={36} height={36} className="h-full w-full object-contain" priority /></span><span className="truncate text-[15px] font-extrabold tracking-[-0.02em]">{title || "의왕 학의지구 도시개발"}</span></div>
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="grid size-11 place-items-center rounded-full hover:bg-slate-100" aria-label={open ? "메뉴 닫기" : "메뉴 열기"}>{open ? <X /> : <Menu />}</button>
        </div>
        {open && (
          <nav className="absolute inset-x-0 top-full border-b border-slate-200 bg-white p-4 shadow-xl">
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-2">
              {links.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 text-sm font-bold ${pathname === href ? "bg-blue-50 text-primary" : "hover:bg-slate-50"}`}>{label}</Link>)}
              <Link href="/admin" className="rounded-xl px-4 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50">관리자</Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
