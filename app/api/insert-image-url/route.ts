import AWS from "aws-sdk";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        imageUrls: {
          equals: [],
        },
        
      },
      // take: 1000,
    });

    console.log(properties.length, 9999999)
    await Promise.all(
      properties.map(async (prop) => {
        const bucketName = process.env.AWS_S3_BUCKET_NAME;
        const folderPrefix = `${prop.postId}/`;
        const result = await s3
          .listObjectsV2({
            Bucket: bucketName,
            Prefix: folderPrefix,
          })
          .promise();

        if (result.Contents) {
          const publicBaseUrl = `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/`;
          const imageUrls = result.Contents.map(
            (file) => publicBaseUrl + file.Key
          );
          return await prisma.property.update({
            where: { postId: prop?.postId, id: prop.id },
            data: {
              imageUrls,
            },
          });
        }
      })
    );

    return NextResponse.json(
      { message: "Properties created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
