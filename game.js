// Super Rahul Bros: The Simp Quest - Game Script

// --- Global Error Handler for UI Debugging ---
window.onerror = function(message, source, lineno, colno, error) {
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'absolute';
    errorDiv.style.top = '10px';
    errorDiv.style.left = '10px';
    errorDiv.style.right = '10px';
    errorDiv.style.background = 'rgba(255, 0, 0, 0.95)';
    errorDiv.style.color = '#fff';
    errorDiv.style.padding = '15px';
    errorDiv.style.zIndex = '99999';
    errorDiv.style.fontFamily = 'monospace';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.borderRadius = '8px';
    errorDiv.style.border = '2px solid white';
    errorDiv.style.pointerEvents = 'auto';
    errorDiv.innerHTML = `<strong>Game Crash:</strong><br>${message}<br><br>File: ${source}<br>Line: ${lineno}:${colno}<br><br>${error ? error.stack : ''}`;
    document.body.appendChild(errorDiv);
    return false;
};

// --- Debug Logger (Disabled for Clean Production UI) ---
function debugLog(msg) {
    // logs disabled
}

// --- Sound Effects Synthesizer (Web Audio API) ---
class SoundSynthesizer {
    constructor() {
        this.ctx = null;
        this.muted = false;
        this.sadSongTimeout = null;
    }

    clearSadSong() {
        if (this.sadSongTimeout) {
            clearTimeout(this.sadSongTimeout);
            this.sadSongTimeout = null;
        }
    }

    playSadHindiSong() {
        this.init();
        if (this.muted || !this.ctx) return;
        
        // Melody: Channa Mereya chorus (Melodic & tragic Simp Anthem!)
        const notes = [
            { freq: 587.33, dur: 0.35 }, // O
            { freq: 698.46, dur: 0.3 },  // pi-
            { freq: 659.25, dur: 0.65 }, // -ya
            
            { freq: 0, dur: 0.2 },       // (pause)
            
            { freq: 587.33, dur: 0.3 },  // chan-
            { freq: 523.25, dur: 0.3 },  // -na
            { freq: 587.33, dur: 0.3 },  // me-
            { freq: 698.46, dur: 0.3 },  // -re-
            { freq: 659.25, dur: 0.55 }, // -ya
            
            { freq: 587.33, dur: 0.3 },  // me-
            { freq: 523.25, dur: 0.3 },  // -re-
            { freq: 440.00, dur: 0.75 }, // -ya
            
            { freq: 0, dur: 0.3 },       // (pause)
            
            { freq: 440.00, dur: 0.3 },  // ach-
            { freq: 493.88, dur: 0.3 },  // -ha
            { freq: 523.25, dur: 0.3 },  // chal-
            { freq: 493.88, dur: 0.3 },  // -ta
            { freq: 440.00, dur: 0.75 }, // hoon
            
            { freq: 0, dur: 0.2 },       // (pause)
            
            { freq: 440.00, dur: 0.3 },  // du-
            { freq: 392.00, dur: 0.3 },  // -a-
            { freq: 349.23, dur: 0.3 },  // -on
            { freq: 392.00, dur: 0.3 },  // mein
            { freq: 440.00, dur: 0.45 }, // yaad
            { freq: 392.00, dur: 0.3 },  // rakh-
            { freq: 349.23, dur: 0.75 }  // -na
        ];

        let time = this.ctx.currentTime;
        notes.forEach(note => {
            if (note.freq > 0) {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                
                osc.type = 'triangle'; // tragic retro synth violin sound
                osc.frequency.setValueAtTime(note.freq, time);
                
                gain.gain.setValueAtTime(0.12, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + note.dur);
                
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                
                osc.start(time);
                osc.stop(time + note.dur);
            }
            time += note.dur + 0.05;
        });

        const totalDuration = notes.reduce((acc, note) => acc + note.dur + 0.05, 0);
        this.sadSongTimeout = setTimeout(() => {
            if (game && game.gameState === 'victory') {
                this.playSadHindiSong();
            }
        }, totalDuration * 1000);
    }

    init() {
        if (!this.ctx) {
            try {
                this.ctx = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.warn("Web Audio API not supported or blocked:", e);
                this.ctx = null;
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(err => console.warn("AudioContext resume failed:", err));
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        const muteBtn = document.getElementById('mute-btn');
        if (this.muted) {
            muteBtn.textContent = "🔇 Sound Off";
            muteBtn.classList.add('muted');
        } else {
            muteBtn.textContent = "🔊 Sound On";
            muteBtn.classList.remove('muted');
            this.init();
        }
        return this.muted;
    }

    playTone(frequency, type, duration, slideTo = null) {
        if (this.muted || !this.ctx) return;
        try {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = type;
            osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
            
            if (slideTo) {
                osc.frequency.exponentialRampToValueAtTime(slideTo, this.ctx.currentTime + duration);
            }
            
            gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start();
            osc.stop(this.ctx.currentTime + duration);
        } catch (e) {
            console.error("Audio error", e);
        }
    }

    playJump() {
        this.playTone(150, 'square', 0.15, 600);
    }

    playCollect() {
        this.playTone(523.25, 'sine', 0.1); // C5
        setTimeout(() => this.playTone(659.25, 'sine', 0.1), 80); // E5
        setTimeout(() => this.playTone(783.99, 'sine', 0.15), 160); // G5
    }

    playCoin() {
        this.init();
        this.playTone(987.77, 'sine', 0.08); // B5
        setTimeout(() => this.playTone(1318.51, 'sine', 0.15), 80); // E6
    }

    playHit() {
        this.playTone(180, 'sawtooth', 0.25, 60);
    }

    playHeartCrack() {
        this.playTone(300, 'sawtooth', 0.4, 80);
        setTimeout(() => this.playTone(120, 'sawtooth', 0.5), 150);
    }

    playSadMelody() {
        if (this.muted || !this.ctx) return;
        const notes = [293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66, 220.00]; // D4, E4, F4, G4, F4, E4, D4, A3 (Sad)
        let time = 0;
        notes.forEach((freq, index) => {
            setTimeout(() => {
                this.playTone(freq, 'triangle', index === notes.length - 1 ? 1.0 : 0.4);
            }, time);
            time += index === notes.length - 1 ? 500 : 350;
        });
    }

    playVictoryJingle() {
        if (this.muted || !this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            setTimeout(() => {
                this.playTone(freq, 'sine', 0.25);
            }, idx * 150);
        });
    }
}

const sounds = new SoundSynthesizer();

// --- Game Engine Configuration ---
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = 800;
const GAME_HEIGHT = 450;

// Input system
const keys = {
    right: false,
    left: false,
    jump: false,
    interact: false
};

// Touch Controls
function setupTouchEvents() {
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');
    const btnJump = document.getElementById('btn-jump');

    const triggerTouch = (elem, keyName, state) => {
        elem.addEventListener('touchstart', (e) => {
            e.preventDefault();
            sounds.init();
            keys[keyName] = state;
        });
        elem.addEventListener('touchend', (e) => {
            e.preventDefault();
            keys[keyName] = !state;
        });
    };

    triggerTouch(btnLeft, 'left', true);
    triggerTouch(btnRight, 'right', true);
    triggerTouch(btnJump, 'jump', true);
}

// Keyboard controls
window.addEventListener('keydown', (e) => {
    sounds.init();
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = true;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = true;
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.jump = true;
    if (e.code === 'KeyE') keys.interact = true;
});

window.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight' || e.code === 'KeyD') keys.right = false;
    if (e.code === 'ArrowLeft' || e.code === 'KeyA') keys.left = false;
    if (e.code === 'ArrowUp' || e.code === 'KeyW' || e.code === 'Space') keys.jump = false;
    if (e.code === 'KeyE') keys.interact = false;
});

// Setup audio UI button
document.getElementById('mute-btn').addEventListener('click', () => {
    sounds.toggleMute();
});

// --- Entities Classes ---

