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
  className = 'mb-3',
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
    <div className={className}>
      <label className="form-label d-flex align-items-center gap-1">
        {Icon && <Icon className="text-secondary" />}
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
        title={helperText}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {helperText && !error && (
        <div className="form-text">{helperText}</div>
      )}
      {error && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  );
}
