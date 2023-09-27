import getDiagnosis from "../openaiHandler.js";

getDiagnosis
async function diagnosis (req, res) {
    try {
      // List of prompts to send to the diagnosis model
      const disease = "acne";
  
      const prompts = [
        `Provide 5 key points about ${disease}.`,
        `List 5 medicines commonly used to treat ${disease}.`,
        `Outline 5 preventive measures against ${disease}.`,
        `Share 5 effective home remedies for ${disease}.`,
      ];
  
      // Array to store the responses
      const responses = [];
  
      // Call the getDiagnosis function for each prompt
      for (const prompt of prompts) {
        const diagnosis = await getDiagnosis(prompt);
        responses.push(diagnosis);
        console.log(diagnosis);
      }
  
      // Response object with the collected responses
      const response = {
        "Key Points": responses[0].split("\n").slice(0, 5), // Get the first 5 points
        "Common Medicines": responses[1].split("\n").slice(0, 5), // Get the first 5 medicines
        "Preventive Measures": responses[2].split("\n").slice(0, 5), // Get the first 5 measures
        "Home Remedies": responses[3].split("\n").slice(0, 5), // Get the first 5 remedies
      };
  
      return res.status(200).json(response);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error." });
    }
  }
  export {diagnosis};