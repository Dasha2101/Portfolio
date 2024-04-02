import { Car } from "../interface";
export default class Garage {

  static garage_url = 'http://localhost:3000';

  static async getCars(page?: number, limit?: number): Promise<{ totalCount: number, cars: Car[]}> {
      const data = await fetch(this.garage_url + `/garage?_page=${page}&_limit=${limit}`, {
        method: 'GET'
      });
      const totalCountHeader = data.headers.get('X-Total-Count');
      const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;

      const json = await data.json();
      return {totalCount, cars: json}
  }

  static async getCar(id: number): Promise<[]> {
    const data = await fetch(this.garage_url + `/garage/${id}`, {
      method: 'GET'
    });
    const json = await data.json();
    return json;
}


  static async updateCars(id: number, newName: string | null, newColor: string | null, currentName: string, currentColor: string): Promise<[]> {
      const data = await fetch(this.garage_url +  `/garage/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newName !== null ? newName : currentName,
          color: newColor !== null ? newColor : currentColor
        })

      });
      const json = await data.json();
      return json;
  }

  static async deleteCars(id: number): Promise<[]> {
    const data = await fetch(this.garage_url +  `/garage/${id}`,  {
      method: 'DELETE'
    });
    const json = await data.json();
    return json;
  }

  static async createCars(createCarName: string, createCarColor: string): Promise<[]> {
    const data = await fetch(this.garage_url +  `/garage/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: createCarName,
        color: createCarColor
      })
    });
    const json = await data.json();
    return json;
  }

static async startStopCar(id: number, action: 'start' | 'stop'): Promise<Response> {
  const status = (action === 'start') ? 'started' : 'stopped';
  const data = await fetch(`${this.garage_url}/engine?id=${id}&status=${status}`, {
    method: 'PATCH',
  });

  if (data.status === 200) {
    return data;
  } else {
    throw new Error(`Failed to ${action} car. Status: ${data.status}`);
  }
}

static driveMode(id: number) {
  return fetch(`${this.garage_url}/engine?id=${id}&status=drive`, {
    method: 'PATCH',
  }).then((data) => {
    if (data && data.ok) {
      return {status: 'ok', carId: id};
    }
    throw new Error('Something went wrong.');
  });
}

}