function toggleMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.classList.toggle('active');
    navMenu.style.right = navMenu.style.right === '0px' ? '-300px' : '0px';
}
