import React, { useEffect, useState } from 'react';

export default function PaycheckPreview({ formData }) {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!formData.grossPay || formData.exempt) {
      setPreview({
        withholdingPerPaycheck: 0,
        annualWithholding: 0,
        note: formData.exempt ? "You are marked as exempt from withholding." : undefined,
      });
      return;
    }

    const calculateWithholding = (data) => {
      try {
        const gross = Math.max(0, parseFloat(data.grossPay));
        const freq = data.payFrequency || 'biweekly';
        const filingStatus = (data.filingStatus || 'single').toLowerCase();
        const under17 = Math.max(0, parseInt(data.under17 || 0));
        const otherDependents = Math.max(0, parseInt(data.otherDependents || 0));
        const deductions = Math.max(0, parseFloat(data.deductions || 0));
        const extra = Math.max(0, parseFloat(data.extraWithholding || 0));
        const multipleJobs = !!data.multipleJobs;
        const otherIncome = Math.max(0, parseFloat(data.otherIncome || 0));
        const pretax = Math.max(0, parseFloat(data.pretaxDeductions || 0));

        const freqMap = {
          weekly: 52,
          biweekly: 26,
          semimonthly: 24,
          monthly: 12,
        };
        const periods = freqMap[freq] || 26;

        const annualIncome = gross * periods + otherIncome - pretax;

        const stdDeductionMap = {
          single: 14600,
          married: 29200,
          head: 21900,
        };
        const stdDeduction = stdDeductionMap[filingStatus] || 14600;

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

        let totalTax = calcTax(taxable, brackets);

        // Dependent credits
        const dependentCredit = (under17 * 2000) + (otherDependents * 500);
        totalTax = Math.max(0, totalTax - dependentCredit);

        if (multipleJobs) totalTax *= 1.05;

        const perCheck = totalTax / periods + extra;

        return {
          withholdingPerPaycheck: perCheck.toFixed(2),
          annualWithholding: totalTax.toFixed(2),
        };
      } catch (e) {
        console.error("Calculation error:", e);
        return { error: "Could not calculate withholding. Please check input." };
      }
    };

    setPreview(calculateWithholding(formData));
  }, [formData]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm space-y-3 transition-all">
      <h2 className="text-xl font-semibold text-blue-800">Paycheck Preview</h2>

      {preview?.error && <p className="text-red-600">{preview.error}</p>}

      {!preview?.error && (
        <>
          <p>
            <strong>Withholding per Paycheck:</strong>{' '}
            <span className="text-green-700">${preview?.withholdingPerPaycheck}</span>
          </p>
          <p>
            <strong>Annual Withholding:</strong>{' '}
            <span className="text-green-700">${preview?.annualWithholding}</span>
          </p>
          {preview?.note && (
            <p className="text-sm italic text-blue-700 mt-1">{preview.note}</p>
          )}
        </>
      )}
    </div>
  );
}
