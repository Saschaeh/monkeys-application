import { build } from 'esbuild';
import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { steps, disclosure } from './src/content.js';
await build({ entryPoints: ['src/app.jsx'], bundle: true, minify: true, format: 'iife', outfile: 'site/assets/app.js', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'linked' });
await copyFile('src/styles.css', 'site/assets/styles.css');
// Keep earlier URLs valid for visitors whose browsers cached an older app bundle.
await copyFile('site/assets/sascha-ehrentraut-monkeys.mp4', 'site/assets/sascha-ehrentraut.mp4');
await copyFile('site/assets/video-poster-monkeys.jpg', 'site/assets/video-poster.jpg');
const version = createHash('sha256').update(await readFile('site/assets/app.js')).update(await readFile('site/assets/styles.css')).digest('hex').slice(0, 12);
const html = (await readFile('site/index.html', 'utf8')).replace(/assets\/app\.js(?:\?v=[a-f0-9]+)?/g, `assets/app.js?v=${version}`).replace(/assets\/styles\.css(?:\?v=[a-f0-9]+)?/g, `assets/styles.css?v=${version}`);
await writeFile('site/index.html', html);
await writeFile('site/answers.txt', 'Sascha Ehrentraut — Application for The Agile Monkeys\nResponses from the original application, lightly edited for readability.\n\n' + steps.map((step, i) => `${i + 1}. ${step.title}\n${step.description}\n\n${step.questions.map(q => `${q.prompt}\n${q.video ? 'See assets/sascha-ehrentraut-monkeys.mp4 (3:21)' : q.answer}`).join('\n\n')}`).join('\n\n————————————\n\n') + '\n\n' + disclosure + '\n');
console.log('Built offline application in site/');
