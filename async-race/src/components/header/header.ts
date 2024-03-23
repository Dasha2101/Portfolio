// import { ViewHtml } from "../viewHtml/view"

// export class Header {
//   viewHtml: ViewHtml;
//   clearMainContent: () => void;
//   constructor(viewHtml: ViewHtml, clearMainContent: () => void){
//     this.viewHtml = viewHtml;
//     this.clearMainContent = clearMainContent;
//     this.addEventButton()
//   }

//   async addEventButton(): Promise<void> {
//     const buttonGaragePage = this.viewHtml.buttonGaragePage;
//     const buttonWinnerPage = this.viewHtml.buttonWinnerPage;

//     if (buttonGaragePage && buttonWinnerPage) {
//       buttonGaragePage.addEventListener("click", this.garagePage.bind(this))
//       buttonWinnerPage.addEventListener("click", this.winnerPage.bind(this))
//     }
//   }

//   public garagePage(): void{
//     this.clearMainContent()
//     console.log('G')
//   }

//   public winnerPage() {
//     this.clearMainContent()
//     console.log('W');
//   }
// }

// export default Header