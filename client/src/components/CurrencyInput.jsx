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
  const [rawInput, setRawInput] = useState('');

  useEffect(() => {
    if (value !== undefined && value !== null && !isNaN(value)) {
      setRawInput(formatCurrency(value));
    }
  }, [value]);

  const formatCurrency = (num) => {
    const parsed = parseInt(num);
    if (isNaN(parsed)) return '';
    return `$${parsed.toLocaleString()}`;
  };

  const parseCurrency = (str) => {
    const cleaned = str.replace(/[^0-9]/g, '');
    return parseInt(cleaned);
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setRawInput(input);
    const numeric = parseCurrency(input);

    if (isNaN(numeric)) {
      onChange(name, 0);
      return;
    }

    if (numeric < min || numeric > max) {
      setError(`Enter a value between $${min.toLocaleString()} and $${max.toLocaleString()}`);
    } else {
      setError('');
      onChange(name, numeric);
    }
  };

  const handleBlur = () => {
    const numeric = parseCurrency(rawInput);
    if (!isNaN(numeric)) {
      setRawInput(formatCurrency(numeric));
    }
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
        inputMode="numeric"
        value={rawInput}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="$0"
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
