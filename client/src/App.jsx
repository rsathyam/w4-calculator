import React from 'react';
import StepperForm from './components/StepperForm';
import Feedback from './components/Feedback';
import './index.css';
import './components.css';
import { inject } from '@vercel/analytics';
inject();

function App() {
  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container-fluid px-3">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8">
            <header className="text-center mb-5">
              <h1 className="display-5 fw-bold text-primary mb-3">
                W-4 Calculator & Form Generator
              </h1>
              <p className="lead text-muted mb-0 px-3">
                Calculate your federal tax withholding with precision and generate your completed W-4 form
              </p>
            </header>
            <StepperForm />
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
