import React, { useState } from 'react';

export default function CurrencyInput({
  label,
  name,
  value,
  onChange,
  min = 0,
  max = Number.MAX_SAFE_INTEGER,
  helperText = '',
}) {
  const [internal, setInternal] = useState(value || '');
  const [error, setError] = useState('');

  const formatCurrency = (val) => {
    const num = parseFloat(val);
    if (isNaN(num)) return '';
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const handleInput = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setInternal(raw);
    setError('');
    onChange(name, raw);
  };

  const handleBlur = () => {
    let num = parseFloat(internal);
    if (isNaN(num)) {
      setError('Please enter a valid number.');
      return;
    }

    if (num < min) {
      setError(`Minimum value is $${min}`);
      num = min;
    } else if (num > max) {
      setError(`Maximum value is $${max.toLocaleString()}`);
      num = max;
    } else {
      setError('');
    }

    setInternal(num);
    onChange(name, num);
  };

  return (
    <div className="mb-5">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        inputMode="decimal"
        value={internal !== '' ? formatCurrency(internal) : ''}
        onChange={handleInput}
        onBlur={handleBlur}
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
