import { useState } from 'react';
import jsQR from 'jsqr';
import { Checker } from '../components/Checker';
import { parseUrl } from '../features/analysis/rules';

const OK = ['image/png', 'image/jpeg', 'image/webp']; const MAX = 5 * 1024 * 1024;
export default function QrScanner() {
  const [out, setOut] = useState<string | null>(null); const [err, setErr] = useState('');
  function onFile(f?: File) {
    setOut(null); setErr('');
    if (!f) return;
    if (!OK.includes(f.type)) { setErr('Please upload a PNG, JPEG or WebP image.'); return; }
    if (f.size > MAX) { setErr('That image is larger than 5 MB.'); return; }
    const url = URL.createObjectURL(f); const img = new Image();
    img.onload = () => {
      const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
      const ctx = c.getContext('2d'); if (!ctx) { setErr('Could not read the image.'); return; }
      ctx.drawImage(img, 0, 0); const d = ctx.getImageData(0, 0, c.width, c.height);
      const r = jsQR(d.data, d.width, d.height); URL.revokeObjectURL(url);
      if (r) setOut(r.data); else setErr('No readable QR code was found in this image.');
    };
    img.onerror = () => { URL.revokeObjectURL(url); setErr('This image could not be opened.'); };
    img.src = url;
  }
  const isUrl = out !== null && !!parseUrl(out);
  return (
    <div className="max-w-3xl space-y-4"><h1 className="text-3xl font-extrabold">QR Code Scanner</h1>
      <p>Upload a picture of a QR code. It is decoded on your device and never opened automatically.</p>
      <div><label className="label" htmlFor="qr">QR image (PNG, JPEG, WebP, up to 5 MB)</label><input id="qr" type="file" accept={OK.join(',')} className="field" onChange={e => onFile(e.target.files?.[0])} /></div>
      {err && <p role="alert" className="err">{err}</p>}
      {out !== null && <div className="card"><p className="font-bold">Decoded content (not opened):</p><p className="break-all font-mono">{out}</p>
        {isUrl ? <p className="mt-2 text-sm">This is a web address. Check it below before visiting it.</p> : <p className="mt-2 text-sm">This is not a web address, so no link check applies. Treat unexpected payment or contact details with care.</p>}</div>}
      {isUrl && out && <Checker key={out} fixed="url" initial={out} />}
    </div>
  );
}
