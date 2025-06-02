import React from 'react';

export default function StepIntro({ onNext }) {
  return (
    <div className="space-y-4 bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-bold text-gray-800">Welcome to the W-4 Calculator</h2>
      <p className="text-gray-700">
        This tool helps you accurately complete the official IRS W-4 form based on your income, dependents,
        deductions, and withholding preferences. It uses 2024 tax brackets and works entirely in your browser.
      </p>
      <ul className="list-disc list-inside text-gray-600">
        <li>✅ Preview your tax withholding per paycheck</li>
        <li>✅ Generate a filled-in IRS W-4 PDF</li>
        <li>✅ Download your personalized form — no data is saved or sent anywhere</li>
      </ul>
    </div>
  );
}
