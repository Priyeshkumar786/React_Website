import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import gsap from "gsap";

const TopDoctors = () => {

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef([]);
  const btnRef = useRef(null);

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
          stagger: 0.12,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        btnRef.current,
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  }, []);

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10"
    >
      <h1 ref={titleRef} className="text-3xl font-medium">
        Top Doctors to Book
      </h1>

      <p
        ref={descRef}
        className="sm:w-1/3 text-center text-sm text-gray-500"
      >
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* DOCTORS GRID */}
      <div
        className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
                   gap-6 pt-8 px-3 sm:px-0"
      >
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={item._id}
            ref={(el) => (cardRef.current[index] = el)}
            onClick={() => navigate(`/appointment/${item._id}`)}
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                y: -14,
                scale: 1.05,
                boxShadow: "0px 20px 40px rgba(0,0,0,0.15)",
                duration: 0.4,
                ease: "power3.out",
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                y: 0,
                scale: 1,
                boxShadow: "0px 0px 0px rgba(0,0,0,0)",
                duration: 0.4,
                ease: "power3.out",
              })
            }
            className="bg-[#e9d7dc] border border-amber-600 rounded-xl
                       overflow-hidden cursor-pointer"
          >
            <img className="bg-amber-50 w-full" src={item.image} alt="" />

            <div className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 text-sm text-green-500 mb-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Available
              </div>

              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MORE BUTTON */}





<button onClick={()=>{ navigate('/doctors'); scrollTo(0,0) }} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10
                         hover:bg-blue-100 transition">MORE</button>





      {/* <button
  ref={btnRef}
  onClick={() => {
    navigate("/doctors");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
  onMouseEnter={(e) =>
    gsap.to(e.currentTarget, {
      scale: 1.08,
      duration: 0.3,
    })
  }
  onMouseLeave={(e) =>
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
    })
  }
  className="
    bg-amber-500 text-white
    px-12 py-3 rounded-full mt-14
    hover:bg-amber-600
    transition shadow-lg
    mx-auto block
  "
>
  More Doctors
</button> */}

    </div>
  );
};

export default TopDoctors;
