import React from 'react';
import CurrencyInput from './CurrencyInput';
import { FaPiggyBank, FaWallet, FaDollarSign } from 'react-icons/fa';

export default function StepAdjustments({ form, setForm }) {
  const handleNumberChange = (e, key) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="mb-3">
      <h2 className="h5 fw-semibold text-dark">Adjustments</h2>
      <div>
        <label
          htmlFor="under17"
          className="form-label"
          title="Number of dependents under age 17"
        >
          Dependents Under 17
        </label>
        <input
          id="under17"
          type="number"
          min="0"
          value={form.under17 || ''}
          onChange={(e) => handleNumberChange(e, 'under17')}
          className="form-control"
          placeholder="0"
        />
      </div>
      <div>
        <label
          htmlFor="otherDependents"
          className="form-label"
          title="Dependents age 17 or older"
        >
          Other Dependents
        </label>
        <input
          id="otherDependents"
          type="number"
          min="0"
          value={form.otherDependents || ''}
          onChange={(e) => handleNumberChange(e, 'otherDependents')}
          className="form-control"
          placeholder="0"
        />
      </div>


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
    </div>
  );
}
