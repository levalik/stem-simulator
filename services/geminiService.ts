import { GoogleGenAI } from "@google/genai";
import { Scenario } from '../types';

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

export const generateScenarioFromTopic = async (topic: string): Promise<Partial<Scenario> | null> => {
  if (!API_KEY) return null;

  const prompt = `Create a STEM simulation scenario about "${topic}" in JSON format.
  Structure it exactly like this TypeScript interface:
  {
    title: string,
    category: string,
    duration: string,
    opening: { description: string },
    problem: { text: string, context: string },
    data: { chartType: 'bar', chartData: [{name: string, value: number}], description: string },
    analysis: { questions: string[], keyTerms: string[] },
    solutions: { options: [{id: string, text: string, correct: boolean, resultId: string}] },
    simulation: { results: { [resultId]: { summary: string, detail: string, outcomeType: 'success'|'failure' } } },
    reflection: { questions: string[] }
  }
  Ensure the IDs are unique strings. Return ONLY the JSON.`;

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
    return JSON.parse(text) as Partial<Scenario>;
  } catch (error) {
    console.error("Scenario Generation Error:", error);
    return null;
  }
};
