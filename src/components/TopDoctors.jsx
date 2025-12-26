import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="sm:w-1/2 text-center text-gray-500">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* ✅ GRID FIXED HERE */}
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pt-8 px-3 sm:px-0">
        {doctors &&
          doctors.slice(0, 8).map((item, index) => (
            <div
              key={item._id || item.doc_id || index}  // ✅ Unique key added here
              onClick={() => navigate(`/appointment/${item._id || item.doc_id}`)}
              className="bg-[#f8faff] border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full"
                src={item.image || "https://via.placeholder.com/150"}
                alt={item.name || "Doctor"}
              />

              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-green-500 mb-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available
                </div>
                <p className="font-medium text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 hover:bg-blue-100 transition"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;
