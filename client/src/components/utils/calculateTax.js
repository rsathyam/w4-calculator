export function calculateWithholding(formData) {
    const {
      grossPay = 0,
      payFrequency = "biweekly",
      filingStatus = "single",
      dependents = 0,
      deductions = 0,
      extraWithholding = 0,
      multipleJobs = false,
      otherIncome = 0,
      pretaxDeductions = 0,
      exempt = false,
    } = formData;

    const gross = Math.max(0, parseFloat(grossPay));
    const freqMap = { weekly: 52, biweekly: 26, semimonthly: 24, monthly: 12 };
    const periods = freqMap[payFrequency] || 26;
    const annualIncome = gross * periods + otherIncome - pretaxDeductions;

    const stdDeductionMap = {
      single: 14600,
      married: 29200,
      head: 21900,
    };
    const stdDeduction = stdDeductionMap[filingStatus.toLowerCase()] || 14600;

    const brackets = {
      single: [
        [0, 0.10],
        [11600, 0.12],
        [47150, 0.22],
        [100525, 0.24],
        [191950, 0.32],
        [243725, 0.35],
        [609350, 0.37],
      ],
      married: [
        [0, 0.10],
        [23200, 0.12],
        [94300, 0.22],
        [201050, 0.24],
        [383900, 0.32],
        [487450, 0.35],
        [731200, 0.37],
      ],
      head: [
        [0, 0.10],
        [16550, 0.12],
        [63100, 0.22],
        [100500, 0.24],
        [191950, 0.32],
        [243700, 0.35],
        [609350, 0.37],
      ],
    };

    const taxBrackets = brackets[filingStatus.toLowerCase()] || brackets.single;

    if (exempt) {
      return {
        withholdingPerPaycheck: 0.0,
        annualWithholding: 0.0,
        note: "You are marked as exempt from withholding.",
      };
    }

    const taxableIncome = Math.max(0, annualIncome - stdDeduction - deductions);

    function calcTax(income, bracketSet) {
      let tax = 0;
      for (let i = 0; i < bracketSet.length; i++) {
        const [threshold, rate] = bracketSet[i];
        const nextThreshold = bracketSet[i + 1]?.[0] ?? Infinity;
        if (income > threshold) {
          const amount = Math.min(income, nextThreshold) - threshold;
          tax += amount * rate;
        }
      }
      return tax;
    }

    let totalTax = calcTax(taxableIncome, taxBrackets);
    totalTax = Math.max(0, totalTax - dependents * 2000);
    if (multipleJobs) totalTax *= 1.05;

    const withholdingPerPaycheck = totalTax / periods + extraWithholding;

    return {
      withholdingPerPaycheck: Number(withholdingPerPaycheck.toFixed(2)),
      annualWithholding: Number(totalTax.toFixed(2)),
    };
  }
