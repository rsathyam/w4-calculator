import React from 'react';

export default function W4Form({ formData, setFormData }) {
  const update = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const createNumericInput = (field, label) => (
    <div key={field}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        inputMode="decimal"
        pattern="^\d*\.?\d*$"
        defaultValue={formData[field]}
        onChange={(e) => {
          let value = e.target.value.replace(/,/g, '');
          if (/^\d*\.?\d*$/.test(value)) {
            update(field, value === '' ? 0 : parseFloat(value));
          }
        }}
        onBlur={(e) => {
          let num = parseFloat(e.target.value.replace(/,/g, ''));
          if (!isNaN(num)) {
            e.target.value = num.toLocaleString('en-US', { maximumFractionDigits: 2 });
          }
        }}
        className="w-full border border-gray-300 rounded-lg px-3 py-2"
      />
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Filing Status</label>
        <select
          value={formData.filingStatus}
          onChange={(e) => update('filingStatus', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="head">Head of Household</option>
        </select>
      </div>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.multipleJobs}
            onChange={(e) => update('multipleJobs', e.target.checked)}
          />
          <span>Check if you or your spouse have multiple jobs</span>
        </label>
      </div>

      {createNumericInput('dependents', 'Number of Dependents')}
      {createNumericInput('otherIncome', 'Other Income ($)')}
      {createNumericInput('deductions', 'Additional Deductions ($)')}
      {createNumericInput('extraWithholding', 'Extra Withholding per Paycheck ($)')}
      {createNumericInput('grossPay', 'Gross Pay per Paycheck ($)')}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Pay Frequency</label>
        <select
          value={formData.payFrequency}
          onChange={(e) => update('payFrequency', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="semimonthly">Semi-monthly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );
}
