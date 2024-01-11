class Questions {
  constructor(questions, position){
    this.position = position
    this.questions = questions
    this.question = null
    this.answer = null

    this.init()
  }

init(){
  this.question = document.createElement('h5')
  this.question.classList.add('game__question')

  this.answer = document.createElement('div')
  this.answer.classList.add('game__answer')


}

restartGame(){
  const question = this.question[0]
  this.position.answer = question.answer

  this.question.innerHTML = question.question
  question.answer.split('').forEach(e => {
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

showRandom(){
  
}

}



export default Questions