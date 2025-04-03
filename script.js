// Programming Languages Data with Modern Icons
const languages = [
    { name: "Lua", icon: "fab fa-codepen", color: "#00007d" },
    { name: "Vue.js", icon: "fab fa-vuejs", color: "#42b883" },
    { name: "JavaScript", icon: "fab fa-js-square", color: "#f7df1e" },
    { name: "Python", icon: "fab fa-python", color: "#3776ab" },
    { name: "Java", icon: "fab fa-java", color: "#ea2d2e" },
    { name: "C Pack", icon: "fas fa-code", color: "#a8b9cc" },
    { name: "Ruby", icon: "fas fa-gem", color: "#cc342d" },
    { name: "Swift", icon: "fab fa-swift", color: "#f05138" },
    { name: "Go", icon: "fas fa-gopuram", color: "#00add8" },
    { name: "Rust", icon: "fas fa-cogs", color: "#dea584" },
    { name: "PHP", icon: "fab fa-php", color: "#777bb4" },
    { name: "Kotlin", icon: "fab fa-android", color: "#7f52ff" },
    { name: "TypeScript", icon: "fab fa-js", color: "#3178c6" },
    { name: "Dart", icon: "fas fa-bullseye", color: "#0175c2" },
    { name: "Perl", icon: "fas fa-feather", color: "#39457e" },
    { name: "Haskell", icon: "fas fa-h-square", color: "#5e5086" },
    { name: "R", icon: "fas fa-chart-line", color: "#276dc3" },
    { name: "Scala", icon: "fas fa-sort-numeric-up", color: "#dc322f" },
    { name: "Bash", icon: "fas fa-terminal", color: "#4eaa25" },
    { name: "PowerShell", icon: "fab fa-windows", color: "#5391fe" },
    { name: "SQL", icon: "fas fa-database", color: "#e38c00" },
    { name: "Assembly", icon: "fas fa-microchip", color: "#6e4c13" }
];

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
const languagesContainer = document.querySelector('.languages-container');
const sections = document.querySelectorAll('section');
const typedTextElement = document.querySelector('.typed-text');

// Theme Toggle with smooth transition
themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        
        // Restart matrix animation when switching to dark theme
        const existingCanvas = document.querySelector('.matrix-rain');
        if (existingCanvas) {
            existingCanvas.remove();
            createMatrixRain();
        }
    } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeToggle.checked = false;
} else {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeToggle.checked = true;
}

// Mobile Navigation with improved animations
burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
    
    // Animate Links with staggered delay
    const navItems = document.querySelectorAll('.nav-links li');
    navItems.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            // Smoother, more modern animation
            link.style.animation = `navLinkFade 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index / 7 + 0.2}s`;
        }
    });
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('nav-active')) {
            navLinks.classList.remove('nav-active');
            burger.classList.remove('toggle');
            
            const navItems = document.querySelectorAll('.nav-links li');
            navItems.forEach(link => {
                link.style.animation = '';
            });
        }
    });
});

// Populate Languages Section with color accents
function populateLanguages() {
    // Shuffle languages for a random order each time
    const shuffledLanguages = [...languages].sort(() => 0.5 - Math.random());
    
    languagesContainer.innerHTML = '';
    
    shuffledLanguages.forEach(lang => {
        const langCard = document.createElement('div');
        langCard.className = 'language-card';
        
        langCard.innerHTML = `
            <div class="language-icon" style="border-color: ${lang.color}">
                <i class="${lang.icon}" style="color: ${lang.color}"></i>
            </div>
            <h3 class="language-name">${lang.name}</h3>
        `;
        
        // Add hover effect with language-specific color
        langCard.addEventListener('mouseenter', () => {
            langCard.style.borderColor = lang.color;
            langCard.querySelector('.language-icon').style.boxShadow = `0 0 15px ${lang.color}`;
        });
        
        langCard.addEventListener('mouseleave', () => {
            langCard.style.borderColor = '';
            langCard.querySelector('.language-icon').style.boxShadow = '';
        });
        
        languagesContainer.appendChild(langCard);
    });
}

