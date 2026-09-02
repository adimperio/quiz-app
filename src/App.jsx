import { useState } from 'react';
import {
  gateQuestion,
  phq2Questions,
  gad2Questions,
  pcPtsd5Questions,
  calculateAssessmentResult
} from './data/quizData';
import QuestionCard from './components/QuestionCard';
import LeadForm from './components/LeadForm';
import ResultScreen from './components/ResultScreen';
import { supabase } from './lib/supabase';
import './App.css';

function App() {
  const [stage, setStage] = useState('intro'); // 'intro' | 'quiz' | 'lead_form' | 'completed'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gateAnswer, setGateAnswer] = useState(null); // 'yes' | 'no' | 'prefer_not_to_answer'
  const [answers, setAnswers] = useState([]);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Compute active question set dynamically based on gate question answer
  const getActiveQuestions = () => {
    if (gateAnswer === 'yes') {
      return [gateQuestion, ...phq2Questions, ...gad2Questions, ...pcPtsd5Questions];
    }
    // If gate is 'no' or 'prefer_not_to_answer' or not answered yet
    return [gateQuestion, ...phq2Questions, ...gad2Questions];
  };

  const activeQuestions = getActiveQuestions();
  const currentQuestionData = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const handleStartCheckin = () => {
    setStage('quiz');
    setCurrentQuestionIndex(0);
    setGateAnswer(null);
    setAnswers([]);
    setSubmitError(null);
  };

  const handleSelectOption = (option) => {
    // If answering the Gate Question (Index 0)
    if (currentQuestionIndex === 0) {
      const selectedGateValue = option.value;
      setGateAnswer(selectedGateValue);

      const newAnswer = {
        questionId: 'gate',
        score: 0,
        questionText: gateQuestion.question,
        answerText: option.label
      };
      setAnswers([newAnswer]);

      // Move to next question (Question 1 - Section 1)
      setCurrentQuestionIndex(1);
      return;
    }

    // Standard Question Answer
    const currentQ = currentQuestionData;
    const newAnswer = {
      questionId: currentQ.id,
      score: option.score,
      questionText: currentQ.question,
      answerText: option.label
    };

    const updatedAnswers = [...answers.filter(a => a.questionId !== currentQ.id), newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage('lead_form');
    }
  };

  const handleBack = () => {
    if (stage === 'lead_form') {
      setStage('quiz');
      return;
    }

    if (currentQuestionIndex > 0) {
      const prevIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIndex);

      if (prevIndex === 0) {
        // Going back to gate question
        setGateAnswer(null);
        setAnswers([]);
      } else {
        const prevQuestion = activeQuestions[prevIndex];
        setAnswers(prev => prev.filter(a => a.questionId !== currentQuestionData.id));
      }
    } else {
      setStage('intro');
    }
  };

  const handleLeadSubmit = async (formData) => {
    const result = calculateAssessmentResult(answers, gateAnswer);

    const nameParts = (formData.fullName || '').trim().split(/\s+/);
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';

    const record = {
      first_name: firstName,
      last_name: lastName,
      email: formData.email,
      phone: formData.phone || '',
      score: result.positiveCount,
      answers: [
        {
          gate_answer: gateAnswer,
          military_status: formData.militaryStatus || 'Not specified'
        },
        ...answers.map(a => ({
          question_id: a.questionId,
          question: a.questionText,
          answer: a.answerText,
          points: a.score
        }))
      ]
    };

    try {
      const { error } = await supabase.from('quiz_submissions').insert([record]);
      if (error) {
        console.error('Supabase save notice:', error);
      }
    } catch (e) {
      console.error('Submission log:', e);
    }

    setSubmitError(null);
    setStage('completed');
  };

  const assessmentResult = calculateAssessmentResult(answers, gateAnswer);

  return (
    <div className="app-container">
      {/* Intro Stage */}
      {stage === 'intro' && (
        <div className="intro-container fade-in">
          <div className="card">
            <div className="intro-badge">WOMEN'S INNERFITNESS AND WELLNESS CENTER</div>
            
            <h1 className="intro-title">A free 3-minute check-in.</h1>
            
            <p className="intro-description">
              Ten questions. No diagnosis, no judgment. Just a quick read on where you are right now.
            </p>

            <p className="intro-author">
              From Dr. LaRay Imani Price, Women's InnerFitness and Wellness Center
            </p>

            <button className="btn-primary" onClick={handleStartCheckin}>
              Start the check-in
            </button>

            <div>
              <button className="btn-text-link" onClick={() => setShowPrivacyModal(true)}>
                Why we ask and privacy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Stage */}
      {stage === 'quiz' && (
        <QuestionCard
          questionData={currentQuestionData}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={10}
          onSelectOption={handleSelectOption}
          onBack={handleBack}
        />
      )}

      {/* Lead Form Stage */}
      {stage === 'lead_form' && (
        <LeadForm
          onSubmit={handleLeadSubmit}
          submitError={submitError}
          onBack={handleBack}
        />
      )}

      {/* Completed Stage */}
      {stage === 'completed' && (
        <ResultScreen
          result={assessmentResult}
          onRestart={handleStartCheckin}
        />
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="modal-overlay fade-in" onClick={() => setShowPrivacyModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Why We Ask and Privacy</h3>
            <div className="modal-body">
              <p>
                This check-in uses standardized, validated public-domain screening tools (PHQ-2, GAD-2, and PC-PTSD-5) commonly used in medical and mental health settings.
              </p>
              <p>
                Your privacy is paramount. Your answers are kept strictly confidential and are never sold or shared with third parties.
              </p>
              <p>
                This tool provides insights for personal reflection and is not a clinical diagnosis or medical treatment.
              </p>
            </div>
            <button className="btn-primary mt-4" onClick={() => setShowPrivacyModal(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
