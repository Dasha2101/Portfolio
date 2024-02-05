import Table from "./table.js";
import Winner from "./winner.js";
import Menu from "./menu.js"

class Nonogramms{
  constructor(parent, data){
    this.data = data;
    this.parent = parent;

    this.gameContainer = null;
    this.tableContainer = null;
    this.winner = null;
    this.menu = null;
    this.menuContainer = null;
    this.selectedMatrix = null;

    this.timeElem = document.createElement('div');
    this.timeElem.classList.add('time');
    this.timer = 0;
    this.timerInterval = null;

    this.init()
  }

  init(){
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('nonogramms');

    this.menu = new Menu(this.gameContainer, this.data, this.start.bind(this), this.showSolution.bind(this));
    this.menuContainer = this.menu.showHTML();
    this.menu.setShowSolutionCall(this.showSolution.bind(this))

    this.parent.append(this.menuContainer);
    this.start();
  }

  showSolution(){
    const solution = this.selectedMatrix.map(row => row.map(cell => (cell === 1 ? 1 : 0)));
    this.tableContainer.linePlayer = solution;
    this.tableContainer.tableNonogram();
    this.checkGame();
  }

  getRandom(){
    const randomIndex = Math.floor(Math.random() * this.data.length);
    this.selectedMatrix = this.data[randomIndex].matrix
  }

  start(selectedMatrix){
    this.selectedMatrix = selectedMatrix;
    const titleNonogram = document.createElement('h3');
    titleNonogram.classList.add('nonogram__title')
    titleNonogram.innerText = 'Nonogram game'

    const button = document.createElement('button')
    button.classList.add('button__reset')
    button.addEventListener('click', this.restart.bind(this))
    button.textContent = 'Reset'

    if (this.selectedMatrix) {
    this.startTimer();
    this.tableContainer = new Table(this.selectedMatrix, this.checkGame.bind(this), this.timer);
    this.winner = new Winner(this.parent, this.selectedMatrix, this.tableContainer.linePlayer, this.tableContainer.matrix, this.checkGame.bind(this), this.timer);

    const yourTime = document.createElement('h3');
    yourTime.classList.add('time')
    yourTime.innerText = 'Your time'

    const contairnerTime = document.createElement('div');
    contairnerTime.classList.add('container__time');
    contairnerTime.append(yourTime, this.timeElem);


    const containerItem = document.createElement('div');
    containerItem.classList.add('container__item');
    containerItem.append(contairnerTime, button)

    this.gameContainer.innerHTML = '';
    this.gameContainer.append(titleNonogram, this.tableContainer.cnv, containerItem)
    this.parent.append(this.gameContainer);
    }
  }

  startTimer() {
    if (this.timerInterval) {
      this.stopTimer();
    }
    if (!this.timerInterval) {
      this.timerInterval = setInterval(() => {
        this.timer += 1;
        this.renderTimer();
      }, 1000);
    }
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.timer = 0;
  }

  renderTimer(){
    const h = Math.floor(this.timer / 3600);
    const m = Math.floor(this.timer / 60) % 60;
    const s = this.timer % 60;
    let result = '';

    if (h > 0) {
      result += (h < 10 ? '0' : '') + h + ':';
    }
    if (m > 0) {
      result += (m < 10 ? '0' : '') + m + ':';
    } else {
      result += '00:';
    }
    result += (s < 10 ? '0' : '') + s;
    this.timeElem.innerHTML = result;
  }


  restart() {
    this.startTimer();
    this.timerRunning = false;
    this.tableContainer.linePlayer = this.tableContainer.emptyMatrix();
    this.tableContainer.tableNonogram();
    this.renderTimer();
  }

  checkGame() {
    console.log("Game checked in Nonogramms");
    if (this.winner) {
      this.winner.checkGame(this.timer, this.stopTimer.bind(this));
    }
  }

}

export default Nonogramms