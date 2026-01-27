# Retro 2D Space Shooter - Game Specification

## Overview
A classic vertical-scrolling space shooter built with Phaser 3, featuring power-ups and epic boss battles.

## Core Requirements

### Technical
- **Framework**: Phaser 3
- **Platform**: Web Browser (Desktop focus, responsive design)
- **Resolution**: 800x600 pixels (scaled to fit browser)
- **Performance**: 60 FPS target

### Gameplay
- **Genre**: Classic vertical scrolling shooter
- **Player**: Single ship controlled with keyboard (arrow keys / WASD)
- **Objective**: Survive waves of enemies, defeat bosses, maximize score
- **Difficulty**: Progressive difficulty increase over time

### Core Mechanics
1. **Player Movement**: 8-directional movement, confined to screen bounds
2. **Shooting**: Auto-fire or hold spacebar to shoot
3. **Enemies**: Multiple types with different movement patterns
4. **Collision Detection**:
   - Player hit by enemy/projectile = lose life
   - Enemy hit by player projectile = destroyed
   - Collision with meteors = damage
5. **Power-ups**: Temporary upgrades (shield, rapid fire, spread shot)
6. **Boss Battles**: Special encounters every 3-5 waves
7. **Lives System**: 3 lives, game over when all lost
8. **Scoring**: Points for destroying enemies and collecting power-ups

## Asset Directory

### Player Ships
- [playerShip1_blue.png](kenney_space-shooter-redux/PNG/playerShip1_blue.png)
- [playerShip1_green.png](kenney_space-shooter-redux/PNG/playerShip1_green.png)
- [playerShip1_orange.png](kenney_space-shooter-redux/PNG/playerShip1_orange.png)
- [playerShip1_red.png](kenney_space-shooter-redux/PNG/playerShip1_red.png)
- [playerShip2_blue.png](kenney_space-shooter-redux/PNG/playerShip2_blue.png)
- [playerShip2_green.png](kenney_space-shooter-redux/PNG/playerShip2_green.png)
- [playerShip2_orange.png](kenney_space-shooter-redux/PNG/playerShip2_orange.png)
- [playerShip2_red.png](kenney_space-shooter-redux/PNG/playerShip2_red.png)
- [playerShip3_blue.png](kenney_space-shooter-redux/PNG/playerShip3_blue.png)
- [playerShip3_green.png](kenney_space-shooter-redux/PNG/playerShip3_green.png)
- [playerShip3_orange.png](kenney_space-shooter-redux/PNG/playerShip3_orange.png)
- [playerShip3_red.png](kenney_space-shooter-redux/PNG/playerShip3_red.png)

**Primary Player Ship**: playerShip1_blue.png

### Enemy Ships
**Black Enemies** (Use for regular waves):
- [enemyBlack1.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlack1.png) - Small fighter
- [enemyBlack2.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlack2.png) - Medium fighter
- [enemyBlack3.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlack3.png) - Bomber
- [enemyBlack4.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlack4.png) - Heavy fighter
- [enemyBlack5.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlack5.png) - Interceptor

**Blue Enemies**:
- [enemyBlue1.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlue1.png)
- [enemyBlue2.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlue2.png)
- [enemyBlue3.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlue3.png)
- [enemyBlue4.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlue4.png)
- [enemyBlue5.png](kenney_space-shooter-redux/PNG/Enemies/enemyBlue5.png)

**Green Enemies**:
- [enemyGreen1.png](kenney_space-shooter-redux/PNG/Enemies/enemyGreen1.png)
- [enemyGreen2.png](kenney_space-shooter-redux/PNG/Enemies/enemyGreen2.png)
- [enemyGreen3.png](kenney_space-shooter-redux/PNG/Enemies/enemyGreen3.png)
- [enemyGreen4.png](kenney_space-shooter-redux/PNG/Enemies/enemyGreen4.png)
- [enemyGreen5.png](kenney_space-shooter-redux/PNG/Enemies/enemyGreen5.png)

**Red Enemies** (Use for elite/boss support):
- [enemyRed1.png](kenney_space-shooter-redux/PNG/Enemies/enemyRed1.png)
- [enemyRed2.png](kenney_space-shooter-redux/PNG/Enemies/enemyRed2.png)
- [enemyRed3.png](kenney_space-shooter-redux/PNG/Enemies/enemyRed3.png)
- [enemyRed4.png](kenney_space-shooter-redux/PNG/Enemies/enemyRed4.png)
- [enemyRed5.png](kenney_space-shooter-redux/PNG/Enemies/enemyRed5.png)

