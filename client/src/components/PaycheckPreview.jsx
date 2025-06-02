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
        const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5001";
        const response = await fetch(`${backendUrl}/calculate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Failed to fetch preview");
        const result = await response.json();
        setPreview(result);
      } catch (error) {
        console.error("Error fetching preview:", error);
        setPreview({ error: "Could not calculate withholding. Please check your input." });
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [formData]);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm space-y-3 transition-all">
      <h2 className="text-xl font-semibold text-blue-800">Paycheck Preview</h2>

      {loading && <p className="text-gray-600">Calculating...</p>}

      {!loading && preview?.error && (
        <p className="text-red-600">{preview.error}</p>
      )}

      {!loading && preview && !preview.error && (
        <div className="space-y-2 text-gray-800">
          <p>
            <strong>Withholding per Paycheck:</strong>{' '}
            <span className="text-green-700">${preview.withholdingPerPaycheck}</span>
          </p>
          <p>
            <strong>Annual Withholding:</strong>{' '}
            <span className="text-green-700">${preview.annualWithholding}</span>
          </p>
          {preview.note && (
            <p className="text-sm italic text-blue-700 mt-1">{preview.note}</p>
          )}
        </div>
      )}

      {!loading && !preview && (
        <p className="text-gray-500">Enter gross pay to preview withholding.</p>
      )}
    </div>
  );
}
