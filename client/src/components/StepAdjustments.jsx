import React from 'react';

export default function StepAdjustments({ form, setForm }) {
  const handleNumberChange = (e, key) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Step 4: Adjustments</h2>

      <div>
        <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">
          Dependents
        </label>
        <input
          id="dependents"
          type="number"
          min="0"
          value={form.dependents || ''}
          onChange={(e) => handleNumberChange(e, 'dependents')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="0"
        />
      </div>

      <div>
        <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">
          Deductions
        </label>
        <input
          id="deductions"
          type="text"
          inputMode="decimal"
          value={form.deductions || ''}
          onChange={(e) => handleNumberChange(e, 'deductions')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="$0.00"
        />
      </div>

      <div>
        <label htmlFor="otherIncome" className="block text-sm font-medium text-gray-700">
          Other Income
        </label>
        <input
          id="otherIncome"
          type="text"
          inputMode="decimal"
          value={form.otherIncome || ''}
          onChange={(e) => handleNumberChange(e, 'otherIncome')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="$0.00"
        />
      </div>

      <div>
        <label htmlFor="pretaxDeductions" className="block text-sm font-medium text-gray-700">
          Pre-tax Contributions (e.g. 401(k), HSA)
        </label>
        <input
          id="pretaxDeductions"
          type="text"
          inputMode="decimal"
          value={form.pretaxDeductions || ''}
          onChange={(e) => handleNumberChange(e, 'pretaxDeductions')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="$0.00"
        />
      </div>

      <div>
        <label htmlFor="extraWithholding" className="block text-sm font-medium text-gray-700">
          Extra Withholding per Paycheck
        </label>
        <input
          id="extraWithholding"
          type="text"
          inputMode="decimal"
          value={form.extraWithholding || ''}
          onChange={(e) => handleNumberChange(e, 'extraWithholding')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="$0.00"
        />
      </div>
    </div>
  );
}
