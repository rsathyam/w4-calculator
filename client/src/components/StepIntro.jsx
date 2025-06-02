import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

export default function StepIntro() {
  return (
    <div className="space-y-6 px-4">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to the W-4 Calculator
        </h2>
        <p className="text-gray-700 mb-4">
          This tool helps you accurately complete the official IRS W-4 form based on your income,
          dependents, deductions, and withholding preferences. It uses 2024 tax brackets and works entirely in your browser.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-gray-800">
            <FaCheckCircle className="text-green-600 mt-1" />
            Preview your tax withholding per paycheck
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-800">
            <FaCheckCircle className="text-green-600 mt-1" />
            Generate a filled-in IRS W-4 PDF
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-800">
            <FaCheckCircle className="text-green-600 mt-1" />
            Download your personalized form — no data is saved or sent anywhere
          </li>
        </ul>
      </div>
    </div>
  );
}
