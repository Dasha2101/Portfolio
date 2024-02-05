class Winner {
  constructor(parent, data, linePlayer, endGame, startTimer){
    this.parent = parent;
    this.data = data
    this.linePlayer = linePlayer;
    this.endGame = endGame;
    this.startTimer = startTimer;

    this.modalWin = null;

    this.checkGame()
  }

  checkGame(timer, timerStop){
    if (this.winnerGame()){
      this.showModalWin(timer);
      this.endGamePlay();
      timerStop();
  }
}

  winnerGame(){
    console.log(this.linePlayer)
    const lineMatrix = this.data.flat();
    const linePlayer = this.linePlayer.flat()
    return lineMatrix.every((cell, index) => cell === linePlayer[index])

  }

  showModalWin(timer){
    console.log("Вы выиграли")
    this.modalWin = document.createElement('div');
    this.modalWin.classList.add('modal-win');

    const titleModalWin = document.createElement('p');
    titleModalWin.classList.add('modal-win__title');
    titleModalWin.innerText = 'You won this game!';

    const subtitleModalWin = document.createElement('p');
    subtitleModalWin.classList.add('modal__win_sub');
    subtitleModalWin.innerText = `Отлично! Вы решили нонограмму за ${timer} секунд`

    const modalButton = document.createElement('button');
    modalButton.classList.add('modal-win__button');
    modalButton.innerText = 'Close'

    modalButton.addEventListener('click', () => {
      this.modalWin.classList.remove('show-modal-win');
      // this.modalWin.classList.add('hide-modal-win');
      setTimeout(() => {
        this.modalWin.style.display = 'none';
        // this.modalWin.classList.remove('hide-modal-win');
      }, 500);

    });

    this.modalWin.append(titleModalWin, subtitleModalWin, modalButton);
    // this.modalWin = modalWin
    this.parent.append(this.modalWin);

    this.showWin()
  }

  showWin() {
    this.modalWin.style.display = 'flex';
    setTimeout(() => {
      this.modalWin.classList.add('show-modal-win');
    }, 0);
  }

  // closeModalWin() {


  // }

  endGamePlay(){
    if (typeof this.endGame === 'function') {
      this.endGame();
    }
  }

}

export default Winner