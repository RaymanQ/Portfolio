/* ========================================
   LINKTREE HACKER THEME - JAVASCRIPT
   ======================================== */

// ========================================
// LOADING SCREEN
// ========================================

const loadingScreen = document.getElementById('loadingScreen');
const loadingPercent = document.getElementById('loadingPercent');
let progress = 0;

const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadingInterval);
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
    loadingPercent.textContent = Math.floor(progress) + '%';
}, 100);

// ========================================
// MATRIX RAIN EFFECT
// ========================================

const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters for Matrix rain
const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()';
const charArray = chars.split('');
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

// Initialize drops
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Draw Matrix rain
function drawMatrix() {
    // Semi-transparent black to create fade effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Random green shade
        ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.5 + 0.5})`;
        ctx.fillText(char, x, y);

        // Reset drop when it reaches bottom
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

// Run Matrix animation
setInterval(drawMatrix, 50);

// ========================================
// WINDOW RESIZE HANDLER
// ========================================

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// ========================================
// RIPPLE EFFECT
// ========================================

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Add ripple effect to all link buttons
const linkBtns = document.querySelectorAll('.link-btn');
linkBtns.forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// ========================================
// CYBER PARTICLES ON MOUSE MOVE
// ========================================

document.addEventListener('mousemove', (e) => {
    if (Math.random() > 0.9) {
        createParticle(e.clientX, e.clientY);
    }
});

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.classList.add('cyber-particle');
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    document.body.appendChild(particle);

    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 50 + 20;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    let opacity = 1;

    const animate = () => {
        const currentX = parseFloat(particle.style.left);
        const currentY = parseFloat(particle.style.top);
        particle.style.left = currentX + vx * 0.02 + 'px';
        particle.style.top = currentY + vy * 0.02 + 'px';
        opacity -= 0.02;
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    animate();
}

// ========================================
// GLITCH EFFECT ON HOVER
// ========================================

const username = document.querySelector('.username');
let glitchInterval;

username.addEventListener('mouseenter', () => {
    glitchInterval = setInterval(() => {
        username.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0000,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff00,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #0000ff
        `;
    }, 50);
});

username.addEventListener('mouseleave', () => {
    clearInterval(glitchInterval);
    username.style.textShadow = '0 0 10px var(--neon-green), 0 0 20px var(--neon-green), 0 0 40px var(--neon-green)';
});

// ========================================
// KEYBOARD EASTER EGG
// ========================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    // Flash effect
    document.body.style.animation = 'none';
    document.body.offsetHeight; // Trigger reflow
    
    // Create explosion of particles
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createParticle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 20);
    }

    // Temporary color change
    document.documentElement.style.setProperty('--neon-green', '#ff00ff');
    setTimeout(() => {
        document.documentElement.style.setProperty('--neon-green', '#00ff41');
    }, 3000);

    console.log('%c🎮 KONAMI CODE ACTIVATED!', 'color: #ff00ff; font-size: 24px; font-weight: bold;');
}

// ========================================
// TYPING EFFECT FOR TERMINAL
// ========================================

function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🔒 ACCESS GRANTED', 'color: #00ff41; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
console.log('%c Welcome to My Home\'s terminal. Stay curious, stay ethical, and i always watching u.', 'color: #20c20e; font-size: 14px;');
console.log('%c ⚠️ Remember: With great power comes great responsibility.', 'color: #ffbd2e; font-size: 12px;');

// ========================================
// RANDOM GLITCH ON PAGE
// ========================================

function randomGlitch() {
    const elements = document.querySelectorAll('.link-btn, .username, .terminal-footer');
    const randomElement = elements[Math.floor(Math.random() * elements.length)];
    
    randomElement.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
    
    setTimeout(() => {
        randomElement.style.transform = '';
    }, 100);
}

// Random glitch every 5-10 seconds
setInterval(() => {
    if (Math.random() > 0.7) {
        randomGlitch();
    }
}, 5000);

// ========================================
// VISIBILITY CHANGE HANDLER
// ========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👀 Come back...';
    } else {
        document.title = 'Raihan Salman Baehaqi | Portfolio';
    }
});
