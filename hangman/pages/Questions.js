// class Questions {
//   constructor(data, position){
//     this.position = position
//     this.data = data
//     this.question = null
//     this.answer = null
//     this.letter = null
//     this.init()
//   }

// init(){
//   this.question = document.createElement('h5')
//   this.question.classList.add('game__question')

//   this.answer = document.createElement('div')
//   this.answer.classList.add('game__answer')

//   this.restartGame()

// }

// restartGame(){
//   const data = this.data[Math.floor(Math.random() * this.data.length)]
//   this.position.answer = data.answer

//   this.question.innerHTML = data.question
//   data.answer.split('').forEach((e, index) => {
//     const containerLetter = document.createElement('div')
//     containerLetter.classList.add('container__letter')

//     const letter = document.createElement('h5')
//     letter.classList.add('game__letters')
//     letter.textContent = e

//     containerLetter.append(letter)
//     this.position.letter = letter


//     this.answer.append(containerLetter)
//   });
// }

// showHTML(){
//   const questContainer = document.createElement('div')
//   questContainer.classList.add('quest__container')
//   questContainer.append(this.question, this.answer)

//   return questContainer
// }

// }



// export default Questions