import Table from "./table.js";

class Nonogramms{
  constructor(parent, data){
    this.data = data;
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

  start(){
    // const data = this.data
    // console.log(data);
    this.tableContainer = new Table(this.data);
    this.gameContainer.append(this.tableContainer.cnv)
    this.parent.append(this.gameContainer);

  }


}

export default Nonogramms