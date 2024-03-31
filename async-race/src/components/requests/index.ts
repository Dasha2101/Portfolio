export default class Garage {

  static garage_url = 'http://localhost:3000';

  static async getCars(page?: number, limit?: number): Promise<[] | number> {
      const data = await fetch(this.garage_url + `/garage?_page=${page}&_limit=${limit}`, {
        method: 'GET'
      });
      const totalCountHeader = data.headers.get('X-Total-Count');
      const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;

      const json = await data.json();

      if (!limit) {
        return totalCount;
      } else {
        return json;
      }
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

  static async startCar(id: number): Promise<Response> {
    const data = await fetch(this.garage_url + `/engine?id=${id}&status=started`, {
      method: 'PATCH',
    });
    if (data.status === 200) {
      // const json = await data.json();
      // return json;
      return data;
    } else {
      throw new Error(`Failed to start car. Status: ${data.status}`);
  }
}

  static async stopCar(id: number): Promise<Response> {
    const data = await fetch(this.garage_url + `/engine?id=${id}&status=stopped`, {
      method: 'PATCH',
    });
    if (data.status === 200) {
      // const json = await data.json();
      // return json;
      return data;
    } else {
      throw new Error(`Failed to start car. Status: ${data.status}`);
  }
  }
}