import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import StepPersonalInfo from './StepPersonalInfo';
import StepMultipleJobs from './StepMultipleJobs';
import StepFilingStatus from './StepFilingStatus';
import StepIncomeDetails from './StepIncomeDetails';
import StepAdjustments from './StepAdjustments';
import StepDeductionsWorksheet from './StepDeductionsWorksheet';
import StepReview from './StepReview';
import StepIntro from './StepIntro';
import { fillW4Template } from './utils/fillW4Template';


import jsPDF from 'jspdf';


export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState({});

  const goNext = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const handleDownload = async () => {
    try {
      const pdfBytes = await fillW4Template(form);
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'w4_form.pdf';
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to generate PDF:", err);
    }
  };

const steps = [
  { title: 'Welcome', Component: StepIntro },
//  { title: 'Personal Info', Component: StepPersonalInfo },
  { title: 'Filing Status', Component: StepFilingStatus },
  { title: 'Pay & Withholding', Component: StepIncomeDetails },
  ...(form.multipleJobs
    ? [{ title: 'Multiple Jobs Worksheet', Component: StepMultipleJobs }]
    : []),
  { title: 'Deductions', Component: StepDeductionsWorksheet },
  { title: 'Adjustments', Component: StepAdjustments },
  { title: 'Review & Download', Component: StepReview },
];

  const StepComponent = steps[currentStep].Component;
  return (
    <div className="max-w-6xl w-full mx-auto bg-white shadow-xl rounded-xl px-8 sm:px-12 py-12 space-y-6">
      <StepIndicator steps={steps} current={currentStep} />
      <StepComponent form={form} setForm={setForm} onDownload={handleDownload} />

      <div className="flex justify-between items-center mt-6 px-4">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 0}
          className="px-4 py-2 rounded border border-gray-400 text-gray-700 disabled:opacity-30"
        >
          Back
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            Next
          </button>
        ) : null}
      </div>
    </div>
  );
}
