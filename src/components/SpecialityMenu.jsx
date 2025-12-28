import React, { useEffect, useRef } from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";
import gsap from "gsap";

const SpecialityMenu = () => {

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef([]);

  /* 🔥 PAGE LOAD ANIMATION */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(sectionRef.current, {
      opacity: 0,
      y: 60,
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
        descRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        cardRef.current,
        {
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
      id="speciality"
    >
      <h1
        ref={titleRef}
        className="text-3xl font-medium"
      >
        Find the Speciality
      </h1>

      <p
        ref={descRef}
        className="sm:w-1/3 text-center text-sm"
      >
        Simply browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      <div className="flex sm:justify-center gap-6 pt-8 w-full overflow-x-auto px-4">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            ref={(el) => (cardRef.current[index] = el)}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                y: -14,
                scale: 1.08,
                duration: 0.4,
                ease: "power3.out",
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power3.out",
              })
            }
            className="flex flex-col items-center text-xs cursor-pointer shrink-0"
          >
            <div className="relative">
              <img
                className="w-16 sm:w-24 mb-2 transition"
                src={item.image}
                alt={item.speciality}
              />
            </div>
            <p className="font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
