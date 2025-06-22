import React, { useState } from 'react';
import { FaLightbulb } from 'react-icons/fa';

const tips = [
  {
    step: 0,
    title: "💡 Quick Tip",
    content: "Single filers usually choose 'Single' and married couples filing together choose 'Married filing jointly'."
  },
  {
    step: 1,
    title: "💰 Income Tip", 
    content: "Enter your gross annual salary before taxes. If you're paid bi-weekly, multiply your paycheck by 26."
  },
  {
    step: 2,
    title: "👨‍👩‍👧‍👦 Multiple Jobs",
    content: "Include ALL jobs in your household, including your spouse's job if filing jointly."
  },
  {
    step: 3,
    title: "📋 Deductions",
    content: "Common deductions: mortgage interest, charitable donations, state taxes. Only use if you don't take the standard deduction."
  },
  {
    step: 4,
    title: "🎯 Final Step",
    content: "Review your results! The calculator shows your estimated take-home pay and generates your W-4 form."
  }
];

export default function QuickTip({ currentStep }) {
  const [isVisible, setIsVisible] = useState(true);
  const currentTip = tips.find(tip => tip.step === currentStep);

  if (!currentTip || !isVisible) {
    return null;
  }

  return (
    <div className="alert alert-light border-start border-primary border-4 mb-3 position-relative">
      <button 
        type="button" 
        className="btn-close position-absolute top-0 end-0 m-2"
        aria-label="Close tip"
        onClick={() => setIsVisible(false)}
      ></button>
      <div className="d-flex align-items-start">
        <FaLightbulb className="text-primary me-2 mt-1 flex-shrink-0" />
        <div>
          <h6 className="mb-1 fw-bold text-primary">{currentTip.title}</h6>
          <p className="mb-0 small text-muted">{currentTip.content}</p>
        </div>
      </div>
    </div>
  );
}