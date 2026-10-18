import { useState } from 'react';

const EXT = ['txt', 'html', 'htm', 'svg', 'csv', 'md', 'json']; const MAX = 1024 * 1024;
interface R { name: string; type: string; size: number; found: string[] }
export default function HiddenScanner() {
  const [r, setR] = useState<R | null>(null); const [err, setErr] = useState('');
  async function onFile(f?: File) {
    setR(null); setErr(''); if (!f) return;
    const ext = f.name.split('.').pop()?.toLowerCase() ?? '';
    if (!EXT.includes(ext)) { setErr(`Unsupported file type. Supported: ${EXT.join(', ')}.`); return; }
    if (f.size > MAX) { setErr('File is larger than 1 MB.'); return; }
    const s = await f.text(); const found: string[] = []; // text is only read, never rendered or executed
    const n = (re: RegExp) => (s.match(re) || []).length;
    const inv = n(/[\u200B-\u200F\u202A-\u202E\u2060-\u2064\uFEFF]/g); if (inv) found.push(`${inv} invisible or direction-changing characters (can disguise text)`);
    if (['html', 'htm', 'svg'].includes(ext)) {
      const c = n(/<!--/g); if (c) found.push(`${c} HTML comment(s)`);
      const h = n(/display\s*:\s*none|visibility\s*:\s*hidden|font-size\s*:\s*0|opacity\s*:\s*0|\shidden[\s>=]/gi); if (h) found.push(`${h} hidden-styling marker(s)`);
      const sc = n(/<script/gi); if (sc) found.push(`${sc} script tag(s)`);
      const fr = n(/<iframe/gi); if (fr) found.push(`${fr} iframe(s)`);
      const ev = n(/\son\w+\s*=|javascript:/gi); if (ev) found.push(`${ev} inline script handler(s) or javascript: link(s)`);
    }
    setR({ name: f.name, type: f.type || ext, size: f.size, found });
  }
  return (
    <div className="max-w-2xl space-y-4"><h1 className="text-3xl font-extrabold">Hidden Content Scanner</h1>
      <p>Reads supported text-based files and looks for a few known hiding techniques. The file is read as plain text only and never run.</p>
      <div><label className="label" htmlFor="hf">File ({EXT.join(', ')}; up to 1 MB)</label><input id="hf" type="file" className="field" onChange={e => onFile(e.target.files?.[0])} /></div>
      {err && <p role="alert" className="err">{err}</p>}
      {r && <div className="card" aria-live="polite"><p><strong>{r.name}</strong> · {r.type} · {Math.round(r.size / 1024)} KB</p>
        <h2 className="font-bold mt-2">Content inspection</h2>
        {r.found.length ? <ul className="list-disc pl-5">{r.found.map(x => <li key={x}>{x}</li>)}</ul> : <p>None of the configured indicators were found. This does not prove the file is safe.</p>}
        <p className="text-sm mt-3 rounded-lg bg-gin/60 p-3">Limits: only these text formats and a short list of patterns are checked. PDFs, Office files, images and macros are not supported.</p></div>}
    </div>
  );
}
