import React from 'react';

export default function StepIncomeDetails({ form, setForm }) {
  const handleMoneyChange = (e, key) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
      setForm({ ...form, [key]: raw });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Step 3: Pay & Withholding</h2>

      <div>
        <label htmlFor="grossPay" className="block text-sm font-medium text-gray-700">
          Gross Pay
        </label>
        <input
          type="text"
          name="grossPay"
          inputMode="decimal"
          value={
            form.grossPay === ''
              ? ''
              : `$${Number(form.grossPay).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}`
          }
          onChange={(e) => handleMoneyChange(e, 'grossPay')}
          placeholder="$0.00"
          className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="multipleJobs"
          checked={form.multipleJobs || false}
          onChange={(e) => setForm({ ...form, multipleJobs: e.target.checked })}
        />
        <label htmlFor="multipleJobs" className="text-sm text-gray-700">
          Multiple jobs or spouse works?
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
          Exempt from withholding?
        </label>
      </div>
    </div>
  );
}
