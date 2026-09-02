import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import './QuestionCard.css';

export default function QuestionCard({
  questionData,
  currentQuestionIndex,
  totalQuestions,
  onSelectOption,
  onBack
}) {
  const { sectionTag, header, question, options } = questionData;
  const progressPercent = Math.min(((currentQuestionIndex + 1) / totalQuestions) * 100, 100);

  const [selectedIdx, setSelectedIdx] = useState(null);

  // Reset selected state when question changes
  useEffect(() => {
    setSelectedIdx(null);
  }, [currentQuestionIndex]);

  const handleOptionClick = (option, idx) => {
    if (selectedIdx !== null) return; // Prevent double clicks
    setSelectedIdx(idx);
    setTimeout(() => {
      onSelectOption(option);
    }, 450); // 450ms delay so user sees selection
  };

  return (
    <div className="question-wrapper fade-in">
      {/* Top Bar with Back Button */}
      <div className="question-nav-bar">
        {currentQuestionIndex >= 0 ? (
          <button className="back-nav-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Question Counter */}
      <div className="question-counter-label">
        QUESTION {currentQuestionIndex + 1} OF {totalQuestions}
      </div>

      {/* Main Card */}
      <div className="card question-card">
        {sectionTag && (
          <div className="section-badge">{sectionTag}</div>
        )}

        {header && (
          <p className="question-header-text mb-2">{header}</p>
        )}

        <h2 className="question-title mb-6">{question}</h2>

        <div className="options-list">
          {options.map((option, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                className={`option-pill-btn ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(option, idx)}
              >
                <span className="option-radio-circle">
                  {isSelected && <div className="radio-inner-dot" />}
                </span>
                <span className="option-label">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
