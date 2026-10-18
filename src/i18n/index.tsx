import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type Lang = 'en' | 'hi' | 'mr' | 'pa';
export const LANGS: { code: Lang; label: string }[] = [
  { code: 'en', label: 'English' }, { code: 'hi', label: 'हिन्दी' }, { code: 'mr', label: 'मराठी' }, { code: 'pa', label: 'ਪੰਜਾਬੀ' }
];

const en = {
  'nav.home': 'Home', 'nav.tools': 'Safety Tools', 'nav.report': 'Report a Scam', 'nav.about': 'About', 'nav.learn': 'Learn', 'nav.quiz': 'Quiz', 'nav.privacy': 'Privacy',
  'nav.menu': 'Open menu', 'lang': 'Language',
  'cta.check': 'Check a suspicious message', 'cta.tools': 'Explore safety tools',
  'hero.title': "Not sure if it's a scam? Let's figure it out.",
  'hero.sub': 'Check suspicious messages, links, and digital requests. Understand the warning signs and learn what to do next.',
  'hero.reassure': 'Simple explanations. Practical next steps. Your safety comes first.',
  'checker.type': 'What are you checking?', 'checker.label': 'Paste the suspicious content',
  'checker.help': 'Remove passwords, OTPs, bank details, and other sensitive information before submitting.',
  'checker.analyze': 'Analyze', 'checker.busy': 'Analyzing…', 'checker.clear': 'Clear and check something else', 'checker.copy': 'Copy explanation', 'checker.copied': 'Copied',
  'checker.empty': 'Please paste a message or link first.', 'checker.fail': 'The analysis could not be completed. Please try again.',
  'type.message': 'Message', 'type.url': 'URL', 'type.email': 'Email', 'type.phone': 'Phone number',
  'risk.low': 'Low risk', 'risk.medium': 'Medium risk', 'risk.high': 'High risk', 'risk.unknown': 'Unable to assess',
  'res.noticed': 'What we noticed', 'res.why': 'Why it matters', 'res.next': 'What you should do next', 'res.none': 'No configured warning signs were found. This does not mean it is safe.',
  'res.help': 'Need help? If money was lost, call 1930 and report at cybercrime.gov.in.',
  'res.demo': 'Demo analysis: preliminary, rule-based, no live threat database was checked. Explanations are shown in English.',
  'how.title': 'How Samatva works',
  'how.1': 'Share what looks suspicious', 'how.1d': 'Paste a message or enter a link.',
  'how.2': 'Understand the warning signs', 'how.2d': 'See which indicators may signal a scam.',
  'how.3': 'Choose a safer next step', 'how.3d': 'Follow practical guidance or contact an official channel.',
  'tools.title': 'Safety tools', 'tools.msg': 'Message Checker', 'tools.msgd': 'Look for warning patterns in SMS, WhatsApp or email text.',
  'tools.url': 'URL Checker', 'tools.urld': 'Check a link for suspicious patterns before you open it.',
  'tools.pw': 'Password Generator', 'tools.pwd': 'Create strong passwords on your own device.',
  'tools.app': 'App Risk Checker', 'tools.appd': 'Check app details you type for warning signs.', 'tools.qr': 'QR Code Scanner', 'tools.qrd': 'Decode a QR image and check any link inside it.', 'tools.hid': 'Hidden Content Scanner', 'tools.hidd': 'Look for hidden text tricks in supported text files.',
  'shot.btn': 'Read text from a screenshot', 'shot.busy': 'Reading the screenshot…', 'shot.err': 'Could not read text from this image.', 'quiz.title': 'Scam or legitimate?', 'quiz.scam': 'Scam', 'quiz.legit': 'Looks legitimate',
  'help.title': 'Official help', 'help.body': 'Financial fraud helpline: 1930. Report at cybercrime.gov.in.'
};
type Key = keyof typeof en;
const hi: Partial<Record<Key, string>> = {
  'nav.home': 'होम', 'nav.tools': 'सुरक्षा टूल', 'nav.report': 'स्कैम रिपोर्ट करें', 'nav.about': 'हमारे बारे में', 'nav.privacy': 'गोपनीयता', 'lang': 'भाषा',
  'cta.check': 'संदिग्ध संदेश जाँचें', 'cta.tools': 'सुरक्षा टूल देखें',
  'hero.title': 'पक्का नहीं कि यह स्कैम है? चलिए पता करते हैं.',
  'hero.sub': 'संदिग्ध संदेश और लिंक जाँचें, चेतावनी के संकेत समझें और जानें कि आगे क्या करना है।',
  'hero.reassure': 'सरल जानकारी। व्यावहारिक अगले कदम। आपकी सुरक्षा सबसे पहले।',
  'checker.type': 'आप क्या जाँच रहे हैं?', 'checker.label': 'संदिग्ध सामग्री यहाँ चिपकाएँ',
  'checker.help': 'भेजने से पहले पासवर्ड, OTP, बैंक विवरण और अन्य निजी जानकारी हटा दें।',
  'checker.analyze': 'जाँचें', 'checker.busy': 'जाँच हो रही है…', 'checker.clear': 'साफ़ करें और दूसरी चीज़ जाँचें', 'checker.copy': 'व्याख्या कॉपी करें', 'checker.copied': 'कॉपी हो गया',
  'checker.empty': 'कृपया पहले कोई संदेश या लिंक लिखें।', 'checker.fail': 'जाँच पूरी नहीं हो सकी। कृपया फिर कोशिश करें।',
  'type.message': 'संदेश', 'type.url': 'लिंक', 'type.email': 'ईमेल', 'type.phone': 'फ़ोन नंबर',
  'risk.low': 'कम जोखिम', 'risk.medium': 'मध्यम जोखिम', 'risk.high': 'उच्च जोखिम', 'risk.unknown': 'आकलन संभव नहीं',
  'res.noticed': 'हमें क्या दिखा', 'res.why': 'यह क्यों मायने रखता है', 'res.next': 'आगे क्या करें', 'res.none': 'कोई तय चेतावनी संकेत नहीं मिला। इसका मतलब यह नहीं कि यह सुरक्षित है।',
  'res.help': 'मदद चाहिए? पैसे का नुकसान हुआ हो तो 1930 पर कॉल करें और cybercrime.gov.in पर रिपोर्ट करें।',
  'res.demo': 'डेमो जाँच: प्रारंभिक और नियम-आधारित है, किसी लाइव खतरा-डेटाबेस से नहीं मिलाई गई। व्याख्या अंग्रेज़ी में दिखती है।',
  'how.title': 'समत्व कैसे काम करता है',
  'how.1': 'जो संदिग्ध लगे वह साझा करें', 'how.1d': 'संदेश चिपकाएँ या लिंक डालें।',
  'how.2': 'चेतावनी के संकेत समझें', 'how.2d': 'देखें कि कौन से संकेत स्कैम की ओर इशारा कर सकते हैं।',
  'how.3': 'सुरक्षित अगला कदम चुनें', 'how.3d': 'व्यावहारिक सलाह मानें या आधिकारिक माध्यम से संपर्क करें।',
  'tools.title': 'सुरक्षा टूल', 'tools.msg': 'संदेश जाँचक', 'tools.url': 'लिंक जाँचक', 'tools.pw': 'पासवर्ड जनरेटर',
  'nav.learn': 'सीखें', 'nav.quiz': 'क्विज़', 'tools.app': 'ऐप जोखिम जाँचक', 'tools.appd': 'आपके दिए ऐप विवरण में चेतावनी के संकेत देखें।', 'tools.qr': 'QR कोड स्कैनर', 'tools.qrd': 'QR तस्वीर पढ़ें और उसके अंदर का लिंक जाँचें।', 'tools.hid': 'छिपी सामग्री स्कैनर', 'tools.hidd': 'समर्थित टेक्स्ट फ़ाइलों में छिपी चालें खोजें।',
  'shot.btn': 'स्क्रीनशॉट से टेक्स्ट पढ़ें', 'shot.busy': 'स्क्रीनशॉट पढ़ा जा रहा है…', 'shot.err': 'इस तस्वीर से टेक्स्ट नहीं पढ़ा जा सका।', 'quiz.title': 'स्कैम या असली?', 'quiz.scam': 'स्कैम', 'quiz.legit': 'असली लगता है',
  'help.title': 'आधिकारिक मदद', 'help.body': 'वित्तीय धोखाधड़ी हेल्पलाइन: 1930। cybercrime.gov.in पर रिपोर्ट करें।'
};
const mr: Partial<Record<Key, string>> = {
  'nav.home': 'होम', 'nav.tools': 'सुरक्षा साधने', 'nav.report': 'स्कॅम नोंदवा', 'nav.about': 'आमच्याबद्दल', 'nav.privacy': 'गोपनीयता', 'lang': 'भाषा',
  'cta.check': 'संशयास्पद संदेश तपासा', 'cta.tools': 'सुरक्षा साधने पहा',
  'hero.title': 'हा स्कॅम आहे का याची खात्री नाही? चला शोधूया.',
  'hero.sub': 'संशयास्पद संदेश आणि लिंक तपासा, धोक्याची चिन्हे समजून घ्या आणि पुढे काय करायचे ते जाणून घ्या.',
  'hero.reassure': 'सोपे स्पष्टीकरण. व्यावहारिक पुढची पावले. तुमची सुरक्षा प्रथम.',
  'checker.type': 'तुम्ही काय तपासत आहात?', 'checker.label': 'संशयास्पद मजकूर इथे पेस्ट करा',
  'checker.help': 'सबमिट करण्यापूर्वी पासवर्ड, OTP, बँक तपशील आणि इतर खासगी माहिती काढून टाका.',
  'checker.analyze': 'तपासा', 'checker.busy': 'तपासणी सुरू आहे…', 'checker.clear': 'साफ करा आणि दुसरे तपासा', 'checker.copy': 'स्पष्टीकरण कॉपी करा', 'checker.copied': 'कॉपी झाले',
  'checker.empty': 'कृपया आधी संदेश किंवा लिंक लिहा.', 'checker.fail': 'तपासणी पूर्ण होऊ शकली नाही. कृपया पुन्हा प्रयत्न करा.',
  'type.message': 'संदेश', 'type.url': 'लिंक', 'type.email': 'ईमेल', 'type.phone': 'फोन नंबर',
  'risk.low': 'कमी धोका', 'risk.medium': 'मध्यम धोका', 'risk.high': 'जास्त धोका', 'risk.unknown': 'मूल्यांकन शक्य नाही',
  'res.noticed': 'आम्हाला काय दिसले', 'res.why': 'हे का महत्त्वाचे आहे', 'res.next': 'पुढे काय करावे', 'res.none': 'ठरलेली कोणतीही धोक्याची चिन्हे आढळली नाहीत. याचा अर्थ ते सुरक्षित आहे असा नाही.',
  'res.help': 'मदत हवी आहे? पैसे गेले असतील तर 1930 वर कॉल करा आणि cybercrime.gov.in वर तक्रार करा.',
  'res.demo': 'डेमो तपासणी: प्राथमिक आणि नियम-आधारित आहे, कोणत्याही थेट धोका-डेटाबेसशी पडताळलेली नाही. स्पष्टीकरण इंग्रजीत दिसते.',
  'how.title': 'समत्व कसे काम करते',
  'how.1': 'संशयास्पद वाटणारे शेअर करा', 'how.1d': 'संदेश पेस्ट करा किंवा लिंक टाका.',
  'how.2': 'धोक्याची चिन्हे समजून घ्या', 'how.2d': 'कोणती चिन्हे स्कॅमकडे निर्देश करू शकतात ते पहा.',
  'how.3': 'सुरक्षित पुढची पायरी निवडा', 'how.3d': 'व्यावहारिक सूचना पाळा किंवा अधिकृत माध्यमातून संपर्क करा.',
  'tools.title': 'सुरक्षा साधने', 'tools.msg': 'संदेश तपासक', 'tools.url': 'लिंक तपासक', 'tools.pw': 'पासवर्ड जनरेटर',
  'nav.learn': 'शिका', 'nav.quiz': 'प्रश्नमंजुषा', 'tools.app': 'अ‍ॅप धोका तपासक', 'tools.appd': 'तुम्ही दिलेल्या अ‍ॅप तपशिलात धोक्याची चिन्हे पाहा.', 'tools.qr': 'QR कोड स्कॅनर', 'tools.qrd': 'QR प्रतिमा वाचा आणि त्यातील लिंक तपासा.', 'tools.hid': 'लपलेला मजकूर स्कॅनर', 'tools.hidd': 'समर्थित मजकूर फाइलमधील लपवण्याच्या युक्त्या शोधा.',
  'shot.btn': 'स्क्रीनशॉटमधून मजकूर वाचा', 'shot.busy': 'स्क्रीनशॉट वाचला जात आहे…', 'shot.err': 'या प्रतिमेतून मजकूर वाचता आला नाही.', 'quiz.title': 'स्कॅम की खरे?', 'quiz.scam': 'स्कॅम', 'quiz.legit': 'खरे वाटते',
  'help.title': 'अधिकृत मदत', 'help.body': 'आर्थिक फसवणूक हेल्पलाइन: 1930. cybercrime.gov.in वर तक्रार करा.'
};
const pa: Partial<Record<Key, string>> = {
  'nav.home': 'ਹੋਮ', 'nav.tools': 'ਸੁਰੱਖਿਆ ਟੂਲ', 'nav.report': 'ਸਕੈਮ ਦੀ ਰਿਪੋਰਟ ਕਰੋ', 'nav.about': 'ਸਾਡੇ ਬਾਰੇ', 'nav.privacy': 'ਪਰਦੇਦਾਰੀ', 'lang': 'ਭਾਸ਼ਾ',
  'cta.check': 'ਸ਼ੱਕੀ ਸੁਨੇਹਾ ਜਾਂਚੋ', 'cta.tools': 'ਸੁਰੱਖਿਆ ਟੂਲ ਵੇਖੋ',
  'hero.title': 'ਪੱਕਾ ਨਹੀਂ ਕਿ ਇਹ ਸਕੈਮ ਹੈ? ਆਓ ਪਤਾ ਕਰੀਏ.',
  'hero.sub': 'ਸ਼ੱਕੀ ਸੁਨੇਹੇ ਅਤੇ ਲਿੰਕ ਜਾਂਚੋ, ਚੇਤਾਵਨੀ ਦੇ ਸੰਕੇਤ ਸਮਝੋ ਅਤੇ ਜਾਣੋ ਕਿ ਅੱਗੇ ਕੀ ਕਰਨਾ ਹੈ।',
  'hero.reassure': 'ਸੌਖੀ ਵਿਆਖਿਆ। ਅਮਲੀ ਅਗਲੇ ਕਦਮ। ਤੁਹਾਡੀ ਸੁਰੱਖਿਆ ਸਭ ਤੋਂ ਪਹਿਲਾਂ।',
  'checker.type': 'ਤੁਸੀਂ ਕੀ ਜਾਂਚ ਰਹੇ ਹੋ?', 'checker.label': 'ਸ਼ੱਕੀ ਸਮੱਗਰੀ ਇੱਥੇ ਪੇਸਟ ਕਰੋ',
  'checker.help': 'ਜਮ੍ਹਾਂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਪਾਸਵਰਡ, OTP, ਬੈਂਕ ਵੇਰਵੇ ਅਤੇ ਹੋਰ ਨਿੱਜੀ ਜਾਣਕਾਰੀ ਹਟਾ ਦਿਓ।',
  'checker.analyze': 'ਜਾਂਚੋ', 'checker.busy': 'ਜਾਂਚ ਹੋ ਰਹੀ ਹੈ…', 'checker.clear': 'ਸਾਫ਼ ਕਰੋ ਅਤੇ ਹੋਰ ਜਾਂਚੋ', 'checker.copy': 'ਵਿਆਖਿਆ ਕਾਪੀ ਕਰੋ', 'checker.copied': 'ਕਾਪੀ ਹੋ ਗਿਆ',
  'checker.empty': 'ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਸੁਨੇਹਾ ਜਾਂ ਲਿੰਕ ਲਿਖੋ।', 'checker.fail': 'ਜਾਂਚ ਪੂਰੀ ਨਹੀਂ ਹੋ ਸਕੀ। ਕਿਰਪਾ ਕਰਕੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
  'type.message': 'ਸੁਨੇਹਾ', 'type.url': 'ਲਿੰਕ', 'type.email': 'ਈਮੇਲ', 'type.phone': 'ਫ਼ੋਨ ਨੰਬਰ',
  'risk.low': 'ਘੱਟ ਜੋਖਮ', 'risk.medium': 'ਦਰਮਿਆਨਾ ਜੋਖਮ', 'risk.high': 'ਉੱਚ ਜੋਖਮ', 'risk.unknown': 'ਮੁਲਾਂਕਣ ਸੰਭਵ ਨਹੀਂ',
  'res.noticed': 'ਸਾਨੂੰ ਕੀ ਦਿਸਿਆ', 'res.why': 'ਇਹ ਕਿਉਂ ਮਾਇਨੇ ਰੱਖਦਾ ਹੈ', 'res.next': 'ਅੱਗੇ ਕੀ ਕਰੋ', 'res.none': 'ਕੋਈ ਤੈਅ ਚੇਤਾਵਨੀ ਸੰਕੇਤ ਨਹੀਂ ਮਿਲਿਆ। ਇਸ ਦਾ ਮਤਲਬ ਇਹ ਨਹੀਂ ਕਿ ਇਹ ਸੁਰੱਖਿਅਤ ਹੈ।',
  'res.help': 'ਮਦਦ ਚਾਹੀਦੀ ਹੈ? ਜੇ ਪੈਸੇ ਗਏ ਹਨ ਤਾਂ 1930 ਤੇ ਕਾਲ ਕਰੋ ਅਤੇ cybercrime.gov.in ਤੇ ਰਿਪੋਰਟ ਕਰੋ।',
  'res.demo': 'ਡੈਮੋ ਜਾਂਚ: ਮੁਢਲੀ ਅਤੇ ਨਿਯਮ-ਆਧਾਰਿਤ ਹੈ, ਕਿਸੇ ਲਾਈਵ ਖ਼ਤਰਾ-ਡਾਟਾਬੇਸ ਨਾਲ ਨਹੀਂ ਮਿਲਾਈ ਗਈ। ਵਿਆਖਿਆ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਦਿਸਦੀ ਹੈ।',
  'how.title': 'ਸਮਤਵ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ',
  'how.1': 'ਜੋ ਸ਼ੱਕੀ ਲੱਗੇ ਉਹ ਸਾਂਝਾ ਕਰੋ', 'how.1d': 'ਸੁਨੇਹਾ ਪੇਸਟ ਕਰੋ ਜਾਂ ਲਿੰਕ ਪਾਓ।',
  'how.2': 'ਚੇਤਾਵਨੀ ਦੇ ਸੰਕੇਤ ਸਮਝੋ', 'how.2d': 'ਵੇਖੋ ਕਿ ਕਿਹੜੇ ਸੰਕੇਤ ਸਕੈਮ ਵੱਲ ਇਸ਼ਾਰਾ ਕਰ ਸਕਦੇ ਹਨ।',
  'how.3': 'ਸੁਰੱਖਿਅਤ ਅਗਲਾ ਕਦਮ ਚੁਣੋ', 'how.3d': 'ਅਮਲੀ ਸਲਾਹ ਮੰਨੋ ਜਾਂ ਸਰਕਾਰੀ ਮਾਧਿਅਮ ਰਾਹੀਂ ਸੰਪਰਕ ਕਰੋ।',
  'tools.title': 'ਸੁਰੱਖਿਆ ਟੂਲ', 'tools.msg': 'ਸੁਨੇਹਾ ਜਾਂਚਕ', 'tools.url': 'ਲਿੰਕ ਜਾਂਚਕ', 'tools.pw': 'ਪਾਸਵਰਡ ਜਨਰੇਟਰ',
  'nav.learn': 'ਸਿੱਖੋ', 'nav.quiz': 'ਕੁਇਜ਼', 'tools.app': 'ਐਪ ਜੋਖਮ ਜਾਂਚਕ', 'tools.appd': 'ਤੁਹਾਡੇ ਦਿੱਤੇ ਐਪ ਵੇਰਵਿਆਂ ਵਿੱਚ ਚੇਤਾਵਨੀ ਦੇ ਸੰਕੇਤ ਵੇਖੋ।', 'tools.qr': 'QR ਕੋਡ ਸਕੈਨਰ', 'tools.qrd': 'QR ਤਸਵੀਰ ਪੜ੍ਹੋ ਅਤੇ ਅੰਦਰਲਾ ਲਿੰਕ ਜਾਂਚੋ।', 'tools.hid': 'ਲੁਕੀ ਸਮੱਗਰੀ ਸਕੈਨਰ', 'tools.hidd': 'ਸਮਰਥਿਤ ਟੈਕਸਟ ਫ਼ਾਈਲਾਂ ਵਿੱਚ ਲੁਕਾਉਣ ਦੀਆਂ ਚਾਲਾਂ ਲੱਭੋ।',
  'shot.btn': 'ਸਕ੍ਰੀਨਸ਼ਾਟ ਤੋਂ ਟੈਕਸਟ ਪੜ੍ਹੋ', 'shot.busy': 'ਸਕ੍ਰੀਨਸ਼ਾਟ ਪੜ੍ਹਿਆ ਜਾ ਰਿਹਾ ਹੈ…', 'shot.err': 'ਇਸ ਤਸਵੀਰ ਤੋਂ ਟੈਕਸਟ ਨਹੀਂ ਪੜ੍ਹਿਆ ਜਾ ਸਕਿਆ।', 'quiz.title': 'ਸਕੈਮ ਜਾਂ ਅਸਲੀ?', 'quiz.scam': 'ਸਕੈਮ', 'quiz.legit': 'ਅਸਲੀ ਲੱਗਦਾ ਹੈ',
  'help.title': 'ਸਰਕਾਰੀ ਮਦਦ', 'help.body': 'ਵਿੱਤੀ ਧੋਖਾਧੜੀ ਹੈਲਪਲਾਈਨ: 1930। cybercrime.gov.in ਤੇ ਰਿਪੋਰਟ ਕਰੋ।'
};
const dict: Record<Lang, Partial<Record<Key, string>>> = { en, hi, mr, pa };

interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (k: Key) => string }
const I18n = createContext<Ctx>(null!);
export const useI18n = () => useContext(I18n);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try { const s = localStorage.getItem('samatva.lang'); if (s && s in dict) return s as Lang; } catch { /* storage unavailable */ }
    return 'en';
  });
  const setLang = (l: Lang) => { setLangState(l); try { localStorage.setItem('samatva.lang', l); } catch { /* ignore */ } };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  // Missing translations fall back to English.
  const t = (k: Key) => dict[lang][k] ?? en[k];
  return <I18n.Provider value={{ lang, setLang, t }}>{children}</I18n.Provider>;
}
