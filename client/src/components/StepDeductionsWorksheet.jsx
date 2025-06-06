import React, { useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
import { FaFileInvoiceDollar, FaSlidersH } from 'react-icons/fa';
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
        <CurrencyInput
          className="mb-0"
          label={<label htmlFor="adjustmentDeductions" className="form-label">Other Adjustments to Income</label>}
          name="adjustmentDeductions"
          value={form.adjustmentDeductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={1000000}
          helperText="Other adjustments that reduce income"
          icon={FaSlidersH}
        />
      </div>
      <div className="p-3 bg-light border rounded mt-auto">
        <p className="small text-primary">Total Deductions (Beyond Standard Deduction): ${line5.toLocaleString()}</p>
      </div>
    </div>
  );
}
