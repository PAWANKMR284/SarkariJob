import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/jobs/${id}`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Job not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!job) return null;

  // Debug: show job object for troubleshooting
  // Remove/comment this out in production
  // console.log(job);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-800">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Home</Link>
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold">{job.title}</h1>
        {job.notificationDate && <p className="text-gray-500">Updated on {job.notificationDate}</p>}
      </div>

      <div className="space-y-4">
        {job.shortDetails && (
          <p className="font-semibold text-red-600">{job.shortDetails}</p>
        )}

        {/* Short Details (fallback for old jobs) */}
        {job.shortDetails === undefined && job.essentialInfo && (
          <p className="font-semibold text-red-600">{job.essentialInfo}</p>
        )}

        {/* Important Dates */}
        {Array.isArray(job.importantDates) && job.importantDates.length > 0 && (
          <div className="border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-center">Important Dates</h2>
            <ul className="list-disc pl-5">
              {job.importantDates.map((d, i) => (
                <li key={i}>{d.label}: {d.value}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Application Fees */}
        {Array.isArray(job.applicationFees) && job.applicationFees.length > 0 && (
          <div className="border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-center">Application Fees</h2>
            <ul className="list-disc pl-5">
              {job.applicationFees.map((f, i) => (
                <li key={i}>{f.label}: {f.value}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Age Limit */}
        {job.ageLimit && (
          <div className="border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-center">Age Limit</h2>
            <ul className="list-disc pl-5">
              {job.ageLimit.split('\n').map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Vacancy Details */}
        {Array.isArray(job.vacancyDetails) && job.vacancyDetails.length > 0 && (
          <div className="border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-center">Vacancy Details</h2>
            <p className="text-center italic">
              {job.totalPosts ? `Total Post: ${job.totalPosts}` : "Total Post: NA in Notification"}
            </p>
            <ul className="list-disc pl-5">
              {job.vacancyDetails.map((v, i) => (
                <li key={i}>
                  Post Name: {v.post}
                  <ul className="list-disc pl-5">
                    <li>Eligibility: {v.eligibility}</li>
                    {v.total && <li>Total: {v.total}</li>}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* How to Fill Form */}
        {job.howToApply && (
          <div className="border p-4 rounded bg-gray-100">
            <h2 className="font-semibold text-center">How to Fill {job.title} Form</h2>
            <ul className="list-disc pl-5">
              {job.howToApply.split('\n').map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Useful Links */}
        <div className="text-center space-y-2">
          {job.applyLink && (
            <a href={job.applyLink} className="block text-blue-600 font-semibold" target="_blank" rel="noopener noreferrer">
              Apply Online - CLICK HERE
            </a>
          )}
          {job.notification && (
            <a href={job.notification} className="block text-blue-600 font-semibold" target="_blank" rel="noopener noreferrer">
              Download Notification - CLICK HERE
            </a>
          )}
          {Array.isArray(job.usefulLinks) && job.usefulLinks.map((link, i) => (
            <a key={i} href={link.url} className="block text-blue-600 font-semibold" target="_blank" rel="noopener noreferrer">
              {link.label} - CLICK HERE
            </a>
          ))}
        </div>

        {/* FAQs */}
        {Array.isArray(job.faqs) && job.faqs.length > 0 && (
          <div className="mt-8 border-t pt-4">
            <h3 className="font-semibold text-lg mb-2">{job.title} FAQs</h3>
            <ul className="list-disc pl-5">
              {job.faqs.map((faq, i) => (
                <li key={i}>
                  <strong>Q:</strong> {faq.question}<br />
                  <strong>A:</strong> {faq.answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 