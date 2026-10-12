"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, LockKeyhole, ShieldCheck, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { PageIntro } from "@/components/page-intro";
import { ConsentSteps } from "@/components/consent-steps";
import { SignaturePad } from "@/components/signature-pad";
import { SiteHeader } from "@/components/site-header";
import { DRAFT_KEY } from "@/lib/demo-data";
import { useDemoContent } from "@/lib/use-demo-content";
import { consentSchema, type ConsentInput } from "@/lib/validation";

export default function ConsentPage() {
  const router = useRouter(); const { project, hydrated } = useDemoContent();
  const { register, control, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ConsentInput>({
    resolver: zodResolver(consentSchema),
    defaultValues: { name: "", building: "", unit: "", phone: "", privacyRequired: undefined, marketingOptional: false, signature: "", documentVersion: project.documentVersion },
  });
  useEffect(()=>{if(hydrated)setValue("documentVersion",project.documentVersion)},[hydrated,project.documentVersion,setValue]);
  const submit = (data: ConsentInput) => { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data)); router.push("/consent/review"); };
  const error = (name: keyof ConsentInput) => errors[name]?.message;

  return <main className="page-shell pb-10"><SiteHeader title="전자 동의서" back="/comparison"/><form onSubmit={handleSubmit(submit)} className="mobile-content"><ConsentSteps current={1}/><PageIntro step="05 · 의견 제출하기" title="전자 동의서 작성">내용을 다시 확인하고 본인의 정보를 입력한 뒤 동의 여부를 직접 선택해 주세요.</PageIntro>
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><strong className="block">DEMO 작성 화면</strong>입력 내용은 서버로 전송하거나 저장하지 않으며 이 브라우저의 현재 세션에서만 최종 확인에 사용됩니다.</div>
    <section className="mt-7"><div className="flex items-center justify-between"><h2 className="section-title">동의서 원문</h2><span className="demo-badge">{project.documentVersion}</span></div><details className="card mt-3 p-5" open><summary className="flex cursor-pointer list-none items-center justify-between font-bold">문서 내용 확인 <ChevronDown size={18}/></summary><p className="body-copy mt-4 border-t border-slate-100 pt-4">{project.documentText}</p></details></section>
    <section className="mt-9"><h2 className="section-title">동의자 정보</h2><div className="mt-4 space-y-4"><Field label="이름" error={error("name")}><input className="field" placeholder="예: 홍길동" autoComplete="name" {...register("name")}/></Field><div className="grid grid-cols-2 gap-3"><Field label="동" error={error("building")}><input className="field" inputMode="numeric" placeholder="101" {...register("building")}/></Field><Field label="호수" error={error("unit")}><input className="field" inputMode="numeric" placeholder="1203" {...register("unit")}/></Field></div><Field label="연락처" error={error("phone")}><input className="field" inputMode="tel" placeholder="010-1234-5678" autoComplete="tel" {...register("phone")}/></Field></div></section>
    <section className="mt-9"><h2 className="section-title">본인확인</h2><div className="card mt-3 p-5"><div className="flex gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-slate-100 text-slate-500"><UserCheck/></span><div><strong>전문 본인확인 서비스 연동 예정</strong><p className="mt-2 text-sm leading-6 text-slate-500">운영 전 보안 검토 후 휴대전화 본인확인 모듈을 연결합니다. 데모에서는 인증을 수행하지 않습니다.</p></div></div><button type="button" disabled className="mt-4 min-h-12 w-full rounded-xl bg-slate-100 text-sm font-bold text-slate-400">DEMO에서 비활성화</button></div></section>
    <section className="mt-9"><h2 className="section-title">개인정보 안내</h2><div className="mt-3 space-y-3"><Checkbox control={control} name="privacyRequired" required label="[필수] 개인정보 수집·이용 고지를 확인했습니다"/><Checkbox control={control} name="marketingOptional" label="[선택] 사업 안내 소식 수신에 동의합니다"/></div>{errors.privacyRequired&&<p className="mt-2 text-sm font-semibold text-red-600">{errors.privacyRequired.message}</p>}</section>
    <section className="mt-9"><h2 className="section-title">의견 선택</h2><p className="mt-2 text-sm text-slate-500">어느 항목도 미리 선택되어 있지 않습니다.</p><Controller name="decision" control={control} render={({field})=><div className="mt-4 grid grid-cols-2 gap-3">{[["agree","동의합니다"],["disagree","동의하지 않습니다"]].map(([value,label])=><button type="button" key={value} onClick={()=>field.onChange(value)} className={`relative min-h-[92px] rounded-2xl border-2 p-4 text-left font-bold transition ${field.value===value?"border-primary bg-blue-50 text-primary":"border-slate-200 bg-white"}`}>{field.value===value&&<Check className="absolute right-3 top-3" size={18}/>}<span className="block text-sm text-slate-400">의견</span><span className="mt-2 block">{label}</span></button>)}</div>}/>{errors.decision&&<p className="mt-2 text-sm font-semibold text-red-600">{errors.decision.message}</p>}</section>
    <section className="mt-9"><h2 className="section-title">서명</h2><p className="mt-2 text-sm leading-6 text-slate-500">운영 버전에서는 전문 전자서명 서비스의 증빙값과 감사 로그를 함께 보관합니다.</p><div className="mt-4"><Controller name="signature" control={control} render={({field})=><SignaturePad value={field.value} onChange={field.onChange}/>} />{errors.signature&&<p className="mt-2 text-sm font-semibold text-red-600">{errors.signature.message}</p>}</div></section>
    <div className="mt-9 flex items-start gap-3 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900"><ShieldCheck className="mt-0.5 shrink-0" size={20}/> 다음 화면에서 모든 내용을 최종 확인한 후 DEMO 제출을 완료합니다.</div>
    <button disabled={isSubmitting} className="button-primary mt-5 w-full">입력 내용 확인하기 <LockKeyhole size={19}/></button>
  </form></main>;
}

function Field({label,error,children}:{label:string;error?:string;children:React.ReactNode}){return <label className="block"><span className="label">{label}</span>{children}{error&&<span className="mt-1.5 block text-sm font-semibold text-red-600">{error}</span>}</label>}

function Checkbox({control,name,label,required}:{control:any;name:"privacyRequired"|"marketingOptional";label:string;required?:boolean}){return <Controller name={name} control={control} render={({field})=><label className={`flex min-h-16 cursor-pointer items-center gap-3 rounded-2xl border p-4 ${field.value?"border-blue-300 bg-blue-50":"border-slate-200 bg-white"}`}><input type="checkbox" className="size-5 accent-primary" checked={Boolean(field.value)} onChange={field.onChange}/><span className="text-sm font-bold">{label}</span>{required&&<span className="ml-auto text-xs font-bold text-primary">필수</span>}</label>}/>}
