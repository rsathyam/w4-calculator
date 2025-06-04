import React, { useEffect } from 'react';
import CurrencyInput from './CurrencyInput';

export default function StepDeductionsWorksheet({ form, setForm }) {
  const stdMap = { single: 14600, married: 29200, head: 21900 };
  const filing = form.filingStatus || 'single';
  const standardDeduction = stdMap[filing] || stdMap.single;

  const line1 = parseInt(form.itemizedDeductions || 0);
  const line4 = parseInt(form.adjustmentDeductions || 0);
  const line3 = Math.max(0, line1 - standardDeduction);
  const line5 = line3 + line4;

  useEffect(() => {
    if (form.deductions !== line5) {
      setForm((f) => ({ ...f, deductions: line5 }));
    }
  }, [line1, line4, filing]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Step 4b: Deductions Worksheet</h2>

      <CurrencyInput
        label={<label htmlFor="itemizedDeductions" className="block text-sm font-medium text-gray-700">Estimated itemized deductions</label>}
        name="itemizedDeductions"
        value={form.itemizedDeductions}
        onChange={(field, val) => setForm({ ...form, [field]: val })}
        min={0}
        max={1000000}
      />

      <p className="text-sm text-gray-700">Standard deduction: ${standardDeduction.toLocaleString()}</p>
      <p className="text-sm text-gray-700">Line 3 (itemized minus standard): ${line3.toLocaleString()}</p>

      <CurrencyInput
        label={<label htmlFor="adjustmentDeductions" className="block text-sm font-medium text-gray-700">Other adjustments to income</label>}
        name="adjustmentDeductions"
        value={form.adjustmentDeductions}
        onChange={(field, val) => setForm({ ...form, [field]: val })}
        min={0}
        max={1000000}
      />

      <div className="p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">Total deductions (line 5): ${line5.toLocaleString()}</p>
      </div>
    </div>
  );
}
