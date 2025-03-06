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
  });
  