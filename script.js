let approvedValue = 87;
let sanctionedValue = 0;
let loanProgress = 0;

const approvedElement = document.getElementById("approved-value");
const sanctionedElement = document.getElementById("sanctioned-value");
const loanProgressBar = document.getElementById("loan-progress-bar");
const statsSection = document.getElementById("loan-stats");

function incrementValues() {
  approvedValue++;
  sanctionedValue += Math.random();
  if (approvedValue <= sanctionedValue) {
    approvedValue = sanctionedValue + 1;
  }
  loanProgress = Math.min(loanProgress + 0.1, 100);
  approvedElement.innerText = Math.floor(approvedValue);
  sanctionedElement.innerText = Math.floor(sanctionedValue);
  updateProgressBar();
  if (loanProgress >= 100) {
    clearInterval(statsInterval);
  }
}

function updateProgressBar() {
  const total = approvedValue + sanctionedValue;
  const approvedPercentage = (approvedValue / total) * 100;
  const sanctionedPercentage = (sanctionedValue / total) * 100;
  loanProgressBar.style.width = "100%";
  loanProgressBar.style.background = `linear-gradient(to right, #4caf50 ${approvedPercentage}%, #ff9800 ${approvedPercentage}% ${
    approvedPercentage + sanctionedPercentage
  }%)`;
}

const statsInterval = setInterval(incrementValues, 100);

let userName = "";
let userPhone = "";
const randomNames = ["John", "Emma", "Sophia", "Michael", "Olivia"];
let randomName = ""; // Store random name for entire conversation

function openChat() {
  document.getElementById("chatbot").style.display = "block";
  document.getElementById("open-chat").style.display = "none";
  resetChat();
}

function closeChat() {
  document.getElementById("chatbot").style.display = "none";
  document.getElementById("open-chat").style.display = "block";
}

function resetChat() {
  userName = "";
  userPhone = "";
  randomName = ""; // Reset random name on restart
  document.getElementById(
    "chat-box"
  ).innerHTML = `<p class="bot-message">Hello! Are you a new or existing customer?</p>`;
  document.getElementById("chat-options").style.display = "flex"; // Show options
  document.getElementById("user-form").style.display = "none";
  document.getElementById("loan-options").style.display = "none";
}

function chooseCustomer(type) {
  document.getElementById("chat-options").style.display = "none";
  document.getElementById("user-form").style.display = "flex";

  if (type === "new") {
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">New Customer: What is your name?</p>`;
  } else {
    randomName = randomNames[Math.floor(Math.random() * randomNames.length)]; // Assign random name for the entire chat
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Existing Customer: Welcome back, ${randomName}. Please enter your account number.</p>`;
  }
}

function handleInput(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const userMessage = document.getElementById("user-input").value.trim();
  if (!userMessage) return;

  document.getElementById(
    "chat-box"
  ).innerHTML += `<p class="user-message">${userMessage}</p>`;
  document.getElementById("user-input").value = "";

  if (!userName) {
    userName = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Nice to meet you, ${userName}. Please enter your phone number.</p>`;
  } else if (!userPhone) {
    userPhone = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${userName}. Phone number ${userPhone} confirmed. What type of loan are you interested in?</p>`;
    document.getElementById("user-form").style.display = "none";
    document.getElementById("loan-options").style.display = "block";
  } else {
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${randomName}. Your account has been verified. Loan is processed.</p>`;
    document.getElementById("user-input").disabled = true; // Disable the input box after loan processing
  }
}

function selectLoan(loanType) {
  document.getElementById("loan-options").style.display = "none";
  document.getElementById(
    "chat-box"
  ).innerHTML += `<p class="bot-message">You selected a ${loanType} loan. Please provide the necessary documents.</p>`;
  document.getElementById("user-form").style.display = "flex";
  document.getElementById("user-input").disabled = false; // Enable the text box again when providing documents
}

function autoScroll() {
  const chatBox = document.getElementById("chat-box");
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom of the chat box
}

// Call autoScroll every time the chat box is updated
document
  .getElementById("chat-box")
  .addEventListener("DOMNodeInserted", autoScroll);

function openChat() {
  document.getElementById("chatbot").style.display = "block";
  document.getElementById("open-chat").style.display = "none";
  resetChat();
}

function closeChat() {
  document.getElementById("chatbot").style.display = "none";
  document.getElementById("open-chat").style.display = "block";
}

