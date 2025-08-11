"use client"

import React, { useState } from 'react';
import Head from 'next/head';


export default function UploadCsv() {
  const [file, setFile] = useState(null);
  const [modelType, setModelType] = useState('projects');
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsUploading(true);

    if (!file) {
      setMessage('Please select a file to upload.');
      setIsUploading(false);
      return;
    }

    // Create a FormData object to send the file and other data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('modelType', modelType);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Upload Error:', error);
      setMessage('Failed to upload file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 font-sans">
     
      <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
       
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* File Input */}
           <div>
             <label className="block text-gray-700 font-semibold mb-2">Select CSV File</label>
             <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".csv"
              className="w-full text-gray-700 bg-gray-50 border border-gray-300 rounded-xl p-3 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            />
          </div>

          {/* Model Type Selection */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Select Data Type</label>
            <select
              value={modelType}
              onChange={(e) => setModelType(e.target.value)}
              className="w-full p-3 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="projects">Projects</option>
              <option value="properties">Properties</option>
            </select>
          </div>

          {/* Upload Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            disabled={isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload and Import'}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <div className="mt-6 text-center">
            <p className={`font-semibold ${message.startsWith('Error') ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}