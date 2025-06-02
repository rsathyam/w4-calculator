import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function generateW4Pdf(formData) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // standard letter size
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = height - 40;
  const lineHeight = 20;

  page.drawText("W-4 Form (Simplified Preview)", {
    x: 50,
    y,
    font: boldFont,
    size: 16,
    color: rgb(0, 0, 0),
  });

  y -= 30;

  Object.entries(formData).forEach(([key, value]) => {
    page.drawText(`${key}: ${value}`, {
      x: 50,
      y,
      font,
      size: 12,
    });
    y -= lineHeight;
  });

  const { calculateWithholding } = await import('./calculateTax');
  const { withholdingPerPaycheck, annualWithholding } = calculateWithholding(formData);

  y -= 20;
  page.drawText("Estimated Withholding Preview:", {
    x: 50,
    y,
    font: boldFont,
    size: 14,
  });

  y -= lineHeight;
  page.drawText(`Withholding per paycheck: $${withholdingPerPaycheck}`, {
    x: 50,
    y,
    font,
    size: 12,
  });

  y -= lineHeight;
  page.drawText(`Annual withholding: $${annualWithholding}`, {
    x: 50,
    y,
    font,
    size: 12,
  });

  const pdfBytes = await pdfDoc.save();

  // Trigger browser download
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'w4_form.pdf';
  link.click();
  URL.revokeObjectURL(url);
}
