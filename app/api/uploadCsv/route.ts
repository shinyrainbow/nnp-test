import { PrismaClient } from '@prisma/client';
import { Readable } from 'stream';
import csv from 'csv-parser';

const prisma = new PrismaClient();

// Disable body parsing for this API route to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

  try {
    const data = await new Promise((resolve) => {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        resolve(body);
      });
    });

    const boundary = req.headers['content-type'].split('; ')[1].split('=')[1];
    const parts = data.split(new RegExp(`--${boundary}`));

    let fileContent;
    let modelType;

    // A simple, manual way to parse the multipart form data
    parts.forEach(part => {
      if (part.includes('filename')) {
        const content = part.split('\r\n\r\n')[1].trim();
        fileContent = content;
      }
      if (part.includes('name="modelType"')) {
        const content = part.split('\r\n\r\n')[1].trim();
        modelType = content;
      }
    });

    if (!fileContent || !modelType) {
      return res.status(400).json({ message: 'File or model type not provided.' });
    }

    const stream = Readable.from([fileContent]);
    const results = [];
    
    // Parse the CSV data from the stream
    stream.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          if (modelType === 'projects') {
            await prisma.project.createMany({
              data: results.map(row => ({
                projectName: row.projectName,
                projectCode: row.projectCode,
                projectLocation: row.projectLocation.split(','),
                projectImageUrl: row.projectImageUrl.split(','),
                projectFacilities: row.projectFacilities.split(','),
                addressNumber: row.addressNumber,
                addressSubDistrict: row.addressSubDistrict,
                addressDistrict: row.addressDistrict,
                addressProvince: row.addressProvince,
                addressZipcode: row.addressZipcode,
              })),
            });
            return res.status(200).json({ message: `${results.length} projects imported successfully.` });

          } else if (modelType === 'properties') {
            // Fetch projects to link properties
            const projects = await prisma.project.findMany();
            const projectMap = new Map(projects.map(p => [p.projectCode, p.id]));

            const propertiesWithProjectId = results.map(row => {
              const projectId = projectMap.get(row.projectCode);
              return {
                ...row,
                projectId: projectId,
                // Cast string values to correct types
                propertyId: parseInt(row.propertyId),
                roomSize: parseFloat(row.roomSize),
                rentalRate: parseInt(row.rentalRate),
                sell: parseInt(row.sell),
                bedRoom: parseInt(row.bedRoom),
                bathRoom: parseInt(row.bathRoom),
                distanceToStation: parseInt(row.distanceToStation),
                carPark: parseInt(row.carPark),
                floor: parseInt(row.floor),
                isPetFriendly: row.isPetFriendly === 'true',
                isOwner: row.isOwner === 'true',
                isAcceptShortTerm: row.isAcceptShortTerm === 'true',
                status: row.status,
                imageUrls: row.imageUrls.split(','),
                location: row.location.split(','),
                roomAmenities: row.roomAmenities.split(','),
              };
            }).filter(property => property.projectId); // Only include properties with a valid project

            await prisma.property.createMany({
              data: propertiesWithProjectId,
            });
            return res.status(200).json({ message: `${propertiesWithProjectId.length} properties imported successfully.` });
          } else {
            return res.status(400).json({ message: 'Invalid model type provided.' });
          }
        } catch (dbError) {
          console.error('Database Error:', dbError);
          return res.status(500).json({ message: 'Failed to insert data into the database.' });
        }
      });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}