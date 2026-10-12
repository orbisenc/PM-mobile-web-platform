"use client";
import Image from "next/image";
import { AlertCircle, Play } from "lucide-react";
import { useState } from "react";
import type { VideoItem } from "@/lib/types";
import { getSafeVideoUrl } from "@/lib/validation";

export function VideoPlayer({ video }: { video: VideoItem }) {
  const [play, setPlay] = useState(false); const url = getSafeVideoUrl(video.type, video.source);
  return <div className="card overflow-hidden"><div className="relative aspect-video bg-navy">
    {!url ? <div className="absolute inset-0 grid place-items-center text-center text-white"><div><AlertCircle className="mx-auto"/><p className="mt-3 font-bold">올바른 영상 주소가 아닙니다</p></div></div>
    : !play ? <button onClick={() => setPlay(true)} aria-label="영상 재생" className="absolute inset-0 w-full"><Image src={video.thumbnail} alt="영상 썸네일" fill sizes="680px" className="object-cover opacity-75"/><span className="absolute inset-0 bg-navy/20"/><span className="absolute left-1/2 top-1/2 grid size-[70px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary shadow-2xl"><Play fill="currentColor" className="ml-1"/></span></button>
    : video.type === "youtube" ? <iframe src={url} title={video.title} className="absolute inset-0 h-full w-full border-0" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" sandbox="allow-scripts allow-same-origin allow-presentation allow-popups" /> : <video src={url} className="h-full w-full" controls autoPlay playsInline/>}
  </div><div className="p-5"><span className="demo-badge">DEMO CONTENT</span><h2 className="section-title mt-3">{video.title}</h2><p className="body-copy mt-2">{video.description}</p></div></div>
}
