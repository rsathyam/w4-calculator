import React, { useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import { FaFileInvoiceDollar, FaChild, FaUserFriends } from 'react-icons/fa';
import { calculateStep4b } from './utils/calculateStep4b';

export default function StepDeductionsWorksheet({ form, setForm }) {
  const filing = form.filingStatus || 'single';

  const { line1, line2, line3, line4, line5 } = calculateStep4b({
    filingStatus: filing,
    itemizedDeductions: form.itemizedDeductions,
    adjustmentDeductions: form.adjustmentDeductions,
  });

  useEffect(() => {
    const step4b = { line1, line2, line3, line4, line5 };
    if (
      JSON.stringify(form.step4b) !== JSON.stringify(step4b) ||
      form.deductions !== line5
    ) {
      setForm((f) => ({ ...f, step4b, deductions: line5 }));
    }
  }, [line1, line2, line3, line4, line5]);

  return (
    <div className="mb-3 d-flex flex-column h-100">
      <h2 className="h4 fw-bold text-dark text-center mb-4">Deductions</h2>
      <div className="d-flex flex-column gap-3 flex-grow-1">
        <CurrencyInput
          className="mb-0"
          label={<label htmlFor="itemizedDeductions" className="form-label">Estimated Itemized Deductions</label>}
          name="itemizedDeductions"
          value={form.itemizedDeductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={1000000}
          helperText="Amount of itemized deductions beyond the standard deduction"
          icon={FaFileInvoiceDollar}
        />
        <div>
          <label
            htmlFor="under17"
            className="form-label d-flex align-items-center gap-1"
            title="Number of dependents under age 17"
          >
            <FaChild className="text-secondary" />
            Dependents Under 17
          </label>
          <input
            id="under17"
            type="number"
            min="0"
            value={form.under17 || ''}
            onChange={(e) =>
              setForm({ ...form, under17: e.target.value.replace(/[^0-9.]/g, '') })
            }
            className="form-control"
            placeholder="0"
          />
          <div className="form-text">Number of qualifying children under 17.</div>
        </div>
        <div>
          <label
            htmlFor="otherDependents"
            className="form-label d-flex align-items-center gap-1"
            title="Dependents age 17 or older"
          >
            <FaUserFriends className="text-secondary" />
            Other Dependents
          </label>
          <input
            id="otherDependents"
            type="number"
            min="0"
            value={form.otherDependents || ''}
            onChange={(e) =>
              setForm({
                ...form,
                otherDependents: e.target.value.replace(/[^0-9.]/g, ''),
              })
            }
            className="form-control"
            placeholder="0"
          />
          <div className="form-text">Number of dependents age 17 or older.</div>
        </div>
      </div>
      <div className="px-3 py-2 bg-light border rounded mt-5">
        <p className="small text-primary">Total Deductions (Beyond Standard Deduction): ${line5.toLocaleString()}</p>
      </div>
    </div>
  );
}
