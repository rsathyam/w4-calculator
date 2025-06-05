import React from 'react';

export default function StepPersonalInfo({ form, setForm }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Filing Status</h2>

      <div>
        <label
          htmlFor="filingStatus"
          className="block text-sm font-medium text-gray-700"
          title="Select your tax filing status"
        >
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={form.filingStatus || 'single'}
          onChange={(e) => setForm({ ...form, filingStatus: e.target.value })}
          className="mt-1 block w-full sm:max-w-xs rounded border border-gray-300 px-3 py-2 pr-8"
        >
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head">Head of Household</option>
        </select>
      </div>
    </div>
  );
}
