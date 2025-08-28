'use client'
import React, { useState } from 'react';
import { FaFilePdf, FaImage, FaCalendarAlt, FaHome } from 'react-icons/fa';
import { FiLoader } from 'react-icons/fi';

// Main App component for the rental contract builder
const App = () => {
  const [condoName, setCondoName] = useState('');
  const [moveInDate, setMoveInDate] = useState('');
  const [moveOutDate, setMoveOutDate] = useState('');
  const [passportImage, setPassportImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle image file selection and create a preview URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPassportImage(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setPassportImage(null);
      setImagePreview(null);
    }
  };

  // Function to build and preview the contract (API call)
  const handleBuildContract = async (e) => {
    e.preventDefault();
    setStatus('');
    setContractData(null);
    setIsLoading(true);

    if (!condoName || !moveInDate || !moveOutDate || !passportImage) {
      setStatus('Please fill out all fields and upload a passport image.');
      setIsLoading(false);
      return;
    }

    try {
      // Use FormData to send both text and the image file
      const formData = new FormData();
      formData.append('condoName', condoName);
      formData.append('moveInDate', moveInDate);
      formData.append('moveOutDate', moveOutDate);
      formData.append('passportImage', passportImage);

      // Make a POST request to the API route to build the contract
      const response = await fetch('/api/build-contract', {
        method: 'POST',
        body: formData,
      });

      console.log("res", response)
      const result = await response.json();

      if (response.ok) {
        setContractData(result);
        setStatus('Contract data extracted successfully! Preview below.');
      } else {
        throw new Error(result.error || 'Failed to build contract.');
      }

    } catch (error) {
      console.error('API Error:', error);
      setStatus(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to download the PDF
  const handleDownloadPdf = async () => {
    if (!contractData) {
      setStatus('Please build the contract first.');
      return;
    }

    try {
      setIsLoading(true);
      // Make a GET request to the API to get the PDF file
      const response = await fetch('/api/download-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contractData),
      });

      if (!response.ok) {
        throw new Error('Failed to download PDF.');
      }

      // Create a blob from the response to handle the binary data
      const blob = await response.blob();
      const filename = `rental_contract_${condoName.replace(/\s/g, '_')}.pdf`;
      
      // Create a temporary link element to trigger the download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      URL.revokeObjectURL(a.href);
      setStatus('PDF downloaded successfully!');

    } catch (error) {
      console.error('Download error:', error);
      setStatus(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
          Rental Contract Builder
        </h1>

        {/* Input Form */}
        <form onSubmit={handleBuildContract} className="space-y-6 mb-8">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <label htmlFor="condoName" className="block text-gray-700 font-semibold mb-2">
                <FaHome className="inline-block mr-2 text-gray-500" />
                Condo Name
              </label>
              <input
                type="text"
                id="condoName"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={condoName}
                onChange={(e) => setCondoName(e.target.value)}
                placeholder="e.g., The Base Park"
                disabled={isLoading}
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label htmlFor="moveInDate" className="block text-gray-700 font-semibold mb-2">
                <FaCalendarAlt className="inline-block mr-2 text-gray-500" />
                Move-in Date
              </label>
              <input
                type="date"
                id="moveInDate"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={moveInDate}
                onChange={(e) => setMoveInDate(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="w-full md:w-1/4 px-2 mb-4">
              <label htmlFor="moveOutDate" className="block text-gray-700 font-semibold mb-2">
                <FaCalendarAlt className="inline-block mr-2 text-gray-500" />
                Move-out Date
              </label>
              <input
                type="date"
                id="moveOutDate"
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={moveOutDate}
                onChange={(e) => setMoveOutDate(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label htmlFor="passportImage" className="block text-gray-700 font-semibold mb-2">
              <FaImage className="inline-block mr-2 text-gray-500" />
              Tenant Passport Image
            </label>
            <input
              type="file"
              id="passportImage"
              accept="image/*"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleImageChange}
              disabled={isLoading}
            />
            {imagePreview && (
              <div className="mt-4 flex justify-center">
                <img src={imagePreview} alt="Passport Preview" className="max-w-full h-auto rounded-xl shadow-md" />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-green-700 transition-colors disabled:bg-green-300"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin" />
                Building Contract...
              </>
            ) : (
              'Build Contract'
            )}
          </button>
        </form>

        {/* Status Message */}
        {status && (
          <div className={`mt-6 p-4 text-center rounded-xl font-medium ${status.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status}
          </div>
        )}

        {/* Contract Preview & Download Button */}
        {contractData && (
          <div className="mt-8 space-y-4">
            <h2 className="text-2xl font-bold text-center text-gray-800">
              Contract Preview
            </h2>
            <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 shadow-inner">
              <p className="font-semibold">Tenant Name: {contractData.tenantName}</p>
              <p className="font-semibold">Passport Number: {contractData.passportNumber}</p>
              <p className="font-semibold">Date of Birth: {contractData.dob}</p>
              <p className="font-semibold">Issue Date: {contractData.issueDate}</p>
              <p className="font-semibold">Expiration Date: {contractData.expiryDate}</p>
              <p className="font-semibold">Condo: {contractData.condoName}</p>
              <p className="font-semibold">Rental Period: {contractData.moveInDate} to {contractData.moveOutDate}</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>This is a simplified preview of the extracted data. The full 6-page contract will be generated in the PDF.</p>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={handleDownloadPdf}
                className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-red-700 transition-colors disabled:bg-red-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <FiLoader className="animate-spin" />
                    Generating PDF...
                  </>
                ) : (
                  <>
                    <FaFilePdf />
                    Download PDF Contract
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
