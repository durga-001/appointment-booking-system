import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div
      className="min-h-screen px-4 sm:px-8 md:px-12 py-12"
      style={{ background: "#0a0f1a" }}
    >
      {/* Heading */}
      <div className="text-center mb-12">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#4a5878" }}
        >
          Get in touch
        </p>
        <h1
          className="text-4xl font-semibold"
          style={{ fontFamily: "'Playfair Display',serif", color: "#e8f0ff" }}
        >
          Contact <span style={{ color: "#0fd4a0" }}>Us</span>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-10 mb-20 items-center">
        {/* Image */}
        <img
          className="w-full md:max-w-sm rounded-2xl object-cover"
          style={{ border: "0.5px solid rgba(74,158,255,0.12)" }}
          src={assets.contact_image}
          alt="Contact"
        />

        {/* Info card */}
        <div
          className="flex-1 rounded-2xl p-8 flex flex-col gap-6"
          style={{
            background: "#141f35",
            border: "0.5px solid rgba(74,158,255,0.12)",
          }}
        >
          {/* Office */}
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: "#4a5878" }}
            >
              Our Office
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#8899bb" }}>
              45 Wellness Avenue, Sector 12
              <br />
              Delhi – 110022, India
            </p>
          </div>

          <div
            style={{ height: "0.5px", background: "rgba(74,158,255,0.1)" }}
          />

          {/* Contact details */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span style={{ color: "#0fd4a0" }}>📞</span>
              <p className="text-sm" style={{ color: "#8899bb" }}>
                (434) 534-3434
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span style={{ color: "#0fd4a0" }}>✉️</span>
              <p className="text-sm" style={{ color: "#4a9eff" }}>
                medisync@gmail.com
              </p>
            </div>
          </div>

          <div
            style={{ height: "0.5px", background: "rgba(74,158,255,0.1)" }}
          />

          {/* Careers */}
          <div>
            <p
              className="text-base font-semibold mb-1"
              style={{
                color: "#e8f0ff",
                fontFamily: "'Playfair Display',serif",
              }}
            >
              Careers at Medisync
            </p>
            <p className="text-sm mb-4" style={{ color: "#8899bb" }}>
              Learn more about our teams and job openings.
            </p>
            <button
              className="px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                background: "transparent",
                border: "0.5px solid rgba(15,212,160,0.4)",
                color: "#0fd4a0",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#0fd4a0";
                e.currentTarget.style.color = "#0a0f1a";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(15,212,160,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#0fd4a0";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Explore Jobs →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
