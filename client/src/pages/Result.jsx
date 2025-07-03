import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Result() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/results")
      .then(res => {
        setResults(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch results");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">Results</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && (
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {results.length === 0 && <li className="p-4 text-center text-gray-500">No results found.</li>}
          {results.map((result, idx) => (
            <li key={result._id || idx} className="p-4 hover:bg-green-50 transition">
              <div className="font-semibold">{result.title}</div>
              <div className="text-xs text-gray-500">Released: {result.releasedDate}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 