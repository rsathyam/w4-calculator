import React from 'react';
import PaycheckPreview from './PaycheckPreview';

export default function StepReview({ form, onDownload }) {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Step 5: Review & Download</h2>

      <div className="bg-white rounded shadow-sm border border-gray-200 p-4 space-y-2">
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm text-gray-700">
            <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
            <span className="text-right">{String(value) || '—'}</span>
          </div>
        ))}
      </div>

      <PaycheckPreview formData={form} />

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
