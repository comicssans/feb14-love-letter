// ========================================
// SLIDE NAVIGATION
// ========================================

let currentSlide = 1;

function nextSlide() {
    document.getElementById("slide" + currentSlide).style.display = "none";
    currentSlide = currentSlide + 1;
    document.getElementById("slide" + currentSlide).style.display = "block";
}

function sayYes() {
    document.getElementById("slide7").style.display = "none";
    document.getElementById("slide8").style.display = "block";
    
    // Trigger celebrations!
    createHeartsExplosion();
    showSteamAchievement();
}

let noClickCount = 0;

function sayNo() {
    noClickCount++;
    let noButton = document.getElementById("noButton");
    
    // Move button to random position
    let randomX = Math.random() * (window.innerWidth - 200);
    let randomY = Math.random() * (window.innerHeight - 100);
    
    noButton.style.position = "fixed";
    noButton.style.left = randomX + "px";
    noButton.style.top = randomY + "px";
    
    // Make NO button smaller
    let currentNoSize = parseFloat(window.getComputedStyle(noButton).fontSize);
    let currentNoPadding = parseFloat(window.getComputedStyle(noButton).paddingTop);
    noButton.style.fontSize = (currentNoSize - 2) + "px";
    noButton.style.padding = (currentNoPadding - 2) + "px";
    
    // Make YES button bigger
    let yesButton = document.getElementById("yesButton");
    let currentYesSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    let currentYesPadding = parseFloat(window.getComputedStyle(yesButton).paddingTop);
    yesButton.style.fontSize = (currentYesSize + 5) + "px";
    yesButton.style.padding = (currentYesPadding + 3) + "px";
}

// ========================================
// FEATURE 1 & 3: HEARTS FOLLOWING CURSOR + TRAIL
// ========================================

document.addEventListener('mousemove', function(e) {
    // Create heart that follows cursor
    createFollowHeart(e.pageX, e.pageY);
    
    // Create sparkle trail
    createSparkle(e.pageX, e.pageY);
});

function createFollowHeart(x, y) {
    const heart = document.createElement('div');
    heart.className = 'cursor-heart';
    heart.innerHTML = '💕';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    document.body.appendChild(heart);
    
    // Remove after animation
    setTimeout(() => heart.remove(), 1000);
}

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = '✨';
    sparkle.style.left = (x + Math.random() * 20 - 10) + 'px';
    sparkle.style.top = (y + Math.random() * 20 - 10) + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 600);
}

// ========================================
// FEATURE 2: FLOATING HEARTS BACKGROUND
// ========================================

function createFloatingHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓'];
    
    setInterval(() => {
        // Create 2 hearts at once for more coverage!
        for (let i = 0; i < 2; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            // Random position ACROSS THE ENTIRE WIDTH
            heart.style.left = (Math.random() * 100) + 'vw';
            heart.style.fontSize = (Math.random() * 15 + 20) + 'px';
            heart.style.animationDuration = (Math.random() * 2 + 4) + 's';
            heart.style.opacity = (Math.random() * 0.3 + 0.3).toString();
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 7000);
        }
    }, 300); // Spawn every 300ms
}

// Start floating hearts when page loads
createFloatingHearts();


// ========================================
// FEATURE 4: TYPEWRITER EFFECT
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

// Apply to love letter slide (slide 5) when it appears
// You'll call this when that slide shows up

// ========================================
// FEATURE 6: SCRAMBLED TEXT REVEAL
// ========================================

function scrambleText(element, finalText) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let iteration = 0;
    
    const interval = setInterval(() => {
        element.innerText = finalText
            .split('')
            .map((letter, index) => {
                if (index < iteration) {
                    return finalText[index];
                }
                return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
        
        if (iteration >= finalText.length) {
            clearInterval(interval);
        }
        
        iteration += 1/3;
    }, 30);
}

// ========================================
// FEATURE 7: STEAM ACHIEVEMENT + HEARTS EXPLOSION
// ========================================

function showSteamAchievement() {
    const achievement = document.createElement('div');
    achievement.className = 'steam-achievement';
    achievement.innerHTML = `
        <div class="achievement-icon">🏆</div>
        <div class="achievement-text">
            <div class="achievement-title">Achievement Unlocked</div>
            <div class="achievement-description">BEST BOYFRIEND</div>
            <div class="achievement-subtitle">Said yes to being my Valentine!</div>
        </div>
    `;
    document.body.appendChild(achievement);
    
    // Play a "ding" sound (browser default)
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSp90O7SfzEGHm7A7+OZUQ0PVqzn77FfGAg+ltryxHQpBSd4yPDdkUAKFF+z6eimVBQLRp/g8r5sIQUqfdDu0n8xBh5uwO/jmVENEFas5++xXhgIPpba8sR0KQUneMjw3ZFABB5uwO7jmVENEFas5++xXhgIPpba8sR0KQUneMjw3ZFACBResuno');
    audio.play().catch(() => {}); // Play sound if possible
    
    // Stay for 10 SECONDS then slide away!
    setTimeout(() => {
        achievement.style.animation = 'slideOut 0.5s ease-in forwards';
        setTimeout(() => achievement.remove(), 500);
    }, 10000); // 10 seconds!
}

// Add slide out animation
function createHeartsExplosion() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💗'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'explosion-heart';
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            
            const angle = (Math.PI * 2 * i) / 50;
            const velocity = 100 + Math.random() * 200;
            
            heart.style.setProperty('--x', Math.cos(angle) * velocity + 'px');
            heart.style.setProperty('--y', Math.sin(angle) * velocity + 'px');
            heart.style.left = '50%';
            heart.style.top = '50%';
            
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 2000);
        }, i * 20);
    }
}
// When slide 5 appears, start typewriter
let slide5Shown = false;
const originalNextSlide = nextSlide;

nextSlide = function() {
    originalNextSlide();
    
    // If we just moved to slide 5, start typewriter
    if (currentSlide === 5 && !slide5Shown) {
        slide5Shown = true;
        const text = "I do not think I ever say this enough, so I wanted to write it down for you. Loving you has slowly become one of the most grounding parts of my life. You make me feel safe being exactly who I am, even on days when I feel unsure or overwhelmed. The way you care, the way you listen, and the way you show up for me in both big and quiet ways means more to me than I can ever fully explain. I feel incredibly lucky that I get to love you, and that I get to be loved by you too. Even in the small moments, you bring so much comfort and happiness into my life, and I never ever want to stop choosing you. I am grateful every day that I get to share my life, my thoughts, and my heart with you. In this lifetime and in any, you will always be my best friend and my favorite person. 💕";
        typeWriter(document.getElementById('typewriter-text'), text, 50);
    }
    
    // If we just moved to slide 6, scramble the text
    if (currentSlide === 7) {
        scrambleText(document.getElementById('scrambled-question'), 'Will you be my Valentine?');
    }
};

function startMusic() {
    const music = document.getElementById("bgMusic");
    music.volume = 0;
    music.play();

    let vol = 0;
    const fade = setInterval(() => {
        if (vol < 0.4) {
            vol += 0.02;
            music.volume = vol;
        } else {
            clearInterval(fade);
        }
    }, 200);
}
