import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 px-4"
      style={{ background: "#0f1829" }}
    >
      {/* Section heading */}
      <h1
        className="text-3xl font-semibold"
        style={{ fontFamily: "'Playfair Display', serif", color: "#e8f0ff" }}
      >
        Find by Speciality
      </h1>
      <p className="sm:w-1/3 text-center text-sm" style={{ color: "#8899bb" }}>
        Schedule your appointment hassle free
      </p>

      {/* Speciality cards */}
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-x-auto pb-2">
        {specialityData.map((item, index) => (
          <Link
            onClick={() => scrollTo(0, 0)}
            key={index}
            to={`doctors/${item.speciality}`}
            className="flex flex-col items-center gap-2 text-xs cursor-pointer shrink-0 px-4 py-5 rounded-2xl transition-all duration-500"
            style={{
              background: "#141f35",
              border: "0.5px solid rgba(74,158,255,0.12)",
              color: "#8899bb",
              minWidth: "96px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.borderColor = "#0fd4a0";
              e.currentTarget.style.background = "#1a2844";
              e.currentTarget.style.boxShadow =
                "0 12px 32px rgba(15,212,160,0.15)";
              e.currentTarget.style.color = "#e8f0ff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.borderColor = "rgba(74,158,255,0.12)";
              e.currentTarget.style.background = "#141f35";
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.color = "#8899bb";
            }}
          >
            {/* Icon wrapper */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(15,212,160,0.1)" }}
            >
              <img
                className="w-8 h-8 object-contain"
                src={item.image}
                alt={item.speciality}
              />
            </div>
            <p className="text-center leading-tight">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
