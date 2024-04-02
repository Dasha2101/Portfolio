import WinTable from "../requestWinner";
import './index.css'

export class Winner {


  page: number = 1;

  constructor() {

    this.init();
  }


  init() {
    this.createWinnerPage()
  }

  public async createWinnerPage (): Promise<HTMLElement | void> {
    const limit = 10;
    try {
    const winnerContainer: HTMLElement = document.createElement('div');
    winnerContainer.classList.add('winner-container');


    const winnersData = await WinTable.getWinners('id', 'ASC', this.page, limit);

    if (winnersData && winnersData.length > 0) {
      const table: HTMLTableElement = document.createElement('table');
      const thead: HTMLTableSectionElement = document.createElement('thead');
      const tbody: HTMLTableSectionElement = document.createElement('tbody');

      const headers = ['ID', 'WINS', 'TIME (sec)'];
      const headerRow: HTMLTableRowElement = document.createElement('tr');
      headers.forEach(headerText => {
        const th: HTMLElement = document.createElement('th');
        th.textContent = headerText;
        headerRow.append(th);
      });
      thead.append(headerRow);
      table.append(thead);

      winnersData.forEach(winner => {
      const row: HTMLTableRowElement = document.createElement('tr');
      const timeInSeconds = (winner.time / 1000).toFixed(2);
      row.innerHTML = `
          <td>${winner.id}</td>
          <td>${winner.wins}</td>
          <td>${timeInSeconds}</td>
      `;
      tbody.append(row);
      });

      table.append(tbody);
      winnerContainer.append(table);
      return winnerContainer;
      } else {
        winnerContainer.textContent = 'Нет данных о победителях.';
        return winnerContainer;
      }
    } catch (error) {
      console.error('Error:', error);
      return;
    }
  }

}