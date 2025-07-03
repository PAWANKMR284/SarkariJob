import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import LatestJob from "./pages/LatestJob";
import Result from "./pages/Result";
import AdmitCard from "./pages/AdmitCard";
import Admin from "./pages/Admin";
import JobDetail from "./pages/JobDetail";
import Login from "./pages/Login";
import axios from "axios";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [results, setResults] = useState([]);
  const [admitCards, setAdmitCards] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get("/api/jobs").then(res => setJobs(Array.isArray(res.data) ? res.data : []));
    axios.get("/api/results").then(res => setResults(Array.isArray(res.data) ? res.data : []));
    axios.get("/api/admit-cards").then(res => setAdmitCards(Array.isArray(res.data) ? res.data : []));
  }, [location.pathname]);

  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-32 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold underline text-center">
        Welcome to Sarkari Job Portal
      </h1>
      <div className="text-center mt-2 mb-4">
        <Link to="/admin" className="text-blue-600 underline font-semibold">Go to Admin Panel</Link>
      </div>
      <p className="text-center mt-4 text-sm sm:text-base">
        Your one-stop solution for government job updates.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {[
          "SSC GD",
          "SSC CGL",
          "UPSI",
          "UP RO/ARO",
          "UP Lekhpal",
          "uksssc PET",
          "UPSSSC PET 2025",
          "JSSSC 2025",
        ].map((exam) => (
          <div
            key={exam}
            className="bg-red-800 text-white text-xl sm:text-2xl md:text-3xl font-semibold h-24 rounded-xl flex items-center justify-center shadow-md hover:bg-red-700 transition"
          >
            {exam}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Latest Job Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-blue-700">Latest Job</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            {jobs.slice(0, 4).map((job) => (
              <li key={job._id} className="border-b pb-2">
                <Link to={`/job/${job._id}`} className="text-blue-700 hover:underline font-semibold">{job.title}</Link>
                <span className="block text-xs text-gray-500">Last Date: {job.lastDate}</span>
              </li>
            ))}
            {jobs.length === 0 && <li className="text-gray-400">No jobs found.</li>}
          </ul>
          <Link to="/latest-job" className="mt-4 text-blue-600 hover:underline text-sm font-semibold self-end">Show More &rarr;</Link>
        </div>
        {/* Result Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-green-700">Result</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            {results.slice(0, 4).map((result) => (
              <li key={result._id} className="border-b pb-2">
                {result.title} <span className="block text-xs text-gray-500">Released: {result.releasedDate}</span>
              </li>
            ))}
            {results.length === 0 && <li className="text-gray-400">No results found.</li>}
          </ul>
          <Link to="/result" className="mt-4 text-green-700 hover:underline text-sm font-semibold self-end">Show More &rarr;</Link>
        </div>
        {/* Admit Card Section */}
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-red-700">Admit Card</h2>
          <ul className="space-y-2 text-gray-700 text-sm">
            {admitCards.slice(0, 4).map((card) => (
              <li key={card._id} className="border-b pb-2">
                {card.title} <span className="block text-xs text-gray-500">Available: {card.availableDate}</span>
              </li>
            ))}
            {admitCards.length === 0 && <li className="text-gray-400">No admit cards found.</li>}
          </ul>
          <Link to="/admit-card" className="mt-4 text-red-700 hover:underline text-sm font-semibold self-end">Show More &rarr;</Link>
        </div>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    window.location.href = "/login";
    return null;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/latest-job" element={<LatestJob />} />
        <Route path="/result" element={<Result />} />
        <Route path="/admit-card" element={<AdmitCard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/job/:id" element={<JobDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
