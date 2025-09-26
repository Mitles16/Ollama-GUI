const fetch = require("node-fetch"); // npm install node-fetch@2 if needed

// Async function to call your Flask endpoint
async function askOllama(promptText) {
  try {
    const response = await fetch("http://localhost:5000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await response.json();   // Parse JSON
    console.log("AI Response:", data.response);  // Print AI text in console
  } catch (err) {
    console.error("Error calling Ollama:", err);
  }
}

// Example usage
askOllama("What are you up to?");