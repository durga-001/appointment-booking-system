import { createContext, useState, useEffect } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = `$`;

  // ---- Auth state ----
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null,
  );

  const login = (email, password) => {
    // Mock auth — swap for a real API call once you have a backend
    if (!email || !password)
      return { success: false, message: "Email and password required" };
    const fakeToken = "mock-token-" + Date.now();
    const user = { name: email.split("@")[0], email };
    setToken(fakeToken);
    setUserData(user);
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userData", JSON.stringify(user));
    return { success: true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password)
      return { success: false, message: "All fields required" };
    const fakeToken = "mock-token-" + Date.now();
    const user = { name, email };
    setToken(fakeToken);
    setUserData(user);
    localStorage.setItem("token", fakeToken);
    localStorage.setItem("userData", JSON.stringify(user));
    return { success: true };
  };

  const logout = () => {
    setToken("");
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  // ---- Appointments state ----
  const [appointments, setAppointments] = useState(
    localStorage.getItem("appointments")
      ? JSON.parse(localStorage.getItem("appointments"))
      : [],
  );

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = (docId, slotDate, slotTime) => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    if (!docInfo) return { success: false, message: "Doctor not found" };

    const newAppointment = {
      id: "appt-" + Date.now(),
      docId,
      docData: docInfo,
      slotDate,
      slotTime,
      cancelled: false,
      payment: false,
    };

    setAppointments((prev) => [...prev, newAppointment]);
    return { success: true, appointment: newAppointment };
  };

  const cancelAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId ? { ...appt, cancelled: true } : appt,
      ),
    );
  };

  const payAppointment = (appointmentId) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === appointmentId ? { ...appt, payment: true } : appt,
      ),
    );
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    userData,
    login,
    signup,
    logout,
    appointments,
    bookAppointment,
    cancelAppointment,
    payAppointment,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
