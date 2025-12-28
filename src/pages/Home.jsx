import React, { useEffect, useRef } from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {

  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const specialityRef = useRef(null);
  const topDoctorsRef = useRef(null);
  const bannerRef = useRef(null);

  /* 🔥 CINEMATIC PAGE LOAD */
  useEffect(() => {
    gsap.from(pageRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
    });
  }, []);

  /* 🔥 SCROLL-BASED PREMIUM REVEALS */
  useEffect(() => {

    gsap.from(headerRef.current, {
      opacity: 0,
      y: 80,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(specialityRef.current, {
      scrollTrigger: {
        trigger: specialityRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 60,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from(topDoctorsRef.current, {
      scrollTrigger: {
        trigger: topDoctorsRef.current,
        start: "top 80%",
      },
      opacity: 0,
      y: 60,
      duration: 0.9,
      ease: "power3.out",
    });

    gsap.from(bannerRef.current, {
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top 85%",
      },
      opacity: 0,
      scale: 0.95,
      y: 50,
      duration: 1,
      ease: "power4.out",
    });

  }, []);

  return (
    <div ref={pageRef} className="overflow-hidden">

      {/* HERO */}
      <div ref={headerRef}>
        <Header />
      </div>

      {/* SPECIALITY */}
      <div ref={specialityRef}>
        <SpecialityMenu />
      </div>

      {/* TOP DOCTORS */}
      <div ref={topDoctorsRef}>
        <TopDoctors />
      </div>

      {/* CTA BANNER */}
      <div ref={bannerRef}>
        <Banner />
      </div>

    </div>
  );
};

export default Home;
