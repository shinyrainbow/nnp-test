'use client'
import { useState } from 'react';

export default function AddProperties() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleCreateProperties = async () => {
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const response = await fetch('/api/add-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(properties),
        body: "",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong with the API call.');
      }

      const data = await response.json();
      setMessage(data.message);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Create Projects</h1>


        <button
          onClick={handleCreateProperties}
          disabled={loading}
          className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? 'Creating...' : 'Send Data to API'}
        </button>

        {/* Display messages based on the state */}
        {loading && (
          <p className="mt-4 text-gray-600">Creating projects, please wait...</p>
        )}
        {error && (
          <p className="mt-4 text-red-600 font-medium">Error: {error}</p>
        )}
        {message && (
          <p className="mt-4 text-green-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
