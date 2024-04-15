import Authorization from "../authorization";


class App {
  appContainer: HTMLDivElement | null;
  formContainer: HTMLDivElement | null;
  Authorization: Authorization;
  parent: HTMLElement;
  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.Authorization = new Authorization();

    this.appContainer = null
    this.formContainer = null;

    this.init();
  }

  public init() {
    this.appContainer = document.createElement('div');
    this.appContainer.classList.add('app-container');
    this.start();
  }

  public start() {
    const mainTitle: HTMLElement = document.createElement('h1');
    mainTitle.classList.add('main-title');
    mainTitle.textContent = 'Fun Chut';

    this.formContainer = this.Authorization.showHtml();

    if (this.formContainer) this.appContainer?.append(mainTitle, this.formContainer)
    if (this.appContainer) this.parent.append(this.appContainer);
  }
}

export default App;