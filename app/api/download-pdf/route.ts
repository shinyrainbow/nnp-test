// File: pages/api/build-contract.js


// File: pages/api/download-pdf.js


// Helper function to create a basic HTML template for the PDF.
// In a real app, this would be a more detailed, 6-page template.
const createContractHtml = (data) => {
  const { tenantName, passportNumber, condoName, moveInDate, moveOutDate } = data;
  const today = new Date().toLocaleDateString();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Rental Contract</title>
      <style>
        body { font-family: sans-serif; margin: 0; padding: 2cm; font-size: 11pt; }
        .page { page-break-after: always; }
        h1, h2 { text-align: center; }
        .details { margin-top: 2cm; line-height: 1.8; }
        .signature { margin-top: 3cm; display: flex; justify-content: space-around; }
        .signature div { border-top: 1px solid black; padding-top: 5px; width: 40%; text-align: center; }
        /* Simulating 6 pages with a simple page-break */
        .page p { min-height: 15cm; } 
      </style>
    </head>
    <body>
      <!-- Page 1 -->
      <div class="page">
        <h1>Rental Contract Agreement</h1>
        <h2>Property: ${condoName}</h2>
        <p>This agreement is made on ${today}, between the Landlord and the Tenant, ${tenantName}, passport number ${passportNumber}.</p>
        <p>This contract specifies the terms for the rental of the property located at ${condoName}, commencing on ${moveInDate} and ending on ${moveOutDate}.</p>
      </div>

      <!-- Page 2-5 (Placeholder content) -->
      <div class="page"><h2>Terms and Conditions (Page 2)</h2><p>...</p></div>
      <div class="page"><h2>Terms and Conditions (Page 3)</h2><p>...</p></div>
      <div class="page"><h2>Terms and Conditions (Page 4)</h2><p>...</p></div>
      <div class="page"><h2>Terms and Conditions (Page 5)</h2><p>...</p></div>

      <!-- Page 6 -->
      <div class="page">
        <h2>Signatures</h2>
        <p>IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.</p>
        <div class="signature">
          <div>
            <p>Landlord</p>
            <p>(Signature and Printed Name)</p>
          </div>
          <div>
            <p>Tenant</p>
            <p>(Signature and Printed Name)</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data = req.body;
    
    // Create the HTML content for the PDF
    const htmlContent = createContractHtml(data);

    // Launch Puppeteer to create the PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generate the PDF as a buffer
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '2cm', bottom: '2cm', left: '2cm', right: '2cm' },
    });

    await browser.close();

    // Set the headers for PDF download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="rental_contract.pdf"');
    
    res.send(pdfBuffer);

  } catch (error) {
    console.error('Error in download-pdf API:', error);
    return res.status(500).json({ error: 'Failed to generate PDF.' });
  }
}
