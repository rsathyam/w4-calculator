
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