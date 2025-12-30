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

  /* ================= GSAP ANIMATION ================= */
  useEffect(() => {
    gsap.to(bgRef.current, {
      backgroundPosition: "200% 200%",
      duration: 18,
      repeat: -1,
      ease: "none",
    });

    particlesRef.current.forEach((p, i) => {
      gsap.to(p, {
        x: "random(-200,200)",
        y: "random(-200,200)",
        duration: "random(6,12)",
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      });
    });

    gsap.from(cardRef.current, {
      y: 120,
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power4.out",
    });
  }, []);

  /* ================= LOGIN HANDLER ================= */
  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("doctorAppUser"));

    if (!user || user.email !== email || user.password !== password) {
      alert("Invalid credentials ❌");
      return;
    }

    // 🔑 THIS LINE CONTROLS NAVBAR
    localStorage.setItem("isLoggedIn", "true");

    navigate("/home", { replace: true });
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-linear-to-br
        from-indigo-500 via-purple-500 to-pink-500 bg-size-[400%_400%]"
      />

      {[...Array(10)].map((_, i) => (
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

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl
        bg-white/20 backdrop-blur-xl border border-white/30 text-white"
      >
        <h2 ref={titleRef} className="text-3xl font-bold text-center mb-6">
          Patient Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            ref={(el) => (inputRef.current[0] = el)}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 outline-none"
          />

          <input
            ref={(el) => (inputRef.current[1] = el)}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/20 outline-none"
          />

          <button
            ref={btnRef}
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-indigo-600 font-semibold"
          >
            Login
          </button>
        </form>

        <p ref={linkRef} className="text-center mt-5 text-sm">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="underline cursor-pointer"
          >
            Create one
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
