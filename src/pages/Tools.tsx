import { Link } from 'react-router-dom';
import { useI18n } from '../i18n';

export default function Tools() {
  const { t } = useI18n();
  const items = [
    ['/tools/message-checker', t('tools.msg'), t('tools.msgd')], ['/tools/url-checker', t('tools.url'), t('tools.urld')],
    ['/tools/app-risk-checker', t('tools.app'), t('tools.appd')], ['/tools/qr-scanner', t('tools.qr'), t('tools.qrd')],
    ['/tools/hidden-content-scanner', t('tools.hid'), t('tools.hidd')], ['/tools/password-generator', t('tools.pw'), t('tools.pwd')]
  ];
  return (
    <div><h1 className="text-3xl font-extrabold mb-6">{t('tools.title')}</h1>
      <ul className="grid md:grid-cols-3 gap-4">{items.map(([to, a, b]) => <li key={to} className="card"><h2 className="font-bold text-lg"><Link className="text-brand underline" to={to}>{a}</Link></h2><p>{b}</p></li>)}</ul>
    </div>
  );
}
