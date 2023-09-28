import getDiagnosis from "../openaiHandler.js";

const predefined = [
  {
    diseaseName: "Acne",
    keyPoints: "test",
    commonSymptoms: "test",
  },
  {
    diseaseName: "Eczema",
    keyPoints: "test",
    commonSymptoms: "test",
  },
  {
    diseaseName: "hello",
    keyPoints: "test",
    commonSymptoms: "test",
  },
  {
    diseaseName: "1234",
    keyPoints: "test",
    commonSymptoms: "test",
  },
];

async function searchDisease(req, res) {
  try {
    // Get the disease name from the query parameters
    const disease = req.query.disease;
    console.log(disease);

    for (const p of predefined) {
      if (disease.toLowerCase().includes(p.diseaseName.toLowerCase())) {
        const response = {
          "Key Points": p.keyPoints,
          "Common Symptoms": p.commonSymptoms,
        };

        return res.status(200).json(response);
      }
    }

    // List of prompts for disease information search
    const prompts = [
      `Provide 5 key points , symtons and risk factors about ${disease}.`,
      `Explain the available treatment options for ${disease}.`,
    ];

    // Array to store the responses
    const responses = [];

    // Call the getDiagnosis function for each prompt
    for (const prompt of prompts) {
      const diseaseInfo = await getDiagnosis(prompt);
      responses.push(diseaseInfo);
      console.log(diseaseInfo);
    }

    // Response object with the collected disease information
    const response = {
      "Key Points": responses[0],
      "Common Symptoms": responses[1],
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error." });
  }
}

export { searchDisease };
