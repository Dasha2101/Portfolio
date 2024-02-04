import Table from "./table.js";
import Winner from "./winner.js";

class Nonogramms{
  constructor(parent, data){
    this.data = data;
    this.parent = parent;

    this.gameContainer = null;
    this.tableContainer = null;
    this.winner = null;



    this.init()
  }

  init(){
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('nonogramms');
    this.start();

  }

  getRandom(){
    const randomIndex = Math.floor(Math.random() * this.data.length);
    this.data = this.data[randomIndex].matrix
  }

  start(){
    this.getRandom()
    this.tableContainer = new Table(this.data, this.checkGame.bind(this));
    this.winner = new Winner(this.data, this.tableContainer.linePlayer, this.tableContainer.matrix, this.checkGame.bind(this));

    const button = document.createElement('button')
    button.addEventListener('click', this.restart.bind(this))
    this.gameContainer.append(this.tableContainer.cnv, button)
    this.parent.append(this.gameContainer);

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