import { Link } from 'react-router-dom';
import { Checker } from '../components/Checker';
import { useI18n } from '../i18n';

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="space-y-12">
      <section className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{t('hero.title')}</h1>
          <p className="mt-4 text-lg">{t('hero.sub')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#ctext" className="btn-primary">{t('cta.check')}</a>
            <Link to="/tools" className="btn-secondary">{t('cta.tools')}</Link>
          </div>
          <p className="mt-4 text-sm text-hunter">{t('hero.reassure')}</p>
        </div>
        <Checker />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">{t('how.title')}</h2>
        <ol className="grid md:grid-cols-3 gap-4">
          {(['1', '2', '3'] as const).map(n => (
            <li key={n} className="card"><span className="font-bold text-brand">{n}</span>
              <h3 className="font-bold">{t(`how.${n}` as 'how.1')}</h3><p>{t(`how.${n}d` as 'how.1d')}</p></li>
          ))}
        </ol>
      </section>
      <section className="card bg-gin/50">
        <h2 className="text-xl font-bold">{t('help.title')}</h2><p>{t('help.body')}</p>
      </section>
    </div>
  );
}
