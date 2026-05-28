import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#0f1829",
        borderTop: "0.5px solid rgba(74,158,255,0.12)",
        fontFamily: "'DM Sans', sans-serif",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)", // ✅ force 3 columns
          gap: "2.5rem",
          padding: "3rem 2.5rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Brand */}
        <div>
          <img
            style={{ width: "140px", marginBottom: "1rem" }}
            src={assets.logo}
            alt="Medisync"
          />
          <p
            style={{
              color: "#8899bb",
              fontSize: "0.85rem",
              lineHeight: 1.75,
              maxWidth: "280px",
            }}
          >
            Medisync is a smart doctor appointment platform that helps patients
            seamlessly book, manage, and track consultations online with trusted
            healthcare professionals.
          </p>
        </div>

        {/* Company */}
        <div>
          <p
            style={{
              color: "#e8f0ff",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.25rem",
            }}
          >
            Company
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
              (item) => (
                <li
                  key={item}
                  style={{
                    color: "#8899bb",
                    fontSize: "0.875rem",
                    cursor: "pointer",
                    transition: "color 0.25s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#0fd4a0")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8899bb")
                  }
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <p
            style={{
              color: "#e8f0ff",
              fontSize: "0.75rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: "1.25rem",
            }}
          >
            Get In Touch
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#8899bb",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ color: "#0fd4a0" }}>📞</span> +91 9283 382 328
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#4a9eff",
                fontSize: "0.875rem",
              }}
            >
              <span style={{ color: "#0fd4a0" }}>✉️</span> medisync@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "0.5px solid rgba(74,158,255,0.1)",
          padding: "1.25rem 2.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ color: "#4a5878", fontSize: "0.78rem", margin: 0 }}>
          © 2026 Medisync · All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
