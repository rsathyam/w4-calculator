import React from 'react';

export default function StepPersonalInfo({ form, setForm }) {
  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
      <p className="text-sm text-gray-600">
        This information is not stored anywhere and will solely be used to populate the W-4 form.
      </p>

      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First name and initial
        </label>
        <input
          id="firstName"
          type="text"
          value={form.firstName || ''}
          onChange={handleChange('firstName')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={form.lastName || ''}
          onChange={handleChange('lastName')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          id="address"
          type="text"
          value={form.address || ''}
          onChange={handleChange('address')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="cityStateZip" className="block text-sm font-medium text-gray-700">
          City, State, Zipcode
        </label>
        <input
          id="cityStateZip"
          type="text"
          value={form.cityStateZip || ''}
          onChange={handleChange('cityStateZip')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label htmlFor="ssn" className="block text-sm font-medium text-gray-700">
          Social Security Number
        </label>
        <input
          id="ssn"
          type="text"
          value={form.ssn || ''}
          onChange={handleChange('ssn')}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="filingStatus"
          className="block text-sm font-medium text-gray-700"
          title="Select your tax filing status"
        >
          Filing Status
        </label>
        <select
          id="filingStatus"
          value={form.filingStatus || 'single'}
          onChange={(e) => setForm({ ...form, filingStatus: e.target.value })}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 pr-8"
        >
          <option value="single">Single</option>
          <option value="married">Married Filing Jointly</option>
          <option value="head">Head of Household</option>
        </select>
      </div>
    </div>
  );
}
