interface Props { adherence: number }
export function AdherenceGauge({ adherence }: Props){
  const pct = Math.round(adherence*100);
  return (
    <div className="flex flex-col items-center p-4 rounded border bg-white">
      <div className="text-sm font-medium">Adherence</div>
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path d="M18 2 a 16 16 0 0 1 0 32 a 16 16 0 0 1 0 -32" fill="none" stroke="#e5e7eb" strokeWidth="4" />
          <path d="M18 2 a 16 16 0 0 1 0 32" fill="none" stroke="#0ea5e9" strokeWidth="4" strokeDasharray={`${pct},100`} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{pct}%</div>
      </div>
    </div>
  );
}
