import React from 'react';
import CurrencyInput from './CurrencyInput';


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
        <CurrencyInput
          label="Deductions"
          name="deductions"
          value={form.deductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={100000}
          helperText="Enter any itemized deductions beyond the standard deduction."
        />
      </div>

      <div>
        <label htmlFor="otherIncome" className="block text-sm font-medium text-gray-700">
          Other Income
        </label>
        <CurrencyInput
          label="Other Income"
          name="otherIncome"
          value={form.otherIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={1000000}
          helperText="Include any other income you expect to receive."
        />
      </div>

      <div>

        <CurrencyInput
          label={
            <label htmlFor="pretaxDeductions" className="block text-sm font-medium text-gray-700">
              Pre-tax Contributions (e.g. 401(k), HSA)
            </label>
          }
          name="pretaxDeductions"
          value={form.pretaxDeductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={100000}
          helperText="Enter any 401(k), HSA, or other pre-tax deductions."
        />
      </div>

      <div>
        <label htmlFor="extraWithholding" className="block text-sm font-medium text-gray-700">
          Extra Withholding per Paycheck
        </label>
        <CurrencyInput
          label="Extra Withholding"
          name="extraWithholding"
          value={form.extraWithholding}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={10000}
          helperText="Any extra amount you'd like withheld from each paycheck."
        />
      </div>
    </div>
  );
}
