import React, { useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import {
  FaBriefcase,
  FaUserFriends,
  FaListOl,
} from 'react-icons/fa';
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
    <div className="mb-3 d-flex flex-column h-100">
      <h2 className="h4 fw-bold text-dark text-center mb-4">Multiple Jobs Worksheet</h2>
      <div className="d-flex flex-column gap-3 flex-grow-1">
        <CurrencyInput
          label={
            <label htmlFor="grossPay" className="form-label">
              Income from Second Job
            </label>
          }
          name="secondJobIncome"
          value={form.secondJobIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          helperText="Enter your income from a second job, if you have one"
          icon={FaBriefcase}
          className="mb-0"
        />
        <CurrencyInput
          label={
            <label htmlFor="spouseIncome" className="form-label">
              Spouse's Income
            </label>
          }
          name="spouseIncome"
          value={form.spouseIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          helperText="Enter your spouse's income"
          icon={FaUserFriends}
          className="mb-0"
        />
        <div>
          <label
            htmlFor="jobCount"
            className="form-label d-flex align-items-center gap-1"
          >
            <FaListOl className="text-secondary" />
            Total Household Job Count
          </label>
          <input
            id="jobCount"
            type="number"
            name="jobCount"
            value={form.jobCount || ''}
            onChange={(e) => setForm({ ...form, jobCount: e.target.value })}
            className="form-control"
            placeholder="e.g. 2"
          />
        </div>
      </div>
      {form.step2b && (
        <div className="p-3 bg-light border rounded mt-auto">
          <p className="small text-primary">
            Estimated Extra Withholding per Paycheck{' '}
            <strong>${form.step2b.line4}</strong>
          </p>
        </div>
      )}
    </div>
  );
}
