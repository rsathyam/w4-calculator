import React from 'react';
import StepperForm from './components/StepperForm';
import Feedback from './components/Feedback';
import FAQ from './components/FAQ';
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
                Free W-4 Calculator 2024 | IRS Tax Withholding Form Generator
              </h1>
              <p className="lead text-muted mb-4 px-3">
                Calculate your federal tax withholding with precision and generate your completed W-4 form in minutes. Free, secure, and IRS-compliant.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
                <span className="badge bg-success px-3 py-2">✓ 100% Free</span>
                <span className="badge bg-primary px-3 py-2">✓ IRS Compliant</span>
                <span className="badge bg-info px-3 py-2">✓ Instant PDF</span>
                <span className="badge bg-warning text-dark px-3 py-2">✓ Secure & Private</span>
              </div>
              <div className="alert alert-info d-flex align-items-center justify-content-center mb-4" role="alert">
                <div className="text-center">
                  <strong>🚀 Quick Start:</strong> Most users complete their W-4 in under 5 minutes!
                  <br />
                  <small className="text-muted">No signup required • Works on all devices • Instant results</small>
                </div>
              </div>
            </header>
            <StepperForm />
            <FAQ />
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
