import { NextResponse } from "next/server"
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();


export async function PUT(req) {
    try {
        const projectData = await req.json();

       const xxx = projectData.map((dd, index) => {
        console.log(dd, 11111)
            return prisma.project.update({
                where: {
                    projectCode: index+1,
                },
                data: {
                    projectNameTh: dd,
                }
            });
        })

        await Promise.all(xxx);

        return NextResponse.json(
            { message: "Projects thai name updated successfully" },
            { status: 201 }
          );
    } catch (error) {
        return NextResponse.json(
            { message: "Error inserting thai projects", error: error.message },
            { status: 500 }
          );
    }

}
