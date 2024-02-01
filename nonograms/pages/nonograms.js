import Table from "./table.js";

class Nonogramms{
  constructor(parent, data){
    this.data = data;
    console.log(data)
    this.parent = parent;

    this.gameContainer = null;
    this.tableContainer = null;


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
    // const data = this.data
    // console.log(data);
    this.getRandom()
    this.tableContainer = new Table(this.data);
    this.gameContainer.append(this.tableContainer.cnv)
    this.parent.append(this.gameContainer);

  }


}

export default Nonogramms