import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import "dotenv/config";
import doctorModel from "./models/doctorModel.js";

// Same 15 doctors from frontend/src/assets/assets.js, inserted for real
// so /api/doctor/list has actual data to return. Images use placeholders
// since the real .png files live in the frontend bundle, not reachable
// from this backend script — swap them later via the admin panel upload.
const about =
  "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.";

const sampleDoctors = [
  {
    name: "Dr. Richard James",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Emily Larson",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Sarah Patel",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Christopher Lee",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Jennifer Garcia",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Andrew Williams",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Christopher Davis",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Timothy White",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Ava Mitchell",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Jeffrey King",
    speciality: "Pediatricians",
    degree: "MBBS",
    experience: "2 Years",
    fees: 40,
    address: {
      line1: "47th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Zoe Kelly",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Patrick Harris",
    speciality: "Neurologist",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "57th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Chloe Evans",
    speciality: "General physician",
    degree: "MBBS",
    experience: "4 Years",
    fees: 50,
    address: {
      line1: "17th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Ryan Martinez",
    speciality: "Gynecologist",
    degree: "MBBS",
    experience: "3 Years",
    fees: 60,
    address: {
      line1: "27th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
  {
    name: "Dr. Amelia Hill",
    speciality: "Dermatologist",
    degree: "MBBS",
    experience: "1 Years",
    fees: 30,
    address: {
      line1: "37th Cross, Richmond",
      line2: "Circle, Ring Road, London",
    },
  },
];

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected. Seeding doctors...");

    const password = await bcrypt.hash("doctor123", 10); // placeholder login for every seeded doctor

    for (let i = 0; i < sampleDoctors.length; i++) {
      const d = sampleDoctors[i];
      const email = `doctor${i + 1}@medisync.test`;
      const exists = await doctorModel.findOne({ email });
      if (exists) {
        console.log(`Skipping ${d.name} — already exists`);
        continue;
      }
      await doctorModel.create({
        ...d,
        about,
        email,
        password,
        image: `http://localhost:4000/uploads/doc${i + 1}.png`,
        available: true,
        date: Date.now(),
      });
      console.log(`Added ${d.name}`);
    }

    console.log("Done.");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seed();
