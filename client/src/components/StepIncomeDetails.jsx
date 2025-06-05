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
    <div className="mb-3 d-flex flex-column justify-content-center h-100 gap-2">
      <h2 className="h4 fw-bold text-dark text-center mb-4">Pay & Withholding</h2>

      <div className="mb-2">
        <label htmlFor="filingStatus" className="form-label" title="Select your tax filing status">
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={form.filingStatus || 'single'}
          onChange={(e) => setForm({ ...form, filingStatus: e.target.value })}
          className="form-select"
        >
          <option value="single">Single or Married Filing Separately</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head">Head of Household</option>
        </select>
      </div>

      <div className="mb-2">
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

      <div className="mb-2">
        <label htmlFor="payFrequency" className="form-label">
          Pay Frequency
        </label>
        <select
          id="payFrequency"
          value={form.payFrequency || 'biweekly'}
          onChange={(e) => setForm({ ...form, payFrequency: e.target.value })}
          className="form-select"
        >
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="semimonthly">Semi-monthly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="multipleJobs"
          checked={form.multipleJobs || false}
          onChange={(e) => setForm({ ...form, multipleJobs: e.target.checked })}
        />
        <label htmlFor="multipleJobs" className="form-check-label">
          Multiple Jobs or Spouse Works?
        </label>
      </div>

      <div className="form-check mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="exempt"
          checked={form.exempt || false}
          onChange={(e) => setForm({ ...form, exempt: e.target.checked })}
        />
        <label htmlFor="exempt" className="form-check-label">
          Exempt from Withholding?
        </label>
      </div>
    </div>
  );
}
