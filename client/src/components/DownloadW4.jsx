import React from 'react';
import { PDFDocument } from 'pdf-lib';
import fw4Template from '../assets/fw4.pdf'; // adjust if path differs

export default function DownloadW4({ formData }) {
  const fillPdf = async () => {
    const formUrl = fw4Template;
    const existingPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // === Fill fields (these must match fw4.pdf field names) ===
    form.getTextField('topmostSubform[0].Page1[0].f1_1[0]').setText(formData.firstName + ' ' + formData.lastName || '');
    form.getTextField('topmostSubform[0].Page1[0].f1_2[0]').setText(formData.ssn || '');
    form.getTextField('topmostSubform[0].Page1[0].f1_3[0]').setText(formData.address || '');
    form.getTextField('topmostSubform[0].Page1[0].f1_4[0]').setText(formData.cityStateZip || '');

    // Filing status
    if (formData.filingStatus === 'single') {
      form.getRadioGroup('c1_1[0]').select('Single or Married filing separately');
    } else if (formData.filingStatus === 'married') {
      form.getRadioGroup('c1_1[0]').select('Married filing jointly');
    } else {
      form.getRadioGroup('c1_1[0]').select('Head of Household');
    }

    // Step 3: dependents
    form.getTextField('topmostSubform[0].Page1[0].f1_7[0]').setText(
      (parseInt(formData.dependents || 0) * 2000).toString()
    );

    // Step 4: other income, deductions, extra withholding
    form.getTextField('topmostSubform[0].Page1[0].f1_8[0]').setText(formData.otherIncome || '');
    form.getTextField('topmostSubform[0].Page1[0].f1_9[0]').setText(formData.deductions || '');
    form.getTextField('topmostSubform[0].Page1[0].f1_10[0]').setText(formData.extraWithholding || '');

    // Step 5: signature + date (optional)
    form.getTextField('topmostSubform[0].Page1[0].f1_11[0]').setText(formData.signature || '');
    form.getTextField('topmostSubform[0].Page1[0].f1_12[0]').setText(formData.date || '');

    form.flatten(); // lock fields

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'w4_filled.pdf';
    link.click();
  };

  return (
    <button
      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow"
      onClick={fillPdf}
    >
      Download Filled W-4 PDF
    </button>
  );
}
