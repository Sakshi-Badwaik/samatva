import { useState, type FormEvent } from 'react';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;
export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', subject: '', message: '' });
  const [e, setE] = useState<Record<string, string>>({}); const [st, setSt] = useState<'idle' | 'sending' | 'sent' | 'demo' | 'error'>('idle');
  async function submit(ev: FormEvent) {
    ev.preventDefault(); if (st === 'sending') return;
    const x: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) x.email = 'Enter a valid email address.';
    if (!f.subject.trim()) x.subject = 'Enter a subject.';
    if (f.message.trim().length < 10) x.message = 'Message must be at least 10 characters.';
    setE(x); if (Object.keys(x).length) return;
    if (!ENDPOINT) { setSt('demo'); return; }
    setSt('sending');
    try { const r = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(f) }); if (!r.ok) throw 0; setSt('sent'); } catch { setSt('error'); }
  }
  const fld = (k: keyof typeof f, label: string, area = false) => (
    <div><label className="label" htmlFor={k}>{label}</label>
      {area ? <textarea id={k} rows={4} className="field" aria-invalid={!!e[k]} value={f[k]} onChange={v => setF({ ...f, [k]: v.target.value })} /> : <input id={k} className="field" aria-invalid={!!e[k]} value={f[k]} onChange={v => setF({ ...f, [k]: v.target.value })} />}
      {e[k] && <p className="err" role="alert">{e[k]}</p>}</div>);
  return (
    <div className="max-w-xl"><h1 className="text-3xl font-extrabold mb-4">Contact and feedback</h1>
      {st === 'demo' && <p role="status" className="card border-amber-600 mb-4">Demo mode: no contact backend is configured, so nothing was sent.</p>}
      {st === 'sent' && <p role="status" className="card border-sea mb-4">Thank you. Your message was sent.</p>}
      {st === 'error' && <p role="alert" className="card border-red-700 mb-4">Your message could not be sent. Please try again.</p>}
      <form onSubmit={submit} noValidate className="card space-y-4">{fld('name', 'Name (optional)')}{fld('email', 'Email address')}{fld('subject', 'Subject')}{fld('message', 'Message', true)}
        <button className="btn-primary" disabled={st === 'sending'}>{st === 'sending' ? 'Sending…' : st === 'error' ? 'Retry' : 'Send'}</button></form>
    </div>
  );
}
