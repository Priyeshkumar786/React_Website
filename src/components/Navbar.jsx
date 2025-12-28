import React, { useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(true);
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const logoRef = useRef(null);
  const menuRef = useRef([]);
  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  /* ================= LOGO LOAD (SVG-LIKE DRAW + ROTATE) ================= */
  useEffect(() => {
    if (!logoRef.current) return;

    gsap.fromTo(
      logoRef.current,
      {
        scale: 0,
        rotate: -180,
        filter: "blur(6px)",
      },
      {
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
      }
    );
  }, []);

  /* ================= LOGO HEARTBEAT GLOW ================= */
  useEffect(() => {
    if (!logoRef.current) return;

    gsap.to(logoRef.current, {
      boxShadow: "0 0 25px rgba(245,158,11,0.6)",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
      ease: "power1.inOut",
    });
  }, []);

  /* ================= NAVBAR LOAD ================= */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.from(navRef.current, { y: -80, opacity: 0, duration: 0.8 })
      .from(menuRef.current, { y: -20, opacity: 0, stagger: 0.15 }, "-=0.4")
      .from(profileRef.current, { scale: 0, opacity: 0 }, "-=0.3");
  }, []);

  /* ================= SCROLL HIDE + LOGO RESIZE ================= */
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      // Navbar hide / show
      if (current > lastScroll && current > 120) {
        gsap.to(navRef.current, { y: -100, duration: 0.4 });
      } else {
        gsap.to(navRef.current, { y: 0, duration: 0.4 });
      }

      // Logo resize
      gsap.to(logoRef.current, {
        scale: current > 100 ? 0.85 : 1,
        duration: 0.3,
      });

      lastScroll = current;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= MOBILE MENU ================= */
  useEffect(() => {
    if (!mobileRef.current) return;

    gsap.to(mobileRef.current, {
      x: open ? 0 : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [open]);

  const links = [
    { name: "HOME", path: "/" },
    { name: "ALL DOCTORS", path: "/doctors" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <nav
        ref={navRef}
        className="sticky top-0 z-50 flex items-center justify-between
        px-6 py-4 border-b border-gray-300
        backdrop-blur-md bg-white/70"
      >
        {/* LOGO */}
        <img
          ref={logoRef}
          onClick={() => navigate("/")}
          src={assets.parasvitals_logo}
          alt="ParasVitals Logo"
          className="h-10 md:h-12 w-auto object-contain cursor-pointer
          rounded-lg transition-transform"
        />

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex gap-6 font-medium">
          {links.map((item, index) => (
            <NavLink key={index} to={item.path}>
              <li
                ref={el => (menuRef.current[index] = el)}
                className="relative cursor-pointer group"
                onMouseEnter={e =>
                  gsap.to(e.currentTarget, { y: -3, duration: 0.2 })
                }
                onMouseLeave={e =>
                  gsap.to(e.currentTarget, { y: 0, duration: 0.2 })
                }
              >
                {item.name}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-500
                  ${
                    location.pathname === item.path
                      ? "w-full bg-amber-500"
                      : "w-0 bg-amber-500 group-hover:w-full"
                  }`}
                />
              </li>
            </NavLink>
          ))}
        </ul>

        {/* RIGHT */}
        <div ref={profileRef} className="flex items-center gap-4">
          {/* MOBILE ICON */}
          <button onClick={() => setOpen(true)} className="md:hidden">
            <Menu />
          </button>

          {token ? (
            <div className="relative group hidden md:block">
              <div className="flex items-center gap-2 cursor-pointer">
                <img
                  src={assets.priyesh}
                  className="w-9 rounded-full border-2 border-amber-400"
                  alt="profile"
                />
                <img
                  src={assets.dropdown_icon}
                  className="w-2.5 transition group-hover:rotate-180"
                  alt="arrow"
                />
              </div>

              {/* DROPDOWN */}
              <div
                className="absolute right-0 pt-4 opacity-0 scale-90
                group-hover:opacity-100 group-hover:scale-100
                transition-all duration-300"
              >
                <div className="bg-white rounded-xl shadow-xl p-4 min-w-48">
                  <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">
                    My Profile
                  </p>
                  <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">
                    My Appointments
                  </p>
                  <p onClick={() => setToken(false)} className="hover:text-red-500 cursor-pointer">
                    Logout
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="bg-amber-500 text-white px-6 py-2 rounded-full hover:scale-105 transition"
            >
              Create Account
            </button>
          )}
        </div>
      </nav>

      {/* ================= MOBILE DRAWER ================= */}
      <div
        ref={mobileRef}
        className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl
        z-50 translate-x-full md:hidden"
      >
        <div className="flex justify-between p-4 border-b">
          <h3 className="font-bold">Menu</h3>
          <X onClick={() => setOpen(false)} className="cursor-pointer" />
        </div>

        <div className="flex flex-col p-4 gap-4">
          {links.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              className="cursor-pointer hover:text-amber-500"
            >
              {item.name}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
