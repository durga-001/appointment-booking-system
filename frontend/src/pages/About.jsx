import React from "react";
import { assets } from "../assets/assets";

const whyChooseUs = [
  {
    title: "Efficiency",
    desc: "Streamlined appointment scheduling that fits into your busy lifestyle.",
    icon: "⚡",
  },
  {
    title: "Confidence",
    desc: "Access to a network of trusted, verified healthcare professionals in your area.",
    icon: "🛡️",
  },
  {
    title: "Personalization",
    desc: "Tailored recommendations and reminders to help you stay on top of your health.",
    icon: "✦",
  },
];

const About = () => {
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
          Who we are
        </p>
        <h1
          className="text-4xl font-semibold"
          style={{ fontFamily: "'Playfair Display',serif", color: "#e8f0ff" }}
        >
          About <span style={{ color: "#0fd4a0" }}>Us</span>
        </h1>
      </div>

      {/* Story section */}
      <div className="flex flex-col md:flex-row gap-10 mb-16 items-center">
        <img
          className="w-full md:max-w-sm rounded-2xl object-cover"
          style={{ border: "0.5px solid rgba(74,158,255,0.12)" }}
          src={assets.about_image}
          alt="About us"
        />
        <div
          className="flex-1 rounded-2xl p-8 flex flex-col gap-5 text-sm leading-relaxed"
          style={{
            background: "#141f35",
            border: "0.5px solid rgba(74,158,255,0.12)",
            color: "#8899bb",
          }}
        >
          <p>
            At our core, we believe healthcare should be accessible, reliable,
            and centered around people. Our platform was created with a simple
            vision: to connect patients with trusted doctors quickly and
            seamlessly. We understand that finding the right specialist can
            often feel overwhelming, so we built a space where clarity,
            convenience, and trust come together.
          </p>
          <p>
            Every doctor listed with us is carefully verified, ensuring that
            patients receive care from qualified professionals across diverse
            specialities — whether you need a general physician, a pediatrician,
            or a specialist for advanced treatment.
          </p>
          <div>
            <p
              className="text-base font-semibold mb-2"
              style={{
                color: "#e8f0ff",
                fontFamily: "'Playfair Display',serif",
              }}
            >
              Our Vision
            </p>
            <p>
              We envision a world where healthcare is simple, transparent, and
              accessible to everyone. By bridging the gap between patients and
              trusted doctors, we strive to empower individuals to make informed
              decisions and lead healthier lives.
            </p>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="mb-6">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-2"
          style={{ color: "#4a5878" }}
        >
          Benefits
        </p>
        <h2
          className="text-3xl font-semibold"
          style={{ fontFamily: "'Playfair Display',serif", color: "#e8f0ff" }}
        >
          Why <span style={{ color: "#0fd4a0" }}>Choose Us</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
        {whyChooseUs.map((item, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 p-8 rounded-2xl cursor-pointer transition-all duration-300"
            style={{
              background: "#141f35",
              border: "0.5px solid rgba(74,158,255,0.12)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(15,212,160,0.35)";
              e.currentTarget.style.background = "#1a2844";
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(15,212,160,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(74,158,255,0.12)";
              e.currentTarget.style.background = "#141f35";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: "rgba(15,212,160,0.1)" }}
            >
              {item.icon}
            </div>
            <p className="text-base font-semibold" style={{ color: "#e8f0ff" }}>
              {item.title}
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "#8899bb" }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
