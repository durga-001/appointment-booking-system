import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div
      className="flex flex-col md:flex-row flex-wrap rounded-2xl px-6 md:px-10 lg:px-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0a4a3a 0%, #0d2a5e 100%)",
      }}
    >
      {/* Subtle radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(15,212,160,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Left ── */}
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 m-auto md:py-[10vw] md:-mb-[30px] relative z-10">
        {/* Tag pill */}
        <div
          className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1 rounded-full"
          style={{
            background: "rgba(15,212,160,0.12)",
            border: "0.5px solid #0fd4a0",
            color: "#0fd4a0",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "#0fd4a0",
              animation: "pulse 1.8s infinite",
            }}
          />
          Trusted Healthcare Platform
        </div>

        <p
          className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight md:leading-tight lg:leading-tight"
          style={{ fontFamily: "'Playfair Display', serif", color: "#ffffff" }}
        >
          All Treatments <br />
          <span style={{ color: "#0fd4a0" }}>Under One Roof!</span>
        </p>

        <div
          className="flex flex-col md:flex-row items-center gap-3 text-sm font-light"
          style={{ color: "rgba(232,240,255,0.65)" }}
        >
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>

        <a
          href="#speciality"
          className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold m-auto md:m-0 transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "#0fd4a0",
            color: "#0a0f1a",
            boxShadow: "0 0 0 0 rgba(15,212,160,0.4)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow =
              "0 8px 28px rgba(15,212,160,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 0 0 rgba(15,212,160,0.4)";
          }}
        >
          Book Appointment
          <img
            className="w-3 transition-transform duration-300 group-hover:translate-x-1"
            src={assets.arrow_icon}
            alt=""
          />
        </a>
      </div>

      {/* ── Right ── */}
      <div className="md:w-1/2 relative z-10">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
