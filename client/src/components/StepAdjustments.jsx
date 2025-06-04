import React from 'react';
import CurrencyInput from './CurrencyInput';
import { FaPiggyBank, FaWallet, FaChartLine, FaDollarSign } from 'react-icons/fa';

export default function StepAdjustments({ form, setForm }) {
  const handleNumberChange = (e, key) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Adjustments</h2>
      <div>
        <label htmlFor="under17" className="block text-sm font-medium text-gray-700">
          Dependents Under 17
        </label>
        <input
          id="under17"
          type="number"
          min="0"
          value={form.under17 || ''}
          onChange={(e) => handleNumberChange(e, 'under17')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="0"
        />
      </div>
      <div>
        <label htmlFor="otherDependents" className="block text-sm font-medium text-gray-700">
          Other Dependents
        </label>
        <input
          id="otherDependents"
          type="number"
          min="0"
          value={form.otherDependents || ''}
          onChange={(e) => handleNumberChange(e, 'otherDependents')}
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="0"
        />
      </div>

      <div>
        <CurrencyInput
          label={
            <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">
              Annual Deductions
            </label>
          }
          name="deductions"
          value={form.deductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={100000}
          helperText="Enter your total itemized deductions for the year beyond the standard deduction."
          icon={FaChartLine}
        />
      </div>

      <div>
        <CurrencyInput
          label={
            <label htmlFor="otherIncome" className="block text-sm font-medium text-gray-700">
              Other Income (Annual)
            </label>
          }
          name="otherIncome"
          value={form.otherIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={1000000}
          helperText="Include any other income you expect to receive this year."
          icon={FaPiggyBank}
        />
      </div>

      <div>

        <CurrencyInput
          label={
            <label htmlFor="pretaxDeductions" className="block text-sm font-medium text-gray-700">
              Pre-tax Contributions (Annual, e.g. 401(k), HSA)
            </label>
          }
          name="pretaxDeductions"
          value={form.pretaxDeductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={100000}
          helperText="Enter the total annual amount of 401(k), HSA, or other pre-tax contributions."
          icon={FaWallet}
        />
      </div>

      <div>
        <CurrencyInput
          label={
            <label htmlFor="extraWithholding" className="block text-sm font-medium text-gray-700">
              Extra Withholding per Paycheck
            </label>
          }
          name="extraWithholding"
          value={form.extraWithholding}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={10000}
          helperText="Any extra amount you'd like withheld from each paycheck."
          icon={FaDollarSign}
        />
      </div>
    </div>
  );
}
