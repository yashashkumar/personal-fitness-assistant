interface Point { weekDay: string; minutes: number }
export function WeeklyMinutesLine({ data }: { data: Point[] }) {
  const max = Math.max(...data.map(d=>d.minutes), 1);
  return (
    <div className="p-4 rounded border bg-white">
      <div className="text-sm font-medium mb-2">Weekly Minutes</div>
      <svg viewBox="0 0 200 80" className="w-full h-32">
        {data.map((d,i)=>{
          const x = (i/(data.length-1))*180 + 10; const y = 70 - (d.minutes/max)*60;
          return <circle key={d.weekDay} cx={x} cy={y} r={3} fill="#0284c7" />;
        })}
        <polyline fill="none" stroke="#0ea5e9" strokeWidth={2} points={data.map((d,i)=>{ const x=(i/(data.length-1))*180 +10; const y=70 -(d.minutes/max)*60; return `${x},${y}`;}).join(' ')} />
      </svg>
      <div className="flex justify-between text-[10px] text-gray-500 mt-1">
        {data.map(d=> <span key={d.weekDay}>{d.weekDay}</span>)}
      </div>
    </div>
  );
}
