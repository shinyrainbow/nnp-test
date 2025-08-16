'use client'
import { useState } from "react";

export default function CsvToJson() {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvText = e.target?.result;

      if (typeof csvText === "string") {
        setLoading(true);
        const res = await fetch("/api/csv-to-json", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ csv: csvText }),
        });

        const data = await res.json();
        setJsonData(data);
        setLoading(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">CSV to JSON Converter</h1>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="mb-4"
      />

      {loading && <p>Converting...</p>}

      {jsonData.length > 0 && (
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  );
}
