import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { steps, threads, disclosure } from './content';

function Arrow({ back = false }) {
  return <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={back ? { transform: 'rotate(180deg)' } : undefined}><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Monkey({ className = '', face = false, ...props }) {
  return <svg className={className} viewBox={face ? '55 102 154 126' : '0 0 260 340'} fill="none" aria-hidden="true" {...props}>
    {!face && <>
      <path d="M153 267c79 18 111-35 72-51-27-11-38 21-15 24" stroke="currentColor" strokeWidth="13" strokeLinecap="round" />
      <path d="M104 233C63 219 64 183 77 133L92 46" stroke="currentColor" strokeWidth="19" strokeLinecap="round" />
      <path d="M157 224c40-17 44-46 30-64" stroke="currentColor" strokeWidth="19" strokeLinecap="round" />
      <path d="M107 261c-27 21-31 44-14 55m48-48c-4 29 10 42 28 33" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
      <ellipse cx="128" cy="235" rx="43" ry="53" fill="currentColor" transform="rotate(-10 128 235)" />
      <ellipse cx="128" cy="246" rx="22" ry="29" fill="var(--monkey-face, #ffdf24)" transform="rotate(-10 128 246)" />
      <path d="M81 47c-7-15 6-26 14-19 12-14 24 0 15 12L99 55" fill="currentColor" />
    </>}
    <circle cx="78" cy="159" r="23" fill="currentColor" />
    <circle cx="184" cy="159" r="23" fill="currentColor" />
    <circle cx="78" cy="159" r="12" fill="var(--monkey-face, #ffdf24)" />
    <circle cx="184" cy="159" r="12" fill="var(--monkey-face, #ffdf24)" />
    <path d="M80 162c-2-43 18-61 47-59l16-8-2 12c27 6 43 22 43 55 0 40-22 60-53 60-30 0-51-20-51-60Z" fill="currentColor" />
    <path d="M95 159c-1-26 24-35 37-16 14-19 37-9 36 16l-4 30c-15 23-52 23-65 0Z" fill="var(--monkey-face, #ffdf24)" />
    <ellipse cx="116" cy="164" rx="5" ry="7" fill="currentColor" />
    <ellipse cx="148" cy="164" rx="5" ry="7" fill="currentColor" />
    <path d="M118 187q14 15 28-1" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="m127 176 5 3 5-3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}

function HeroArt({ finished = false }) {
  return <div className={`hero-art ${finished ? 'finished-art' : ''}`}>
    <svg className="branch" viewBox="0 0 500 510" fill="none" aria-hidden="true">
      <path d="M-20 48C109 9 241 123 531 54" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      <path d="M167 62c-13-40 10-47 26-48-1 23-9 35-26 48Zm230 17c15-41 41-31 46-20-15 17-32 23-46 20Z" fill="currentColor" />
      <path d="M190 65q-2 23 6 40" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="m400 335 0 24m-12-12 24 0M66 274v18m-9-9h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="364" cy="186" r="5" fill="currentColor" />
      <Monkey x="82" y="65" width="310" height="370" />
    </svg>
    <div className="art-note">{finished ? 'Over to you, monkeys.' : 'There’s always another way in.'}<svg viewBox="0 0 100 45" aria-hidden="true"><path d="M5 32Q51 53 87 9m-17 1 20-4-3 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
    <span className="art-edition">A small detour. A full application.</span>
  </div>;
}

function Progress({ current, navigate, moveKey, direction }) {
  const active = Math.max(0, Math.min(4, current - 1));
  return <nav className={`progress ${current === 0 ? 'not-started' : ''}`} aria-label="Application steps">
    <div className="vine"><div className="vine-fill" style={{ width: `${active * 25}%` }} /></div>
    <div className="traveller" style={{ left: `${10 + active * 20}%` }} aria-hidden="true">
      <div key={moveKey} className={`swing ${moveKey ? 'moving' : ''} ${direction < 0 ? 'reverse' : ''}`}><span className="rope" /><Monkey className="little-monkey" /></div>
    </div>
    {steps.map((step, i) => <button key={step.id} className={`stop ${i === active && current !== 0 ? 'active' : ''} ${current > i + 1 ? 'visited' : ''}`} aria-current={current === i + 1 ? 'step' : undefined} aria-label={`Step ${i + 1}: ${step.label}`} onClick={() => navigate(i + 1)}><span className="stop-dot">{current > i + 1 ? '✓' : `0${i + 1}`}</span><span className="stop-label">{step.label}</span></button>)}
  </nav>;
}

function Response({ question, index }) {
  if (question.video) return null;
  return <section className={`response ${question.choice ? 'choice-response' : ''}`}>
    <h3>{question.prompt}</h3>
    {question.choice ? <p className="selected-answer"><span className="check" aria-hidden="true">✓</span>{question.answer}</p> : <div className="answer-text"><p>{question.answer}</p></div>}
  </section>;
}

function VideoPlayer() {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [failed, setFailed] = useState(false);
  async function play() {
    try { await ref.current.play(); setStarted(true); } catch { setStarted(true); }
  }
  return <div className="video-wrap">
    <video ref={ref} className="application-video" controls={started} playsInline preload="metadata" poster="assets/video-poster.jpg" onPlay={() => setStarted(true)} onError={() => setFailed(true)} aria-label="Sascha’s response: what I have learned recently"><source src="assets/sascha-ehrentraut.mp4" type="video/mp4" />Your browser cannot play this video. <a href="assets/sascha-ehrentraut.mp4">Open the video file</a>.</video>
    {!started && !failed && <button className="play-cover" onClick={play} aria-label="Play Sascha’s video"><span className="play-circle"><svg viewBox="0 0 30 30" aria-hidden="true"><path d="m11 7 13 8-13 8Z" fill="currentColor" /></svg></span><span className="play-caption">A little of my curiosity<span>Play video · 3:21</span></span></button>}
    {failed && <div className="video-error">The video could not load. <a href="assets/sascha-ehrentraut.mp4">Open the included MP4</a>.</div>}
  </div>;
}

function StepContent({ step, current }) {
  return <div className={`step-layout step-${current}`}>
    <div className="question-column">
      <div className="chapter"><span>{String(current).padStart(2, '0')}</span>{step.label}</div>
      <h1 tabIndex="-1" id="page-title">{step.title}</h1>
      <p className="question-description">{step.description}</p>
      {current === 1 && <div className="inbox"><div className="inbox-label">The Monday morning inbox</div>{threads.map(([time, text], i) => <div key={time} className={`thread ${i === 1 ? 'picked' : ''}`}><time>{time}</time><span>{text}</span>{i === 1 && <span className="thread-check" aria-label="Selected">✓</span>}</div>)}</div>}
      {step.takeaway && <aside className="takeaway"><span>My approach, in a sentence</span><p>{step.takeaway}</p></aside>}
      {current === 4 && <div className="video-context"><Response question={step.questions[1]} /><a className="text-link" href="assets/sascha-ehrentraut.mp4" download="Sascha Ehrentraut.mp4">Save the video <Arrow /></a></div>}
    </div>
    <div className="responses-column">
      {current === 4 ? <><h2 className="video-question">{step.questions[0].prompt}</h2><VideoPlayer /></> : <><div className="responses-label"><span className="tiny-dot" />My original responses</div>{step.questions.map((q, index) => <Response key={q.prompt} question={q} index={index} />)}{current === 5 && <aside className="disclosure"><span className="note-icon" aria-hidden="true">↳</span><p>{disclosure}</p></aside>}</>}
    </div>
  </div>;
}

function Overview({ close, navigate }) {
  const dialog = useRef(null);
  useEffect(() => { dialog.current.showModal(); }, []);
  return <dialog ref={dialog} className="overview-dialog" onCancel={close} onClick={e => { if (e.target === e.currentTarget) close(); }} aria-labelledby="overview-title">
    <div className="overview-top"><span>Sascha Ehrentraut / The application</span><button className="close-button" onClick={close} aria-label="Close all responses">×</button></div>
    <div className="overview-content"><h2 id="overview-title">All five. In one place.</h2><p className="overview-intro">Original answers from my application to The Agile Monkeys. Spelling, grammar and personality included.</p>
      {steps.map((step, i) => <section key={step.id} className="overview-step"><div className="chapter"><span>0{i + 1}</span>{step.label}</div><h3>{step.title}</h3><p>{step.description}</p>{step.questions.map(q => <div className="overview-answer" key={q.prompt}><h4>{q.prompt}</h4>{q.video ? <button className="text-link" onClick={() => { close(); navigate(4); }}>Watch the video <Arrow /></button> : <p>{q.answer}</p>}</div>)}</section>)}
      <p className="overview-disclosure">{disclosure}</p><button className="button primary print-button" onClick={() => window.print()}>Print / save as PDF</button>
    </div>
  </dialog>;
}

function readLocation() {
  const hash = window.location.hash.slice(1);
  if (hash === 'thanks') return 6;
  const index = steps.findIndex(s => s.id === hash);
  return index < 0 ? 0 : index + 1;
}

function App() {
  const [current, setCurrent] = useState(readLocation);
  const [overview, setOverview] = useState(false);
  const [moveKey, setMoveKey] = useState(0);
  const [direction, setDirection] = useState(1);
  const firstRender = useRef(true);
  function navigate(next) {
    if (next === current) return;
    setDirection(next > current ? 1 : -1);
    setMoveKey(k => k + 1);
    window.location.hash = next === 0 ? 'hello' : next === 6 ? 'thanks' : steps[next - 1].id;
  }
  useEffect(() => {
    const onHash = () => setCurrent(readLocation());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => {
    document.title = `${current > 0 && current < 6 ? steps[current - 1].label + ' — ' : ''}Sascha Ehrentraut × The Agile Monkeys`;
    if (firstRender.current) { firstRender.current = false; return; }
    document.getElementById('page-title')?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [current]);
  useEffect(() => {
    function onKey(e) {
      if (overview || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey || /INPUT|TEXTAREA|VIDEO|BUTTON|A/.test(e.target.tagName)) return;
      if (e.key === 'ArrowRight' && current < 6) { e.preventDefault(); navigate(current + 1); }
      if (e.key === 'ArrowLeft' && current > 0) { e.preventDefault(); navigate(current - 1); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, overview]);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="shell">
      <header className="masthead"><button className="wordmark" onClick={() => navigate(0)} aria-label="Application home">the agile<br />monkeys<span>.</span></button><div className="applicant"><span className="applicant-name">Sascha Ehrentraut</span><span>A job application, with a little initiative.</span></div><button className="overview-button" onClick={() => setOverview(true)}><span className="overview-icon" aria-hidden="true">☷</span>All responses</button></header>
      <Progress current={current} navigate={navigate} moveKey={moveKey} direction={direction} />
      <main id="main-content">
        <div key={current} className="page">
          {current === 0 ? <div className="intro-layout"><div className="intro-copy"><div className="intro-label"><span className="tiny-dot" />Hi, I’m Sascha.</div><h1 tabIndex="-1" id="page-title">The form<br />got stuck.<br />I kept going.</h1><p className="intro-description">Five questions. My original answers. One small detour to get them to you.</p><p className="intro-explanation">Your application form wouldn’t let me finish, so I made a little home for my responses. Same questions, same me. Plus a monkey to show you around.</p><div className="intro-actions"><button className="button primary" onClick={() => navigate(1)}>Meet the applicant <Arrow /></button><span>5 steps · 1 video · a little initiative</span></div></div><HeroArt /></div> : current === 6 ? <div className="intro-layout finish-layout"><div className="intro-copy"><div className="intro-label"><span className="tiny-dot" />All five branches covered.</div><h1 tabIndex="-1" id="page-title">Thanks for<br />hanging out.</h1><p className="intro-description">That’s my application.<br />I’d love to continue the conversation.</p><p className="intro-explanation">Sascha Ehrentraut<br />An application for The Agile Monkeys.</p><div className="finish-actions"><button className="button primary" onClick={() => setOverview(true)}>Review all responses <Arrow /></button><button className="text-link" onClick={() => navigate(4)}>Watch the video again</button></div><p className="completion-note">Prepared for your review. The original form submission is still unresolved.</p></div><HeroArt finished /></div> : <StepContent current={current} step={steps[current - 1]} />}
        </div>
        {current > 0 && <div className="page-navigation"><button className="button back-button" onClick={() => navigate(current - 1)}><Arrow back />{current === 1 ? 'The introduction' : 'Back'}</button><span className="page-count">{current < 6 ? `${String(current).padStart(2, '0')} / 05` : 'Thanks for your time'}</span>{current < 6 ? <button className="button primary next-button" onClick={() => navigate(current + 1)}>{current === 5 ? 'Finish' : 'Next'}<Arrow /></button> : <button className="button back-button" onClick={() => navigate(0)}>Back to the beginning <Arrow /></button>}</div>}
      </main>
      <footer><span>A little initiative by Sascha Ehrentraut.</span><span>Made for The Agile Monkeys<span className="footer-dot">●</span></span></footer>
    </div>
    <div className="sr-only" role="status" aria-live="polite">{current > 0 && current < 6 ? `Step ${current} of 5: ${steps[current - 1].label}` : current === 6 ? 'End of application' : 'Application introduction'}</div>
    {overview && <Overview close={() => setOverview(false)} navigate={navigate} />}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
