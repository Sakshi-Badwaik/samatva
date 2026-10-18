import { Route, Routes, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Tools from './pages/Tools';
import MessageChecker from './pages/MessageChecker';
import UrlChecker from './pages/UrlChecker';
import PasswordGenerator from './pages/PasswordGenerator';
import AppChecker from './pages/AppChecker';
import QrScanner from './pages/QrScanner';
import HiddenScanner from './pages/HiddenScanner';
import Quiz from './pages/Quiz';
import { Learn, ArticlePage } from './pages/Learn';
import { Faq, Alerts, Login } from './pages/Info';
import Contact from './pages/Contact';
import Report from './pages/Report';
import { About, Privacy } from './pages/Static';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/message-checker" element={<MessageChecker />} />
        <Route path="/tools/url-checker" element={<UrlChecker />} />
        <Route path="/tools/app-risk-checker" element={<AppChecker />} />
        <Route path="/tools/qr-scanner" element={<QrScanner />} />
        <Route path="/tools/hidden-content-scanner" element={<HiddenScanner />} />
        <Route path="/tools/password-generator" element={<PasswordGenerator />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:slug" element={<ArticlePage />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/report" element={<Report />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<p>Page not found. <Link className="text-brand underline" to="/">Go home</Link></p>} />
      </Routes>
    </Layout>
  );
}
