import React from 'react';
import CurrencyInput from './CurrencyInput';
import {FaMoneyBillWave} from 'react-icons/fa';

export default function StepIncomeDetails({ form, setForm }) {
  const handleMoneyChange = (e, key) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
      setForm({ ...form, [key]: raw });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Pay & Withholding</h2>

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
          <option value="single">Single or Married Filing Separately</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head">Head of Household</option>
        </select>
      </div>

      <div>
        <CurrencyInput
          label={
            <label
              htmlFor="grossPay"
              className="block text-sm font-medium text-gray-700"
              title="Your yearly income before taxes"
            >
              Annual Gross Pay
            </label>
          }
          name="grossPay"
          value={form.grossPay}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          helperText="Enter your total gross pay for the year, before taxes and deductions."
          icon={FaMoneyBillWave}
        />
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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="multipleJobs"
          checked={form.multipleJobs || false}
          onChange={(e) => setForm({ ...form, multipleJobs: e.target.checked })}
        />
        <label htmlFor="multipleJobs" className="text-sm text-gray-700">
          Multiple Jobs or Spouse Works?
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
          Exempt from Withholding?
        </label>
      </div>
    </div>
  );
}
