import { useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { LANGS, useI18n, type Lang } from '../i18n';

export function Layout({ children }: { children: ReactNode }) {
  const { t, lang, setLang } = useI18n();
  const [open, setOpen] = useState(false);
  const links = [['/', 'nav.home'], ['/tools', 'nav.tools'], ['/report', 'nav.report'], ['/learn', 'nav.learn'], ['/quiz', 'nav.quiz'], ['/about', 'nav.about']] as const;
  const cls = ({ isActive }: { isActive: boolean }) => `px-3 py-2 rounded-lg font-medium ${isActive ? 'text-brand underline underline-offset-4' : 'hover:bg-gin'}`;
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:bg-white focus:p-3">Skip to content</a>
      <header className="bg-white border-b border-gin">
        <div className="mx-auto max-w-page px-4 py-3 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 text-xl font-extrabold text-brand"><ShieldCheck aria-hidden />Samatva</Link>
          <nav className="hidden lg:flex ml-4" aria-label="Main">{links.map(([to, k]) => <NavLink key={to} to={to} end className={cls}>{t(k)}</NavLink>)}</nav>
          <div className="ml-auto flex items-center gap-2">
            <label className="sr-only" htmlFor="lang">{t('lang')}</label>
            <select id="lang" className="field !w-auto" value={lang} onChange={e => setLang(e.target.value as Lang)}>
              {LANGS.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
            <Link to="/tools/message-checker" className="btn-primary hidden xl:inline-flex">{t('cta.check')}</Link>
            <button className="btn-secondary lg:hidden !px-3" aria-expanded={open} aria-controls="mnav" aria-label={t('nav.menu')} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
          </div>
        </div>
        {open && (
          <nav id="mnav" className="lg:hidden mx-auto w-full max-w-page px-4 pb-3 flex flex-col" aria-label="Mobile" onClick={() => setOpen(false)}>
            {links.map(([to, k]) => <NavLink key={to} to={to} end className={cls}>{t(k)}</NavLink>)}
            <Link to="/tools/message-checker" className="btn-primary mt-2">{t('cta.check')}</Link>
          </nav>
        )}
      </header>
      <main id="main" className="mx-auto w-full max-w-page flex-1 px-4 py-8">{children}</main>
      <footer className="bg-ink text-white">
        <div className="mx-auto max-w-page px-4 py-8 space-y-4 text-sm">
          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1">
            <Link to="/about" className="underline py-2">{t('nav.about')}</Link>
            <Link to="/privacy" className="underline py-2">{t('nav.privacy')}</Link>
            <Link to="/faq" className="underline py-2">FAQ</Link>
            <Link to="/contact" className="underline py-2">Contact</Link>
            <Link to="/alerts" className="underline py-2">Alerts</Link>
            <Link to="/login" className="underline py-2">Login</Link>
            <a className="underline py-2" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>
          </nav>
          <p>{t('help.body')}</p>
        </div>
      </footer>
    </div>
  );
}
