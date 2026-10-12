import { describe, expect, it } from "vitest";
import { consentSchema, getSafeVideoUrl, getSketchfabEmbedUrl } from "./validation";

describe("외부 콘텐츠 주소 검증", () => {
  it("안전한 영숫자 Sketchfab UID만 허용한다", () => {
    expect(getSketchfabEmbedUrl("fa16a939a91141eba075ec9f7b79daae")).toContain("sketchfab.com/models/");
    expect(getSketchfabEmbedUrl("https://evil.example/embed")).toBeNull();
  });

  it("YouTube ID와 HTTPS mp4만 허용한다", () => {
    expect(getSafeVideoUrl("youtube", "Scxs7L0vhZ4")).toContain("youtube-nocookie.com");
    expect(getSafeVideoUrl("mp4", "/assets/uiwang/promo.mp4")).toBe("/assets/uiwang/promo.mp4");
    expect(getSafeVideoUrl("mp4", "javascript:alert(1)")).toBeNull();
  });
});

describe("동의서 검증", () => {
  it("의사 선택과 서명이 없으면 제출되지 않는다", () => {
    expect(consentSchema.safeParse({ name: "홍길동" }).success).toBe(false);
  });
});
