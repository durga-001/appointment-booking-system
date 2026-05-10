import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex       bg-linear-to-r from-green-800 to-blue-500
 rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 md:mx-10"
    >
      {/* left */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white">
          <p>Book Appointment</p>
          <p>With Trusted Doctors</p>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>
      {/* right */}
      <div className="hidden md:block md:w-1/2 lg:w-[92.5%] relative">
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Banner;
