"use client";
import { useState } from "react";

export default function Home() {
  const [jsonData, setJsonData] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.file.files[0]);

    const res = await fetch("/api/csv-to-json", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setJsonData(data);
  };
  return (
    <div className="p-6">
      <form onSubmit={handleUpload}>
        <input type="file" name="file" accept=".csv" />
        <button type="submit">Upload CSV</button>
      </form>

      {jsonData && (
        <pre className="mt-4 bg-gray-100 p-2 rounded">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  );
}
