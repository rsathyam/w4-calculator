import React from 'react';
import CurrencyInput from './CurrencyInput';


export default function StepMultipleJobs({ form, setForm }) {
  
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-blue-800">Multiple Jobs Worksheet</h2>

      <div>
        <CurrencyInput
          label={
            <label htmlFor="grossPay" className="block text-sm font-medium text-gray-700">
              Income from second job
            </label>
          }
          name="secondJobIncome"
          value={form.secondJobIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          helperText="Enter your income from a second job, if you have one"
        />
      </div>

      <div>
        <CurrencyInput
          label={
            <label htmlFor="spouseIncome" className="block text-sm font-medium text-gray-700">
              Spouse's income
            </label>
          }
          name="spouseIncome"
          value={form.spouseIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          helperText="Enter your spouse's income"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Total household job count
        </label>
        <input
          type="number"
          name="jobCount"
          value={form.jobCount || ''}
          onChange={(field, val) => setForm({ ...form, [field]: val })}          
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="e.g. 2"
        />
      </div>
    </div>
  );
}
