import { useState, type FormEvent } from 'react';

export default function AppChecker() {
  const [f, setF] = useState({ name: '', dev: '', pkg: '' }); const [out, setOut] = useState<string[] | null>(null); const [err, setErr] = useState('');
  function run(e: FormEvent) {
    e.preventDefault(); setOut(null);
    if (!f.name.trim() && !f.pkg.trim()) { setErr('Enter an app name or a package identifier.'); return; }
    if (f.pkg.trim() && !/^[a-z][a-z0-9_]*(\.[a-z0-9_]+)+$/i.test(f.pkg.trim())) { setErr('Package identifier looks invalid. Example: com.example.app'); return; }
    setErr(''); const o: string[] = []; const all = `${f.name} ${f.pkg}`;
    if (/anydesk|teamviewer|quicksupport|screen ?share|remote ?(support|control)/i.test(all)) o.push('Remote-access apps let someone see and control your phone. Scammers often ask people to install them. Only install one if you started the support request yourself.');
    if (/\.apk\b|\bmod\b|hack|crack/i.test(all)) o.push('The name suggests an APK file or modified app. Apps outside official stores are not reviewed.');
    if (/(kyc|loan|reward|cashback)/i.test(f.name)) o.push('Names promising loans, rewards or KYC are often used by fake apps. Check the lender or company on its official website.');
    if (!f.dev.trim()) o.push('No developer name was given, so the publisher could not be compared with the real company.');
    setOut(o);
  }
  const fld = (k: keyof typeof f, l: string, ph: string) => <div><label className="label" htmlFor={k}>{l}</label><input id={k} className="field" placeholder={ph} value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} /></div>;
  return (
    <div className="max-w-2xl"><h1 className="text-3xl font-extrabold mb-2">App Risk Checker</h1>
      <p className="mb-4">Checks only the details you type. It cannot inspect the real store listing, permissions or certificates.</p>
      <form onSubmit={run} noValidate className="card space-y-4">{fld('name', 'App name', 'Example Pay')}{fld('dev', 'Developer (optional)', 'Example Ltd')}{fld('pkg', 'Package identifier (optional)', 'com.example.app')}
        {err && <p role="alert" className="err">{err}</p>}<button className="btn-primary">Check app details</button></form>
      <div aria-live="polite">{out && <div className="card mt-4"><h2 className="font-bold">What we noticed</h2>
        {out.length ? <ul className="list-disc pl-5">{out.map(x => <li key={x}>{x}</li>)}</ul> : <p>No configured warning signs in the details given. This does not mean the app is safe.</p>}
        <h2 className="font-bold mt-3">Next steps</h2><ul className="list-disc pl-5"><li>Install only from the official app store, and compare the developer with the company's official website.</li><li>Review requested permissions. A torch app should not need your messages.</li><li>Never install an app because a caller or message told you to.</li></ul></div>}</div>
    </div>
  );
}
