"use strict"


// Get all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Add event listeners to navigation links
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetSection = document.querySelector(link.getAttribute('href'));
    scrollToSection(targetSection);
  });
});

// Add event listener to window scroll
window.addEventListener('scroll', () => {
  const currentSection = getCurrentSection();
  updateProgressBar(currentSection);
  updateNavigation(currentSection);
});

// Function to scroll to a section
function scrollToSection(section) {
  section.scrollIntoView({ behavior: 'smooth' });
}

// Function to get the current section
function getCurrentSection() {
  const scrollPosition = window.scrollY;
  let currentSection = null;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section;
    }
  });

  return currentSection;
}

// Function to update the progress bar
function updateProgressBar(currentSection) {
  const progressBar = document.querySelector('.vlt-fullpage-slider-progress-bar span');
  const progress = (currentSection.offsetTop / document.body.offsetHeight) * 100;
  progressBar.style.transform = `scaleY(${progress / 100})`;
}

// Function to update the navigation
function updateNavigation(currentSection) {
  navLinks.forEach((link) => {
    const targetSection = document.querySelector(link.getAttribute('href'));
    if (targetSection === currentSection) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}