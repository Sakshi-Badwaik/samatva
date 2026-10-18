import { describe, expect, it } from 'vitest';
import { analyzeDemo, parseUrl } from './rules';

describe('analyzeDemo', () => {
  it('flags urgency + link + verify as high', () => {
    const r = analyzeDemo('Your bank account will be blocked today. Verify immediately using this link http://bit.ly/x', 'message');
    expect(r.level).toBe('high'); expect(r.findings.length).toBeGreaterThan(2);
  });
  it('never claims safety: low result keeps limitation', () => {
    const r = analyzeDemo('Lunch at one tomorrow? Bring the documents.', 'message');
    expect(r.level).toBe('low'); expect(r.limitation).toMatch(/not a guarantee/);
  });
  it('rejects invalid URLs and short messages', () => {
    expect(parseUrl('not a url')).toBeNull();
    expect(analyzeDemo('hi', 'message').level).toBe('unknown');
  });
});
