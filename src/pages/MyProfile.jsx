import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { assets } from "../assets/assets";

const Profile = () => {

  const pageRef = useRef(null);
  const avatarRef = useRef(null);
  const nameRef = useRef(null);
  const infoRef = useRef([]);
  const btnRef = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(pageRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
    })
      .from(
        avatarRef.current,
        {
          opacity: 0,
          scale: 0.6,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      )
      .from(
        nameRef.current,
        {
          opacity: 0,
          y: 20,
          duration: 0.5,
        },
        "-=0.5"
      )
      .from(
        infoRef.current,
        {
          opacity: 0,
          y: 20,
          stagger: 0.15,
          duration: 0.5,
        },
        "-=0.4"
      )
      .from(
        btnRef.current,
        {
          opacity: 0,
          scale: 0.8,
          stagger: 0.15,
          duration: 0.4,
          ease: "back.out(1.6)",
        },
        "-=0.3"
      );
  }, []);

  return (
    <div
      ref={pageRef}
      className="px-6 md:px-10 py-10 text-gray-800"
    >

      {/* -------- PROFILE HEADER -------- */}
      <div className="flex flex-col md:flex-row gap-10 items-start">

        {/* LEFT IMAGE */}
        <div ref={avatarRef} className="flex gap-4">
          <img
            src={assets.priyesh}
            alt="profile"
            className="w-25 h-28 rounded-lg object-cover shadow-md"
          />
          <div className="w-28 h-28 bg-indigo-50 rounded-lg flex items-center justify-center">
            <img
              src={assets.parasvitals_logo}
              alt="icon"
              className="w-28 opacity-60"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1">

          <h2
            ref={nameRef}
            className="text-xl font-semibold mb-4"
          >
            Priyesh Kumar Mishra
          </h2>

          <hr className="mb-6" />

          {/* CONTACT INFO */}
          <div
            ref={(el) => (infoRef.current[0] = el)}
            className="mb-6 text-sm"
          >
            <p className="text-gray-500 font-medium mb-2">
              CONTACT INFORMATION
            </p>

            <p className="mb-1">
              Email id :
              <span className="text-blue-500 ml-2">
                mishrapriyesh.521@gmail.com
              </span>
            </p>

            <p className="mb-1">
              Phone :
              <span className="text-blue-500 ml-2">
                +91 62-62-4-62-199
              </span>
            </p>

            <p className="text-gray-600 mt-1">
              Address : <br />
              Chankyapuri Chunabhatti <br />
              Bhopal Pin: 462016
            </p>
          </div>

          {/* BASIC INFO */}
          <div
            ref={(el) => (infoRef.current[1] = el)}
            className="mb-8 text-sm"
          >
            <p className="text-gray-500 font-medium mb-2">
              BASIC INFORMATION
            </p>

            <p className="mb-1">
              Gender :
              <span className="ml-2 text-gray-700">Male</span>
            </p>

            <p>
              Birthday :
              <span className="ml-2 text-gray-700">
                29 October, 2002
              </span>
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4">
            <button
              ref={(el) => (btnRef.current[0] = el)}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  duration: 0.3,
                })
              }
              onMouseLeave={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1,
                  duration: 0.3,
                })
              }
              className="px-6 py-2 border border-indigo-500 text-indigo-500
                         rounded-full text-sm hover:bg-indigo-50"
            >
              Edit
            </button>

            <button
              ref={(el) => (btnRef.current[1] = el)}
              onMouseEnter={(e) =>
                gsap.to(e.currentTarget, {
                  scale: 1.1,
                  boxShadow: "0px 10px 30px rgba(99,102,241,0.35)",
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
              className="px-6 py-2 border border-indigo-500
                         text-indigo-500 rounded-full text-sm"
            >
              Save information
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
