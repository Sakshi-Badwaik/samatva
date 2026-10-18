import { useState, type FormEvent } from 'react';
import { useI18n } from '../i18n';

const ENDPOINT = import.meta.env.VITE_REPORT_ENDPOINT as string | undefined;
type State = 'idle' | 'sending' | 'sent' | 'demo' | 'error';

export default function Report() {
  const { t } = useI18n();
  const [f, setF] = useState({ type: 'Message', content: '', description: '' });
  const [errs, setErrs] = useState<Record<string, string>>({});
  const [state, setState] = useState<State>('idle');
  const [ref, setRef] = useState('');

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (state === 'sending') return;
    const x: Record<string, string> = {};
    if (!f.content.trim()) x.content = 'Please enter the suspicious content or identifier.';
    if (f.description.trim().length < 10) x.description = 'Please describe what happened (at least 10 characters).';
    setErrs(x);
    if (Object.keys(x).length) return;
    if (!ENDPOINT) { setState('demo'); return; } // honest demo: nothing is sent
    setState('sending');
    try {
      const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify({ ...f, submittedAt: new Date().toISOString() }) });
      if (!r.ok) throw new Error('failed');
      const data = await r.json().catch(() => ({}));
      setRef(typeof data.ref === 'string' ? data.ref : ''); setState('sent');
    } catch { setState('error'); }
  }

  return (
    <div className="max-w-2xl"><h1 className="text-3xl font-extrabold mb-2">{t('nav.report')}</h1>
      <p className="mb-4">Reports are unverified until reviewed. Do not include OTPs, PINs, passwords or bank details. This form does not report to the authorities; for fraud, call 1930 or use cybercrime.gov.in.</p>
      {state === 'demo' && <p role="status" className="card border-amber-600 mb-4">Demo mode: no reporting backend is configured, so nothing was sent or stored.</p>}
      {state === 'sent' && <p role="status" className="card border-sea mb-4">Report stored.{ref && <> Reference: <strong>{ref}</strong></>}</p>}
      {state === 'error' && <p role="alert" className="card border-red-700 mb-4">We could not submit your report. Please try again.</p>}
      <form onSubmit={submit} noValidate className="card space-y-4">
        <div><label className="label" htmlFor="rt">Report type</label>
          <select id="rt" className="field" value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>{['URL', 'Message', 'Phone', 'Email', 'Payment request', 'Other'].map(o => <option key={o}>{o}</option>)}</select></div>
        <div><label className="label" htmlFor="rc">Suspicious content or identifier</label>
          <textarea id="rc" rows={3} maxLength={2000} className="field" aria-invalid={!!errs.content} value={f.content} onChange={e => setF({ ...f, content: e.target.value })} />
          {errs.content && <p className="err" role="alert">{errs.content}</p>}</div>
        <div><label className="label" htmlFor="rd">What happened?</label>
          <textarea id="rd" rows={4} maxLength={2000} className="field" aria-invalid={!!errs.description} value={f.description} onChange={e => setF({ ...f, description: e.target.value })} />
          {errs.description && <p className="err" role="alert">{errs.description}</p>}</div>
        <button className="btn-primary" disabled={state === 'sending'}>{state === 'sending' ? 'Submitting…' : state === 'error' ? 'Retry' : 'Submit report'}</button>
      </form>
    </div>
  );
}
