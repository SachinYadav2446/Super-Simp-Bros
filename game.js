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
