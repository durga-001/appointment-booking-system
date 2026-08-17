const specialtyKeywords = {
  Dermatologist: [
    "rash",
    "itchy skin",
    "acne",
    "skin",
    "eczema",
    "hives",
    "mole",
    "psoriasis",
    "hair loss",
  ],
  Gastroenterologist: [
    "stomach pain",
    "nausea",
    "vomiting",
    "diarrhea",
    "constipation",
    "bloating",
    "acid reflux",
    "heartburn",
    "abdominal pain",
    "indigestion",
  ],
  "General physician": [
    "fever",
    "cold",
    "cough",
    "flu",
    "fatigue",
    "body ache",
    "sore throat",
    "headache",
    "weakness",
    "chills",
  ],
  Gynecologist: [
    "menstrual",
    "period pain",
    "pregnancy",
    "irregular periods",
    "pcos",
    "vaginal",
  ],
  Neurologist: [
    "headache",
    "migraine",
    "dizziness",
    "seizure",
    "numbness",
    "tingling",
    "memory loss",
    "tremor",
    "vertigo",
  ],
  Pediatricians: [
    "child fever",
    "infant",
    "baby rash",
    "child cough",
    "vaccination",
    "toddler",
  ],
};

export const recommendSpecialty = (symptomText) => {
  const text = symptomText.toLowerCase();
  const scores = {};

  for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
    let score = 0;
    let matched = [];
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        score += keyword.split(" ").length; // multi-word phrases score higher
        matched.push(keyword);
      }
    }
    if (score > 0) scores[specialty] = { score, matched };
  }

  const ranked = Object.entries(scores).sort((a, b) => b[1].score - a[1].score);

  if (ranked.length === 0) {
    return {
      recommended: "General physician",
      confidence: "low",
      reason:
        "No specific symptoms matched; defaulting to a general physician for triage.",
      alternatives: [],
    };
  }

  const [topSpecialty, topData] = ranked[0];
  return {
    recommended: topSpecialty,
    confidence: topData.score >= 2 ? "high" : "medium",
    reason: `Matched keywords: ${topData.matched.join(", ")}`,
    alternatives: ranked.slice(1, 3).map(([s]) => s),
  };
};
