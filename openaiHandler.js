import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const getDiagnosis = async (prompt) => {
  try {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const requestData = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a dermatologist.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const response = await axios.post(apiUrl, requestData, { headers });
    const diagnosis = response.data.choices[0].message.content;

    return diagnosis;
  } catch (error) {
    console.error('Error:', error);
    throw new Error('Failed to get diagnosis from OpenAI API');
  }
};

export default getDiagnosis;
