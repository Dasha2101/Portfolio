import Gibbet from "./Gallows.js";
import Questions from "./questions.js";
import Keyboard from "./Keyboard.js";

class Hangman {
  constructor(parent, data){
    this.data = data;
    this.parent = parent
    this.gameContainer = null

    this.gibbet = null
    this.qast = null
    this.buttonContainer = null
    this.position = {
      answer: '',
      letter: ''
    }
    // this.letter = null


    this.init()
  }

  init(){
    this.gameContainer = document.createElement('div')
    this.gameContainer.classList.add('hangman');

    const gibbets = new Gibbet().showInHTML()
    this.gibbet = gibbets

    const qasts = new Questions(this.data, this.position)
    this.qast = qasts

    const buttonContainer = new Keyboard(this.position,)
    this.buttonContainer = buttonContainer

    this.gameContainer.append(gibbets)
    this.gameContainer.append(this.qast.showHTML())
    this.gameContainer.append(this.buttonContainer.showHTML())
    this.parent.append(this.gameContainer)

    document.addEventListener('keyup', this.eventHandler.bind(this))
  }


  eventHandler(event){
    const char = event.key.toLowerCase()
    console.log(char, this.position)

    if (!this.position.answer.includes(char)){
      const inccorectEvent = new Event('incorrect')
      document.dispatchEvent(inccorectEvent)
      console.log('sdf')
    }

  }
}


export default Hangman