import Chat from '../../serves/chut';

interface User {
  login: string;
}

class Chut {
  chutContainer: HTMLDivElement | null;
  userListContainer: HTMLDivElement;
  chat: Chat;
  navigateTo: (component: string) => void;
  userListUpdateInterval: NodeJS.Timeout;

  constructor(navigateTo: (component: string) => void) {
    this.chutContainer = null;
    this.userListContainer = document.createElement('div');
    this.userListContainer.classList.add('user-list');
    this.chat = new Chat();
    this.navigateTo = navigateTo;
    this.userListUpdateInterval = setInterval(() => this.updateUserList(), 100);
    this.init();
  }

  async init() {
    const chutContainer = document.createElement('div');
    chutContainer.classList.add('chut-container');
    this.chutContainer = chutContainer;
    await this.generateHedaerChut();
    await this.generateChut();
    this.generateFooter();
    console.log('chut');
  }

  async generateHedaerChut() {
    const headerChut = document.createElement('header');
    headerChut.classList.add('chut__header');

    const chutTitle = document.createElement('h1');
    chutTitle.innerText = 'Fun Chut';
    this.chutContainer?.append(chutTitle);

    const buttonExit = document.createElement('button');
    buttonExit.classList.add('button-exit');
    buttonExit.textContent = 'Logout';
    buttonExit.addEventListener('click', () => {
      const userDataJSON = sessionStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        this.chat.logOut(userData.login, userData.password);
        this.navigateTo('authorization');
      }
    });

    const userWelcome = document.createElement('p');
    userWelcome.classList.add('user-welcome');

    const userDataJSON = sessionStorage.getItem('userData');
    if (userDataJSON) {
      console.log(userDataJSON);
      const userData = JSON.parse(userDataJSON);
      if (userData) {
        userWelcome.textContent = `Welcome, ${userData.login}!`;
      }
    }

    headerChut.append(buttonExit, chutTitle, userWelcome);

    this.chutContainer?.append(headerChut);
  }
  generateChut() {
    const chutContent = document.createElement('div');
    chutContent.classList.add('chut-content');
    chutContent.append(this.userListContainer);
    this.updateUserList();
    this.chutContainer?.append(chutContent);
  }

  updateUserList() {
    const userListJSON = sessionStorage.getItem('userList');
    const userListInactiveJSON = sessionStorage.getItem('userListInactive');
    const userDataJSON = sessionStorage.getItem('userData');
    if (userListJSON && userDataJSON && userListInactiveJSON) {
      const userList = JSON.parse(userListJSON);
      const userListInactive = JSON.parse(userListInactiveJSON);
      const userData = JSON.parse(userDataJSON);
      this.userListContainer.innerHTML = '';

      userList?.forEach((user: User) => {
        if (user.login !== userData.login) {
          const divElement = document.createElement('div');
          const bElement = document.createElement('b');
          bElement.textContent = user.login;
          divElement.appendChild(bElement);
          this.userListContainer.append(divElement);
        }
      });
      userListInactive?.forEach((user: User) => {
        if (user.login !== userData.login) {
          const divElement = document.createElement('div');
          divElement.textContent = user.login;
          this.userListContainer.append(divElement);
        }
      });
    }
  }

  generateFooter() {
    const footerChut = document.createElement('footer');
    footerChut.classList.add('footer__chut');

    const img = document.createElement('img');
    img.src = './src/icon/images.png';

    const nameAuthor = document.createElement('p');
    nameAuthor.textContent = 'Author: dasha2101';

    const link = document.createElement('a');
    link.href = 'https://github.com/Dasha2101';
    link.textContent = 'GitHub';

    const title = document.createElement('p');
    title.textContent = ' 2024';

    const containerTitle = document.createElement('div');
    containerTitle.classList.add('conteiner__title');
    containerTitle.append(nameAuthor, title);

    footerChut.append(img, containerTitle, link);

    this.chutContainer?.append(footerChut);
  }
  async showHTML() {
    if (this.chutContainer) this.chutContainer.innerHTML = '';
    await this.generateHedaerChut();
    await this.generateChut();
    this.generateFooter();
    return this.chutContainer;
  }
}

export default Chut;
