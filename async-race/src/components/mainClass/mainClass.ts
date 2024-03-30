import { ViewHtml } from "../viewHtml/view";
import { GenerateCar } from "../generateCar/generateFunc/index";
class ConnectMain {
  parent: HTMLElement;
  viewHtml: ViewHtml;
  generateCar: GenerateCar

  constructor(parent: HTMLElement){
    this.parent = parent;
    this.generateCar = new GenerateCar()
    this.viewHtml = new ViewHtml(this.clearMainContent.bind(this), this.generateCar)

    this.init()
  }

  public async init(): Promise<void> {
    try {
      const mainPage = this.viewHtml.createMainPage();
      this.parent.append(mainPage);
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }

    }

  }

  clearMainContent(): void {
    if (this.viewHtml && this.viewHtml.mainContent) {
      this.viewHtml.mainContent.innerHTML = '';
    }
  }
}

export default ConnectMain;