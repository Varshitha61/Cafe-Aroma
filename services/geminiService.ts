/// <reference types="vite/client" />
// src/services/geminiService.ts
// Frontend helper: calls our backend API instead of Gemini directly.

const API_URL =
  (import.meta.env.VITE_BARISTA_API_URL as string) || "/api/barista";

export async function getBaristaResponse(
  userMessage: string
): Promise<string> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userMessage }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("Barista API error:", response.status, text);
    throw new Error("Failed to get response from barista API");
  }

  const data = (await response.json()) as {
    reply?: string;
    error?: string;
  };

  if (data.error) {
    throw new Error(data.error);
  }

  return (
    data.reply ||
    "I'm sorry, I'm having trouble brewing a response right now. Please try again!"
  );
}
