import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const generateAssignment = async (req, res) => {
  try {
    const {
      subject,
      topic,
      difficulty,
      questionCount,
    } = req.body;

    // Validation
    if (
      !subject ||
      !topic ||
      !difficulty ||
      !questionCount
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

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

    let response;

    // Retry Gemini up to 3 times
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response =
          await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
          });

        break;
      } catch (error) {
        console.error(
          `Gemini Attempt ${attempt} Failed:`,
          error.message
        );

        if (attempt === 3) {
          throw error;
        }

        await sleep(2000);
      }
    }

    let text =
      response.text ||
      response.candidates?.[0]?.content?.parts?.[0]
        ?.text ||
      "";

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    if (!text) {
      return res.status(500).json({
        success: false,
        message: "Empty response from AI",
      });
    }

    let assignment;

    try {
      assignment = JSON.parse(text);
    } catch (parseError) {
      console.error(
        "JSON Parse Error:",
        parseError
      );

      console.error("AI Response:", text);

      return res.status(500).json({
        success: false,
        message:
          "AI returned invalid JSON format",
      });
    }

    return res.status(200).json({
      success: true,
      assignment,
    });
  } catch (error) {
    console.error("Generate Assignment Error:");

    console.error(error);

    if (error?.status === 503) {
      return res.status(503).json({
        success: false,
        message:
          "Gemini is currently busy. Please try again in a few moments.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Internal Server Error",
    });
  }
};