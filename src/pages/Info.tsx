import { ALERTS } from '../data/content';

const FAQ = [
  ['What does Samatva do?', 'It explains warning signs in messages and links and suggests safer next steps. It does not replace official channels.'],
  ['What do the risk levels mean?', 'Low, Medium and High show how many configured warning signs were found. "Unable to assess" means there was not enough to judge.'],
  ['Does a low result mean it is safe?', 'No. Low only means none of the current rules fired. Always verify through the official app or website.'],
  ['How are user reports handled?', 'Reports are unverified until reviewed. In demo mode, nothing is stored.'],
  ['I sent money to a scammer. What now?', 'Call 1930 right away and report at cybercrime.gov.in. Tell your bank too.'],
  ['How is my information handled?', 'In demo mode everything stays in your browser. See the Privacy page. Voice input may use your browser vendor\'s speech service.']
];
export function Faq() {
  return <div className="max-w-2xl"><h1 className="text-3xl font-extrabold mb-4">Frequently asked questions</h1>
    {FAQ.map(([q, a]) => <details key={q} className="card mb-3"><summary className="font-semibold cursor-pointer min-h-[44px]">{q}</summary><p className="mt-2">{a}</p></details>)}</div>;
}
export function Alerts() {
  return <div><h1 className="text-3xl font-extrabold mb-2">Scam alerts</h1>
    <p className="mb-4 rounded-lg bg-gin/60 p-3">These are educational examples, not current threats. No live threat-intelligence source is connected.</p>
    <ul className="grid md:grid-cols-3 gap-4">{ALERTS.map(a => <li key={a.title} className="card"><p className="text-sm text-hunter">{a.cat} · Example</p><h2 className="font-bold">{a.title}</h2><p>{a.body}</p><p className="mt-2"><strong>Do:</strong> {a.act}</p></li>)}</ul></div>;
}
export function Login() {
  return <div className="max-w-xl card"><h1 className="text-3xl font-extrabold mb-2">Login</h1>
    <p>Accounts are not configured in this version, so there is no login. All public tools work without one.</p></div>;
}
