import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Signup = () => {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const inputsRef = useRef([]);
  const btnRef = useRef(null);
  const linkRef = useRef(null);
  const particlesRef = useRef([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  /* ================= CINEMATIC GSAP ANIMATION ================= */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Animated gradient
    gsap.to(bgRef.current, {
      backgroundPosition: "200% 200%",
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    // Floating particles
    particlesRef.current.forEach((p, i) => {
      gsap.to(p, {
        x: "random(-250,250)",
        y: "random(-250,250)",
        scale: "random(0.6,1.4)",
        opacity: "random(0.2,0.6)",
        duration: "random(7,14)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.25,
      });
    });

    // Page intro
    tl.from(pageRef.current, { opacity: 0, duration: 1 })
      .from(
        cardRef.current,
        {
          y: 180,
          scale: 0.65,
          opacity: 0,
          rotateX: 30,
          duration: 1.2,
        },
        "-=0.6"
      )
      .from(
        titleRef.current,
        { y: 40, opacity: 0, duration: 0.6 },
        "-=0.5"
      )
      .from(
        inputsRef.current,
        {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        btnRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.5)",
        },
        "-=0.2"
      )
      .from(
        linkRef.current,
        { y: 20, opacity: 0, duration: 0.4 },
        "-=0.3"
      );
  }, []);

  /* ================= 3D CARD TILT ================= */
  const tilt = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cardRef.current, {
      rotateX: ((y / rect.height) - 0.5) * -20,
      rotateY: ((x / rect.width) - 0.5) * 20,
      duration: 0.4,
    });
  };

  const resetTilt = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
    });
  };

  /* ================= FORM LOGIC ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      shake();
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      shake();
      alert("Passwords do not match");
      return;
    }

    localStorage.setItem(
      "doctorAppUser",
      JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      })
    );

    navigate("/login");
  };

  const shake = () => {
    gsap.fromTo(
      cardRef.current,
      { x: -12 },
      { x: 12, repeat: 4, yoyo: true, duration: 0.08 }
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* 🌈 BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-size-[400%_400%]
                   bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500"
      />

      {/* ✨ PARTICLES */}
      {[...Array(14)].map((_, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-3 h-3 bg-white rounded-full opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* 💎 GLASS CARD */}
      <div
        ref={cardRef}
        onMouseMove={tilt}
        onMouseLeave={resetTilt}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl
                   bg-white/20 backdrop-blur-2xl border border-white/30
                   shadow-[0_40px_120px_rgba(0,0,0,0.4)]
                   text-white"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 ref={titleRef} className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm opacity-80 mb-6">
          Doctor Appointment System
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "password", "confirmPassword"].map(
            (field, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type={field.includes("password") ? "password" : "text"}
                name={field}
                placeholder={field.replace(/([A-Z])/g, " $1")}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-white/20
                           placeholder-white/70 outline-none
                           focus:ring-2 focus:ring-white"
              />
            )
          )}

          <button
            ref={btnRef}
            type="submit"
            onMouseEnter={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1.08,
                boxShadow: "0 20px 60px rgba(255,255,255,0.6)",
                duration: 0.3,
              })
            }
            onMouseLeave={(e) =>
              gsap.to(e.currentTarget, {
                scale: 1,
                boxShadow: "0 0 0 rgba(0,0,0,0)",
                duration: 0.3,
              })
            }
            className="w-full py-3 mt-2 rounded-xl bg-white text-indigo-600 font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p ref={linkRef} className="text-center text-sm mt-6 opacity-80">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
