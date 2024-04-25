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
    this.Chut = new Chut(this.navigateTo.bind(this));

    this.chutContainer = null;
    this.appContainer = null;
    this.formContainer = null;
    this.currentComponent = sessionStorage.getItem('page') || 'authorization';

    this.init();
  }

  public async init() {
    this.appContainer = document.createElement('div');
    this.appContainer.classList.add('app-container');
    this.start();
  }

  public async start() {
    const formContainer = await this.Authorization.showHtml();
    this.formContainer = formContainer;

    // const chutContainer = await this.Chut.showHTML();
    // this.chutContainer = chutContainer;
    this.renderComponent();
    if (this.appContainer) this.parent.append(this.appContainer);
  }

  public renderComponent() {
    if (this.appContainer) {
      this.appContainer.innerHTML = '';
    }

    const mainTitle: HTMLElement = document.createElement('h1');
    mainTitle.classList.add('main-title');
    mainTitle.textContent = 'Fun Chut';

    if (this.currentComponent === 'authorization') {
      if (this.formContainer) this.appContainer?.append(this.formContainer);
      this.appContainer?.prepend(mainTitle);
    } else if (this.currentComponent === 'chut') {
      if (this.chutContainer) this.appContainer?.append(this.chutContainer);
    }
  }

  public async navigateTo(component: string) {
    if (component === 'chut') {
      const chutContainer = await this.Chut.showHTML();
      this.chutContainer = chutContainer;
    }
    this.currentComponent = component;
    this.renderComponent();
  }
}

export default App;
