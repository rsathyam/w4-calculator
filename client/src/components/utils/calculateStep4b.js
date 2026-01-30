export function calculateStep4b({
  filingStatus = 'single',
  itemizedDeductions = 0,
  adjustmentDeductions = 0,
}) {
  // Standard deduction amounts for the 2026 tax year
  // Source: IRS inflation adjustments for 2026
  const stdMap = { single: 16100, married: 32200, head: 24150 };
  const line1 = parseFloat(itemizedDeductions) || 0;
  const line2 = stdMap[filingStatus] || stdMap.single;
  const line3 = Math.max(0, line1 - line2);
  const line4 = parseFloat(adjustmentDeductions) || 0;
  const line5 = line3 + line4;
  return { line1, line2, line3, line4, line5 };
}