// Enhanced Intersection Observer for section animations with more sophisticated effects
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered animation to children
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach((child, index) => {
                child.style.animation = `fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards ${index * 0.1}s`;
                child.style.opacity = '1';
            });
            
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Create Enhanced Matrix Rain Effect with better performance
function createMatrixRain() {
    // Only create in dark theme
    if (!body.classList.contains('dark-theme')) return;
    
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-rain';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions with device pixel ratio for sharper rendering
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    
    // Scale the context to ensure correct dimensions
    ctx.scale(pixelRatio, pixelRatio);
    
    // Set canvas CSS dimensions
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    
    // Characters to display - mix of Matrix-style characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = Math.ceil(window.innerWidth / fontSize);
    
    // Array to track the y position of each column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -100); // Start at random negative positions for staggered effect
    }
    
    // Drawing the characters with improved visual effect
    function draw() {
        // Set semi-transparent black background to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
        
        // Loop through each drop
        for (let i = 0; i < drops.length; i++) {
            // Get random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Vary the green color slightly for more visual interest
            const green = 150 + Math.floor(Math.random() * 105);
            ctx.fillStyle = `rgba(0, ${green}, 65, ${Math.random() * 0.5 + 0.5})`;
            ctx.font = `${fontSize}px "Courier New", monospace`;
            
            // Draw character
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top with random reset point if it's at the bottom
            if (drops[i] * fontSize > canvas.height / pixelRatio && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Increment y coordinate with varying speeds
            drops[i] += Math.random() * 0.5 + 0.5;
        }
    }
    
    // Check if dark theme is active
    function shouldAnimate() {
        return body.classList.contains('dark-theme');
    }
    
    // Animation loop with requestAnimationFrame for better performance
    let animationId;
    function animate() {
        if (shouldAnimate()) {
            draw();
        }
        animationId = requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Resize canvas when window is resized
    window.addEventListener('resize', () => {
        // Cancel the current animation frame
        cancelAnimationFrame(animationId);
        
        // Update canvas dimensions
        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        
        // Scale the context
        ctx.scale(pixelRatio, pixelRatio);
        
        // Update columns and drops
        const newColumns = Math.ceil(window.innerWidth / fontSize);
        
        // Adjust drops array
        if (newColumns > drops.length) {
            // Add new drops
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * -100);
            }
        } else if (newColumns < drops.length) {
            // Remove excess drops
            drops.length = newColumns;
        }
        
        // Restart animation
        animate();
    });
}

// Enhanced typing effect for footer with smoother transitions
function typingEffect() {
    const phrases = [
        "All rights reserved",
        "Hack the planet",
        "Knowledge is power",
        "Security is a myth",
        "Trust no one"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            // Faster deletion speed
            typingSpeed = 30 + Math.random() * 40;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            // Variable typing speed for more natural effect
            typingSpeed = 70 + Math.random() * 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 1500; // Longer pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 700; // Pause before typing next phrase
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Create improved scroll to top button with smooth animation
function createScrollTopButton() {
    const scrollBtn = document.createElement('div');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    scrollBtn.addEventListener('click', () => {
        // Smooth scroll with easing
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    });
    
    // Show/hide button with smooth transition
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

// Add class to elements for staggered animations
function prepareAnimations() {
    // Add animation classes to elements
    document.querySelectorAll('.language-card, .software-item, .hobby-item').forEach(item => {
        item.classList.add('animate-on-scroll');
        item.style.opacity = '0';
    });
}

// Update profile information with typing effect
function updateProfile(name, pronouns, title, description, status) {
    const nameElement = document.querySelector('.name');
    const pronounsElement = document.querySelector('.pronouns');
    const titleElement = document.querySelector('.title');
    const descriptionElement = document.querySelector('.description');
    
    // Apply typing effect to name
    if (name) {
        typeText(nameElement, name);
    }
    
    // Set other elements directly
    if (pronouns) pronounsElement.textContent = pronouns;
    if (title) titleElement.textContent = title;
    if (description) descriptionElement.textContent = description;
    
    const statusIndicator = document.querySelector('.status-indicator');
    if (status) {
        statusIndicator.className = `status-indicator ${status}`;
        statusIndicator.title = status.charAt(0).toUpperCase() + status.slice(1);
    }
}

// Helper function for typing effect
function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed + Math.random() * 50);
        }
    }
    
    type();
}

// Initialize with improved loading sequence
document.addEventListener('DOMContentLoaded', () => {
    // Add a small delay for dramatic effect
    setTimeout(() => {
        // Prepare animations
        prepareAnimations();
        
        // Populate languages
        populateLanguages();
        
        // Observe sections for animation
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
        
        // Create scroll to top button
        createScrollTopButton();
        
        // Create matrix rain effect
        createMatrixRain();
        
        // Start typing effect
        typingEffect();
        
        // Add page load animation
        document.body.classList.add('loaded');
    }, 300);
});

// Handle profile picture hover effects
document.addEventListener('DOMContentLoaded', () => {
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        const circle = document.querySelector('.circle');
        
        profilePic.addEventListener('mouseover', () => {
            circle.style.transform = 'scale(1.05) rotateY(180deg)';
        });
        
        profilePic.addEventListener('mouseout', () => {
            circle.style.transform = '';
        });
    }
});

// Preload fonts for better performance
function preloadFonts() {
    const fontFamilies = [
        'Courier New',
        'monospace',
        'JetBrains Mono',
        'Fira Code',
        'Source Code Pro'
    ];
    
    const preloadDiv = document.createElement('div');
    preloadDiv.style.opacity = '0';
    preloadDiv.style.position = 'absolute';
    preloadDiv.style.pointerEvents = 'none';
    
    fontFamilies.forEach(font => {
        const element = document.createElement('span');
        element.style.fontFamily = font;
        element.textContent = 'preload';
        preloadDiv.appendChild(element);
    });
    
    document.body.appendChild(preloadDiv);
    
    // Remove after fonts are loaded
    setTimeout(() => {
        document.body.removeChild(preloadDiv);
    }, 1000);
}

// Call preload fonts
preloadFonts();
