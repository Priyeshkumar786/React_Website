import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Banner = () => {

  const navigate = useNavigate();

  const bannerRef = useRef(null);
  const textRef = useRef(null);
  const subTextRef = useRef(null);
  const btnRef = useRef(null);
  const imgRef = useRef(null);

  /* 🔥 BANNER LOAD ANIMATION */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(bannerRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
    })
      .from(
        textRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
        },
        "-=0.6"
      )
      .from(
        subTextRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.7,
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
      )
      .from(
        imgRef.current,
        {
          opacity: 0,
          x: 60,
          scale: 0.9,
          duration: 0.9,
        },
        "-=0.8"
      );
  }, []);

  return (
    <div
      ref={bannerRef}
      className="flex bg-amber-600 rounded-lg px-6 sm:px-14 lg:px-12 
                 my-20 md:mx-10 overflow-hidden relative"
    >
      {/* ----- LEFT ----- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div
          ref={textRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl 
                     font-semibold text-white"
        >
          <p>Book Appointment</p>
        </div>

        <p
          ref={subTextRef}
          className="mt-4 text-white text-lg sm:text-xl"
        >
          With 100+ Trusted Doctors
        </p>

        <button
          ref={btnRef}
          onClick={() => {
            navigate("/login");
            scrollTo(0, 0);
          }}
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
          className="bg-white text-sm sm:text-base text-gray-600 
                     px-8 py-3 rounded-full mt-6"
        >
          Create account
        </button>
      </div>

      {/* ----- RIGHT ----- */}
      <div className="hidden md:block md:w-1/2 lg:w-92.5 relative">
        <img
          ref={imgRef}
          className="w-80 absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt="appointment"
        />
      </div>
    </div>
  );
};

export default Banner;
