import React from 'react';
import { fillW4Template } from '../utils/fillW4Template';

export default function DownloadW4({ formData }) {
  return (
    <button
      onClick={() => fillW4Template(formData)}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
    >
      Download Real IRS W-4
    </button>
  );
}
