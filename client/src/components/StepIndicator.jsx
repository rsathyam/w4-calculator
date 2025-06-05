import React from 'react';

export default function StepIndicator({ steps, current }) {
  return (
    <div className="flex flex-col items-start space-y-3 mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center space-x-2">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
              ${index === current ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {index + 1}
          </div>
          <p className={`text-sm ${index === current ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>{step.title}</p>
        </div>
      ))}
    </div>
  );
}