class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;
        this.vx = 0;
        this.vy = 0;
        this.grounded = false;
        this.facing = 'right';
        this.animationTimer = 0;
        this.isMoving = false;
        
        // Setup stats based on character selection
        this.charType = game.selectedChar || 'rahul';
        this.skinType = game.selectedSkin || 'casual';
        
        if (this.charType === 'rahul') {
            this.speed = 3.6;
            this.jumpForce = -12.0;
            this.gravity = 0.6;
        } else if (this.charType === 'priya') {
            this.speed = 3.2;
            this.jumpForce = -13.5;
            this.gravity = 0.45; // floaty
        } else if (this.charType === 'chad') {
            this.speed = 4.2; // faster
            this.jumpForce = -10.5; // lower jump
            this.gravity = 0.75; // heavy fast fall
        }

        // Apply coffee speed boost upgrade
        if (game.upgrades && game.upgrades.coffee) {
            this.speed *= 1.15;
        }
        
        this.jumpCount = 0;
        this.jumpPressedLastFrame = false;
    }

    update(platforms, bounds, springboards = []) {
        // Reset jump count when grounded
        if (this.grounded) {
            this.jumpCount = 0;
        }

        // Horizontal movement
        this.isMoving = false;
        if (keys.left) {
            this.vx = -this.speed;
            this.facing = 'left';
            this.isMoving = true;
        } else if (keys.right) {
            this.vx = this.speed;
            this.facing = 'right';
            this.isMoving = true;
        } else {
            this.vx *= 0.8; // Friction
        }

        // Apply gravity
        this.vy += this.gravity;

        // Jump (Double jump support)
        if (keys.jump) {
            if (this.grounded) {
                this.vy = this.jumpForce;
                this.grounded = false;
                this.jumpCount = 1;
                sounds.playJump();
            } else if (game.upgrades && game.upgrades.sneakers && !this.jumpPressedLastFrame && this.jumpCount < 2) {
                this.vy = this.jumpForce * 0.9; // 90% power double jump
                this.jumpCount = 2;
                sounds.playJump();
                if (game.floatingTexts) {
                    game.floatingTexts.push(new FloatingText(this.x, this.y - 10, "DOUBLE JUMP!", '#00ffcc'));
                }
            }
        }
        this.jumpPressedLastFrame = keys.jump;

        // Update positions
        this.x += this.vx;
        this.y += this.vy;

        // Springboard collision check before static platform collision
        // Springboards disabled on Hard difficulty
        if (game.selectedDifficulty !== 'hard') {
            springboards.forEach(sb => {
                if (this.x < sb.x + sb.width &&
                    this.x + this.width > sb.x &&
                    this.y + this.height >= sb.y &&
                    this.y + this.height <= sb.y + 16 &&
                    this.vy >= 0) { // falling or walking onto it
                    
                    this.vy = -16.5; // Launch Rahul high!
                    this.grounded = false;
                    sb.activated = true;
                    sb.activeTimer = 10;
                    sounds.playJump();
                    if (game && game.floatingTexts) {
                        game.floatingTexts.push(new FloatingText(sb.x - 10, sb.y - 12, "BOOST JUMP!", '#00ff00'));
                    }
                }
            });
        }

        // Collision logic
        this.grounded = false;
        platforms.forEach(plat => {
            // Check intersection using AABB
            if (this.x < plat.x + plat.width &&
                this.x + this.width > plat.x &&
                this.y < plat.y + plat.height &&
                this.y + this.height > plat.y) {

                // Calculate overlap depths
                let overlapX = Math.min(this.x + this.width, plat.x + plat.width) - Math.max(this.x, plat.x);
                let overlapY = Math.min(this.y + this.height, plat.y + plat.height) - Math.max(this.y, plat.y);

                if (overlapX > overlapY) {
                    // Collision on Y axis
                    if (this.vy > 0 && this.y + this.height - this.vy <= plat.y + 2) { // Falling onto platform
                        this.y = plat.y - this.height;
                        this.vy = 0;
                        this.grounded = true;
                    } else if (this.vy < 0 && this.y - this.vy >= plat.y + plat.height - 2) { // Hitting from below
                        this.y = plat.y + plat.height;
                        this.vy = 0;
                    }
                } else {
                    // Collision on X axis
                    if (this.vx > 0) {
                        this.x = plat.x - this.width;
                    } else if (this.vx < 0) {
                        this.x = plat.x + plat.width;
                    }
                    this.vx = 0;
                }
            }
        });

        // World Bounds
        if (this.x < 0) this.x = 0;
        if (this.x > bounds - this.width) this.x = bounds - this.width;

        // Falling down pit
        if (this.y > GAME_HEIGHT) {
            this.die();
        }

        // Animation counter
        if (this.isMoving && this.grounded) {
            this.animationTimer += 0.15;
        } else {
            this.animationTimer = 0;
        }
    }

    die() {
        sounds.playHit();
        game.resetLevel();
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        
        // Flip image if facing left
        if (this.facing === 'left') {
            ctx.scale(-1, 1);
        }

        // Bobbing effect when walking
        let walkBob = 0;
        if (this.isMoving && this.grounded) {
            walkBob = Math.sin(this.animationTimer) * 3;
        }

        if (this.charType === 'priya') {
            // --- DRAW PRIYA ---
            let floatY = Math.sin(Date.now() * 0.003) * 2;
            
            // Hair
            ctx.fillStyle = '#5c3d24';
            ctx.fillRect(-14, -28 + floatY, 28, 32);

            // Face
            ctx.fillStyle = '#ffe0bd';
            ctx.fillRect(-10, -28 + floatY, 20, 16);

            // Headband
            ctx.fillStyle = '#9933ff';
            ctx.fillRect(-11, -30 + floatY, 22, 3);

            // Eyes
            ctx.fillStyle = '#3c220f';
            const blink = Math.sin(Date.now() * 0.001) > 0.98;
            if (!blink) {
                ctx.fillRect(-5, -22 + floatY, 2, 3);
                ctx.fillRect(3, -22 + floatY, 2, 3);
            }
            
            // Blush
            ctx.fillStyle = '#ff8fa3';
            ctx.fillRect(-8, -18 + floatY, 2, 2);
            ctx.fillRect(6, -18 + floatY, 2, 2);

            // Outfit
            ctx.fillStyle = '#ff85a2';
            ctx.fillRect(-11, -12 + floatY, 22, 12);
            ctx.fillStyle = '#f72585';
            ctx.fillRect(-14, 0 + floatY, 28, 16);

            // Shoes
            ctx.fillStyle = '#ffe0bd';
            ctx.fillRect(-9, 16, 5, 4);
            ctx.fillRect(4, 16, 5, 4);
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-10, 18, 7, 4);
            ctx.fillRect(3, 18, 7, 4);

            // Hearts
            if (Math.sin(Date.now() * 0.0025) > 0) {
                ctx.fillStyle = '#ff3366';
                ctx.beginPath();
                ctx.arc(-8, -38 + floatY, 2, 0, Math.PI, true);
                ctx.arc(-4, -38 + floatY, 2, 0, Math.PI, true);
                ctx.lineTo(-6, -34 + floatY);
                ctx.closePath();
                ctx.fill();
            }

        } else if (this.charType === 'chad') {
            // --- DRAW CHAD ---
            ctx.fillStyle = '#f0c294';
            let swingOffset = Math.sin(this.animationTimer) * 4;
            ctx.fillRect(-18, -12 + (this.isMoving ? swingOffset : 0), 6, 20); // Left arm
            ctx.fillRect(12, -12 + (this.isMoving ? -swingOffset : 0), 6, 20); // Right arm

            ctx.fillStyle = '#1b1b1f';
            ctx.fillRect(-12, -15, 24, 28);
            ctx.fillRect(-10, -20, 4, 6);
            ctx.fillRect(6, -20, 4, 6);

            ctx.fillStyle = '#f0c294';
            ctx.fillRect(-8, -28, 16, 14);
            
            ctx.fillStyle = '#333333';
            ctx.fillRect(-8, -18, 16, 5);

            ctx.fillStyle = '#111';
            ctx.fillRect(-6, -24, 5, 4);
            ctx.fillRect(1, -24, 5, 4);
            ctx.fillRect(-6, -23, 12, 1);

            ctx.fillStyle = '#222';
            ctx.fillRect(-9, -33, 18, 6);
            ctx.beginPath();
            ctx.moveTo(-9, -33);
            ctx.lineTo(-5, -38);
            ctx.lineTo(0, -33);
            ctx.lineTo(5, -38);
            ctx.lineTo(9, -33);
            ctx.fill();

            ctx.fillStyle = '#55555c';
            ctx.fillRect(-10, 13, 8, 10);
            ctx.fillRect(2, 13, 8, 10);

            ctx.fillStyle = '#00f';
            ctx.fillRect(-11, 21, 9, 4);
            ctx.fillRect(2, 21, 9, 4);

        } else {
            // --- DRAW RAHUL ---
            ctx.fillStyle = '#4a2c11';
            let legOffset = (Math.sin(this.animationTimer) * 4);
            ctx.fillRect(-12, 16 + (this.isMoving ? legOffset : 0), 8, 8);
            ctx.fillRect(4, 16 + (this.isMoving ? -legOffset : 0), 8, 8);

            ctx.fillStyle = '#2c406c';
            ctx.fillRect(-12, 6, 8, 11);
            ctx.fillRect(4, 6, 8, 11);

            if (this.skinType === 'gym') {
                ctx.fillStyle = '#1b1b1f';
                ctx.fillRect(-14, -14, 28, 20);
                ctx.fillRect(-11, -18, 4, 5);
                ctx.fillRect(7, -18, 4, 5);
                
                ctx.fillStyle = '#ffd1ac';
                let armBob = Math.sin(Date.now() * 0.007) * 2;
                ctx.fillRect(-18, -12 + armBob, 5, 12);
                ctx.fillRect(13, -12 - armBob, 5, 12);

            } else if (this.skinType === 'suit') {
                ctx.fillStyle = '#111116';
                ctx.fillRect(-14, -14, 28, 20);
                
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-4, -14, 8, 14);
                
                ctx.fillStyle = '#ff0033';
                ctx.fillRect(-1, -10, 2, 10);
                ctx.beginPath();
                ctx.moveTo(-2, 0);
                ctx.lineTo(0, 3);
                ctx.lineTo(2, 0);
                ctx.fill();

            } else {
                ctx.fillStyle = '#e63946';
                ctx.fillRect(-14, -14, 28, 20);

                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-1, -10, 2, 8);
            }

            ctx.fillStyle = '#ffd1ac';
            ctx.fillRect(-10, -32, 20, 18);

            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2.5;
            ctx.strokeRect(-8, -25, 7, 7);
            ctx.strokeRect(1, -25, 7, 7);
            ctx.beginPath();
            ctx.moveTo(-1, -21);
            ctx.lineTo(1, -21);
            ctx.stroke();

            ctx.fillStyle = '#000000';
            ctx.fillRect(-5, -23, 2, 2);
            ctx.fillRect(4, -23, 2, 2);

            ctx.fillStyle = '#111116';
            ctx.fillRect(-12, -37, 24, 8);
            ctx.fillRect(-12, -32, 4, 10);

            ctx.strokeStyle = '#8b5a2b';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-14, -10);
            ctx.lineTo(14, 4);
            ctx.stroke();
        }

        ctx.restore();
    }
}

class Priya {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;
        this.floatOffset = 0;
    }

    draw() {
        this.floatOffset = Math.sin(Date.now() * 0.003) * 3;
        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2 + this.floatOffset);

        // Hair
        ctx.fillStyle = '#5c3d24';
        ctx.fillRect(-14, -30, 28, 38);

        // Face
        ctx.fillStyle = '#ffe0bd';
        ctx.fillRect(-10, -30, 20, 16);

        // Headband
        ctx.fillStyle = '#9933ff';
        ctx.fillRect(-11, -32, 22, 3);

        // Eyes
        ctx.fillStyle = '#3c220f';
        const blink = Math.sin(Date.now() * 0.001) > 0.98;
        if (!blink) {
            ctx.fillRect(-6, -24, 3, 3);
            ctx.fillRect(3, -24, 3, 3);
        }

        // Blush
        ctx.fillStyle = '#ff8fa3';
        ctx.fillRect(-9, -20, 3, 2);
        ctx.fillRect(6, -20, 3, 2);

        // Dress
        ctx.fillStyle = '#ff85a2';
        ctx.fillRect(-12, -14, 24, 15);
        ctx.fillStyle = '#f72585';
        ctx.fillRect(-14, 1, 28, 17);

        // Shoes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-10, 18, 6, 6);
        ctx.fillRect(4, 18, 6, 6);

        // Floating Hearts
        if (Math.sin(Date.now() * 0.0025) > 0) {
            ctx.fillStyle = '#ff3366';
            ctx.beginPath();
            ctx.arc(-8, -45, 3, 0, Math.PI, true);
            ctx.arc(-2, -45, 3, 0, Math.PI, true);
            ctx.lineTo(-5, -39);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }
}

class Chad {
    constructor(x, y, isBoss = false) {
        this.x = x;
        this.y = y;
        this.width = isBoss ? 60 : 36;
        this.height = isBoss ? 80 : 54;
        this.isBoss = isBoss;
        this.flexTimer = 0;
        this.throwTimer = 0;
        this.bossHp = 4;
        this.vy = 0;
        this.vx = isBoss ? 2 : 0;
    }

    update(platforms) {
        if (!this.isBoss) return;

        // Boss Movement / Patrol
        this.x += this.vx;
        const bounds = game.levelWidths[game.level - 1];
        if (this.x < bounds - 500 || this.x > bounds - this.width - 20) {
            this.vx = -this.vx;
        }

        // Projectiles throwing
        this.throwTimer++;
        let throwInterval = 100;
        if (game.selectedDifficulty === 'easy') throwInterval = 140;
        if (game.selectedDifficulty === 'hard') throwInterval = 70;

        if (this.throwTimer > throwInterval) {
            this.throwTimer = 0;
            
            let speedMult = 1.0;
            if (game.selectedDifficulty === 'easy') speedMult = 0.75;
            if (game.selectedDifficulty === 'hard') speedMult = 1.3;

            if (game.level === 10) {
                // Wedding cakes!
                game.projectiles.push(new WeddingCake(this.x, this.y + 20, -5 * speedMult, -4));
            } else {
                // Gym dumbbells
                game.projectiles.push(new Dumbbell(this.x, this.y + 20, -4 * speedMult, 0, true));
            }
            sounds.playHit();
        }

        // Apply simple physics
        this.vy += 0.5;
        this.y += this.vy;

        platforms.forEach(plat => {
            if (this.x < plat.x + plat.width &&
                this.x + this.width > plat.x &&
                this.y + this.height > plat.y &&
                this.y < plat.y + plat.height) {
                this.y = plat.y - this.height;
                this.vy = 0;
            }
        });
    }

    draw() {
        this.flexTimer += 0.05;
        let flexScale = 1 + Math.sin(this.flexTimer) * 0.04;

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.scale(flexScale, flexScale);

        // Shoulders / Arms
        ctx.fillStyle = '#f0c294';
        ctx.fillRect(-this.width/2 - 8, -this.height/4, 12, 25);
        ctx.fillStyle = '#000';
        ctx.fillRect(-this.width/2 - 10, -this.height/4 - 10, 16, 8);

        ctx.fillStyle = '#f0c294';
        ctx.fillRect(this.width/2 - 4, -this.height/4, 12, 25);

        // Torso / Tank Top
        ctx.fillStyle = '#1b1b1f';
        ctx.fillRect(-this.width/2 + 2, -this.height/3, this.width - 4, this.height/2);

        // Straps
        ctx.fillRect(-this.width/3, -this.height/3 - 6, 6, 8);
        ctx.fillRect(this.width/3 - 6, -this.height/3 - 6, 6, 8);

        // Chest
        ctx.fillStyle = '#f0c294';
        ctx.fillRect(-this.width/4, -this.height/3, this.width/2, 6);

        // Face
        ctx.fillRect(-this.width/4, -this.height/2 - 8, this.width/2, 20);
        ctx.fillStyle = '#333333';
        ctx.fillRect(-this.width/4, -this.height/2 + 4, this.width/2, 8);

        // Glasses
        ctx.fillStyle = '#111';
        ctx.fillRect(-this.width/5 - 1, -this.height/2 - 2, 7, 5);
        ctx.fillRect(this.width/10, -this.height/2 - 2, 7, 5);
        ctx.fillRect(-this.width/5, -this.height/2 - 1, this.width/2.5, 2);

        // Hair
        ctx.fillStyle = '#222';
        ctx.fillRect(-this.width/4 - 2, -this.height/2 - 14, this.width/2 + 4, 8);
        ctx.beginPath();
        ctx.moveTo(-this.width/4, -this.height/2 - 14);
        ctx.lineTo(-this.width/6, -this.height/2 - 20);
        ctx.lineTo(0, -this.height/2 - 14);
        ctx.lineTo(this.width/6, -this.height/2 - 20);
        ctx.lineTo(this.width/4, -this.height/2 - 14);
        ctx.fill();

        // Legs
        ctx.fillStyle = '#55555c';
        ctx.fillRect(-this.width/3, this.height/6, this.width/3, this.height/3);
        ctx.fillRect(2, this.height/6, this.width/3, this.height/3);

        // Shoes
        ctx.fillStyle = '#00f';
        ctx.fillRect(-this.width/3 - 2, this.height/2 - 4, this.width/3, 8);
        ctx.fillRect(2, this.height/2 - 4, this.width/3, 8);

        // Boss Health Bar
        if (this.isBoss) {
            let maxHp = 4;
            if (game.selectedDifficulty === 'easy') maxHp = 3;
            if (game.selectedDifficulty === 'hard') maxHp = 5;

            ctx.fillStyle = '#333';
            ctx.fillRect(-30, -this.height/2 - 32, 60, 6);
            ctx.fillStyle = '#ff3366';
            ctx.fillRect(-30, -this.height/2 - 32, (60 / maxHp) * this.bossHp, 6);
        }

        ctx.restore();
    }
}