### UFOs (Boss Enemies)
- [ufoBlue.png](kenney_space-shooter-redux/PNG/ufoBlue.png)
- [ufoGreen.png](kenney_space-shooter-redux/PNG/ufoGreen.png)
- [ufoRed.png](kenney_space-shooter-redux/PNG/ufoRed.png) - **Final Boss**
- [ufoYellow.png](kenney_space-shooter-redux/PNG/ufoYellow.png)

### Projectiles
**Player Lasers** (Blue):
- [laserBlue01.png](kenney_space-shooter-redux/PNG/Lasers/laserBlue01.png) - Thin beam
- [laserBlue02.png](kenney_space-shooter-redux/PNG/Lasers/laserBlue02.png) - Medium beam
- [laserBlue03.png](kenney_space-shooter-redux/PNG/Lasers/laserBlue03.png) - Thick beam
- [laserBlue08.png](kenney_space-shooter-redux/PNG/Lasers/laserBlue08.png) - Bullet
- [laserBlue09.png](kenney_space-shooter-redux/PNG/Lasers/laserBlue09.png) - Bolt

**Enemy Lasers** (Red/Green):
- [laserRed01.png](kenney_space-shooter-redux/PNG/Lasers/laserRed01.png)
- [laserRed08.png](kenney_space-shooter-redux/PNG/Lasers/laserRed08.png)
- [laserGreen01.png](kenney_space-shooter-redux/PNG/Lasers/laserGreen01.png)
- [laserGreen08.png](kenney_space-shooter-redux/PNG/Lasers/laserGreen08.png)

### Meteors/Obstacles
**Brown Meteors**:
- [meteorBrown_big1.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_big1.png)
- [meteorBrown_big2.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_big2.png)
- [meteorBrown_big3.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_big3.png)
- [meteorBrown_big4.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_big4.png)
- [meteorBrown_med1.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_med1.png)
- [meteorBrown_small1.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_small1.png)
- [meteorBrown_small2.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_small2.png)
- [meteorBrown_tiny1.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_tiny1.png)
- [meteorBrown_tiny2.png](kenney_space-shooter-redux/PNG/Meteors/meteorBrown_tiny2.png)

**Grey Meteors**:
- [meteorGrey_big1.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_big1.png)
- [meteorGrey_big2.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_big2.png)
- [meteorGrey_med1.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_med1.png)
- [meteorGrey_med2.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_med2.png)
- [meteorGrey_small1.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_small1.png)
- [meteorGrey_small2.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_small2.png)
- [meteorGrey_tiny1.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_tiny1.png)
- [meteorGrey_tiny2.png](kenney_space-shooter-redux/PNG/Meteors/meteorGrey_tiny2.png)

### Effects
**Explosions** (Animation frames):
- [fire00.png](kenney_space-shooter-redux/PNG/Effects/fire00.png)
- [fire01.png](kenney_space-shooter-redux/PNG/Effects/fire01.png)
- [fire02.png](kenney_space-shooter-redux/PNG/Effects/fire02.png)
- [fire03.png](kenney_space-shooter-redux/PNG/Effects/fire03.png)
- [fire04.png](kenney_space-shooter-redux/PNG/Effects/fire04.png)
- [fire05.png](kenney_space-shooter-redux/PNG/Effects/fire05.png)
- [fire06.png](kenney_space-shooter-redux/PNG/Effects/fire06.png)
- [fire07.png](kenney_space-shooter-redux/PNG/Effects/fire07.png)
- [fire08.png](kenney_space-shooter-redux/PNG/Effects/fire08.png)
- [fire09.png](kenney_space-shooter-redux/PNG/Effects/fire09.png)
- [fire10.png](kenney_space-shooter-redux/PNG/Effects/fire10.png)
- [fire11.png](kenney_space-shooter-redux/PNG/Effects/fire11.png)
- [fire12.png](kenney_space-shooter-redux/PNG/Effects/fire12.png)
- [fire13.png](kenney_space-shooter-redux/PNG/Effects/fire13.png)
- [fire14.png](kenney_space-shooter-redux/PNG/Effects/fire14.png)

