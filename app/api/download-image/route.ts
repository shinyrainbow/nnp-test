// File: pages/api/download-image.js

// This API route fetches an image from a given URL and streams it back to the client.
// It's a secure way to handle image downloads and avoid CORS issues.

import axios from 'axios';

export default async function handler(req, res) {
  // Explicitly check for the GET method. A 405 error will be returned
  // for any other method (e.g., POST, PUT).
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Check if the URL query parameter exists
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Image URL is required.' });
  }

  try {
    // Use axios to fetch the image from the external URL.
    // We set the responseType to 'stream' to handle binary data efficiently.
    const response = await axios({
      method: 'GET',
      url,
      responseType: 'stream',
    });

    // Get the Content-Type from the response headers (e.g., 'image/jpeg')
    const contentType = response.headers['content-type'];
    const contentDisposition = response.headers['content-disposition'];

    // Set the headers on our response to match the external image's headers.
    // This tells the browser what kind of file it is and how to handle it.
    if (contentType) {
      res.setHeader('Content-Type', contentType);
    }
    
    // Set the filename for the downloaded file.
    if (contentDisposition) {
      res.setHeader('Content-Disposition', contentDisposition);
    } else {
      // Fallback filename if the Content-Disposition header is not present.
      const filename = url.substring(url.lastIndexOf('/') + 1);
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    }

    // Pipe the image stream directly to the response, which is very memory efficient.
    response.data.pipe(res);

  } catch (error) {
    console.error('API Error fetching image:', error);
    res.status(500).json({ error: 'Failed to fetch the image. Check the URL or server logs.' });
  }
}
