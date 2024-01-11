class Gibbet {
  constructor() {
    this.scorer = 0
    this.gibbet = null

    this.init()
  }

init() {
  const gibbetContainer = document.createElement('div')
  gibbetContainer.classList.add('gibbet__container');

  const gibbet = document.createElement('h3')
  gibbet.classList.add('gibbet__game')
  gibbet.innerHTML = this.scorer

  this.gibbet = gibbet

  this.gibbetBlock()

  document.addEventListener('incorrect', this.incorrectAnswerEvent.bind(this))

}

//gibbetBlock
gibbetBlock(gibbetContainer){
  let boxGibbet = document.createElement('div');
  boxGibbet.classList.add('gibbet-box');

  let imgGibbet = document.createElement('img');
  imgGibbet.classList.add('gibbet-box__img');
  imgGibbet.src = '../assets/gallows.svg'

  let gibbetTitle = document.createElement('h1');
  gibbetTitle.classList.add('primary-title', 'gibbet-box__title');
  gibbetTitle.innerText = 'Hangman Game';

  boxGibbet.append(imgGibbet, gibbetTitle)
  gibbetContainer.append(boxGibbet)
}

incorrectAnswerEvent(){
  this.scorer++
  this.gibbet.innerHTML = this.scorer
}

showInHTML(){
  return this.gibbet
}

}

export default Gibbet