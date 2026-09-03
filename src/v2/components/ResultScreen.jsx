import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import './ResultScreen.css';

export default function ResultScreen({ result, onRestart }) {
  const { title, description } = result;

  const handleBookCall = () => {
    window.open('https://calendly.com/womensinnerfitness/15min', '_blank');
  };

  const handleDownloadJournal = () => {
    // Trigger download or open daily healing journal PDF
    window.open('https://womensinnerfitness.com/daily-healing-journal.pdf', '_blank');
  };

  return (
    <div className="result-wrapper fade-in">
      <div className="question-nav-bar mb-2">
        <button className="back-nav-btn" onClick={onRestart}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>

      <div className="card result-card">
        <div className="section-badge mb-2">YOUR CHECK-IN</div>

        <h1 className="result-heading mb-4">{title}</h1>

        <p className="result-copy mb-6">{description}</p>

        <div className="result-actions flex-col gap-3 mb-6">
          <button className="btn-primary" onClick={handleBookCall}>
            Book your free 15-minute check-in call
          </button>

          <button className="btn-secondary" onClick={handleDownloadJournal}>
            Download your free Daily Healing journal
          </button>
        </div>

        <div className="email-confirmation-box flex items-center justify-center gap-2 mb-6">
          <CheckCircle2 size={16} className="check-icon" />
          <span>Your full results have also been emailed to you.</span>
        </div>

        <div className="disclaimer-divider mb-4" />

        <p className="disclaimer-text">
          This check-in uses the PHQ-2 (depression), GAD-2 (anxiety), and PC-PTSD-5 (trauma), public-domain screening tools used routinely in primary care. It is a screening, not a diagnosis. If you are in crisis, please call or text 988 (Suicide and Crisis Lifeline) or go to your nearest emergency room.
        </p>
      </div>
    </div>
  );
}
