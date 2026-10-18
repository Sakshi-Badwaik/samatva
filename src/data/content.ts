// Fictional, original educational content. Not live threat intelligence.
export interface Q { q: string; scam: boolean; why: string }
export const QUIZ: Q[] = [
  { q: 'SMS: "Your parcel is held. Pay ₹25 at http://track-parcel.example.xyz to release it."', scam: true, why: 'Small "fees" via an unfamiliar link are a common delivery scam. Check the courier\'s official app instead.' },
  { q: 'Bank app notification: "₹499 debited at a store you just paid at. If this was not you, call the number on the back of your card." No link.', scam: false, why: 'It asks for nothing and has no link. Even so, confirm in your bank\'s own app. A professional look alone proves nothing.' },
  { q: 'A caller from "customer care" asks you to install a screen-sharing app and enter your UPI PIN to fix a failed payment.', scam: true, why: 'Genuine support never needs your PIN, and screen-sharing lets the caller watch and approve payments.' },
  { q: 'A "refund department" sends a UPI collect request for ₹5,000 and says: approve it to receive your refund.', scam: true, why: 'Approving a collect request sends money out. Receiving money never needs your PIN.' },
  { q: 'Your electricity provider texts from its registered sender ID: bill due on the 20th. No link. Pay through its official app.', scam: false, why: 'No pressure, no link, and it points to the official app. Still open the app yourself rather than trusting any text.' }
];

export interface Article { slug: string; title: string; category: string; mins: number; date: string; summary: string; body: string[]; checklist: string[] }
export const ARTICLES: Article[] = [
  { slug: 'recognize-phishing', title: 'How to recognize phishing', category: 'Basics', mins: 3, date: '2026-10-18', summary: 'Phishing messages copy trusted names to make you act fast.',
    body: ['Phishing messages pretend to come from a bank, courier or government office. They push you to click a link or share details.', 'Typical signs: urgency ("today"), threats ("account blocked"), a link you did not expect, and requests for OTP or passwords.', 'Example (fictional): "Your account is blocked. Verify now at http://bank-verify.example". Open your bank\'s app yourself instead.'],
    checklist: ['Do not click links in unexpected messages', 'Open the official app or type the website yourself', 'Never share OTP, PIN or password', 'Report fraud at cybercrime.gov.in or call 1930'] },
  { slug: 'upi-scams', title: 'UPI scams and fake payment screenshots', category: 'Payments', mins: 3, date: '2026-10-18', summary: 'You never need a PIN to receive money.',
    body: ['Scammers send collect requests labelled as refunds or prizes. Approving one sends money out of your account.', 'Some buyers show an edited "payment done" screenshot. Always confirm the credit in your own bank or UPI app before handing over goods.'],
    checklist: ['Never enter your UPI PIN to receive money', 'Check the credit in your own app, not a screenshot', 'Decline unknown collect requests', 'If money was sent, call 1930 immediately'] },
  { slug: 'otp-account-takeover', title: 'OTP and account takeover scams', category: 'Accounts', mins: 2, date: '2026-10-18', summary: 'An OTP is a key to your account. Treat it like one.',
    body: ['Callers claim to be from your bank and ask you to read out an OTP "to cancel a transaction". That OTP usually approves one.', 'Real staff do not ask for OTPs. If unsure, hang up and call the number printed on your card.'],
    checklist: ['Never read an OTP to anyone', 'Hang up and call the official number', 'Do not install apps a caller asks for', 'Turn on app alerts for your bank account'] }
];
export const ALERTS = [
  { title: 'Fake delivery fee message', cat: 'Smishing', body: 'A text asks for a small fee to release a parcel via a link.', act: 'Use the courier\'s official app. Do not pay through the link.' },
  { title: 'Refund collect-request trick', cat: 'UPI fraud', body: 'A "refund" arrives as a collect request. Approving it debits you.', act: 'Decline. Receiving money never needs a PIN.' },
  { title: 'Remote-access support call', cat: 'Vishing', body: 'A caller asks you to install a screen-sharing app to "fix" a payment.', act: 'End the call and contact your bank using the number on your card.' }
];
