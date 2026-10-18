export type Level = 'low' | 'medium' | 'high' | 'unknown';
export type InputType = 'message' | 'url' | 'email' | 'phone';
export interface Finding { id: string; title: string; why: string }
export interface AnalysisResult { level: Level; findings: Finding[]; next: string[]; limitation: string; mode: 'demo' | 'service' }

interface Rule extends Finding { weight: number; test: (s: string) => boolean }

const messageRules: Rule[] = [
  { id: 'urgency', weight: 2, title: 'Urgency or threat', why: 'Scammers pressure you to act before you can think or check. Real organizations rarely demand action within hours.', test: s => /\b(immediately|urgent|right now|today|within \d+ ?(hours?|minutes?)|last chance|will be (blocked|suspended|closed))\b/i.test(s) },
  { id: 'secrets', weight: 3, title: 'Asks for OTP, PIN, password or card details', why: 'Banks and genuine services never ask for these. Anyone who has them can take money from your account.', test: s => /\b(otp|upi ?pin|pin|password|cvv|card number)\b/i.test(s) },
  { id: 'link', weight: 1, title: 'Contains a link', why: 'Links in unexpected messages can lead to look-alike sites that collect your details.', test: s => /https?:\/\/\S+|\bwww\.\S+/i.test(s) },
  { id: 'shortener', weight: 2, title: 'Shortened link hides the destination', why: 'You cannot see where a shortened link really goes until after you open it.', test: s => /\b(bit\.ly|tinyurl\.com|cutt\.ly|goo\.gl|t\.co|rb\.gy)\//i.test(s) },
  { id: 'verify', weight: 2, title: 'Asks you to verify or update account details', why: 'Fake KYC and account-verification messages are a common way to steal login details.', test: s => /\b(verify|update|re-?activate)\b.{0,40}\b(account|kyc|bank|card|pan|aadhaar)\b|\b(kyc|account)\b.{0,40}\b(verify|update|blocked|expire)/i.test(s) },
  { id: 'payment', weight: 2, title: 'Unexpected payment or refund request', why: 'Approving a collect request or "refund" request sends money out, it never brings it in.', test: s => /collect request|\b(send|pay|transfer)\b.{0,30}(₹|rs\.?|inr|upi)|refund.{0,30}upi/i.test(s) },
  { id: 'prize', weight: 2, title: 'Prize, lottery or reward offer', why: 'Unexpected winnings are used to get fees or personal details from you.', test: s => /\b(lottery|you have won|prize|cashback reward)\b/i.test(s) }
];

export function parseUrl(raw: string): URL | null {
  try {
    const u = new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(raw) ? raw : 'https://' + raw);
    if (!['http:', 'https:'].includes(u.protocol) || !u.hostname.includes('.')) return null;
    return u;
  } catch { return null; }
}

function urlRules(u: URL, raw: string): Finding[] {
  const h = u.hostname.toLowerCase();
  const out: Finding[] = [];
  const add = (id: string, title: string, why: string) => out.push({ id, title, why });
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(h)) add('ip', 'Address is a number, not a name', 'Genuine services almost always use a proper domain name.');
  if (h.includes('xn--')) add('puny', 'Uses special look-alike characters', 'Some characters look like normal letters but lead to a different site.');
  if (raw.includes('@')) add('at', 'Contains "@" in the link', 'Text before "@" can disguise the real destination.');
  if (u.protocol === 'http:') add('http', 'Not using HTTPS', 'Information typed on this page is not protected in transit.');
  if (h.split('.').length > 4) add('sub', 'Unusually many sub-domains', 'Long chains can hide the real domain at the end.');
  if ((h.match(/-/g) || []).length >= 3) add('hyph', 'Many hyphens in the domain', 'Look-alike domains often stack words with hyphens.');
  if (/\.(xyz|top|click|work|loan|icu|shop)$/.test(h)) add('tld', 'Domain ending often seen in throwaway sites', 'Not proof of a scam, but common in short-lived fake sites.');
  if (/(login|verify|kyc|secure|update|refund|reward)/.test(h)) add('kw', 'Domain contains words like "verify" or "secure"', 'Fake sites often add trust words to a brand name.');
  if (/(^|\.)(bit\.ly|tinyurl\.com|cutt\.ly|goo\.gl|t\.co|rb\.gy)$/.test(h)) add('short', 'Shortened link', 'The real destination is hidden.');
  return out;
}

const NEXT: Record<Level, string[]> = {
  high: ['Do not click links, call back numbers in the message, or reply.', 'Never share OTPs, PINs or passwords with anyone.', 'Check independently using the organization\'s official app or website.', 'If you already paid or shared details, call 1930 and report at cybercrime.gov.in.'],
  medium: ['Pause before acting. Do not click links in the message.', 'Contact the organization using the number on its official website or app.', 'Ask a family member or friend you trust.'],
  low: ['Still verify through the official app or website before sharing information or paying.', 'Never share OTPs, PINs or passwords.'],
  unknown: ['Add more detail, or verify through an official channel.', 'Never share OTPs, PINs or passwords.']
};
const LIMIT = 'Preliminary, rule-based demo analysis. No live reputation or threat-intelligence database was checked. A low result is not a guarantee of safety.';

export function analyzeDemo(text: string, type: InputType): AnalysisResult {
  const base = { limitation: LIMIT, mode: 'demo' as const };
  if (type === 'phone') {
    return { ...base, level: 'unknown', findings: [], next: ['A phone number alone cannot be assessed here. Judge the request, not the number.', ...NEXT.unknown] };
  }
  let findings: Finding[] = [], score = 0;
  if (type === 'url') {
    const u = parseUrl(text.trim());
    if (!u) return { ...base, level: 'unknown', findings: [], next: ['This does not look like a valid web address. Example: https://example.com/page'] };
    findings = urlRules(u, text);
    score = findings.length * 2;
  } else {
    if (text.trim().length < 12) return { ...base, level: 'unknown', findings: [], next: ['Please paste the full message so there is enough to assess.'] };
    const hits = messageRules.filter(r => r.test(text));
    findings = hits.map(({ id, title, why }) => ({ id, title, why }));
    score = hits.reduce((n, r) => n + r.weight, 0);
  }
  const level: Level = score >= 5 ? 'high' : score >= 2 ? 'medium' : 'low';
  return { ...base, level, findings, next: NEXT[level] };
}
