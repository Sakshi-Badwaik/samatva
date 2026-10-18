import { useState } from 'react';
import { useI18n } from '../i18n';
import { QUIZ } from '../data/content';

export default function Quiz() {
  const { t } = useI18n();
  const [i, setI] = useState(0); const [pick, setPick] = useState<boolean | null>(null); const [score, setScore] = useState(0);
  const done = i >= QUIZ.length; const q = QUIZ[i];
  function answer(scam: boolean) { if (pick !== null) return; setPick(scam); if (scam === q.scam) setScore(s => s + 1); }
  function next() { setPick(null); setI(i + 1); }
  function restart() { setI(0); setPick(null); setScore(0); }
  if (done) return <div className="card max-w-2xl"><h1 className="text-3xl font-extrabold">Your result: {score} / {QUIZ.length}</h1>
    <p className="my-3">Remember: urgency, requests for OTP or PIN, and unexpected links are warning signs. A professional look is not proof. Verify through the official app.</p><button className="btn-primary" onClick={restart}>Restart</button></div>;
  return (
    <div className="card max-w-2xl"><h1 className="text-3xl font-extrabold mb-1">{t('quiz.title')}</h1>
      <p role="status">Question {i + 1} of {QUIZ.length} · Score {score}</p>
      <progress className="w-full accent-brand" max={QUIZ.length} value={i + (pick === null ? 0 : 1)} aria-label="Progress" />
      <p className="my-4 text-lg">{q.q}</p>
      <div className="flex gap-3"><button className="btn-secondary" disabled={pick !== null} onClick={() => answer(true)}>{t('quiz.scam')}</button><button className="btn-secondary" disabled={pick !== null} onClick={() => answer(false)}>{t('quiz.legit')}</button></div>
      <div aria-live="polite">{pick !== null && <div className="mt-4"><p className="font-bold">{pick === q.scam ? 'Correct.' : 'Not quite.'} This one is {q.scam ? 'a scam' : 'likely legitimate'}.</p><p>{q.why}</p><button className="btn-primary mt-3" onClick={next}>{i + 1 === QUIZ.length ? 'See results' : 'Next question'}</button></div>}</div>
    </div>
  );
}
