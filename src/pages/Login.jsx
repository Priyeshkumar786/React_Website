import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Login = () => {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const bgRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const inputRef = useRef([]);
  const btnRef = useRef(null);
  const linkRef = useRef(null);
  const particlesRef = useRef([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* ================= MASTER CINEMATIC ANIMATION ================= */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Background gradient flow
    gsap.to(bgRef.current, {
      backgroundPosition: "200% 200%",
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    // Floating particles
    particlesRef.current.forEach((p, i) => {
      gsap.to(p, {
        y: "random(-200,200)",
        x: "random(-200,200)",
        scale: "random(0.6,1.4)",
        opacity: "random(0.2,0.6)",
        duration: "random(6,12)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3,
      });
    });

    // Page entrance
    tl.from(pageRef.current, {
      opacity: 0,
      duration: 1,
    })
      .from(
        cardRef.current,
        {
          y: 160,
          opacity: 0,
          scale: 0.7,
          rotateX: 25,
          duration: 1.2,
        },
        "-=0.6"
      )
      .from(
        titleRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.5"
      )
      .from(
        inputRef.current,
        {
          y: 30,
          opacity: 0,
          stagger: 0.15,
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
        {
          y: 20,
          opacity: 0,
          duration: 0.4,
        },
        "-=0.3"
      );
  }, []);

  /* ================= 3D CARD TILT ================= */
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * -18;
    const rotateY = ((x / rect.width) - 0.5) * 18;

    gsap.to(card, {
      rotateX,
      rotateY,
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

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("doctorAppUser"));

    if (!user || user.email !== email || user.password !== password) {
      gsap.fromTo(
        cardRef.current,
        { x: -12 },
        { x: 12, repeat: 4, yoyo: true, duration: 0.08 }
      );

      gsap.to(cardRef.current, {
        boxShadow: "0 0 50px rgba(239,68,68,0.6)",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
      });

      alert("Invalid credentials ❌");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/home", { replace: true });

  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex items-center justify-center px-4 overflow-hidden"
    >
      {/* 🔥 ANIMATED BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-size-[400%_400%]
                   bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500"
      />

      {/* ✨ PARTICLES */}
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute w-3 h-3 rounded-full bg-white opacity-30"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* 💎 GLASS CARD */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetTilt}
        className="relative w-full max-w-md p-8 rounded-3xl
                   bg-white/20 backdrop-blur-2xl border border-white/30
                   shadow-[0_40px_120px_rgba(0,0,0,0.4)]
                   text-white z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h2
          ref={titleRef}
          className="text-3xl font-extrabold text-center mb-2"
        >
          Patient Login
        </h2>

        <p className="text-center text-sm opacity-80 mb-6">
          Secure access to your dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            ref={(el) => (inputRef.current[0] = el)}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20
                       placeholder-white/70 outline-none
                       focus:ring-2 focus:ring-white"
          />

          <input
            ref={(el) => (inputRef.current[1] = el)}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20
                       placeholder-white/70 outline-none
                       focus:ring-2 focus:ring-white"
          />

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
            className="w-full py-3 rounded-xl font-semibold
                       bg-white text-indigo-600 mt-3"
          >
            Login
          </button>
        </form>

        <p
          ref={linkRef}
          className="text-center text-sm mt-6 opacity-80"
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="font-semibold cursor-pointer underline"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
