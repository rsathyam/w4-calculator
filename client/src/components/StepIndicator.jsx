import React from 'react';

export default function StepIndicator({ steps, current }) {
  console.log("Got here!!");
  return (
    <div className="flex items-center justify-between mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 text-center">
          <div
            className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold
              ${index === current ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            {index + 1}
          </div>
          <p className={`mt-1 text-xs ${index === current ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
            {step.title}
          </p>
        </div>
      ))}
    </div>
  );
}
