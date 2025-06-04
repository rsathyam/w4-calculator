import { PDFDocument } from 'pdf-lib';
import { calculateIncome } from './calculateIncome';

export async function fillW4Template(formData) {
  const formPdfBytes = await fetch('/fw4.pdf').then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();

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
  const income = calculateIncome(
      formData.payFrequency || 'biweekly',
      Math.max(0, parseFloat(formData.grossPay)), 
      Math.max(0, parseFloat(formData.otherIncome || 0)),
      Math.max(0, parseFloat(formData.pretaxDeductions || 0))
  );
  const filingStatus = (formData.filingStatus || 'single').toLowerCase();
  const dependentIncomeLimit = (filingStatus === "married") ? 400000 : 200000;
  const under17Amount = formData.under17 * 2000;
  const otherDependentsAmount = formData.otherDependents * 500;
  const totalDependentsAmount = under17Amount + otherDependentsAmount;
  if (income <= dependentIncomeLimit) {
    form.getTextField('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_06[0]').setText(under17Amount.toString());
    form.getTextField('topmostSubform[0].Page1[0].Step3_ReadOrder[0].f1_07[0]').setText(otherDependentsAmount.toString());
    form.getTextField('topmostSubform[0].Page1[0].f1_09[0]').setText(totalDependentsAmount.toString());
  }
 
  //Set Other Income
  const otherIncome = formData.otherIncome || 0;
  form.getTextField('topmostSubform[0].Page1[0].f1_10[0]').setText(otherIncome.toString());

  //Set Deductions
  const deductions = formData.deductions || 0;
  form.getTextField('topmostSubform[0].Page1[0].f1_11[0]').setText(deductions.toString());
  
  //Set Extra Withholding
  const extraWithholding = formData.extraWithholding || 0;
  form.getTextField('topmostSubform[0].Page1[0].f1_12[0]').setText(extraWithholding.toString());

  if (formData.step2b) {
    const {
      line1 = 0,
      line2a = 0,
      line2b = 0,
      line2c = 0,
      line3 = 0,
      line4 = 0,
    } = formData.step2b;

    form.getTextField('topmostSubform[0].Page3[0].f3_01[0]').setText(line1.toString());
    form.getTextField('topmostSubform[0].Page3[0].f3_02[0]').setText(line2a.toString());
    form.getTextField('topmostSubform[0].Page3[0].f3_03[0]').setText(line2b.toString());
    form.getTextField('topmostSubform[0].Page3[0].f3_04[0]').setText(line2c.toString());
    form.getTextField('topmostSubform[0].Page3[0].f3_05[0]').setText(line3.toString());
    form.getTextField('topmostSubform[0].Page3[0].f3_06[0]').setText(line4.toString());
  }
  form.flatten();

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}
