import ViewHtml from "../viewHtml/view";

class ConnectMain {
  parent: HTMLElement
  viewHtml: ViewHtml;

  constructor(parent: HTMLElement){
    this.parent = parent;
    this.viewHtml = new ViewHtml();

    this.init()
  }

  public async init(): Promise<void> {
    try {
      const mainPage: HTMLElement = this.viewHtml.createMainPage();
      this.parent.append(mainPage);
    }
    catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }

    }
  }
}

export default ConnectMain;