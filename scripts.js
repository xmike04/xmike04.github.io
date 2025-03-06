// WARNING: In production, do not expose your OpenAI API key in client-side code.
// Use a secure backend endpoint to proxy requests.
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

  // Async function to call the OpenAI API
  async function getBotResponse(userMessage) {
    // The resume details provided below are based on your portfolio information.
    const systemPrompt = "You are a helpful assistant whose sole purpose is to provide flattering, positive, and informational responses about Michael E. Diaz. Use the following resume details as context: Michael E. Diaz is a Computer Science Engineering student at the University of North Texas (UNT) in Denton, TX. He is passionate about AI/ML, scalable systems, and innovative solutions. He has collaborated with NASA, developed high-accuracy ML models using TensorFlow, PyTorch, and OpenCV, and is skilled in JavaScript (React, Node.js, TypeScript), Python, C++, and SQL. He also holds various certifications in web development and has demonstrated leadership in the UNT AI Club.";
    
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: userMessage }
    ];
    
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "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" // Replace with your actual API key or proxy endpoint
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: messages,
          max_tokens: 150,
          temperature: 0.7
        })
      });
      const data = await response.json();
      console.log(data);
      return data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      return "Sorry, I am having trouble generating a response.";
    }
  }

  // Updated handleSend function to use the async getBotResponse
  async function handleSend() {
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;
    appendMessage("user-message", "You: " + userMessage);
    chatInput.value = "";
    const botResponse = await getBotResponse(userMessage);
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
