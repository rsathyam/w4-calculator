import React from 'react';

export default function StepFilingStatus({ form, setForm }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filing Status & Pay Frequency</h2>

      <div>
        <label htmlFor="filingStatus" className="block text-sm font-medium text-gray-700">
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={form.filingStatus || 'single'}
          onChange={(e) => setForm({ ...form, filingStatus: e.target.value })}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 pr-8"
        >
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head">Head of Household</option>
        </select>
      </div>

      <div>
        <label htmlFor="payFrequency" className="block text-sm font-medium text-gray-700">
          Pay Frequency
        </label>
        <select
          id="payFrequency"
          value={form.payFrequency || 'biweekly'}
          onChange={(e) => setForm({ ...form, payFrequency: e.target.value })}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 pr-8"
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
