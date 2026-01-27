# Retro Space Shooter

A classic vertical scrolling space shooter game built with Phaser 3. First attempt to vibe code a 2D game using Claude Code.

## Features

### Core Gameplay
- **Wave-based enemy spawning** with increasing difficulty
- **Boss battles every 3rd wave** with multi-phase combat mechanics
- **Power-up system**: Shield, Rapid Fire, and Spread Shot
- **Meteor obstacles** with health-based destruction
- **Score tracking** and lives system
- **Animated explosion effects**
- **Pause functionality** (ESC key)
- **Game over scene** with final score display

### Boss Mechanics
- Scaled health per boss encounter (10hp, 20hp, 30hp, etc.)
- Three combat phases with increasing speed and attack patterns
- Randomized movement patterns for unpredictability
- **Phase 1**: Single laser shot
- **Phase 2**: Triple spread shot with sine wave movement
- **Phase 3**: Five-way spread + support enemies

## Technical Implementation

### Architecture
- Clean separation of concerns with dedicated managers, UI, entities, and scenes
- **Managers**: WaveManager for enemy spawning and wave progression
- **UI**: HUD for score, lives, and wave display
- **Entities**: Boss, Meteor, PowerUp with custom behaviors
- **Scenes**: Menu, Game, Pause, GameOver

### Technologies
- **Phaser 3** Arcade Physics engine
- Proper collision handling with texture-based object identification
- Deferred destruction pattern to avoid physics callback issues
- Randomized power-up spawning to prevent overlapping

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Controls

- **Arrow Keys / WASD**: Move player ship
- **Space**: Fire lasers (auto-fire)
- **ESC**: Pause game

## Credits

- **Graphics**: [Kenney Space Shooter Redux](https://kenney.nl/)
- **Built with**: Claude Code
- **Game Engine**: Phaser 3
