import React from "react";

function App() {
  return (
    <div className="px-4 sm:px-10 md:px-20 lg:px-32 py-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold underline text-center">
        Welcome to Sarkari Job Portal
      </h1>
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
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 mt-10">
        <div className="flex-1 font-bold text-center bg-blue-500 text-white rounded-lg py-4 hover:bg-blue-700 transition">
          Results
        </div>
        <div className="flex-1 font-bold text-center bg-blue-500 text-white rounded-lg py-4 hover:bg-blue-700 transition">
          Admit Cards
        </div>
        <div className="flex-1 font-bold text-center bg-blue-500 text-white rounded-lg py-4 hover:bg-blue-700 transition">
          Latest Job
        </div>
      </div>
    </div>
  );
}

export default App;
