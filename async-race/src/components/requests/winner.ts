import { WinnerData } from "../interface";


export default class WinTable {

  static winner_url = 'http://localhost:3000';


  static async getWinners(sort: 'id' | 'wins' | 'time', order: 'ASC' | 'DESC', page?: number, limit?: number): Promise<{ winners: WinnerData[], totalCount: number }> {
    const data = await fetch(`${this.winner_url}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`, {
      method: 'GET'
    });

    const totalCountHeader = data.headers.get('X-Total-Count');
    const totalCount = totalCountHeader ? parseInt(totalCountHeader) : 0;

    console.log(totalCount);
    const json: WinnerData[] = await data.json();
    return { winners: json, totalCount };
  }


  static async getWinner(id: number): Promise<WinnerData | null> {
    const data = await fetch(`${this.winner_url}/winners/${id}`, {
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
    const data = await fetch(`${this.winner_url}/winners/${id}`, {
      method: 'DELETE'
    });
    const json = await data.json();
    return json;
  }

  static async updateWinner(id: number, winnerData: { id: number; wins: number; time: number; }): Promise<void> {
    const data = await fetch(`${this.winner_url}/winners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(winnerData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await data.json();
    return json;
  }

}
