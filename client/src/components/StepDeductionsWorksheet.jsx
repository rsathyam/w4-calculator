import React, { useEffect } from 'react';
import CurrencyInput from './CurrencyInput';
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
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Deductions</h2>

      <CurrencyInput
        label={
          <span title="Estimated total of your itemized deductions">
            Estimated itemized deductions
          </span>
        }
        name="itemizedDeductions"
        value={form.itemizedDeductions}
        onChange={(field, val) => setForm({ ...form, [field]: val })}
        min={0}
        max={1000000}
        helperText="Amount of itemized deductions beyond the standard deduction"
      />
      <CurrencyInput
        label={
          <span title="Adjustments that reduce your taxable income">
            Other adjustments to income
          </span>
        }
        name="adjustmentDeductions"
        value={form.adjustmentDeductions}
        onChange={(field, val) => setForm({ ...form, [field]: val })}
        min={0}
        max={1000000}
        helperText="Other adjustments that reduce income"
      />

        <div className="p-3 bg-blue-50 border border-blue-200 rounded">
          <p className="text-sm text-blue-800">Total deductions (beyond standard deduction): ${line5.toLocaleString()}</p>
        </div>
    </div>
  );
}
