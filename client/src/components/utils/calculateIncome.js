export function calculateIncome(freq, gross, otherIncome, pretax) {
  const annualGross = parseFloat(gross) || 0;
  const annualPretax = parseFloat(pretax) || 0;
  const annualOther = parseFloat(otherIncome) || 0;

  return annualGross - annualPretax + annualOther;
}