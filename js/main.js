
// Global Variables
var theme = 'light';
var typeIndex = 0;
var typeTextIndex = 0;
var typeStrings = ["Étudiante", "Développeuse Web", "Analyste de Données", "Passionnée d'IA"];
var typeSpeed = 100;
var typeEraserSpeed = 50;
var typeDelay = 2000;
var currentText = '';
var isDeleting = false;

// Initialize immediately since script is at end of body
initTheme();
initTyping();
initScrollReveal();

// Also add a listener for total safety if script is moved to head later
window.addEventListener('load', function () {

});


function initTheme() {
    // Check if button already exists
    if (document.querySelector('.theme-btn')) return;

    var navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        var li = document.createElement('li');
        li.innerHTML = '<button onclick="toggleTheme()" class="theme-btn" title="Changer de thème">🌙</button>';
        navLinks.appendChild(li);
    }

    // Apply saved theme
    var savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.className += ' dark-theme';
        var btn = document.querySelector('.theme-btn');
        if (btn) btn.innerHTML = '☀️';
    }
}

function toggleTheme() {
    var body = document.body;
    var btn = document.querySelector('.theme-btn');

    // Toggle class
    if (body.className.indexOf('dark-theme') === -1) {
        body.className += ' dark-theme';
        btn.innerHTML = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.className = body.className.replace(' dark-theme', '');
        btn.innerHTML = '🌙';
        localStorage.setItem('theme', 'light');
    }
}


function initTyping() {
    var typeElement = document.getElementById('typing-text');
    if (typeElement) {
        typeWriter();
    }
}

function typeWriter() {
    var typeElement = document.getElementById('typing-text');
    if (!typeElement) return;

    var fullText = typeStrings[typeTextIndex];

    if (isDeleting) {
        // Remove characters
        currentText = fullText.substring(0, currentText.length - 1);
    } else {
        // Add characters
        currentText = fullText.substring(0, currentText.length + 1);
    }

    typeElement.innerHTML = currentText + '<span class="typing-cursor">|</span>';

    var delta = typeSpeed;

    if (isDeleting) {
        delta = typeEraserSpeed;
    }

    if (!isDeleting && currentText === fullText) {
        // Finished typing sentence, pause before deleting
        delta = typeDelay;
        isDeleting = true;
    } else if (isDeleting && currentText === '') {
        // Finished deleting, move to next sentence
        isDeleting = false;
        typeTextIndex++;
        if (typeTextIndex >= typeStrings.length) {
            typeTextIndex = 0;
        }
    }

    setTimeout(function () {
        typeWriter();
    }, delta);
}

function initScrollReveal() {
    // Check initially
    revealOnScroll();

    // Check on scroll
    window.onscroll = function () {
        revealOnScroll();
    };
}

function revealOnScroll() {
    var reveals = document.querySelectorAll('.card, .section-title, .hero-content, .hero-image');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150; // Threshold

        if (elementTop < windowHeight - elementVisible) {
 
            if (reveals[i].className.indexOf('reveal') === -1) {
                reveals[i].className += ' reveal active';
            } else if (reveals[i].className.indexOf('active') === -1) {
                reveals[i].className += ' active';
            }
        }
    }
}


function displayDate() {

    // Safe replacement:
    var dateElement = document.getElementById('year-span');
    if (dateElement) {
        dateElement.innerHTML = new Date().getFullYear();
    }
}
