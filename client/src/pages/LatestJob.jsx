import React, { useEffect, useState } from "react";
import axios from "axios";

export default function LatestJob() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/jobs")
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch jobs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Latest Job Listings</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && (
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {jobs.length === 0 && <li className="p-4 text-center text-gray-500">No jobs found.</li>}
          {jobs.map((job, idx) => (
            <li key={job._id || idx} className="p-4 hover:bg-blue-50 transition">
              <div className="font-semibold">{job.title}</div>
              <div className="text-xs text-gray-500">Last Date: {job.lastDate}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 