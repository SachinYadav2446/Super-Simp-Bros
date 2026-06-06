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
        this.speed = 3.6; // Restored to 3.6 for solvable jumps
        this.jumpForce = -12.0; // Restored to -12.0 for solvable jumps
        this.grounded = false;
        this.facing = 'right';
        this.animationTimer = 0;
        this.isMoving = false;
    }

    update(platforms, bounds, springboards = []) {
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
        this.vy += 0.6; // Gravity constant

        // Jump
        if (keys.jump && this.grounded) {
            this.vy = this.jumpForce;
            this.grounded = false;
            sounds.playJump();
        }

        // Update positions
        this.x += this.vx;
        this.y += this.vy;

        // Springboard collision check before static platform collision
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

        // Draw Rahul
        // Bobbing effect when walking
        let walkBob = 0;
        if (this.isMoving && this.grounded) {
            walkBob = Math.sin(this.animationTimer) * 3;
        }

        // 1. Legs / Shoes (Blue Jeans, Brown Shoes)
        ctx.fillStyle = '#4a2c11'; // Shoes
        let legOffset = (Math.sin(this.animationTimer) * 4);
        ctx.fillRect(-12, 16 + (this.isMoving ? legOffset : 0), 8, 8);
        ctx.fillRect(4, 16 + (this.isMoving ? -legOffset : 0), 8, 8);

        ctx.fillStyle = '#2c406c'; // Jeans
        ctx.fillRect(-12, 6, 8, 11);
        ctx.fillRect(4, 6, 8, 11);

        // 2. Body / Red Hoodie
        ctx.fillStyle = '#e63946'; // Red hoodie body
        ctx.fillRect(-14, -14, 28, 20);

        // Draw hood string / zipper
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-1, -10, 2, 8);

        // 3. Face
        ctx.fillStyle = '#ffd1ac'; // Skin tone
        ctx.fillRect(-10, -32, 20, 18);

        // 4. Glasses (Rahul's signature look!)
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2.5;
        ctx.strokeRect(-8, -25, 7, 7);
        ctx.strokeRect(1, -25, 7, 7);
        ctx.beginPath();
        ctx.moveTo(-1, -21);
        ctx.lineTo(1, -21);
        ctx.stroke();

        ctx.fillStyle = '#000000';
        ctx.fillRect(-5, -23, 2, 2); // Left eye dot
        ctx.fillRect(4, -23, 2, 2); // Right eye dot

        // 5. Hair (Fluffy black hair)
        ctx.fillStyle = '#111116';
        ctx.fillRect(-12, -37, 24, 8);
        ctx.fillRect(-12, -32, 4, 10); // sideburns

        // 6. Carrying details (Class Notes strap/bag)
        ctx.strokeStyle = '#8b5a2b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-14, -10);
        ctx.lineTo(14, 4);
        ctx.stroke();

        // Bobbing adjustment for head items
        if (walkBob) {
            ctx.fillStyle = '#ffffff';
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

        // Hair (Long Brown Hair)
        ctx.fillStyle = '#5c3d24';
        ctx.fillRect(-14, -30, 28, 38);

        // Skin / Face
        ctx.fillStyle = '#ffe0bd';
        ctx.fillRect(-10, -30, 20, 16);

        // Eyes (Cute blink effect occasionally)
        ctx.fillStyle = '#3c220f';
        const blink = Math.sin(Date.now() * 0.001) > 0.98;
        if (!blink) {
            ctx.fillRect(-6, -24, 3, 3);
            ctx.fillRect(3, -24, 3, 3);
        }

        // Cute blush
        ctx.fillStyle = '#ff8fa3';
        ctx.fillRect(-9, -20, 3, 2);
        ctx.fillRect(6, -20, 3, 2);

        // Cute Outfit (Pink/Violet Dress)
        ctx.fillStyle = '#ff85a2'; // Pink dress top
        ctx.fillRect(-12, -14, 24, 15);
        ctx.fillStyle = '#f72585'; // Skirt part
        ctx.fillRect(-14, 1, 28, 17);

        // Shoes
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-10, 18, 6, 6);
        ctx.fillRect(4, 18, 6, 6);

        // Floating Hearts above Priya
        if (Math.sin(Date.now() * 0.002) > 0) {
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
        this.bossHp = 3;
        this.vy = 0;
        this.vx = isBoss ? 2 : 0;
    }

    update(platforms) {
        if (!this.isBoss) return;

        // Boss Movement / Patrol
        this.x += this.vx;
        if (this.x < 450 || this.x > GAME_WIDTH - this.width - 20) {
            this.vx = -this.vx;
        }

        // Throws dumbbells
        this.throwTimer++;
        if (this.throwTimer > 120) { // Every 2 seconds
            this.throwTimer = 0;
            // Spawn rolling dumbbell
            game.projectiles.push(new Dumbbell(this.x, this.y + 20, -4, 0, true));
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

        // Huge Buff Shoulders / Arms
        ctx.fillStyle = '#f0c294'; // Skin tone
        // Left arm flexing
        ctx.fillRect(-this.width/2 - 8, -this.height/4, 12, 25);
        ctx.fillStyle = '#000';
        ctx.fillRect(-this.width/2 - 10, -this.height/4 - 10, 16, 8); // Gym sweatband / weight

        // Right arm flexing
        ctx.fillStyle = '#f0c294';
        ctx.fillRect(this.width/2 - 4, -this.height/4, 12, 25);

        // Buff Torso / Black Gym Stringer Tank Top
        ctx.fillStyle = '#1b1b1f'; // Stringer
        ctx.fillRect(-this.width/2 + 2, -this.height/3, this.width - 4, this.height/2);

        // Straps
        ctx.fillRect(-this.width/3, -this.height/3 - 6, 6, 8);
        ctx.fillRect(this.width/3 - 6, -this.height/3 - 6, 6, 8);

        // Chest / Neck skin area
        ctx.fillStyle = '#f0c294';
        ctx.fillRect(-this.width/4, -this.height/3, this.width/2, 6);

        // Face
        ctx.fillRect(-this.width/4, -this.height/2 - 8, this.width/2, 20);
        // Cool beard / jawline
        ctx.fillStyle = '#333333';
        ctx.fillRect(-this.width/4, -this.height/2 + 4, this.width/2, 8);

        // Cool sunglasses (Chad's signature flexing look)
        ctx.fillStyle = '#111';
        ctx.fillRect(-this.width/5 - 1, -this.height/2 - 2, 7, 5);
        ctx.fillRect(this.width/10, -this.height/2 - 2, 7, 5);
        ctx.fillRect(-this.width/5, -this.height/2 - 1, this.width/2.5, 2); // Bridge

        // Spiky Gym Hair
        ctx.fillStyle = '#222';
        ctx.fillRect(-this.width/4 - 2, -this.height/2 - 14, this.width/2 + 4, 8);
        // Spike details
        ctx.beginPath();
        ctx.moveTo(-this.width/4, -this.height/2 - 14);
        ctx.lineTo(-this.width/6, -this.height/2 - 20);
        ctx.lineTo(0, -this.height/2 - 14);
        ctx.lineTo(this.width/6, -this.height/2 - 20);
        ctx.lineTo(this.width/4, -this.height/2 - 14);
        ctx.fill();

        // Legs / Gray Sweatpants
        ctx.fillStyle = '#55555c';
        ctx.fillRect(-this.width/3, this.height/6, this.width/3, this.height/3);
        ctx.fillRect(2, this.height/6, this.width/3, this.height/3);

        // Shoes
        ctx.fillStyle = '#00f'; // Bright gym sneakers
        ctx.fillRect(-this.width/3 - 2, this.height/2 - 4, this.width/3, 8);
        ctx.fillRect(2, this.height/2 - 4, this.width/3, 8);

        // Boss Health Bar above head
        if (this.isBoss) {
            ctx.fillStyle = '#333';
            ctx.fillRect(-30, -this.height/2 - 32, 60, 6);
            ctx.fillStyle = '#ff3366';
            ctx.fillRect(-30, -this.height/2 - 32, 20 * this.bossHp, 6);
        }

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

        // Note Book Spine / Base
        ctx.fillStyle = '#3a86c8'; // Blue cover
        ctx.fillRect(-12, -14, 24, 28);
        ctx.fillStyle = '#e5e9f0'; // Pages
        ctx.fillRect(-9, -12, 20, 24);

        // Spirals on side
        ctx.fillStyle = '#cfd4da';
        for (let i = -10; i <= 10; i += 5) {
            ctx.fillRect(-14, i, 4, 2);
        }

        // Inside joke scribble notes
        ctx.strokeStyle = '#8f939c';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-5, -6); ctx.lineTo(7, -6);
        ctx.moveTo(-5, -1); ctx.lineTo(5, -1);
        ctx.moveTo(-5, 4); ctx.lineTo(8, 4);
        ctx.stroke();

        // Tiny text cover details
        ctx.fillStyle = '#ff0055';
        ctx.font = '6px Arial';
        ctx.fillText(this.label, -7, -8);

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
            this.vy += 0.5; // Gravity

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

        // Draw Dumbbell
        ctx.fillStyle = '#333';
        // Left Weight
        ctx.fillRect(-12, -8, 6, 16);
        // Right Weight
        ctx.fillRect(6, -8, 6, 16);
        // Handle
        ctx.fillStyle = '#aaa';
        ctx.fillRect(-6, -2, 12, 4);

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
        ctx.fillRect(this.x, this.y + 10, this.width, 10); // Base

        ctx.fillStyle = this.pressed ? '#2ecc71' : '#e74c3c'; // Green if pressed, red if not
        let btnH = this.pressed ? 4 : 10;
        ctx.fillRect(this.x + 8, this.y + 20 - btnH - 10, this.width - 16, btnH);

        // Switch Text
        ctx.fillStyle = '#fff';
        ctx.font = '6px "Press Start 2P"';
        ctx.fillText("NOTES EXAM", this.x - 12, this.y - 4);
    }
}

