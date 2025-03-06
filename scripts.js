// script.js
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
            top: targetElement.offsetTop - 60, // Adjust for fixed navbar height
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
  
    function getBotResponse(userMessage) {
      const msg = userMessage.toLowerCase();
      if (msg.includes("ai") || msg.includes("tensorflow") || msg.includes("pytorch") || msg.includes("opencv")) {
        return "I'm really passionate about AI! I love building innovative AI/ML solutions with tools like TensorFlow, PyTorch, and OpenCV.";
      } else if (msg.includes("project")) {
        return "I’ve worked on projects ranging from NASA collaborations to high-accuracy digit recognition models.";
      } else if (msg.includes("skill")) {
        return "My expertise spans JavaScript, Python, C++, modern web frameworks, and advanced AI techniques.";
      } else {
        return "That's an interesting question! I'm always eager to explore new ideas and innovate.";
      }
    }
  
    function handleSend() {
      const userMessage = chatInput.value.trim();
      if (userMessage === "") return;
      appendMessage("user-message", "You: " + userMessage);
      chatInput.value = "";
      const botResponse = getBotResponse(userMessage);
      setTimeout(() => {
        appendMessage("bot-message", "AI: " + botResponse);
      }, 500);
    }
  
    sendChat.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === "Enter") {
        handleSend();
      }
    });
  });
  