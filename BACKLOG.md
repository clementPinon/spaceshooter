# Development Backlog

## Future Features

### Gameplay Enhancements
- [ ] Add more enemy types with unique behaviors
- [ ] Implement combo system for consecutive kills
- [ ] Add boss variety with different attack patterns
- [ ] Create mini-boss encounters between regular bosses
- [ ] Add weapon upgrades beyond power-ups (e.g., homing missiles, bomb)
- [ ] Implement difficulty levels (Easy, Normal, Hard)
- [ ] Add achievements/milestones system
- [ ] Create endless mode after completing story waves

### Power-up System
- [ ] Add more power-up types (e.g., speed boost, invincibility, time slow)
- [ ] Implement power-up stacking or upgrade levels
- [ ] Add visual indicator showing active power-up duration
- [ ] Create rare power-ups with special effects

### Polish & Visual Effects
- [ ] Add particle effects for engine trails
- [ ] Improve explosion animations with more variety
- [ ] Add screen shake effects for boss attacks and player damage
- [ ] Implement background parallax layers for depth
- [ ] Add animated sprites for enemies and player
- [ ] Create unique visual effects for each power-up

### Audio
- [ ] Add background music (menu and gameplay tracks)
- [ ] Implement sound effects for all actions (shooting, explosions, power-ups, etc.)
- [ ] Add boss-specific music or audio cues
- [ ] Create audio settings menu (volume controls, mute options)

### UI/UX Improvements
- [ ] Add high score persistence (localStorage or backend)
- [ ] Create leaderboard system
- [ ] Implement tutorial or how-to-play screen
- [ ] Add settings menu (controls remapping, audio, graphics)
- [ ] Show damage numbers on enemies
- [ ] Add boss phase transition animations
- [ ] Create wave preview screen showing enemy count

### Controls & Accessibility
- [ ] Add gamepad/controller support
- [ ] Implement touch controls for mobile
- [ ] Add colorblind mode options
- [ ] Create customizable key bindings

## Technical Improvements

### Code Quality
- [ ] Add TypeScript for better type safety
- [ ] Implement unit tests for game logic
- [ ] Add integration tests for game scenes
- [ ] Refactor collision handling into dedicated system
- [ ] Create event bus for better decoupling
- [ ] Add JSDoc comments to all classes and methods

### Performance
- [ ] Optimize sprite pooling for better performance
- [ ] Implement object pooling for lasers and explosions
- [ ] Add performance monitoring and metrics
- [ ] Optimize collision detection for large enemy counts

### Architecture
- [ ] Separate game constants into config file
- [ ] Create difficulty curve configuration system
- [ ] Implement save/load game state
- [ ] Add replay system for sharing gameplay

## Known Issues
- [ ] Enemies and meteors can overlap when spawning, causing visual clutter
- [ ] Review boss damage cooldown timing for balance
- [ ] Ensure consistent frame rate across different devices
- [ ] Test edge cases for power-up spawning near boundaries

## Nice-to-Have
- [ ] Add multiplayer co-op mode
- [ ] Create level editor
- [ ] Implement procedurally generated waves
- [ ] Add story mode with narrative elements
- [ ] Create boss rush mode
- [ ] Add daily challenges with unique modifiers
