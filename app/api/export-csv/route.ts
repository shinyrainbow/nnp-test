// app/api/export-csv/route.ts
import { NextRequest } from "next/server";
import { parse, transforms } from "json2csv";


export async function POST(req: NextRequest) {
    try {
      const data = await req.json(); // expects array of objects
  
      const csv = parse(data, {
        transforms: [
          (row) => {
            const r: Record<string, any> = {};
            for (const key in row) {
              if (Array.isArray(row[key])) {
                r[key] = row[key].join(" | ");
              } else if (typeof row[key] === "object" && row[key] !== null) {
                r[key] = JSON.stringify(row[key]);
              } else {
                r[key] = row[key];
              }
            }
            return r;
          },
        ],
      });
  
      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": 'attachment; filename="export.csv"',
        },
      });
    } catch (err: any) {
      console.error(err);
      return new Response("Error generating CSV", { status: 500 });
    }
  }

export function jsonToCsv<T extends Record<string, any>>(rows: T[]): string {
    if (!rows?.length) return "";
  
    // transform arrays into a single string
    const flattenArrays = (row: Record<string, any>) => {
      const newRow: Record<string, any> = {};
      for (const key in row) {
        const val = row[key];
        if (Array.isArray(val)) {
          newRow[key] = val.join(" | "); // join URLs with a separator
        } else if (typeof val === "object" && val !== null) {
          newRow[key] = JSON.stringify(val);
        } else {
          newRow[key] = val;
        }
      }
      return newRow;
    };
  
    const opts = {
      fields: Object.keys(rows[0]),
      transforms: [flattenArrays],
    };
  
    return parse(rows, opts);
  }