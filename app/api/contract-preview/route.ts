import { NextResponse } from "next/server";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import fontkit from "@pdf-lib/fontkit";
import Wordcut from "wordcut";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

Wordcut.init(); // must initialize the dictionary
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    const neonUserDb = await prisma.user.findFirst({
      where: {
        clerkId: userId,
      },
    });

    // if not found user
    if (!neonUserDb) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    // if user is freeUser
    if (!!neonUserDb && !neonUserDb.isPaid) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }
    
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
