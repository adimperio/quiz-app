import { useState } from 'react';
import { quizData, resultBands } from './data/quizData';
import QuestionCard from './components/QuestionCard';
import LeadForm from './components/LeadForm';
import ResultScreen from './components/ResultScreen';
import { Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './index.css';
import './App.css';

function App() {
  const [status, setStatus] = useState('active'); // active, lead_form, completed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitError, setSubmitError] = useState(null);

  const handleAnswerSelect = (score, answerText) => {
    const currentQuestion = quizData[currentQuestionIndex];
    const newAnswer = {
      questionId: currentQuestion.id,
      score,
      questionText: currentQuestion.question,
      answerText
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStatus('lead_form');
    }
  };

  const handleLeadFormSubmit = async (formData) => {
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);

    const record = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      score: totalScore,
      answers: [
        { quiz_tag: 'quiz-1' },
        ...answers.map(a => ({
          question_id: a.questionId,
          question: a.questionText,
          answer: a.answerText,
          points: a.score
        }))
      ]
    };

    const { error } = await supabase.from('quiz_submissions').insert([record]);

    if (error) {
      console.error('Supabase error:', error);
      setSubmitError('There was a problem saving your results. Please try again.');
      return;
    }

    setSubmitError(null);
    setStatus('completed');
  };

  // Compute results
  const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
  const normalizedScore = totalScore; // Raw score, max 95

  const resultBand = resultBands.find(
    band => normalizedScore >= band.min && normalizedScore <= band.max
  ) || resultBands[2];

  // Find 2GÇô3 lowest scoring answers for risk cards
  const lowestScoringAnswers = [...answers]
    .sort((a, b) => a.score - b.score)
    .slice(0, 3);

  return (
    <div className="v1-theme">
      <div className="app-wrapper">
      {/* Two-column layout GÇö visible during quiz and form stage */}
      {status !== 'completed' && (
        <div className="quiz-layout fade-in">
          {/* Left Column: Intro card GÇö always stays */}
          <div className="intro-card">
            <h2>Ready to see how your home scores?</h2>
            <p>There are just 7 quick questions.</p>
            <p>There are no trick questions and you don't need to know anything technical about your home. Just choose the answer that sounds most like you.</p>
            <div className="time-estimate-box mt-6">
              <Clock size={16} />
              <span>Takes about 60 seconds</span>
            </div>
          </div>

          {/* Right Column: Question OR Form GÇö swaps in place */}
          <div className="question-column">
            {status === 'active' && (
              <QuestionCard
                question={quizData[currentQuestionIndex].question}
                options={quizData[currentQuestionIndex].options}
                onSelect={handleAnswerSelect}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={quizData.length}
              />
            )}
            {status === 'lead_form' && (
              <LeadForm onSubmit={handleLeadFormSubmit} submitError={submitError} />
            )}
          </div>
        </div>
      )}

      {/* Results GÇö full width below after form submit */}
      {status === 'completed' && (
        <div className="result-section fade-in">
          <ResultScreen
            score={normalizedScore}
            resultBand={resultBand}
            lowestScoringAnswers={lowestScoringAnswers}
          />
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
