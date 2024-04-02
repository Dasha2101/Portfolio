// import { ViewHtml } from "../viewHtml/view";
// import Garage from "../requests";

export class Winner {
  constructor() {

    this.init();
  }


  init() {
    this.createWinnerPage()
  }

  createWinnerPage() {
    const winnerContainer: HTMLElement = document.createElement('div');
    winnerContainer.classList.add('winner-container');

    // const table: HTMLElement = document.createElement('table');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['ID', 'Color', 'Name', 'Winners', 'Time'];

    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
    })

    thead.append(headerRow);

    // const tbody = document.createElement('tbody');




  }



}