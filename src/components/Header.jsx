import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";

const Header = () => {

  const headerRef = useRef(null);
  const textRef = useRef(null);
  const infoRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  /* 🔥 HERO LOAD ANIMATION */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(headerRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
    })
      .from(
        textRef.current,
        {
          opacity: 0,
          y: 40,
          duration: 0.8,
        },
        "-=0.6"
      )
      .from(
        infoRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.6"
      )
      .from(
        btnRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.5"
      )
      .from(
        imgRef.current,
        {
          opacity: 0,
          x: 80,
          scale: 0.9,
          duration: 1,
        },
        "-=0.8"
      );
  }, []);

  return (
    <div
      ref={headerRef}
      className="flex flex-col md:flex-row flex-wrap 
                 bg-amber-600 rounded-lg px-6 md:px-10 
                 overflow-hidden"
    >
      {/* -------- LEFT -------- */}
      <div className="md:w-1/2 flex flex-col items-start gap-4 
                      py-10 m-auto md:py-[10vw] md:-mb-7.5">

        <p
          ref={textRef}
          className="text-3xl md:text-4xl lg:text-5xl 
                     text-white font-semibold leading-tight"
        >
          Book Appointment <br /> With Trusted Doctors
        </p>

        <div
          ref={infoRef}
          className="flex flex-col md:flex-row items-center gap-3 
                     text-white text-sm font-light"
        >
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          ref={btnRef}
          href="#speciality"
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
          className="flex items-center gap-2 bg-white px-8 py-3 
                     rounded-full text-gray-600 text-sm 
                     m-auto md:m-0"
        >
          Book appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* -------- RIGHT -------- */}
      <div className="md:w-1/2 relative">
        <img
          ref={imgRef}
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt="header"
        />
      </div>
    </div>
  );
};

export default Header;
