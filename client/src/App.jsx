import React from 'react';
import StepperForm from './components/StepperForm';
import './index.css'; // Tailwind styles

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
        W-4 Calculator & Form Generator
      </h1>
      <StepperForm />
    </div>
  );
}

export default App;
