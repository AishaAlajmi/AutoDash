// File: src/lib/engine.js
// Purpose: centralize all AI / prompts logic used by the app

import { buildLocalFallback } from "../pages/dataAnalysis";

/**
 * Analyze a dataset using Gemini (or local fallback if no API key).
 * Returns the parsed JSON object:
 * { analysisText, keyMetrics: [...], charts: [...] }
 */
export async function analyzeDatasetWithAI({ headers, fileData, apiKey }) {
    const dataSample = JSON.stringify(fileData.slice(0, 5));

    const prompt = `You are a data analyst. Analyze the provided dataset with the following headers: ${headers.join(
        ", "
    )}.
Here is a small sample of the data to understand the structure:
${dataSample}

1. Provide a concise narrative summary of the data, highlighting key trends, relationships, and patterns you find.
2. Identify and calculate 4-5 key metrics from the data that would be most useful for a business professional. These metrics should be highly relevant to the dataset. For example, if it's a sales dataset, calculate total revenue. If it's a financial dataset, calculate total profit.
3. Generate a JSON object with a dashboard configuration for this data. The JSON must follow this exact structure, with meaningful dataKeys and nameKeys based on the provided dataset. The charts should be varied and logical for the type of data. The dataKeys for the charts should be numeric or counts of categorical values.

{
  "analysisText": "A detailed narrative summary of the data, highlighting key insights and trends.",
  "keyMetrics": [
    { "title": "Metric Title", "value": "Metric Value", "description": "Short description of the metric." }
  ],
  "charts": [
    { "type": "bar", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
    { "type": "line", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
    { "type": "pie", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
    { "type": "area", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" },
    { "type": "composed", "title": "Chart Title", "dataKey": "data_key", "nameKey": "name_key" }
  ]
}`;

    const payload = {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "OBJECT",
                properties: {
                    analysisText: { type: "STRING" },
                    keyMetrics: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                title: { type: "STRING" },
                                value: { type: "STRING" },
                                description: { type: "STRING" },
                            },
                        },
                    },
                    charts: {
                        type: "ARRAY",
                        items: {
                            type: "OBJECT",
                            properties: {
                                type: { type: "STRING" },
                                title: { type: "STRING" },
                                dataKey: { type: "STRING" },
                                nameKey: { type: "STRING" },
                            },
                        },
                    },
                },
            },
        },
    };

    const key = import.meta.env.VITE_GOOGLE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${key}`;

    // If no key is configured, fall back to local heuristic dashboard
    if (!key) {
        return buildLocalFallback(headers, fileData);
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
    }

    const result = await response.json();
    const jsonString = result?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonString) throw new Error("No valid response from AI.");

    try {
        const parsed = JSON.parse(jsonString);
        return parsed;
    } catch {
        throw new Error("Failed to parse AI response. The response format was invalid.");
    }
}

/**
 * Answer a user question about the dataset using Gemini.
 * Returns a final string to display to the user (including all error cases).
 */
export async function answerQuestionWithAI({ userQuery, fullData, preStats, apiKey }) {
    const prompt = `You are a helpful and knowledgeable data analyst.
You have access to a dataset and precomputed statistics. Your goal is to provide insightful and helpful answers to user questions.

USER QUESTION:
${userQuery}

DATASET (JSON rows):
${JSON.stringify(fullData)}

PRECOMPUTED STATS (safe to use):
${JSON.stringify(preStats)}

GUIDELINES:
- Carefully analyze the user's question and determine their underlying intent.
- Answer the question directly using the provided data and stats.
- If the question is indirect or implies a need for an analysis that isn't explicitly asked for, provide a relevant, helpful response that addresses the user's likely goal. For example, if a user asks "What's wrong with sales this quarter?", don't just say "I can't answer that." Instead, provide data-backed insights like "Sales are down by 15% compared to the previous quarter. The decline is most noticeable in the 'Electronics' category."
- If the question cannot be answered with the provided data, explain why in a friendly and helpful way, and offer to analyze other aspects of the dataset instead.
- **NEVER** respond with "I can't answer that from this data." Instead, try to provide a helpful, data-driven insight that is as close as possible to the user's request.`;

    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0, topK: 1, topP: 0 },
    };

    const key = import.meta.env.VITE_GOOGLE_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${key}`;

    // Keep the same user-facing messages as your original code:
    if (!key) {
        return "Sorry, I couldn't process that request. No AI key configured.";
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        return "Sorry, I couldn't process that request. There was an API error.";
    }

    const result = await response.json();
    const aiResponseText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiResponseText) {
        return "Sorry, I couldn't process that request. No valid response from AI.";
    }

    return aiResponseText;
}
