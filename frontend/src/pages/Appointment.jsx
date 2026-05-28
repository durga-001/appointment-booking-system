import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);
      if (today.getDate === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);
  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div
        className="min-h-screen px-4 sm:px-8 md:px-12 py-10"
        style={{ background: "#0a0f1a" }}
      >
        {/* ── Doctor Details ── */}
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Photo */}
          <div className="shrink-0">
            <img
              className="w-full sm:max-w-72 rounded-2xl object-cover"
              style={{ background: "linear-gradient(160deg,#0d2040,#0a1a30)" }}
              src={docInfo.image}
              alt={docInfo.name}
            />
          </div>

          {/* Info card */}
          <div
            className="flex-1 rounded-2xl p-7"
            style={{
              background: "#141f35",
              border: "0.5px solid rgba(74,158,255,0.12)",
            }}
          >
            {/* Name + verified */}
            <p
              className="flex items-center gap-2 text-2xl font-semibold"
              style={{
                color: "#e8f0ff",
                fontFamily: "'Playfair Display',serif",
              }}
            >
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="verified" />
            </p>

            {/* Degree / speciality / experience */}
            <div
              className="flex items-center gap-3 text-sm mt-2"
              style={{ color: "#8899bb" }}
            >
              <p>
                {docInfo.degree} — {docInfo.speciality}
              </p>
              <span
                className="px-3 py-0.5 rounded-full text-xs"
                style={{
                  border: "0.5px solid rgba(15,212,160,0.4)",
                  color: "#0fd4a0",
                }}
              >
                {docInfo.experience}
              </span>
            </div>

            {/* About */}
            <div className="mt-5">
              <p
                className="flex items-center gap-1 text-sm font-medium mb-2"
                style={{ color: "#e8f0ff" }}
              >
                About <img src={assets.info_icon} alt="" />
              </p>
              <p
                className="text-sm leading-relaxed max-w-2xl"
                style={{ color: "#8899bb" }}
              >
                {docInfo.about}
              </p>
            </div>

            {/* Fee */}
            <div
              className="inline-flex items-center gap-2 mt-5 px-4 py-2 rounded-xl text-sm"
              style={{
                background: "rgba(15,212,160,0.08)",
                border: "0.5px solid rgba(15,212,160,0.2)",
              }}
            >
              <span style={{ color: "#8899bb" }}>Appointment Fee:</span>
              <span className="font-semibold" style={{ color: "#0fd4a0" }}>
                {currencySymbol}
                {docInfo.fees}
              </span>
            </div>
          </div>
        </div>

        {/* ── Booking Slots ── */}
        <div
          className="mt-8 rounded-2xl p-7 sm:ml-0"
          style={{
            background: "#141f35",
            border: "0.5px solid rgba(74,158,255,0.12)",
          }}
        >
          <p
            className="text-base font-semibold mb-5"
            style={{ color: "#e8f0ff" }}
          >
            Select Appointment Slot
          </p>

          {/* Day pills */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className="flex flex-col items-center py-4 min-w-[60px] rounded-2xl cursor-pointer transition-all duration-300 shrink-0"
                  style={{
                    background: slotIndex === index ? "#0fd4a0" : "#0f1829",
                    border:
                      slotIndex === index
                        ? "0.5px solid #0fd4a0"
                        : "0.5px solid rgba(74,158,255,0.15)",
                    color: slotIndex === index ? "#0a0f1a" : "#8899bb",
                    fontWeight: slotIndex === index ? "600" : "400",
                    boxShadow:
                      slotIndex === index
                        ? "0 4px 16px rgba(15,212,160,0.25)"
                        : "none",
                  }}
                >
                  <p className="text-xs">
                    {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                  </p>
                  <p className="text-lg font-semibold">
                    {item[0] && item[0].datetime.getDate()}
                  </p>
                </div>
              ))}
          </div>

          {/* Time pills */}
          <div className="flex items-center gap-3 overflow-x-auto mt-5 pb-2">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className="text-sm shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300"
                  style={{
                    background:
                      item.time === slotTime ? "#0fd4a0" : "transparent",
                    border:
                      item.time === slotTime
                        ? "0.5px solid #0fd4a0"
                        : "0.5px solid rgba(74,158,255,0.2)",
                    color: item.time === slotTime ? "#0a0f1a" : "#8899bb",
                    fontWeight: item.time === slotTime ? "600" : "400",
                  }}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>

          {/* Book button */}
          <button
            className="mt-7 px-14 py-3 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ background: "#0fd4a0", color: "#0a0f1a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 8px 28px rgba(15,212,160,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Book Appointment
          </button>
        </div>

        {/* Related doctors */}
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
