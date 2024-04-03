import "./view.css";
import Garage from '../requests/index';
import {Car} from '../interface/index'
import { GenerateCar } from "../generateCar/generateFunc";
import WinTable from "../winners/requestWinner";
// import { Winner } from "../winners/winnerPage";

export class ViewHtml {
  mainPage: HTMLElement | null;
  mainContent: HTMLElement | null;
  buttonGaragePage: HTMLButtonElement | null;
  buttonWinnerPage: HTMLButtonElement | null;
  containerCar: HTMLDivElement | null;
  containerChangeCar: HTMLDivElement | null;
  conButtonFun: HTMLDivElement | null;
  clearMainContent: () => void;
  page: number = 0;
  pageWin: number = 0;
  selectedCar: Car | null;
  pageNumber: HTMLSpanElement | null;
  pageNumberWin: HTMLSpanElement | null;
  btnNext: HTMLButtonElement | null;
  btnPrevious: HTMLButtonElement | null;
  btnNextWin: HTMLButtonElement | null;
  btnPreviousWin: HTMLButtonElement | null;
  carGenerator: GenerateCar;
  // winnerTable: Winner;
  intervals:  NodeJS.Timeout[];
  startBtn: HTMLButtonElement | null;
  stopBtn: HTMLButtonElement | null ;
  data: Car[];
  changeContent: HTMLElement | null
  winnerContainer: HTMLElement | null;
  raceFinish: boolean = false;

  constructor(clearMainContent: () => void, carGenerator: GenerateCar) {
    this.mainPage = null;
    this.mainContent = null;
    this.changeContent = null
    this.buttonGaragePage = null;
    this.buttonWinnerPage = null;
    this.containerCar = null;
    this.containerChangeCar = null;
    this.conButtonFun = null;
    this.clearMainContent = clearMainContent;
    this.createMainPage();
    this.selectedCar = null;
    this.pageNumber = null;
    this.pageNumberWin = null;
    this.btnNext = null;
    this.btnPrevious = null;
    this.btnNextWin = null;
    this.btnPreviousWin = null;
    this.carGenerator = carGenerator;
    // this.winnerTable = winnerTable;
    this.intervals = [];
    this.startBtn = null;
    this.stopBtn = null;
    this.winnerContainer = null;
    this.data = [];
    this.carList();
    this.createPagination();
  }

  createMainPage(): HTMLElement{
    const mainPage = document.createElement('div');
    mainPage.classList.add('main__page')
    this.mainPage = mainPage;

    this.createHeader();

    const mainContent = document.createElement('div')
    mainContent.classList.add('main__content')
    this.mainContent = mainContent;

    const changeContent = document.createElement('div');
    changeContent.classList.add('change__content');
    this.changeContent = changeContent;


    this.generateCar();
    this.changeCar();
    this.generateButtonFunctional();

    const totalCar = document.createElement('div');
    totalCar.classList.add('totalCar');

    const totalCountWin = document.createElement('div');
    totalCountWin.classList.add('totalWin');

    const containerCar = document.createElement('div');
    containerCar.classList.add('container-car');
    this.mainPage.append(this.changeContent, this.mainContent);
    return mainPage;
  }

