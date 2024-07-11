class Word {
  constructor(word){
    this.question = word.question
    this.answer = word.answer.toLowerCase()
    this.container = document.createElement('div')
    this.visible = [];
  }

  setVisible(letter){
    letter = letter.toLowerCase()
    if (this.visible.includes(letter)){
      return
    }
    this.visible.push(letter)
    this.toHtml()
  }

  toHtml(){

    this.container.innerHTML = ''
    this.container.innerHTML = `<div class="question">${this.question}</div>`
    const letters = this.answer.split('')
    const containerLetter = document.createElement('div')
    containerLetter.classList.add('container__letter')
    letters.map((l) => {
      if (this.visible.includes(l)){
        const letter = document.createElement('div')
        letter.classList.add('letter')
        letter.innerHTML = l;

        containerLetter.append(letter)
        this.container.append(containerLetter)
      } else {
        const letter = document.createElement('div')
        letter.classList.add('letter')
        letter.innerHTML = '__'

        containerLetter.append(letter)
        this.container.append(containerLetter)
      }
    })
    return this.container
  }
}

export default Word