import "./view.css";
import Garage from '../requests/index';
import {Car} from '../interface/index'

export class ViewHtml {
  mainPage: HTMLElement | null;
  mainContent: HTMLElement | null;
  buttonGaragePage: HTMLButtonElement | null;
  buttonWinnerPage: HTMLButtonElement | null;
  containerCar: HTMLDivElement | null;
  containerGarage: HTMLDivElement | null;
  containerChangeCar: HTMLDivElement | null;
  conButtonFun: HTMLDivElement | null;
  clearMainContent: () => void;
  page: number = 1;
  selectedCar: Car | null;


  constructor(clearMainContent: () => void) {
    this.mainPage = null;
    this.mainContent = null;
    this.buttonGaragePage = null;
    this.buttonWinnerPage = null;
    this.containerCar = null;
    this.containerGarage = null;
    this.containerChangeCar = null;
    this.conButtonFun = null;
    this.clearMainContent = clearMainContent;
    this.createMainPage();
    this.selectedCar = null;
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
    this.garage();
    this.carList();

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
    colorInput.classList.add('input__create-color');

    const buttonCreateCar = document.createElement('button');
    buttonCreateCar.classList.add('button__create-car');
    buttonCreateCar.textContent = 'Create';

    buttonCreateCar.addEventListener('click', () => {
      this.createCar();
  });

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
    colorInputChange.classList.add('color__change-car')
    colorInputChange.setAttribute('type', 'color');

    const buttonChangeCar = document.createElement('button');
    buttonChangeCar.classList.add('button__create-car');
    buttonChangeCar.textContent = 'Change';

    buttonChangeCar.addEventListener('click', () => {
      this.updateCar();
  });

    this.containerChangeCar.append(inputCarChange, colorInputChange, buttonChangeCar);
    this.mainContent?.append(this.containerChangeCar);
  }

  public garage(): void {
    this.containerGarage = document.createElement('div');
    this.containerGarage.classList.add('garage-container');
    this.mainContent?.append(this.containerGarage);
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

    const buttonDeleteCars = document.createElement('button');
    buttonDeleteCars.classList.add('button-delete');
    buttonDeleteCars.textContent = 'Delete Cars';

    //event
    buttonDeleteCars.addEventListener('click', () => {
      this.deleteCar();
  });

    this.conButtonFun.append(buttonRace, buttonReset, buttonGenerateCars, buttonDeleteCars);
    this.mainContent?.append(this.conButtonFun);

  }

  //Get method
  public carList() {
    const list = Garage.getCars(this.page);
    list.then(data => {
      this.containerGarage ? this.containerGarage.innerHTML = '' : false;
      data.map((car: Car) => {
        const lot = document.createElement('div');
        lot.classList.add('car');
        lot.style.backgroundColor = car.color;

        const nameCar = document.createElement('div');
        nameCar.textContent = `Name: ${car.name}`;

        const colorCar = document.createElement('div');
        colorCar.textContent = `Color: ${car.color}`;

        const selectButton = document.createElement('button');
        selectButton.classList.add('select-button');
        selectButton.textContent = 'Select';
        selectButton.addEventListener('click', () => {
          this.selectedCar = car;
          this.highlightChooseCar(lot);
        })

        lot.append(nameCar);
        lot.append(colorCar);
        lot.append(selectButton);

        this.containerGarage ? this.containerGarage.appendChild(lot) : false;
      })
    });
  }

  highlightChooseCar(lot: HTMLDivElement){

    const deletehighlight = document.querySelectorAll('.car');
    deletehighlight.forEach((elem: Element) => {
      elem.classList.remove('selected')
    });

    lot.classList.add('selected')
  }

  //Update method
  public async updateCar(){
    if (this.selectedCar) {
      try {
        const newName = (document.querySelector('.input__change-car') as HTMLInputElement).value;
        const newColor = (document.querySelector('.color__change-car') as HTMLInputElement).value;

        const response = await Garage.updateCars(this.selectedCar.id, newName, newColor);
        console.log('Обновлены:', response);
        this.selectedCar.name = newName;
        this.selectedCar.color = newColor;
        this.carList();
      } catch (error) {
        console.error('Ошибка:', error);
      }
    }
  }

  //Create method
  public async createCar(){
    try {
      const createCarName = (document.querySelector('.input__create-car') as HTMLInputElement).value;
      const createCarColor = (document.querySelector('.input__create-color') as HTMLInputElement).value;
      const response = await Garage.createCars(createCarName, createCarColor);

      console.log('Создана:', response);
      this.carList()
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }


  //Delete method
  public async deleteCar(){
    if (this.selectedCar) {
    try {
      const response = await Garage.deleteCars(this.selectedCar.id);
      console.log('Удалена:', response);

      this.carList();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}

  public garagePage(): void {
    this.clearMainContent();
    this.generateCar();
    this.changeCar();
    this.generateButtonFunctional();
    this.garage();
    this.carList();
  }

  public winnerPage(): void {
    this.clearMainContent()
  }
}

