import getDiagnosis from "../openaiHandler.js";

async function searchDisease (req, res){
    try {
      // Get the disease name from the query parameters
      const disease = req.query.disease;
  
      // List of prompts for disease information search
      const prompts = [
        `Provide 5 key points about ${disease}.`,
        `List 5 common symptoms of ${disease}.`,
        `Describe the causes and risk factors of ${disease}.`,
        `Explain the available treatment options for ${disease}.`,
        `Share any recent research findings related to ${disease}.`,
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
        "Key Points": responses[0].split("\n").slice(0, 5), // Get the first 5 points
        "Common Symptoms": responses[1].split("\n").slice(0, 5), // Get the first 5 symptoms
        "Causes and Risk Factors": responses[2].split("\n").slice(0, 5), // Get the first 5 causes
        "Treatment Options": responses[3].split("\n").slice(0, 5), // Get the first 5 treatment options
        "Research Findings": responses[4].split("\n").slice(0, 5), // Get the first 5 research findings
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }

  export {searchDisease};