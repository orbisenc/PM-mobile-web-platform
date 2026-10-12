import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "의왕 학의지구 도시개발 사업 | DEMO", template: "%s | 의왕 학의지구 DEMO" },
  description: "의왕 학의지구 도시개발 사업 세대원 전자 동의 모바일 웹 데모",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#f7faff",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
