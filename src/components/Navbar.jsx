import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import gsap from "gsap";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);

  const navRef = useRef(null);
  const mobileRef = useRef(null);
  const dropdownRef = useRef(null);
  const logoRef = useRef(null);
  const containerRef = useRef(null);
  const menuRef = useRef([]);
  const profileRef = useRef(null);

  /* ================= CHECK LOGIN ================= */
  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(status === "true");
  }, [location.pathname]);

  /* ================= LOGO ANIMATION ================= */
  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { scale: 0, rotate: -180, filter: "blur(6px)" },
      {
        scale: 1,
        rotate: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "elastic.out(1, 0.6)",
      }
    );

    gsap.to(logoRef.current, {
      boxShadow: "0 0 25px rgba(245,158,11,0.6)",
      repeat: -1,
      yoyo: true,
      duration: 1.2,
    });
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.from(navRef.current, { y: -80, opacity: 0, duration: 0.8 })
      .from(menuRef.current, { y: -20, opacity: 0, stagger: 0.15 }, "-=0.4")
      .from(profileRef.current, { scale: 0, opacity: 0 }, "-=0.3");
  }, []);

  useEffect(() => {
    gsap.to(mobileRef.current, {
      x: open ? 0 : "100%",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [open]);
  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login", { replace: true });
  };

  const links = [
    { name: "HOME", path: "/home" },
    { name: "DOCTORS", path: "/doctors" },
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
          alt="Logo"
          className="h-10 md:h-12 cursor-pointer rounded-lg"
        />

        {/* DESKTOP LINKS */}
        <ul className="hidden md:flex gap-6 font-medium">
          {links.map((item, index) => (
            <NavLink key={index} to={item.path}>
              <li
                ref={(el) => (menuRef.current[index] = el)}
                className="relative cursor-pointer group"
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

{/* RIGHT SECTION */}
<div ref={profileRef} className="flex items-center gap-4">
  {/* PROFILE DROPDOWN */}
  {isLoggedIn && (
    <div
      className="relative"
      onMouseEnter={() =>
        gsap.to(dropdownRef.current, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.3,
          pointerEvents: "auto",
        })
      }
      onMouseLeave={() =>
        gsap.to(dropdownRef.current, {
          opacity: 0,
          scale: 0.95,
          y: -10,
          duration: 0.25,
          pointerEvents: "none",
        })
      }
    >
      <div className="flex items-center gap-2 cursor-pointer">
        <img
          src={assets.priyesh}
          className="w-9 h-9 rounded-full border-2 border-amber-400"
          alt="profile"
        />
        <img
          src={assets.dropdown_icon}
          className="w-2.5"
          alt="arrow"
        />
      </div>

      <div
        ref={dropdownRef}
        className="absolute right-0 pt-4 opacity-0 scale-90"
      >
        <div className="bg-white rounded-xl shadow-xl p-4 min-w-48 space-y-2">
          <p
            onClick={() => navigate("/my-profile")}
            className="cursor-pointer hover:text-amber-500"
          >
            My Profile
          </p>
          <p
            onClick={() => navigate("/my-appointments")}
            className="cursor-pointer hover:text-amber-500"
          >
            My Appointments
          </p>
          <p
            onClick={handleLogout}
            className="cursor-pointer text-red-500 hover:underline"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  )}

  {/* LOGIN / LOGOUT */}
  {!isLoggedIn && (
    <button
      onClick={() => navigate("/login")}
      className="hidden md:block border border-amber-500 text-amber-600
      px-5 py-2 rounded-full hover:bg-amber-500 hover:text-white transition"
    >
      Login
    </button>
  )}

  {/* MOBILE MENU ICON */}
  <button onClick={() => setOpen(true)} className="md:hidden">
    <Menu />
  </button>
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
              className="cursor-pointer"
            >
              {item.name}
            </p>
          ))}

          {!isLoggedIn ? (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="mt-4 bg-amber-500 text-white py-2 rounded-full"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="mt-4 bg-red-500 text-white py-2 rounded-full"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
