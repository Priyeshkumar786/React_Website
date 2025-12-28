import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import gsap from "gsap";
import { Search, Stethoscope } from "lucide-react";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const { doctors = [] } = useContext(AppContext);

  const decodedSpeciality = speciality ? decodeURIComponent(speciality) : "";

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDoc, setFilterDoc] = useState([]);

  /* 🔹 UNIQUE SPECIALITIES */
  const specialities = [
    ...new Set(
      doctors
        .map(d => d?.speciality)
        .filter(Boolean)
    ),
  ];

  /* ================= GSAP REFS ================= */
  const pageRef = useRef(null);
  const cardRefs = useRef([]);

  /* ================= FILTER + SEARCH ================= */
  useEffect(() => {
    let data = [...doctors];

    if (decodedSpeciality) {
      data = data.filter(
        d =>
          d?.speciality?.toLowerCase().trim() ===
          decodedSpeciality.toLowerCase().trim()
      );
    }

    if (searchTerm.trim()) {
      data = data.filter(
        d =>
          d?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d?.speciality?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilterDoc(data);
    cardRefs.current = []; // reset refs
  }, [doctors, decodedSpeciality, searchTerm]);

  /* ================= PAGE FADE ================= */
  useEffect(() => {
    gsap.fromTo(
      pageRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1 }
    );
  }, []);

  /* ================= CARD ANIMATION ================= */
  useEffect(() => {
    if (filterDoc.length) {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
        }
      );
    }
  }, [filterDoc]);

  return (
    <div
      ref={pageRef}
      className="min-h-screen px-6 md:px-16 py-12 bg-[#fafcfe]"
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col lg:flex-row justify-between gap-10 mb-16">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm uppercase">
            <Stethoscope size={18} />
            Premium Healthcare
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold mt-2">
            Find Your <span className="text-amber-500">Specialist</span>
          </h2>

          <p className="text-slate-500 mt-2 max-w-md">
            Expert doctors across all specialities, just a click away.
          </p>
        </div>

        {/* ================= SEARCH ================= */}
        <div className="w-full lg:w-96">
          <div className="flex items-center bg-white rounded-xl border px-4 py-3 shadow-sm">
            <Search size={20} className="text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by name or speciality"
              className="w-full px-3 outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* ================= SIDEBAR ================= */}
        <div className="w-full md:w-72">
          <h3 className="text-xs font-bold text-slate-400 uppercase mb-4">
            Filter Speciality
          </h3>

          <div className="space-y-3">
            {specialities.map((spec, index) => (
              <div
                key={index}
                onClick={() =>
                  navigate(
                    decodedSpeciality === spec
                      ? "/doctors"
                      : `/doctors/${encodeURIComponent(spec)}`
                  )
                }
                className={`cursor-pointer px-4 py-3 rounded-lg font-medium transition
                  ${
                    decodedSpeciality === spec
                      ? "bg-amber-600 text-white"
                      : "bg-white hover:bg-blue-50 text-slate-600"
                  }`}
              >
                {spec}
              </div>
            ))}
          </div>
        </div>

        {/* ================= DOCTORS GRID ================= */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filterDoc.length ? (
            filterDoc.map((doc, index) => (
              <div
                key={doc?._id || index}
                ref={el => (cardRefs.current[index] = el)}
                onClick={() => navigate(`/appointment/${doc?._id}`)}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer"
              >
                <img
                  src={doc?.image}
                  alt={doc?.name}
                  className="w-full h-56 object-cover rounded-t-2xl"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold">
                    {doc?.name}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    {doc?.speciality}
                  </p>

                  <button className="mt-4 w-full py-2 bg-amber-500 text-white rounded-lg">
                    Book Appointment
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <Search size={48} className="mx-auto text-slate-300" />
              <p className="mt-4 text-slate-400 text-lg">
                No doctors found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
