import React, { useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import { calculateStep2b } from './utils/calculateStep2b';


export default function StepMultipleJobs({ form, setForm }) {
  useEffect(() => {
    const step2b = calculateStep2b({
      filingStatus: form.filingStatus,
      payFrequency: form.payFrequency,
      grossPay: form.grossPay,
      otherIncome: form.otherIncome,
      pretaxDeductions: form.pretaxDeductions,
      secondJobIncome: form.secondJobIncome,
      spouseIncome: form.spouseIncome,
      jobCount: form.jobCount,
    });
    if (JSON.stringify(step2b) !== JSON.stringify(form.step2b)) {
      setForm((f) => ({ ...f, step2b, extraWithholding: step2b.line4 }));
    }
  }, [
    form.filingStatus,
    form.payFrequency,
    form.grossPay,
    form.otherIncome,
    form.pretaxDeductions,
    form.secondJobIncome,
    form.spouseIncome,
    form.jobCount,
  ]);

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
          onChange={(e) => setForm({ ...form, jobCount: e.target.value })}
          className="w-full px-3 py-2 border rounded-md shadow-sm"
          placeholder="e.g. 2"
        />
      </div>

      {form.step2b && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">
            Estimated extra withholding per paycheck (Step 2(b)):{' '}
            <strong>${form.step2b.line4}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
