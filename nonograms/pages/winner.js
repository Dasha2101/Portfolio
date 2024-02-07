class Winner {
  constructor(parent, data, linePlayer, endGame, startTimer, playGong, soundEnabled = true){
    this.parent = parent;
    this.data = data
    this.linePlayer = linePlayer;
    this.endGame = endGame;
    this.startTimer = startTimer;
    this.playGong = playGong;
    this.soundEnabled = soundEnabled;

    this.modalWin = null;
    this.endGameSound = new Audio('./sound/Sound-Gong.mp3');

    this.checkGame()
  }

  checkGame(timer){
    if (this.winnerGame()){
      this.showModalWin(timer);
      this.endGamePlay();
      this.playGongSound();

  }
}

  winnerGame(){
    const blackSquaresIndices = this.data
    .flatMap((row, rowIndex) => row.map((cell, colIndex) => (cell === 1 || cell === 0 ? { row: rowIndex, col: colIndex } : null)))
    .filter(cell => cell !== null);

return blackSquaresIndices.every(({ row, col }) => this.linePlayer[row][col] === this.data[row][col]);
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

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    // this.updateSoundButton();
  }

  playGongSound() {
    if (this.soundEnabled) {
      this.endGameSound.play();
    }
  }

  endGamePlay(){
    if (typeof this.endGame === 'function') {
      this.endGame();
    }
}
}


export default Winner