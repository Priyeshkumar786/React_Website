import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import axios from "axios";

const Booking = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const cardRef = useRef(null);
  const glow1 = useRef(null);
  const glow2 = useRef(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    aadhar: "",
    email: "",
    contact: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ================= MASTER GSAP CINEMATIC ================= */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(pageRef.current, {
      opacity: 0,
      duration: 1,
    })
      .from(
        cardRef.current,
        {
          y: 120,
          opacity: 0,
          scale: 0.85,
          rotateX: 20,
          duration: 1.2,
        },
        "-=0.6"
      )
      .from(
        ".field",
        {
          y: 30,
          opacity: 0,
          stagger: 0.12,
          duration: 0.8,
        },
        "-=0.6"
      )
      .from(
        ".submit-btn",
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: "elastic.out(1,0.5)",
        },
        "-=0.4"
      );

    // Floating neon blobs
    gsap.to(glow1.current, {
      x: 200,
      y: -150,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(glow2.current, {
      x: -200,
      y: 180,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  /* ================= FETCH ================= */
  const fetchAppointments = () => {
    axios.get("http://localhost:3000/appointments").then((res) => {
      setAppointments(res.data);
      gsap.from(".list-card", {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
      });
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Login required 🔒");
      navigate("/login");
      return;
    }

    if (form.name === "") return alert("Name required");
    if (form.aadhar.length !== 12) return alert("12 digit Aadhar required");
    if (Number(form.age) < 18) return alert("Age must be 18+");
    if (form.contact.length !== 10) return alert("10 digit contact required");
    if (!form.email.includes("@gmail.com")) return alert("Valid Gmail required");

    const req = editId
      ? axios.put(`http://localhost:3000/appointments/${editId}`, form)
      : axios.post("http://localhost:3000/appointments", form);

    req.then(() => {
      gsap.to(cardRef.current, {
        boxShadow: "0 0 80px rgba(245,158,11,0.8)",
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      });

      setForm({ name: "", age: "", aadhar: "", email: "", contact: "" });
      setEditId(null);
      fetchAppointments();
    });
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });

    gsap.fromTo(
      cardRef.current,
      { scale: 0.95 },
      { scale: 1, duration: 0.6, ease: "elastic.out(1,0.5)" }
    );
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete appointment?")) {
      axios.delete(`http://localhost:3000/appointments/${id}`).then(fetchAppointments);
    }
  };

  return (
    <div
      ref={pageRef}
      className="relative min-h-screen bg-[#07070a] flex flex-col items-center px-6 py-20 overflow-hidden text-white"
    >
      {/* NEON BLOBS */}
      <div
        ref={glow1}
        className="absolute top-[-20%] left-[-20%] w-[50vw] h-[50vw]
                   bg-amber-500/20 rounded-full blur-[140px]"
      />
      <div
        ref={glow2}
        className="absolute bottom-[-20%] right-[-20%] w-[60vw] h-[60vw]
                   bg-indigo-500/20 rounded-full blur-[160px]"
      />

      {/* FORM CARD */}
      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-4xl p-12 rounded-[40px]
                   bg-white/5 backdrop-blur-2xl border border-white/10
                   shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2 className="text-4xl font-extrabold text-center mb-10">
          {editId ? "Update Appointment" : "Book Appointment"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            ["Patient Name", "name"],
            ["Aadhar UID", "aadhar"],
            ["Age", "age"],
            ["Contact", "contact"],
            ["Email", "email"],
          ].map(([label, name]) => (
            <div key={name} className="field flex flex-col gap-2">
              <label className="text-xs tracking-widest opacity-60">
                {label}
              </label>
              <input
                name={name}
                value={form[name]}
                onChange={handleChange}
                className="px-5 py-4 rounded-xl bg-black/40 border
                           border-white/10 outline-none focus:ring-2
                           focus:ring-amber-500 transition"
              />
            </div>
          ))}

          <button
            type="submit"
            className="submit-btn md:col-span-3 mt-6 py-5 rounded-full
                       bg-amber-500 text-black font-bold tracking-widest
                       hover:bg-white hover:scale-105 transition"
          >
            {editId ? "UPDATE APPOINTMENT" : "CONFIRM BOOKING"}
          </button>
        </form>
      </div>

      {/* LIST */}
      <div className="relative z-10 w-full max-w-5xl mt-16">
        <h3 className="text-3xl mb-8 text-center">Appointments</h3>

        {appointments.map((item) => (
          <div
            key={item.id}
            className="list-card flex justify-between items-center
                       bg-white/5 p-6 rounded-2xl mb-4
                       hover:bg-white/10 transition"
          >
            <div>
              <p className="font-bold text-lg">{item.name}</p>
              <p className="text-sm opacity-60">{item.email}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(item)}
                className="px-5 py-2 rounded-full bg-indigo-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-5 py-2 rounded-full bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;
