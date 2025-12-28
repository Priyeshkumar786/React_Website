import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { assets } from "../assets/assets";

const Contact = () => {

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const officeRef = useRef(null);
  const careerRef = useRef(null);
  const btnRef = useRef(null);

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
          y: 30,
          duration: 0.6,
        },
        "-=0.6"
      )
      .from(
        imgRef.current,
        {
          opacity: 0,
          x: -80,
          scale: 0.9,
          duration: 0.9,
        },
        "-=0.5"
      )
      .from(
        officeRef.current,
        {
          opacity: 0,
          x: 60,
          duration: 0.7,
        },
        "-=0.7"
      )
      .from(
        careerRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        btnRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );
  }, []);

  return (
    <div
      ref={pageRef}
      className="px-6 md:px-10 my-16 text-gray-800"
    >

      {/* ---------- TITLE ---------- */}
      <h1
        ref={titleRef}
        className="text-center text-2xl font-semibold mb-12"
      >
        CONTACT <span className="text-gray-600">US</span>
      </h1>

      {/* ---------- CONTENT ---------- */}
      <div className="flex flex-col md:flex-row gap-12 items-start">

        {/* IMAGE */}
        <img
          ref={imgRef}
          src={assets.contact_image}
          alt="contact"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />

        {/* RIGHT CONTENT */}
        <div className="md:w-1/2 text-sm text-gray-600 space-y-8">

          {/* OFFICE INFO */}
          <div ref={officeRef}>
            <p className="font-semibold text-gray-800 mb-2">OUR OFFICE</p>
            <p>Chankyapuri Chunabhatti Bhopal</p>
            <p>Bhopal Pin:  462016 </p>
            <p className="mt-2">Tel: 62-62-4-62-199</p>
            <p>Email: mishrapriyesh.521@gmail.com</p>
          </div>

          {/* CAREERS */}
          <div ref={careerRef}>
            <p className="font-semibold text-gray-800 mb-2">
              CAREERS AT PARASVITALS
            </p>
            <p className="mb-4">
              Learn more about our teams and job openings.
            </p>

            <button
              ref={btnRef}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  boxShadow: "0px 10px 30px rgba(0,0,0,0.25)",
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
              className="border border-gray-400 px-6 py-2 rounded 
                         text-gray-700 hover:bg-gray-100 transition"
            >
              Explore Jobs
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