  createHeader(): void{
    const header = document.createElement('header');
    header.classList.add('header-content');

    const buttonGaragePage = document.createElement('button');
    buttonGaragePage.classList.add('header__button');
    buttonGaragePage.textContent = 'Garage';

    const buttonWinnerPage = document.createElement('button');
    buttonWinnerPage.classList.add('header__button')
    buttonWinnerPage.textContent = 'Winner';

    buttonGaragePage.addEventListener("click", this.garagePage.bind(this))
    buttonWinnerPage.addEventListener("click", this.winnerPage.bind(this))

    header.append(buttonGaragePage, buttonWinnerPage);

    this.buttonGaragePage = buttonGaragePage;
    this.buttonWinnerPage = buttonWinnerPage;
    this.mainPage?.append(header)

  }

//   public getMainContent(): HTMLElement | null {
//     return this.mainContent;
// }

public generateCar(): void {
  const containerCar = document.createElement('div');
  containerCar.classList.add('conteiner__create-car');
  this.containerCar = containerCar

  const containerAddCar = document.createElement('div');
  containerAddCar.classList.add('conteiner__add-car');

  const inputCarCreate = document.createElement('input');
  inputCarCreate.classList.add('input__create-car');

  //saved in ls
  const savedInputValue = localStorage.getItem('inputCarValue');
  if (savedInputValue) {
    inputCarCreate.value = savedInputValue;
  }

  inputCarCreate.addEventListener('input', () => {
    localStorage.setItem('inputCarValue', inputCarCreate.value)
  });

  const colorInput = document.createElement('input');
  colorInput.setAttribute('type', 'color');
  colorInput.classList.add('input__create-color');

   //saved in ls
  const savedColorInput = localStorage.getItem('colorInputValue');
  if (savedColorInput) {
    colorInput.value = savedColorInput;
  }

  colorInput.addEventListener('input', () => {
    localStorage.setItem('colorInputValue', colorInput.value);
  });


  const buttonCreateCar = document.createElement('button');
  buttonCreateCar.classList.add('button__create-car');
  buttonCreateCar.textContent = 'Create';

  buttonCreateCar.addEventListener('click', () => {
    this.createCar();
    inputCarCreate.value = ''
});

  const namePage = document.createElement('h1');
  namePage.textContent = 'Garage';

  containerAddCar.append(inputCarCreate, colorInput, buttonCreateCar);
  this.containerCar.append(containerAddCar);
  this.changeContent?.append(namePage, this.containerCar);
}
public changeCar(): void {
  const containerChangeCar = document.createElement('div');
  containerChangeCar.classList.add('conteiner__change-car');
  this.containerChangeCar = containerChangeCar;

  const inputCarChange = document.createElement('input');
  inputCarChange.classList.add('input__change-car');


  //saved in ls
  const savedInputValueChange = localStorage.getItem('inputCarValueChange');
  if (savedInputValueChange) {
    inputCarChange.value = savedInputValueChange;
  }

  inputCarChange.addEventListener('input', () => {
    localStorage.setItem('inputCarValueChange', inputCarChange.value)
  });

  const colorInputChange = document.createElement('input');
  colorInputChange.classList.add('color__change-car')
  colorInputChange.setAttribute('type', 'color');

  //saved in ls

  const savedInputColorChange = localStorage.getItem('inputCarColorChange');
  if (savedInputColorChange) {
    colorInputChange.value = savedInputColorChange;
  }

  colorInputChange.addEventListener('input', () => {
    localStorage.setItem('inputCarColorChange', colorInputChange.value)
  });

  const buttonChangeCar = document.createElement('button');
  buttonChangeCar.classList.add('button__create-car');
  buttonChangeCar.textContent = 'Change';

  buttonChangeCar.addEventListener('click', () => {
    this.updateCar();
    inputCarChange.value = ''
});

  this.containerChangeCar.append(inputCarChange, colorInputChange, buttonChangeCar);
  this.changeContent?.append(this.containerChangeCar);
}
  //Get method
  public async carList() {
    const limit = 7;
    try {
      const { totalCount, cars } = await Garage.getCars(this.page, limit);

      let totalCountCar: HTMLElement | null = document.querySelector('.totalCar');
      let containerCar:  HTMLElement | null = document.querySelector('.container-car')

      if (totalCountCar) {
        totalCountCar.remove();
      }
      totalCountCar = document.createElement('div');
      totalCountCar.classList.add('totalCar');
      totalCountCar.textContent = `Total Cars ${totalCount}`
      this.mainContent?.prepend(totalCountCar);

      if (containerCar) {
        containerCar.remove();
      }

      containerCar = document.createElement('div');
      containerCar.classList.add('container-car');

      if (Array.isArray(cars)) {
        this.data = cars;
        cars.forEach((car: Car) => {
        const lot = document.createElement('div');
        lot.classList.add('car');

        const idCar = document.createElement('div');
        idCar.textContent = `ID: ${car.id}`;
        idCar.classList.add('text')

        const nameCar = document.createElement('div');
        nameCar.textContent = `Name: ${car.name}`;
        nameCar.classList.add('text')

        // const markaCar = document.createElement('div');
        // markaCar.textContent = `Color: ${car.brand}`;

        const carDistance = document.createElement('div');
        const distanceDiv = document.createElement('div');
        distanceDiv.classList.add('distance');
        distanceDiv.id = `distance_${car.id}`;

        const carDiv = document.createElement('div');
        carDiv.classList.add('car_image');
        carDiv.id = `car_${car.id}`;

        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" id="carSvg" width="120" height="120" fill="${car.color}" viewBox="0 0 256 256" xml:space="preserve">
        <path d="M212.435 174.994c-13.098 0-23.753-10.655-23.753-23.753s10.655-23.753 23.753-23.753 23.753 10.656 23.753 23.753-10.656 23.753-23.753 23.753zm0-39.076c-8.45 0-15.323 6.874-15.323 15.323s6.873 15.323 15.323 15.323 15.323-6.873 15.323-15.323-6.876-15.323-15.323-15.323zM51.478 174.994c-13.097 0-23.753-10.655-23.753-23.753s10.656-23.753 23.753-23.753 23.753 10.656 23.753 23.753-10.656 23.753-23.753 23.753zm0-39.076c-8.447 0-15.323 6.874-15.323 15.323s6.873 15.323 15.323 15.323 15.323-6.873 15.323-15.323-6.873-15.323-15.323-15.323z"/>
        <path d="M212.438 159.663a8.459 8.459 0 0 1-5.958-2.473 7.806 7.806 0 0 1-1.067-1.262 9.018 9.018 0 0 1-.76-1.464 6.231 6.231 0 0 1-.477-1.573 8.33 8.33 0 0 1-.171-1.66c0-.532.059-1.097.171-1.628.082-.562.253-1.07.478-1.602.194-.505.478-.986.759-1.433.309-.477.674-.899 1.067-1.292.366-.396.815-.734 1.265-1.04.478-.309.955-.562 1.464-.787a10.073 10.073 0 0 1 1.574-.477 8.236 8.236 0 0 1 3.315 0c.534.112 1.04.28 1.577.477.506.225.983.478 1.433.787.478.306.899.644 1.292 1.04.394.393.731.815 1.04 1.292.31.447.562.928.787 1.433.194.532.365 1.04.478 1.602.112.531.168 1.096.168 1.627 0 .562-.056 1.099-.168 1.66a10.581 10.581 0 0 1-.478 1.574c-.225.506-.478.984-.787 1.464-.309.447-.646.897-1.04 1.262a7.64 7.64 0 0 1-1.292 1.068c-.45.284-.927.562-1.433.761-.534.225-1.04.394-1.577.478a8.553 8.553 0 0 1-1.66.166zM51.48 159.663a8.299 8.299 0 0 1-1.657-.169c-.534-.112-1.068-.253-1.574-.477-.506-.197-.983-.478-1.46-.762a8.718 8.718 0 0 1-1.265-1.068 8.47 8.47 0 0 1-2.473-5.957c0-.53.056-1.096.168-1.627.113-.534.253-1.07.478-1.576.197-.531.478-1.012.759-1.461.309-.478.674-.9 1.068-1.293a8.515 8.515 0 0 1 1.264-1.04c.478-.309.955-.562 1.461-.787.506-.196 1.04-.365 1.574-.477a8.098 8.098 0 0 1 3.288 0c.562.112 1.067.28 1.601.477.506.225.984.478 1.433.787.478.307.9.644 1.293 1.04.393.393.73.815 1.04 1.293.309.446.562.927.786 1.46.197.507.366 1.04.478 1.577.113.531.169 1.096.169 1.627 0 2.22-.9 4.412-2.473 5.957a7.64 7.64 0 0 1-1.293 1.068c-.45.284-.927.562-1.433.762-.506.224-1.04.365-1.601.477a7.83 7.83 0 0 1-1.63.169z"/>
        <rect id="carSvg"/>
        <path d="m225.53 116.243-41.322-10.597-19.695-11.428a100.079 100.079 0 0 0-50.164-13.502H84.625c-19.176 0-37.494 7.168-51.578 20.184a10.864 10.864 0 0 1-7.401 2.895h-6.29c-7.637 0-14.086 5.718-15.002 13.302l-2.846 23.64a13.903 13.903 0 0 0 9.09 14.787l12.923 4.693a29.276 29.276 0 0 1-1.416-8.978c0-16.197 13.176-29.373 29.373-29.373s29.373 13.176 29.373 29.373c0 4.442-1.02 8.64-2.793 12.42h107.797c-1.773-3.78-2.793-7.978-2.793-12.42 0-16.197 13.176-29.373 29.373-29.373s29.373 13.176 29.373 29.373c0 3.875-.773 7.567-2.142 10.956l8.192-1.31a7.621 7.621 0 0 0 6.449-7.559c0-17.486-11.836-32.736-28.778-37.083zM77.1 111.457c-3.673 0-7.003-1.714-9.136-4.7-2.135-2.988-2.678-6.694-1.486-10.167l1.843-5.384c5.291-1.313 10.748-2.057 16.307-2.057h6.46l9.458 22.308H77.1zm82.673 0H109.7l-9.458-22.308h14.106a91.628 91.628 0 0 1 45.932 12.361l12.876 7.469c-4.288 1.613-8.77 2.478-13.384 2.478z"/>
    </svg>`

        carDiv.innerHTML = svgString;
        carDistance.append(distanceDiv, carDiv);
        //button
        const containerBtn = document.createElement('div');
        containerBtn.classList.add('garage__container-btn');

        const selectButton = document.createElement('button');
        selectButton.classList.add('button-car');
        selectButton.textContent = 'Update';

        const buttonDeleteCars = document.createElement('button');
        buttonDeleteCars.classList.add('button-car');
        buttonDeleteCars.textContent = 'Delete Cars';

        const startBtn = document.createElement('button');
        startBtn.classList.add('button-car');
        startBtn.innerText = 'Start';
        startBtn.setAttribute('data-id', car.id.toString());
        startBtn.id = `start-btn_${car.id}`

        const stopBtn = document.createElement('button');
        stopBtn.classList.add('button-car');
        stopBtn.innerText = 'Stop';
        stopBtn.id = `stop-btn_${car.id}`
        stopBtn.disabled = true;

        startBtn.addEventListener('click', async (event: Event) => {
          if (event?.target) {
            const target = event.target as HTMLButtonElement;
            target.disabled = true

            const stopBtn: HTMLElement | null = document.getElementById(`stop-btn_${car.id}`);
            if (stopBtn) (stopBtn as HTMLButtonElement).disabled  = false;
          }
          try {
            const carId = car.id;
            await this.startCar(carId, false);
          } catch (error) {
            console.error('Ошибка при запуске машины:', error);
        }
      });

        stopBtn.addEventListener('click', async (event: Event) => {
          if (event?.target) {
            const target = event.target as HTMLButtonElement;
            target.disabled = true
            const startBtn: HTMLElement | null = document.getElementById(`start-btn_${car.id}`);
            if (startBtn) (startBtn as HTMLButtonElement).disabled  = false;
          }
        try {
          const carId = car.id;
          await this.stopCar(carId);
        } catch (error) {
          console.error('Ошибка при остановке машины:', error);
      }
    });
        containerBtn.append(startBtn, stopBtn, selectButton, buttonDeleteCars)
        //event
        selectButton.addEventListener('click', () => {
          this.selectedCar = car;
          this.highlightChooseCar(lot);
          selectButton.setAttribute('disabled', 'true');
        });
        buttonDeleteCars.addEventListener('click', () => {
          this.selectedCar = car;
          this.deleteCar();
        });

        lot.append(idCar, nameCar,  carDistance, containerBtn);

        if (containerCar) containerCar.append(lot);


        if (this.mainContent && containerCar) {
          this.mainContent.append(containerCar);
        }
    });
  }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}


public generateButtonFunctional(): void {
  const containerButtonFunctional = document.createElement('div');
  containerButtonFunctional.classList.add('conteiner__button-fun');
  this.conButtonFun = containerButtonFunctional;

  const buttonRace = document.createElement('button');
  buttonRace.classList.add('button-fun');
  buttonRace.textContent = 'Race';

  const buttonReset = document.createElement('button');
  buttonReset.classList.add('button-fun');
  buttonReset.textContent = 'Reset';

  const buttonGenerateCars = document.createElement('button');
  buttonGenerateCars.classList.add('button-fun');
  buttonGenerateCars.textContent = 'Generate Cars';

  //event
  buttonRace.addEventListener('click', async () => {
    // this.data = [];
    try {
      const carIds = this.data.map(car => car.id);
      const promises = carIds.map(carId => this.startCar(carId));

      const data = await Promise.all(promises);
      const finishedCars = data.filter(res => res && res.state === 'finished');
      if (finishedCars.length > 0) {
        finishedCars.sort((carA, carB ) => {
        if (carA && carA.time && carB && carB.time)  {
          return carA.time - carB.time;
        }
          return 0;
        });
        const winningCar = finishedCars[0];
        if (winningCar) {
          const winnerData = {
            id: winningCar.carId,
            wins: winningCar.wins + 1,
            time: winningCar.time
          };

          const existingWinner = await WinTable.getWinner(winningCar.carId);
          if (existingWinner && existingWinner?.id) {
            existingWinner.wins += 1;
            existingWinner.time = Math.min(winnerData.time, existingWinner.time);
            winnerData.wins = existingWinner.wins
            await WinTable.updateWinner(existingWinner.id,  winnerData);
        } else {
            await WinTable.createWinner(winnerData);
        }

        this.modalWin({ id: winnerData.id, wins: winnerData.wins, time: winnerData.time });
    }
}
} catch (error) {
console.error('Error occurred during the race:', error);
}
});


  buttonReset.addEventListener('click', async () => {
    const carIds = this.data.map(car => car.id);
    const promises = carIds.map(carIds => this.stopCar(carIds));
    await Promise.all(promises);
  })

  buttonGenerateCars.addEventListener('click',  async () => {
    try {
      const randomCars = this.carGenerator.generateRandomhundredCars();
      await Promise.all(randomCars.map(async (car: Car) => {
        await Garage.createCars(car.name, car.color);
      }));
      await this.carList();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  });
  this.conButtonFun.append(buttonRace, buttonReset, buttonGenerateCars);
  this.changeContent?.append(this.conButtonFun);

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
      const winner =  await WinTable.getWinner(this.selectedCar.id);
      if (winner) {
        await WinTable.deleteWinner(winner.id);
      }
      this.carList();
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }
}


//anim car (start and stop)
public async startCar(carId: number, check: boolean = false){
  console.log(carId)
  try {
    const response = await Garage.startStopCar(carId, 'start');
      const { velocity, distance } = await response.json();
      const visibleWidth = window.innerWidth;
      const sizeSVG = 120 * 2;
      const raceVisible = visibleWidth - sizeSVG;
      const carDistance = document.getElementById(`distance_${carId}`);
      carDistance && (carDistance.style.maxWidth = raceVisible + 'px');
      const carVelocity = velocity / distance * raceVisible;
      let carDriven = 0;
      const drive = Garage.driveMode(carId);
      this.intervals[carId] = setInterval(() => {
        const startBtn: HTMLButtonElement | null = document.querySelector('#start-btn');
        const stopBtn: HTMLButtonElement | null = document.querySelector('#stop-btn')
        if (carDriven >= raceVisible) {
          clearInterval(this.intervals[carId])
          if (startBtn) startBtn.disabled = true;
          if (stopBtn) stopBtn.disabled = false;
        }
        if (check) {
          this.stopCar(carId);
        }
          carDriven += carVelocity * 10;
          carDistance && (carDistance.style.width = carDriven + 'px');
    }, 10);
    const startTime = Date.now();
    const data = await drive;
    clearInterval(this.intervals[carId]);
    const endTime = Date.now();
    console.log(endTime - startTime);
    if (data.status == 'ok') {
      return { state: 'finished', carId: carId, time: endTime - startTime, wins: 0};
    }  else {
      throw new Error('Failed to start the car: ' + response.statusText);
    }
  } catch (error) {
    console.error('Ошибка:', error);
    clearInterval(this.intervals[carId]);
    return { state: 'broken', carId: carId, time: 0, wins: 0};
  }
}

public async stopCar(carId: number) {
  try {
    if (this.intervals[carId]) {
      clearInterval(this.intervals[carId]);
    }
    const response = await Garage.startStopCar(carId, 'stop');
    await new Promise(resolve => setTimeout(resolve, 1000));

    const carElement = document.getElementById(`car_${carId}`) as HTMLElement;
    const carDist = document.getElementById(`distance_${carId}`);
    carDist && (carDist.style.width = '0px');
    carElement.style.transform = 'translateX(0px)';

    console.log(`Вернулась на место:`, response);

  } catch (error) {
    console.error('Ошибка:', error);
  }
}

//pagination
public async createPagination() {
  const limit = 7
  const containerPagination: HTMLDivElement = document.createElement('div');
  containerPagination.classList.add('pagination');

  const savedPageNumber = localStorage.getItem('pageNumberGarage');
  if (savedPageNumber) {
    this.page = parseInt(savedPageNumber);
  } else {
    this.page = 1;
  }

  const btnPreviousPage: HTMLButtonElement = document.createElement('button');
  btnPreviousPage.classList.add('button-page');
  btnPreviousPage.disabled = this.page === 1;
  btnPreviousPage.textContent = 'Previous page';
  this.btnPrevious = btnPreviousPage;

  const btnNextPage: HTMLButtonElement = document.createElement('button');
  btnNextPage.classList.add('button-page');
  btnNextPage.textContent = 'Next Page';
  const { cars } = await Garage.getCars();
  
  btnNextPage.disabled = cars.length <= limit
  console.log(cars.length)

  this.btnNext = btnNextPage;
  // this.btnNext.setAttribute('disabled', 'true');

  const pageNum: HTMLSpanElement = document.createElement('span');
  pageNum.textContent = `Page ${this.page}`;
  this.pageNumber = pageNum;
  // this.btnPrevious.setAttribute('disabled', 'true');
  //event
  btnNextPage.addEventListener('click', () => this.nextPage());
  this.btnPrevious.addEventListener('click', () => this.previousPage());


  containerPagination.append(this.btnPrevious, pageNum, this.btnNext);
  this.changeContent?.append(containerPagination);
}

public async nextPage() {
  try {
    const limit = 7;
    const nextPage = this.page + 1;
    const { cars } = await Garage.getCars(this.page, limit);
      if (cars.length > 0) {
      this.page = nextPage;
      localStorage.setItem('pageNumberGarage', this.page.toString())
      this.carList();
      this.updatePageNumber();
      this.btnPrevious?.removeAttribute('disabled');
      if (cars.length <= limit) {
        console.log(cars.length)
      }
    } else {
      this.btnNext?.removeAttribute('disabled');
    }
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

public async previousPage(){
  try {
    if (this.page > 1) {
      this.page--;
      localStorage.setItem('pageNumberGarage', this.page.toString());
      this.carList();
      this.updatePageNumber();
      const limit = 7;
      const{ cars } = await Garage.getCars(this.page, limit);
      if (this.page === 1) {
        this.btnPrevious?.setAttribute('disabled', 'true');
      }
      if (Array.isArray(cars) && cars.length as number === limit) {
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

modalWin(winner: { id: number, wins: number, time: number }){
  const containerModalWin: HTMLElement = document.createElement('div');
  containerModalWin.classList.add('show-modal');

  const overlay: HTMLElement = document.createElement('div');
  overlay.classList.add('overlay');
  this.mainContent?.appendChild(overlay);
  overlay.style.display = 'block';

  overlay.addEventListener('click', () => {
    containerModalWin.style.display = 'none';
    overlay.style.display = 'none';
  });

  const closeButton: HTMLButtonElement = document.createElement('button');
  closeButton.classList.add('mod__close-button');
  closeButton.textContent = 'Exit'

  const titleWin: HTMLElement = document.createElement('h2');
  titleWin.textContent = 'Race winner';

  const idCar: HTMLElement = document.createElement('p');
  idCar.textContent = `ID: ${winner.id}`;

  const numberWin: HTMLElement = document.createElement('p');
  numberWin.textContent = `Number of wins: ${winner.wins}`;

  const timeInSeconds = (winner.time / 1000).toFixed(2);
  const time: HTMLElement = document.createElement('p');
  time.textContent = `Time: ${timeInSeconds} sec`;

  containerModalWin.append(titleWin, idCar, numberWin, time, closeButton);
  this.mainContent?.append(containerModalWin);

  closeButton.onclick = () => {
    containerModalWin.style.display = 'none';
    overlay.style.display = 'none';
  }
}
  public garagePage(): void {
    this.clearMainContent();
    this.generateCar();
    this.changeCar();
    this.generateButtonFunctional();
    this.carList();
    this.createPagination();
  }

  public async winnerPage() {
    this.clearMainContent();
    this.createWinnerPage();
    this.paginationWin()

  }

  public async createWinnerPage () {
    const limit = 10;
    try {
    const winnerContainer: HTMLElement = document.createElement('div');
    winnerContainer.classList.add('winner-container');

    this.winnerContainer = winnerContainer
    const namePage = document.createElement('h1');
    namePage.textContent = 'Winners';

    //table
    const { winners, totalCount } = await WinTable.getWinners('id', 'ASC', this.pageWin, limit);

    let totalCountWin: HTMLElement | null = document.querySelector('.totalWin');

    if (totalCountWin) {
      totalCountWin.remove();
    }
    totalCountWin = document.createElement('div');
    totalCountWin.classList.add('totalCar');
    totalCountWin.textContent = `Total Winner ${totalCount}`
    this.winnerContainer.prepend(totalCountWin);

    if (winners && winners.length > 0) {
      const table: HTMLTableElement = document.createElement('table');
      const thead: HTMLTableSectionElement = document.createElement('thead');
      const tbody: HTMLTableSectionElement = document.createElement('tbody');

      const headers = ['ID', 'WINS', 'TIME (sec)'];
      const headerRow: HTMLTableRowElement = document.createElement('tr');
      headers.forEach(headerText => {
        const th: HTMLElement = document.createElement('th');
        th.textContent = headerText;
        headerRow.append(th);
      });
      thead.append(headerRow);
      table.append(thead);

      winners.forEach(winner => {
      const row: HTMLTableRowElement = document.createElement('tr');
      const timeInSeconds = (winner.time / 1000).toFixed(2);
      row.innerHTML = `
          <td>${winner.id}</td>
          <td>${winner.wins}</td>
          <td>${timeInSeconds}</td>
      `;
      tbody.append(row);
      });

      table.append(tbody);
      this.winnerContainer.append(namePage, table);
      this.mainContent?.append(winnerContainer);

      } else {
        this.winnerContainer.textContent = 'Нет данных';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  public async paginationWin(){
    const limit = 10;
    const containerForContent = document.createElement('div');
    containerForContent.classList.add('container-content')
    // const numberPage = document.createElement('p');
    // numberPage.textContent = `Page ${this.pageWin}`

    const savedPageNumberWin = localStorage.getItem('pageNumberWin');
    if (savedPageNumberWin) {
      this.pageWin = parseInt(savedPageNumberWin);
    } else {
      this.pageWin = 1;
    }
    const buttonPreviousWin = document.createElement('button');
    buttonPreviousWin.classList.add('button-fun');
    buttonPreviousWin.textContent = 'Previous';
    if (this.pageWin === 1) {
      buttonPreviousWin?.setAttribute('disabled', 'true');
    }
    this.btnPreviousWin = buttonPreviousWin
    const buttonNextWin = document.createElement('button');
    buttonNextWin.classList.add('button-fun');
    buttonNextWin.textContent = 'Next';

    const { winners } =  await WinTable.getWinners('id', 'ASC', this.pageWin, limit);
    buttonNextWin.disabled = winners.length + 1 <= limit
    console.log('winner', winners.length)

    this.btnNextWin = buttonNextWin;

    const pageNum: HTMLSpanElement = document.createElement('span');
    pageNum.textContent = `Page ${this.pageWin}`;
    this.pageNumberWin = pageNum
    //event
    this.btnNextWin.addEventListener('click', () => this.nextPageWin());
    this.btnPreviousWin.addEventListener('click', () => this.previousPageWin());
  
      containerForContent.append(this.btnPreviousWin, pageNum, this.btnNextWin);
      this.winnerContainer?.append(containerForContent)
      if (this.winnerContainer) this.mainContent?.append(this.winnerContainer)

  }

  public async nextPageWin() {
    try {
      const limit = 10;
      const nextPage = this.pageWin + 1;
      const { winners } = await WinTable.getWinners('id', 'ASC', this.pageWin, limit);
      if (winners.length > 0) {
        this.pageWin = nextPage;
        localStorage.setItem('pageNumberWin', this.pageWin.toString())
        this.updatePageNumberWin();
        this.winnerPage()
        this.btnNextWin?.setAttribute('disabled', 'true');
        if (winners.length < limit) {
          console.log('winner', winners)
        }
      } else {
        this.btnNextWin?.setAttribute('disabled', 'true');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  public async previousPageWin(){
    try {
      if (this.pageWin > 1) {
        this.pageWin--;
        localStorage.setItem('pageNumberWin', this.pageWin.toString());
        this.updatePageNumberWin();
        this.winnerPage();
        // document.dispatchEvent(this.updateContentEvent);
        const limit = 7;
        const{ winners } = await WinTable.getWinners('id', 'ASC', this.pageWin, limit);
        if (this.pageWin === 1) {
          this.btnPreviousWin?.setAttribute('disabled', 'true');
        }
        if (Array.isArray(winners) && winners.length as number === limit) {
          this.btnNextWin?.removeAttribute('disabled');
        }
      }
        if (this.pageWin === 1) {
          this.btnPreviousWin?.setAttribute('disabled', 'true');
        }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

updatePageNumberWin(){
  if (this.pageNumberWin) {
    this.pageNumberWin.textContent = `Page ${this.pageWin}`;
  }
}

}