function resetChat() {
  userName = "";
  userPhone = "";
  document.getElementById(
    "chat-box"
  ).innerHTML = `<p class="bot-message">Hello! Are you a new or existing customer?</p>`;
  document.getElementById("chat-options").style.display = "flex";
  document.getElementById("user-form").style.display = "none";
  document.getElementById("loan-options").style.display = "none";
}

function chooseCustomer(type) {
  document.getElementById("chat-options").style.display = "none";
  document.getElementById("user-form").style.display = "flex";
  if (type === "new") {
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">New Customer: What is your name?</p>`;
  } else {
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Existing Customer: Please enter your account number.</p>`;
  }
}

function handleInput(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}

function sendMessage() {
  const userMessage = document.getElementById("user-input").value.trim();
  if (!userMessage) return;

  addUserMessage(userMessage);
  document.getElementById("user-input").value = "";

  if (!userName) {
    userName = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Nice to meet you, ${userName}. Please enter your phone number.</p>`;
  } else if (!userPhone) {
    userPhone = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${userName}. Phone number ${userPhone} confirmed. What type of loan are you interested in?</p>`;
    document.getElementById("user-form").style.display = "none";
    document.getElementById("loan-options").style.display = "block";
  } else {
    let randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${randomName}. Your account has been verified. Loan is processed.</p>`;
  }
}

function addUserMessage(message) {
  document.getElementById(
    "chat-box"
  ).innerHTML += `<p class="user-message">${message}</p>`;
}

function selectLoan(loanType) {
  document.getElementById("loan-options").style.display = "none";
  document.getElementById(
    "chat-box"
  ).innerHTML += `<p class="bot-message">You selected a ${loanType} loan. Please provide your bank Account number and details.</p>`;
  document.getElementById("user-form").style.display = "flex";
  


}
function sendMessage() {
  const userMessage = document.getElementById("user-input").value.trim();
  if (!userMessage) return;

  addUserMessage(userMessage);
  document.getElementById("user-input").value = "";

  if (!userName) {
    userName = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Nice to meet you, ${userName}. Please enter your phone number.</p>`;
  } else if (!userPhone) {
    userPhone = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${userName}. Phone number ${userPhone} confirmed. What type of loan are you interested in?</p>`;
    document.getElementById("user-form").style.display = "none";
    document.getElementById("loan-options").style.display = "block";
  } else {
    let randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${randomName}. Your account has been verified. Loan is processed.</p>`;

    // Disable the text box after the loan is processed
    document.getElementById("user-input").disabled = true;
  }
}
function addUserMessage(message) {
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<p class="user-message">${message}</p>`;
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
}

function openChat() {
  document.getElementById("chatbot").style.display = "block";
  document.getElementById("open-chat").style.display = "none";
  resetChat(); // Reset the chat when opening
}

function closeChat() {
  document.getElementById("chatbot").style.display = "none";
  document.getElementById("open-chat").style.display = "block";
}

function resetChat() {
  userName = "";
  userPhone = "";
  // Clear chat history
  document.getElementById("chat-box").innerHTML = "";

  // Enable the text box
  const userInputElement = document.getElementById("user-input");
  userInputElement.disabled = false;

  // Reset the chat bot messages
  document.getElementById(
    "chat-box"
  ).innerHTML = `<p class="bot-message">Hello! Are you a new or existing customer?</p>`;

  // Show initial options
  document.getElementById("chat-options").style.display = "flex"; // Show options
  document.getElementById("user-form").style.display = "none"; // Hide form
  document.getElementById("loan-options").style.display = "none"; // Hide loan options
}
function sendMessage() {
  const userMessage = document.getElementById("user-input").value.trim();
  if (!userMessage) return;

  addUserMessage(userMessage);
  document.getElementById("user-input").value = "";

  if (!userName) {
    userName = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Nice to meet you, ${userName}. Please enter your phone number.</p>`;
  } else if (!userPhone) {
    userPhone = userMessage;
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${userName}. Phone number ${userPhone} confirmed. What type of loan are you interested in?</p>`;
    document.getElementById("user-form").style.display = "none";
    document.getElementById("loan-options").style.display = "block";
  } else {
    let randomName =
      randomNames[Math.floor(Math.random() * randomNames.length)];
    document.getElementById(
      "chat-box"
    ).innerHTML += `<p class="bot-message">Thank you, ${userName}. Your account has been verified. Loan is processed.</p>`;

    // Disable the text box after processing the loan
    document.getElementById("user-input").disabled = true;
  }

  // Ensure chat scrolls to the bottom after a message
  setTimeout(() => {
    const chatBox = document.getElementById("chat-box");
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
  }, 100); // Delay to ensure content is fully rendered before scrolling
}

