import { NextResponse } from "next/server";
import csv from "csv-parser";
import { Readable } from "stream";
import fs from "fs";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import { PrismaClient } from "@prisma/client";
import mime from "mime-types"; // install with: npm install mime-types
import { randomUUID } from "crypto";

function getContentType(filePath: string) {
  return mime.lookup(filePath) || "application/octet-stream";
}
const s3 = new S3Client({
  region: process.env.AWS_REGION!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer.toString());

    const results = await new Promise((resolve, reject) => {
      const data = [];

      stream
        .pipe(csv())
        .on("data", (row) => data.push(row))
        .on("end", () => resolve(data))
        .on("error", (err) => reject(err));
    });

    for (const datarow of results) {
      const rootPath = path.join(process.cwd(), "uploads");

      const items = fs.readdirSync(rootPath, { withFileTypes: true });
      const folderNameListInUploads = items
        .filter(
          (item) =>
            item.isDirectory() &&
            item.name
              .toLowerCase()
              .startsWith(datarow.projectCode.toLowerCase())
        )
        .map((folder) => folder.name);

      const foundedFolderName = folderNameListInUploads.filter((name) =>
        name.startsWith(datarow.projectCode)
      )[0];
      const propertyFolder = `${datarow.projectCode}-${datarow.projectPropertyCode}`;

      const uploaded = await uploadFolder(
        `/${foundedFolderName}/${propertyFolder}`,
        `properties/${foundedFolderName}/${propertyFolder}`
      );

      await insertPropertyData(uploaded, datarow);
    }

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

const uploadFolder = async (localFolder: string, s3BaseKey = "") => {
  // localFolder example /P0006-28chidlom/P0006-1
  // s3BaseKey example /properties/P0006-28chidlom/P0006-1
  const rootPath = path.join(process.cwd(), "uploads"); // example /Users/Aoy/Desktop/property apps/nnp-test/uploads
  const files = fs.readdirSync(rootPath + localFolder, { withFileTypes: true });

  let uploaded: string[] = [];
  for (const file of files) {
    const absolutePath = rootPath + localFolder;
    const filePath = path.join(absolutePath, file.name);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      // skip hidden/system files like .DS_Store
      if (file.name.startsWith(".")) continue;

      if (/\.(jpg|jpeg|png|gif)$/i.test(file.name)) {
        const s3Key = path.join(s3BaseKey, file.name).replace(/\\/g, "/");
        const fileContent = fs.readFileSync(filePath);
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: s3Key,
          Body: fileContent,
          ContentType: getContentType(filePath),
        });

        // only upload images
        await s3.send(command);
        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.${
          process.env.AWS_REGION
        }.amazonaws.com/${encodeURI(s3Key)}`;

        console.log(`✅ Uploaded: ${imageUrl}`);

        uploaded.push(imageUrl);
      }
    }
  }

  return uploaded;
};

async function insertPropertyData(uploaded: string[], datarow: any) {
  const prisma = new PrismaClient();

  const idOfpropertyToAdd = randomUUID();
  return prisma.property.create({
    data: {
      id: idOfpropertyToAdd,
      projectPropertyCode: datarow.projectPropertyCode
        ? datarow.projectPropertyCode.toString()
        : "",

      status: "pending",
      whenAvailable: "",
      isAcceptShortTerm: false,

      addressNumber: datarow.addressNumber
        ? datarow.addressNumber.toString()
        : "",
      bedRoom: datarow.bedRoom ? datarow.bedRoom.toString() : "",
      bathRoom: datarow.bathRoom ? datarow.bathRoom.toString() : "",
      roomSize: datarow.roomSize ? datarow.roomSize.toString() : "",
      floor: datarow.floor ? datarow.floor.toString() : "",
      building: datarow.building ? datarow.building : "",
      roomType: "Condo",
      isPetFriendly: datarow.isPetFriendly ? Boolean(datarow.isPetFriendly) : false,
      carPark: datarow.carPark ? datarow.carPark.toString() : "",
      imageUrls: uploaded || [],
      roomAmenities:  parseSmartQuotesArray(datarow.roomAmenities) || [],

      rentalRate: datarow.rentalRate ? datarow.rentalRate.toString() : "",
      sellPrice: datarow.sellPrice ? datarow.sellPrice.toString() : "",

      phone: datarow.phone ? datarow.phone.toString() : "",
      lineId: datarow.lineId ? datarow.lineId.toString() : "",
      fbUser: datarow.fbUser ? datarow.fbUser.toString() : "",

      isOwner: Boolean(datarow.isOwner) || true,
      linkPost: datarow.linkPos ? datarow.linkPost.toString() : "",

      note: datarow.note ? datarow.note.toString() : "",
      originalMessage: datarow.originalMessage
        ? datarow.originalMessage.toString()
        : "",
      messageToPost: datarow.messageToPost ? datarow.messageToPost : "",

      projectCode: datarow.projectCode,
    },
  });
}
function parseSmartQuotesArray(str: string): string[] {
  // Replace smart quotes with normal quotes
  str = str.replace(/[“”]/g, '"');

  // Now it's valid JSON
  return JSON.parse(str);
}
