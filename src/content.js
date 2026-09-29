export const steps = [
  {
    id: 'prioritisation', label: 'Prioritisation', title: 'Monday, 09:07',
    description: 'It is Monday morning and several operational threads need an owner.',
    takeaway: 'Unblock the team. Understand the impact. Keep things moving.',
    questions: [
      { prompt: 'What do you deal with first?', answer: 'A teammate cannot complete an urgent task because an approval is missing.', choice: true },
      { prompt: 'Walk us through your prioritisation.', answer: `Urgent 2-minute tasks first.

1. Get the approval sorted for the team member.

2. Confirm the missing info. TBD how difficult that is, but I'd check if it's a quick win. If there are dependencies, get those moving in parallel.

3. Delegate or work on the outage. Understand the problem, the impact and the mitigation plan. Manage client expectations proactively if needed.

4. If the above is critical, clients are affected and there's a lot of work involved, I'd ask to push the noon status report back. If everything is humming along and being taken care of, go ahead with the status meeting.

5. Speak to accounting about the invoice discrepancy.` },
      { prompt: 'Write one reply you would actually send.', answer: "Not entirely clear what I'm replying to here. If it's the above, I'd send a cleaned-up version of that, leaving room for the reader to flag info I might be missing. Like: if we don't sort out this invoice, our entire primary VPS gets shut down. ;)" }
    ]
  },
  {
    id: 'message', label: 'Communication', title: 'Make the date, somehow',
    description: 'A stakeholder asks you to keep a promised date even though a vendor dependency is unresolved and you cannot guarantee the outcome.',
    takeaway: 'Find the real business need before making a promise.',
    questions: [
      { prompt: 'What is your instinct?', answer: 'Ask for more context before committing', choice: true },
      { prompt: 'Now write the message you would actually send to that stakeholder.', answer: "There are some important infrastructure dependencies that make this deadline difficult. Could we jump on a quick call to discuss the business need and the goal behind shipping this model on this date? Just so I can better understand what we're shooting for and perhaps find some creative solutions to keep us moving forward." }
    ]
  },
  {
    id: 'ownership', label: 'Ownership', title: 'Your work, your issue',
    description: 'You are working on a task and realise there is a serious issue in something you delivered in the past. It is your work.',
    takeaway: 'Own the mistake. Fix it. Show that you care.',
    questions: [
      { prompt: 'What would you do?', answer: "I f**ed up. My bad. It happens. Work overtime to fix it.\n\nIf the client is angry, use it as an opportunity to build a closer relationship. Show a real sense of responsibility, care for their business, and the lengths you're willing to go to fix the issue." }
    ]
  },
  {
    id: 'learning', label: 'Curiosity', title: 'What are you curious about?',
    description: 'We are constantly learning, experimenting and changing how we work. Curiosity is a big part of that, and it is something we look for in the people we work with. So before you go, we would like to see a little of yours.',
    questions: [
      { prompt: 'My video', answer: 'Sascha Ehrentraut.mp4', video: true },
      { prompt: 'Give us a little context', answer: 'A very rushed me, between meetings, at my desk on the grind! Squeezing what could easily be a 30-minute video into just over 3 mins.' }
    ]
  },
  {
    id: 'ai-and-you', label: 'AI & me', title: 'AI & you',
    description: 'AI is allowed in this challenge and in our daily work. There are no right answers here, we are interested in how you use it, not whether you do.',
    takeaway: 'The thinking is mine. The page and a light tidy-up, AI-assisted.',
    questions: [
      { prompt: 'Did you use AI for any part of this challenge?', answer: 'Yes', choice: true },
      { prompt: 'How did you use it?', answer: 'I created this response because your form was not working for me.' },
      { prompt: 'Do you use AI in your day-to-day work?', answer: 'Yes', choice: true },
      { prompt: 'What does that usually look like?', answer: "There's almost nothing I don't use AI for now. For example, I don't remember the last time I wrote a number into a spreadsheet cell.\n\nFor this interview, I just flew through the original answers without AI because, well, how does one stand out in an AI interview where everyone is using AI?\n\nMaybe bad grammar and spelling is the new competence signal." }
    ]
  }
];

export const threads = [
  ['09:07', 'A vendor reports an outage with no ETA.'],
  ['09:09', 'A teammate cannot complete an urgent task because an approval is missing.'],
  ['09:11', 'A client deliverable depends on information nobody has confirmed.'],
  ['09:13', 'An invoice discrepancy could delay a supplier payment.'],
  ['09:15', 'Leadership asks for a status summary before noon.']
];

export const disclosure = 'A note since the original form: I used AI to help build this page after the submission got stuck, give my answers a light spelling and readability tidy-up, and replace the video background. The thoughts and the tone are still mine.';
