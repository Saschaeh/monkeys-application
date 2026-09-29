import { build } from 'esbuild';
import { copyFile, writeFile } from 'node:fs/promises';
import { steps, disclosure } from './src/content.js';
await build({ entryPoints: ['src/app.jsx'], bundle: true, minify: true, format: 'iife', outfile: 'site/assets/app.js', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'linked' });
await copyFile('src/styles.css', 'site/assets/styles.css');
await writeFile('site/answers.txt', 'Sascha Ehrentraut — Application for The Agile Monkeys\nOriginal responses, transcribed from the supplied screenshots.\n\n' + steps.map((step, i) => `${i + 1}. ${step.title}\n${step.description}\n\n${step.questions.map(q => `${q.prompt}\n${q.video ? 'See assets/sascha-ehrentraut.mp4 (3:21)' : q.answer}`).join('\n\n')}`).join('\n\n————————————\n\n') + '\n\n' + disclosure + '\n');
console.log('Built offline application in site/');
