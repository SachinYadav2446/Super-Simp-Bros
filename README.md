# Super Simp Bros: The Simp Quest

Super Simp Bros is an immersive, retro-inspired 2D browser platformer game that parodies love, university exams, and gym culture. Take on a scaled-up campaign across **10 unique levels**, select between **3 distinct playable characters** with customized physics, choose from **protagonist skins**, and test your skills across **3 difficulty settings** (including the dreaded *Simp Nightmare*).

---

## 🎮 The Story & Levels

Follow Rahul, the ultimate studious romantic, as he tries to win over his college crush, Priya, while dodging his gym rival, Chad, and avoiding the eagle eyes of Professor Verma.

1. **Level 1: Library Midnight Oil**: Rahul stays up all night writing chemistry notes for Priya. Dodge bookshelves and library obstacles to compile the Ultimate Chemistry package.
2. **Level 2: The Hallway Hustle**: Morning of the exam. The corridors are packed. Sprint through locker hallways to find Priya before class starts and grab the Math notes.
3. **Level 3: Gym Cafe Intercept**: Priya invites Rahul to a cafe near the gym, but Chad is there flexing. Dodge GymBros and collect gym shakers.
4. **Level 4: Protein Shake Pit**: Chad challenges Rahul's gains. Avoid falling dumbbells dropped from the gym weightlifting floor while collecting Diet Plans.
5. **Level 5: Exam Hall Patrol**: Midterms are here! Slide exam cheats to Priya while dodging the patrolling, strict Professor Verma.
6. **Level 6: Cafe Coffee Gossip**: A study coffee date at a cozy retro house is crashed by Chad and his gym crew. Collect the Cafe Chat logs.
7. **Level 7: Sunset Park Chase**: Priya asks Rahul to carry all her heavy shopping bags during a walk at sunset. Handle tricky jumps with heavy weight.
8. **Level 8: Library Lockdown**: Locked inside the dark library overnight. Evade the security guards and their flashlight beams to find the Key Guides.
9. **Level 9: Castle Prom Gates**: Graduation Prom night! Priya is attending with Chad. Gatecrash the prom gates by collecting tickets and dodging security.
10. **Level 10: Graduation Standoff**: Climax boss battle! Confront Chad on the wedding stage. Hit the notes switches to drop giant folders on Chad, while dodging his flying wedding cakes.

### 💔 The Tragic Ending
Even if you win, reality strikes. Priya thanks Rahul for the notes that helped her and Chad pass exams, invites Rahul to be the **Best Man** at their graduation wedding, and heads off with Chad. Rahul is left lying on his bedroom bed in despair, clutching a beer bottle, while a melancholic, synthesized chiptune version of **"Channa Mereya"** plays from his speakers.

---

## 👥 Playable Characters

Select your character from the startup menu, each with specialized physics parameters:

*   **Rahul (The Scholar)**: Balanced stats (`speed = 3.6`, `jumpForce = -12.0`, `gravity = 0.6`).
    *   *Skins*: Choose between **Casual** (hoodie), **Gym Vest** (buff flexing arms), and **Formal Suit** (exam blazer & red tie).
*   **Priya (The Popular Crush)**: Floaty movement (`speed = 3.2`, `jumpForce = -13.5`, `gravity = 0.45`). Surrounded by floating heart particles.
*   **Chad (The Gym Bro)**: Fast sprint but heavy fast fall (`speed = 4.2`, `jumpForce = -10.5`, `gravity = 0.75`).

---

## ⚙️ Difficulty Settings

*   **Easy**: Start with `100%` Hope. Lose only `10%` Hope on damage. Projectiles travel slower.
*   **Normal**: Start with `100%` Hope. Lose `20%` Hope on damage. Standard projectile speeds.
*   **Simp Nightmare (Hard)**: Start with only `60%` Hope. Lose `30%` Hope on damage (2 hits and game over). Projectiles travel faster, and **springboard textbook stacks are disabled**!

---

## 🚀 Key Features

*   **HTML5 Canvas Game Loop**: 60FPS physics updates, horizontal scrolling cameras, and AABB collision resolution.
*   **Web Audio API Synth**: Programmatic chiptune sound effects (jump, collect, hit, victory) and background music (Channa Mereya tragic anthem).
*   **Aesthetic UI**: A premium glassmorphic UI with micro-animations, CRT filters, layout stats, character description portraits, and dynamic selection chips.
*   **Responsive Control System**: Full keyboard mapping for desktop/laptop and virtual touch gamepad for mobile devices.
*   **Strict Viewport Constraints**: Fits within screen limits (`max-height: calc(100vh - 175px)`). The game viewport is completely non-scrollable.

---

## 🕹️ Controls Guide

### Keyboard Controls
*   **Move Left**: `A` or `Left Arrow`
*   **Move Right**: `D` or `Right Arrow`
*   **Jump**: `Space`, `W`, or `Up Arrow`
*   **Dialogue Skip/Continue**: `Space` or Click screen

### Mobile Gamepad
*   **◀ / ▶ Buttons**: Move Left / Right
*   **JUMP**: Boost Jump
*   **Tap screen**: Advance dialogue

---

## 📂 Project Structure

```bash
├── index.html       # DOM elements, characters selection, HUD, CRT glare
├── style.css        # Glassmorphic layout, active chips, stat bars, animations
├── game.js          # Physics classes (Player, Priya, Chad, Verma, Guard, etc.), 10 levels, Web Audio synth
├── package.json     # Node scripts for local dev server
└── README.md        # Detailed documentation
```

---

## ⚡ Quick Start & Installation

To run this project locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/SachinYadav2446/Super-Simp-Bros.git
   cd Super-Simp-Bros
   ```

2. **Install Dev Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Local Web Server**:
   ```bash
   npm run dev
   ```

4. **Play the Game**:
   Open your browser and navigate to:
   👉 **`http://localhost:3000`**
