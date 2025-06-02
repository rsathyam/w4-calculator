import React from 'react';
import StepperForm from './components/StepperForm';
import './index.css'; // Tailwind styles

function App() {
  return (
    <div className="bg-white min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-8 text-center">
          W-4 Calculator & Form Generator
        </h1>

        <div className="bg-white rounded-xl shadow-xl px-6 sm:px-10 py-10">
          <StepperForm />
        </div>
      </div>
    </div>
  );
}

export default App;
