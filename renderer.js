const fetch = require("node-fetch");

const promptInput = document.getElementById("prompt");
const sendButton = document.getElementById("send");
const outputDiv = document.getElementById("output");

sendButton.addEventListener("click", async () => {
  const promptText = promptInput.value;
  if (!promptText) return;

  outputDiv.textContent += "\n> " + promptText + "\n";

  try {
    const response = await fetch("http://localhost:5000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText })
    });

    const data = await response.json();
    outputDiv.textContent += data.response + "\n";

    promptInput.value = "";
  } catch (err) {
    outputDiv.textContent += "Error: " + err + "\n";
  }
});