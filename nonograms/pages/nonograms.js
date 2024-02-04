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

    this.init()
  }

  init(){
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('nonogramms');
    this.menu = new Menu(this.gameContainer, this.data, this.start.bind(this));
    this.menuContainer = this.menu.showHTML();
    this.parent.append(this.menuContainer);
    this.start();
  }

  getRandom(){
    const randomIndex = Math.floor(Math.random() * this.data.length);
    this.selectedMatrix = this.data[randomIndex].matrix
  }

  start(selectedMatrix){
    // this.getRandom()
    this.selectedMatrix = selectedMatrix;

    if (this.selectedMatrix) {
    this.tableContainer = new Table(this.selectedMatrix, this.checkGame.bind(this));
    this.winner = new Winner(this.selectedMatrix, this.tableContainer.linePlayer, this.tableContainer.matrix, this.checkGame.bind(this));

    const button = document.createElement('button')
    button.addEventListener('click', this.restart.bind(this))

    this.gameContainer.innerHTML = '';
    this.gameContainer.append(this.tableContainer.cnv, button)
    this.parent.append(this.gameContainer);
    }
  }

  restart() {
    this.timer = 0;
    this.tableContainer.linePlayer = this.tableContainer.emptyMatrix();
    this.tableContainer.tableNonogram();
  }

  checkGame() {
    console.log("Game checked in Nonogramms");
    if (this.winner) {
      this.winner.checkGame();
    }
  }



}

export default Nonogramms