### Power-ups
**Shield Power-ups**:
- [powerupBlue_shield.png](kenney_space-shooter-redux/PNG/Power-ups/powerupBlue_shield.png) - Shield (5 seconds invincibility)
- [shield_bronze.png](kenney_space-shooter-redux/PNG/Power-ups/shield_bronze.png)
- [shield_silver.png](kenney_space-shooter-redux/PNG/Power-ups/shield_silver.png)
- [shield_gold.png](kenney_space-shooter-redux/PNG/Power-ups/shield_gold.png)

**Weapon Power-ups**:
- [powerupRed_bolt.png](kenney_space-shooter-redux/PNG/Power-ups/powerupRed_bolt.png) - Rapid Fire
- [bolt_bronze.png](kenney_space-shooter-redux/PNG/Power-ups/bolt_bronze.png)
- [bolt_gold.png](kenney_space-shooter-redux/PNG/Power-ups/bolt_gold.png)

**Special Power-ups**:
- [powerupGreen_star.png](kenney_space-shooter-redux/PNG/Power-ups/powerupGreen_star.png) - Spread Shot (3-way fire)
- [star_bronze.png](kenney_space-shooter-redux/PNG/Power-ups/star_bronze.png)
- [star_silver.png](kenney_space-shooter-redux/PNG/Power-ups/star_silver.png)
- [star_gold.png](kenney_space-shooter-redux/PNG/Power-ups/star_gold.png)

**Health Power-ups**:
- [pill_red.png](kenney_space-shooter-redux/PNG/Power-ups/pill_red.png) - Extra Life
- [pill_green.png](kenney_space-shooter-redux/PNG/Power-ups/pill_green.png)
- [pill_blue.png](kenney_space-shooter-redux/PNG/Power-ups/pill_blue.png)

### UI Elements
**Life Indicators**:
- [playerLife1_blue.png](kenney_space-shooter-redux/PNG/UI/playerLife1_blue.png)
- [playerLife2_blue.png](kenney_space-shooter-redux/PNG/UI/playerLife2_blue.png)
- [playerLife3_blue.png](kenney_space-shooter-redux/PNG/UI/playerLife3_blue.png)

**Numerals** (for score display):
- [numeral0.png](kenney_space-shooter-redux/PNG/UI/numeral0.png)
- [numeral1.png](kenney_space-shooter-redux/PNG/UI/numeral1.png)
- [numeral2.png](kenney_space-shooter-redux/PNG/UI/numeral2.png)
- [numeral3.png](kenney_space-shooter-redux/PNG/UI/numeral3.png)
- [numeral4.png](kenney_space-shooter-redux/PNG/UI/numeral4.png)
- [numeral5.png](kenney_space-shooter-redux/PNG/UI/numeral5.png)
- [numeral6.png](kenney_space-shooter-redux/PNG/UI/numeral6.png)
- [numeral7.png](kenney_space-shooter-redux/PNG/UI/numeral7.png)
- [numeral8.png](kenney_space-shooter-redux/PNG/UI/numeral8.png)
- [numeral9.png](kenney_space-shooter-redux/PNG/UI/numeral9.png)
- [numeralX.png](kenney_space-shooter-redux/PNG/UI/numeralX.png)

**Buttons**:
- [buttonBlue.png](kenney_space-shooter-redux/PNG/UI/buttonBlue.png)
- [buttonGreen.png](kenney_space-shooter-redux/PNG/UI/buttonGreen.png)
- [buttonRed.png](kenney_space-shooter-redux/PNG/UI/buttonRed.png)

### Backgrounds
- [black.png](kenney_space-shooter-redux/Backgrounds/black.png) - **Primary Background**
- [blue.png](kenney_space-shooter-redux/Backgrounds/blue.png)
- [darkPurple.png](kenney_space-shooter-redux/Backgrounds/darkPurple.png)
- [purple.png](kenney_space-shooter-redux/Backgrounds/purple.png)

