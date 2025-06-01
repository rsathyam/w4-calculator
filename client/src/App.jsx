import React, { useState } from 'react';
import W4Form from './components/W4Form';
import PaycheckPreview from './components/PaycheckPreview';
import DownloadW4 from './components/DownloadW4';

export default function App() {
  const [formData, setFormData] = useState({
    filingStatus: 'single',
    multipleJobs: false,
    dependents: 0,
    otherIncome: 0,
    deductions: 0,
    extraWithholding: 0,
    payFrequency: 'biweekly',
    grossPay: 0,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-800">W-4 Calculator</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <W4Form formData={formData} setFormData={setFormData} />
          <PaycheckPreview formData={formData} />
        </div>
        <div className="text-center pt-4">
          <DownloadW4 formData={formData} />
        </div>
      </div>
    </div>
  );
}
