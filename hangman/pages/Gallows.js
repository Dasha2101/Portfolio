class Gibbet {
  constructor() {
    this.scorer = 0
    this.gibbet = null
    this.showScor = null
    this.init()
  }

init() {
  const gibbetContainer = document.createElement('div')
  gibbetContainer.classList.add('gibbet__container');

  const gibbet = document.createElement('div')
  gibbet.classList.add('gibbet__game')

  const showScor = document.createElement('h3')
  this.showScor = showScor
  this.showScor.innerHTML = this.scorer
  gibbetContainer.append(showScor)
  this.gibbetBlock(gibbetContainer)
  this.gibbet = gibbetContainer

  document.addEventListener('incorrect', () => {this.incorrectAnswerEvent()})

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
  this.showScor.innerHTML = this.scorer
  console.log(this.scorer)
}

showInHTML(){
  return this.gibbet

}

}

export default Gibbet