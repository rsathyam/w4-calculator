
export function calculateTax(filingStatus, annualIncome, deductions) {
    // Standard deduction amounts for the 2025 tax year
    // Source: Form W-4 (2025)
    const stdDeductionMap = {
        single: 15000,
        married: 30000,
        head: 22500,
    };
    const stdDeduction = stdDeductionMap[filingStatus] || stdDeductionMap.single;
    const taxBrackets = {
    single: [
        [0, 0.10],
        [11925, 0.12],
        [48475, 0.22],
        [103350, 0.24],
        [197300, 0.32],
        [250525, 0.35],
        [626350, 0.37],
    ],
    married: [
        [0, 0.10],
        [23850, 0.12],
        [96950, 0.22],
        [206700, 0.24],
        [394600, 0.32],
        [501050, 0.35],
        [751600, 0.37],
    ],
    head: [
        [0, 0.10],
        [17000, 0.12],
        [64850, 0.22],
        [103350, 0.24],
        [197300, 0.32],
        [250525, 0.35],
        [626350, 0.37],
    ],
    };
    const brackets = taxBrackets[filingStatus] || taxBrackets.single;
    const taxable = Math.max(0, annualIncome - stdDeduction - deductions);
    const calcTax = (income, brackets) => {
        let tax = 0;
        for (let i = 0; i < brackets.length; i++) {
            const [limit, rate] = brackets[i];
            const nextLimit = brackets[i + 1]?.[0] ?? Infinity;
            if (income > nextLimit) {
              tax += (nextLimit - limit) * rate;
            } else {
              tax += (income - limit) * rate;
              break;
            }
        }
        return tax;
    };
    return calcTax(taxable, brackets);
  
}