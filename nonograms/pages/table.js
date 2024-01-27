class Table {
  constructor(data){
    this.matrix = data[0].matrix;
    this.createCanvas()
  }
  createCanvas(){
  this.cnv = document.createElement('canvas');
  this.cnv.classList.add('canvas')
  this.ctx = this.cnv.getContext('2d');

  this.cnv.height = 250;
  this.cnv.width = 180;
  this.tableContainer = null;
  this.tableNonogram()
  }

  tableNonogram(){
    const rows = this.matrix.length;
    const cels = this.matrix[0].length;
    const gap = 1;

    const celsWidth = (this.cnv.width - (cels - 1)) / cels;
    const celsHeight = (this.cnv.height - (rows - 1) * gap / rows);
    const celsSize = Math.min(celsWidth, celsHeight);

    for (let i = 0; i < rows; i++){
      for (let j = 0; j < cels; j++){
          const x = j * (celsSize + gap);
          const y = i * (celsSize + gap);

          if (this.matrix[i][j] === 1){
            this.ctx.fillStyle = 'black';
            this.ctx.fillRect(x, y, celsSize, celsSize);
          }
      }
    }
  }
}

export default Table