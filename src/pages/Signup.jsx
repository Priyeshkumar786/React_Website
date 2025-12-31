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

  const [errors, setErrors] = useState({});

  /* ================= GSAP ================= */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.to(bgRef.current, {
      backgroundPosition: "200% 200%",
      duration: 20,
      repeat: -1,
      ease: "none",
    });

    particlesRef.current.forEach((p, i) => {
      gsap.to(p, {
        x: "random(-250,250)",
        y: "random(-250,250)",
        duration: "random(7,14)",
        repeat: -1,
        yoyo: true,
        delay: i * 0.2,
      });
    });

    tl.from(pageRef.current, { opacity: 0 })
      .from(cardRef.current, { y: 150, opacity: 0, scale: 0.7 })
      .from(titleRef.current, { y: 30, opacity: 0 })
      .from(inputsRef.current, { opacity: 0, y: 20, stagger: 0.1 })
      .from(btnRef.current, { scale: 0 })
      .from(linkRef.current, { opacity: 0 });
  }, []);

  /* ================= TILT ================= */
  const tilt = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.to(cardRef.current, {
      rotateX: ((y / rect.height) - 0.5) * -20,
      rotateY: ((x / rect.width) - 0.5) * 20,
      duration: 0.3,
    });
  };

  const resetTilt = () => {
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0 });
  };

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let err = {};

    if (form.name.trim().length < 3)
      err.name = "Name must be at least 3 characters";

    if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Invalid email address";

    if (!/^[0-9]{10}$/.test(form.phone))
      err.phone = "Phone must be 10 digits";

    if (!/^(?=.*\d).{6,}$/.test(form.password))
      err.password = "Password must be 6+ chars & 1 number";

    if (form.password !== form.confirmPassword)
      err.confirmPassword = "Passwords do not match";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) {
      shake();
      return;
    }

    localStorage.setItem(
      "doctorAppUser",
      JSON.stringify(form)
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
    <div ref={pageRef} className="min-h-screen flex items-center justify-center">
      <div
        ref={bgRef}
        className="absolute inset-0 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 bg-size-[400%_400%]"
      />

      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-3 h-3 bg-white rounded-full opacity-30"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}

      <div
        ref={cardRef}
        onMouseMove={tilt}
        onMouseLeave={resetTilt}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 text-white"
      >
        <h2 ref={titleRef} className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {["name", "email", "phone", "password", "confirmPassword"].map(
            (field, i) => (
              <div key={i}>
                <input
                  ref={(el) => (inputsRef.current[i] = el)}
                  type={field.includes("password") ? "password" : "text"}
                  name={field}
                  placeholder={field}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 outline-none"
                />
                {errors[field] && (
                  <p className="text-red-300 text-xs mt-1">{errors[field]}</p>
                )}
              </div>
            )
          )}

          <button
            ref={btnRef}
            className="w-full py-3 bg-white text-indigo-600 rounded-xl font-semibold"
          >
            Sign Up
          </button>
        </form>

        <p ref={linkRef} className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
