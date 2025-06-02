import React from 'react';

export default function W4Form({ form, setForm }) {
  return (
    <form className="space-y-6">
      {/* Personal Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="ssn" className="block text-sm font-medium text-gray-700">
              Social Security Number
            </label>
            <input
              id="ssn"
              name="ssn"
              value={form.ssn}
              onChange={(e) => setForm({ ...form, ssn: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              id="address"
              name="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="cityStateZip" className="block text-sm font-medium text-gray-700">
              City, State, ZIP
            </label>
            <input
              id="cityStateZip"
              name="cityStateZip"
              value={form.cityStateZip}
              onChange={(e) => setForm({ ...form, cityStateZip: e.target.value })}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Filing Status */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Filing Status</h3>
        <div className="space-y-2">
          {['single', 'married', 'head'].map((status) => (
            <label key={status} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="filingStatus"
                value={status}
                checked={form.filingStatus === status}
                onChange={(e) => setForm({ ...form, filingStatus: e.target.value })}
              />
              {status === 'single'
                ? 'Single or Married filing separately'
                : status === 'married'
                ? 'Married filing jointly'
                : 'Head of Household'}
            </label>
          ))}
        </div>
      </div>

      {/* Tax & Withholding Info */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Tax and Withholding Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Gross Pay */}
          <div>
            <label htmlFor="grossPay" className="block text-sm font-medium text-gray-700">
              Gross Pay (per pay period)
            </label>
            <input
              id="grossPay"
              type="text"
              inputMode="decimal"
              name="grossPay"
              value={
                form.grossPay === ''
                  ? ''
                  : `$${Number(form.grossPay).toLocaleString(undefined, {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })}`
              }
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9.]/g, '');
                if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) {
                  setForm({ ...form, grossPay: raw });
                }
              }}
              placeholder="$0.00"
              className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Extra Withholding */}
          <div>
            <label htmlFor="extraWithholding" className="block text-sm font-medium text-gray-700">
              Extra Withholding (per paycheck)
            </label>
            <input
              id="extraWithholding"
              type="number"
              name="extraWithholding"
              value={form.extraWithholding}
              onChange={(e) => setForm({ ...form, extraWithholding: e.target.value })}
              placeholder="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Other Income */}
          <div>
            <label htmlFor="otherIncome" className="block text-sm font-medium text-gray-700">
              Other Income (not from jobs)
            </label>
            <input
              id="otherIncome"
              type="number"
              name="otherIncome"
              value={form.otherIncome}
              onChange={(e) => setForm({ ...form, otherIncome: e.target.value })}
              placeholder="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Pre-tax Deductions */}
          <div>
            <label htmlFor="pretaxDeductions" className="block text-sm font-medium text-gray-700">
              Pre-tax Deductions (e.g., 401(k), HSA)
            </label>
            <input
              id="pretaxDeductions"
              type="number"
              name="pretaxDeductions"
              value={form.pretaxDeductions}
              onChange={(e) => setForm({ ...form, pretaxDeductions: e.target.value })}
              placeholder="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Deductions */}
          <div>
            <label htmlFor="deductions" className="block text-sm font-medium text-gray-700">
              Additional Deductions
            </label>
            <input
              id="deductions"
              type="number"
              name="deductions"
              value={form.deductions}
              onChange={(e) => setForm({ ...form, deductions: e.target.value })}
              placeholder="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Dependents */}
          <div>
            <label htmlFor="dependents" className="block text-sm font-medium text-gray-700">
              Number of Dependents
            </label>
            <input
              id="dependents"
              type="number"
              name="dependents"
              value={form.dependents}
              onChange={(e) => setForm({ ...form, dependents: e.target.value })}
              placeholder="0"
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 shadow-sm"
            />
          </div>

          {/* Multiple Jobs */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="multipleJobs"
              checked={form.multipleJobs}
              onChange={(e) => setForm({ ...form, multipleJobs: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="multipleJobs" className="text-sm text-gray-700">
              Multiple jobs or spouse works?
            </label>
          </div>

          {/* Exempt */}
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="exempt"
              checked={form.exempt}
              onChange={(e) => setForm({ ...form, exempt: e.target.checked })}
              className="mr-2"
            />
            <label htmlFor="exempt" className="text-sm text-gray-700">
              Exempt from withholding
            </label>
          </div>
        </div>
      </div>
    </form>
  );
}
