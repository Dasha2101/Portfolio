import { ViewHtml } from "../viewHtml/view";
import { GenerateCar } from "../generateCar/generateFunc/index";

class ConnectMain {
  parent: HTMLElement;
  viewHtml: ViewHtml;
  generateCar: GenerateCar
  tableContainer: HTMLElement | null;

  constructor(parent: HTMLElement) {
    this.parent = parent;
    this.tableContainer = null;
    this.generateCar = new GenerateCar()
    this.viewHtml = new ViewHtml(this.clearMainContent.bind(this), this.generateCar)

    this.init()
    this.tableContainer = document.createElement('div');
    this.parent.append(this.tableContainer);
  }

  public async init() {
    try {
      const mainPage: HTMLElement = this.viewHtml.createMainPage();
      this.parent.append(mainPage);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }


  clearMainContent() {
    if (this.viewHtml && this.viewHtml.mainContent) {
      this.viewHtml.mainContent.innerHTML = '';
    }

    if (this.viewHtml && this.viewHtml.changeContent) {
      this.viewHtml.changeContent.innerHTML = '';
    }
  }
}

export default ConnectMain;