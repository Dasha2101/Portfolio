import { ViewHtml } from "../viewHtml/view";
// import { Header } from "../header/header";
class ConnectMain {
  parent: HTMLElement;
  viewHtml: ViewHtml;
  // header: Header | null;


  constructor(parent: HTMLElement){
    this.parent = parent;
    this.viewHtml = new ViewHtml(this.clearMainContent.bind(this))
    // this.header = new Header(this.viewHtml, this.clearMainContent.bind(this))

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