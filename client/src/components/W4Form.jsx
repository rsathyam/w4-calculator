import React, { useState } from 'react';

export default function W4Form({ formData, setFormData }) {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validateField = (name, value) => {
    let error = '';
    if (!value && ['firstName', 'lastName', 'grossPay', 'ssn'].includes(name)) {
      error = 'This field is required';
    }
    if (name === 'ssn' && value && !/^\d{3}-\d{2}-\d{4}$/.test(value)) {
      error = 'Format: XXX-XX-XXXX';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const inputStyle = (name) =>
    `input ${errors[name] ? 'border-red-500' : 'border-gray-300'}`;

  return (
    <form className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800">W-4 Input Form</h2>

      {/* Section: Personal Info */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle('firstName')}
            />
            {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
          </div>
          <div>
            <input
              name="lastName"
              placeholder="Last Name *"
              value={formData.lastName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle('lastName')}
            />
            {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
          </div>
          <div>
            <input
              name="ssn"
              placeholder="SSN (XXX-XX-XXXX) *"
              value={formData.ssn || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputStyle('ssn')}
            />
            {errors.ssn && <p className="text-sm text-red-600">{errors.ssn}</p>}
          </div>
          <input
            name="address"
            placeholder="Street Address"
            value={formData.address || ''}
            onChange={handleChange}
            className="input"
          />
          <input
            name="cityStateZip"
            placeholder="City, State ZIP"
            value={formData.cityStateZip || ''}
            onChange={handleChange}
            className="input"
          />
          <input
            name="signature"
            placeholder="Signature"
            value={formData.signature || ''}
            onChange={handleChange}
            className="input"
          />
          <input
            type="date"
            name="date"
            value={formData.date || ''}
            onChange={handleChange}
            className="input"
          />
        </div>
      </div>

      {/* Section: Financial Info */}
      <div>
        <h3 className="font-medium text-gray-700 mb-2">Tax & Withholding Info</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="grossPay"
              inputMode="decimal"
              value={
                formData.grossPay === '' ? '' : `$${Number(formData.grossPay).toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}`
              }
              onChange={(e) => {
                // Remove $ and commas, allow only digits and decimal
                const raw = e.target.value.replace(/[^0-9.]/g, '');
                if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
                  setFormData({ ...formData, grossPay: raw });
                }
              }}
              placeholder="$0.00"
              className="border border-gray-300 px-3 py-2 rounded w-full"
            />
            {errors.grossPay && <p className="text-sm text-red-600">{errors.grossPay}</p>}
          </div>

          <select
            name="payFrequency"
            value={formData.payFrequency || 'biweekly'}
            onChange={handleChange}
            className="input"
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="semimonthly">Semi-Monthly</option>
            <option value="monthly">Monthly</option>
          </select>

          <select
            name="filingStatus"
            value={formData.filingStatus || 'single'}
            onChange={handleChange}
            className="input"
          >
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="head">Head of Household</option>
          </select>

          <input
            type="number"
            name="dependents"
            placeholder="Dependents"
            value={formData.dependents || ''}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="otherIncome"
            placeholder="Other Income"
            value={formData.otherIncome || ''}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="deductions"
            placeholder="Deductions"
            value={formData.deductions || ''}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="extraWithholding"
            placeholder="Extra Withholding"
            value={formData.extraWithholding || ''}
            onChange={handleChange}
            className="input"
          />

          <input
            type="number"
            name="pretaxDeductions"
            placeholder="Pretax Deductions"
            value={formData.pretaxDeductions || ''}
            onChange={handleChange}
            className="input"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="multipleJobs"
              checked={formData.multipleJobs || false}
              onChange={handleChange}
            />
            <span>Multiple jobs or spouse works?</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="checkbox"
              name="exempt"
              checked={formData.exempt || false}
              onChange={handleChange}
            />
            <span>Exempt from withholding?</span>
          </label>
        </div>
      </div>
    </form>
  );
}
