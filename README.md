# Sascha Ehrentraut × The Agile Monkeys

A five-step application with lightly edited application responses, a swinging SVG monkey, and an embedded portrait video. Built with React and bundled for offline use.

Live site: https://Saschaeh.github.io/monkeys-application/

## Open locally

Open `site/index.html` directly. No server or dependencies are needed to view it. To share offline, ZIP the contents of `site/`; the recipient should extract the whole ZIP before opening `index.html`.

## Edit and build

Run `npm ci`, edit `src/app.jsx`, `src/content.js` or `src/styles.css`, then run `npm run build`. The bundle uses a classic script so it works under `file://` as well as HTTP.

Run `npm run check` for the browser checks (requires installed Google Chrome). Set `TEST_URL` to check a hosted copy instead.

## Content and assets

Answers are based on the five application screenshots, lightly edited at Sascha’s request for spelling, punctuation and readability while retaining his informal tone and meaning. Editorial summaries are labelled separately. The AI step discloses assistance with both the page and the light copy edit.

The video retains the original H.264/AAC streams; its container was rewritten with fast-start metadata for streaming. The portrait poster is a frame from that video. DM Sans is bundled under the included SIL Open Font License. Monkey illustrations are original SVG artwork.

No analytics, forms, remote scripts, external font calls or backend. This presentation does not submit data to The Agile Monkeys.
