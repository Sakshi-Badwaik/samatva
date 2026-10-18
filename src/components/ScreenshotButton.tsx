import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { useI18n, type Lang } from '../i18n';

const LANG: Record<Lang, string> = { en: 'eng', hi: 'eng+hin', mr: 'eng+mar', pa: 'eng+pan' };
const OK = ['image/png', 'image/jpeg', 'image/webp'];

// OCR runs in the browser. The library is loaded only when used, so the first page load stays light.
export function ScreenshotButton({ onText }: { onText: (s: string) => void }) {
  const { t, lang } = useI18n(); const [busy, setBusy] = useState(false); const [err, setErr] = useState('');
  async function pick(f?: File) {
    if (!f) return; setErr('');
    if (!OK.includes(f.type) || f.size > 5 * 1024 * 1024) { setErr('Use a PNG, JPEG or WebP image up to 5 MB.'); return; }
    setBusy(true);
    try {
      const { createWorker } = await import('tesseract.js');
      const w = await createWorker(LANG[lang]); const { data } = await w.recognize(f); await w.terminate();
      if (!data.text.trim()) throw new Error('empty');
      onText(data.text.trim());
    } catch { setErr(t('shot.err')); } finally { setBusy(false); }
  }
  return (
    <div className="my-2">
      <label className="btn-secondary cursor-pointer focus-within:ring-2 focus-within:ring-brand"><ImageIcon size={16} aria-hidden />{busy ? t('shot.busy') : t('shot.btn')}
        <input type="file" accept={OK.join(',')} className="sr-only" disabled={busy} onChange={e => { pick(e.target.files?.[0]); e.target.value = ''; }} /></label>
      {err && <p role="alert" className="err">{err}</p>}
    </div>
  );
}
