import { Checker } from '../components/Checker';
import { useI18n } from '../i18n';

const EX = ['http://secure-login-update-account.example-bank.xyz/verify', 'https://example.com/help'];

export default function UrlChecker() {
  const { t } = useI18n();
  return <div className="max-w-3xl"><h1 className="text-3xl font-extrabold mb-2">{t('tools.url')}</h1><p className="mb-4">{t('tools.urld')}</p><Checker fixed="url" examples={EX} /></div>;
}
