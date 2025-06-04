export function calculateStep4b({
  filingStatus = 'single',
  itemizedDeductions = 0,
  adjustmentDeductions = 0,
}) {
  // Standard deduction amounts for the 2025 tax year
  // Source: Form W-4 (2025) deductions worksheet
  const stdMap = { single: 15000, married: 30000, head: 22500 };
  const line1 = parseFloat(itemizedDeductions) || 0;
  const line2 = stdMap[filingStatus] || stdMap.single;
  const line3 = Math.max(0, line1 - line2);
  const line4 = parseFloat(adjustmentDeductions) || 0;
  const line5 = line3 + line4;
  return { line1, line2, line3, line4, line5 };
}
