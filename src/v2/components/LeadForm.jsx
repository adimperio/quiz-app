import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './LeadForm.css';

export default function LeadForm({ onSubmit, submitError, onBack }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [militaryStatus, setMilitaryStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit({
      fullName,
      email,
      phone,
      militaryStatus
    });
    setIsSubmitting(false);
  };

  return (
    <div className="lead-form-wrapper fade-in">
      <div className="question-nav-bar">
        {onBack && (
          <button className="back-nav-btn" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        )}
      </div>

      <div className="card lead-form-card">
        <h2 className="form-title">Where should we send your results?</h2>

        <form onSubmit={handleSubmit} className="lead-form-content">
          <div className="form-group">
            <label htmlFor="fullName" className="form-label">Full name</label>
            <input
              type="text"
              id="fullName"
              required
              className="form-input"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone" className="form-label">Phone (optional)</label>
            <input
              type="tel"
              id="phone"
              className="form-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group military-group">
            <label className="form-label">
              Are you or a family member currently or formerly military?
            </label>
            <div className="options-list">
              {['Yes', 'No', 'Prefer not to say'].map((option) => {
                const isSelected = militaryStatus === option;
                return (
                  <label
                    key={option}
                    className={`option-pill-btn ${isSelected ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="militaryStatus"
                      value={option}
                      checked={isSelected}
                      onChange={(e) => setMilitaryStatus(e.target.value)}
                      className="sr-only"
                    />
                    <span className="option-radio-circle">
                      {isSelected && <div className="radio-inner-dot" />}
                    </span>
                    <span className="option-label">{option}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <p className="form-privacy-note">
            We will send your results and a free Daily Healing Check-In journal. We will never share your information.
          </p>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'See my results'}
          </button>

          {submitError && (
            <p className="form-error-msg">{submitError}</p>
          )}
        </form>
      </div>
    </div>
  );
}
