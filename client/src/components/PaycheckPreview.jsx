import React, { useEffect, useState } from 'react';
import { calculateTax } from './utils/calculateTax';
import { calculateIncome } from './utils/calculateIncome';

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

        const annualIncome = calculateIncome(freq, gross, otherIncome, pretax);
        const secondIncome = data.secondJobIncome || 0;
        const spouseIncome = data.spouseIncome || 0;
        const adjustedIncome = annualIncome + secondIncome + spouseIncome;

        let totalTax = calculateTax(filingStatus, adjustedIncome, deductions);
        const dependentIncomeLimit = (filingStatus === "married") ? 400000 : 200000;

        if (adjustedIncome <= dependentIncomeLimit) {
          totalTax = Math.max(
            0,
            totalTax - (under17 * 2000 + otherDependents * 500)
          );
        }

        const freqMap = {
          weekly: 52,
          biweekly: 26,
          semimonthly: 24,
          monthly: 12,
        };
        const periods = freqMap[freq] || 26;
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
