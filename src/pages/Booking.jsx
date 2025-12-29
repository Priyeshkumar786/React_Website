// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom'
// const Booking = () => {
//     let Navigate=useNavigate()
//     let [form,setform]=useState({
//         name:"",
//         age:"",
//         aadhar:"",
//         city:"",
//         email:"",
//         checkin:"",
//         checkout:"",
//         people:"",
//     })

//     let handlechange=((e)=>{
//         setform({...form,[e.target.name]:e.target.value})
//     })

//     let handlesubmit=((e)=>{
//         e.preventDefault()

//         let valid=true

//     if (form.name.trim()===""){
//         alert("Name cannot be empty 👎")
//         valid=false
//     }
//      else if(form.aadhar.trim()=="" || form.aadhar.length<12 || form.aadhar.length>12){
//         alert("please enter12 digit aadhar number 😬")
//         valid=false
//     }

//     else if(form.city.trim===""){
//         alert("city cannot be empty 👎")
//         valid=false
//     }

//     else if(form.age.trim==="" || Number(form.age) <18){
//         alert("Age cannot be empty 😶 or less than 18 🤯")
//         valid=false
//     }

//     else if(form.contact==="" || form.contact.length <10 || form.contact.length >10 ){
//         alert("contact cannot be empty 😶 or less than or greater than 10 digit 🧐")
//         valid=false
//     }

//     else if(form.email.trim()==="" || !(form.email.includes('@gmail.com'))){
//         alert("email cannot be empty 😶 or include @gmail,com in it 🙄")
//         valid=false
//     }
    
//     if (valid) {
//       alert("Form submitted 🥳")

//       Navigate('/BookingConfirm')
//     }
   
//     })

//   return (
//     <>
//        <form
//           onSubmit={handlesubmit}
//         >
//           <div>
//             <label>Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={form.name}
//               onChange={handlechange}
              
//             />
//           </div>
//            <div>
//             <label>Aadhar number</label>
//             <input
//               type="number"
//               id="aadhar"
//               name="aadhar"
//               value={form.aadhar}
//               onChange={handlechange}
              
//             />
//           </div>

//           <div>
//             <label>City</label>
//             <input
//               type="text"
//               id="city"
//               name="city"
//               value={form.city}
//               onChange={handlechange}
              
              
//             />
//           </div>

//           <div>
//             <label >Age</label>
//             <input
//               type="number"
//               id="age"
//               name="age"
//               value={form.age}
//               onChange={handlechange}
              
              
//             />
//           </div>

//           <div >
//             <label>Contact</label>
//             <input
//               type="number"
//               id="contact"
//               name="contact"
//               value={form.contact}
//               onChange={handlechange}
              
//             />
//           </div>

//           <div >
//             <label>Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={form.email}
//               onChange={handlechange}
            
//             />
//           </div>

//           <div >
//             <label >CheckIn</label>
//             <input
//               type="date"
//               id="checkin"
//               name="checkin"
//               value={form.checkin}
//               onChange={handlechange}
              
//             />
//           </div>

//           <div >
//             <label>CheckOut</label>
//             <input
//               type="date"
//               id="checkout"
//               name="checkout"
//               value={form.checkout}
//               onChange={handlechange}
              
//             />
//           </div>

//           <div >
//             <label>No.of People</label>
//             <input
//               type="number"
//               id="people"
//               name="people"
//               value={form.people}
//               onChange={handlechange}
              
//             />
//           </div>

//           <button
//             type="submit">Book It!!</button>

//         </form>
//     </>
//   )
// }

// export default Booking

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
    checkin: "",
    checkout: "",
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

      gsap.to(".glow-1", {
        x: "20vw",
        y: "10vh",
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(".glow-2", {
        x: "-15vw",
        y: "-20vh",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
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

    if (form.name.trim() === "") return alert("Name required ❌");
    if (form.aadhar.length !== 12) return alert("12 digit Aadhar required ❌");
    // if (form.city.trim() === "") return alert("City required ❌");
    if (Number(form.age) < 18) return alert("Age must be 18+ ❌");
    if (form.contact.length !== 10) return alert("10 digit contact required ❌");
    if (!form.email.includes("@gmail.com")) return alert("Valid Gmail required ❌");

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
      // .catch(() => alert("Server error ❌"));
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[#08080a] flex items-center justify-center p-6 overflow-hidden"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="glow-1 absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-amber-600/20 rounded-full blur-[120px]" />
        <div className="glow-2 absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-amber-900/10 rounded-full blur-[150px]" />
      </div>

      {/* FORM */}
      <div className="form-container relative z-10 w-full max-w-4xl backdrop-blur-2xl border border-white/10 rounded-[48px] p-10 md:p-16 shadow-2xl">
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
            ["Appointment Date", "Appointment", "date"],
            ["Appointment time",  "date"],
            
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
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-indigo-500"
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

      {/* NORMAL STYLE TAG (VITE SAFE) */}
      <style>
        {`
          input[type="date"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            opacity: 0.3;
          }
        `}
      </style>
    </div>
  );
};

export default Booking;
