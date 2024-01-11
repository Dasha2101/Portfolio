import Gibbet from "./Gallows.js";
import Questions from "./questions.js";

class Hangman {
  constructor(parent, data){
    this.data = data;
    this.parent = parent
    this.gameContainer = null

    this.gibbet = null
    this.qast = null
    this.position = {
      answer: ''
    }


    this.init()
  }

  init(){
    this.gameContainer = document.createElement('div')
    this.gameContainer.classList.add('hangman');

    const gibbets = new Gibbet().showInHTML()
    this.gibbet = gibbets

    const qasts = new Questions(this.data, this.position)
    this.qast = qasts

    this.gameContainer.append(gibbets)
    this.gameContainer.append(this.qast.showHTML())
    this.parent.append(this.gameContainer)

    document.addEventListener('keyup', this.eventHandler.bind(this))
  }


  eventHandler(event){
    const char = event.key.toLowerCase()
    console.log(char, this.position)

    if (!this.position.answer.includes(char)){
      const event = new Event('inccorect')
      document.dispatchEvent(event)
    }
    else{

    }
  }

// Game block
//   gameBlock(gameContainer){
//     let boxGame = document.createElement('section');
//     boxGame.classList.add('game-box');

//     let displayWords = document.createElement('ul');
//     displayWords.classList.add('game-box__word-display');
//     //??
//     let letter = document.createElement('li');
//     letter.classList.add('letter');

//     displayWords.append(letter);

//     let textHint = document.createElement('h4')
//     textHint.classList.add('hint-text')
//     boxGame.append(displayWords, letter, textHint)
//     gameContainer.append(boxGame)

// }
}

export default Hangman