### Audio
- [sfx_laser1.ogg](kenney_space-shooter-redux/Bonus/sfx_laser1.ogg) - Player shoot
- [sfx_laser2.ogg](kenney_space-shooter-redux/Bonus/sfx_laser2.ogg) - Enemy shoot
- [sfx_zap.ogg](kenney_space-shooter-redux/Bonus/sfx_zap.ogg) - Explosion
- [sfx_shieldUp.ogg](kenney_space-shooter-redux/Bonus/sfx_shieldUp.ogg) - Power-up collected
- [sfx_shieldDown.ogg](kenney_space-shooter-redux/Bonus/sfx_shieldDown.ogg) - Hit damage
- [sfx_lose.ogg](kenney_space-shooter-redux/Bonus/sfx_lose.ogg) - Game over
- [sfx_twoTone.ogg](kenney_space-shooter-redux/Bonus/sfx_twoTone.ogg) - UI feedback

### Fonts
- [kenvector_future.ttf](kenney_space-shooter-redux/Bonus/kenvector_future.ttf)
- [kenvector_future_thin.ttf](kenney_space-shooter-redux/Bonus/kenvector_future_thin.ttf)

---

## Development Milestones

## Milestone 1: Core Playable Game (MVP)
**Goal**: Basic vertical shooter with player movement, shooting, and enemies.

### Features
- [x] Phaser 3 project setup with proper file structure
- [x] Game canvas (800x600) with black space background
- [x] Player ship spawns at bottom center
- [x] Player movement with arrow keys/WASD (8-directional)
- [x] Player constrained to screen bounds
- [x] Shooting mechanic (spacebar or auto-fire)
- [x] Player projectiles move upward and despawn off-screen
- [x] Basic enemy spawning (enemyBlack1-3 only)
- [x] Enemies move downward at constant speed
- [x] Enemy projectiles shoot downward occasionally
- [x] Collision detection:
  - Player bullet + enemy = enemy destroyed
  - Player + enemy = player loses life
  - Player + enemy bullet = player loses life
- [x] Basic lives system (3 lives, display as icons)
- [x] Game Over state when lives = 0
- [x] Simple score display (text, no fancy UI yet)

### Deliverable
A playable game where you can:
- Move the ship around
- Shoot at enemies
- Destroy enemies for points
- Die when hit (3 lives)
- See "Game Over" when all lives lost
- Press a key to restart

### Files to Create
- `index.html` - Main HTML file
- `src/main.js` - Phaser game initialization
- `src/scenes/GameScene.js` - Main gameplay scene
- `src/scenes/GameOverScene.js` - Game over screen
- `src/config.js` - Phaser configuration
- Basic CSS for styling

---

## Milestone 2: Enhanced Gameplay
**Goal**: Add meteors, power-ups, visual effects, and game juice.

### Features
- [x] **Meteors**:
  - Spawn meteors (big, medium, small) from top
  - Meteors rotate as they fall
  - Colliding with meteors damages player
  - Shooting meteors destroys them (worth points)
  - Meteors move at varying speeds
- [x] **Power-up System**:
  - Power-ups drop from destroyed enemies (10% chance)
  - Shield power-up (blue shield icon) - 5 seconds invincibility
  - Rapid Fire power-up (red bolt) - 2x fire rate for 8 seconds
  - Spread Shot power-up (green star) - 3-way shooting for 10 seconds
  - Visual indicator when power-up is active
- [x] **Visual Effects**:
  - Explosion animations when enemies/meteors destroyed
  - Screen shake on player hit
  - Particle effects for projectiles
  - Engine trail for player ship
- [x] **Wave System**:
  - Enemies spawn in waves (5-10 enemies per wave)
  - Brief pause between waves
  - "Wave X" text display
  - Difficulty increases each wave (more enemies, faster speed)
- [x] **UI Improvements**:
  - Score displayed with custom font or styled text
  - Lives shown as ship icons
  - Power-up timer bars
  - Wave counter
- [x] **Scrolling Background**:
  - Starfield scrolls downward for movement effect
  - Optional parallax layers

### Deliverable
A more engaging game with:
- Visual polish and effects
- Power-ups that change gameplay
- Wave-based progression
- Meteors as obstacles
- Screen shake and particles

### Files to Add/Modify
- `src/entities/Meteor.js` - Meteor game object
- `src/entities/PowerUp.js` - Power-up game object
- `src/managers/WaveManager.js` - Wave spawning logic
- `src/effects/Explosion.js` - Explosion effect
- `src/ui/HUD.js` - Heads-up display
- Modify `GameScene.js` to integrate new features

---

