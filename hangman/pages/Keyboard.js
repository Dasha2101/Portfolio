class Keyboard {
  constructor(){
    this.buttonContainer = null

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
    }
  }

  showHTML(){
    return this.buttonContainer
  }



}

export default Keyboard