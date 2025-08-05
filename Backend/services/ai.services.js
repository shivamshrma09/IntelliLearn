const { GoogleGenerativeAI } = require("@google/generative-ai");

// --- IMPORTANT: Initialize your AI model here ---
// Replace "YOUR_GEMINI_API_KEY" with your actual API key.
// It's highly recommended to use environment variables (e.g., process.env.GEMINI_API_KEY)
// for your API key in a real application, rather than hardcoding it.
const genAI = new GoogleGenerativeAI("AIzaSyAiUZ7jN_OKeMM-mYDK3ptyNUMO5AZ3QH0"); // <<< Replace this placeholder!
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generateResponse = async (prompt) => {
  try {
    console.log(`AI Service: Generating response for prompt length: ${prompt.length}`);

    // The 'model' is now defined and ready to be used here
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    if (!text || text.trim().length === 0) {
      throw new Error('Generated response was empty or only whitespace.');
    }

    console.log(`AI Service: Generated response length: ${text.length}`);
    console.log(`AI Service: Response preview: ${text.substring(0, 200)}`);
    return text;
  } catch (error) {
    console.error('AI Service Error:', error);
    // Re-throwing the error so the calling controller can handle it gracefully
    throw error;
  }
};

module.exports = { generateResponse };