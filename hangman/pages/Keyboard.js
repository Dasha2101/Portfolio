class Keyboard {
  constructor(handler){
    this.buttonContainer = null
    this.handler = handler
    this.blocked = []

    this.init()
  }

  init(){
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('container__button')
    this.buttonContainer = buttonContainer
    this.keyBoard()
  }

  resetBlocked(){
    this.blocked = []
  }

  block(letter){
    this.blocked.push(letter);
    this.keyBoard()
  }

  keyBoard(){
    this.buttonContainer.innerHTML = ''
    for (let i = 97; i <= 122; i++){
      const keyboardButton = document.createElement('button')
      keyboardButton.innerText = String.fromCharCode(i);
      keyboardButton.classList.add('keyboard__button')
      if (this.blocked.includes(keyboardButton.innerText)){
        keyboardButton.disabled = true;
      }
      this.buttonContainer.append(keyboardButton)
      keyboardButton.addEventListener('click', this.clickHandler.bind(this))
    }
  }

  clickHandler(event){
    const target = event.target
    console.log(target.innerText)

    this.handler(target.innerText)
  }

  showHTML(){
    return this.buttonContainer
  }

//   gameOverHandler(){
//     const arr = document.getElementsByClassName('keyboard__button')
//     arr.split('').forEach(element => {
//       element.disabled = true
//     })
// }
}

export default Keyboard