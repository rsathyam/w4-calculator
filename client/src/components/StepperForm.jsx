import React, { useState } from 'react';
import StepIndicator from './StepIndicator';
import StepMultipleJobs from './StepMultipleJobs';
import StepIncomeDetails from './StepIncomeDetails';
import StepAdjustments from './StepAdjustments';
import StepDeductionsWorksheet from './StepDeductionsWorksheet';
import StepReview from './StepReview';
import StepIntro from './StepIntro';
import { fillW4Template } from './utils/fillW4Template';


import jsPDF from 'jspdf';


export default function StepperForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const defaultForm = {
    filingStatus: 'single',
    payFrequency: 'biweekly',
    grossPay: '',
    multipleJobs: false,
    exempt: false,
    secondJobIncome: '',
    spouseIncome: '',
    jobCount: 0,
    itemizedDeductions: 0,
    adjustmentDeductions: 0,
    deductions: 0,
    under17: 0,
    otherDependents: 0,
    otherIncome: 0,
    pretaxDeductions: 0,
    extraWithholding: 0,
  };

  const [form, setForm] = useState(defaultForm);

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
    <div
      className="container bg-white shadow rounded p-4 my-4 d-flex flex-column stepper-form-container"
    >
      <StepIndicator steps={steps} current={currentStep} />
      <div className="flex-grow-1 d-flex flex-column">
        <StepComponent form={form} setForm={setForm} />
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4 px-2">
        <button
          type="button"
          onClick={goBack}
          disabled={currentStep === 0}
          className="btn btn-secondary"
        >
          Back
        </button>
        {currentStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="btn btn-primary"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDownload}
            className="btn btn-primary"
          >
            Download Completed W-4 Form (PDF)
          </button>
        )}
      </div>
    </div>
  );
}
