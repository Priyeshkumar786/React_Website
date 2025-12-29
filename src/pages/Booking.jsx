import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";

const Booking = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    aadhar: "",
    city: "",
    email: "",
    contact: "",
    people: "",
  });

  /* ================= GSAP ANIMATION ================= */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".form-container", {
        y: 40,
        opacity: 0,
        filter: "blur(15px)",
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(".field-anim", {
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ================= FORM HANDLERS ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    /* 🔒 LOGIN CHECK */
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to book appointment 🔒");
      navigate("/login");
      return;
    }

    /* VALIDATIONS */
    if (form.name.trim() === "") return alert("Name required ❌");
    if (form.aadhar.length !== 12) return alert("12 digit Aadhar required ❌");
    if (Number(form.age) < 18) return alert("Age must be 18+ ❌");
    if (form.contact.length !== 10) return alert("10 digit contact required ❌");
    if (!form.email.includes("@gmail.com")) return alert("Valid Gmail required ❌");

    /* API CALL */
    axios
      .post("http://localhost:3000/appointments", form)
      .then(() => {
        gsap.to(".form-container", {
          opacity: 0,
          y: -20,
          filter: "blur(10px)",
          duration: 0.8,
          onComplete: () => navigate("/BookingConfirm"),
        });
      })
      .catch(() => alert("Server error ❌"));
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#08080a] flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="form-container w-full max-w-4xl p-10 md:p-16 rounded-[48px] border border-white/10 backdrop-blur-2xl">
        <div className="text-center mb-12 field-anim">
          <h2 className="text-5xl font-serif italic text-white mb-2">
            Secure Your Appointment
          </h2>
          <p className="text-xs tracking-[0.4em] uppercase text-amber-400">
            Appointment Form
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            ["Patient Name", "name", "text"],
            ["Aadhar UID", "aadhar", "number"],
            ["Age", "age", "number"],
            ["Contact", "contact", "number"],
            ["Email", "email", "email"],
          ].map(([label, name, type]) => (
            <div key={name} className="field-anim flex flex-col gap-2">
              <label className="text-[10px] tracking-widest text-white/40">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none"
              />
            </div>
          ))}

          <div className="md:col-span-3 mt-8 field-anim">
            <button
              type="submit"
              className="w-full py-5 bg-white text-black font-bold tracking-widest rounded-full hover:bg-amber-600 hover:text-white transition"
            >
              CONFIRM BOOKING
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Booking;
