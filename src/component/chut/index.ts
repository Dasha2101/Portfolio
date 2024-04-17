class Chut {
  chutContainer: HTMLDivElement | null
  constructor() {
    this.chutContainer = null




    this.init();

  }

  init() {
    const chutContainer = document.createElement('div');
    chutContainer.classList.add("chut-container");
    this.chutContainer = chutContainer
    this.generateChut()
  }

  generateChut() {
    const chutTitle = document.createElement("h1");
    chutTitle.innerText = 'Fun Chut';

    this.chutContainer?.append(chutTitle);

  }

  showHTML() {
    return this.chutContainer;
  }
}

export default Chut;