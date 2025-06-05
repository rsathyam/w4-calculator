import React from 'react';

export default function StepIntro({ onNext }) {
  return (
    <div className="mb-3 d-flex flex-column justify-content-between h-100 gap-3">
      <h2 className="h4 fw-bold text-dark text-center mb-4">Welcome to the W-4 Calculator</h2>
      <p className="fs-5">
        This tool helps you accurately complete the official IRS W-4 form based on your income, dependents,
        deductions, and withholding preferences. It uses 2025 tax brackets and works entirely in your browser.
      </p>
      <ul className="ps-3 fs-5">
        <li>✅ Preview your tax withholding per paycheck</li>
        <li>✅ Generate a filled-in IRS W-4 PDF</li>
        <li>✅ Download your personalized form — no data is saved or sent anywhere</li>
      </ul>
    </div>
  );
}
