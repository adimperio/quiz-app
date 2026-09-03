export const quizData = [
  {
    id: 1,
    question: "How old is your home?",
    options: [
      { text: "Under 10 years", score: 15 },
      { text: "10–25 years", score: 10 },
      { text: "25–50 years", score: 5 },
      { text: "50+ years", score: 2 }
    ]
  },
  {
    id: 2,
    question: "Do you have a home maintenance plan, or do you handle things as they break?",
    options: [
      { text: "Regular maintenance plan", score: 15 },
      { text: "Some things", score: 8 },
      { text: "When something breaks", score: 2 }
    ]
  },
  {
    id: 3,
    question: "When did you last have your heating & cooling professionally serviced?",
    options: [
      { text: "Within last year", score: 15 },
      { text: "1–2 years", score: 8 },
      { text: "2+ years / unsure", score: 2 }
    ]
  },
  {
    id: 4,
    question: "When something breaks, how do you find someone to fix it?",
    options: [
      { text: "Trusted people", score: 12 },
      { text: "Search each time", score: 5 },
      { text: "Dread/put it off", score: 2 }
    ]
  },
  {
    id: 5,
    question: "In the last year, have you had a contractor show up late, overcharge, or not show at all?",
    options: [
      { text: "Reliable", score: 12 },
      { text: "Once or twice", score: 6 },
      { text: "More than I’d like", score: 2 }
    ]
  },
  {
    id: 6,
    question: "How confident are you that you’re NOT overpaying for home repairs?",
    options: [
      { text: "Very confident", score: 12 },
      { text: "Somewhat confident", score: 6 },
      { text: "Not confident", score: 2 }
    ]
  },
  {
    id: 7,
    question: "How much time do you spend each month arranging home maintenance and repairs?",
    options: [
      { text: "Barely any", score: 14 },
      { text: "Few hours", score: 7 },
      { text: "Too much", score: 2 }
    ]
  }
];

export const MAX_SCORE = 95;

export const resultBands = [
  {
    min: 75,
    max: 100,
    title: "HEALTHY HOME",
    message: "You’re on top of your home. A few small improvements could make ownership even easier.",
    color: "var(--success-color)"
  },
  {
    min: 50,
    max: 74,
    title: "NEEDS ATTENTION",
    message: "Your home has some areas of exposure that are worth getting ahead of.",
    color: "var(--warning-color)"
  },
  {
    min: 0,
    max: 49,
    title: "AT RISK",
    message: "Your home may be one unexpected repair away from a costly headache. Let’s get ahead of it.",
    color: "var(--danger-color)"
  }
];
