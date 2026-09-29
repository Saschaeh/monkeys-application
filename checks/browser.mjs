import { chromium } from 'playwright';
import { strict as assert } from 'node:assert';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdir } from 'node:fs/promises';

const base = process.env.TEST_URL || pathToFileURL(resolve('site/index.html')).href;
await mkdir('checks/screenshots', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1060 } });
const errors = [];
const remote = [];
page.on('pageerror', e => errors.push(e.message));
page.on('request', request => { if (/^https?:/.test(request.url())) remote.push(request.url()); });
await page.goto(base);
await page.getByRole('heading', { level: 1 }).waitFor();
await page.evaluate(() => document.fonts.ready);
assert(await page.evaluate(() => document.fonts.check('850 30px "DM Sans"')));
await page.screenshot({ path: 'checks/screenshots/desktop-intro.png', fullPage: true });
await page.getByRole('button', { name: 'Meet the applicant' }).click();
for (let i = 1; i <= 5; i++) {
  await page.locator(`.step-${i}`).waitFor();
  assert.equal(await page.locator('[aria-current="step"]').count(), 1);
  assert.equal(await page.evaluate(() => document.activeElement.id), 'page-title');
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.evaluate(() => Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))));
  if (i === 1 || i === 4 || i === 5) await page.screenshot({ path: `checks/screenshots/desktop-step-${i}.png`, fullPage: true });
  if (i === 4) {
    await page.getByRole('button', { name: 'Play Sascha’s video' }).click();
    await page.waitForFunction(() => document.querySelector('video').currentTime > .1);
    const media = await page.locator('video').evaluate(v => ({ width: v.videoWidth, height: v.videoHeight, duration: v.duration, controls: v.controls, error: v.error }));
    assert.equal(media.width, 478); assert.equal(media.height, 850); assert(media.duration > 200); assert(media.controls); assert.equal(media.error, null);
    await page.locator('video').evaluate(v => { v.pause(); v.currentTime = 120; });
    await page.waitForFunction(() => !document.querySelector('video').seeking);
  }
  await page.getByRole('button', { name: i === 5 ? 'Finish' : 'Next', exact: true }).click();
}
await page.getByRole('heading', { name: 'Thanks for hanging out.' }).waitFor();
await page.getByRole('button', { name: 'Review all responses' }).click();
await page.locator('dialog[open]').waitFor();
assert.equal(await page.locator('.overview-step').count(), 5);
await page.keyboard.press('Escape');
assert.equal(await page.locator('dialog').count(), 0);
await page.getByRole('button', { name: 'Step 2: Communication', exact: true }).click();
await page.reload();
await page.getByRole('heading', { name: 'Make the date, somehow' }).waitFor();
await page.getByRole('button', { name: 'All responses', exact: true }).click();
await page.getByRole('button', { name: 'Watch the video', exact: true }).click();
await page.locator('video').waitFor();
await page.locator('#page-title').focus();
await page.keyboard.press('ArrowLeft');
await page.getByRole('heading', { name: 'Your work, your issue' }).waitFor();
await page.emulateMedia({ reducedMotion: 'reduce' });
assert.equal(await page.locator('.traveller').evaluate(el => getComputedStyle(el).transitionDuration), '0s');
for (const width of [390, 320, 768]) {
  await page.setViewportSize({ width, height: 844 });
  for (let i = 0; i <= 6; i++) {
    await page.goto(base + '#' + (i === 0 ? 'hello' : i === 6 ? 'thanks' : ['prioritisation','message','ownership','learning','ai-and-you'][i - 1]));
    await page.getByRole('heading', { level: 1 }).waitFor();
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}px, step ${i}`);
    if (width === 390 && [0, 1, 4].includes(i)) await page.screenshot({ path: `checks/screenshots/mobile-${i}.png`, fullPage: true });
  }
}
assert.deepEqual(errors, []);
if (base.startsWith('file:')) assert.deepEqual(remote, []);
await browser.close();
console.log(`PASS: ${base} — all steps, video playback/seek, modal, deep links, keyboard, reduced motion, 320/390/768/1440px layouts; no JS errors.`);
