// This is the actual API route code.
// It should be placed in `app/api/projects/create/route.js`
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import {projects} from "@/mock/projects";
import { uuid } from "zod/v4";

// Instantiate the Prisma client. This is a best practice to do outside the handler.
const prisma = new PrismaClient();

export async function GET() {
  try {
    const pp = await prisma.project.findMany({})
    return NextResponse.json({data: pp}, {status: 200})
  }catch(err){

  }
}




// This is the main API route handler function for POST requests.
// In the App Router, the function name corresponds to the HTTP method.
export async function POST(req: Request) {
  // Use a try/catch block for robust error handling.
  try {
    // The request body needs to be read from the `req` object.
    const projectData = await req.json();

    // We'll iterate over the array of projects and create each one.
    // The `map` function will return an array of promises.
    const createProjects = projects.map((project, index) => {
      // Use `prisma.projects.create()` to insert a new record.
      // We are mapping the fields from the JSON to the fields in our Prisma schema.
      // Note: `project.complete` in the JSON is mapped to `completeYear` in the schema.
      // We also handle cases where the fields might be missing in the JSON.
      return prisma.project.create({
        data: {
          projectCode: project.projectCode || "",

          projectNameEn: project.projectNameEn,
          projectNameTh: project.projectNameTh,
          projectDescriptionEn: project.projectDescriptionEn,
          projectDescriptionTh: project.projectDescriptionTh,

          projectLocation: project.projectLocation,
          projectImageUrl: project.projectImageUrl,
          projectFacilities: project.projectFacilities,

          addressNumberRoad: project.addressNumberRoad,
          addressSubDistrict: project.addressSubDistrict,
          addressDistrict: project.addressDistrict,
          addressProvince: project.addressProvince,
          addressZipcode: project.addressZipcode,

          completeYear: project.completeYear || "", // Handle both possible keys
          distanceToStation: project.distanceToStation || [],
          priceRange: project.priceRange || "",
        },
      });
    });

    // `Promise.all` waits for all the promises in the array to resolve.
    await Promise.all(createProjects);

    // If everything is successful, return a 201 Created status using NextResponse.
    return NextResponse.json(
      { message: "Projects created successfully" },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging purposes.
    console.error("Error inserting projects:", error);
    // Send a 500 status code with a helpful error message using NextResponse.
    return NextResponse.json(
      { message: "Error inserting projects", error: error.message },
      { status: 500 }
    );
  }
}
