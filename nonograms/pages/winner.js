class Winner {
  constructor(data, linePlayer, endGame){
    this.data = data
    this.linePlayer = linePlayer;
    this.endGame = endGame;
    this.checkGame()
  }

  checkGame(){
    if (this.winnerGame()){
      this.showModalWin();
      this.endGamePlay();
  }
}

  winnerGame(){
    console.log(this.linePlayer)
    const lineMatrix = this.data.flat();
    const linePlayer = this.linePlayer.flat()
    return lineMatrix.every((cell, index) => cell === linePlayer[index])

  }

  showModalWin(){
    console.log("Вы выиграли")
  }

  endGamePlay(){
    if (typeof this.endGame === 'function') {
      this.endGame();
    }
  }

}

export default Winner