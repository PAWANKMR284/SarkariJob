import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TABS = ["Jobs", "Results", "Admit Cards"];

export default function Admin() {
  const [tab, setTab] = useState("Jobs");
  // Jobs
  const [jobs, setJobs] = useState([]);
  const [jobForm, setJobForm] = useState({
    title: "",
    lastDate: "",
    applyLink: "",
    notification: "",
    essentialInfo: "",
    shortDetails: "",
    ageLimit: "",
    totalPosts: "",
    importantDates: [],
    applicationFees: [],
    vacancyDetails: [],
    howToApply: "",
    usefulLinks: [],
    faqs: [],
  });
  const [editingJob, setEditingJob] = useState(null);
  // Results
  const [results, setResults] = useState([]);
  const [resultForm, setResultForm] = useState({ title: "", releasedDate: "" });
  const [editingResult, setEditingResult] = useState(null);
  // Admit Cards
  const [admitCards, setAdmitCards] = useState([]);
  const [admitCardForm, setAdmitCardForm] = useState({ title: "", availableDate: "" });
  const [editingAdmitCard, setEditingAdmitCard] = useState(null);
  const navigate = useNavigate();

  // Get admin username from token
  let adminName = "Admin";
  try {
    const token = localStorage.getItem("adminToken");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      adminName = payload.username || "Admin";
    }
  } catch {}

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  // Fetch all data
  useEffect(() => {
    axios.get("/api/jobs").then(res => setJobs(Array.isArray(res.data) ? res.data : []));
    axios.get("/api/results").then(res => setResults(Array.isArray(res.data) ? res.data : []));
    axios.get("/api/admit-cards").then(res => setAdmitCards(Array.isArray(res.data) ? res.data : []));
  }, []);

  // --- JOBS ---
  const handleJobSubmit = e => {
    e.preventDefault();
    // Validation for array fields
    const arrayFields = [
      { name: 'importantDates', label: 'Important Dates' },
      { name: 'applicationFees', label: 'Application Fees' },
      { name: 'vacancyDetails', label: 'Vacancy Details' },
      { name: 'usefulLinks', label: 'Useful Links' },
      { name: 'faqs', label: 'FAQs' },
    ];
    for (const field of arrayFields) {
      if (!Array.isArray(jobForm[field.name])) {
        alert(`${field.label} must be an array.`);
        return;
      }
      for (const entry of jobForm[field.name]) {
        if (typeof entry !== 'object' || entry === null || Array.isArray(entry)) {
          alert(`Each entry in ${field.label} must be an object, not a string or array. Please use the Add button and fill each field separately.`);
          return;
        }
      }
    }
    console.log("Submitting jobForm:", jobForm);
    if (editingJob) {
      axios.put(`/api/jobs/${editingJob._id}`, jobForm).then(res => {
        setJobs(jobs.map(j => (j._id === editingJob._id ? res.data : j)));
        setEditingJob(null);
        setJobForm({
          title: "",
          lastDate: "",
          applyLink: "",
          notification: "",
          essentialInfo: "",
          shortDetails: "",
          ageLimit: "",
          totalPosts: "",
          importantDates: [],
          applicationFees: [],
          vacancyDetails: [],
          howToApply: "",
          usefulLinks: [],
          faqs: [],
        });
      });
    } else {
      axios.post("/api/jobs", jobForm).then(res => {
        setJobs([res.data, ...jobs]);
        setJobForm({
          title: "",
          lastDate: "",
          applyLink: "",
          notification: "",
          essentialInfo: "",
          shortDetails: "",
          ageLimit: "",
          totalPosts: "",
          importantDates: [],
          applicationFees: [],
          vacancyDetails: [],
          howToApply: "",
          usefulLinks: [],
          faqs: [],
        });
      });
    }
  };
  const handleJobDelete = id => {
    axios.delete(`/api/jobs/${id}`).then(() => setJobs(jobs.filter(j => j._id !== id)));
  };
  const handleJobEdit = job => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      lastDate: job.lastDate,
      applyLink: job.applyLink,
      notification: job.notification,
      essentialInfo: job.essentialInfo,
      shortDetails: job.shortDetails,
      ageLimit: job.ageLimit,
      totalPosts: job.totalPosts,
      importantDates: job.importantDates,
      applicationFees: job.applicationFees,
      vacancyDetails: job.vacancyDetails,
      howToApply: job.howToApply,
      usefulLinks: job.usefulLinks,
      faqs: job.faqs,
    });
  };console.log("Submitting jobForm:", jobForm);

  // --- RESULTS ---
  const handleResultSubmit = e => {
    e.preventDefault();
    if (editingResult) {
      axios.put(`/api/results/${editingResult._id}`, resultForm).then(res => {
        setResults(results.map(r => (r._id === editingResult._id ? res.data : r)));
        setEditingResult(null);
        setResultForm({ title: "", releasedDate: "" });
      });
    } else {
      axios.post("/api/results", resultForm).then(res => {
        setResults([res.data, ...results]);
        setResultForm({ title: "", releasedDate: "" });
      });
    }
  };
  const handleResultDelete = id => {
    axios.delete(`/api/results/${id}`).then(() => setResults(results.filter(r => r._id !== id)));
  };
  const handleResultEdit = result => {
    setEditingResult(result);
    setResultForm({ title: result.title, releasedDate: result.releasedDate });
  };

  // --- ADMIT CARDS ---
  const handleAdmitCardSubmit = e => {
    e.preventDefault();
    if (editingAdmitCard) {
      axios.put(`/api/admit-cards/${editingAdmitCard._id}`, admitCardForm).then(res => {
        setAdmitCards(admitCards.map(a => (a._id === editingAdmitCard._id ? res.data : a)));
        setEditingAdmitCard(null);
        setAdmitCardForm({ title: "", availableDate: "" });
      });
    } else {
      axios.post("/api/admit-cards", admitCardForm).then(res => {
        setAdmitCards([res.data, ...admitCards]);
        setAdmitCardForm({ title: "", availableDate: "" });
      });
    }
  };
  const handleAdmitCardDelete = id => {
    axios.delete(`/api/admit-cards/${id}`).then(() => setAdmitCards(admitCards.filter(a => a._id !== id)));
  };
  const handleAdmitCardEdit = admitCard => {
    setEditingAdmitCard(admitCard);
    setAdmitCardForm({ title: admitCard.title, availableDate: admitCard.availableDate });
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-semibold text-blue-700">Welcome, {adminName}</div>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold transition">Logout</button>
      </div>
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-800 tracking-tight drop-shadow">Admin Panel</h1>
      <div className="flex justify-center mb-8 space-x-4">
        {TABS.map(t => (
          <button
            key={t}
            className={`px-6 py-2 rounded-full font-semibold shadow transition-all duration-200 border-2 ${tab === t ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white border-blue-600 scale-105" : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50"}`}
            onClick={() => { setTab(t); setEditingJob(null); setEditingResult(null); setEditingAdmitCard(null); }}
          >
            {t}
          </button>
        ))}
      </div>
      {/* JOBS TAB */}
      {tab === "Jobs" && (
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-6 text-blue-700 border-b pb-2">Manage Jobs</h2>
          <form onSubmit={handleJobSubmit} className="mb-6 flex flex-col gap-3 items-center">
            <input
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Job Title"
              value={jobForm.title}
              onChange={e => setJobForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Last Date"
              value={jobForm.lastDate}
              onChange={e => setJobForm(f => ({ ...f, lastDate: e.target.value }))}
              required
            />
            <input
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Apply Link (URL)"
              value={jobForm.applyLink || ''}
              onChange={e => setJobForm(f => ({ ...f, applyLink: e.target.value }))}
            />
            <input
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Notification Link (URL)"
              value={jobForm.notification || ''}
              onChange={e => setJobForm(f => ({ ...f, notification: e.target.value }))}
            />
            <textarea
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Essential Information (optional)"
              value={jobForm.essentialInfo || ''}
              onChange={e => setJobForm(f => ({ ...f, essentialInfo: e.target.value }))}
              rows={3}
            />
            <textarea
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Short Details"
              value={jobForm.shortDetails || ''}
              onChange={e => setJobForm(f => ({ ...f, shortDetails: e.target.value }))}
              rows={2}
            />
            <input
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Total Posts"
              value={jobForm.totalPosts || ''}
              onChange={e => setJobForm(f => ({ ...f, totalPosts: e.target.value }))}
              type="text"
            />
            <textarea
              className="border px-3 py-2 rounded-lg w-full focus:ring-2 focus:ring-blue-300"
              placeholder="Age Limit"
              value={jobForm.ageLimit || ''}
              onChange={e => setJobForm(f => ({ ...f, ageLimit: e.target.value }))}
              rows={2}
            />
            {/* Dynamic Important Dates */}
            <div className="w-full mb-2">
              <label className="font-semibold">Important Dates</label>
              {jobForm.importantDates.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Label (e.g. Application Start)"
                    value={item.label}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.importantDates];
                      arr[idx].label = e.target.value;
                      return { ...f, importantDates: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Value (e.g. 01 July 2025)"
                    value={item.value}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.importantDates];
                      arr[idx].value = e.target.value;
                      return { ...f, importantDates: arr };
                    })}
                  />
                  <button type="button" className="text-red-600 font-bold" onClick={() => setJobForm(f => ({ ...f, importantDates: f.importantDates.filter((_, i) => i !== idx) }))}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-600 font-bold" onClick={() => setJobForm(f => ({ ...f, importantDates: [...f.importantDates, { label: "", value: "" }] }))}>Add Date</button>
            </div>
            {/* Dynamic Application Fees */}
            <div className="w-full mb-2">
              <label className="font-semibold">Application Fees</label>
              {jobForm.applicationFees.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Label (e.g. General / OBC)"
                    value={item.label}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.applicationFees];
                      arr[idx].label = e.target.value;
                      return { ...f, applicationFees: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Value (e.g. ₹850)"
                    value={item.value}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.applicationFees];
                      arr[idx].value = e.target.value;
                      return { ...f, applicationFees: arr };
                    })}
                  />
                  <button type="button" className="text-red-600 font-bold" onClick={() => setJobForm(f => ({ ...f, applicationFees: f.applicationFees.filter((_, i) => i !== idx) }))}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-600 font-bold" onClick={() => setJobForm(f => ({ ...f, applicationFees: [...f.applicationFees, { label: "", value: "" }] }))}>Add Fee</button>
            </div>
            {/* Dynamic Vacancy Details */}
            <div className="w-full mb-2">
              <label className="font-semibold">Vacancy Details</label>
              {jobForm.vacancyDetails.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Post Name"
                    value={item.post}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.vacancyDetails];
                      arr[idx].post = e.target.value;
                      return { ...f, vacancyDetails: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Total"
                    value={item.total}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.vacancyDetails];
                      arr[idx].total = e.target.value;
                      return { ...f, vacancyDetails: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Eligibility"
                    value={item.eligibility}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.vacancyDetails];
                      arr[idx].eligibility = e.target.value;
                      return { ...f, vacancyDetails: arr };
                    })}
                  />
                  <button type="button" className="text-red-600 font-bold" onClick={() => setJobForm(f => ({ ...f, vacancyDetails: f.vacancyDetails.filter((_, i) => i !== idx) }))}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-600 font-bold" onClick={() => setJobForm(f => ({ ...f, vacancyDetails: [...f.vacancyDetails, { post: "", total: "", eligibility: "" }] }))}>Add Vacancy</button>
            </div>
            {/* Dynamic Useful Links */}
            <div className="w-full mb-2">
              <label className="font-semibold">Useful Links</label>
              {jobForm.usefulLinks.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Label (e.g. Official Website)"
                    value={item.label}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.usefulLinks];
                      arr[idx].label = e.target.value;
                      return { ...f, usefulLinks: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="URL"
                    value={item.url}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.usefulLinks];
                      arr[idx].url = e.target.value;
                      return { ...f, usefulLinks: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Type (apply, notification, etc.)"
                    value={item.type}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.usefulLinks];
                      arr[idx].type = e.target.value;
                      return { ...f, usefulLinks: arr };
                    })}
                  />
                  <button type="button" className="text-red-600 font-bold" onClick={() => setJobForm(f => ({ ...f, usefulLinks: f.usefulLinks.filter((_, i) => i !== idx) }))}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-600 font-bold" onClick={() => setJobForm(f => ({ ...f, usefulLinks: [...f.usefulLinks, { label: "", url: "", type: "" }] }))}>Add Link</button>
            </div>
            {/* Dynamic FAQs */}
            <div className="w-full mb-2">
              <label className="font-semibold">FAQs</label>
              {jobForm.faqs.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-1">
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Question"
                    value={item.question}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.faqs];
                      arr[idx].question = e.target.value;
                      return { ...f, faqs: arr };
                    })}
                  />
                  <input
                    className="border px-2 py-1 rounded flex-1"
                    placeholder="Answer"
                    value={item.answer}
                    onChange={e => setJobForm(f => {
                      const arr = [...f.faqs];
                      arr[idx].answer = e.target.value;
                      return { ...f, faqs: arr };
                    })}
                  />
                  <button type="button" className="text-red-600 font-bold" onClick={() => setJobForm(f => ({ ...f, faqs: f.faqs.filter((_, i) => i !== idx) }))}>Remove</button>
                </div>
              ))}
              <button type="button" className="text-blue-600 font-bold" onClick={() => setJobForm(f => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }))}>Add FAQ</button>
            </div>
            <div className="flex gap-2 w-full justify-end">
              <button className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 ${editingJob ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`} type="submit">
                {editingJob ? "Update" : "Add"}
              </button>
              {editingJob && (
                <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200" onClick={() => { setEditingJob(null); setJobForm({
                  title: "",
                  lastDate: "",
                  applyLink: "",
                  notification: "",
                  essentialInfo: "",
                  shortDetails: "",
                  ageLimit: "",
                  totalPosts: "",
                  importantDates: [],
                  applicationFees: [],
                  vacancyDetails: [],
                  howToApply: "",
                  usefulLinks: [],
                  faqs: [],
                }); }}>Cancel</button>
              )}
            </div>
          </form>
          <ul className="divide-y divide-gray-200">
            {jobs.map(job => (
              <li key={job._id} className="py-4 flex justify-between items-center group hover:bg-blue-50 transition-all rounded-lg px-2">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{job.title}</div>
                  <div className="text-xs text-gray-500">Last Date: {job.lastDate}</div>
                </div>
                <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-blue-600 hover:underline font-semibold" onClick={() => handleJobEdit(job)}>Edit</button>
                  <button className="text-red-600 hover:underline font-semibold" onClick={() => handleJobDelete(job._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* RESULTS TAB */}
      {tab === "Results" && (
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-6 text-green-700 border-b pb-2">Manage Results</h2>
          <form onSubmit={handleResultSubmit} className="mb-6 flex flex-col md:flex-row gap-3 items-center">
            <input
              className="border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-green-300"
              placeholder="Result Title"
              value={resultForm.title}
              onChange={e => setResultForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              className="border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-green-300"
              placeholder="Released Date"
              value={resultForm.releasedDate}
              onChange={e => setResultForm(f => ({ ...f, releasedDate: e.target.value }))}
              required
            />
            <button className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 ${editingResult ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`} type="submit">
              {editingResult ? "Update" : "Add"}
            </button>
            {editingResult && (
              <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200" onClick={() => { setEditingResult(null); setResultForm({ title: "", releasedDate: "" }); }}>Cancel</button>
            )}
          </form>
          <ul className="divide-y divide-gray-200">
            {results.map(result => (
              <li key={result._id} className="py-4 flex justify-between items-center group hover:bg-green-50 transition-all rounded-lg px-2">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{result.title}</div>
                  <div className="text-xs text-gray-500">Released: {result.releasedDate}</div>
                </div>
                <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-blue-600 hover:underline font-semibold" onClick={() => handleResultEdit(result)}>Edit</button>
                  <button className="text-red-600 hover:underline font-semibold" onClick={() => handleResultDelete(result._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
      {/* ADMIT CARDS TAB */}
      {tab === "Admit Cards" && (
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 animate-fade-in">
          <h2 className="text-xl font-bold mb-6 text-red-700 border-b pb-2">Manage Admit Cards</h2>
          <form onSubmit={handleAdmitCardSubmit} className="mb-6 flex flex-col md:flex-row gap-3 items-center">
            <input
              className="border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-red-300"
              placeholder="Admit Card Title"
              value={admitCardForm.title}
              onChange={e => setAdmitCardForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              className="border px-3 py-2 rounded-lg flex-1 focus:ring-2 focus:ring-red-300"
              placeholder="Available Date"
              value={admitCardForm.availableDate}
              onChange={e => setAdmitCardForm(f => ({ ...f, availableDate: e.target.value }))}
              required
            />
            <button className={`px-6 py-2 rounded-lg font-bold transition-all duration-200 ${editingAdmitCard ? "bg-green-600 hover:bg-green-700 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`} type="submit">
              {editingAdmitCard ? "Update" : "Add"}
            </button>
            {editingAdmitCard && (
              <button type="button" className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-bold transition-all duration-200" onClick={() => { setEditingAdmitCard(null); setAdmitCardForm({ title: "", availableDate: "" }); }}>Cancel</button>
            )}
          </form>
          <ul className="divide-y divide-gray-200">
            {admitCards.map(admitCard => (
              <li key={admitCard._id} className="py-4 flex justify-between items-center group hover:bg-red-50 transition-all rounded-lg px-2">
                <div>
                  <div className="font-semibold text-lg text-gray-800">{admitCard.title}</div>
                  <div className="text-xs text-gray-500">Available: {admitCard.availableDate}</div>
                </div>
                <div className="space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="text-blue-600 hover:underline font-semibold" onClick={() => handleAdmitCardEdit(admitCard)}>Edit</button>
                  <button className="text-red-600 hover:underline font-semibold" onClick={() => handleAdmitCardDelete(admitCard._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
} 