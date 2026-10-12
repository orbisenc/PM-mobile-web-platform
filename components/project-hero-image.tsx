import Image from "next/image";

export function ProjectHeroImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 680px) 100vw, 680px" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#08192f]/75 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-4"><span className="demo-badge border-white/50 bg-white/90">DEMO 조감 이미지</span></div>
    </div>
  );
}
