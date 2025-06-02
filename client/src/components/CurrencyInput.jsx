import React, { useEffect, useState } from 'react';

export default function CurrencyInput({
  label,
  name,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  helperText = '',
  icon: Icon,
}) {
  const [error, setError] = useState('');

  // Format number with $ and commas
  const formatCurrency = (num) => {
    const parsed = parseFloat(num);
    if (isNaN(parsed)) return '';
    return `$${parsed.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Remove $ and commas and return raw float
  const parseCurrency = (str) => {
    const cleaned = str.replace(/[^0-9.]/g, '');
    return parseFloat(cleaned);
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const numeric = parseCurrency(raw);

    if (isNaN(numeric)) {
      onChange(name, 0);
      return;
    }

    if (numeric < min || numeric > max) {
      setError(`Enter a value between $${min} and $${max.toLocaleString()}`);
    } else {
      setError('');
    }

    onChange(name, numeric);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
        {Icon && <Icon className="text-gray-500" />}
        {label}
      </label>
      <input
        type="text"
        name={name}
        inputMode="decimal"
        value={value !== null && value !== undefined ? formatCurrency(value) : ''}
        onChange={handleChange}
        placeholder="$0.00"
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {helperText && !error && (
        <p className="text-xs text-gray-500 mt-1">{helperText}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 mt-1 font-medium">{error}</p>
      )}
    </div>
  );
}