// --- NEW ENEMY CLASSES ---

class Professor {
    constructor(x, y, vx = 1.5) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;
        this.vx = vx;
        this.facing = 'right';
        this.patrolDistance = 150;
        this.startX = x;
    }
    update() {
        this.x += this.vx;
        if (Math.abs(this.x - this.startX) > this.patrolDistance) {
            this.vx = -this.vx;
            this.facing = this.vx > 0 ? 'right' : 'left';
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        if (this.facing === 'left') {
            ctx.scale(-1, 1);
        }

        // Pants
        ctx.fillStyle = '#4e3629';
        ctx.fillRect(-8, 14, 6, 10);
        ctx.fillRect(2, 14, 6, 10);
        
        // Tweed jacket
        ctx.fillStyle = '#8b5a2b';
        ctx.fillRect(-12, -14, 24, 28);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-3, -14, 6, 6);

        // Face
        ctx.fillStyle = '#ffd1ac';
        ctx.fillRect(-8, -28, 16, 14);

        // Spectacles
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-6, -23, 5, 5);
        ctx.strokeRect(1, -23, 5, 5);

        // White hair
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-9, -32, 18, 6);
        ctx.fillRect(-9, -28, 3, 10);
        ctx.fillRect(6, -28, 3, 10);

        // Red grading pen
        ctx.fillStyle = '#ff0033';
        ctx.fillRect(10, -5, 3, 12);

        ctx.restore();
    }
}

class SecurityGuard {
    constructor(x, y, vx = 1.2) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 48;
        this.vx = vx;
        this.facing = 'right';
        this.patrolDistance = 120;
        this.startX = x;
    }
    update() {
        this.x += this.vx;
        if (Math.abs(this.x - this.startX) > this.patrolDistance) {
            this.vx = -this.vx;
            this.facing = this.vx > 0 ? 'right' : 'left';
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        if (this.facing === 'left') {
            ctx.scale(-1, 1);
        }

        // Blue uniform pants
        ctx.fillStyle = '#111625';
        ctx.fillRect(-8, 14, 6, 10);
        ctx.fillRect(2, 14, 6, 10);
        
        // Blue uniform jacket
        ctx.fillStyle = '#1a237e';
        ctx.fillRect(-12, -14, 24, 28);

        // Gold badge
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(4, -8, 4, 4);

        // Face
        ctx.fillStyle = '#ffd1ac';
        ctx.fillRect(-8, -28, 16, 14);

        // Security hat
        ctx.fillStyle = '#0d1b2a';
        ctx.fillRect(-10, -32, 20, 5);
        ctx.fillStyle = '#ffcc00';
        ctx.fillRect(-2, -30, 4, 2);

        // Flashlight beam
        ctx.fillStyle = 'rgba(255, 255, 0, 0.12)';
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(80, -20);
        ctx.lineTo(80, 20);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

class GymBro {
    constructor(x, y, vx = 2.0) {
        this.x = x;
        this.y = y;
        this.width = 34;
        this.height = 50;
        this.vx = vx;
        this.facing = 'right';
        this.patrolDistance = 140;
        this.startX = x;
    }
    update() {
        this.x += this.vx;
        if (Math.abs(this.x - this.startX) > this.patrolDistance) {
            this.vx = -this.vx;
            this.facing = this.vx > 0 ? 'right' : 'left';
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        if (this.facing === 'left') {
            ctx.scale(-1, 1);
        }

        // Arms/Skin
        ctx.fillStyle = '#f0c294';
        ctx.fillRect(-14, -10, 28, 24);
        
        // Green Vest
        ctx.fillStyle = '#2ecc71';
        ctx.fillRect(-10, -12, 20, 24);

        // Face
        ctx.fillStyle = '#f0c294';
        ctx.fillRect(-8, -26, 16, 14);

        // Backward cap
        ctx.fillStyle = '#ff3366';
        ctx.fillRect(-9, -30, 18, 5);
        ctx.fillRect(-13, -30, 4, 2);

        // Pants / Shoes
        ctx.fillStyle = '#333';
        ctx.fillRect(-8, 12, 6, 12);
        ctx.fillRect(2, 12, 6, 12);

        ctx.restore();
    }
}

class Note {
    constructor(x, y, label) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 28;
        this.label = label;
        this.collected = false;
        this.bob = 0;
    }

    draw() {
        if (this.collected) return;
        this.bob = Math.sin(Date.now() * 0.005) * 4;

        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2 + this.bob);

        // Blue cover
        ctx.fillStyle = '#3a86c8';
        ctx.fillRect(-12, -14, 24, 28);
        ctx.fillStyle = '#e5e9f0'; // Pages
        ctx.fillRect(-9, -12, 20, 24);

        // Spirals
        ctx.fillStyle = '#cfd4da';
        for (let i = -10; i <= 10; i += 5) {
            ctx.fillRect(-14, i, 4, 2);
        }

        // Lines
        ctx.strokeStyle = '#8f939c';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-5, -6); ctx.lineTo(7, -6);
        ctx.moveTo(-5, -1); ctx.lineTo(5, -1);
        ctx.moveTo(-5, 4); ctx.lineTo(8, 4);
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ff0055';
        ctx.font = '6px Arial';
        ctx.fillText(this.label, -7, -8);

        ctx.restore();
    }
}

class Coin {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 16;
        this.height = 16;
        this.collected = false;
        this.bob = 0;
        this.angle = Math.random() * Math.PI;
    }

    draw() {
        if (this.collected) return;
        this.bob = Math.sin(Date.now() * 0.007 + this.x) * 3;
        this.angle += 0.05;

        ctx.save();
        ctx.translate(this.x + this.width/2, this.y + this.height/2 + this.bob);
        ctx.scale(Math.sin(this.angle), 1);

        // Gold coin body
        ctx.fillStyle = '#ffcc00';
        ctx.strokeStyle = '#d4af37';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner circle
        ctx.strokeStyle = '#b89418';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, 5, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }
}

class Dumbbell {
    constructor(x, y, vx, vy, roll = false) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 12;
        this.vx = vx;
        this.vy = vy;
        this.roll = roll;
        this.angle = 0;
    }

    update(platforms) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.roll) {
            this.angle += 0.15;
            this.vy += 0.5;

            platforms.forEach(plat => {
                if (this.x < plat.x + plat.width &&
                    this.x + this.width > plat.x &&
                    this.y + this.height > plat.y &&
                    this.y < plat.y + plat.height) {
                    this.y = plat.y - this.height;
                    this.vy = 0;
                }
            });
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        if (this.roll) {
            ctx.rotate(this.angle);
        }

        ctx.fillStyle = '#333';
        ctx.fillRect(-12, -8, 6, 16); // Left
        ctx.fillRect(6, -8, 6, 16);  // Right
        ctx.fillStyle = '#aaa';
        ctx.fillRect(-6, -2, 12, 4);  // Handle

        ctx.restore();
    }
}

class WeddingCake {
    constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        this.width = 24;
        this.height = 20;
        this.vx = vx;
        this.vy = vy;
        this.angle = 0;
    }
    update(platforms) {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.4; // gravity
        this.angle += 0.05;

        platforms.forEach(plat => {
            if (this.x < plat.x + plat.width &&
                this.x + this.width > plat.x &&
                this.y + this.height > plat.y &&
                this.y < plat.y + plat.height) {
                this.y = plat.y - this.height;
                this.vy = -5;
            }
        });
    }
    draw() {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);

        // Cake base
        ctx.fillStyle = '#fff';
        ctx.fillRect(-10, 0, 20, 8); // bottom
        ctx.fillRect(-7, -6, 14, 6); // top
        
        ctx.fillStyle = '#ff85a2'; // frosting
        ctx.fillRect(-10, 6, 20, 2);
        ctx.fillRect(-7, 0, 14, 2);

        ctx.fillStyle = '#ff0033'; // cherry
        ctx.fillRect(-1, -8, 2, 2);

        ctx.restore();
    }
}

class Switch {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 20;
        this.pressed = false;
    }

    draw() {
        ctx.fillStyle = '#555';
        ctx.fillRect(this.x, this.y + 10, this.width, 10);

        ctx.fillStyle = this.pressed ? '#2ecc71' : '#e74c3c';
        let btnH = this.pressed ? 4 : 10;
        ctx.fillRect(this.x + 8, this.y + 20 - btnH - 10, this.width - 16, btnH);

        ctx.fillStyle = '#fff';
        ctx.font = '6px "Press Start 2P"';
        ctx.fillText("NOTES EXAM", this.x - 12, this.y - 4);
    }
}

class FloatingText {
    constructor(x, y, text, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.life = 60;
        this.vy = -1.2;
    }
    update() {
        this.y += this.vy;
        this.life--;
    }
    draw() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.font = '8px "Press Start 2P"';
        ctx.globalAlpha = this.life / 60;
        ctx.shadowColor = '#000';
        ctx.shadowBlur = 4;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

// --- Trampoline / Textbook springboards ---
class Springboard {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 16;
        this.activated = false;
        this.activeTimer = 0;
    }
    draw() {
        ctx.save();
        // Draw bottom wood base
        ctx.fillStyle = '#8b5a2b';
        ctx.fillRect(this.x, this.y + 10, this.width, 6);
        
        // Draw spring metal lines
        ctx.strokeStyle = '#aaa';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(this.x + 8, this.y + 10);
        ctx.lineTo(this.x + 12, this.activated ? this.y + 6 : this.y + 2);
        ctx.lineTo(this.x + 20, this.activated ? this.y + 6 : this.y + 2);
        ctx.lineTo(this.x + 24, this.y + 10);
        ctx.stroke();

        // Draw top bounce plate (looks like stack of study guides)
        ctx.fillStyle = this.activated ? '#ff3366' : '#2ecc71';
        ctx.fillRect(this.x + 2, this.activated ? this.y + 6 : this.y + 1, this.width - 4, 5);
        ctx.fillStyle = '#fff';
        ctx.fillRect(this.x + 4, this.activated ? this.y + 7 : this.y + 2, this.width - 8, 2); // pages texture
        
        ctx.restore();
    }
}

