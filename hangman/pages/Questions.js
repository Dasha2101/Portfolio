class Questions {
  constructor(data, position){
    this.position = position
    this.data = data
    this.question = null
    this.answer = null
    
    this.init()
  }

init(){
  this.question = document.createElement('h5')
  this.question.classList.add('game__question')

  this.answer = document.createElement('div')
  this.answer.classList.add('game__answer')

  this.restartGame()

}

restartGame(){
  const data = this.data[Math.floor(Math.random() * this.data.length)]
  this.position.answer = data.answer

  this.question.innerHTML = data.question
  data.answer.split('').forEach(e => {
    const letter = document.createElement('h5')
    letter.classList.add('game__letters')

    this.answer.append(letter)
  });
}

showHTML(){
  const questContainer = document.createElement('div')
  questContainer.append(this.question, this.answer)

  return questContainer
}

}



export default Questions