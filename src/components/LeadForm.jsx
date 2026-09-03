import React, { useState } from 'react';
import { CheckCircle, Lock } from 'lucide-react';
import './LeadForm.css';

export default function LeadForm({ onSubmit, submitError }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="lead-form-container fade-in">
      <div className="lead-form-card">
        <div className="flex items-center gap-2 form-status mb-4">
          <CheckCircle size={18} className="status-icon" />
          <span>ALL 7 QUESTIONS DONE</span>
        </div>
        
        <h1 className="form-title">Your Home Health Score Is Ready</h1>
        
        <div className="bonus-box flex items-center gap-2 mb-4 mt-2">
          <Lock size={16} />
          <span>Plus, get your FREE 10-Point Home Health Checklist.</span>
        </div>
        
        <form onSubmit={handleSubmit} className="flex-col gap-4">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              className="form-input"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              required
              className="form-input"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="form-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              className="form-input"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-button mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : <>Show My Results <span style={{marginLeft: '8px'}}>→</span></>}
          </button>

          {submitError && (
            <p style={{ color: 'var(--danger-color)', fontSize: '0.85rem', textAlign: 'center', marginTop: '0.5rem' }}>
              {submitError}
            </p>
          )}
          
          <p className="disclaimer mt-4 text-center">
            Your information is used to deliver your results and help you with your Home Health Check-Up.
          </p>
        </form>
      </div>
    </div>
  );
}
