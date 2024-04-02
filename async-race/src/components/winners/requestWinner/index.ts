export default class WinTable {

  static winner_url = 'http://localhost:3000';


static async getWinners(sort: 'id' | 'wins' | 'time', order: 'ASC' | 'DESC' , page?: number, limit?: number): Promise<{ id: number, wins: number, time: number }[]>{
  const data = await fetch(`${this.winner_url}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
    method: 'GET'
  });

  const totalCountHeader = data.headers.get('X-Total-Count');
  const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;

  console.log(totalCount);
  const json = await data.json();
  return json;
}


static async getWinner(id: number): Promise<[]> {
  const data = await fetch(`${this.winner_url}/winner/${id}` , {
    method: 'GET',
  });
  const json = await data.json();
  return json;
}

static async createWinner(winnerData: { id: number; wins: number; time: number; }): Promise<[]> {
  const data = await fetch(`${this.winner_url}/winners/`, {
    method: 'POST',
    body: JSON.stringify(winnerData),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await data.json();
  return json;
}

static async deleteWinner(id: number): Promise<[]> {
  const data = await fetch(`${this.winner_url}/winner/${id}`, {
    method: 'DELETE'
  });
  const json = await data.json();
  return json;
}

static async updateWinner(id: number): Promise<[]> {
  const data = await fetch(`${this.winner_url}/winner/${id}`, {
    method: 'PUT'
  });
  const json = await data.json();
  return json;
}

}
