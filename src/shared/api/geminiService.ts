import { GoogleGenAI } from "@google/genai";
import { Scenario } from '../model/types';

// Ensure API key is present
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

// Generic helper for text generation
export const generateFeedback = async (
  prompt: string,
  systemInstruction: string = "You are a helpful STEM education assistant."
): Promise<string> => {
  if (!API_KEY) return "AI Feedback unavailable: API Key missing.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
      },
    });
    return response.text || "No feedback generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating feedback. Please try again.";
  }
};

export const analyzeAnalysisResponse = async (
  question: string,
  answer: string,
  keyTerms: string[]
) => {
  const prompt = `
    Question: "${question}"
    Student Answer: "${answer}"
    Key Concepts to look for: ${keyTerms.join(', ')}

    Evaluate the student's answer. Did they identify the key concepts? 
    Provide a concise, encouraging 2-sentence feedback.
  `;
  return generateFeedback(prompt, "You are an expert STEM teacher providing feedback to another teacher.");
};

export const analyzeJustification = async (
  solution: string,
  justification: string,
  context: string
) => {
  const prompt = `
    Scenario Context: ${context}
    Chosen Solution: ${solution}
    User Justification: "${justification}"

    Analyze the reasoning. Is it logical based on the context? 
    Highlight one strength and one potential oversight. Max 50 words.
  `;
  return generateFeedback(prompt, "You are a critical thinking evaluator.");
};


export const generateTaskContent = async (topic: string, grade: string, discipline: string): Promise<{ description: string; solution: string } | null> => {
  if (!API_KEY) return null;

  const prompt = `Create a specific task/problem for a lesson scenario.
  Topic: "${topic}"
  Grade Level: "${grade}"
  Discipline: "${discipline}"

  Return a JSON object with:
  - description: The task or problem statement for the student.
  - solution: The correct answer or solution for the teacher.
  
  JSON format: { "description": "...", "solution": "..." }`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Task Generation Error:", error);
    return null;
  }
};

export const generateTaskSolution = async (topic: string, grade: string, discipline: string, description: string): Promise<string | null> => {
  if (!API_KEY) return null;

  const prompt = `Provide a solution for the following task.
  Topic: "${topic}"
  Grade Level: "${grade}"
  Discipline: "${discipline}"
  Task Description: "${description}"

  Return ONLY the solution text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || null;
  } catch (error) {
    console.error("Solution Generation Error:", error);
    return null;
  }
};

export const generateImagePrompt = async (topic: string, discipline: string, description: string): Promise<string | null> => {
  if (!API_KEY) return null;

  const prompt = `Create a detailed image generation prompt for a cover image representing this task.
    Topic: "${topic}"
    Discipline: "${discipline}"
    Task: "${description}"
    
    The prompt should be descriptive and suitable for an AI image generator. Return ONLY the prompt text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || null;
  } catch (error) {
    console.error("Image Prompt Generation Error:", error);
    return null;
  }
}
