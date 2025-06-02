import React from 'react';
import { generateW4Pdf } from "../utils/generateW4Pdf";

export default function DownloadW4({ formData }) {
  return (
    <button
      onClick={() => generateW4Pdf(formData)}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Download W-4 PDF
    </button>
  );
}
