import type { ProjectContent } from "@/lib/types";

export const STORAGE_KEY = "uiwang-demo-content-v6";
export const DRAFT_KEY = "uiwang-consent-draft-v1";
export const SUBMISSION_KEY = "uiwang-demo-submission-v1";

export const defaultProject: ProjectContent = {
  name: "의왕 학의지구 도시개발 사업",
  location: "경기도 의왕시 일원 · 의왕 2기 신도시 개발지구",
  scale: "총 1,194세대 주거단지 계획안 · 공동주택 및 단독주택",
  summary: "백운호수의 자연과 도시 생활이 만나는 프리미엄 주거단지 계획을 쉽고 투명하게 안내합니다.",
  purpose: "쾌적한 자연환경과 편리한 교통망, 생활 인프라를 연결하고 스마트 홈과 확장형 공간을 결합한 새로운 주거 경험을 제안합니다. 본 페이지의 사업 정보는 제공된 홍보자료를 바탕으로 구성한 시연용 계획안입니다.",
  period: "2025년 ~ 2029년 계획 (5개년)",
  contact: "의왕 학의지구 사업 문의처 준비 중 (DEMO)",
  heroImage: "/assets/uiwang/hero.png",
  galleryImages: ["/assets/uiwang/render-1.png", "/assets/uiwang/render-2.png", "/assets/uiwang/render-3.png"],
  models: [
    {
      id: "complex",
      label: "주거공간 샘플",
      uid: "fa16a939a91141eba075ec9f7b79daae",
      description: "스마트 주거공간의 실내 구성과 동선을 여러 각도에서 살펴보세요. 의왕 학의지구의 실제 설계 모델이 아닌 조작 시연용 샘플입니다.",
      modelTitle: "One Bedroom Apartment",
      modelUrl: "https://sketchfab.com/3d-models/one-bedroom-apartment-fa16a939a91141eba075ec9f7b79daae",
      authorName: "Virtual Bakery",
      authorUrl: "https://sketchfab.com/z1px3r",
    },
    {
      id: "housing",
      label: "주거시설",
      uid: "d4959af16d8f4524844e8b97d3e9772b",
      description: "현대적인 공동주택 외관과 단지형 주거시설 구성을 여러 각도에서 살펴보세요. 의왕 학의지구의 실제 설계 모델이 아닌 조작 시연용 샘플입니다.",
      modelTitle: "residential complex modern apartment building",
      modelUrl: "https://sketchfab.com/3d-models/residential-complex-modern-apartment-building-d4959af16d8f4524844e8b97d3e9772b",
      authorName: "zigurat architecture studio",
      authorUrl: "https://sketchfab.com/ziguratarchitecturestudio",
    },
    {
      id: "community",
      label: "공용시설",
      uid: "0bae839b52d8431b8a1958011f88ab27",
      description: "커뮤니티, 어린이집, 작은도서관 등 공용공간을 확인하는 영역입니다.",
      modelTitle: "0029-23",
      modelUrl: "https://sketchfab.com/3d-models/0029-23-0bae839b52d8431b8a1958011f88ab27",
      authorName: "Halim3D",
      authorUrl: "https://sketchfab.com/Halim3D",
    },
  ],
  video: {
    type: "mp4",
    source: "/assets/uiwang/promo.mp4",
    title: "의왕 학의지구 홍보영상",
    description: "백운밸리의 자연환경과 계획된 주거단지의 미래 모습을 영상으로 확인해 보세요.",
    thumbnail: "/assets/uiwang/render-2.png",
  },
  siteVideo: {
    type: "mp4",
    source: "/assets/uiwang/site.mp4",
    title: "의왕 학의지구 부지 영상",
    description: "사업 대상지의 현재 주변 환경과 입지를 확인할 수 있는 현장 영상입니다.",
    thumbnail: "/assets/uiwang/render-3.png",
  },
  comparisons: [
    { category: "개발 규모", before: "개발 전 부지", after: "총 1,194세대 계획안" },
    { category: "주거 솔루션", before: "일반 주거 공간", after: "LG Smart Cottage 제안" },
    { category: "확장 공간", before: "기본 주거 중심", after: "Pavilion 3·5·7 제안" },
    { category: "사업 방식", before: "계획 수립 전", after: "민간개발·분양 계획" },
  ],
  documentVersion: "UIWANG-DEMO-v1.0 · 2026.10.10",
  documentText: "본인은 의왕 학의지구 도시개발 사업에 관한 설명 자료, 사업 비교 내용 및 추진계획을 확인하였으며, 본인의 자유로운 의사에 따라 아래와 같이 의견을 제출합니다. 본 데모 제출은 법적 효력이 없고 실제 사업에 접수되지 않습니다.",
};

export const benefits = [
  { value: "1,194", label: "계획 세대수", note: "공동주택·단독주택 · 계획안" },
  { value: "5년", label: "사업 계획기간", note: "2025~2029년 · 홍보자료 기준" },
  { value: "Smart", label: "주거 솔루션", note: "스마트 홈·에너지 시스템 제안" },
];

export const timeline = [
  { date: "2025", title: "사업 기반 구축", state: "계획" },
  { date: "2026", title: "주거 솔루션 구체화", state: "계획" },
  { date: "2027", title: "단계별 공급 검토", state: "계획" },
  { date: "2029", title: "5개년 사업 목표", state: "계획" },
];

export const faqs = [
  { q: "전자 동의를 제출하면 바로 확정되나요?", a: "아닙니다. 이 사이트는 기능 검증용 데모이며 어떤 제출도 실제 사업에 접수되지 않습니다." },
  { q: "세대원이 여러 명이면 어떻게 하나요?", a: "각 세대원에게 발급된 링크에서 개별적으로 의견을 제출하는 구조로 설계되어 있습니다." },
  { q: "제출 후 의견을 바꿀 수 있나요?", a: "운영 버전에서는 정해진 기간 내 철회·재제출 정책과 본인확인 절차를 함께 제공합니다." },
];
