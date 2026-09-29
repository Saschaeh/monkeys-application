export const steps = [
  {
    id: 'prioritisation', label: 'Prioritisation', title: 'Monday, 09:07',
    description: 'It is Monday morning and several operational threads need an owner.',
    takeaway: 'Unblock the team. Understand the impact. Keep things moving.',
    questions: [
      { prompt: 'What do you deal with first?', answer: 'A teammate cannot complete an urgent task because an approval is missing.', choice: true },
      { prompt: 'Walk us through your prioritisation.', answer: 'Urgent 2 min tasks first. 1. Approval for team member, 2. TBD on how difficult info is to confirm but I would check if its a quick win, or if there are dependency, if dependencies activate process for dependence to get that flowing in parallel. 3. Delegate or work on outage problem. Understand problem, impact, mitigation strat, managing client exceptions proactively if needed. 4. IF the above work is highly critical with client being affect and it requires a lot of work I would ask for a push back on the status report on noon. IF all those things are humming and are being taken care for proceed with Status meet. 5. Speak to accounting about invoice discrepancy.' },
      { prompt: 'Write one reply you would actually send.', answer: 'Not clear on what I am replying to? If it is the above it would be a cleaned up version of that, allowing for reader to suggest changes on info that i might not have like if we dont sort out invoice our entire primary VPS will be shut down. ;)' }
    ]
  },
  {
    id: 'message', label: 'Communication', title: 'Make the date, somehow',
    description: 'A stakeholder asks you to keep a promised date even though a vendor dependency is unresolved and you cannot guarantee the outcome.',
    takeaway: 'Find the real business need before making a promise.',
    questions: [
      { prompt: 'What is your instinct?', answer: 'Ask for more context before committing', choice: true },
      { prompt: 'Now write the message you would actually send to that stakeholder.', answer: "There are some important infrastructure dependencies that make this deadline difficult. Could we jump on a quick call to discus exactly what the business need and goal is for this model to ship on this date just so I can have a better understanding of what we are shooting for and perhaps find some creative solutions to keep us moving forward." }
    ]
  },
  {
    id: 'ownership', label: 'Ownership', title: 'Your work, your issue',
    description: 'You are working on a task and realise there is a serious issue in something you delivered in the past. It is your work.',
    takeaway: 'Own the mistake. Fix it. Show that you care.',
    questions: [
      { prompt: 'What would you do?', answer: 'I f** up. My bad. It Happens. Work overtime to fix it. If the client is angry use it as an opportunity to build a closer relationship by showing a deep sense of responsibility, care for their business, and demonstrating the great length you go to fix the issue.' }
    ]
  },
  {
    id: 'learning', label: 'Curiosity', title: 'What are you curious about?',
    description: 'We are constantly learning, experimenting and changing how we work. Curiosity is a big part of that, and it is something we look for in the people we work with. So before you go, we would like to see a little of yours.',
    questions: [
      { prompt: 'What have you learned recently that you keep thinking about?', answer: 'Sascha Ehrentraut.mp4', video: true },
      { prompt: 'Give us a little context', answer: 'A very rushed in-between meetings me at my desk on the grind! Squeezing what could easily be a 30 min video into 3 mins (.15).' }
    ]
  },
  {
    id: 'ai-and-you', label: 'AI & me', title: 'AI & you',
    description: 'AI is allowed in this challenge and in our daily work. There are no right answers here, we are interested in how you use it, not whether you do.',
    takeaway: 'Original answers, human. This little detour, AI-assisted.',
    questions: [
      { prompt: 'Did you use AI for any part of this challenge?', answer: 'Yes', choice: true },
      { prompt: 'How did you use it?', answer: 'I did not use ai but this form was stuck so tested saying yes her to see if it would fix it.' },
      { prompt: 'Do you use AI in your day-to-day work?', answer: 'Yes', choice: true },
      { prompt: 'What does that usually look like?', answer: 'There is almost nothing now that I dont use AI for for, for example, i dont remember the last time I wrote a number into a cell of a spreadsheet.  For this interview process I have just flown through it with no AI because well how does one stand out in an AI interview where everyone is using AI. Maybe bad grammar and spelling is a new competent signal' }
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

export const disclosure = 'A note since the original form: I used AI to help build this page after the submission got stuck. The answers above are transcribed from my original application, with the original wording preserved.';
