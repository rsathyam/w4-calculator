import React from 'react';

export default function StepIndicator({ steps, current }) {
  const progressPercentage = Math.round((current / (steps.length - 1)) * 100);
  
  return (
    <div className="mb-4 position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="small text-muted">Progress</span>
        <span className="small fw-bold text-primary">{progressPercentage}% Complete</span>
      </div>
      <div className="d-flex justify-content-between align-items-center position-relative">
        {steps.map((step, index) => (
          <div key={index} className="flex-fill text-center position-relative">
            {/* Progress line (except for the last step) */}
            {index < steps.length - 1 && (
              <div 
                className={`step-indicator-progress-line ${
                  index < current ? 'completed' : ''
                }`}
              />
            )}
            
            {/* Step circle */}
            <div
              className={`step-indicator-circle mx-auto ${
                index < current 
                  ? 'completed' 
                  : index === current 
                  ? 'active' 
                  : ''
              }`}
            >
              {index < current ? '✓' : index + 1}
            </div>
            
            {/* Step title */}
            <p className={`mt-2 small fw-medium ${
              index === current 
                ? 'text-primary' 
                : index < current 
                ? 'text-success' 
                : 'text-muted'
            }`}>
              {step.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
