import raceResultData from '../mockData/raceResult.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class RaceResultService {
  constructor() {
    this.results = [...raceResultData];
  }

  async getAll() {
    await delay(200);
    return [...this.results];
  }

  async getLeaderboard(limit = 5) {
    await delay(200);
    const sorted = [...this.results].sort((a, b) => a.time - b.time);
    return sorted.slice(0, limit);
  }

  async getBestTime() {
    await delay(150);
    if (this.results.length === 0) return null;
    const best = this.results.reduce((prev, current) => 
      (prev.time < current.time) ? prev : current
    );
    return { ...best };
  }

  async getById(id) {
    await delay(150);
    const result = this.results.find(result => result.Id === parseInt(id, 10));
    return result ? { ...result } : null;
  }

  async create(resultData) {
    await delay(300);
    const maxId = Math.max(...this.results.map(result => result.Id), 0);
    const newResult = {
      ...resultData,
      Id: maxId + 1,
      date: new Date().toISOString()
    };
    this.results.push(newResult);
    return { ...newResult };
  }

  async update(id, resultData) {
    await delay(300);
    const index = this.results.findIndex(result => result.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Race result not found');
    }
    
    const updatedResult = {
      ...this.results[index],
      ...resultData,
      Id: this.results[index].Id
    };
    
    this.results[index] = updatedResult;
    return { ...updatedResult };
  }

  async delete(id) {
    await delay(250);
    const index = this.results.findIndex(result => result.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Race result not found');
    }
    
    const deletedResult = { ...this.results[index] };
    this.results.splice(index, 1);
    return deletedResult;
  }
}

export default new RaceResultService();