// --- Falling Rose Petals for Sunset Castle ---
class RosePetal {
    constructor() {
        this.x = Math.random() * GAME_WIDTH;
        this.y = Math.random() * -GAME_HEIGHT;
        this.size = Math.random() * 4 + 2;
        this.speedY = Math.random() * 1 + 0.6;
        this.speedX = Math.sin(Math.random() * 2) * 0.4;
        this.angle = Math.random() * Math.PI;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.angle += 0.02;
        if (this.y > GAME_HEIGHT) {
            this.y = -10;
            this.x = Math.random() * GAME_WIDTH;
        }
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = '#ff4a75';
        ctx.beginPath();
        // draw a petal shape
        ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// --- Parallax Background ---
class ParallaxBackground {
    constructor() {
        this.stars = [];
        for (let i = 0; i < 40; i++) {
            this.stars.push({
                x: Math.random() * GAME_WIDTH,
                y: Math.random() * GAME_HEIGHT * 0.6,
                size: Math.random() * 2 + 1,
                alpha: Math.random()
            });
        }
    }

    draw(level, scrollX) {
        ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

        if (level === 1 || level === 5 || level === 8) {
            // Library / Exam Hall Theme
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            if (level === 1) {
                grad.addColorStop(0, '#12122b');
                grad.addColorStop(1, '#080816');
            } else if (level === 5) {
                grad.addColorStop(0, '#1e112a');
                grad.addColorStop(1, '#0c0714');
            } else {
                grad.addColorStop(0, '#050510');
                grad.addColorStop(1, '#010103');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            ctx.strokeStyle = '#5c4033';
            ctx.lineWidth = 3;
            for (let i = 0; i < 4; i++) {
                let bx = 120 + i * 500 - (scrollX * 0.25) % 2000;
                ctx.fillStyle = '#103020';
                ctx.fillRect(bx, 60, 160, 90);
                ctx.strokeRect(bx, 60, 160, 90);
                
                ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
                ctx.font = '6px "Press Start 2P"';
                if (level === 1) {
                    if (i === 0) {
                        ctx.fillText("CHEM 101: LOV-3", bx + 10, 85);
                        ctx.fillText(`${game.userName}+Notes=💔`, bx + 10, 110);
                    } else if (i === 1) {
                        ctx.fillText(`P(${game.crushName} loves T)=0`, bx + 10, 85);
                    } else {
                        ctx.fillText("Study hard, simps!", bx + 10, 95);
                    }
                } else if (level === 5) {
                    ctx.fillText("MIDTERMS RUN!", bx + 10, 85);
                    ctx.fillText("Prof. Verma eye=100", bx + 10, 105);
                    ctx.fillText("Cheating = EXPELLED", bx + 10, 120);
                } else {
                    ctx.fillText("LOCKDOWN 10 PM", bx + 10, 85);
                    ctx.fillText("NO LATE STUDYING", bx + 10, 105);
                    ctx.fillText("Watch the guards!", bx + 10, 120);
                }
            }

            ctx.strokeStyle = 'rgba(51, 204, 255, 0.04)';
            ctx.lineWidth = 1;
            for (let x = 0; x < GAME_WIDTH; x += 30) {
                ctx.beginPath();
                ctx.moveTo(x - (scrollX * 0.1) % 30, 0);
                ctx.lineTo(x - (scrollX * 0.1) % 30, GAME_HEIGHT);
                ctx.stroke();
            }

        } else if (level === 2 || level === 6) {
            // College Corridor / Cafe Gossip
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            if (level === 2) {
                grad.addColorStop(0, '#0c0721');
                grad.addColorStop(1, '#04020a');
            } else {
                grad.addColorStop(0, '#1c0d18');
                grad.addColorStop(1, '#0a030c');
            }
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            ctx.strokeStyle = 'rgba(153, 51, 255, 0.08)';
            ctx.lineWidth = 3;
            for (let i = 0; i < 5; i++) {
                ctx.strokeRect(50 + i * 280 - (scrollX * 0.3) % 1200, 100, 140, 220);
            }

            ctx.font = '8px "Press Start 2P"';
            for (let i = 0; i < 3; i++) {
                let sx = 200 + i * 650 - (scrollX * 0.25) % 1950;
                ctx.save();
                ctx.fillStyle = level === 2 ? '#33ccff' : '#ffcc00';
                ctx.shadowColor = level === 2 ? '#33ccff' : '#ffcc00';
                ctx.shadowBlur = 6;
                if (level === 2) {
                    ctx.fillText("HUSTLE DOWN THE HALLWAY", sx, 80);
                } else {
                    ctx.fillText("COFFEE SHOP gossip...", sx, 80);
                }
                ctx.restore();
            }

        } else if (level === 3 || level === 4) {
            // Gym / Protein Shake Pit
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            grad.addColorStop(0, '#0a0518');
            grad.addColorStop(1, '#020005');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            ctx.strokeStyle = 'rgba(255, 51, 102, 0.06)';
            ctx.lineWidth = 4;
            for (let i = 0; i < 5; i++) {
                ctx.strokeRect(50 + i * 280 - (scrollX * 0.3) % 1000, 80, 120, 240);
            }

            ctx.font = '8px "Press Start 2P"';
            for (let i = 0; i < 3; i++) {
                let sx = 200 + i * 650 - (scrollX * 0.25) % 1950;
                ctx.save();
                ctx.fillStyle = '#ff3366';
                ctx.shadowColor = '#ff3366';
                ctx.shadowBlur = 8;
                if (level === 3) {
                    ctx.fillText("GYM JUICE BAR: GET FIT", sx, 70);
                } else {
                    ctx.fillText("PROTEIN SHAKE PIT: LIFT HEAVY", sx, 70);
                }
                ctx.restore();
            }

        } else if (level === 7) {
            // Sunset Park
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            grad.addColorStop(0, '#31102f');
            grad.addColorStop(0.5, '#7c1c3c');
            grad.addColorStop(1, '#fb854f');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            ctx.fillStyle = 'rgba(254, 222, 115, 0.2)';
            ctx.beginPath();
            ctx.arc(GAME_WIDTH / 2, GAME_HEIGHT / 2 + 40, 80, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1e0720';
            for (let i = 0; i < 6; i++) {
                let tx = 40 + i * 250 - (scrollX * 0.2) % 1500;
                ctx.fillRect(tx, 220, 20, 230);
                ctx.beginPath();
                ctx.moveTo(tx - 30, 220);
                ctx.lineTo(tx + 10, 150);
                ctx.lineTo(tx + 50, 220);
                ctx.fill();
            }

        } else {
            // Castle / Prom Standoff
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            grad.addColorStop(0, '#2e1137');
            grad.addColorStop(0.5, '#721b47');
            grad.addColorStop(1, '#f87060');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.stars.forEach(star => {
                ctx.fillRect(star.x - (scrollX * 0.05) % GAME_WIDTH, star.y, star.size, star.size);
            });

            ctx.fillStyle = '#1e0c25';
            for (let i = 0; i < 3; i++) {
                let tx = 80 + i * 380 - (scrollX * 0.15) % GAME_WIDTH;
                ctx.fillRect(tx, 160, 80, 290);
                ctx.beginPath();
                ctx.moveTo(tx - 10, 160);
                ctx.lineTo(tx + 40, 100);
                ctx.lineTo(tx + 90, 160);
                ctx.fill();
            }
        }
    }
}

// --- Dialogue Engine Data ---
const DIALOGUES = {
    L1_START: [
        { name: "Rahul", text: "Exam week is tomorrow and Priya doesn't have the chemistry notes. I stayed up all night compiling the ultimate study package! I must get them to her!" },
        { name: "Rahul", text: "But these floating platforms and library shelves are full of dust and traps. Let's start jumping!" }
    ],
    L1_END: [
        { name: "Rahul", text: "Priya! I did it! I collected all the missing notes for you!" },
        { name: "Priya", text: "Oh Rahul! You literally compiled all these chemistry sheets? That's so cute!" },
        { name: "Priya", text: "You are literally the sweetest, most helpful friend ever. Meet me at the Cafe near the gym later, I have a special surprise for you!" },
        { name: "Rahul", text: "A surprise?! She must really like me! I'm on my way!" }
    ],
    L2_START: [
        { name: "Rahul", text: "Wait, the exam starts in 15 minutes and the hallways are packed! I must run and grab the remaining Math notes before the bell rings!" }
    ],
    L2_END: [
        { name: "Rahul", text: "Made it! I got the math notes!" },
        { name: "Priya", text: "Phew! Thank you Rahul! You're a lifesaver. Come to the Gym Cafe now, let's grab that juice!" }
    ],
    L3_START: [
        { name: "Rahul", text: "I've arrived at the Gym Cafe. But wait... why is Chad here flexing, and where is Priya?" }
    ],
    L3_END: [
        { name: "Rahul", text: "Priya! I'm here! What was the surprise?" },
        { name: "Priya", text: "Hey Rahul! Meet my gym partner, Chad! He's so cool! He was just teaching me about biceps!" },
        { name: "Chad", text: "Yo, Rahul! Priya told me you make awesome homework notes. Pretty neat hobby, little bro. Let's see if you can handle the weight room!" },
        { name: "Rahul", text: "Wait, weight room? What's going on?" }
    ],
    L4_START: [
        { name: "Rahul", text: "Chad dragged me into the Gym Weight Floor. He's throwing heavy dumbbells! I need to dodge them and collect the Diet Plans Priya wanted!" }
    ],
    L4_END: [
        { name: "Rahul", text: "Here are the Diet Plans, Priya! I survived the falling weights!" },
        { name: "Priya", text: "Oh, thank you Rahul! Chad said you were too weak, but you did it! Now, we have the midterms exam hall. Don't be late!" }
    ],
    L5_START: [
        { name: "Rahul", text: "Oh no, it's the midterm exam! Professor Verma is patrolling the hall with a strict gaze. If he spots me cheating or passing notes, I'm done!" },
        { name: "Rahul", text: "I have to dodge Professor Verma, collect the Exam Sheets, and slide them to Priya!" }
    ],
    L5_END: [
        { name: "Rahul", text: "Priya, I sneaked the sheets to you under Professor Verma's nose!" },
        { name: "Priya", text: "Oh my god, Rahul, you're the ultimate savior! Meet me at the Retro Coffee House, let's celebrate!" },
        { name: "Rahul", text: "A coffee date! Finally! Just the two of us!" }
    ],
    L6_START: [
        { name: "Rahul", text: "A cozy coffee house. Perfect for studying together. Wait... why is the gym crew sitting in the back?" }
    ],
    L6_END: [
        { name: "Rahul", text: "Priya, I got the Cafe Chat logs we needed... wait, Chad is sitting with you?" },
        { name: "Priya", text: "Hey Rahul! Chad and his gym bros crashed our date! Isn't that fun? The more the merrier!" },
        { name: "Chad", text: "Yo Rahul, order us some protein shakes on your tab, thanks buddy!" },
        { name: "Rahul", text: "On my tab?! Ugh..." }
    ],
    L7_START: [
        { name: "Rahul", text: "Priya asked me to walk with her in the park at sunset. Sounds romantic, except she brought 5 massive shopping bags and wants me to carry them all!" },
        { name: "Rahul", text: "Let's carry the bags, collect the Tags, and keep moving!" }
    ],
    L7_END: [
        { name: "Rahul", text: "Carried all the bags, Priya! My shoulders are burning." },
        { name: "Priya", text: "Aww, thanks Rahul! You're like a reliable brother. Let's return to the library for finals prep!" }
    ],
    L8_START: [
        { name: "Rahul", text: "It's midnight, and we got locked inside the Library! There are security guards patrolling in the dark. I must dodge them and find the Key Guides!" }
    ],
    L8_END: [
        { name: "Rahul", text: "I found the library exit key!" },
        { name: "Priya", text: "Yay, we're free! Thanks to you, Chad and I can go to the Prom together! You're coming to the Prom, right?" },
        { name: "Rahul", text: "Prom? With Chad? I must gatecrash it..." }
    ],
    L9_START: [
        { name: "Rahul", text: "This is the Graduation Prom Castle gates. The guards won't let me in because I'm not on the list. I have to find the Prom tickets hidden around!" }
    ],
    L9_END: [
        { name: "Rahul", text: "I have the tickets! I'm coming in!" },
        { name: "Chad", text: "Not so fast, note boy. This is my wedding! Priya and I are getting married tonight, and you are NOT invited!" },
        { name: "Rahul", text: "Wedding?! No way! I won't let this happen!" }
    ],
    L10_START: [
        { name: "Rahul", text: "The final showdown. Chad is standing on the wedding stage, and Priya is waiting in her gown. I must defeat Chad in a duel of notes and hope!" }
    ],
    L10_END: [
        { name: "Rahul", text: "Priya! I defeated Chad! Now we can be together!" },
        { name: "Priya", text: "Oh my god, Rahul! Chad! Are you hurt?!" },
        { name: "Chad", text: "Ugh... my wedding suit... it's ruined..." },
        { name: "Priya", text: "How could you be so mean, Rahul? Chad didn't do anything! But thanks for the final exams help. We passed college!" },
        { name: "Priya", text: "Since you're such a great friend, you are officially the Best Man at our wedding! Now, let's start the ceremony!" },
        { name: "Chad", text: "Yeah, thanks buddy. Catch you later! Keep writing those notes!" }
    ]
};

// --- Game Master Controller ---
class GameController {
    constructor() {
        this.level = 1;
        this.gameState = 'menu'; // menu, playing, cutscene, gameover, victory
        this.score = 0;
        this.maxNotes = 5;
        this.collectedNotes = 0;
        this.hope = 100;
        this.cameraX = 0;
        this.player = null;
        this.priya = null;
        this.chad = null;
        this.platforms = [];
        this.notes = [];
        this.projectiles = [];
        this.switches = [];
        this.enemies = []; // All Level enemies (Professor Verma, Security guards, Gym bros)
        this.background = new ParallaxBackground();
        this.floatingTexts = [];
        this.springboards = [];
        this.rosePetals = [];

        // UI Select states
        this.selectedChar = 'rahul';
        this.selectedSkin = 'casual';
        this.selectedDifficulty = 'normal';

        // Dialogue variables
        this.currentDialogueList = [];
        this.dialogueIndex = 0;
        this.dialogueCallback = null;

        this.levelWidths = [1800, 2000, 1600, 1800, 2200, 1800, 2000, 2000, 2200, 1800];

        // --- USP Upgrades and Progression Data ---
        this.coins = 0;
        this.coinsCollectedThisLevel = 0;
        this.coinsList = [];
        this.upgrades = {
            sneakers: false,
            coffee: false,
            belt: false,
            magnet: false
        };
        this.unlockedLevels = 1;
        this.highScores = {}; // Level -> { bestTime, maxHope, completed }
        this.achievements = {
            first_notes: false,
            complete_l1: false,
            verma_dodge: false,
            defeat_chad: false,
            dream_buy: false,
            rich_simp: false,
            nightmare_survivor: false
        };
        
        this.levelStartTime = 0;
        this.damagedThisLevel = false;
        
        this.userName = 'Rahul';
        this.crushName = 'Priya';

        // Load saved state immediately
        this.loadFromLocalStorage();
    }

    init() {
        setupTouchEvents();
        
        // Difficulty selection
        const diffSelect = document.getElementById('difficulty-select');
        if (diffSelect) {
            const chips = diffSelect.querySelectorAll('.select-chip');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    chips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    this.selectedDifficulty = chip.getAttribute('data-difficulty');
                });
            });
        }

        // Character selection
        const charSelect = document.getElementById('character-select');
        const skinSection = document.getElementById('skin-section');
        if (charSelect) {
            const cards = charSelect.querySelectorAll('.selection-card');
            cards.forEach(card => {
                card.addEventListener('click', () => {
                    cards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    this.selectedChar = card.getAttribute('data-char');
                    
                    // Show skin selector only for Rahul
                    if (this.selectedChar === 'rahul') {
                        skinSection.classList.remove('hidden-section');
                    } else {
                        skinSection.classList.add('hidden-section');
                    }
                });
            });
        }

        // Skin selection
        const skinSelect = document.getElementById('skin-select');
        if (skinSelect) {
            const chips = skinSelect.querySelectorAll('.select-chip');
            chips.forEach(chip => {
                chip.addEventListener('click', () => {
                    chips.forEach(c => c.classList.remove('active'));
                    chip.classList.add('active');
                    this.selectedSkin = chip.getAttribute('data-skin');
                });
            });
        }

        // Tab switching click handlers
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sounds.init();
                const targetTab = btn.getAttribute('data-tab');
                this.switchTab(targetTab);
            });
        });

        // Start Quest / Enter Overworld Map
        document.getElementById('start-btn').addEventListener('click', () => {
            sounds.init();
            this.switchTab('map');
        });

        // Launch Level Button (Map screen detail card)
        const launchBtn = document.getElementById('launch-level-btn');
        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                sounds.init();
                if (this.selectedLevelForDetail) {
                    this.startGame(this.selectedLevelForDetail);
                }
            });
        }

        // Shop Buy Buttons clicking
        const buyBtns = document.querySelectorAll('.buy-btn');
        buyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                sounds.init();
                const card = btn.closest('.shop-card');
                const upgradeId = card.getAttribute('data-upgrade');
                const cost = parseInt(btn.getAttribute('data-cost'));
                this.buyUpgrade(upgradeId, cost, btn);
            });
        });

        // Update coin counts in the menu initially
        this.updateMenuCoinDisplay();

        // Pre-fill user and crush names from loaded state
        const nameInput = document.getElementById('player-name-input');
        const crushInput = document.getElementById('crush-name-input');
        if (nameInput) nameInput.value = this.userName;
        if (crushInput) crushInput.value = this.crushName;

        document.getElementById('restart-btn').addEventListener('click', () => {
            sounds.init();
            this.restartGame();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            sounds.init();
            this.resetToMenu();
            this.switchTab('setup');
        });

        const fullscreenBtn = document.getElementById('fullscreen-btn');
        if (fullscreenBtn) {
            fullscreenBtn.addEventListener('click', () => {
                this.toggleFullscreen();
            });
        }

        const handleFSChange = () => {
            const isFS = document.fullscreenElement || 
                         document.mozFullScreenElement || 
                         document.webkitFullScreenElement || 
                         document.msFullscreenElement;
            const btn = document.getElementById('fullscreen-btn');
            if (btn) {
                btn.textContent = isFS ? "📺 Window Mode" : "📺 Fullscreen";
            }
        };
        document.addEventListener('fullscreenchange', handleFSChange);
        document.addEventListener('webkitfullscreenchange', handleFSChange);
        document.addEventListener('mozfullscreenchange', handleFSChange);
        document.addEventListener('MSFullscreenChange', handleFSChange);

        // Skip/continue dialogs on clicking overlays (with double-tap prevention)
        let lastDialogueTap = 0;
        const advanceHandler = (e) => {
            const now = Date.now();
            if (now - lastDialogueTap < 200) return;
            lastDialogueTap = now;
            this.advanceDialogue();
        };

        const cutsceneOverlay = document.getElementById('cutscene-overlay');
        cutsceneOverlay.addEventListener('click', (e) => {
            sounds.init();
            advanceHandler(e);
        });
        cutsceneOverlay.addEventListener('touchstart', (e) => {
            sounds.init();
            advanceHandler(e);
        });

        window.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && this.gameState === 'cutscene') {
                advanceHandler(e);
            }
        });
    }

    startGame(levelNum = 1) {
        debugLog("startGame() triggered for level: " + levelNum);
        sounds.clearSadSong();

        // Read custom names from inputs
        const nameInput = document.getElementById('player-name-input');
        const crushInput = document.getElementById('crush-name-input');
        if (nameInput) this.userName = nameInput.value.trim() || 'Rahul';
        if (crushInput) this.crushName = crushInput.value.trim() || 'Priya';
        this.saveToLocalStorage();

        const menu = document.getElementById('menu-screen');
        menu.classList.add('hidden');
        menu.classList.remove('active');
        document.getElementById('hud').classList.remove('hidden');
        
        // Hope scales by difficulty
        if (this.selectedDifficulty === 'hard') {
            this.hope = 60;
        } else {
            this.hope = 100;
        }

        // Apply starting Hope booster upgrade
        if (this.upgrades && this.upgrades.booster) {
            this.hope = Math.min(100, this.hope + 10);
        }

        this.level = levelNum;
        this.coinsCollectedThisLevel = 0;
        this.damagedThisLevel = false;
        this.levelStartTime = Date.now();
        this.loadLevel(levelNum);
    }

    restartGame() {
        sounds.clearSadSong();
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.classList.add('hidden');
        gameOverScreen.classList.remove('active');
        
        if (this.selectedDifficulty === 'hard') {
            this.hope = 60;
        } else {
            this.hope = 100;
        }

        // Apply starting Hope booster upgrade
        if (this.upgrades && this.upgrades.booster) {
            this.hope = Math.min(100, this.hope + 10);
        }

        this.coinsCollectedThisLevel = 0;
        this.damagedThisLevel = false;
        this.levelStartTime = Date.now();
        this.loadLevel(this.level);
    }

    resetToMenu() {
        sounds.clearSadSong();
        const victoryScreen = document.getElementById('victory-screen');
        victoryScreen.classList.add('hidden');
        victoryScreen.classList.remove('active');
        const menuScreen = document.getElementById('menu-screen');
        menuScreen.classList.remove('hidden');
        menuScreen.classList.add('active');
        document.getElementById('hud').classList.add('hidden');
        this.gameState = 'menu';
    }

    toggleFullscreen() {
        const container = document.querySelector('.game-container');
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement && 
            !document.webkitFullscreenElement && 
            !document.msFullscreenElement) {
            const requestFS = container.requestFullscreen || 
                              container.mozRequestFullScreen || 
                              container.webkitRequestFullscreen || 
                              container.msRequestFullscreen;
            if (requestFS) {
                requestFS.call(container).catch(err => {
                    console.error("Error enabling fullscreen:", err);
                });
            }
        } else {
            const exitFS = document.exitFullscreen || 
                           document.mozCancelFullScreen || 
                           document.webkitExitFullscreen || 
                           document.msExitFullscreen;
            if (exitFS) {
                exitFS.call(document);
            }
        }
    }

    loadLevel(levelNum) {
        debugLog(`loadLevel(${levelNum}) called`);
        const isNewLevel = this.level !== levelNum;
        this.level = levelNum;
        this.collectedNotes = 0;
        this.projectiles = [];
        this.switches = [];
        this.cameraX = 0;
        this.enemies = []; // Reset enemies

        if (isNewLevel) {
            this.floatingTexts = [];
        }
        this.springboards = [];
        this.rosePetals = [];
        
        document.getElementById('hud-level').textContent = this.level;
        this.updateHUD();

        // Standard level platform arrangements
        this.platforms = [];
        this.notes = [];
        this.chad = null;

        const w = this.levelWidths[this.level - 1];

        // Setup player and Priya based on level
        if (this.level === 10) {
            // Final boss battle
            let hp = 4;
            if (this.selectedDifficulty === 'easy') hp = 3;
            if (this.selectedDifficulty === 'hard') hp = 5;

            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 120); // Standing on altar platform
            this.chad = new Chad(w - 300, 300, true); // BOSS!
            this.chad.bossHp = hp;

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: w, height: 100 });

            // Raised platform hierarchy
            this.platforms.push({ x: 400, y: 280, width: 200, height: 20 });
            this.platforms.push({ x: 700, y: 220, width: 250, height: 20 });
            this.platforms.push({ x: 1100, y: 280, width: 200, height: 20 });
            this.platforms.push({ x: 1450, y: 200, width: 200, height: 20 });

            // Switches to drop folders
            this.switches.push(new Switch(450, 260));
            this.switches.push(new Switch(800, 200));
            this.switches.push(new Switch(1150, 260));

            this.maxNotes = 0;

            // Rose petals
            this.rosePetals = [];
            for (let i = 0; i < 30; i++) {
                this.rosePetals.push(new RosePetal());
            }

        } else if (this.level === 1) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor platforms
            this.platforms.push({ x: 0, y: 380, width: 600, height: 100 });
            this.platforms.push({ x: 700, y: 380, width: 500, height: 100 }); // Pit at 600-700
            this.platforms.push({ x: 1300, y: 380, width: 600, height: 100 }); // Pit at 1200-1300

            // Floating Desks / Bookshelves
            this.platforms.push({ x: 200, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 380, y: 220, width: 120, height: 20 });
            this.platforms.push({ x: 540, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 710, y: 270, width: 150, height: 20 });
            this.platforms.push({ x: 910, y: 190, width: 120, height: 20 });
            this.platforms.push({ x: 1080, y: 270, width: 120, height: 20 });
            this.platforms.push({ x: 1260, y: 260, width: 120, height: 20 });
            this.platforms.push({ x: 1430, y: 280, width: 150, height: 20 });

            // Springboard
            this.springboards.push(new Springboard(540, 364));

            this.maxNotes = 5;
            this.notes.push(new Note(250, 240, "CHEM"));
            this.notes.push(new Note(430, 180, "MATH"));
            this.notes.push(new Note(780, 230, "PHYS"));
            this.notes.push(new Note(960, 150, "BIO"));
            this.notes.push(new Note(1480, 240, "CS"));

        } else if (this.level === 2) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 600, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 1200, y: 380, width: 800, height: 100 });

            // Floating
            this.platforms.push({ x: 150, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 320, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 490, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 680, y: 270, width: 150, height: 20 });
            this.platforms.push({ x: 880, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1050, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1250, y: 220, width: 120, height: 20 });
            this.platforms.push({ x: 1450, y: 280, width: 150, height: 20 });
            this.platforms.push({ x: 1650, y: 200, width: 120, height: 20 });

            this.springboards.push(new Springboard(350, 364));
            this.springboards.push(new Springboard(1300, 364));

            this.maxNotes = 5;
            this.notes.push(new Note(200, 240, "MATH"));
            this.notes.push(new Note(360, 160, "CALC"));
            this.notes.push(new Note(720, 230, "TRIG"));
            this.notes.push(new Note(1090, 240, "STAT"));
            this.notes.push(new Note(1690, 160, "ALG"));

        } else if (this.level === 3) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 250, 320);
            this.chad = new Chad(w - 120, 310, false); // Just flexing in bg

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 450, height: 100 });
            this.platforms.push({ x: 550, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 1150, y: 380, width: 450, height: 100 });

            // Floating
            this.platforms.push({ x: 200, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 400, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 600, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 800, y: 200, width: 150, height: 20 });
            this.platforms.push({ x: 1000, y: 270, width: 120, height: 20 });
            this.platforms.push({ x: 1200, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1400, y: 280, width: 120, height: 20 });

            // Enemies
            this.enemies.push(new GymBro(250, 330, 1.8));
            this.enemies.push(new GymBro(750, 330, 2.0));

            this.maxNotes = 5;
            this.notes.push(new Note(240, 240, "GYM"));
            this.notes.push(new Note(440, 160, "CARD"));
            this.notes.push(new Note(850, 160, "LIFT"));
            this.notes.push(new Note(1040, 230, "RUN"));
            this.notes.push(new Note(1240, 160, "FLEX"));

        } else if (this.level === 4) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 600, y: 380, width: 600, height: 100 });
            this.platforms.push({ x: 1300, y: 380, width: 500, height: 100 });

            // Floating
            this.platforms.push({ x: 250, y: 270, width: 120, height: 20 });
            this.platforms.push({ x: 450, y: 190, width: 120, height: 20 });
            this.platforms.push({ x: 650, y: 270, width: 120, height: 20 });
            this.platforms.push({ x: 850, y: 190, width: 150, height: 20 });
            this.platforms.push({ x: 1050, y: 270, width: 120, height: 20 });
            this.platforms.push({ x: 1250, y: 190, width: 120, height: 20 });
            this.platforms.push({ x: 1450, y: 270, width: 120, height: 20 });

            this.maxNotes = 5;
            this.notes.push(new Note(290, 230, "DIET"));
            this.notes.push(new Note(490, 150, "KETO"));
            this.notes.push(new Note(890, 150, "WHEY"));
            this.notes.push(new Note(1090, 230, "MEAL"));
            this.notes.push(new Note(1290, 150, "FAT"));

        } else if (this.level === 5) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 600, height: 100 });
            this.platforms.push({ x: 700, y: 380, width: 700, height: 100 });
            this.platforms.push({ x: 1500, y: 380, width: 700, height: 100 });

            // Floating
            this.platforms.push({ x: 200, y: 280, width: 150, height: 20 });
            this.platforms.push({ x: 450, y: 200, width: 150, height: 20 });
            this.platforms.push({ x: 750, y: 280, width: 150, height: 20 });
            this.platforms.push({ x: 1000, y: 180, width: 150, height: 20 });
            this.platforms.push({ x: 1300, y: 280, width: 150, height: 20 });
            this.platforms.push({ x: 1600, y: 200, width: 150, height: 20 });
            this.platforms.push({ x: 1850, y: 280, width: 150, height: 20 });

            // Professor Verma enemies
            this.enemies.push(new Professor(300, 332, 1.4));
            this.enemies.push(new Professor(1000, 332, 1.6));
            this.enemies.push(new Professor(1700, 332, 1.8));

            this.maxNotes = 5;
            this.notes.push(new Note(250, 240, "EXAM"));
            this.notes.push(new Note(500, 160, "LEAK"));
            this.notes.push(new Note(800, 240, "COPY"));
            this.notes.push(new Note(1350, 240, "PASS"));
            this.notes.push(new Note(1900, 240, "ANS"));

        } else if (this.level === 6) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 200, 320);
            this.chad = new Chad(w - 100, 310, false);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 600, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 1200, y: 380, width: 600, height: 100 });

            // Floating
            this.platforms.push({ x: 200, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 380, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 550, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 750, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 950, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1150, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1350, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1550, y: 200, width: 120, height: 20 });

            this.enemies.push(new GymBro(400, 330, 1.8));
            this.enemies.push(new GymBro(900, 330, 2.0));
            this.enemies.push(new GymBro(1400, 330, 2.2));

            this.maxNotes = 5;
            this.notes.push(new Note(240, 240, "CHAT"));
            this.notes.push(new Note(420, 160, "DATE"));
            this.notes.push(new Note(790, 160, "TALK"));
            this.notes.push(new Note(1190, 160, "CAFE"));
            this.notes.push(new Note(1390, 240, "GOSS"));

        } else if (this.level === 7) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 400, height: 100 });
            this.platforms.push({ x: 500, y: 380, width: 400, height: 100 });
            this.platforms.push({ x: 1000, y: 380, width: 400, height: 100 });
            this.platforms.push({ x: 1500, y: 380, width: 500, height: 100 });

            // Floating
            this.platforms.push({ x: 200, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 450, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 700, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 950, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1200, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1450, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1700, y: 280, width: 120, height: 20 });

            this.springboards.push(new Springboard(300, 364));
            this.springboards.push(new Springboard(800, 364));
            this.springboards.push(new Springboard(1300, 364));

            this.maxNotes = 5;
            this.notes.push(new Note(240, 240, "BAGS"));
            this.notes.push(new Note(490, 160, "HEVY"));
            this.notes.push(new Note(990, 160, "WALK"));
            this.notes.push(new Note(1240, 240, "PARK"));
            this.notes.push(new Note(1490, 160, "TAGS"));

        } else if (this.level === 8) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 600, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 1200, y: 380, width: 800, height: 100 });

            // Floating
            this.platforms.push({ x: 250, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 450, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 650, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 850, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1050, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1250, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1450, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1650, y: 200, width: 120, height: 20 });

            this.enemies.push(new SecurityGuard(350, 332, 1.3));
            this.enemies.push(new SecurityGuard(850, 332, 1.5));
            this.enemies.push(new SecurityGuard(1500, 332, 1.7));

            this.maxNotes = 5;
            this.notes.push(new Note(290, 230, "KEY"));
            this.notes.push(new Note(490, 150, "DOOR"));
            this.notes.push(new Note(690, 230, "DARK"));
            this.notes.push(new Note(1090, 230, "LOCK"));
            this.notes.push(new Note(1290, 150, "EXIT"));

        } else if (this.level === 9) {
            this.player = new Player(50, 300);
            this.priya = new Priya(w - 150, 320);

            // Ground floor
            this.platforms.push({ x: 0, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 600, y: 380, width: 400, height: 100 });
            this.platforms.push({ x: 1100, y: 380, width: 500, height: 100 });
            this.platforms.push({ x: 1700, y: 380, width: 500, height: 100 });

            // Floating
            this.platforms.push({ x: 200, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 400, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 600, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 800, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1000, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1200, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1400, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 1600, y: 200, width: 120, height: 20 });
            this.platforms.push({ x: 1800, y: 280, width: 120, height: 20 });
            this.platforms.push({ x: 2000, y: 200, width: 120, height: 20 });

            this.enemies.push(new SecurityGuard(300, 332, 1.4));
            this.enemies.push(new GymBro(800, 330, 1.8));
            this.enemies.push(new SecurityGuard(1350, 332, 1.6));
            this.enemies.push(new GymBro(1900, 330, 2.0));

            this.maxNotes = 5;
            this.notes.push(new Note(240, 240, "PROM"));
            this.notes.push(new Note(440, 160, "TICK"));
            this.notes.push(new Note(840, 160, "PASS"));
            this.notes.push(new Note(1240, 160, "GATE"));
            this.notes.push(new Note(1840, 240, "CRSH"));
        }

        // Spawn coins automatically on platforms
        this.spawnCoinsForLevel();

        // Central start dialogue trigger
        const startDialog = DIALOGUES[`L${this.level}_START`] || [
            { name: "Rahul", text: "Let's go!" }
        ];
        this.triggerCutscene(startDialog, () => {
            this.gameState = 'playing';
        });
    }

    resetLevel() {
        let damage = 20;
        if (this.selectedDifficulty === 'easy') {
            damage = 10;
        } else if (this.selectedDifficulty === 'hard') {
            damage = 30;
        }

        // Apply gym belt defense upgrade
        if (this.upgrades && this.upgrades.belt) {
            damage = Math.max(5, damage - 5);
        }

        this.hope -= damage;
        this.damagedThisLevel = true;
        this.updateHUD();
        
        if (this.hope <= 0) {
            let name = "Rahul";
            if (this.selectedChar === 'priya') name = "Priya";
            if (this.selectedChar === 'chad') name = "Chad";
            this.gameOver(`${name} ran out of Hope. The Simp Quest has failed.`);
        } else {
            this.coinsCollectedThisLevel = 0; // Reset coins collected in this attempt
            this.loadLevel(this.level);
        }
    }

    gameOver(reason) {
        this.gameState = 'gameover';
        sounds.playSadMelody();
        document.getElementById('game-over-reason').textContent = reason;
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.classList.remove('hidden');
        gameOverScreen.classList.add('active');
    }

    triggerCutscene(dialogues, callback) {
        debugLog(`triggerCutscene() with ${dialogues.length} lines`);
        this.gameState = 'cutscene';
        this.currentDialogueList = dialogues;
        this.dialogueIndex = 0;
        this.dialogueCallback = callback;
        
        document.getElementById('cutscene-overlay').classList.remove('hidden');
        this.showDialogueLine();
    }

    showDialogueLine() {
        debugLog(`showDialogueLine() index ${this.dialogueIndex}`);
        const line = this.currentDialogueList[this.dialogueIndex];
        const nameElem = document.getElementById('dialogue-name');
        const textElem = document.getElementById('dialogue-text-content');
        const avatar = document.getElementById('dialogue-avatar');

        // Dynamically replace default names
        let dispName = line.name;
        if (dispName === "Rahul") {
            dispName = this.userName;
        } else if (dispName === "Priya") {
            dispName = this.crushName;
        }

        let dispText = line.text;
        dispText = dispText.replace(/Rahul/gi, this.userName);
        dispText = dispText.replace(/Priya/gi, this.crushName);

        nameElem.textContent = dispName;
        textElem.textContent = dispText;

        // Custom style depending on original speaker name
        if (line.name === "Rahul") {
            nameElem.style.color = "var(--neon-blue)";
            avatar.style.borderColor = "var(--neon-blue)";
            avatar.style.backgroundColor = "#e63946";
        } else if (line.name === "Priya") {
            nameElem.style.color = "#ff85a2";
            avatar.style.borderColor = "#ff85a2";
            avatar.style.backgroundColor = "#ff85a2";
        } else if (line.name === "Chad") {
            nameElem.style.color = "var(--neon-purple)";
            avatar.style.borderColor = "var(--neon-purple)";
            avatar.style.backgroundColor = "#1b1b1f";
        } else if (line.name === "Professor Verma" || line.name === "Professor" || line.name === "Verma") {
            nameElem.style.color = "var(--neon-gold)";
            avatar.style.borderColor = "var(--neon-gold)";
            avatar.style.backgroundColor = "#8b5a2b";
        } else {
            nameElem.style.color = "#8c90a6";
            avatar.style.borderColor = "#8c90a6";
            avatar.style.backgroundColor = "#555";
        }
    }

    advanceDialogue() {
        debugLog(`advanceDialogue() current index ${this.dialogueIndex}`);
        this.dialogueIndex++;
        if (this.dialogueIndex < this.currentDialogueList.length) {
            this.showDialogueLine();
        } else {
            debugLog("All dialogues shown. Hiding overlay & executing callback.");
            document.getElementById('cutscene-overlay').classList.add('hidden');
            if (this.dialogueCallback) {
                this.dialogueCallback();
            }
        }
    }

    updateHUD() {
        document.getElementById('hud-notes').textContent = `${this.collectedNotes}/${this.maxNotes}`;
        document.getElementById('hud-hope-bar').style.width = `${this.hope}%`;
    }

    update() {
        if (this.gameState !== 'playing') return;

        // Update player
        const bounds = this.levelWidths[this.level - 1];
        this.player.update(this.platforms, bounds, this.springboards);

        // Update camera position to follow player
        this.cameraX = this.player.x - GAME_WIDTH / 4;
        if (this.cameraX < 0) this.cameraX = 0;
        if (this.cameraX > bounds - GAME_WIDTH) this.cameraX = bounds - GAME_WIDTH;

        // Update Springboards active states
        this.springboards.forEach(sb => {
            if (sb.activated) {
                sb.activeTimer--;
                if (sb.activeTimer <= 0) sb.activated = false;
            }
        });

        // Update Floating text juice
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            this.floatingTexts[i].update();
            if (this.floatingTexts[i].life <= 0) {
                this.floatingTexts.splice(i, 1);
            }
        }

        // Update falling rose petals
        if (this.rosePetals && this.rosePetals.length > 0) {
            this.rosePetals.forEach(rp => rp.update());
        }

        // Update enemies
        this.enemies.forEach(enemy => {
            enemy.update();
            if (this.player.x < enemy.x + enemy.width &&
                this.player.x + this.player.width > enemy.x &&
                this.player.y < enemy.y + enemy.height &&
                this.player.y + this.player.height > enemy.y) {
                this.diePlayer();
            }
        });

        // Update Chad (if present)
        if (this.chad) {
            this.chad.update(this.platforms);

            // Collide with Chad (in Boss phase)
            if (this.chad.isBoss &&
                this.player.x < this.chad.x + this.chad.width &&
                this.player.x + this.player.width > this.chad.x &&
                this.player.y < this.chad.y + this.chad.height &&
                this.player.y + this.player.height > this.chad.y) {
                
                // If player bounces on top of Chad's head
                if (this.player.vy > 0 && this.player.y + this.player.height - this.player.vy <= this.chad.y + 10) {
                    this.player.vy = -8; // bounce back
                    sounds.playHit();
                    this.floatingTexts.push(new FloatingText(this.chad.x, this.chad.y - 15, "BOUNCED!", '#ff3366'));
                } else {
                    this.diePlayer();
                }
            }
        }

        // Level 4 falling dumbbell obstacles spawner
        if (this.level === 4) {
            let spawnChance = 0.015;
            if (this.selectedDifficulty === 'easy') spawnChance = 0.008;
            if (this.selectedDifficulty === 'hard') spawnChance = 0.025;

            if (Math.random() < spawnChance) {
                let sx = this.player.x + Math.random() * 400 - 100;
                if (sx < 100) sx = 100;
                if (sx > bounds - 100) sx = bounds - 100;
                this.projectiles.push(new Dumbbell(sx, -20, 0, 3, false));
            }
        }

        // Update projectiles
        this.projectiles.forEach((proj, idx) => {
            proj.update(this.platforms);

            // Dumbbells bounce in Gym Cafe or weight pit
            if ((this.level === 2 || this.level === 3) && !proj.roll) {
                if (proj.vy === 0 && Math.random() < 0.02) {
                    proj.vy = -8;
                }
                proj.vy += 0.4;
            }

            // Check collision with player
            if (this.player.x < proj.x + proj.width &&
                this.player.x + this.player.width > proj.x &&
                this.player.y < proj.y + proj.height &&
                this.player.y + this.player.height > proj.y) {
                this.diePlayer();
            }

            // Remove out of bounds dumbbells
            if (proj.y > GAME_HEIGHT || proj.x < 0 || proj.x > bounds) {
                this.projectiles.splice(idx, 1);
            }
        });

        // Apply Heart Magnet pull upgrade
        if (this.upgrades && this.upgrades.magnet) {
            const pullSpeed = 4.5;
            const magnetRadius = 120;
            const px = this.player.x + this.player.width / 2;
            const py = this.player.y + this.player.height / 2;

            // Pull notes
            this.notes.forEach(note => {
                if (!note.collected) {
                    const nx = note.x + note.width / 2;
                    const ny = note.y + note.height / 2;
                    const dx = px - nx;
                    const dy = py - ny;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < magnetRadius) {
                        note.x += (dx / dist) * pullSpeed;
                        note.y += (dy / dist) * pullSpeed;
                    }
                }
            });

            // Pull coins
            if (this.coinsList) {
                this.coinsList.forEach(coin => {
                    if (!coin.collected) {
                        const cx = coin.x + coin.width / 2;
                        const cy = coin.y + coin.height / 2;
                        const dx = px - cx;
                        const dy = py - cy;
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        if (dist < magnetRadius) {
                            coin.x += (dx / dist) * pullSpeed;
                            coin.y += (dy / dist) * pullSpeed;
                        }
                    }
                });
            }
        }

        // Check Coin collection
        if (this.coinsList) {
            this.coinsList.forEach(coin => {
                if (!coin.collected &&
                    this.player.x < coin.x + coin.width &&
                    this.player.x + this.player.width > coin.x &&
                    this.player.y < coin.y + coin.height &&
                    this.player.y + this.player.height > coin.y) {
                    
                    coin.collected = true;
                    this.coinsCollectedThisLevel = (this.coinsCollectedThisLevel || 0) + 1;
                    sounds.playCoin();
                    this.floatingTexts.push(new FloatingText(coin.x, coin.y - 15, "+1 🪙", '#ffcc00'));
                }
            });
        }

        // Check Note collection
        this.notes.forEach(note => {
            if (!note.collected &&
                this.player.x < note.x + note.width &&
                this.player.x + this.player.width > note.x &&
                this.player.y < note.y + note.height &&
                this.player.y + this.player.height > note.y) {
                
                note.collected = true;
                this.collectedNotes++;
                sounds.playCollect();
                this.updateHUD();

                this.floatingTexts.push(new FloatingText(note.x - 10, note.y - 15, `+1 ${note.label}!`, '#00ffcc'));
            }
        });

        // Check Switch activation
        this.switches.forEach(sw => {
            if (!sw.pressed &&
                this.player.x < sw.x + sw.width &&
                this.player.x + this.player.width > sw.x &&
                this.player.y + this.player.height >= sw.y &&
                this.player.y + this.player.height <= sw.y + 12) {
                
                sw.pressed = true;
                sounds.playVictoryJingle();
                this.floatingTexts.push(new FloatingText(sw.x - 10, sw.y - 15, "EXAM EXPOSURE!", '#ffcc00'));
                
                // Drop a giant notes folder on Chad
                this.triggerBossDamage();
            }
        });

        // Check Level Goal reached (reaching Priya)
        if (this.player.x + this.player.width > this.priya.x) {
            if (this.collectedNotes >= this.maxNotes) {
                this.finishLevel();
            }
        }
    }

    diePlayer() {
        this.floatingTexts.push(new FloatingText(this.player.x, this.player.y - 20, "HEART CRACKED!", '#ff3366'));
        this.player.die();
    }

    triggerBossDamage() {
        if (!this.chad || !this.chad.isBoss) return;
        
        let noteDropY = 0;
        const noteDropInterval = setInterval(() => {
            noteDropY += 15;
            if (noteDropY >= this.chad.y) {
                clearInterval(noteDropInterval);
                
                // Damage boss
                this.chad.bossHp--;
                sounds.playHit();
                this.floatingTexts.push(new FloatingText(this.chad.x, this.chad.y - 20, "STUDY ATTACK! -1 HP", '#ff3366'));
                
                // If defeated
                if (this.chad.bossHp <= 0) {
                    this.chad.isBoss = false; // Defeated
                    this.chad.width = 36;
                    this.chad.height = 54;
                    this.chad.y = 326;
                } else {
                    // Reset switches after 2.5 seconds
                    setTimeout(() => {
                        this.switches.forEach(sw => sw.pressed = false);
                    }, 2500);
                }
            }
        }, 50);
    }

    finishLevel() {
        this.gameState = 'cutscene';
        
        // Calculate level completion speed run time
        const timeTaken = Math.floor((Date.now() - this.levelStartTime) / 1000);
        const hopeRemaining = this.hope;
        
        // Save stats to scores
        this.saveLevelStats(this.level, timeTaken, hopeRemaining);
        
        // Unlock next level
        const nextLevel = this.level + 1;
        if (nextLevel <= 10 && nextLevel > this.unlockedLevels) {
            this.unlockedLevels = nextLevel;
        }

        // Commit coins collected this level to total wallet
        const levelCoins = this.coinsCollectedThisLevel || 0;
        this.coins += levelCoins;
        this.coinsCollectedThisLevel = 0; // reset level collector

        // Check for achievements
        this.checkAchievements();

        // Save progress to local storage
        this.saveToLocalStorage();

        const nextLevelFunc = () => {
            // Check if game completely finished
            if (this.level >= 10) {
                this.showSadEnding();
            } else {
                // Return to map screen
                document.getElementById('hud').classList.add('hidden');
                const menu = document.getElementById('menu-screen');
                menu.classList.remove('hidden');
                menu.classList.add('active');
                this.gameState = 'menu';
                this.switchTab('map');
            }
        };

        const currentDialog = DIALOGUES[`L${this.level}_END`] || [
            { name: "Priya", text: "Great job! Let's move on!" }
        ];

        this.triggerCutscene(currentDialog, nextLevelFunc);
    }

    showSadEnding() {
        this.gameState = 'victory';
        sounds.clearSadSong();
        sounds.playSadHindiSong();
        
        const victoryScreen = document.getElementById('victory-screen');
        victoryScreen.classList.remove('hidden');
        victoryScreen.classList.add('active');
        document.getElementById('hud').classList.add('hidden');

        const cinema = document.getElementById('ending-cinema');
        cinema.innerHTML = `
            <div class="sad-bedroom">
                <div class="pixel-window">🌌</div>
                <div class="sad-bed">
                    <div class="bed-pillow"></div>
                    <div class="bed-blanket"></div>
                    <div class="rahul-lying">
                        <div class="face-lying">👓💧</div>
                        <div class="beer-bottle">🍾</div>
                    </div>
                </div>
                <div class="pixel-speaker">
                    <div class="speaker-grill"></div>
                    <div class="sound-wave wave-1">)</div>
                    <div class="sound-wave wave-2">)</div>
                </div>
                <div class="floating-lyrics">"Accha chalta hoon, duaon mein yaad rakhna... 💔🍺"</div>
            </div>
            <style>
                .sad-bedroom {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, #0a0b16, #1b1c3a);
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    border: 2px solid var(--neon-red);
                }
                .pixel-window {
                    position: absolute;
                    top: 15px;
                    left: 25px;
                    width: 45px;
                    height: 35px;
                    border: 3px solid #3d3e4c;
                    background: #020208;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 14px;
                    box-shadow: inset 0 0 10px rgba(0,0,0,0.8);
                }
                .sad-bed {
                    position: absolute;
                    bottom: 15px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 160px;
                    height: 60px;
                    background: #5d4037;
                    border-radius: 4px;
                    border-top: 6px solid #e0e0e0;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
                }
                .bed-pillow {
                    position: absolute;
                    top: -14px;
                    left: 8px;
                    width: 28px;
                    height: 14px;
                    background: #fff;
                    border-radius: 3px;
                    border: 1px solid #ccc;
                }
                .bed-blanket {
                    position: absolute;
                    top: -6px;
                    right: 0;
                    width: 110px;
                    height: 40px;
                    background: #1a237e;
                    border-radius: 2px;
                    border-left: 4px solid #303f9f;
                }
                .rahul-lying {
                    position: absolute;
                    top: -24px;
                    left: 12px;
                    width: 100px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                }
                .rahul-lying::before {
                    content: "";
                    position: absolute;
                    left: 0;
                    width: 24px;
                    height: 24px;
                    background: #ffd1ac;
                    border-radius: 4px;
                    border: 1px solid #8d6e63;
                }
                .face-lying {
                    position: absolute;
                    left: 2px;
                    top: 4px;
                    font-size: 10px;
                    display: flex;
                    gap: 1px;
                }
                .beer-bottle {
                    position: absolute;
                    left: 30px;
                    top: -12px;
                    font-size: 26px;
                    transform: rotate(50deg);
                    animation: swayBottle 2s infinite alternate ease-in-out;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.4));
                }
                .pixel-speaker {
                    position: absolute;
                    bottom: 15px;
                    right: 25px;
                    width: 24px;
                    height: 38px;
                    background: #2b2b2b;
                    border: 2px solid #111;
                    border-radius: 2px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    align-items: center;
                    padding: 4px 0;
                    box-shadow: 2px 2px 0 #000;
                }
                .speaker-grill {
                    width: 12px;
                    height: 12px;
                    background: #000;
                    border-radius: 50%;
                    border: 1px solid #444;
                }
                .pixel-speaker::after {
                    content: "";
                    width: 8px;
                    height: 8px;
                    background: #000;
                    border-radius: 50%;
                    border: 1px solid #444;
                }
                .sound-wave {
                    position: absolute;
                    color: #ff3366;
                    font-family: monospace;
                    font-size: 14px;
                    font-weight: bold;
                    opacity: 0;
                }
                .wave-1 {
                    right: -10px;
                    top: 5px;
                    animation: pulseWave 1s infinite linear;
                }
                .wave-2 {
                    right: -16px;
                    top: 2px;
                    font-size: 18px;
                    animation: pulseWave 1s infinite linear 0.5s;
                }
                .floating-lyrics {
                    position: absolute;
                    top: 25px;
                    text-align: center;
                    font-family: 'Press Start 2P', monospace;
                    font-size: 7px;
                    line-height: 1.6;
                    color: #ff3366;
                    text-shadow: 0 0 5px rgba(255, 51, 102, 0.9);
                    width: 90%;
                    animation: bounceLyrics 3s infinite ease-in-out;
                }
                @keyframes swayBottle {
                    from { transform: rotate(35deg); }
                    to { transform: rotate(65deg); }
                }
                @keyframes bounceLyrics {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes pulseWave {
                    0% { transform: scale(0.5); opacity: 0; }
                    50% { opacity: 0.8; }
                    100% { transform: scale(1.2) translateX(6px); opacity: 0; }
                }
            </style>
        `;

        document.getElementById('ending-text').textContent = 
            `${this.userName} lies on his bed in despair, clutching a cold beer bottle. Background music plays 'Channa Mereya'. He gave the notes, Chad got the girl. It's the ultimate simp tragedy...`;
    }

    draw() {
        this.background.draw(this.level, this.cameraX);

        if (this.gameState === 'menu' || !this.player || !this.priya) {
            return;
        }

        ctx.save();
        ctx.translate(-this.cameraX, 0);

        // Platform styling based on theme
        let platformFill = '#1f293d';
        let platformStroke = '#33ccff';
        if (this.level === 1 || this.level === 5 || this.level === 8) {
            platformFill = '#1f293d';
            platformStroke = '#33ccff';
        } else if (this.level === 2 || this.level === 6) {
            platformFill = '#1a0c24';
            platformStroke = '#9933ff';
        } else if (this.level === 3 || this.level === 4) {
            platformFill = '#222530';
            platformStroke = '#ff3366';
        } else {
            platformFill = '#4a2340';
            platformStroke = '#ffcc00';
        }

        ctx.fillStyle = platformFill;
        ctx.strokeStyle = platformStroke;
        ctx.lineWidth = 3;

        this.platforms.forEach(plat => {
            ctx.fillRect(plat.x, plat.y, plat.width, plat.height);
            ctx.strokeRect(plat.x, plat.y, plat.width, plat.height);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.fillRect(plat.x + 4, plat.y + 4, plat.width - 8, plat.height - 8);
        });

        // Draw Switches
        this.switches.forEach(sw => sw.draw());

        // Draw springboards
        this.springboards.forEach(sb => sb.draw());

        // Draw collectibles
        this.notes.forEach(note => note.draw());

        if (this.coinsList) {
            this.coinsList.forEach(coin => coin.draw());
        }

        // Draw projectiles
        this.projectiles.forEach(proj => proj.draw());

        // Draw rose petals
        if (this.rosePetals && this.rosePetals.length > 0) {
            this.rosePetals.forEach(rp => rp.draw());
        }

        // Draw enemies
        this.enemies.forEach(enemy => enemy.draw());

        // Draw Priya
        if (this.priya) {
            this.priya.draw();
        }

        // Draw Chad
        if (this.chad) {
            this.chad.draw();
        }

        // Draw Player
        if (this.player) {
            this.player.draw();
        }

        // Draw floating texts
        this.floatingTexts.forEach(ft => ft.draw());

        ctx.restore();
    }

    // --- USP Progression Systems & Overworld Mapping ---

    updateMenuCoinDisplay() {
        const coinSpan = document.getElementById('menu-coin-count');
        if (coinSpan) {
            coinSpan.textContent = this.coins;
        }
    }

    switchTab(tabId) {
        // Toggle tab buttons
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(t => {
            if (t.getAttribute('data-tab') === tabId) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Toggle tab panels
        const panels = document.querySelectorAll('.tab-panel');
        panels.forEach(p => {
            if (p.id === `panel-${tabId}`) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        // Specific panel renders
        if (tabId === 'map') {
            this.renderOverworldMap();
        } else if (tabId === 'shop') {
            this.renderShop();
        } else if (tabId === 'badges') {
            this.renderBadges();
        } else if (tabId === 'scores') {
            this.renderScores();
        }
    }

    renderOverworldMap() {
        const mapContainer = document.getElementById('overworld-map');
        if (!mapContainer) return;
        mapContainer.innerHTML = '';

        const levelTitles = [
            "Library Lockdown", "Sunset Park Chase", "Protein Shake Pit",
            "Cafeteria Chaos", "Exam Hall Escape", "Canteen Corner",
            "Auditorium Alert", "Dorm Defiance", "Nostalgia Lane", "The Wedding Clash"
        ];

        for (let i = 1; i <= 10; i++) {
            const node = document.createElement('div');
            node.className = 'level-node';
            node.textContent = i;
            
            const completed = this.highScores[i] && this.highScores[i].completed;
            const unlocked = i === 1 || (this.highScores[i - 1] && this.highScores[i - 1].completed) || i <= this.unlockedLevels;

            if (completed) {
                node.classList.add('completed');
            } else if (unlocked) {
                node.classList.add('unlocked');
            } else {
                node.classList.add('locked');
            }

            if (this.selectedLevelForDetail === i) {
                node.classList.add('active-selection');
            }

            if (unlocked || completed) {
                node.addEventListener('click', () => {
                    document.querySelectorAll('.level-node').forEach(n => n.classList.remove('active-selection'));
                    node.classList.add('active-selection');
                    
                    this.selectedLevelForDetail = i;
                    const detailCard = document.getElementById('level-detail-card');
                    detailCard.classList.remove('hidden');
                    
                    document.getElementById('detail-level-title').textContent = `LEVEL ${i}: ${levelTitles[i-1]}`;
                    
                    let notesReq = 5;
                    if (i === 10) notesReq = 0;
                    document.getElementById('detail-level-notes').textContent = `0 / ${notesReq}`;
                    
                    const scoreRecord = this.highScores[i];
                    if (scoreRecord) {
                        document.getElementById('detail-level-time').textContent = `${scoreRecord.bestTime}s`;
                        document.getElementById('detail-level-hope').textContent = `${scoreRecord.maxHope}%`;
                    } else {
                        document.getElementById('detail-level-time').textContent = '--';
                        document.getElementById('detail-level-hope').textContent = '--';
                    }
                });
            }

            mapContainer.appendChild(node);
        }
    }

    renderShop() {
        this.updateMenuCoinDisplay();
        const cards = document.querySelectorAll('.shop-card');
        cards.forEach(card => {
            const upgradeId = card.getAttribute('data-upgrade');
            const btn = card.querySelector('.buy-btn');
            const cost = parseInt(btn.getAttribute('data-cost'));
            const isOwned = this.upgrades[upgradeId];

            if (isOwned) {
                btn.textContent = 'OWNED';
                btn.className = 'buy-btn owned';
                btn.disabled = true;
            } else {
                btn.textContent = `🪙 ${cost}`;
                btn.className = 'buy-btn';
                btn.disabled = false;
                if (this.coins < cost) {
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'not-allowed';
                } else {
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }
            }
        });
    }

    buyUpgrade(upgradeId, cost, btn) {
        if (this.upgrades[upgradeId]) return;

        if (this.coins >= cost) {
            this.coins -= cost;
            this.upgrades[upgradeId] = true;
            sounds.playVictoryJingle();

            this.floatingTexts.push(new FloatingText(this.player ? this.player.x : GAME_WIDTH / 2, this.player ? this.player.y - 10 : GAME_HEIGHT / 2, "UPGRADE UNLOCKED!", '#ffcc00'));

            if (upgradeId === 'sneakers') {
                this.achievements.dream_buy = true;
            }

            this.saveToLocalStorage();
            this.renderShop();
            this.checkAchievements();
        } else {
            sounds.playHit();
        }
    }

    renderBadges() {
        for (const badgeId in this.achievements) {
            const badgeCard = document.getElementById(`badge-${badgeId}`);
            if (badgeCard) {
                if (this.achievements[badgeId]) {
                    badgeCard.classList.remove('locked');
                } else {
                    badgeCard.classList.add('locked');
                }
            }
        }
    }

    renderScores() {
        const body = document.getElementById('scores-table-body');
        if (!body) return;
        body.innerHTML = '';

        const levelTitles = [
            "Library Lockdown", "Sunset Park Chase", "Protein Shake Pit",
            "Cafeteria Chaos", "Exam Hall Escape", "Canteen Corner",
            "Auditorium Alert", "Dorm Defiance", "Nostalgia Lane", "The Wedding Clash"
        ];

        for (let i = 1; i <= 10; i++) {
            const tr = document.createElement('tr');
            const scoreRecord = this.highScores[i];
            
            let statusText = 'LOCKED';
            let statusClass = 'status-locked';
            let bestTime = '--';
            let maxHope = '--';

            const completed = scoreRecord && scoreRecord.completed;
            const unlocked = i === 1 || (this.highScores[i - 1] && this.highScores[i - 1].completed) || i <= this.unlockedLevels;

            if (completed) {
                statusText = 'COMPLETED';
                statusClass = 'status-completed';
                bestTime = `${scoreRecord.bestTime}s`;
                maxHope = `${scoreRecord.maxHope}%`;
            } else if (unlocked) {
                statusText = 'UNLOCKED';
                statusClass = 'status-unlocked';
            }

            tr.innerHTML = `
                <td>L${i}: ${levelTitles[i-1]}</td>
                <td class="${statusClass}">${statusText}</td>
                <td>${bestTime}</td>
                <td>${maxHope}</td>
            `;
            body.appendChild(tr);
        }
    }

    saveLevelStats(level, time, hope) {
        if (!this.highScores[level]) {
            this.highScores[level] = {
                bestTime: time,
                maxHope: hope,
                completed: true
            };
        } else {
            this.highScores[level].completed = true;
            if (time < this.highScores[level].bestTime) {
                this.highScores[level].bestTime = time;
            }
            if (hope > this.highScores[level].maxHope) {
                this.highScores[level].maxHope = hope;
            }
        }
    }

    checkAchievements() {
        if (this.coins >= 100) {
            this.achievements.rich_simp = true;
        }
        if (this.collectedNotes > 0) {
            this.achievements.first_notes = true;
        }
        if (this.highScores[1] && this.highScores[1].completed) {
            this.achievements.complete_l1 = true;
        }
        if (this.level === 5 && !this.damagedThisLevel && this.highScores[5] && this.highScores[5].completed) {
            this.achievements.verma_dodge = true;
        }
        if (this.highScores[10] && this.highScores[10].completed) {
            this.achievements.defeat_chad = true;
            if (this.selectedDifficulty === 'hard') {
                this.achievements.nightmare_survivor = true;
            }
        }
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        const data = {
            coins: this.coins,
            upgrades: this.upgrades,
            unlockedLevels: this.unlockedLevels,
            highScores: this.highScores,
            achievements: this.achievements,
            userName: this.userName,
            crushName: this.crushName
        };
        localStorage.setItem('super_simp_bros_save', JSON.stringify(data));
    }

    loadFromLocalStorage() {
        try {
            const raw = localStorage.getItem('super_simp_bros_save');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (parsed.coins !== undefined) this.coins = parsed.coins;
                if (parsed.upgrades !== undefined) this.upgrades = Object.assign(this.upgrades, parsed.upgrades);
                if (parsed.unlockedLevels !== undefined) this.unlockedLevels = parsed.unlockedLevels;
                if (parsed.highScores !== undefined) this.highScores = parsed.highScores;
                if (parsed.achievements !== undefined) this.achievements = Object.assign(this.achievements, parsed.achievements);
                if (parsed.userName !== undefined) this.userName = parsed.userName;
                if (parsed.crushName !== undefined) this.crushName = parsed.crushName;
            }
        } catch (e) {
            console.error("Failed to load game progress:", e);
        }
    }

    spawnCoinsForLevel() {
        this.coinsList = [];
        this.coinsCollectedThisLevel = 0;
        if (this.level === 10) return;

        this.platforms.forEach((plat, index) => {
            if (index === 0 && plat.width > 1200) return;
            if (plat.width < 60) return;

            let numCoins = Math.floor(plat.width / 130);
            if (numCoins > 0) {
                let startX = plat.x + (plat.width - (numCoins - 1) * 35) / 2;
                for (let i = 0; i < numCoins; i++) {
                    this.coinsList.push(new Coin(startX + i * 35, plat.y - 30));
                }
            }
        });
    }
}

const game = new GameController();
game.init();

// --- Main Engine Loop ---
function loop() {
    game.update();
    game.draw();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
