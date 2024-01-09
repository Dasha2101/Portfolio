export class Hangman {
  constructor(parent, questions){
    this.questions = questions;
    this.init(parent)
  }

  init(parent){
    const gameContainer = document.createElement('div')
    gameContainer.classList.add('hangman');
    parent.append(gameContainer)
    this.gallowsBlock(gameContainer)
    this.gameBlock(gameContainer)
  }
// Gallows block with content
  gallowsBlock(gameContainer){
    let boxHangman = document.createElement('div');
    boxHangman.classList.add('hangman-box');

    let imgHangman = document.createElement('img');
    imgHangman.classList.add('hangman-box__img');
    imgHangman.src = '../assets/gallows.svg'

    let hangmanTitle = document.createElement('h1');
    hangmanTitle.classList.add('primary-title', 'hangman-box__title');
    hangmanTitle.innerText = 'Hangman Game';

    boxHangman.append(imgHangman, hangmanTitle)
    gameContainer.append(boxHangman)
}
// Game block
  gameBlock(gameContainer){
    let boxGame = document.createElement('section');
    boxGame.classList.add('game-box');

    let displayWords = document.createElement('ul');
    displayWords.classList.add('game-box__word-display');
    //??
    let letter = document.createElement('li');
    letter.classList.add('letter');

    displayWords.append(letter);

    let textHint = document.createElement('h4')
    textHint.classList.add('hint-text')
    boxGame.append(displayWords, letter, textHint)
    gameContainer.append(boxGame)

}
}
