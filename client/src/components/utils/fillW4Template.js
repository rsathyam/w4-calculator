import { PDFDocument } from 'pdf-lib';

export async function fillW4Template(formData) {
  const formPdfBytes = await fetch('/fw4.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

//  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_01[0]').setText(formData.firstName || '');
//  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_02[0]').setText(formData.lastName || '');
//  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_03[0]').setText(formData.ssn || '');
//  form.getTextField('topmostSubform[0].Page1[0].Step1a[0].f1_04[0]').setText(formData.address || '');
//  form.getTextField('topmostSubform[0].Page1[0].f1_05[0]').setText(formData.cityStateZip || '');

  if (formData.filingStatus === 'married') {
    form.getCheckBox('topmostSubform[0].Page1[0].c1_1[1]').check();
  } else if (formData.filingStatus === 'head') {
    form.getCheckBox('topmostSubform[0].Page1[0].c1_1[2]').check();
  } else {
    //Assume single and tick the single checkbox
    form.getCheckBox('topmostSubform[0].Page1[0].c1_1[0]').check();
  }

  if (formData.multipleJobs === true) {
    form.getCheckBox('topmostSubform[0].Page1[0].c1_2[0]').check();
  }

  const under17 = formData.under17 || 0;
  form.getTextField('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]').setText(formData.under17 * 2000)

  if (formData.under17 === true) {

  }


//  form.getTextField('topmostSubform[0].Page1[0].f1_09[0]').setText(String(formData.dependents || ''));
//  form.getTextField('topmostSubform[0].Page1[0].f1_10[0]').setText(String(formData.otherIncome || ''));
//  form.getTextField('topmostSubform[0].Page1[0].f1_11[0]').setText(String(formData.deductions || ''));
//  form.getTextField('topmostSubform[0].Page1[0].f1_12[0]').setText(String(formData.extraWithholding || ''));

  form.flatten();

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
