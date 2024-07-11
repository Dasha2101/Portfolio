import Gallows from "./Gallows.js";
import Word from "./word.js";
import Keyboard from "./Keyboard.js";

class Hangman {
  constructor(parent, data){
    this.data = data;
    this.parent = parent

    this.gameContainer = null
    this.gibbet = null
    this.qast = null
    this.buttonContainer = null
    this.gameTitle = null

    this.containerError = null
    this.errors = 0;
    this.checkArr = []
    this.index = 0

    this.modalWin = null
    this.position = {
      answer: '',
      letter: ''
    }

    this.init()
  }

  init(){
    this.gameContainer = document.createElement('div')
    this.gameContainer.classList.add('hangman');
    this.start()
  }

  start(){
    this.getRandom()
    const data = this.data[this.index]
    this.gibbet = new Gallows()

    this.word = new Word(data)

    this.Keyboard = new Keyboard(this.guess.bind(this))
    this.buttonContainer = this.Keyboard.showHTML()

    this.errors = 0;

    const gameTitle = document.createElement('h2')
    gameTitle.innerText = 'Hangman'
    this.gameTitle = gameTitle

    const containerError = document.createElement('div')
    containerError.innerHTML = `${this.errors} / 6`
    this.containerError = containerError
    containerError.classList.add('container__error')
    containerError.append(this.gameTitle)

    const modalWin = document.createElement('div')
    modalWin.classList.add('modal-win')
    this.modalWin = modalWin
    this.gameContainer.classList.add('game__container')
    this.gameContainer.append(this.modalWin)
    this.gameContainer.append(containerError)
    this.gameContainer.append(this.gibbet.render())

    const containerVictor = document.createElement('div')
    containerVictor.classList.add('game__victor')
    containerVictor.append(this.word.toHtml(), this.buttonContainer)

    this.gameContainer.append(containerVictor)
    this.parent.append(this.gameContainer)


    this.parent.addEventListener('keyup', this.eventHandler.bind(this))
  }

  getRandom(){
    const lastIndex = sessionStorage.getItem('lastQ') || ''
    this.index = Math.floor(Math.random() * this.data.length);
    if (this.index == lastIndex){
      this.getRandom()
    }
    sessionStorage.setItem('lastQ', this.index)
  }

  restart(){
    this.gameContainer.innerHTML = ''
    this.start()
  }

  guess(l){
    if (! /^[a-z]$/.test(l)) return
    if (this.word.visible.includes(l)) return
    if (!this.word.answer.toLowerCase().split('').includes(l)) {
      this.errors++;
      this.containerError.innerHTML = `${this.errors} / 6`
      this.containerError.append(this.gameTitle)
    }
    this.word.setVisible(l)
    this.Keyboard.block(l)
    this.gibbet.render(this.errors)
    if (this.errors >= 6){
      this.endGameNoWinner()
    }
    this.checkArr = this.word.answer.split('')
    this.filterArr = this.checkArr.filter(letter => !this.word.visible.includes(letter))

    if (this.filterArr.length === 0){
     this.endGameWinner()
    }
  }

  gameOverHandler(){
    const arr = document.getElementsByClassName('keyboard__button')
    console.log(arr)
    Array.from(arr).forEach(element => {
      element.disabled = true
    })
  }

  endGameNoWinner(){
    this.gameOverHandler()
    this.modalWin.classList.add('show')

    const modalTitle = document.createElement('h3')
    modalTitle.innerText = 'Game over! You have used up all your attempts'

    const modalSubTitle = document.createElement('h5')
    modalSubTitle.innerText = `${this.word.answer}`

    const modalButton = document.createElement('button')
    modalButton.classList.add('modal-button')
    modalButton.innerText = 'Play again'
    this.modalWin.append(modalTitle, modalSubTitle, modalButton)
    modalButton.addEventListener('click', this.restart.bind(this))

    setTimeout(() => {

    }, 300)
  }

  endGameWinner(){
    this.gameOverHandler()
    this.modalWin.classList.add('show')

    const modalTitle = document.createElement('h3')
    modalTitle.innerText = 'Game over! You won this game!'

    const modalSubTitle = document.createElement('h5')
    modalSubTitle.innerText = `${this.word.answer}`

    const modalButton = document.createElement('button')
    modalButton.classList.add('modal-button')
    modalButton.innerText = 'Play again'
    this.modalWin.append(modalTitle, modalSubTitle, modalButton)
    modalButton.addEventListener('click', this.restart.bind(this))


    setTimeout(() => {

    }, 300)
  }

  eventHandler(event){
    const char = event.key.toLowerCase()
    console.log(char, this.position)
    this.guess(char)

    if (!this.position.answer.includes(char)){
      const inccorectEvent = new Event('incorrect')
      document.dispatchEvent(inccorectEvent)
      console.log('sdf')
    }
  }
}


export default Hangman