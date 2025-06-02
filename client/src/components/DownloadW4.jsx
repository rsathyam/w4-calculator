import React, { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import fw4Template from '../assets/fw4.pdf'; // Ensure this path is valid

export default function DownloadW4({ formData }) {
  const iframeRef = useRef(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const fillPdf = async () => {
    setLoading(true);
    try {
      const existingPdfBytes = await fetch(fw4Template).then(res => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const form = pdfDoc.getForm();

      // Fill form fields
      form.getTextField('f1_01[0]').setText(formData.firstName || '');
      form.getTextField('f1_02[0]').setText(formData.lastName || '');
      form.getTextField('f1_03[0]').setText(formData.ssn || '');
      form.getTextField('f1_04[0]').setText(formData.address || '');
      form.getTextField('f1_05[0]').setText(formData.cityStateZip || '');

      const statusMap = {
        single: 'Single or Married filing separately',
        married: 'Married filing jointly',
        head: 'Head of household',
      };
      const statusValue = statusMap[formData.filingStatus] || 'Single or Married filing separately';
      form.getRadioGroup('c1_1').select(statusValue);

      if (formData.multipleJobs) {
        form.getCheckBox('c1_2[0]').check();
      }

      form.getTextField('f1_09[0]').setText(formData.qualifyingChildren || '');
      form.getTextField('f1_10[0]').setText(formData.otherDependents || '');
      form.getTextField('f1_11[0]').setText(formData.totalDependents || '');
      form.getTextField('f1_12[0]').setText(formData.otherIncome || '');
      form.getTextField('f1_13[0]').setText(formData.deductions || '');
      form.getTextField('f1_14[0]').setText(formData.extraWithholding || '');

      form.flatten();

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      setPdfUrl(url);
    } catch (error) {
      console.error('Error generating W-4 PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (pdfUrl) {
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'W4_Form.pdf';
      a.click();
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={fillPdf}
        className="bg-green-600 text-white px-4 py-2 rounded-md shadow hover:bg-green-700"
      >
        Preview Completed W-4 Form
      </button>

      {loading && <p className="text-blue-500">Generating PDF, please wait...</p>}

      {pdfUrl && !loading && (
        <div className="space-y-2">
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            title="W-4 PDF Preview"
            width="100%"
            height="800px"
            className="border border-gray-300 rounded-md"
          />

          <button
            onClick={downloadPdf}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700"
          >
            Download This PDF
          </button>
        </div>
      )}
    </div>
  );
}
