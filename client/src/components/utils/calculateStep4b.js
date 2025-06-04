export function calculateStep4b({
  filingStatus = 'single',
  itemizedDeductions = 0,
  adjustmentDeductions = 0,
}) {
  const stdMap = { single: 14600, married: 29200, head: 21900 };
  const line1 = parseFloat(itemizedDeductions) || 0;
  const line2 = stdMap[filingStatus] || stdMap.single;
  const line3 = Math.max(0, line1 - line2);
  const line4 = parseFloat(adjustmentDeductions) || 0;
  const line5 = line3 + line4;
  return { line1, line2, line3, line4, line5 };
}
