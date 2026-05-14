import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-w-90" src={assets.about_image} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600">
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
            specialities. Whether you need a general physician for routine
            checkups, a pediatrician for your child’s health, or a specialist
            for advanced treatment, our network is designed to meet your needs.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            We envision a world where healthcare is simple, transparent, and
            accessible to everyone. By bridging the gap between patients and
            trusted doctors, we strive to empower individuals to make informed
            decisions and lead healthier lives.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p>
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency: </b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Confidence: </b>
          <p>
            Access to a network of trusted healthcare professionals in your
            area.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization: </b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your health.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
