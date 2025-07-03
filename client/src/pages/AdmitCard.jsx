import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdmitCard() {
  const [admitCards, setAdmitCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admit-cards")
      .then(res => {
        setAdmitCards(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch admit cards");
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold text-red-700 mb-6 text-center">Admit Cards</h1>
      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-600">{error}</div>}
      {!loading && !error && (
        <ul className="bg-white rounded-lg shadow divide-y divide-gray-200">
          {admitCards.length === 0 && <li className="p-4 text-center text-gray-500">No admit cards found.</li>}
          {admitCards.map((card, idx) => (
            <li key={card._id || idx} className="p-4 hover:bg-red-50 transition">
              <div className="font-semibold">{card.title}</div>
              <div className="text-xs text-gray-500">Available: {card.availableDate}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 