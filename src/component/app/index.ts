import Authorization from '../authorization';
import Chut from '../chut';

class App {
  appContainer: HTMLDivElement | null;
  formContainer: HTMLDivElement | null;
  Authorization: Authorization;
  Chut: Chut;
  parent: HTMLElement;
  currentComponent: string;
  chutContainer: HTMLDivElement | null;
  constructor(parent: HTMLElement) {
    this.parent = parent;

    this.Authorization = new Authorization(this.navigateTo.bind(this));
    this.Chut = new Chut;

    this.chutContainer = null;
    this.appContainer = null;
    this.formContainer = null;
    this.currentComponent = 'authorization';

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

    const formContainer= this.Authorization.showHtml()
    this.formContainer = formContainer

    const chutContainer = this.Chut.showHTML();
    this.chutContainer = chutContainer;
    this.renderComponent();
    if (this.formContainer) this.appContainer?.prepend(mainTitle);
    if (this.appContainer) this.parent.append(this.appContainer);
  }

  public renderComponent() {
    if (this.appContainer) {
      this.appContainer.innerHTML = '';
    } if (this.currentComponent === 'authorization') {
      if (this.formContainer) this.appContainer?.append(this.formContainer);
    } else if (this.currentComponent === 'chut') {
      if (this.chutContainer) this.appContainer?.append(this.chutContainer);
    }
  }

  public navigateTo(component: string) {
    this.currentComponent = component;
    this.renderComponent();
  }


}

export default App;
