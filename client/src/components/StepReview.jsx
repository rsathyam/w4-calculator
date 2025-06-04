import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import PaycheckPreview from './PaycheckPreview';

export default function StepReview({ form, onDownload }) {
  const defaults = {
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

  const currencyFields = [
    'grossPay',
    'extraWithholding',
    'secondJobIncome',
    'spouseIncome',
    'otherIncome',
    'pretaxDeductions',
    'itemizedDeductions',
    'adjustmentDeductions',
    'deductions',
  ];

  const formatValue = (key, value) => {
    if (currencyFields.includes(key)) {
      const num = parseFloat(value);
      if (isNaN(num)) return '$0';
      return `$${num.toLocaleString()}`;
    }
    return String(value) || '—';
  };

  const entries = Object.entries({ ...defaults, ...form }).filter(
    ([k]) => !['step2b', 'step4b'].includes(k),
  );

  const labelMap = {
    under17: 'Number of Dependents under 17',
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Review & Download</h2>

      <div className="bg-white rounded shadow-sm border border-gray-200 p-6 space-y-2">
        {entries.map(([key, value]) => {
          const label = labelMap[key] || key.replace(/([A-Z])/g, ' $1');
          const labelClass = labelMap[key] ? '' : 'capitalize';
          return (
            <div key={key} className="flex justify-between items-center text-sm text-gray-700">
              <span className={`${labelClass} flex items-center gap-1`}>
                <FaRegFileAlt className="text-gray-500" />
                {label}
              </span>
              <span className="text-right">{formatValue(key, value)}</span>
            </div>
          );
        })}
      </div>

      <PaycheckPreview formData={form} />

      <div className="pt-4">
        <button
          type="button"
          onClick={onDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Download Completed W-4 Form (PDF)
        </button>
      </div>
    </div>
  );
}
