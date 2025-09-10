import prisma from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { PropertyStatus, RoomType } from "@prisma/client";
import { uuid } from "zod/v4";

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
});

async function deleteImagesFromS3(imageUrls: string[]) {
  for (const url of imageUrls) {
    const Key = url.split(".amazonaws.com/")[1]; // extract key after bucket
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key,
      })
    );
  }
}

async function uploadImagesToS3(files: File[], propertyId: string) {
  const uploadedUrls: string[] = [];

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const Key = `properties/${projectCode}/${projectCode}-${projectPropertyCode}`

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    uploadedUrls.push(
      `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`
    );
  }

  return uploadedUrls;
}


// DELETE /api/property/[id]
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const propertyId = params.id;

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    const deleted = await prisma.property.delete({
      where: { id: propertyId },
    });

    return NextResponse.json({
      message: "Property deleted successfully",
      property: deleted,
    });
  } catch (err: any) {
    console.error("Error deleting property:", err);
    return NextResponse.json(
      { error: "Failed to delete property" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const property = await prisma.property.findFirst({
      where: {
        id,
      },
      include: {
        project: {
          select: {
            projectCode: true,
            projectNameEn: true,
            projectNameTh: true,
            projectImageUrl: true,
          },
        },
      },
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch property" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();

    const id = formData.get("id") as string;
    const projectPropertyCode = formData.get("projectPropertyCode") as string;

    const status = (formData.get("status") as string) || "pending";
    const whenAvailable = formData.get("whenAvailable") as string;
    const isAcceptShortTerm = formData.get("isAcceptShortTerm") as string;

    const addressNumber = formData.get("addressNumber") as string;
    const bedRoom = formData.get("bedRoom") as string;
    const bathRoom = formData.get("bathRoom") as string;
    const roomSize = formData.get("roomSize") as string;
    const floor = formData.get("floor") as string;
    const building = formData.get("building") as string;
    const propertyType = formData.get("propertyType") as string;
    const isPetFriendly = formData.get("isPetFriendly") as string;
    const carPark = formData.get("carPark") as string;

    const keptImages = JSON.parse(formData.get("keptImages") as string);

    const removedImages = JSON.parse(formData.get("removedImages") as string);

    const newFiles = formData.getAll("newFiles") as File[];

    const amenities = JSON.parse(formData.get("amenities") as string) || [];

    const rentalRate = formData.get("rentalRate") as string;
    const sellPrice = formData.get("sellPrice") as string;

    const phone = formData.get("phone") as string;
    const lineId = formData.get("lineId") as string;
    const fbUser = formData.get("fbUser") as string;

    const isOwner = formData.get("isOwner") as string;
    const linkPost = formData.get("linkPost") as string;

    const note = formData.get("note") as string;
    const originalMessage = formData.get("originalMessage") as string;
    const messageToPost = formData.get("messageToPost") as string;

    const projectCode = formData.get("projectCode") as string;
    const postId = formData.get("postId") as string;

    if (!projectCode) {
      return NextResponse.json(
        { error: "Project code is required" },
        { status: 400 }
      );
    }

    // Check if property exists
    if (!id) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    // Step 1: Delete removed images
    if (removedImages && removedImages.length > 0) {
      // console.log("removedImages:::: ", removedImages)
      //   console.log("")
      await deleteImagesFromS3(removedImages);
    }

    // Step 2: Upload new images
    let newImageUrls: string[] = []
    // const newImageUrls = newFiles.length
    //   ? await uploadImagesToS3(newFiles, id)
    //   : [];
    if (newFiles.length) {
      for (const file of newFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const Key = `/${postId}/${file.name}-${randomUUID()}`;

        await s3.send(
          new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME!,
            Key,
            Body: buffer,
            ContentType: file.type,
          })
        );

        newImageUrls.push(
          `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${Key}`
        );
      }
    }
    // Step 3: Merge kept images + new uploads
    const finalImages = [...(keptImages || []), ...newImageUrls];

    // Step 4: Update DB
    const updatedProperty = await prisma.property.update({
      where: { id: id },
      data: {
        projectPropertyCode,

        status: status as PropertyStatus,
        whenAvailable,
        isAcceptShortTerm: isAcceptShortTerm,

        addressNumber,
        bedRoom,
        bathRoom,
        roomSize,
        floor,
        building,
        propertyType: propertyType as RoomType,
        isPetFriendly: isPetFriendly,
        carPark,
        imageUrls: finalImages,
        amenities,

        rentalRate,
        sellPrice,

        phone,
        lineId,
        fbUser,

        isOwner: isOwner,
        linkPost,

        note,
        originalMessage,
        messageToPost,

        projectCode,
      },
    });

    return NextResponse.json(updatedProperty);
  } catch (error) {
    console.error("Error updating property:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 }
    );
  }
}

