export function About() {
  return (
    <div className="max-w-2xl space-y-3"><h1 className="text-3xl font-extrabold">About Samatva</h1>
      <p>Samatva helps you understand the warning signs in suspicious messages and links, and choose a safer next step. Principle: clarity before complexity, prevention before loss, guidance without fear.</p>
      <h2 className="text-xl font-bold">Limits</h2>
      <p>Automated analysis can be wrong. In this version it uses transparent, rule-based checks only and does not consult live threat databases. A low-risk result is never a guarantee of safety. Samatva is not affiliated with any government body.</p>
      <h2 className="text-xl font-bold">Official help</h2>
      <p>Financial fraud helpline: 1930. Report at <a className="text-brand underline" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">cybercrime.gov.in</a>.</p>
    </div>
  );
}
export function Privacy() {
  return (
    <div className="max-w-2xl space-y-3"><h1 className="text-3xl font-extrabold">Privacy</h1>
      <p>In demo mode, checks run entirely in your browser and nothing you enter is sent or stored. The only data kept locally is your language choice. Generated passwords never leave your device. Reading text from screenshots also happens on your device; the first use downloads language data from a public CDN.</p>
      <p>If the site owner configures an analysis or report endpoint, text you submit to it is sent to that service. Please remove OTPs, PINs, passwords and bank details first.</p>
    </div>
  );
}
