const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class GameStateService {
  constructor() {
    this.gameState = {
      currentCar: null,
      raceInProgress: false,
      currentTime: 0,
      lapProgress: 0,
      position: { x: 0, y: 0, angle: 0 },
      speed: 0,
      lap: 1,
      totalLaps: 3,
      checkpoints: [],
      audioEnabled: true,
      musicEnabled: true
    };
  }

  async getGameState() {
    await delay(100);
    return { ...this.gameState };
  }

  async updateGameState(updates) {
    await delay(50);
    this.gameState = {
      ...this.gameState,
      ...updates
    };
    return { ...this.gameState };
  }

  async resetGameState() {
    await delay(100);
    this.gameState = {
      currentCar: this.gameState.currentCar, // Keep selected car
      raceInProgress: false,
      currentTime: 0,
      lapProgress: 0,
      position: { x: 0, y: 0, angle: 0 },
      speed: 0,
      lap: 1,
      totalLaps: 3,
      checkpoints: [],
      audioEnabled: this.gameState.audioEnabled,
      musicEnabled: this.gameState.musicEnabled
    };
    return { ...this.gameState };
  }

  async startRace() {
    await delay(100);
    this.gameState.raceInProgress = true;
    this.gameState.currentTime = 0;
    this.gameState.lapProgress = 0;
    this.gameState.lap = 1;
    return { ...this.gameState };
  }

  async finishRace() {
    await delay(100);
    this.gameState.raceInProgress = false;
    return { ...this.gameState };
  }
}

export default new GameStateService();