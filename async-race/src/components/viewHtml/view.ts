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
  pageNumber: HTMLSpanElement | null;
  btnNext: HTMLButtonElement | null;
  btnPrevious: HTMLButtonElement | null;


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
    this.pageNumber = null;
    this.btnNext = null;
    this.btnPrevious = null;
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
    this.createPagination();

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

    this.conButtonFun.append(buttonRace, buttonReset, buttonGenerateCars);
    this.mainContent?.append(this.conButtonFun);

  }

  //Get method
  public carList() {
    const limit = 7;
    const list = Garage.getCars(this.page, limit);
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
        selectButton.textContent = 'Update';

        const buttonDeleteCars = document.createElement('button');
        buttonDeleteCars.classList.add('button-delete');
        buttonDeleteCars.textContent = 'Delete Cars';

        //event
        selectButton.addEventListener('click', () => {
          this.selectedCar = car;
          this.highlightChooseCar(lot);
        })
        buttonDeleteCars.addEventListener('click', () => {
          this.selectedCar = car;
          this.deleteCar();
      });

        lot.append(nameCar, colorCar, selectButton, buttonDeleteCars)

        this.containerGarage ? this.containerGarage.appendChild(lot) : false;
      })
    });
  }

  //Update method
  public async updateCar(){
    if (this.selectedCar) {
      try {
        const newName = (document.querySelector('.input__change-car') as HTMLInputElement).value;
        const newColor = (document.querySelector('.color__change-car') as HTMLInputElement).value;

        const response = await Garage.updateCars(
          this.selectedCar.id,
          newName !== "" ? newName : null,
          newColor !== "" ? newColor : null,
          this.selectedCar.name,
          this.selectedCar.color
      );
        console.log('Обновлены:', response);

        if (newName !== "") {
          this.selectedCar.name = newName;
        }
        if (newColor !== "") {
          this.selectedCar.color = newColor;
        }
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
      console.log(`Удалена:`, response);
      this.carList();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}

//pagination
public createPagination() {
  const containerPagination: HTMLDivElement = document.createElement('div');
  containerPagination.classList.add('pagination');

  const btnPreviousPage: HTMLButtonElement = document.createElement('button');
  btnPreviousPage.classList.add('button_previous-page');
  btnPreviousPage.disabled = this.page === 1;
  btnPreviousPage.textContent = 'Previous page';
  this.btnPrevious = btnPreviousPage;

  const btnNextPage: HTMLButtonElement = document.createElement('button');
  btnNextPage.classList.add('button_next-page');
  btnNextPage.textContent = 'Next Page';
  this.btnNext = btnNextPage;

  const pageNum: HTMLSpanElement = document.createElement('span');
  pageNum.textContent = `Page ${this.page}`;
  this.pageNumber = pageNum;
  //event
  btnNextPage.addEventListener('click', () => this.nextPage());
  this.btnPrevious.addEventListener('click', () => this.previousPage());


  containerPagination.append(this.btnPrevious, pageNum, this.btnNext);
  this.mainContent?.appendChild(containerPagination);
}

public async nextPage() {
  try {
    const limit = 7;
    const list = await Garage.getCars(this.page + 1, limit);
    if (list.length > 0) {
      this.page++;
      this.carList();
      this.updatePageNumber();
      this.btnPrevious?.removeAttribute('disabled');
      if (list.length < limit) {
        this.btnNext?.setAttribute('disabled', 'true');
      }
    } else {
      this.btnNext?.setAttribute('disabled', 'true');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

public async previousPage(){
  try {
    if (this.page > 1) {
      this.page--;
      this.carList();
      this.updatePageNumber();
      const limit = 7;
      const list = await Garage.getCars(this.page, limit);
      if (this.page === 1) {
        this.btnPrevious?.setAttribute('disabled', 'true');
      }
      if (list.length as number === limit) {
        this.btnNext?.removeAttribute('disabled');
      }
    }
      if (this.page === 1) {
        this.btnPrevious?.setAttribute('disabled', 'true');
      }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

updatePageNumber(){
  if (this.pageNumber) {
    this.pageNumber.textContent = `Page ${this.page}`;
  }
}

highlightChooseCar(lot: HTMLDivElement){

  const deletehighlight = document.querySelectorAll('.car');
  deletehighlight.forEach((elem: Element) => {
    elem.classList.remove('selected')
  });

  lot.classList.add('selected')
}


  public garagePage(): void {
    this.clearMainContent();
    this.generateCar();
    this.changeCar();
    this.generateButtonFunctional();
    this.garage();
    this.carList();
    this.createPagination();
  }

  public winnerPage(): void {
    this.clearMainContent()
  }
}

