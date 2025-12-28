import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import gsap from "gsap";

const Appointment = () => {

  const { docId } = useParams();
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const doctor = doctors.find(d => d._id === docId);
  const relatedDoctors = doctors.filter(
    d => d.speciality === doctor?.speciality && d._id !== docId
  );

  const [selectedSlot, setSelectedSlot] = useState(null);

  // GSAP refs
  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const slotRef = useRef([]);
  const relatedRef = useRef([]);

  /* =================== PAGE + MEDICAL STYLE ANIMATION =================== */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Page calm entry
    tl.from(pageRef.current, {
      opacity: 0,
      y: 60,
      duration: 1,
    })

      // Doctor card gentle rise (trust feeling)
      .from(cardRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
      }, "-=0.6")

      // Doctor image – stethoscope-like swing
      .from(imageRef.current, {
        rotation: -6,
        transformOrigin: "top center",
        duration: 1.2,
        ease: "elastic.out(1, 0.4)",
      }, "-=0.5")

      // Slots calm stagger
      .from(slotRef.current, {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.4,
      }, "-=0.4")

      // Related doctors
      .from(relatedRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
      }, "-=0.2");

    // Doctor card breathing effect (hospital calm)
    gsap.to(cardRef.current, {
      scale: 1.01,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
    });

  }, []);

  /* =================== HEARTBEAT EFFECT ON SLOT =================== */
  useEffect(() => {
    if (selectedSlot !== null) {
      const index = ["10:00","11:00","12:00","01:00","02:00","03:00","04:00"]
        .indexOf(selectedSlot);

      if (slotRef.current[index]) {
        gsap.fromTo(
          slotRef.current[index],
          { scale: 1 },
          {
            scale: 1.12,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          }
        );
      }
    }
  }, [selectedSlot]);

  if (!doctor) return null;

  const slots = ["10:00", "11:00", "12:00", "01:00", "02:00", "03:00", "04:00"];

  return (
    <div ref={pageRef} className="px-6 md:px-10 py-10">

      {/* ================= DOCTOR CARD ================= */}
      <div
        ref={cardRef}
        className="flex flex-col md:flex-row gap-8 bg-white 
                   border border-gray-200 rounded-xl p-6"
      >
        {/* IMAGE */}
        <img
          ref={imageRef}
          src={doctor.image}
          alt={doctor.name}
          className="w-full md:w-72 h-80 object-cover rounded-lg bg-blue-50"
        />

        {/* CONTENT */}
        <div className="flex-1">

          <h2 className="text-xl font-semibold flex items-center gap-2">
            {doctor.name}
            <span className="text-blue-500 text-sm">✔</span>
          </h2>

          <p className="text-gray-500 mb-4">{doctor.speciality}</p>

          <p className="text-sm text-gray-600 mb-4">
            {doctor.about ||
              "Experienced medical professional dedicated to patient care and wellbeing."}
          </p>

          <p className="text-sm font-medium text-gray-700 mb-3">
            Appointment fee: <span className="text-gray-900">$50</span>
          </p>

          {/* ================= SLOTS ================= */}
          <p className="font-medium mb-2">Booking slots</p>

          <div className="flex flex-wrap gap-3 mb-6">
            {slots.map((slot, index) => (
              <button
                key={index}
                ref={(el) => (slotRef.current[index] = el)}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-full border text-sm transition
                  ${
                    selectedSlot === slot
                      ? "bg-blue-500 text-white border-blue-500 shadow-lg"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {slot}
              </button>
            ))}
          </div>

          <button
            onClick={() => navigate('./booking') }
            className="bg-blue-500 text-white px-8 py-3 rounded-full 
                       hover:bg-blue-600 transition shadow-lg"
          >
            Book appointment
          </button>
        </div>
      </div>

      {/* ================= RELATED DOCTORS ================= */}
      <div className="mt-16">
        <h3 className="text-lg font-semibold mb-6">
          Related Doctors
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {relatedDoctors.map((doc, index) => (
            <div
              key={doc._id}
              ref={(el) => (relatedRef.current[index] = el)}
              onClick={() => navigate(`/appointment/${doc._id}`)}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  y: -8,
                  scale: 1.04,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.12)",
                  duration: 0.3,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  y: 0,
                  scale: 1,
                  boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                  duration: 0.3,
                })
              }
              className="bg-[#f4f9ff] border border-blue-200 rounded-xl 
                         overflow-hidden cursor-pointer"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-full h-48 object-cover bg-blue-50"
              />

              <div className="p-4 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-green-500 mb-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Available
                </div>

                <p className="font-medium text-gray-800">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Appointment;
