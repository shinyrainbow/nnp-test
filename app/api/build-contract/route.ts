import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

// IMPORTANT: Next.js API routes need a special config to handle file uploads.
export const config = {
  api: {
    bodyParser: false,
  },
};

// Mock OCR function. In a real application, you would replace this
// with a call to a dedicated OCR service (e.g., Google Cloud Vision, Amazon Textract).
const extractPassportInfo = async (imagePath) => {
  // Simulating OCR extraction with a slight delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Return hardcoded mock data. A real OCR service would return
  // structured data extracted from the image.
  return {
    tenantName: "John Doe",
    passportNumber: "P1234567",
    dob: "1990-01-15",
    issueDate: "2020-03-10",
    expiryDate: "2030-03-09",
    nationality: "USA"
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const form = new formidable.IncomingForm();
    const [fields, files] = await form.parse(req);
    
    const condoName = fields.condoName?.[0];
    const moveInDate = fields.moveInDate?.[0];
    const moveOutDate = fields.moveOutDate?.[0];
    const passportImageFile = files.passportImage?.[0];

    if (!condoName || !moveInDate || !moveOutDate || !passportImageFile) {
      return res.status(400).json({ error: 'Missing required fields or passport image.' });
    }

    // Call the mock OCR function
    const passportInfo = await extractPassportInfo(passportImageFile.filepath);

    const contractData = {
      condoName,
      moveInDate,
      moveOutDate,
      ...passportInfo,
    };

    // The frontend will receive this data to show a preview.
    return res.status(200).json(contractData);

  } catch (error) {
    console.error('Error in build-contract API:', error);
    return res.status(500).json({ error: 'Failed to process contract data.' });
  }
}
