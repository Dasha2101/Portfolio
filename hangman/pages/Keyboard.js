class Keyboard {
  constructor(position){
    this.buttonContainer = null
    this.position = position
    // this.letter = letter
    // this.answer = answer


    this.init()
  }

  init(){
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('container__button')
    this.buttonContainer = buttonContainer
    this.keyBoard()
  }

  keyBoard(){
    for (let i = 97; i <= 122; i++){
      const keyboardButton = document.createElement('button')
      keyboardButton.innerText = String.fromCharCode(i);
      keyboardButton.classList.add('keyboard__button')
      this.buttonContainer.append(keyboardButton)
      keyboardButton.addEventListener('click', this.clickHandler.bind(this))
    }
  }


  clickHandler(event){
    const target = event.target
    console.log(target.innerText)

    if(!this.position.answer.includes(target.innerText)){
      const inccorectEvent = new Event('incorrect')
      document.dispatchEvent(inccorectEvent)
    } else{
        const indexes = []
        this.position.letter.classList.remove('game__letters')

    }
  }

  showHTML(){
    return this.buttonContainer
  }



}

export default Keyboard