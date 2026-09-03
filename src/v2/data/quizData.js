export const gateQuestion = {
  id: 'gate',
  sectionTag: 'GATE QUESTION',
  header: null,
  question: 'Sometimes things happen that are especially frightening, horrible, or traumatic. For example: a serious accident, a physical or sexual assault, a natural disaster, combat or military service, seeing someone seriously hurt or killed, or losing a loved one to homicide or suicide.\n\nHave you ever experienced this kind of event?',
  options: [
    { label: 'Yes', value: 'yes', score: 0 },
    { label: 'No', value: 'no', score: 0 },
    { label: 'Prefer not to answer', value: 'prefer_not_to_answer', score: 0 }
  ]
};

export const fourPointOptions = [
  { label: 'Not at all', score: 0 },
  { label: 'Several days', score: 1 },
  { label: 'More than half the days', score: 2 },
  { label: 'Nearly every day', score: 3 }
];

export const yesNoOptions = [
  { label: 'Yes', score: 1 },
  { label: 'No', score: 0 }
];

export const phq2Questions = [
  {
    id: 'phq2_1',
    sectionTag: 'SECTION 1',
    sectionTitle: 'Depression (PHQ-2)',
    header: 'Over the last 2 weeks, how often have you been bothered by…',
    question: 'Little interest or pleasure in doing things.',
    options: fourPointOptions
  },
  {
    id: 'phq2_2',
    sectionTag: 'SECTION 1',
    sectionTitle: 'Depression (PHQ-2)',
    header: 'Over the last 2 weeks, how often have you been bothered by…',
    question: 'Feeling down, depressed, or hopeless.',
    options: fourPointOptions
  }
];

export const gad2Questions = [
  {
    id: 'gad2_1',
    sectionTag: 'SECTION 2',
    sectionTitle: 'Anxiety (GAD-2)',
    header: 'Over the last 2 weeks, how often have you been bothered by…',
    question: 'Feeling nervous, anxious, or on edge.',
    options: fourPointOptions
  },
  {
    id: 'gad2_2',
    sectionTag: 'SECTION 2',
    sectionTitle: 'Anxiety (GAD-2)',
    header: 'Over the last 2 weeks, how often have you been bothered by…',
    question: 'Not being able to stop or control worrying.',
    options: fourPointOptions
  }
];

export const pcPtsd5Questions = [
  {
    id: 'ptsd_1',
    sectionTag: 'SECTION 3',
    sectionTitle: 'Trauma (PC-PTSD-5)',
    header: 'In the past month, have you…',
    question: 'Had nightmares about the event(s) or thought about the event(s) when you did not want to?',
    options: yesNoOptions
  },
  {
    id: 'ptsd_2',
    sectionTag: 'SECTION 3',
    sectionTitle: 'Trauma (PC-PTSD-5)',
    header: 'In the past month, have you…',
    question: 'Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?',
    options: yesNoOptions
  },
  {
    id: 'ptsd_3',
    sectionTag: 'SECTION 3',
    sectionTitle: 'Trauma (PC-PTSD-5)',
    header: 'In the past month, have you…',
    question: 'Been constantly on guard, watchful, or easily startled?',
    options: yesNoOptions
  },
  {
    id: 'ptsd_4',
    sectionTag: 'SECTION 3',
    sectionTitle: 'Trauma (PC-PTSD-5)',
    header: 'In the past month, have you…',
    question: 'Felt numb or detached from people, activities, or your surroundings?',
    options: yesNoOptions
  },
  {
    id: 'ptsd_5',
    sectionTag: 'SECTION 3',
    sectionTitle: 'Trauma (PC-PTSD-5)',
    header: 'In the past month, have you…',
    question: 'Felt guilty or unable to stop blaming yourself or others for the event(s) or any problems the event(s) may have caused?',
    options: yesNoOptions
  }
];

/**
 * Calculates scores and returns the appropriate tier result and copy.
 */
export function calculateAssessmentResult(answers, gateAnswer) {
  // PHQ-2 total = Q1 + Q2
  const q1 = answers.find(a => a.questionId === 'phq2_1')?.score ?? 0;
  const q2 = answers.find(a => a.questionId === 'phq2_2')?.score ?? 0;
  const phq2Total = q1 + q2;
  const isPhq2Positive = phq2Total >= 3;

  // GAD-2 total = Q3 + Q4
  const q3 = answers.find(a => a.questionId === 'gad2_1')?.score ?? 0;
  const q4 = answers.find(a => a.questionId === 'gad2_2')?.score ?? 0;
  const gad2Total = q3 + q4;
  const isGad2Positive = gad2Total >= 3;

  // PC-PTSD-5 total (only if gateAnswer === 'yes')
  let pcPtsd5Total = 0;
  let isPcPtsd5Positive = false;

  if (gateAnswer === 'yes') {
    const q5 = answers.find(a => a.questionId === 'ptsd_1')?.score ?? 0;
    const q6 = answers.find(a => a.questionId === 'ptsd_2')?.score ?? 0;
    const q7 = answers.find(a => a.questionId === 'ptsd_3')?.score ?? 0;
    const q8 = answers.find(a => a.questionId === 'ptsd_4')?.score ?? 0;
    const q9 = answers.find(a => a.questionId === 'ptsd_5')?.score ?? 0;
    pcPtsd5Total = q5 + q6 + q7 + q8 + q9;
    isPcPtsd5Positive = pcPtsd5Total >= 3;
  }

  // Count positive screens
  let positiveCount = 0;
  if (isPhq2Positive) positiveCount++;
  if (isGad2Positive) positiveCount++;
  if (isPcPtsd5Positive) positiveCount++;

  let tier = 0;
  let title = "You are managing well right now.";
  let description = "";

  if (positiveCount === 0) {
    tier = 0;
    title = "You are managing well right now.";
    description = "Your responses suggest you are managing well right now. That matters. If something shifts, or you just want to talk it through, we are here. Grab the free journal below, and if you would like a real conversation with a real clinician, the check-in call is always open.";
  } else if (positiveCount === 1) {
    tier = 1;
    let symptomTerm = "depression";
    if (isPhq2Positive) symptomTerm = "depression";
    else if (isGad2Positive) symptomTerm = "anxiety";
    else if (isPcPtsd5Positive) symptomTerm = "trauma-related stress";

    title = "Symptoms worth paying attention to.";
    description = `Your responses suggest some ${symptomTerm} symptoms worth paying attention to. This is not a diagnosis. It is a signal. Dr. Imani and her team have openings for a 15-minute check-in call. No commitment, no cost, just a conversation to help you decide what, if anything, to do next.`;
  } else {
    tier = positiveCount; // 2 or 3
    title = "More than one area worth attention.";
    description = "Your responses suggest more than one area worth attention. This is not a diagnosis, and it is not a reason to worry. It is a reason to talk to someone who works with exactly what you are describing. Dr. Imani and her clinicians work with military families and civilians carrying depression, anxiety, and trauma. We are PsyPact-licensed in 43 states, so wherever you are, we can help. Book a 15-minute check-in call and let us listen.";
  }

  return {
    phq2Total,
    isPhq2Positive,
    gad2Total,
    isGad2Positive,
    pcPtsd5Total,
    isPcPtsd5Positive,
    positiveCount,
    tier,
    title,
    description
  };
}
