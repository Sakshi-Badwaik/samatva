import { useState } from 'react';
import { useI18n } from '../i18n';

const SETS = { upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ', lower: 'abcdefghijkmnopqrstuvwxyz', digits: '23456789', symbols: '!@#$%^&*()-_=+[]{}' };
type SetKey = keyof typeof SETS;

// Unbiased index using rejection sampling over Web Crypto randomness.
function randIndex(n: number): number {
  const limit = Math.floor(0x100000000 / n) * n;
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
  return buf[0] % n;
}
function generate(len: number, on: SetKey[]): string {
  const pool = on.map(k => SETS[k]).join('');
  const chars = on.map(k => SETS[k][randIndex(SETS[k].length)]); // at least one from each chosen set
  while (chars.length < len) chars.push(pool[randIndex(pool.length)]);
  for (let i = chars.length - 1; i > 0; i--) { const j = randIndex(i + 1); [chars[i], chars[j]] = [chars[j], chars[i]]; }
  return chars.join('');
}

export default function PasswordGenerator() {
  const { t } = useI18n();
  const [len, setLen] = useState(16);
  const [on, setOn] = useState<Record<SetKey, boolean>>({ upper: true, lower: true, digits: true, symbols: true });
  const [pw, setPw] = useState('');
  const [msg, setMsg] = useState('');
  const chosen = (Object.keys(on) as SetKey[]).filter(k => on[k]);
  const bits = chosen.length ? Math.round(len * Math.log2(chosen.map(k => SETS[k]).join('').length)) : 0;
  const strength = bits >= 100 ? 'Very strong' : bits >= 70 ? 'Strong' : bits >= 50 ? 'Fair' : 'Weak';

  function make() {
    if (!chosen.length) { setMsg('Select at least one character type.'); setPw(''); return; }
    setMsg(''); setPw(generate(len, chosen));
  }
  async function copy() { try { await navigator.clipboard.writeText(pw); setMsg('Copied.'); } catch { setMsg('Copy was blocked. Select the text and copy it manually.'); } }

  return (
    <div className="max-w-xl"><h1 className="text-3xl font-extrabold mb-2">{t('tools.pw')}</h1><p className="mb-4">{t('tools.pwd')}</p>
      <div className="card space-y-4">
        <div><label className="label" htmlFor="len">Length: {len}</label><input id="len" type="range" min={12} max={64} value={len} onChange={e => setLen(+e.target.value)} className="w-full accent-brand" /></div>
        <fieldset><legend className="label">Include</legend>
          {(Object.keys(SETS) as SetKey[]).map(k => <label key={k} className="flex items-center gap-2 min-h-[44px]"><input type="checkbox" className="h-5 w-5 accent-brand" checked={on[k]} onChange={e => setOn({ ...on, [k]: e.target.checked })} />{k[0].toUpperCase() + k.slice(1)}</label>)}
        </fieldset>
        <button className="btn-primary" onClick={make}>{pw ? 'Regenerate' : 'Generate'}</button>
        <div aria-live="polite">
          {msg && <p className="err">{msg}</p>}
          {pw && <><output className="block break-all rounded-lg bg-gin/60 p-3 font-mono">{pw}</output>
            <p className="text-sm mt-2">Strength: {strength} (about {bits} bits, based on length and character types only).</p>
            <button className="btn-secondary mt-2" onClick={copy}>Copy password</button></>}
        </div>
        <p className="text-sm text-hunter">Generated in your browser. It is never sent or stored anywhere.</p>
      </div>
    </div>
  );
}
