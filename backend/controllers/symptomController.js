import { recommendSpecialty } from "../utils/symptomChecker.js";

const checkSymptoms = async (req, res) => {
  try {
    const { symptoms } = req.body;
    if (
      !symptoms ||
      typeof symptoms !== "string" ||
      symptoms.trim().length < 3
    ) {
      return res.json({
        success: false,
        message: "Please describe your symptoms",
      });
    }

    const result = recommendSpecialty(symptoms);
    res.json({ success: true, result });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { checkSymptoms };
