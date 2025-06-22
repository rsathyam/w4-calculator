import React from 'react';
import { FaClock } from 'react-icons/fa';

const stepTimes = [2, 1, 2, 3, 1]; // minutes per step

export default function TimeEstimate({ currentStep, totalSteps }) {
  const remainingTime = stepTimes.slice(currentStep).reduce((sum, time) => sum + time, 0);
  const totalTime = stepTimes.reduce((sum, time) => sum + time, 0);
  
  return (
    <div className="d-flex align-items-center justify-content-center mb-3">
      <div className="d-flex align-items-center text-muted small">
        <FaClock className="me-2" />
        <span>
          {remainingTime > 0 
            ? `${remainingTime} min remaining` 
            : 'Almost done!'
          }
        </span>
        <span className="mx-2">•</span>
        <span className="text-success">{totalTime} min total</span>
      </div>
    </div>
  );
}