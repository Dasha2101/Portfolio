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
    letters.map((l) => {
      if (this.visible.includes(l)){
        const letter = document.createElement('div')
        letter.classList.add('letter')
        letter.innerHTML = l;
        this.container.append(letter)
      } else {
        const letter = document.createElement('div')
        letter.classList.add('letter')
        letter.innerHTML = '_'
        this.container.append(letter)
      }
    })
    return this.container
  }
}

export default Word