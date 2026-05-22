import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  return (
    /*
      Outer wrapper has overflow-visible + extra top padding
      so the popped-out image has vertical room above the banner.
    */
    <div
      className="px-4 sm:px-6 md:px-10 pb-16"
      style={{ background: "#0a0f1a", paddingTop: "60px" }}
    >
      <div
        className="flex rounded-2xl px-6 sm:px-10 md:px-14 lg:px-16 relative"
        style={{
          background: "linear-gradient(135deg, #0a4a3a 0%, #0d2a5e 100%)",
          border: "0.5px solid rgba(74,158,255,0.15)",
          minHeight: "240px",
          overflow: "visible" /* ← key: let the image escape the banner */,
        }}
      >
        {/* Glow blob */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: "-60px",
            bottom: "-60px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(15,212,160,0.07) 0%, transparent 70%)",
          }}
        />

        {/* ── Left ── */}
        <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-20 lg:pl-5 relative z-10 flex flex-col justify-center gap-6">
          <div
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug"
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#ffffff",
            }}
          >
            <p>Book Appointment</p>
            <p>
              With <span style={{ color: "#0fd4a0" }}>Trusted Doctors</span>
            </p>
          </div>

          <button
            onClick={() => navigate("/login")}
            className="w-fit text-sm sm:text-base px-8 py-3 rounded-full font-semibold transition-all duration-300"
            style={{ background: "#ffffff", color: "#0a2840" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Create Account
          </button>
        </div>

        {/* ── Right — image pops out above the banner ── */}
        <div
          className="hidden md:block relative z-10"
          style={{ width: "340px", flexShrink: 0 }}
        >
          <img
            src={assets.appointment_img}
            alt="Doctor"
            style={{
              position: "absolute",
              bottom: 0 /* anchored to bottom of banner */,
              right: "1rem",
              top: "-60px" /* bleeds 60px above the banner top edge */,
              height: "calc(100% + 60px)" /* taller than the banner */,
              width: "auto",
              maxWidth: "360px",
              objectFit: "contain",
              objectPosition: "bottom",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
