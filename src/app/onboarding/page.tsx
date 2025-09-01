'use client';
import { useState } from 'react';

interface Prefs { goals: string[]; equipment: string[]; daysPerWeek: number; preferredTimes: string[]; sessionLengths: number[]; recovery: { maxHighIntensityPerDay: number; sleepAware: boolean } }

export default function OnboardingWizard(){
  const [step,setStep]=useState(1);
  const [prefs,setPrefs]=useState<Prefs>({ goals:[], equipment:[], daysPerWeek:3, preferredTimes:[], sessionLengths:[20], recovery:{ maxHighIntensityPerDay:1, sleepAware:true } });
  const next=()=> setStep(s=>Math.min(3,s+1));
  const back=()=> setStep(s=>Math.max(1,s-1));
  return (
    <main className="max-w-xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold">Best Plan Setup</h2>
      {step===1 && <Step1 prefs={prefs} setPrefs={setPrefs} />}
      {step===2 && <Step2 prefs={prefs} setPrefs={setPrefs} />}
      {step===3 && <Step3 prefs={prefs} setPrefs={setPrefs} />}
      <div className="flex justify-between">
        <button onClick={back} disabled={step===1} className="px-3 py-1 border rounded disabled:opacity-40">Back</button>
        {step<3? <button onClick={next} className="px-3 py-1 bg-brand-500 text-white rounded">Next</button> : <button onClick={()=>console.log('Final Prefs', prefs)} className="px-3 py-1 bg-emerald-600 text-white rounded">Finish</button>}
      </div>
      <pre className="text-[10px] bg-gray-100 p-2 overflow-auto">{JSON.stringify(prefs,null,2)}</pre>
    </main>
  );
}

function Step1({ prefs, setPrefs }:{ prefs:Prefs; setPrefs:(p:Prefs)=>void }){
  const toggle = (field:'goals'|'equipment', value:string)=>{
    setPrefs({...prefs, [field]: prefs[field].includes(value)? prefs[field].filter(v=>v!==value): [...prefs[field], value]});
  };
  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium text-sm mb-1">Goals</div>
        {['fat-loss','strength','mobility','general'].map(g=> <Chip key={g} active={prefs.goals.includes(g)} onClick={()=>toggle('goals',g)}>{g}</Chip>)}
      </div>
      <div>
        <div className="font-medium text-sm mb-1">Equipment</div>
        {['none','dumbbells','barbell','bands','mat'].map(e=> <Chip key={e} active={prefs.equipment.includes(e)} onClick={()=>toggle('equipment',e)}>{e}</Chip>)}
      </div>
      <div>
        <label className="text-sm">Days / Week <input type="number" min={1} max={7} value={prefs.daysPerWeek} onChange={e=>setPrefs({...prefs, daysPerWeek: Number(e.target.value)})} className="ml-2 border rounded px-2 py-1 w-20" /></label>
      </div>
    </div>
  );
}

function Step2({ prefs, setPrefs }:{ prefs:Prefs; setPrefs:(p:Prefs)=>void }){
  const toggle = (field:'preferredTimes'|'sessionLengths', value:any)=>{
    setPrefs({...prefs, [field]: prefs[field as keyof Prefs].includes(value)? (prefs[field as keyof Prefs] as any).filter((v:any)=>v!==value): [...(prefs[field as keyof Prefs] as any), value]});
  };
  return (
    <div className="space-y-4">
      <div>
        <div className="font-medium text-sm mb-1">Preferred Times</div>
        {['morning','lunch','evening'].map(t=> <Chip key={t} active={prefs.preferredTimes.includes(t)} onClick={()=>toggle('preferredTimes',t)}>{t}</Chip>)}
      </div>
      <div>
        <div className="font-medium text-sm mb-1">Session Lengths (min)</div>
        {[5,10,15,20,30,45,60].map(m=> <Chip key={m} active={prefs.sessionLengths.includes(m)} onClick={()=>toggle('sessionLengths',m)}>{m}</Chip>)}
      </div>
    </div>
  );
}

function Step3({ prefs, setPrefs }:{ prefs:Prefs; setPrefs:(p:Prefs)=>void }){
  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm block mb-1">Max High Intensity / Day</label>
        <input type="number" min={0} max={3} value={prefs.recovery.maxHighIntensityPerDay} onChange={e=>setPrefs({...prefs, recovery:{...prefs.recovery, maxHighIntensityPerDay:Number(e.target.value)}})} className="border rounded px-2 py-1 w-24" />
      </div>
      <div className="flex items-center gap-2">
        <input id="sleepAware" type="checkbox" checked={prefs.recovery.sleepAware} onChange={e=>setPrefs({...prefs, recovery:{...prefs.recovery, sleepAware:e.target.checked}})} />
        <label htmlFor="sleepAware" className="text-sm">Sleep-aware lighter days</label>
      </div>
    </div>
  );
}

function Chip({ children, active, onClick }:{ children:React.ReactNode; active:boolean; onClick:()=>void }){
  return <button onClick={onClick} className={`px-2 py-1 m-1 rounded border text-xs ${active? 'bg-brand-500 text-white border-brand-600':'bg-white hover:bg-gray-50'}`}>{children}</button>;
}
