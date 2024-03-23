import "./view.css";
export class ViewHtml {
  mainPage: HTMLElement | null;
  mainContent: HTMLElement | null;
  buttonGaragePage: HTMLButtonElement | null;
  buttonWinnerPage: HTMLButtonElement | null;
  containerCar: HTMLDivElement | null;
  containerChangeCar: HTMLDivElement | null;
  conButtonFun: HTMLDivElement | null;
  clearMainContent: () => void;


  constructor(clearMainContent: () => void) {
    this.mainPage = null;
    this.mainContent = null;
    this.buttonGaragePage = null;
    this.buttonWinnerPage = null;
    this.containerCar = null;
    this.containerChangeCar = null;
    this.conButtonFun = null;
    this.clearMainContent = clearMainContent;
    this.createMainPage();
  }

  createMainPage(): HTMLElement{
    const mainPage = document.createElement('div');
    mainPage.classList.add('main__page')
    this.mainPage = mainPage;

    this.createHeader();

    const mainContent = document.createElement('div')
    mainContent.classList.add('main__content')
    this.mainContent = mainContent;

    this.generateCar();
    this.changeCar();
    this.generateButtonFunctional();

    this.mainPage.append(this.mainContent);
    return mainPage;
  }

  createHeader(): void{
    const header = document.createElement('header');
    header.classList.add('header-content');

    const buttonGaragePage = document.createElement('button');
    buttonGaragePage.classList.add('header__button-garage');
    buttonGaragePage.textContent = 'Garage';

    const buttonWinnerPage = document.createElement('button');
    buttonWinnerPage.classList.add('header__button-winner')
    buttonWinnerPage.textContent = 'Winner';

    buttonGaragePage.addEventListener("click", this.garagePage.bind(this))
    buttonWinnerPage.addEventListener("click", this.winnerPage.bind(this))

    header.append(buttonGaragePage, buttonWinnerPage);

    this.buttonGaragePage = buttonGaragePage;
    this.buttonWinnerPage = buttonWinnerPage;
    this.mainPage?.append(header)

  }

  public generateCar(): void {
    const containerCar = document.createElement('div');
    containerCar.classList.add('conteiner__create-car');
    this.containerCar = containerCar

    const containerAddCar = document.createElement('div');
    containerAddCar.classList.add('conteiner__add-car');

    const inputCarCreate = document.createElement('input');
    inputCarCreate.classList.add('input__create-car');

    const colorInput = document.createElement('input');
    colorInput.setAttribute('type', 'color');

    const buttonCreateCar = document.createElement('button');
    buttonCreateCar.classList.add('button__create-car');
    buttonCreateCar.textContent = 'Create';

    containerAddCar.append(inputCarCreate, colorInput, buttonCreateCar);
    this.containerCar.append(containerAddCar);
    this.mainContent?.append(this.containerCar);
  }

  public changeCar(): void {
    const containerChangeCar = document.createElement('div');
    containerChangeCar.classList.add('conteiner__change-car');
    this.containerChangeCar = containerChangeCar;

    const inputCarChange = document.createElement('input');
    inputCarChange.classList.add('input__change-car');

    const colorInputChange = document.createElement('input');
    colorInputChange.setAttribute('type', 'color');

    const buttonChangeCar = document.createElement('button');
    buttonChangeCar.classList.add('button__create-car');
    buttonChangeCar.textContent = 'Change';

    this.containerChangeCar.append(inputCarChange, colorInputChange, buttonChangeCar);
    this.mainContent?.append(this.containerChangeCar);
  }


  public generateButtonFunctional(): void {
    const containerButtonFunctional = document.createElement('div');
    containerButtonFunctional.classList.add('conteiner__button-fun');
    this.conButtonFun = containerButtonFunctional;

    const buttonRace = document.createElement('button');
    buttonRace.classList.add('button-rave');
    buttonRace.textContent = 'Race';

    const buttonReset = document.createElement('button');
    buttonReset.classList.add('button-reset');
    buttonReset.textContent = 'Reset';

    const buttonGenerateCars = document.createElement('button');
    buttonGenerateCars.classList.add('button-generate');
    buttonGenerateCars.textContent = 'Generate Cars';

    this.conButtonFun.append(buttonRace, buttonReset, buttonGenerateCars);
    this.mainContent?.append(this.conButtonFun);

  }

    public garagePage(): void {
    this.clearMainContent();
    this.generateCar();
    this.changeCar();
    this.generateButtonFunctional();

  }

  public winnerPage(): void {
    this.clearMainContent()
  }
}

