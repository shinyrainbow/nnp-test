// app/api/long-pdf/route.ts
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function GET() {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pageWidth = 595.28; // A4 width in points
  const pageHeight = 841.89; // A4 height in points
  const margin = 50;

  const lineHeight = 18;
  const fontSize = 12;

  let y = pageHeight - margin;
  let page = pdfDoc.addPage([pageWidth, pageHeight]);

  // Mock contract data
  const contractData = Array.from({ length: 60 }, (_, i) => ({
    title: `Clause ${i + 1}`,
    text: `      Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is clause number ${
      i + 1
    }.`,
  }));

  const title = "Rental Contract";

  // Measure the text width
  const textWidth = font.widthOfTextAtSize(title, fontSize);

  // Center X position
  const x = (pageWidth - textWidth) / 2;
  
  for (const clause of contractData) {
      // Check if adding this line will exceed page
      if (y < margin + lineHeight * 2) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }

    // Draw title
    page.drawText(clause.title, {
      //   x: margin,
      x,
      y,
      size: fontSize + 2,
      font,
      color: rgb(0, 0, 0.8),
    });
    y -= lineHeight;

    // Draw text
    page.drawText(clause.text, {
      x: margin + 10,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    });
    y -= lineHeight + 4;
  }

  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="long_contract.pdf"',
    },
  });
}

// // app/api/contract-pdf/route.ts
// import { PDFDocument, StandardFonts } from "pdf-lib";

// export async function GET() {
//   const pdfDoc = await PDFDocument.create();
//   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//   const A4 = [595.28, 841.89];

//   const page1 = pdfDoc.addPage(A4);
//   page1.drawText("Rental Agreement", { x: 50, y: 780, size: 18, font });

//   for (let i = 2; i <= 6; i++) {
//     const p = pdfDoc.addPage(A4);
//     p.drawText(`Page ${i}`, { x: 50, y: 780, size: 14, font });
//   }

//   const pdfBytes = await pdfDoc.save();

//   return new Response(pdfBytes, {
//     headers: {
//       "Content-Type": "application/pdf",
//       "Content-Disposition": 'inline; filename="contract.pdf"',
//     },
//   });
// }
