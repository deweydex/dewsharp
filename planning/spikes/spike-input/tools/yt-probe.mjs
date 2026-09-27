// Can headless Chromium reach YouTube through the agent proxy (TLS verified via the NSS store)?
import { chromium } from './common.mjs';
const opts = { args: ['--proxy-server=http://127.0.0.1:36609', '--proxy-bypass-list=localhost;127.0.0.1'] };
if (process.env.CHANNEL) opts.channel = process.env.CHANNEL;
const browser = await chromium.launch(opts);
const page = await browser.newPage();
page.on('requestfailed', r => console.log('failed', r.url().slice(0, 80), r.failure()?.errorText));
const t = Date.now();
try {
  const r = await page.goto('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ', { timeout: 30000, waitUntil: 'domcontentloaded' });
  console.log('status', r.status(), Date.now() - t, 'ms', await page.title());
} catch (e) { console.log('ERR', e.message.split('\n')[0]); }
await browser.close();
