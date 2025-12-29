import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { CheckCircle } from "lucide-react";

const BookingConfirm = () => {
  const navigate = useNavigate();
  const pageRef = useRef(null);

  /* ================= GSAP ANIMATION ================= */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.from(pageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      filter: "blur(20px)",
    })
      .from(
        ".icon",
        {
          scale: 0,
          rotate: -180,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        ".text-anim",
        {
          y: 20,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
        },
        "-=0.4"
      );
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center p-6">
      <div
        ref={pageRef}
        className="relative max-w-xl w-full text-center backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[48px] p-12 shadow-2xl"
      >
        {/* ICON */}
        <div className="icon flex justify-center mb-6">
          <CheckCircle size={90} className="text-amber-400" />
        </div>

        {/* TEXT */}
        <h1 className="text-4xl font-serif italic text-white mb-4 text-anim">
          Appointment Confirmed
        </h1>

        <p className="text-white/60 text-sm tracking-wider mb-10 text-anim">
          Thank you for booking. Your appointment has been successfully
          scheduled.
        </p>

        {/* DETAILS CARD */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10 text-anim">
          <p className="text-xs tracking-[0.3em] uppercase text-amber-400 mb-2">
            What’s Next?
          </p>
          <p className="text-white/70 text-sm leading-relaxed">
            Please arrive 10 minutes before your appointment time.
            <br />
            Our team will contact you shortly for confirmation.
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center text-anim">
          <button
            onClick={() => navigate("/")}
            className="px-10 py-4 rounded-full bg-white text-black font-bold tracking-widest hover:bg-amber-600 hover:text-white transition"
          >
            GO HOME
          </button>

          <button
            onClick={() => navigate("/Booking")}
            className="px-10 py-4 rounded-full border border-white/20 text-white font-semibold tracking-widest hover:bg-white/10 transition"
          >
            BOOK AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirm;
