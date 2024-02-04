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
    // const linePlayer = this.currentMatrix.flatMap(row => row.map(cell => (typeof cell === "number" ? 0 : cell)));
    const linePlayer = this.linePlayer.flat()
    console.log("lineMatrix:", lineMatrix);
    console.log("linePlayer:", linePlayer);
    return lineMatrix.every((cell, index) => cell === linePlayer[index])

  }

  showModalWin(){
    console.log("Вы выиграли")
  }

  endGamePlay(){
    if (typeof this.endGame === 'function') {
      console.log("Ending the game...");
      this.endGame();
    }
  }

}

export default Winner