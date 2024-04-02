import { ViewHtml } from "../viewHtml/view";
import { GenerateCar } from "../generateCar/generateFunc/index";
import { Winner } from "../winners/winnerPage";
class ConnectMain {
  parent: HTMLElement;
  viewHtml: ViewHtml;
  generateCar: GenerateCar
  winner: Winner

  constructor(parent: HTMLElement){
    this.parent = parent;
    this.generateCar = new GenerateCar()
    this.winner = new Winner();
    this.viewHtml = new ViewHtml(this.clearMainContent.bind(this), this.generateCar, this.winner)

    this.init()
  }

  public async init() {
    try {
        const mainPage = this.viewHtml.createMainPage();
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