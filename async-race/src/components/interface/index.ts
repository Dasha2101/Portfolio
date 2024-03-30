export interface Car {
  name: string;
  color: string;
  // brand: string
  id: number;
}

export interface CarData {
  totalCount: number;
  cars: Car[];
}

