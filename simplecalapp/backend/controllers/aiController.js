const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

exports.generateSchedule = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt || !prompt.trim()) {
      return res.status(400).json({
        message: "Please enter a scheduling request.",
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Convert this scheduling request into a concise description of a calendar item. 
      Do not create or save any calendar records.Request: ${prompt}`
    });

    res.json({
      result: response.text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    res.status(500).json({
      message: "Unable to generate a schedule suggestion.",
    });
  }
}