## Milestone 3: Boss Battles & Polish
**Goal**: Add epic boss encounters and final gameplay polish.

### Features
- [x] **Boss Battle System**:
  - Boss appears after every 3 waves
  - Use UFO sprites (ufoBlue, ufoGreen, ufoRed)
  - Boss health bar at top of screen
  - Boss movement patterns:
    - Horizontal movement across screen
    - Occasional dive attacks
    - Circular/figure-8 patterns
  - Boss attacks:
    - Spreads of bullets
    - Aimed shots at player
    - Spawns support enemies (red enemies)
  - Boss has 3 phases (changes pattern at 66% and 33% health)
  - Victory animation when boss defeated
  - Bonus points and guaranteed power-up drop
- [x] **Enemy AI Improvements**:
  - Some enemies move in sine waves
  - Some enemies dive at player
  - Elite enemies (red) have more health and shoot more
  - Enemy formations (V-shape, line, swarm)
- [x] **Advanced Power-ups**:
  - Extra Life power-up (pill_red)
  - Score multiplier (x2 for 15 seconds)
  - Smart bomb (clears screen)
- [x] **Polish & Juice**:
  - Title screen with "Start Game" button
  - Pause functionality (ESC key)
  - Audio system with sound effects
  - Music (can be added via external audio or muted)
  - Combo system (destroy enemies rapidly for bonus)
  - Screen flash effects for boss entry
  - Damage indicators (flash ship red when hit)
- [x] **Difficulty Curve**:
  - Progressive speed increases
  - More enemies per wave over time
  - Enemy shoot rate increases
  - Meteor frequency increases
- [x] **Game States**:
  - Menu Scene (start, instructions)
  - Game Scene (main gameplay)
  - Pause Scene (overlay)
  - Game Over Scene (show final score)
  - Victory Scene (if player survives 10 waves + 3 bosses)

### Deliverable
A complete, polished game with:
- Epic boss battles with multiple phases
- Title screen and menus
- Sound effects
- Pause functionality
- Victory condition
- Highly replayable gameplay loop

### Files to Add/Modify
- `src/entities/Boss.js` - Boss enemy class
- `src/scenes/MenuScene.js` - Title screen
- `src/scenes/PauseScene.js` - Pause overlay
- `src/scenes/VictoryScene.js` - Victory screen
- `src/managers/AudioManager.js` - Sound management
- `src/managers/DifficultyManager.js` - Difficulty scaling
- `src/ai/EnemyAI.js` - Enemy movement patterns
- `src/effects/ScreenEffects.js` - Flash, shake, etc.
- Polish all existing files

---

## Technical Architecture

### Project Structure
```
2026Q1_2DGame/
├── index.html
├── assets/
│   └── kenney_space-shooter-redux/
├── src/
│   ├── main.js
│   ├── config.js
│   ├── scenes/
│   │   ├── MenuScene.js
│   │   ├── GameScene.js
│   │   ├── PauseScene.js
│   │   ├── GameOverScene.js
│   │   └── VictoryScene.js
│   ├── entities/
│   │   ├── Player.js
│   │   ├── Enemy.js
│   │   ├── Boss.js
│   │   ├── Meteor.js
│   │   ├── PowerUp.js
│   │   └── Projectile.js
│   ├── managers/
│   │   ├── WaveManager.js
│   │   ├── AudioManager.js
│   │   └── DifficultyManager.js
│   ├── ai/
│   │   └── EnemyAI.js
│   ├── effects/
│   │   ├── Explosion.js
│   │   └── ScreenEffects.js
│   └── ui/
│       └── HUD.js
└── styles/
    └── main.css
```

### Key Design Patterns
- **Entity-Component**: Use Phaser's GameObject system
- **Object Pooling**: Reuse projectiles and enemies for performance
- **Event System**: Use Phaser events for decoupling (boss defeated, wave complete, etc.)
- **State Machine**: For boss phases and game states

---

## Controls
- **Arrow Keys / WASD**: Move ship
- **Spacebar**: Shoot (if not auto-fire)
- **ESC**: Pause game
- **Enter**: Start game / Restart after game over

---

## Success Criteria
- Smooth 60 FPS gameplay
- Responsive controls
- Clear visual feedback for all actions
- Balanced difficulty curve
- Fun and replayable
- Each milestone is fully playable and testable
