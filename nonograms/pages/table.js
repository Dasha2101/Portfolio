class Table {
  constructor(data, checkGame, startTimer){
    this.matrix = data;
    this.checkGame = checkGame;
    this.startTimer = startTimer;

    this.linePlayer = this.emptyMatrix();
    this.createCanvas();
    this.findEvent();
  }

  createCanvas(){
  this.cnv = document.createElement('canvas');
  this.cnv.classList.add('canvas')
  this.ctx = this.cnv.getContext('2d');

  this.cnv.height = 800;
  this.cnv.width = 800;
  this.tableContainer = null;
  this.tableNonogram()
  }

  findEvent(){
    this.cnv.addEventListener('mousedown', (e) => this.handleEvent(e));
    this.cnv.addEventListener('contextmenu', (e) => this.handleContextMenu(e));
  }

  emptyMatrix(){
    return this.matrix.map(row => row.map(cell => (typeof cell === "number" ? 0 : cell)));
  }

  tableNonogram(){
    console.log(this.linePlayer)
    const rows = this.matrix.length;
    const cels = this.matrix[0].length;
    const gap = 1;

    const celsWidth = (this.cnv.width - (cels - 1)) / cels;
    const celsHeight = (this.cnv.height - (rows - 1) * gap / rows);
    const celsSize = Math.min(celsWidth, celsHeight);

    this.ctx.clearRect(0, 0, this.cnv.width, this.cnv.height);


    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cels; j++){
          const x = j * (celsSize + gap);
          const y = i * (celsSize + gap);

          this.ctx.strokeStyle = 'black';
          this.ctx.lineWidth = 2;

          const hints = this.matrix[i][j];
          if (typeof hints  === 'string') {
            this.ctx.strokeStyle = 'blue';
            this.ctx.lineWidth = 3;
            this.ctx.strokeRect(x, y, celsSize, celsSize);

            this.ctx.fillStyle = 'black';
            this.ctx.font = 'bold 15px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';

            const hintWidth = this.ctx.measureText(hints).width;
            if (hintWidth > celsSize - 10) {
              const newFontSize = (celsSize - 10) / hintWidth * 15;
              this.ctx.font = `bold ${newFontSize}px Arial`;
            }

            this.ctx.fillText(hints, x + celsSize / 2, y + celsSize / 2);
          } else {

            this.ctx.strokeRect(x, y, celsSize, celsSize);
          }

      }
    }

  }

  handleEvent(e){
    e.preventDefault()
    const button = e.button;

    const index = this.cnv.getBoundingClientRect();
    const mouseX = e.clientX - index.left;
    const mouseY = e.clientY - index.top;
    const gap = 1;

    const rows = this.matrix.length;
    const cels = this.matrix[0].length;

    const celsWidth = (this.cnv.width - (cels - 1) * gap) / cels;
    const celsHeight = (this.cnv.height - (rows - 1) * gap / rows);

    const celsSize = Math.min(celsWidth, celsHeight);

    const clickCel = Math.floor(mouseX / (celsSize + gap));
    const clickRow = Math.floor(mouseY / (celsSize + gap));

    const x = clickCel * (celsSize + gap);
    const y = clickRow * (celsSize + gap);

    const cellValue = this.matrix[clickRow][clickCel];

    if (button === 2) {
      this.handleRigthEvent(x, y, clickRow, clickCel, cellValue, celsSize)
    } else if (button === 0){
      this.handleLeftEvent(x, y, clickRow, clickCel, cellValue, celsSize)
    }

    this.checkGame();
  }

  handleRigthEvent(x, y, clickRow, clickCel, cellValue, celsSize){
    if (typeof cellValue === 'string') {
      return;
    }

    if (cellValue === 0 || cellValue === 1) {
      this.matrix[clickRow][clickCel] = 2;
      this.ctx.clearRect(x, y, celsSize, celsSize);

      this.ctx.strokeStyle = 'black';
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.ctx.lineTo(x + celsSize, y + celsSize);
      this.ctx.moveTo(x + celsSize, y);
      this.ctx.lineTo(x, y + celsSize);
      this.ctx.stroke();
      this.startTimer();
    } else if (cellValue === 2) {
      this.matrix[clickRow][clickCel] = 0;
      this.ctx.clearRect(x, y, celsSize, celsSize);
      this.ctx.strokeRect(x, y, celsSize, celsSize);
    }

    this.linePlayer[clickRow][clickCel] = this.matrix[clickRow][clickCel];

}

  handleLeftEvent(x, y, clickRow, clickCel, cellValue, celsSize){
    if (typeof cellValue === 'string') {
      return;
    }
    if (cellValue === 0){
      this.matrix[clickRow][clickCel] = 1;
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(x, y, celsSize, celsSize);
      this.startTimer();
    } else if (cellValue === 1){
      this.matrix[clickRow][clickCel] = 0;
      this.ctx.clearRect(x, y, celsSize, celsSize);
      this.ctx.strokeRect(x, y, celsSize, celsSize)
    } else if (cellValue === 2){
      this.matrix[clickRow][clickCel] = 1;
      this.ctx.fillStyle = 'black';
      this.ctx.fillRect(x, y, celsSize, celsSize);
      this.startTimer();
    }
    this.linePlayer[clickRow][clickCel] = this.matrix[clickRow][clickCel];
  }

  handleContextMenu(e) {
    e.preventDefault();
  }
}

  export default Table

