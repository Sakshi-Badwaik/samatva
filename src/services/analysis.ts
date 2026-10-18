import { analyzeDemo, type AnalysisResult, type InputType } from '../features/analysis/rules';

// Integration boundary. If VITE_ANALYSIS_ENDPOINT is set, requests go to YOUR backend,
// which holds any AI / threat-intel keys. Otherwise the transparent demo rules run in the browser.
const ENDPOINT = import.meta.env.VITE_ANALYSIS_ENDPOINT as string | undefined;

export async function analyze(text: string, type: InputType): Promise<AnalysisResult> {
  if (!ENDPOINT) return analyzeDemo(text, type);
  const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, type }) });
  if (!res.ok) throw new Error('analysis_failed');
  const data = (await res.json()) as AnalysisResult;
  return { ...data, mode: 'service' };
}
