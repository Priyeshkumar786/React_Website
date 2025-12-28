import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { assets } from "../assets/assets";

const About = () => {

  const pageRef = useRef(null);
  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const textRef = useRef(null);
  const cardRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(pageRef.current, {
      opacity: 1,
      y: 80,
      duration: 1,
    })
      .from(
        titleRef.current,
        {
          opacity: 1,
          y: 30,
          duration: 0.7,
        },
        "-=0.6"
      )
      .from(
        imgRef.current,
        {
          opacity: 1,
          x: -80,
          scale: 0.9,
          duration: 0.9,
        },
        "-=0.6"
      )
      .from(
        textRef.current,
        {
          opacity: 1,
          x: 60,
          duration: 0.8,
        },
        "-=0.8"
      )
      .from(
        cardRef.current,
        {
          opacity: 100,
          y: 40,
          stagger: 0.2,
          duration: 0.7,
        },
        "-=0.4"
      );
  }, []);

  return (
    <div ref={pageRef} className="px-6 md:px-10 my-16 text-gray-800">

      {/* ---------- TITLE ---------- */}
      <h1
        ref={titleRef}
        className="text-center text-2xl font-semibold mb-10"
      >
        ABOUT <span className="text-gray-600">US</span>
      </h1>

      {/* ---------- TOP SECTION ---------- */}
      <div className="flex flex-col md:flex-row gap-10 items-center">

        {/* IMAGE */}
        <img
          ref={imgRef}
          src={assets.about_image}
          alt="about"
          className="w-full md:w-1/2 rounded-lg shadow-md"
        />

        {/* TEXT */}
        <div ref={textRef} className="md:w-1/2 text-sm leading-6 text-gray-600">
          <p className="mb-4">
            Welcome to <span className="font-medium text-gray-800">PARASVITALS</span>,
            your trusted partner in managing your healthcare needs conveniently
            and efficiently.
          </p>

          <p className="mb-4">
            ParasVitals is committed to excellence in healthcare technology.
            We continuously strive to enhance our platform by integrating the
            latest advancements to improve user experience.
          </p>

          <p className="font-medium text-gray-800 mt-6 mb-2">
            Our Vision
          </p>

          <p>
            Our vision is to create a seamless healthcare experience for every
            user. We aim to bridge the gap between patients and healthcare
            providers, making it easier for you to access the care you need.
          </p>
        </div>
      </div>

      {/* ---------- WHY CHOOSE US ---------- */}
      <div className="mt-20">
        <h2 className="text-xl font-semibold mb-8">
          WHY <span className="text-gray-600">CHOOSE US</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "EFFICIENCY",
              desc: "Streamlined appointment scheduling that fits into your busy lifestyle.",
            },
            {
              title: "CONVENIENCE",
              desc: "Access to a network of trusted healthcare professionals near you.",
            },
            {
              title: "PERSONALIZATION",
              desc: "Tailored recommendations and reminders to help you stay on top of your health.",
            },
          ].map((item, index) => (
            <div
              key={index}
              ref={(el) => (cardRef.current[index] = el)}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  y: -10,
                  scale: 1.05,
                  boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
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
              className="border border-gray-200 rounded-lg p-6 cursor-pointer bg-white"
            >
              <p className="font-semibold mb-3">{item.title}</p>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
