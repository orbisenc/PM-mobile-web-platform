"use client";

import { Eraser, PenLine } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function SignaturePad({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasInk, setHasInk] = useState(Boolean(value));

  const prepare = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    if (canvas.width !== Math.floor(rect.width * ratio)) {
      const snapshot = value;
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      const ctx = canvas.getContext("2d");
      ctx?.scale(ratio, ratio);
      if (snapshot) {
        const image = new Image();
        image.onload = () => ctx?.drawImage(image, 0, 0, rect.width, rect.height);
        image.src = snapshot;
      }
    }
    const ctx = canvas.getContext("2d");
    if (ctx) { ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 3; ctx.strokeStyle = "#10233f"; }
    return { canvas, ctx, rect };
  };

  useEffect(() => { prepare(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const point = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };
  const start = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const data = prepare(); if (!data?.ctx) return; drawing.current = true; event.currentTarget.setPointerCapture(event.pointerId); const p = point(event); data.ctx.beginPath(); data.ctx.moveTo(p.x, p.y);
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => { if (!drawing.current) return; const ctx = canvasRef.current?.getContext("2d"); if (!ctx) return; const p = point(event); ctx.lineTo(p.x, p.y); ctx.stroke(); setHasInk(true); };
  const end = () => { if (!drawing.current) return; drawing.current = false; const canvas = canvasRef.current; if (canvas && hasInk) onChange(canvas.toDataURL("image/png")); };
  const clear = () => { const data = prepare(); if (data?.ctx) data.ctx.clearRect(0, 0, data.rect.width, data.rect.height); setHasInk(false); onChange(""); };

  return <div><div className="relative overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-white"><canvas ref={canvasRef} className="h-44 w-full touch-none cursor-crosshair" onPointerDown={start} onPointerMove={move} onPointerUp={end} onPointerCancel={end} aria-label="서명 입력 영역"/><div className="pointer-events-none absolute inset-x-6 bottom-10 border-b border-slate-200"/>{!hasInk&&<div className="pointer-events-none absolute inset-0 grid place-items-center text-slate-300"><span className="flex flex-col items-center gap-2 text-sm"><PenLine/> 이곳에 서명해 주세요</span></div>}</div><button type="button" onClick={clear} className="mt-2 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-bold text-slate-500 hover:bg-slate-100"><Eraser size={16}/> 서명 지우기</button></div>;
}
