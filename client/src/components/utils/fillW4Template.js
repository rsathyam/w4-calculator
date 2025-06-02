import { PDFDocument } from 'pdf-lib';

export async function fillW4Template(formData) {
  const formUrl = '/fw4.pdf'; // path in public/
  const formPdfBytes = await fetch(formUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

  // Fill in basic fields — you can adjust based on field names in the PDF
  try {
    form.getTextField('f1_01(0)').setText(formData.fullName || '');
    form.getTextField('f1_02(0)').setText(formData.ssn || '');
    form.getTextField('f1_03(0)').setText(formData.address || '');
    form.getTextField('f1_04(0)').setText(formData.cityStateZip || '');

    const filingStatus = formData.filingStatus || 'single';
    if (filingStatus === 'single') form.getRadioGroup('c1_01').select('Single or Married filing separately');
    if (filingStatus === 'married') form.getRadioGroup('c1_01').select('Married filing jointly');
    if (filingStatus === 'head') form.getRadioGroup('c1_01').select('Head of Household');

    form.getTextField('f1_05(0)').setText(String(formData.dependents || ''));
    form.getTextField('f1_06(0)').setText(String(formData.otherIncome || ''));
    form.getTextField('f1_07(0)').setText(String(formData.deductions || ''));
    form.getTextField('f1_08(0)').setText(String(formData.extraWithholding || ''));

    form.flatten(); // optional — prevents editing fields later
  } catch (err) {
    console.error("Could not fill PDF fields:", err);
  }

  const pdfBytes = await pdfDoc.save();

  // Trigger browser download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'w4_filled.pdf';
  link.click();
  URL.revokeObjectURL(url);
}
