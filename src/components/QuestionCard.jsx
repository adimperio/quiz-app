import React from 'react';
import './QuestionCard.css';
import { ArrowRight } from 'lucide-react';

export default function QuestionCard({ 
  question, 
  options, 
  onSelect,
  currentQuestionIndex,
  totalQuestions,
  disabled = false
}) {
  const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  return (
    <div className={`question-card fade-in${disabled ? ' question-card--disabled' : ''}`}>
      {/* Header with progress */}
      <div className="question-header flex justify-between items-center mb-2">
        <span className="question-number">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
        <span className="time-estimate">About 60 seconds</span>
      </div>
      
      {/* Progress Bar */}
      <div className="progress-bar-container mb-6">
        <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
      </div>

      <h2 className="question-title">{question}</h2>
      
      <div className="options-container flex-col gap-4 mt-6">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => onSelect(option.score, option.text)}
          >
            <span className="option-text">{option.text}</span>
            <ArrowRight size={18} className="option-arrow" />
          </button>
        ))}
      </div>
    </div>
  );
}
