# 의왕 학의지구 도시개발 사업 전자 동의 모바일 웹

모바일 링크를 받은 세대원이 의왕 학의지구 도시개발 사업의 개요, Sketchfab 3D 모델, 제공 홍보영상과 부지영상, 계획 비교, 홍보 카탈로그를 확인하고 전자 동의 흐름을 체험할 수 있는 **완전한 DEMO 프로젝트**입니다. 실제 개인정보 수집, 본인인증, 법적 전자서명 및 실사업 접수는 의도적으로 비활성화되어 있습니다.

## 구현 화면

1. 프로젝트 메인 (`/`)
2. 사업 개요 (`/overview`)
3. Sketchfab 3D 뷰어 (`/model`)
4. 홍보 영상 (`/video`)
5. 사업 전후 비교·일정·FAQ (`/comparison`)
6. 전자 동의서 작성·서명 (`/consent`)
7. 최종 확인 (`/consent/review`)
8. DEMO 제출 확인·샘플 PDF (`/complete`)
9. 서버 권한 확인이 적용된 관리자 (`/admin`)

관리자에서 수정한 사업 정보, 모델 UID, 영상, 비교표, 동의서 원문은 브라우저 `localStorage`에 저장되어 사용자 화면에 즉시 반영됩니다. 동의 초안과 DEMO 결과는 현재 탭의 `sessionStorage`만 사용합니다.

## 로컬 실행

Node.js 20 이상을 권장합니다.

```bash
npm install
copy .env.example .env.local
npm run dev
```

브라우저에서 `http://localhost:3000`을 엽니다. 관리자 데모 기본 코드는 `DEMO2026`입니다. 운영 또는 공유 환경에서는 `.env.local`의 `ADMIN_DEMO_PASSCODE`, `ADMIN_SESSION_SECRET`을 반드시 변경하세요.

## 검증 명령

```bash
npm run typecheck
npm test
npm run build
```

## 콘텐츠 등록 규칙

- Sketchfab: 모델 페이지 URL 전체가 아니라 영문·숫자로 된 모델 UID만 입력합니다. iframe 주소는 `https://sketchfab.com/models/{UID}/embed` 형식으로 내부에서 생성됩니다.
- YouTube: 11자리 영상 ID만 입력하며 `youtube-nocookie.com`으로 임베드합니다.
- MP4: HTTPS이며 경로가 `.mp4`인 주소만 허용합니다.
- 외부 콘텐츠는 사용자 버튼 클릭 후 로드되며, iframe에 제한된 sandbox와 referrer 정책을 적용합니다.

## Supabase 연계 준비

- 브라우저/서버 클라이언트 팩토리: `lib/supabase/`
- 초기 PostgreSQL 스키마와 RLS 초안: `supabase/migrations/001_initial_schema.sql`
- 환경변수 예시: `.env.example`

스키마는 프로젝트 콘텐츠, 세대, 세대별 복수 대상자, 문서 버전, 동의 선택, 본인확인 결과, 서명 증빙 참조, 접수번호, 변경 불가 감사 이벤트를 분리해 추적합니다. 운영 전에는 반드시 다음 작업이 필요합니다.

- 인증 공급자와 전문 전자서명 서비스 계약 및 보안 검증
- 개인정보 암호화·키 관리·보존 및 파기 정책 확정
- 제출 API의 서버 전용 트랜잭션, 재전송 방지, rate limit, CSRF 방어
- 프로젝트별 관리자 역할과 RLS 세부 정책 확정
- 파일 저장소 악성 파일 검사 및 서명 증빙 접근제어
- 법률 자문을 통한 동의서 문구와 전자문서 효력 검토

## Vercel 배포

Git 저장소를 Vercel에 연결하고 `.env.example`의 값을 프로젝트 환경변수로 등록합니다. 현재 DEMO는 Supabase 값이 없어도 빌드 및 실행됩니다. 실제 운영 연계를 시작할 때만 Supabase URL과 키를 설정하세요.

```bash
npm run build
```

사용자 요청에 따라 이 작업에서는 Git 초기화, 커밋, push 및 배포를 수행하지 않습니다.
