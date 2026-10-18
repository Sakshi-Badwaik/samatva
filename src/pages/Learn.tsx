import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/content';

export function Learn() {
  const [s, setS] = useState('');
  const list = ARTICLES.filter(a => (a.title + a.summary + a.category).toLowerCase().includes(s.trim().toLowerCase()));
  return (
    <div><h1 className="text-3xl font-extrabold mb-4">Learn to spot scams</h1>
      <label className="label" htmlFor="q">Search articles</label><input id="q" className="field max-w-md mb-4" value={s} onChange={e => setS(e.target.value)} />
      {list.length === 0 ? <p role="status">No articles match your search.</p> :
        <ul className="grid md:grid-cols-3 gap-4">{list.map(a => <li key={a.slug} className="card"><p className="text-sm text-hunter">{a.category} · {a.mins} min read</p>
          <h2 className="font-bold text-lg"><Link className="text-brand underline" to={`/learn/${a.slug}`}>{a.title}</Link></h2><p>{a.summary}</p></li>)}</ul>}
    </div>
  );
}
export function ArticlePage() {
  const { slug } = useParams(); const a = ARTICLES.find(x => x.slug === slug);
  if (!a) return <p>Article not found. <Link className="text-brand underline" to="/learn">Back to Learn</Link></p>;
  const rel = ARTICLES.filter(x => x.slug !== a.slug);
  return (
    <article className="max-w-2xl space-y-3"><p className="text-sm text-hunter">{a.category} · {a.mins} min read · Draft published {a.date}</p>
      <h1 className="text-3xl font-extrabold">{a.title}</h1>{a.body.map((p, i) => <p key={i}>{p}</p>)}
      <h2 className="text-xl font-bold">Protective checklist</h2><ul className="list-disc pl-5">{a.checklist.map(c => <li key={c}>{c}</li>)}</ul>
      <p>Official help: call 1930 or visit <a className="text-brand underline" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>.</p>
      <h2 className="text-xl font-bold">Related</h2><ul className="list-disc pl-5">{rel.map(r => <li key={r.slug}><Link className="text-brand underline" to={`/learn/${r.slug}`}>{r.title}</Link></li>)}</ul>
    </article>
  );
}
