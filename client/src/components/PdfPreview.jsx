import React, { useEffect, useState } from 'react';
import { fillW4Template } from './utils/fillW4Template';

export default function PdfPreview({ form }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const generate = async () => {
      try {
        const pdfBytes = await fillW4Template(form);
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const newUrl = URL.createObjectURL(blob);
        if (isMounted) {
          setUrl((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return newUrl;
          });
        }
      } catch (err) {
        console.error('Failed to generate preview', err);
      }
    };
    generate();
    return () => {
      isMounted = false;
      setUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return null;
      });
    };
  }, [form]);

  if (!url) return <div className="text-gray-500">Generating preview...</div>;

  return (
    <iframe
      title="W-4 Preview"
      src={url}
      className="w-full h-full min-h-[70vh] border rounded"
    />
  );
}
