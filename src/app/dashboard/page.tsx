import { generateMockKpis, mockWeeklyMinutes } from '@/modules/dashboard/mockData';
import { AdherenceGauge } from '@/components/charts/AdherenceGauge';
import { WeeklyMinutesLine } from '@/components/charts/WeeklyMinutesLine';

export default function DashboardPage(){
  const kpis = generateMockKpis();
  const weekly = mockWeeklyMinutes();
  return (
    <main className="space-y-6">
      <h2 className="text-lg font-semibold">Health Monitoring (Mock)</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <Stat label="Sessions" value={kpis.totalSessions} />
        <Stat label="Minutes" value={kpis.minutesActive} />
        <Stat label="Adherence" value={(kpis.adherence*100).toFixed(0)+'%'} />
        <Stat label="Common Duration" value={kpis.mostCommonDuration+'m'} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <AdherenceGauge adherence={kpis.adherence} />
        <WeeklyMinutesLine data={weekly} />
      </div>
    </main>
  );
}

function Stat({ label, value }:{ label:string; value: any }){
  return (
    <div className="p-4 rounded border bg-white">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
