import { Checker } from '../components/Checker';
import { useI18n } from '../i18n';

// Fictional examples only.
const EX = ['Your bank account will be blocked today. Verify immediately using this link: http://bit.ly/fake-verify', 'Hi, your parcel is at the depot. Reschedule delivery in the courier app you used. No payment needed.'];

export default function MessageChecker() {
  const { t } = useI18n();
  return <div className="max-w-3xl"><h1 className="text-3xl font-extrabold mb-2">{t('tools.msg')}</h1><p className="mb-4">{t('tools.msgd')}</p><Checker fixed="message" examples={EX} /></div>;
}
