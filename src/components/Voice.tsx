import { useRef, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { useI18n, type Lang } from '../i18n';

const BCP: Record<Lang, string> = { en: 'en-IN', hi: 'hi-IN', mr: 'mr-IN', pa: 'pa-IN' };
// Browser Web Speech API. In some browsers audio goes to the browser vendor's speech service.
export function MicButton({ onText }: { onText: (s: string) => void }) {
  const { lang } = useI18n(); const [on, setOn] = useState(false); const [msg, setMsg] = useState(''); const rec = useRef<any>(null);
  const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) return <p className="text-sm text-hunter">Voice input is not supported in this browser. You can type instead.</p>;
  function toggle() {
    if (on) { rec.current?.stop(); return; }
    const r = new SR(); r.lang = BCP[lang]; r.interimResults = false;
    r.onresult = (e: any) => { setMsg(''); onText(e.results[0][0].transcript); };
    r.onerror = () => setMsg('Could not hear you. Check microphone permission or type instead.');
    r.onend = () => setOn(false); rec.current = r; setOn(true); r.start();
  }
  return <div className="my-2"><button type="button" className="btn-secondary" aria-pressed={on} onClick={toggle}><Mic size={16} aria-hidden />{on ? 'Stop listening' : 'Speak instead'}</button>
    <p className="text-sm text-hunter mt-1">Check the text before analyzing. Never say OTPs, PINs or passwords aloud.</p>{msg && <p role="alert" className="err">{msg}</p>}</div>;
}
export function ReadAloud({ text }: { text: string }) {
  if (!('speechSynthesis' in window)) return null;
  return <button type="button" className="btn-secondary" onClick={() => { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'en-IN'; speechSynthesis.speak(u); }}><Volume2 size={16} aria-hidden />Read aloud</button>;
}
