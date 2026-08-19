import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AppContext = createContext();

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const AppContextProvider = (props) => {
  const currencySymbol = "$";

  // ---- Auth state ----
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);

  // ---- Doctors (fetched from backend, not hardcoded) ----
  const [doctors, setDoctors] = useState([]);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ---- Profile ----
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) setUserData(data.userData);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      return data; // { success, token } or { success:false, message }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  const signup = async (name, email, password) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      }
      return data;
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setToken("");
    setUserData(null);
    localStorage.removeItem("token");
  };

  // ---- Appointments ----
  // bookAppointment now hits the real API. It no longer manages local
  // appointment state itself - MyAppointment.jsx re-fetches from the
  // server after navigating there, so there's one source of truth.
  const bookAppointment = async (docId, slotDate, slotTime) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      // refresh doctor list so slots_booked reflects the new booking
      // immediately (important for the busy/free slot display)
      if (data.success) getDoctorsData();
      return data; // { success, message }
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null);
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    backendUrl,
    token,
    setToken,
    userData,
    loadUserProfileData,
    login,
    signup,
    logout,
    bookAppointment,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
