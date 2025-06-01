import React, { useEffect, useState } from 'react';

export default function PaycheckPreview({ formData }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!formData.grossPay || formData.grossPay <= 0) {
      setPreview(null);
      return;
    }

    const fetchPreview = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5001/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        setPreview(result);
      } catch (error) {
        console.error("Error fetching preview:", error);
        setPreview(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [formData]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm space-y-2">
      <h2 className="text-lg font-semibold text-blue-800">Paycheck Preview</h2>
      {loading ? (
        <p className="text-gray-500">Calculating...</p>
      ) : preview ? (
        <>
          <p><strong>Withholding per Paycheck:</strong> ${preview.withholdingPerPaycheck}</p>
          <p><strong>Annual Withholding:</strong> ${preview.annualWithholding}</p>
        </>
      ) : (
        <p className="text-gray-500">Enter gross pay to preview tax withholding.</p>
      )}
    </div>
  );
}
