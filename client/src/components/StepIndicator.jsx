import React from 'react';

export default function StepIndicator({ steps, current }) {
  return (
    <div className="d-flex justify-content-between mb-3 overflow-auto">
      {steps.map((step, index) => (
        <div key={index} className="flex-fill text-center">
          <div
            className={`step-indicator-circle rounded-circle mx-auto d-flex align-items-center justify-content-center fw-bold border
              ${index === current ? 'bg-primary text-white' : 'bg-light text-secondary'}`}
          >
            {index + 1}
          </div>
          <p className={`mt-1 small ${index === current ? 'text-primary fw-medium' : 'text-secondary'}`}>{step.title}</p>
        </div>
      ))}
    </div>
  );
}
