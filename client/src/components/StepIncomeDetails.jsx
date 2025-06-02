import React from 'react';
import CurrencyInput from './CurrencyInput';

export default function StepIncomeDetails({ form, setForm }) {
  const handleMoneyChange = (e, key) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
      setForm({ ...form, [key]: raw });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Step 3: Pay & Withholding</h2>

      <div>
        <label htmlFor="grossPay" className="block text-sm font-medium text-gray-700">
          Gross Pay
        </label>
        <CurrencyInput
          label="Gross Pay"
          name="grossPay"
          value={form.grossPay}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={1000}
          max={1000000}
          helperText="Enter your gross pay per paycheck, before taxes and deductions."
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="multipleJobs"
          checked={form.multipleJobs || false}
          onChange={(e) => setForm({ ...form, multipleJobs: e.target.checked })}
        />
        <label htmlFor="multipleJobs" className="text-sm text-gray-700">
          Multiple jobs or spouse works?
        </label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="exempt"
          checked={form.exempt || false}
          onChange={(e) => setForm({ ...form, exempt: e.target.checked })}
        />
        <label htmlFor="exempt" className="text-sm text-gray-700">
          Exempt from withholding?
        </label>
      </div>
    </div>
  );
}
