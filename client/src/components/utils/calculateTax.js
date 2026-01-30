
export function calculateTax(filingStatus, annualIncome, deductions) {
    // Standard deduction amounts for the 2026 tax year
    // Source: IRS inflation adjustments for 2026
    const stdDeductionMap = {
        single: 16100,
        married: 32200,
        head: 24150,
    };
    const stdDeduction = stdDeductionMap[filingStatus] || stdDeductionMap.single;
    const taxBrackets = {
        single: [
            [0, 0.10],
            [12400, 0.12],
            [50400, 0.22],
            [105700, 0.24],
            [201775, 0.32],
            [256225, 0.35],
            [640600, 0.37],
        ],
        married: [
            [0, 0.10],
            [24800, 0.12],
            [100800, 0.22],
            [211400, 0.24],
            [403550, 0.32],
            [512450, 0.35],
            [768700, 0.37],
        ],
        head: [
            [0, 0.10],
            [17700, 0.12],
            [67450, 0.22],
            [105700, 0.24],
            [201750, 0.32],
            [256200, 0.35],
            [640600, 0.37],
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