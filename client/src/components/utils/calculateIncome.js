export function calculateIncome(gross, otherIncome, pretax) {
    const freqMap = {
        weekly: 52,
        biweekly: 26,
        semimonthly: 24,
        monthly: 12,
    };
    const periods = freqMap[freq] || 26;
    return gross * periods + otherIncome - pretax;
}