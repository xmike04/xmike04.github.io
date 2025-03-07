document.addEventListener('DOMContentLoaded', function() {
  console.log('JavaScript loaded');

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70, // Adjust for fixed navbar height
                  behavior: 'smooth'
              });
          }
      });
  });

  // Chatbot functionality
  const chatLog = document.getElementById('chatLog');
  const chatInput = document.getElementById('chatInput');
  const sendChat = document.getElementById('sendChat');

  function appendMessage(sender, message) {
      const messageElem = document.createElement('div');
      messageElem.className = sender;
      messageElem.textContent = message;
      chatLog.appendChild(messageElem);
      chatLog.scrollTop = chatLog.scrollHeight;
  }

  // Async function to call the Render backend
  async function getBotResponse(userMessage) {
    const backendUrl = "https://xmike04-github-io.onrender.com/api/chatbot";


      try {
          const response = await fetch(backendUrl, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify({ message: userMessage })
          });

          if (!response.ok) {
              throw new Error("Failed to get response from the server.");
          }

          const data = await response.json();
          return data.response;
      } 
      catch (error) {
          console.error(error);
          return "Oops! I'm having trouble fetching a response right now. Try again later.";
      }
  }

  // Function to handle sending messages
  async function handleSend() {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    appendMessage("user-message", "You: " + userMessage);
    chatInput.value = "";

    appendMessage("bot-message", "AI is typing...");  // Temporary loading text
    
    const botResponse = await getBotResponse(userMessage);
    
    chatLog.removeChild(chatLog.lastChild); // Remove "AI is typing..."
    appendMessage("bot-message", "AI: " + botResponse);
  }


  sendChat.addEventListener('click', handleSend);
  chatInput.addEventListener('keypress', function(e) {
      if (e.key === "Enter") {
          handleSend();
      }
  });

  // Back to Top button functionality
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
          backToTop.style.display = "block";
      } else {
          backToTop.style.display = "none";
      }
  });

  backToTop.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
});
