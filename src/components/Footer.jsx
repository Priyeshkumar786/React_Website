import React, { useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import gsap from "gsap";

const Footer = () => {

  const footerRef = useRef(null);
  const logoRef = useRef(null);
  const leftTextRef = useRef(null);
  const colRef = useRef([]);
  const copyRef = useRef(null);

  /* 🔥 FOOTER REVEAL ANIMATION */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(footerRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
    })
      .from(
        logoRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
        },
        "-=0.6"
      )
      .from(
        leftTextRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        colRef.current,
        {
          opacity: 0,
          y: 30,
          stagger: 0.2,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        copyRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.4,
        },
        "-=0.3"
      );
  }, []);

  return (
    <div ref={footerRef} className="md:mx-10 mt-40">

      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] 
                      gap-14 my-10 text-sm">

        {/* ------ LEFT ------ */}
        <div>
          <img
            ref={logoRef}
            className="mb-5 w-40"
            src={assets.parasvitals_logo}
            alt="logo"
          />

          <p
            ref={leftTextRef}
            className="w-full md:w-2/3 text-gray-600 leading-6"
          >
            ParasVitals is a modern doctor appointment platform that connects patients with verified doctors, enabling easy online appointment booking, secure consultations, and better healthcare management.
          </p>
        </div>

        {/* ------ CENTER ------ */}
        <div ref={(el) => (colRef.current[0] = el)}>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            {["Home", "About", "Contact us", "Privacy policy"].map(
              (item, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:translate-x-2 
                             transition-all duration-300 hover:text-black"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </div>

        {/* ------ RIGHT ------ */}
        <div ref={(el) => (colRef.current[1] = el)}>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li className="hover:translate-x-2 transition-all duration-300">
             Priyesh Kumar Mishra <br /> mishrapriyesh.521@gmail.com <br /> Mob.No. - 6262462199 <br />
            </li>
            <li className="hover:translate-x-2 transition-all duration-300">
                Chankyapuri Chunabhatti Bhopal            </li>
          </ul>
        </div>
      </div>

      {/* -------- COPYRIGHT -------- */}
      <div>
        <hr />
        <p
          ref={copyRef}
          className="py-5 text-sm text-center text-gray-500"
        >
          Copyright © 2025 Parasvitals – All Rights Reserved.
        </p>
      </div>

    </div>
  );
};

export default Footer;
