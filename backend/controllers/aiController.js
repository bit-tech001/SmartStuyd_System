import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateAssignment = async (req, res) => {
  try {
    const {
      subject,
      topic,
      difficulty,
      questionCount,
    } = req.body;

    const prompt = `
Generate an assignment.

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}
Questions: ${questionCount}

Return ONLY valid JSON.

{
  "title": "",
  "description": "",
  "questions": [
    {
      "questionText": "",
      "options": [
        {
          "text": "",
          "isCorrect": true
        },
        {
          "text": "",
          "isCorrect": false
        },
        {
          "text": "",
          "isCorrect": false
        },
        {
          "text": "",
          "isCorrect": false
        }
      ]
    }
  ]
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    const assignment = JSON.parse(text);

    res.json(assignment);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};