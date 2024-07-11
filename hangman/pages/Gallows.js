class Gallows {
  constructor() {
    this.cnv = document.createElement('canvas');
    this.cnv.classList.add('canvas')
    this.ctx = this.cnv.getContext('2d');
    this.cnv.height = 250;
    this.cnv.width = 180;
  }

  render(step = 0)
  {
      // gallows
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'black';
      this.ctx.moveTo(50, 200);
      this.ctx.lineTo(50, 50);
      this.ctx.lineTo(125, 50);
      this.ctx.lineTo(125, 75);
      this.ctx.moveTo(50, 75);
      this.ctx.lineTo(75, 50);
      this.ctx.stroke();
      this.ctx.closePath();

      // step 1 - head
      if (step >= 1) {
        this.ctx.beginPath();
        this.ctx.arc(125, 85, 10, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
      }

      // step 2 - body
      if (step >= 2) {
        this.ctx.beginPath();
      this.ctx.ellipse(125, 115, 10, 20, 0, 0, Math.PI * 2);
      this.ctx.stroke();
      this.ctx.closePath();
      }
      // step 3 - right arm
      if (step >= 3) {

      this.ctx.beginPath();
      this.ctx.moveTo(130, 97);
      this.ctx.lineTo(145, 115)
      this.ctx.stroke();
      this.ctx.closePath();
      }
      // step 4 - left arm
      if (step >= 4) {

      this.ctx.beginPath();
      this.ctx.moveTo(120, 97);
      this.ctx.lineTo(105, 115)
      this.ctx.stroke();
      this.ctx.closePath();
      }
      // step 5 - right leg
      if (step >= 5) {

      this.ctx.beginPath();
      this.ctx.moveTo(130, 133);
      this.ctx.lineTo(135, 155)
      this.ctx.stroke();
      this.ctx.closePath();
      }
      // step 6 - left leg
      if (step >= 6) {

      this.ctx.beginPath();
      this.ctx.moveTo(120, 133);
      this.ctx.lineTo(115, 155)
      this.ctx.stroke();
      this.ctx.closePath();
      }

      return this.cnv;
  }

}

export default Gallows