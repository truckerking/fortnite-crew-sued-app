import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API-Schlüssel nicht gefunden. Verwende Mock-Daten.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const getDailyFortniteQuote = async (firstName: string): Promise<string> => {
  if (!API_KEY) {
    const quotes = [
        `Zeit für einen epischen Sieg, ${firstName}! Lass uns reinspringen!`,
        `Die Lobby wartet nicht, ${firstName}! Hol dir den Sieg!`,
        `Auf geht's, ${firstName}, der Battle Bus startet gleich!`,
    ];
    return Promise.resolve(quotes[Math.floor(Math.random() * quotes.length)]);
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Generiere ein kurzes, lustiges und motivierendes Zitat für einen Fortnite-Gamer namens ${firstName}. Sprich die Person direkt an. Halte es unter 20 Wörtern, auf Deutsch und im typischen Fortnite-Ton. Es sollte bei jedem Aufruf anders sein.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Fehler beim Abrufen des täglichen Zitats von Gemini:", error);
    return `Der Sturm zieht sich zusammen, ${firstName}... auf einen großartigen Tag voller Gaming! Hol sie dir!`;
  }
};

export const generateAvatarImage = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    // Gibt ein Platzhalterbild zurück, falls kein API-Schlüssel vorhanden ist
    const placeholderUrl = `https://i.pravatar.cc/150?u=${encodeURIComponent(prompt)}`;
    const response = await fetch(placeholderUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [{ text: `Ein Avatar im Stil von Fortnite: ${prompt}` }]
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data; // Gibt den Base64-String zurück
        }
    }
    throw new Error("Kein Bild in der API-Antwort gefunden.");

  } catch (error) {
    console.error("Fehler bei der Generierung des Avatar-Bildes von Gemini:", error);
    throw error; // Wirft den Fehler zur Behandlung in der Komponente weiter
  }
};
