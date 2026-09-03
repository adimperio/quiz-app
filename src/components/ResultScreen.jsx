import React from 'react';
import './ResultScreen.css';
import { Calendar } from 'lucide-react';

export default function ResultScreen({ score, resultBand, lowestScoringAnswers }) {
  // Gauge calculations
  const radius = 90;
  const circumference = Math.PI * radius; // Half circle
  const fillPercentage = score / 100;
  const strokeDashoffset = circumference - (fillPercentage * circumference);

  return (
    <div className="result-container fade-in">
      {/* Score Card */}
      <div className="result-card main-score-card">
        <h3 className="score-subtitle">YOUR HOME HEALTH SCORE</h3>
        
        <div className="gauge-container">
          <svg className="gauge-svg" viewBox="0 0 200 110">
            {/* Background track */}
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke="#f1eedb"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Value fill */}
            <path
              d="M 10 100 A 90 90 0 0 1 190 100"
              fill="none"
              stroke={resultBand.color}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="gauge-fill"
            />
          </svg>
          <div className="score-text">
            <span className="score-number">{score}</span>
            <span className="score-max">/ 100</span>
          </div>
        </div>

        <h2 className="result-title" style={{ color: resultBand.color }}>
          {resultBand.title}
        </h2>
        <p className="result-message">{resultBand.message}</p>
      </div>

      {/* Risks Section */}
      <div className="result-card mt-6">
        <h2 className="section-title mb-4">Your Top Home Health Risks</h2>
        
        <div className="risks-list">
          {lowestScoringAnswers.map((item, index) => {
            // Mapping the question to a short risk title based on the data
            let riskTitle = "Potential Risk";
            if (item.questionId === 4) riskTitle = "Trusted Help";
            else if (item.questionId === 6) riskTitle = "Repair Pricing";
            else if (item.questionId === 7) riskTitle = "Your Time";
            else if (item.questionId === 1) riskTitle = "Home Age";
            else if (item.questionId === 2) riskTitle = "Maintenance Plan";
            else if (item.questionId === 3) riskTitle = "System Servicing";
            else if (item.questionId === 5) riskTitle = "Contractor Reliability";

            return (
              <div key={index} className="risk-item">
                <h4 className="risk-title">{riskTitle}</h4>
                <p className="risk-desc">
                  {
                    item.questionId === 4 ? "Starting from scratch every time something breaks costs you time — and makes it harder to know who to trust." :
                    item.questionId === 6 ? "You're not completely confident you're getting fair pricing when something needs fixing." :
                    item.questionId === 7 ? "Coordinating home maintenance is eating up hours every month that should be yours." :
                    item.questionId === 1 ? "Older homes often require more frequent and specialized maintenance to prevent major issues." :
                    item.questionId === 2 ? "Without a regular maintenance plan, small issues can quickly become expensive repairs." :
                    item.questionId === 3 ? "Unserviced systems are more prone to breakdown and operate less efficiently, increasing costs." :
                    "Working with unreliable contractors can lead to unfinished work, overcharging, and unnecessary stress."
                  }
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Good News Box */}
      <div className="good-news-box mt-6">
        <h4 className="good-news-title">The good news?</h4>
        <p>These are exactly the kinds of homeownership headaches Homeowners Hub is designed to take off your plate.</p>
      </div>

      {/* CTA Card */}
      <div className="cta-card mt-6">
        <div className="value-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="badge-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
          $199 VALUE — FREE
        </div>
        
        <h2 className="cta-title">You've Earned a FREE Home Health Check-Up</h2>
        <p className="cta-desc">
          Let a Homeowners Hub professional help you identify what deserves attention now, what can wait, and how to stay ahead of expensive home surprises.
        </p>
        
        <button className="book-button" onClick={() => window.location.reload()}>
          <Calendar size={18} />
          Book My Free Home Health Check-Up →
        </button>
        
        <p className="cta-footer">
          Prefer to talk first? We'll also reach out to help you schedule your complimentary check-up.
        </p>
      </div>
    </div>
  );
}
