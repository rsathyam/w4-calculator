export function calculateIncome(freq, gross, otherIncome, pretax) {
    console.log("FREQ is: " + freq);
    const freqMap = {
        weekly: 52,
        biweekly: 26,
        semimonthly: 24,
        monthly: 12,
    };
    console.log("GROSS IS: " + gross);
    console.log("OTHER INCOME IS: " + otherIncome);
    console.log("PRETAX IS: " + pretax);

    const periods = freqMap[freq] || 26;
    return gross * periods + otherIncome - pretax;
}