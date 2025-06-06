import React, { useEffect, useState } from 'react';
import PaycheckPreview from './PaycheckPreview';
import { fillW4Template } from './utils/fillW4Template';

export default function StepReview({ form }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    let url;
    const generate = async () => {
      try {
        if (
          typeof window === 'undefined' ||
          !window.URL ||
          typeof window.URL.createObjectURL !== 'function'
        ) {
          setPdfUrl(null);
          return;
        }
        const pdfBytes = await fillW4Template(form);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        url = window.URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error('Failed to generate PDF preview:', err);
      }
    };
    generate();
    return () => {
      if (url && window.URL && typeof window.URL.revokeObjectURL === 'function') {
        window.URL.revokeObjectURL(url);
      }
    };
  }, [form]);
  return (
    <div className="mb-3">
      <h2 className="h4 fw-bold text-dark text-center mb-4">Review & Download</h2>

      <PaycheckPreview formData={form} />

      {pdfUrl && (
        <div className="bg-white rounded shadow border p-3">
          <iframe
            title="W-4 PDF Preview"
            src={`${pdfUrl}#navpanes=0`}
            className="w-100 pdf-preview-frame"
          />
        </div>
      )}

    </div>
  );
}
