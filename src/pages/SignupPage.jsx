import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Signup = () => {

  const navigate = useNavigate();

  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef([]);
  const btnRef = useRef(null);
  const linkRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(pageRef.current, {
      opacity: 0,
      duration: 0.8,
    })
      .from(
        cardRef.current,
        {
          opacity: 0,
          y: 80,
          scale: 0.9,
          duration: 0.9,
        },
        "-=0.4"
      )
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
        inputRef.current,
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
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .from(
        linkRef.current,
        {
          opacity: 0,
          y: 10,
          duration: 0.4,
        },
        "-=0.3"
      );
  }, []);

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex items-center justify-center 
                 bg-white px-4"
    >
      <div
        ref={cardRef}
        className="w-full max-w-md bg-white border border-gray-200 
                   rounded-xl shadow-lg p-8"
      >
        <h2
          ref={titleRef}
          className="text-xl font-semibold text-gray-800 mb-2"
        >
          Create Account
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Please sign up to book appointment
        </p>

        {/* FORM */}
        <form className="space-y-4">
          <input
            ref={(el) => (inputRef.current[0] = el)}
            type="text"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            ref={(el) => (inputRef.current[1] = el)}
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <input
            ref={(el) => (inputRef.current[2] = el)}
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-4 py-2 
                       focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />

          <button
            ref={btnRef}
            type="submit"
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1.05,
                boxShadow: "0px 12px 30px rgba(99,102,241,0.35)",
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
            className="w-full bg-indigo-500 text-white py-2 rounded-md 
                       text-sm font-medium mt-2"
          >
            Create account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p
          ref={linkRef}
          className="text-sm text-gray-500 text-center mt-6"
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-500 cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
