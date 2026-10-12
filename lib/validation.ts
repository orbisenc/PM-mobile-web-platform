import { z } from "zod";

export const consentSchema = z.object({
  name: z.string().trim().min(2, "이름을 2자 이상 입력해 주세요.").max(30),
  building: z.string().trim().regex(/^\d{1,4}$/, "동을 숫자로 입력해 주세요."),
  unit: z.string().trim().regex(/^\d{1,4}$/, "호수를 숫자로 입력해 주세요."),
  phone: z.string().trim().regex(/^01[016789]-?\d{3,4}-?\d{4}$/, "올바른 휴대전화 번호를 입력해 주세요."),
  decision: z.enum(["agree", "disagree"], { required_error: "동의 또는 비동의를 선택해 주세요." }),
  privacyRequired: z.literal(true, { errorMap: () => ({ message: "필수 개인정보 고지에 동의해 주세요." }) }),
  marketingOptional: z.boolean(),
  signature: z.string().min(100, "서명을 작성해 주세요."),
  documentVersion: z.string().min(1),
});

export type ConsentInput = z.infer<typeof consentSchema>;

export function isValidSketchfabUid(value: string) {
  return /^[a-zA-Z0-9]{20,40}$/.test(value.trim());
}

export function getSketchfabEmbedUrl(uid: string) {
  if (!isValidSketchfabUid(uid)) return null;
  return `https://sketchfab.com/models/${uid}/embed?autostart=1&ui_theme=dark&dnt=1`;
}

export function getSafeVideoUrl(type: "youtube" | "mp4", source: string) {
  if (type === "youtube") {
    const id = source.trim();
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id)) return null;
    return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
  }

  if (/^\/assets\/[a-zA-Z0-9/_-]+\.mp4$/i.test(source.trim())) return source.trim();

  try {
    const url = new URL(source);
    if (url.protocol !== "https:" || !/\.mp4($|\?)/i.test(url.pathname + url.search)) return null;
    return url.toString();
  } catch {
    return null;
  }
}
