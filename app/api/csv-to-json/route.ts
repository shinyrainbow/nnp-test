import type { NextApiRequest, NextApiResponse } from "next";
import Papa from "papaparse";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { csv } = req.body;

    if (!csv) {
      return res.status(400).json({ error: "CSV data is required" });
    }

    const parsed = Papa.parse(csv, {
      header: true,
      skipEmptyLines: true,
    });

    return res.status(200).json(parsed.data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to parse CSV" });
  }
}
