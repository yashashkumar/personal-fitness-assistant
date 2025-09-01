import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <div className="space-y-16">
      <Hero />
      <section id="learn-more" className="mx-auto max-w-5xl space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Feature title="Privacy-First" desc="We never persist calendar event text—only anonymized counts for metrics." icon={ShieldIcon} />
          <Feature title="Micro + Macro Planning" desc="From 5‑minute resets to 90‑minute deep sessions—every gap is usable." icon={ClockIcon} />
          <Feature title="Adaptive Recovery" desc="Intensity auto-balances with lighter days after hard efforts or low sleep." icon={AdjustIcon} />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, desc, icon:Icon }:{ title:string; desc:string; icon:(p:{className?:string})=>JSX.Element }){
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-md focus-within:shadow-md">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-brand-100 text-brand-700">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mb-1 text-sm font-semibold text-gray-900">{title}</h3>
      <p className="text-xs leading-relaxed text-gray-600">{desc}</p>
    </div>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M12 3 4.5 6v6c0 5 3.5 7.5 7.5 9 4-1.5 7.5-4 7.5-9V6L12 3Z"/></svg>;
}
function ClockIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>;
}
function AdjustIcon({ className }: { className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}><path d="M4 12h16"/><path d="M12 4v16"/><circle cx="12" cy="12" r="3"/></svg>;
}

