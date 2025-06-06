import React from 'react';
import StepperForm from './components/StepperForm';
import Feedback from './components/Feedback';
import './index.css';
import './components.css';
import { inject } from '@vercel/analytics';
inject();

function App() {
  return (
    <div className="min-vh-100 bg-light py-4">
      <h1 className="h3 fw-bold text-center text-primary mb-4">
        W-4 Calculator & Form Generator
      </h1>
      <StepperForm />
      <Feedback />
    </div>
  );
}

export default App;
