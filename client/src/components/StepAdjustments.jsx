import React from 'react';
import CurrencyInput from './CurrencyInput';
import { FaPiggyBank, FaWallet, FaDollarSign, FaSlidersH } from 'react-icons/fa';

export default function StepAdjustments({ form, setForm }) {

  return (
    <div className="mb-3">
      <h2 className="h4 fw-bold text-dark text-center mb-4">Adjustments</h2>



      <div>
        <CurrencyInput
          label={
            <label
              htmlFor="otherIncome"
              className="form-label"
              title="Other income you expect to receive this year"
            >
              Other Income (Annual)
            </label>
          }
          name="otherIncome"
          value={form.otherIncome}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={1000000}
          helperText="Include any other income you expect to receive this year."
          icon={FaPiggyBank}
        />
      </div>

      <div>

        <CurrencyInput
          label={
            <label
              htmlFor="pretaxDeductions"
              className="form-label"
              title="Annual 401(k), HSA, or other pre-tax amounts"
            >
              Pre-tax Contributions (Annual, e.g. 401(k), HSA)
            </label>
          }
          name="pretaxDeductions"
          value={form.pretaxDeductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={100000}
          helperText="Enter the total annual amount of 401(k), HSA, or other pre-tax contributions."
          icon={FaWallet}
        />
      </div>

      <div>
        <CurrencyInput
          label={
            <label
              htmlFor="extraWithholding"
              className="form-label"
              title="Any additional amount to withhold each paycheck"
            >
              Extra Withholding per Paycheck
            </label>
          }
          name="extraWithholding"
          value={form.extraWithholding}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={10000}
          helperText="Any extra amount you'd like withheld from each paycheck."
          icon={FaDollarSign}
        />
      </div>
      <div>
        <CurrencyInput
          label={
            <label htmlFor="adjustmentDeductions" className="form-label">
              Other Adjustments to Income
            </label>
          }
          name="adjustmentDeductions"
          value={form.adjustmentDeductions}
          onChange={(field, val) => setForm({ ...form, [field]: val })}
          min={0}
          max={1000000}
          helperText="Other adjustments that reduce income"
          icon={FaSlidersH}
        />
      </div>
    </div>
  );
}
