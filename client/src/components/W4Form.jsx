import React from 'react';

export default function W4Form({ formData, setFormData }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form className="space-y-4 bg-white p-6 rounded shadow-md border border-gray-200">
      <h2 className="text-xl font-bold">W-4 Input Form</h2>

      {/* Personal Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" name="firstName" placeholder="First Name" value={formData.firstName || ''} onChange={handleChange} className="input" />
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName || ''} onChange={handleChange} className="input" />
        <input type="text" name="ssn" placeholder="Social Security Number" value={formData.ssn || ''} onChange={handleChange} className="input" />
        <input type="text" name="address" placeholder="Street Address" value={formData.address || ''} onChange={handleChange} className="input" />
        <input type="text" name="cityStateZip" placeholder="City, State, ZIP" value={formData.cityStateZip || ''} onChange={handleChange} className="input" />
        <input type="text" name="signature" placeholder="Signature (optional)" value={formData.signature || ''} onChange={handleChange} className="input" />
        <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className="input" />
      </div>

      {/* Tax-related fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input type="number" name="grossPay" placeholder="Gross Pay" value={formData.grossPay || ''} onChange={handleChange} className="input" />
        <select name="payFrequency" value={formData.payFrequency || 'biweekly'} onChange={handleChange} className="input">
          <option value="weekly">Weekly</option>
          <option value="biweekly">Biweekly</option>
          <option value="semimonthly">Semi-Monthly</option>
          <option value="monthly">Monthly</option>
        </select>
        <select name="filingStatus" value={formData.filingStatus || 'single'} onChange={handleChange} className="input">
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="head">Head of Household</option>
        </select>
        <input type="number" name="dependents" placeholder="Dependents" value={formData.dependents || ''} onChange={handleChange} className="input" />
        <input type="number" name="otherIncome" placeholder="Other Income" value={formData.otherIncome || ''} onChange={handleChange} className="input" />
        <input type="number" name="deductions" placeholder="Deductions" value={formData.deductions || ''} onChange={handleChange} className="input" />
        <input type="number" name="extraWithholding" placeholder="Extra Withholding" value={formData.extraWithholding || ''} onChange={handleChange} className="input" />
        <input type="number" name="pretaxDeductions" placeholder="Pretax Deductions" value={formData.pretaxDeductions || ''} onChange={handleChange} className="input" />
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input type="checkbox" name="multipleJobs" checked={formData.multipleJobs || false} onChange={handleChange} />
        <span>Multiple jobs or spouse works?</span>
      </label>

      <label className="flex items-center gap-2">
        <input type="checkbox" name="exempt" checked={formData.exempt || false} onChange={handleChange} />
        <span>Exempt from withholding?</span>
      </label>
    </form>
  );
}
