import data from "../arrayData";
import { Car } from "../../interface";

export class GenerateCar {
  data: { carBrands: string[]; carColors: string[]; carModels: string[] };

  constructor() {
    this.data = data

    this.init();
  }


  init() {
    this.generateRandomCar()
  }

  generateRandomIndex(length: number) {
    return Math.floor(Math.random() * length);

  }

  generateRandomCar() {
    const brandIndex = this.generateRandomIndex(this.data.carBrands.length);
    // const markaIndex = this.generateRandomIndex(this.data.carModels.length);
    const colorIndex = this.generateRandomIndex(this.data.carColors.length);

    const nameBrand = this.data.carBrands[brandIndex];
    // const marka = this.data.carModels[markaIndex];
    const color = this.data.carColors[colorIndex];
    const id = Date.now();

    return {
      name: nameBrand,
      color: color,
      // brand: marka,
      id: id,
  };
  }

  generateRandomhundredCars() {
    const randomCars: Car[] = [];
    for (let i = 0; i <= 100; i++) {
      const randomCar = this.generateRandomCar();
      randomCars.push(randomCar);
    }
    return randomCars
  }
}