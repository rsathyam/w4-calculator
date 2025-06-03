import { PDFDocument } from 'pdf-lib';

export async function fillW4Template(formData) {
  const formPdfBytes = await fetch('/fw4.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_01[0]').setText(formData.firstName || '');
  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_02[0]').setText(formData.lastName || '');
  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_03[0]').setText(formData.ssn || '');
  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_04[0]').setText(formData.address || '');
  form.getTextField('topmostSubform[0].Page1[0].f1_05[0]').setText(formData.cityStateZip || '');

  const filingGroup = form.getCheckBox('topmostSubform[0].Page1[0].c1_1[0]');
  if (formData.filingStatus === 'single') {
    filingGroup.select('Single or Married filing separately');
  } else if (formData.filingStatus === 'married') {
    filingGroup.select('Married filing jointly');
  } else if (formData.filingStatus === 'head') {
    filingGroup.select('Head of Household');
  }

  form.getTextField('topmostSubform[0].Page1[0].f1_09[0]').setText(String(formData.dependents || ''));
  form.getTextField('topmostSubform[0].Page1[0].f1_10[0]').setText(String(formData.otherIncome || ''));
  form.getTextField('topmostSubform[0].Page1[0].f1_11[0]').setText(String(formData.deductions || ''));
  form.getTextField('topmostSubform[0].Page1[0].f1_12[0]').setText(String(formData.extraWithholding || ''));

  form.flatten();

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
  /*const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'w4_filled.pdf';
  link.click();
  URL.revokeObjectURL(url);*/
}
