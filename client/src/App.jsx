import React, { useState } from 'react';
import W4Form from './components/W4Form';
import PaycheckPreview from './components/PaycheckPreview';
import DownloadW4 from './components/DownloadW4';

function App() {
  const [formData, setFormData] = useState({
    grossPay: '',
    payFrequency: 'biweekly',
    filingStatus: 'single',
    dependents: '',
    otherIncome: '',
    deductions: '',
    extraWithholding: '',
    pretaxDeductions: '',
    multipleJobs: false,
    exempt: false,
    // personal info for PDF:
    firstName: '',
    lastName: '',
    ssn: '',
    address: '',
    cityStateZip: '',
    signature: '',
    date: '',
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">W-4 Calculator</h1>

        <W4Form formData={formData} setFormData={setFormData} />

        <PaycheckPreview formData={formData} />

        <div className="text-center">
          <DownloadW4 formData={formData} />
        </div>
      </div>
    </div>
  );
}

export default App;
