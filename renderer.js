const promptInput = document.getElementById("prompt");
const sendButton = document.getElementById("send");
const outputDiv = document.getElementById("output");

function addChatBlock(userMsg, aiMsg) {
  const chatBlock = document.createElement("div");
  chatBlock.classList.add("chat-block");

  // User message
  const userDiv = document.createElement("div");
  userDiv.classList.add("message", "user");
  userDiv.textContent = userMsg;
  chatBlock.appendChild(userDiv);

  // AI message
  const aiDiv = document.createElement("div");
  aiDiv.classList.add("message");
  aiDiv.textContent = aiMsg;
  chatBlock.appendChild(aiDiv);

  outputDiv.appendChild(chatBlock);

  // Scroll to bottom
  outputDiv.scrollTop = outputDiv.scrollHeight;
}

sendButton.addEventListener("click", async () => {
  const userMessage = promptInput.value.trim();
  if (!userMessage) return;

  promptInput.value = ""; // clear input

  // temporary loading message
  addChatBlock(userMessage, "Loading...");

  try {
    const response = await fetch("http://localhost:5000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: userMessage })
    });

    const data = await response.json();

    // Replace "Loading..." with actual AI response
    const lastBlock = outputDiv.lastElementChild;
    lastBlock.querySelector(".message:not(.user)").textContent = data.response;

  } catch (err) {
    const lastBlock = outputDiv.lastElementChild;
    lastBlock.querySelector(".message:not(.user)").textContent = "Error: " + err;
  }
});

// Press Enter to send
promptInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendButton.click();
});