import React, { useState, useEffect } from 'react';

export default function CurrencyInput({
  label,
  name,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  helperText = '',
  icon: Icon
}) {
  const [displayValue, setDisplayValue] = useState('');
  const [error, setError] = useState('');

  // Sync displayed value with incoming prop
  useEffect(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      setDisplayValue(formatCurrency(value));
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const formatCurrency = (num) => {
    const parsed = parseFloat(num);
    if (isNaN(parsed)) return '';
    return `$${parsed.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const parseCurrency = (str) => {
    return parseFloat(str.replace(/[^0-9.]/g, '')) || 0;
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setDisplayValue(raw);
  };

  const handleBlur = () => {
    const numericValue = parseCurrency(displayValue);
    if (isNaN(numericValue)) {
      setError('Please enter a valid number.');
      return;
    }
    if (numericValue < min) {
      setError(`Minimum is $${min}`);
    } else if (numericValue > max) {
      setError(`Maximum is $${max.toLocaleString()}`);
    } else {
      setError('');
    }
    setDisplayValue(formatCurrency(numericValue));
    onChange(name, numericValue);
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
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="$0.00"
        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
      />
      {helperText && !error && <p className="text-xs text-gray-500 mt-1">{helperText}</p>}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
