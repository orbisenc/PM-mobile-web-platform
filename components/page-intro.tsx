export function PageIntro({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="pt-9 pb-7">
      <p className="eyebrow">{step}</p>
      <h1 className="page-title">{title}</h1>
      <p className="body-copy mt-3">{children}</p>
    </div>
  );
}
