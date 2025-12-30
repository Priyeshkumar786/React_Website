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
    email: "",
    contact: "",
  });

  const [appointments, setAppointments] = useState([]);
  const [editId, setEditId] = useState(null);

  /* ================= GSAP ================= */
  useEffect(() => {
    gsap.from(".form-container", {
      y: 40,
      opacity: 0,
      duration: 1,
    });
  }, []);

  /* ================= READ ================= */
  const fetchAppointments = () => {
    axios.get("http://localhost:3000/appointments").then((res) => {
      setAppointments(res.data);
    });
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  /* ================= FORM ================= */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ================= CREATE / UPDATE ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      alert("Please login to book appointment 🔒");
      navigate("/login");
      return;
    }

    if (form.name === "") return alert("Name required");
    if (form.aadhar.length !== 12) return alert("12 digit Aadhar required");
    if (Number(form.age) < 18) return alert("Age must be 18+");
    if (form.contact.length !== 10) return alert("10 digit contact required");
    if (!form.email.includes("@gmail.com")) return alert("Valid Gmail required");

    if (editId) {
      /* UPDATE */
      axios
        .put(`http://localhost:3000/appointments/${editId}`, form)
        .then(() => {
          alert("Appointment Updated ✅");
          setEditId(null);
          setForm({ name: "", age: "", aadhar: "", email: "", contact: "" });
          fetchAppointments();
        });
    } else {
      /* CREATE */
      axios.post("http://localhost:3000/appointments", form).then(() => {
        alert("Appointment Booked ✅");
        setForm({ name: "", age: "", aadhar: "", email: "", contact: "" });
        fetchAppointments();
      });
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    if (window.confirm("Delete this appointment? ❌")) {
      axios.delete(`http://localhost:3000/appointments/${id}`).then(() => {
        fetchAppointments();
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#3198a3] text-white p-10"
    >
      {/* ================= FORM ================= */}
      <div className="form-container max-w-4xl mx-auto p-10 rounded-3xl border border-white/60">
        <h2 className="text-3xl mb-6 text-center">
          {editId ? "Update Appointment 👍" : "Book Appointment 🧾"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            ["Name", "name"],
            ["Aadhar", "aadhar"],
            ["Age", "age"],
            ["Contact", "contact"],
            ["Email", "email"],
          ].map(([label, name]) => (
            <input
              key={name}
              name={name}
              value={form[name]}
              onChange={handleChange}
              placeholder={label}
              className="px-4 py-3 rounded-xl bg-amber-600/10 border border-white/20 outline-none"
            />
          ))}

          <button
            type="submit"
            className="md:col-span-3 py-4 bg-cyan-700 rounded-full font-boldborder-black/90 "
          >
            {editId ? "UPDATE" : "CONFIRM BOOKING ✅"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="max-w-5xl mx-auto mt-12">
        <h3 className="text-2xl mb-6">Appointments</h3>

        {appointments.length === 0 && <p>No appointments found</p>}

        {appointments.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center bg-white/5 p-4 rounded-xl mb-4"
          >
            <div>
              <p className="font-bold">{item.name}</p>
              <p className="text-sm opacity-70">{item.email}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(item)}
                className="px-4 py-1 bg-amber-800 rounded"
              >
                Edit 🖊️
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="px-4 py-1 bg-red-500 rounded"
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Booking;








// have to add some css in confirmbooking page
// Crud done in book appointment page
// login credential are in localstorage