import { useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, HelpCircle, ShieldAlert, Copy } from 'lucide-react';
import { useI18n } from '../i18n';
import { MicButton, ReadAloud } from './Voice';
import { ScreenshotButton } from './ScreenshotButton';
import { analyze } from '../services/analysis';
import type { AnalysisResult, InputType, Level } from '../features/analysis/rules';

const STYLE: Record<Level, { box: string; Icon: typeof CheckCircle2 }> = {
  low: { box: 'border-sea bg-mint text-ink', Icon: CheckCircle2 },
  medium: { box: 'border-amber-600 bg-amber-50 text-amber-950', Icon: AlertTriangle },
  high: { box: 'border-red-700 bg-red-50 text-red-950', Icon: ShieldAlert },
  unknown: { box: 'border-gray-500 bg-gray-100 text-gray-900', Icon: HelpCircle }
};

export function Checker({ fixed, examples = [], initial = '' }: { fixed?: InputType; examples?: string[]; initial?: string }) {
  const { t } = useI18n();
  const [type, setType] = useState<InputType>(fixed ?? 'message');
  const [text, setText] = useState(initial);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [res, setRes] = useState<AnalysisResult | null>(null);
  const [copied, setCopied] = useState(false);

  async function run(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) { setErr(t('checker.empty')); setRes(null); return; }
    setErr(''); setBusy(true);
    try { setRes(await analyze(text.trim().slice(0, 5000), type)); }
    catch { setErr(t('checker.fail')); }
    finally { setBusy(false); }
  }
  function clear() { setText(''); setRes(null); setErr(''); setCopied(false); }
  async function copy() {
    if (!res) return;
    const body = `${t(`risk.${res.level}` as 'risk.low')}\n` + res.findings.map(f => `- ${f.title}: ${f.why}`).join('\n') + '\n\n' + res.next.join('\n') + `\n\n${res.limitation}`;
    try { await navigator.clipboard.writeText(body); setCopied(true); } catch { /* clipboard blocked */ }
  }

  const S = res ? STYLE[res.level] : null;
  return (
    <section className="card" aria-label="Checker">
      <form onSubmit={run} noValidate>
        {!fixed && (
          <div className="mb-3">
            <label className="label" htmlFor="ctype">{t('checker.type')}</label>
            <select id="ctype" className="field" value={type} onChange={e => setType(e.target.value as InputType)}>
              {(['message', 'url', 'email', 'phone'] as InputType[]).map(v => <option key={v} value={v}>{t(`type.${v}` as 'type.url')}</option>)}
            </select>
          </div>
        )}
        <label className="label" htmlFor="ctext">{t('checker.label')}</label>
        <textarea id="ctext" className="field" rows={5} maxLength={5000} value={text} onChange={e => setText(e.target.value)}
          aria-describedby="chelp cerr" aria-invalid={!!err} />
        <p id="chelp" className="text-sm text-hunter mt-1">{t('checker.help')}</p>
        <ScreenshotButton onText={s => setText(x => (x ? x + ' ' + s : s))} />
        <MicButton onText={s => setText(x => (x + ' ' + s).trim())} />
        <p id="cerr" role="alert" className="err">{err}</p>
        {examples.length > 0 && (
          <div className="flex flex-wrap gap-2 my-3">
            {examples.map((x, i) => <button type="button" key={i} className="btn-secondary !min-h-[36px] text-sm" onClick={() => { setText(x); setRes(null); }}>Example {i + 1}</button>)}
          </div>
        )}
        <button className="btn-primary mt-2" disabled={busy}>{busy ? t('checker.busy') : t('checker.analyze')}</button>
      </form>

      <div aria-live="polite">
        {res && S && (
          <div className="mt-6 space-y-4">
            <div className={`flex items-center gap-2 rounded-lg border-2 p-3 font-bold ${S.box}`}><S.Icon aria-hidden size={22} />{t(`risk.${res.level}` as 'risk.low')}</div>
            <div>
              <h3 className="font-bold">{t('res.noticed')}</h3>
              {res.findings.length === 0 ? <p>{t('res.none')}</p> : (
                <ul className="list-disc pl-5 space-y-2 mt-1">
                  {res.findings.map(f => <li key={f.id}><strong>{f.title}.</strong> <span className="text-ink/80">{f.why}</span></li>)}
                </ul>
              )}
            </div>
            <div>
              <h3 className="font-bold">{t('res.next')}</h3>
              <ul className="list-disc pl-5 mt-1">{res.next.map((n, i) => <li key={i}>{n}</li>)}</ul>
            </div>
            <p className="text-sm">{t('res.help')}</p>
            <p className="text-sm rounded-lg bg-gin/60 p-3">{res.mode === 'demo' ? t('res.demo') : res.limitation}</p>
            <div className="flex flex-wrap gap-2">
              <button className="btn-secondary" onClick={copy}><Copy size={16} aria-hidden />{copied ? t('checker.copied') : t('checker.copy')}</button>
              <ReadAloud text={`${t(`risk.${res.level}` as 'risk.low')}. ${res.findings.map(f => f.title).join(". ")}. ${res.next[0]}`} />
              <button className="btn-secondary" onClick={clear}>{t('checker.clear')}</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