// --- Floating Text Juice effect ---
class FloatingText {
    constructor(x, y, text, color) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.life = 60; // 1 second lifespan
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

// --- Parallax Background Class ---
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

        if (level === 1) {
            // Level 1: College Corridor (Blueprint Purple Gradient)
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            grad.addColorStop(0, '#12122b');
            grad.addColorStop(1, '#080816');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            // Draw floating blackboard layers in parallax with custom chalk doodles!
            ctx.strokeStyle = '#5c4033'; // wood frame
            ctx.lineWidth = 3;
            for (let i = 0; i < 4; i++) {
                let bx = 120 + i * 500 - (scrollX * 0.25) % 2000;
                ctx.fillStyle = '#103020'; // chalkboard green
                ctx.fillRect(bx, 60, 160, 90);
                ctx.strokeRect(bx, 60, 160, 90);
                
                // Chalk formulas
                ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
                ctx.font = '6px "Press Start 2P"';
                if (i === 0) {
                    ctx.fillText("CHEM 101: LOV-3", bx + 10, 85);
                    ctx.fillText("Rahul+Notes=💔", bx + 10, 110);
                    ctx.fillText("Chad+Gym=Priya", bx + 10, 125);
                } else if (i === 1) {
                    ctx.fillText("MATHS 202: PROB", bx + 10, 85);
                    ctx.fillText("P(Priya loves T)=0", bx + 10, 110);
                    ctx.fillText("P(Priya loves H)=1", bx + 10, 125);
                } else if (i === 2) {
                    ctx.fillText("BIOLOGY: HEARTS", bx + 10, 85);
                    ctx.fillText("Rahul = Friend", bx + 10, 110);
                    ctx.fillText("Chad = Chad", bx + 10, 125);
                } else {
                    ctx.fillText("EXAM TIME TABLE", bx + 10, 85);
                    ctx.fillText("Simping = FAIL", bx + 10, 110);
                    ctx.fillText("Gains = PASS", bx + 10, 125);
                }
            }

            // Drawn lines to look like graph paper college notes
            ctx.strokeStyle = 'rgba(51, 204, 255, 0.05)';
            ctx.lineWidth = 1;
            for (let x = 0; x < GAME_WIDTH; x += 30) {
                ctx.beginPath();
                ctx.moveTo(x - (scrollX * 0.1) % 30, 0);
                ctx.lineTo(x - (scrollX * 0.1) % 30, GAME_HEIGHT);
                ctx.stroke();
            }

        } else if (level === 2) {
            // Level 2: Neon Gym Cafe (Dark Tech Blue / Magenta glow)
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            grad.addColorStop(0, '#0a0518');
            grad.addColorStop(1, '#020005');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            // Parallax Neon Lines/Gym Frames
            ctx.strokeStyle = 'rgba(255, 51, 102, 0.06)';
            ctx.lineWidth = 4;
            for (let i = 0; i < 5; i++) {
                ctx.strokeRect(50 + i * 280 - (scrollX * 0.3) % 1000, 80, 120, 240);
            }

            // Neon glowing gym signs in background
            ctx.font = '8px "Press Start 2P"';
            for (let i = 0; i < 3; i++) {
                let sx = 200 + i * 650 - (scrollX * 0.25) % 1950;
                ctx.save();
                if (i === 0) {
                    ctx.fillStyle = '#ff3366';
                    ctx.shadowColor = '#ff3366';
                    ctx.shadowBlur = 8;
                    ctx.fillText("NO SIMPING, ONLY LIFTING!", sx, 60);
                } else if (i === 1) {
                    ctx.fillStyle = '#33ccff';
                    ctx.shadowColor = '#33ccff';
                    ctx.shadowBlur = 8;
                    ctx.fillText("CHAD'S CAFE: 100% GAINS", sx, 100);
                } else {
                    ctx.fillStyle = '#9933ff';
                    ctx.shadowColor = '#9933ff';
                    ctx.shadowBlur = 8;
                    ctx.fillText("GYM BRO ZONE", sx, 70);
                }
                ctx.restore();
            }
        } else {
            // Level 3: Sunset Graduation Castle (Rich Orange / Violet Sunset)
            let grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
            grad.addColorStop(0, '#2e1137');
            grad.addColorStop(0.5, '#721b47');
            grad.addColorStop(1, '#f87060');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

            // Stars fading out in the sunset
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.stars.forEach(star => {
                ctx.fillRect(star.x - (scrollX * 0.05) % GAME_WIDTH, star.y, star.size, star.size);
            });

            // Parallax Castle towers in distance
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
        { name: "Rahul", text: "But these floating platforms and college hallways are full of failing grades and alarm clocks. Let's start jumping!" }
    ],
    L1_END: [
        { name: "Rahul", text: "Priya! I did it! I collected all the missing notes for you!" },
        { name: "Priya", text: "Oh Rahul! You literally compiled all these chemistry sheets? That's so cute!" },
        { name: "Priya", text: "You are literally the sweetest, most helpful friend ever. Meet me at the Cafe near the gym later, I have a special surprise for you!" },
        { name: "Rahul", text: "A surprise?! She must really like me! I'm on my way!" }
    ],
    L2_START: [
        { name: "Rahul", text: "I've arrived at the Gym Cafe. But wait... why are there dumbbells bouncing everywhere? And where is Priya?" }
    ],
    L2_END: [
        { name: "Rahul", text: "Priya! I'm here! What was the surprise?" },
        { name: "Priya", text: "Hey Rahul! Meet my gym partner, Chad! He's so cool!" },
        { name: "Chad", text: "Yo, Rahul! Priya told me you make awesome homework notes. Pretty neat hobby, little bro. Let's see some gains!" },
        { name: "Priya", text: "Yeah Rahul! You're honestly like a brother to me. We are hosting our post-exam celebration party at the Grand Castle. You MUST come!" },
        { name: "Rahul", text: "Brother?! Gym partner?! Ouch... but wait, she invited me to the Grand Castle. There's still a chance! I will go to the castle!" }
    ],
    L3_START: [
        { name: "Rahul", text: "This is it. The Grand Castle. Priya is waiting, but Chad is guarding the entrance! I must get past him." }
    ],
    L3_END: [
        { name: "Rahul", text: "Priya! I defeated Chad and brought the final exam leak notes! We can study together forever!" },
        { name: "Priya", text: "Oh my god, Rahul! Chad! Are you hurt?!" },
        { name: "Chad", text: "Ugh... my muscles... they're bruised..." },
        { name: "Priya", text: "How could you be so mean, Rahul? Chad didn't do anything! But thanks for the final exam notes, Chad and I really needed them to pass." },
        { name: "Priya", text: "Since you helped us pass, you're officially invited to be the Best Man at our wedding next week!" },
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
        this.background = new ParallaxBackground();
        this.floatingTexts = [];
        this.springboards = [];
        this.rosePetals = [];

        // Dialogue variables
        this.currentDialogueList = [];
        this.dialogueIndex = 0;
        this.dialogueCallback = null;

        this.levelWidths = [1800, 2000, 1600];
    }

    init() {
        setupTouchEvents();
        
        document.getElementById('start-btn').addEventListener('click', () => {
            sounds.init();
            this.startGame();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            sounds.init();
            this.restartGame();
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            sounds.init();
            this.resetToMenu();
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

    startGame() {
        debugLog("startGame() triggered");
        sounds.clearSadSong();
        const menu = document.getElementById('menu-screen');
        menu.classList.add('hidden');
        menu.classList.remove('active');
        document.getElementById('hud').classList.remove('hidden');
        this.level = 1;
        this.hope = 100;
        this.loadLevel(1);
    }

    restartGame() {
        sounds.clearSadSong();
        const gameOverScreen = document.getElementById('game-over-screen');
        gameOverScreen.classList.add('hidden');
        gameOverScreen.classList.remove('active');
        this.hope = 100;
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
