import { calculateIncome } from './calculateIncome';
import { calculateTax } from './calculateTax';

export function calculateStep2b({
  filingStatus = 'single',
  payFrequency = 'biweekly',
  grossPay = 0,
  otherIncome = 0,
  pretaxDeductions = 0,
  secondJobIncome = 0,
  spouseIncome = 0,
  jobCount = 2,
}) {
  const freqMap = {
    weekly: 52,
    biweekly: 26,
    semimonthly: 24,
    monthly: 12,
  };
  const periods = freqMap[payFrequency] || 26;

  const job1Annual = calculateIncome(
    payFrequency,
    parseFloat(grossPay) || 0,
    parseFloat(otherIncome) || 0,
    parseFloat(pretaxDeductions) || 0,
  );
  const job2Annual = parseFloat(secondJobIncome) || 0;
  const job3Annual = parseFloat(spouseIncome) || 0;
  const combinedAnnual = job1Annual + job2Annual + job3Annual;

  const job1Tax = calculateTax(filingStatus.toLowerCase(), job1Annual, 0);
  const job1Job2Tax = calculateTax(
    filingStatus.toLowerCase(),
    job1Annual + job2Annual,
    0,
  );
  const totalTax = calculateTax(
    filingStatus.toLowerCase(),
    combinedAnnual,
    0,
  );

  let line1 = 0;
  let line2a = 0;
  let line2b = 0;
  if (jobCount <= 2) {
    line1 = Math.max(0, totalTax - job1Tax);
  } else {
    line2a = Math.max(0, job1Job2Tax - job1Tax);
    line2b = Math.max(0, totalTax - job1Job2Tax);
  }
  const line2c = line2a + line2b;
  const line3 = periods;
  const line4 = Number(((line1 || line2c) / periods).toFixed(2));

  return { line1, line2a, line2b, line2c, line3, line4 };
}

