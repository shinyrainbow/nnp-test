import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
import Wordcut from "wordcut";

Wordcut.init(); // must initialize the dictionary

export async function POST(req) {
  try {
    // get clauses from page
    const { clauses } = await req.json();

    // 2. Create PDF
    const pdfDoc = await PDFDocument.create();
    // Register fontkit
    pdfDoc.registerFontkit(fontkit);
    // 1. Load Thai font (THSarabunNew)
    const fontPath = path.join(process.cwd(), "public/fonts/THSarabunNew.ttf");
    const fontBytes = fs.readFileSync(fontPath); // replace with your TTF
    const fontBoldPath = path.join(
      process.cwd(),
      "public/fonts/THSarabunNewBold.ttf"
    );
    const fontBoldBytes = fs.readFileSync(fontBoldPath);

    let page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(fontBytes);
    const fontBold = await pdfDoc.embedFont(fontBoldBytes);
    const { height, width } = page.getSize();
    const margin = 50;
    const fontSize = 14; // TH Sarabun looks best at 14–16
    const lineHeight = 24;
    const lineSpacing = 5;
    let y = height - margin;
    const maxWidth = width - margin * 2;
    // Function to wrap text based on word segmentation
    const wrapText = (text) => {
      const segmented = Wordcut.cut(text); // returns string with | separators
      const words = segmented.split("|");

      const lines = [];
      let currentLine = "";
      let currentWidth = 0;

      for (const word of words) {
        const wordWidth = font.widthOfTextAtSize(word, fontSize);
        if (currentWidth + wordWidth > maxWidth && currentLine.length > 0) {
          lines.push(currentLine);
          currentLine = word;
          currentWidth = wordWidth;
        } else {
          currentLine += word;
          currentWidth += wordWidth;
        }
      }

      if (currentLine) lines.push(currentLine);
      return lines;
    };
    const title = clauses[0];
    const titleFontSize = 26; // big size for title
    const titleTextWidth = font.widthOfTextAtSize(title, titleFontSize);
    const xTitle = (width - titleTextWidth) / 2;
    page.drawText(title, {
      x: xTitle,
      y: y,
      size: titleFontSize,
      font: fontBold,
      color: rgb(0, 0, 0),
    });

    y -= titleFontSize + 2 * lineSpacing;

    const slicedClauses = clauses.slice(1);

    for (const clause of slicedClauses) {
      const lines = wrapText(clause);
      for (const line of lines) {
        if (y < margin + lineHeight) {
          page = pdfDoc.addPage([595, 842]);
          y = height - margin;
        }
        page.drawText(line, {
          x: margin,
          y,
          font,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        y -= lineHeight;
      }
      
      y -= 8;
    }
  
    // 5. Return PDF
    const pdfBytes = await pdfDoc.save();

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="my-document.pdf"',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// // app/api/long-pdf/route.ts
// import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// import fs from "fs";
// import fontkit from "@pdf-lib/fontkit";
// import path from "path";
// import { NextRequest, NextResponse } from "next/server";

// const contractContent = `สัญญานี้ทําขึ้นที่ <InputForm p="กรอก"/><br />
// ณ วันทีี่ <InputForm p={"กรอกชื่อ-นามสกุลผู้ขาย"} /> ระหว่าง <br /><br />

// {/* Seller */}
// &ensp;&ensp;&ensp; ชื่อ-นามสกุล  <InputForm p={"กรอกชื่อ-นามสกุลผู้ขาย"}/>  อายุ <InputForm p={"กรอกอายุ"} />ปี เลขที่บัตรประชาชน <InputForm p={"กรอกเลขที่บัตรประชาชน"} /><br />
// อยู่บ้านเลขที่{" "} <InputForm p={"กรอกที่อยู่"}/><br />
// หมายเลขโทรศัพท์ <InputForm p={"กรอกหมายเลขโทรศัพท์"}/>ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะขาย” ฝ่ายหนึ่ง <br /> <br />

// &ensp;&ensp;&ensp; ชื่อ-นามสกุล  <InputForm p={"กรอกชื่อ-นามสกุลผู้ขาย"}/>  อายุ <InputForm p={"กรอกอายุ"} />ปี เลขที่บัตรประชาชน <InputForm p={"กรอกเลขที่บัตรประชาชน"} /><br />
// อยู่บ้านเลขที่{" "} <InputForm p={"กรอกที่อยู่"}/><br />
// หมายเลขโทรศัพท์ <InputForm p={"กรอกหมายเลขโทรศัพท์"}/>
// ซึ่งต่อไปนี้จะเรียกว่า "ผู้จะซื้อ” ฝ่ายหนึ่ง  <br /> <br />

// ผู้จะขายและผู้จะซื้อตกลงทําสัญญากัน โดยมีข้อความดังต่อไปนี้  <br /> <br />

//                   &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 1. </span> อสังหาริมทรัพย์ที่จะซื้อจะขาย<br />
//                 ผู้ขายตกลงจะขายและผู้ซื้อตกลงจะซื้อห้องชุด โฉนดที่ดินเลขที่ <InputForm p={"กรอกเลขที่โฉนด"}/> <br />
//                 ชื่ออาคารชุด <InputForm p={"กรอกชื่ออาคารชุด"}/> ชั้นที่ <InputForm p={"กรอกชั้น"}/> ทะเบียน อาคารชุดเลขที่ <InputForm p={"กรอกเลขที่"}/> <br />
//                 ตั้งอยู่ที่  <InputForm p={"กรอกชื่ออาคารชุด"}/>  เนื้อที่ทั้งหมดพร้อมระเบียง <InputForm p={"กรอกชื่ออาคารชุด"}/>  ตารางเมตร พร้อมสิ่งอํานวยความสะดวกได้แก่ <InputForm p={"กรอกชื่ออาคารชุด"}/>   <br />
//                   และให้ถือเป็นส่วนหนึ่งของสัญญา ซึ่งต่อไปจะเรียกว่า “ห้องชุด" <br /> <br />

//                   &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 2. </span> ราคาซื้อขายและการชําระเงิน <br />
//                   ผู้จะขายตกลงจะขาย และผู้ซื้อตกลงจะซื้อห้องชุดตามรายละเอียดในข้อ 1. <br />
//                   ในราคา  <InputForm p={"กรอกราคา"}/> บาท (<InputForm p={"กรอกราคา"}/>) โดยผู้จะซื้อตกลงจะซื้อตกลงแบ่งชําระเงินให้ผู้จะขาย ดังนี้ <br />
//                   (1) ในวันทําสัญญา ชําระเงินมัดจํา จํานวน <InputForm p={"กรอกราคา"}/> บาท ( <InputForm p={"กรอกราคา"}/> ) <br />
//                   โดยจ่ายเป็น เงินสด <br /><br />
//                   ให้แก่ผู้จะขายซึ่งผู้จะขายได้รับไว้แล้ว เงินจํานวนนี้คือเงินมัดจําและเป็นส่วนหนึ่งของการชําระเงินตามสัญญานี้ <br />
//                   (2) ในวันจดทะเบียน โอนกรรมสิทธิ์ห้องชุด ตามข้อ 1. ชําระเงินส่วนที่เหลือ จํานวน 490,000. ....... บาท () ภายในระยะเวลา 15 วัน <br />
//                   นับจากวันที่ทําสัญญานี้ผู้จะขายและผู้จะซื้อจะดําเนินการจดทะเบียนโอนกรรมสิทธิ์ห้องชุด ณ สํานักงานที่ดิน <br />
//                   จังหวัด กรุงเทพ <br /><br />

//                   &ensp;&ensp;&ensp;<span className="font-bold">ข้อ 3. </span> ค่าใช้จ่ายการจดทะเบียนโอนกรรมสิทธิ์ ณ สํานักงานที่ดิน <br />
//                   (1) ค่าภาษีเงินได้บุคคลธรรมดา/นิติบุคคล โดยผู้จะขายเป็นผู้ชําระ <br />
//                   (2) ค่าจดจํานอง ร้อยละ 1 โดยผู้ซื้อเป็นผู้ชําระ 0.011. <br />
//                   (3) ค่าธรรมเนียมการโอน ร้อยละ 2 โดย <br />
//                   (4) ค่าอากรแสตมป์ ร้อยละ 0.5 โดย <br />`;

// export async function POST(req: NextRequest) {
//   try {
//     const {dataList} = await req.json();

//     const pdfDoc = await PDFDocument.create();
//     let page = pdfDoc.addPage([595, 842]); // A4 size
//     const { height, width } = page.getSize();

//     // Register fontkit
//     pdfDoc.registerFontkit(fontkit);

//     // Load a Thai-supporting TTF font
//     const fontBytes = fs.readFileSync("public/fonts/THSarabunNew.ttf"); // replace with your TTF
//     const thaiFont = await pdfDoc.embedFont(fontBytes);

//     // const pageWidth = 595.28; // A4
//     // const pageHeight = 841.89;
//     // const margin = 50;
//     // const fontSize = 18;
//     // const lineHeight = fontSize * 1.4;
//     const margin = 50;
//     const fontSize = 12;
//     const lineHeight = 20;
//     let y = height - margin;
//     // const maxWidth = pageWidth - margin * 2;
//     // let page = pdfDoc.addPage([pageWidth, pageHeight]);
//     // let y = pageHeight - margin;

//     const wrapText = (text, maxWidth) => {
//       const words = text.split(" ");
//       const lines = [];
//       let currentLine = "";

//       words.forEach((word) => {
//         const testLine = currentLine ? currentLine + " " + word : word;
//         const lineWidth = thaiFont.widthOfTextAtSize(testLine, fontSize);
//         if (lineWidth > maxWidth && currentLine) {
//           lines.push(currentLine);
//           currentLine = word;
//         } else {
//           currentLine = testLine;
//         }
//       });
//       if (currentLine) lines.push(currentLine);
//       return lines;
//     };

//     dataList.forEach((clause) => {
//       const lines = wrapText(clause, width - margin * 2);

//       lines.forEach((line) => {
//         if (y < margin + lineHeight) {
//           page = pdfDoc.addPage([595, 842]);
//           y = height - margin;
//         }

//         page.drawText(line, {
//           x: margin,
//           y,
//           size: fontSize,
//           font: thaiFont,
//           color: rgb(0, 0, 0),
//         });

//         y -= lineHeight;
//       });

//       y -= 10; // extra spacing between clauses
//     });

//     /////////////
//     // for (const data in dataList) {
//     //   console.log("data>>>", data)
//     //   const lines = wrapText(dataList[data], thaiFont, fontSize, maxWidth);

//     //   for (const line in lines) {
//     //     if (y - lineHeight < margin) {
//     //       page = pdfDoc.addPage([pageWidth, pageHeight]);
//     //       y = pageHeight - margin;
//     //     }

//     //     // Justify line
//     //     const textWidth = thaiFont.widthOfTextAtSize(line, fontSize);
//     //     const extraSpace = maxWidth - textWidth;
//     //     const numGaps = line.length - 1 || 1;
//     //     const spacing = extraSpace / numGaps;

//     //     let x = margin;
//     //     for (let char of line) {
//     //       page.drawText(char, {
//     //         x,
//     //         y,
//     //         size: fontSize,
//     //         font: thaiFont,
//     //         color: rgb(0, 0, 0),
//     //       });
//     //       x += thaiFont.widthOfTextAtSize(char, fontSize) + spacing;
//     //     }

//     //     y -= lineHeight;
//     //   }
//     // }
//     ////////////
//     const pdfBytes = await pdfDoc.save();

//     return new NextResponse(pdfBytes, {
//       status: 200,
//       headers: {
//         "Content-Type": "application/pdf",
//         "Content-Disposition": "inline; filename=preview.pdf",
//       },
//     });
//     // return new Response(pdfBytes, {
//     //   headers: {
//     //     "Content-Type": "application/pdf",
//     //     "Content-Disposition": 'inline; filename="long_contract.pdf"',
//     //   },
//     // });
//   } catch (err) {
//     console.log(err);
//   }
// }

// // Simple width-based wrapping
// // function wrapText(text, font, fontSize, maxWidth) {
// //   const chars = text.split("");
// //   const lines = [];
// //   let line = "";
// //   for (let i = 0; i < chars.length; i++) {
// //     const testLine = line + chars[i];
// //     if (
// //       font.widthOfTextAtSize(testLine, fontSize) > maxWidth &&
// //       line.length > 0
// //     ) {
// //       lines.push(line);
// //       line = chars[i];
// //     } else {
// //       line = testLine;
// //     }
// //   }
// //   if (line) lines.push(line);
// //   return lines;
// // }

// // async function createPdf() {
// //   const pdfDoc = await PDFDocument.create();
// //   const page = pdfDoc.addPage([600, 400]);

// //   // Draw a rectangle (like a div background)
// //   page.drawRectangle({
// //     x: 50,
// //     y: 200,
// //     width: 300,
// //     height: 100,
// //     color: rgb(0.9, 0.9, 0.9), // light gray background
// //     borderColor: rgb(0, 0, 0),
// //     borderWidth: 1,
// //   });

// //   // Add text inside (like div content)
// //   const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
// //   page.drawText('This is a div content

// //     ', {
// //     x: 60,
// //     y: 260,
// //     size: 16,
// //     font: font,
// //     color: rgb(0, 0, 0),
// //   });

// //   // Save PDF
// //   const pdfBytes = await pdfDoc.save();
// //   return pdfBytes
// //   // fs.writeFileSync('output.pdf', pdfBytes);
// // }

// // // app/api/contract-pdf/route.ts
// // import { PDFDocument, StandardFonts } from "pdf-lib";

// // export async function GET() {
// //   const pdfDoc = await PDFDocument.create();
// //   const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

// //   const A4 = [595.28, 841.89];

// //   const page1 = pdfDoc.addPage(A4);
// //   page1.drawText("Rental Agreement", { x: 50, y: 780, size: 18, font });

// //   for (let i = 2; i <= 6; i++) {
// //     const p = pdfDoc.addPage(A4);
// //     p.drawText(`Page ${i}`, { x: 50, y: 780, size: 14, font });
// //   }

// //   const pdfBytes = await pdfDoc.save();

// //   return new Response(pdfBytes, {
// //     headers: {
// //       "Content-Type": "application/pdf",
// //       "Content-Disposition": 'inline; filename="contract.pdf"',
// //     },
// //   });
// // }
