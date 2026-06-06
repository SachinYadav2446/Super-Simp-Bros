# Super Simp Bros: The Simp Quest

Super Simp Bros is an immersive, retro-inspired 2D browser platformer game that parodies love, university exams, and gym culture. Play as Rahul, a studious romantic on a quest to deliver his meticulously written study notes to his crush, Priya, while avoiding gym-themed obstacles and confronting the ultimate rival: Chad, the muscular gym boss.

---

## 🎮 The Story

* **Level 1: The College Corridors**: Rahul stayed up all night compiling the ultimate Chemistry notes. Priya needs them for tomorrow's exam. Navigate desks and blackboards to deliver the notes, dodging bad grades and alarm clocks along the way.
* **Level 2: The Gym Cafe**: Priya invites Rahul to a cafe near the gym, giving him hope. However, when he arrives, he finds the cafe overrun with bouncing dumbbells and discovers Priya is hanging out with her gym partner, Chad. Collect calculations notes while dodging workout equipment.
* **Level 3: The Grand Castle**: Priya invites Rahul to her post-exam celebration party at the Grand Castle. When Rahul arrives, Chad is guarding the entrance. Defeat Chad by landing on the red exam switches to drop stacks of study guides onto his head.
* **The Tragic Ending**: Once Chad is defeated, Rahul rushes to Priya to confess his feelings. Priya thanks him for the final exam leak notes (which she and Chad needed to pass), invites Rahul to be the **Best Man** at her and Chad's wedding, and speeds off in a sports car. The game ends in a dark bedroom where Rahul lies on his bed in despair with a beer bottle, while a melancholic, synthesized melody of **"Channa Mereya"** (*"Accha chalta hoon, duaon mein yaad rakhna..."*) plays from his speaker.

---

## 🚀 Key Features

* **HTML5 Canvas Game Loop**: Custom rendering pipeline built on raw Canvas API, featuring state updates, 60FPS animations, camera positioning, and bounding-box collision detection.
* **Web Audio API Synth**: Sound effects (jumping, item collecting, damage) and background melodies are synthesized programmatically on the fly. No external audio files required.
* **Responsive Multi-Device Controls**: Compatible with both laptop/desktop keyboards and mobile devices via retro touch gamepads.
* **Dynamic, Non-Scrollable Layout**: Scaled using responsive aspect-ratio boundaries (`16:9`) and height-aware CSS viewport calc variables (`max-height: calc(100vh - 175px)`). The game fits perfectly inside the screen height without showing scrollbars on any device.
* **Interactive Springboards**: Physics-integrated springboard textbook stacks that launch the player high in the air to reach elevated platforms.
* **Immersive Fullscreen Bezel Mode**: Supports HTML5 Fullscreen API with clean layout scaling and letterboxing (black bezels) to preserve graphics proportions on wide monitors.

---

## 🕹️ Controls Guide

### PC / Laptop Keyboard
* **Move Left**: `A` or `Left Arrow`
* **Move Right**: `D` or `Right Arrow`
* **Jump**: `Space`, `W`, or `Up Arrow`
* **Interact**: `E`

### Mobile Touchscreen
* **Left D-Pad Button**: Move Left
* **Right D-Pad Button**: Move Right
* **Jump Button**: Jump

---

## 📂 Project Architecture

```bash
├── index.html       # DOM elements, CRT overlay, touch controllers, version control
├── style.css        # Glassmorphism cards, fullscreen canvas scale, non-scrollable fits
├── game.js          # Physics, Synthesizer, level layouts, bedroom ending, game loop
├── package.json     # Node scripts for local dev server
└── README.md        # Project documentation
```

---

## ⚡ Quick Start & Installation

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed:

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
