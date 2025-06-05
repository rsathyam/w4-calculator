import React from 'react';

export default function StepPersonalInfo({ form, setForm }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>

      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium text-gray-700"
          title="Enter your first name"
        >
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={form.firstName || ''}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          placeholder="John"
        />
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium text-gray-700"
          title="Enter your last name"
        >
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={form.lastName || ''}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          placeholder="Doe"
        />
      </div>

      <div>
        <label
          htmlFor="ssn"
          className="block text-sm font-medium text-gray-700"
          title="Enter the last four digits of your SSN"
        >
          SSN (Last 4 digits)
        </label>
        <input
          id="ssn"
          type="text"
          maxLength="4"
          value={form.ssn || ''}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            if (value.length <= 4) setForm({ ...form, ssn: value });
          }}
          className="mt-1 block w-full rounded border border-gray-300 px-3 py-2"
          placeholder="1234"
        />
      </div>
    </div>
  );
}
