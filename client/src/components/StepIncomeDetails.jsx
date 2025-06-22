import React from 'react';
import CurrencyInput from './CurrencyInput';
import { FaMoneyBillWave, FaUser, FaCalendarAlt } from 'react-icons/fa';

export default function StepIncomeDetails({ form, setForm }) {
  const handleMoneyChange = (e, key) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
      setForm({ ...form, [key]: raw });
    }
  };

  return (
    <div className="mb-3 d-flex flex-column justify-content-center h-100 gap-2">
      <h2 className="h2 fw-bold text-dark text-center mb-4">Pay & Withholding</h2>

      <div className="mb-2">
        <label
          htmlFor="filingStatus"
          className="form-label fw-bold d-flex align-items-center gap-1"
          title="Select your tax filing status"
        >
          <FaUser className="text-secondary" />
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
        <div className="form-text">Choose the filing status that applies to you.</div>
      </div>

      <CurrencyInput
          label={<span className="fw-bold" title="Your yearly income before taxes">Annual Gross Pay</span>}
          name="grossPay"
          value={form.grossPay}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          helperText="Enter your total gross pay for the year, before taxes and deductions."
          icon={FaMoneyBillWave}
          className="mb-0"
        />

      <div className="mb-4">
        <label
          htmlFor="payFrequency"
          className="form-label fw-bold d-flex align-items-center gap-1"
        >
          <FaCalendarAlt className="text-secondary" />
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
        <div className="form-text">How often you receive a paycheck.</div>
      </div>

      <div className="form-check">
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

      <div className="form-check">
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
