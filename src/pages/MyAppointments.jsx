import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { assets } from "../assets/assets";

const MyAppointments = () => {

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const cardRef = useRef([]);

  const appointments = [
    { status: "cancel" },
    { status: "pay" },
    { status: "paid" },
  ];

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(pageRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
    })
      .from(
        titleRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.6"
      )
      .from(
        cardRef.current,
        {
          opacity: 0,
          y: 40,
          stagger: 0.2,
          duration: 0.7,
        },
        "-=0.4"
      );
  }, []);

  return (
    <div ref={pageRef} className="px-6 md:px-10 py-10 text-gray-800">

      {/* -------- TITLE -------- */}
      <h2
        ref={titleRef}
        className="text-xl font-semibold mb-6"
      >
        My Appointments
      </h2>

      <hr className="mb-8" />

      {/* -------- APPOINTMENT LIST -------- */}
      <div className="space-y-6">
        {appointments.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardRef.current[index] = el)}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1.02,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.08)",
                duration: 0.3,
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                duration: 0.3,
              })
            }
            className="flex flex-col sm:flex-row justify-between gap-6 
                       border border-gray-200 rounded-lg p-6 bg-white"
          >
            {/* LEFT */}
            <div className="flex gap-6">
              <img
                src={assets.doctor_img}
                alt="doctor"
                className="w-28 h-32 rounded-md object-cover bg-blue-50"
              />

              <div className="text-sm text-gray-600">
                <p className="font-medium text-gray-800 text-base">
                  Dr. Richard James
                </p>
                <p className="mb-2">General physician</p>

                <p className="font-medium text-gray-700">Address:</p>
                <p>
                  57th Cross, Richmond <br />
                  Circle, Church Road, London
                </p>

                <p className="mt-2">
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{" "}
                  25 July, 2024 | 8:30 PM
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col gap-3 justify-center items-start sm:items-end">
              {item.status === "pay" && (
                <button className="bg-indigo-500 text-white px-6 py-2 rounded-md text-sm hover:bg-indigo-600 transition">
                  Pay here
                </button>
              )}

              {item.status === "paid" && (
                <button className="bg-indigo-400 text-white px-6 py-2 rounded-md text-sm cursor-default">
                  Paid
                </button>
              )}

              <button className="border border-gray-400 px-6 py-2 rounded-md text-sm hover:bg-gray-100 transition">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
