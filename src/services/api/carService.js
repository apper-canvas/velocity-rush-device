import carData from '../mockData/car.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CarService {
  constructor() {
    this.cars = [...carData];
  }

  async getAll() {
    await delay(200);
    return [...this.cars];
  }

  async getById(id) {
    await delay(150);
    const car = this.cars.find(car => car.Id === parseInt(id, 10));
    return car ? { ...car } : null;
  }

  async create(carData) {
    await delay(300);
    const maxId = Math.max(...this.cars.map(car => car.Id), 0);
    const newCar = {
      ...carData,
      Id: maxId + 1
    };
    this.cars.push(newCar);
    return { ...newCar };
  }

  async update(id, carData) {
    await delay(300);
    const index = this.cars.findIndex(car => car.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Car not found');
    }
    
    const updatedCar = {
      ...this.cars[index],
      ...carData,
      Id: this.cars[index].Id // Preserve ID
    };
    
    this.cars[index] = updatedCar;
    return { ...updatedCar };
  }

  async delete(id) {
    await delay(250);
    const index = this.cars.findIndex(car => car.Id === parseInt(id, 10));
    if (index === -1) {
      throw new Error('Car not found');
    }
    
    const deletedCar = { ...this.cars[index] };
    this.cars.splice(index, 1);
    return deletedCar;
  }
}

export default new CarService();