import getDiagnosis from "../openaiHandler.js";

async function searchDisease (req, res){
    try {
      // Get the disease name from the query parameters
      const disease = req.query.disease;
  
      // List of prompts for disease information search
      const prompts = [
        `Provide 5 key points , symtons and risk factors about ${disease}.`,
        `Explain the available treatment options for ${disease}.`
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
        "Common Symptoms": responses[1]
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }

  export {searchDisease};