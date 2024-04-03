// import WinTable from "../requestWinner";
// import './index.css'

// export class Winner {
  // page: number = 1;
  // btnPrevious: HTMLButtonElement | null;
  // btnNext: HTMLButtonElement | null;
  // pageElement: HTMLElement | null;
  // winnerContainer: HTMLElement | null;

  // constructor() {
  //   this.btnNext = null;
  //   this.btnPrevious = null;
  //   this.pageElement = null;
  //   this.winnerContainer = null;

  //   this.init();
  // }


  // public async init() {
  //   this.createWinnerPage()
  //   const totalCountWin = document.createElement('div');
  //   totalCountWin.classList.add('totalWin');
  // }


  // public async createWinnerPage (): Promise<HTMLElement | void> {
  //   const limit = 10;
  //   try {
  //   const winnerContainer: HTMLElement = document.createElement('div');
  //   winnerContainer.classList.add('winner-container');

  //   // const need = document.createElement('div');
  //   this.winnerContainer = winnerContainer
  //   this.pagination()
  //   //content
  //   const namePage = document.createElement('h1');
  //   namePage.textContent = 'Winners';

  //   //table
  //   const { winners, totalCount } = await WinTable.getWinners('id', 'ASC', this.page, limit);

  //   let totalCountWin: HTMLElement | null = document.querySelector('.totalWin');

  //   if (totalCountWin) {
  //     totalCountWin.remove();
  //   }
  //   totalCountWin = document.createElement('div');
  //   totalCountWin.classList.add('totalCar');
  //   totalCountWin.textContent = `Total Winner ${totalCount}`
  //   this.winnerContainer.prepend(totalCountWin);

  //   if (winners && winners.length > 0) {
  //     const table: HTMLTableElement = document.createElement('table');
  //     const thead: HTMLTableSectionElement = document.createElement('thead');
  //     const tbody: HTMLTableSectionElement = document.createElement('tbody');

  //     const headers = ['ID', 'WINS', 'TIME (sec)'];
  //     const headerRow: HTMLTableRowElement = document.createElement('tr');
  //     headers.forEach(headerText => {
  //       const th: HTMLElement = document.createElement('th');
  //       th.textContent = headerText;
  //       headerRow.append(th);
  //     });
  //     thead.append(headerRow);
  //     table.append(thead);

  //     winners.forEach(winner => {
  //     const row: HTMLTableRowElement = document.createElement('tr');
  //     const timeInSeconds = (winner.time / 1000).toFixed(2);
  //     row.innerHTML = `
  //         <td>${winner.id}</td>
  //         <td>${winner.wins}</td>
  //         <td>${timeInSeconds}</td>
  //     `;
  //     tbody.append(row);
  //     });

  //     table.append(tbody);
  //     this.winnerContainer.append(namePage, table);
  //     return winnerContainer;
  //     } else {
  //       this.winnerContainer.textContent = 'Нет данных';
  //       return winnerContainer;
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return;
  //   }
  // }

  // public async pagination(){
  //   const containerForContent = document.createElement('div');
  //   containerForContent.classList.add('container-content')
  //   const numberPage = document.createElement('div');
  //   numberPage.textContent = `Page ${this.page}`


  //   const buttonPrevious = document.createElement('button');
  //   buttonPrevious.classList.add('button-pagination');
  //   buttonPrevious.textContent = 'Previous';
  //   this.btnPrevious = buttonPrevious
  //   if (this.page === 1) {
  //     this.btnPrevious?.setAttribute('disabled', 'true');
  // }
  //   const buttonNext = document.createElement('button');
  //   buttonNext.classList.add('button-pagination');
  //   buttonNext.textContent = 'Next';
  //   this.btnNext = buttonNext;

  //   containerForContent.append(buttonPrevious, numberPage, buttonNext);
  //   this.winnerContainer?.append(containerForContent)

  //   //event
  //   this.btnNext.addEventListener('click', () => this.nextPage());
  //   this.btnPrevious.addEventListener('click', () => this.previousPage());

  // }

  // public async nextPage() {
  //   console.log('1')
  //   try {
  //     console.log('2')
  //     const limit = 10;
  //     const nextPage = this.page + 1;
  //     const { winners } = await WinTable.getWinners('id', 'ASC', nextPage, limit);
  //     if (Array.isArray(winners) && winners.length > 0) {
  //       this.page = nextPage;
  //       localStorage.setItem('pageNumber', this.page.toString())
  //       console.log('3')
  //       this.updatePageNumber();
  //       this.btnPrevious?.removeAttribute('disabled');
  //       if (winners.length < limit) {
  //         this.btnNext?.setAttribute('disabled', 'true');
  //       }
  //     } else {
  //       this.btnNext?.setAttribute('disabled', 'true');
  //     }
  //   } catch (error) {
  //     console.error('Ошибка:', error);
  //   }
  // }
  // public async previousPage(){
  //   console.log('1')
  //   try {
  //     console.log('2')
  //     if (this.page > 1) {
  //       this.page--;
  //       localStorage.setItem('pageNumber', this.page.toString());
  //       await this.createWinnerPage();
  //       this.updatePageNumber();
  //       // document.dispatchEvent(this.updateContentEvent);
  //       console.log('3')
  //       const limit = 7;
  //       const{ winners } = await WinTable.getWinners('id', 'ASC', this.page, limit);
  //       if (this.page === 1) {
  //         this.btnPrevious?.setAttribute('disabled', 'true');
  //       }
  //       if (Array.isArray(winners) && winners.length as number === limit) {
  //         this.btnNext?.removeAttribute('disabled');
  //       }
  //     }
  //       if (this.page === 1) {
  //         this.btnPrevious?.setAttribute('disabled', 'true');
  //       }
  //   } catch (error) {
  //     console.error('Ошибка:', error);
  //   }
  // }

//   updatePageNumber(){
//     if (this.pageElement) {
//       this.pageElement.textContent = `Page ${this.page.toString()}`;
//   }
//   }


// }