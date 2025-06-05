import React, { useEffect, useState } from 'react';
import PaycheckPreview from './PaycheckPreview';
import { fillW4Template } from './utils/fillW4Template';

export default function StepReview({ form, onDownload }) {
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
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Review & Download</h2>

      <PaycheckPreview formData={form} />

      {pdfUrl && (
        <div className="bg-white rounded shadow-sm border border-gray-200 p-4">
          <iframe
            title="W-4 PDF Preview"
            src={`${pdfUrl}#navpanes=0`}
            className="w-full"
            style={{ height: '11in' }}
          />
        </div>
      )}

      <div className="pt-4">
        <button
          type="button"
          onClick={onDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Download Completed W-4 Form (PDF)
        </button>
      </div>
    </div>
  );
}
