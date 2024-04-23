import Chat from '../../serves/chut';

interface User {
  login: string;
}

interface Message {
  to: string;
  text: string;
}

class Chut {
  chutContainer: HTMLDivElement | null;
  userListContainer: HTMLDivElement;
  findContainer: HTMLDivElement;
  chat: Chat;
  // originalUserList: User[] = [];
  navigateTo: (component: string) => void;
  userListUpdateInterval: NodeJS.Timeout;
  userListActiveCache: String;
  userListInactiveCache: String;

  constructor(navigateTo: (component: string) => void) {
    this.chutContainer = null;
    this.userListContainer = document.createElement('div');
    this.userListContainer.classList.add('user-list');

    this.findContainer = document.createElement('div');
    this.findContainer.classList.add('find-container');

    this.userListActiveCache = '';
    this.userListInactiveCache = '';

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

    const aboutInfo = document.createElement('button');
    aboutInfo.classList.add('about-info');
    aboutInfo.textContent = 'Information about';
    aboutInfo.addEventListener('click', this.modalWin.bind(this));

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

    headerChut.append(buttonExit, aboutInfo, chutTitle, userWelcome);
    this.chutContainer?.append(headerChut);
  }

  modalWin() {
    const modalWin = document.createElement('div');
    modalWin.classList.add('show-modal');

    const overlay: HTMLElement = document.createElement('div');
    overlay.classList.add('overlay');
    this.chutContainer?.appendChild(overlay);
    overlay.style.display = 'block';

    overlay.addEventListener('click', () => {
      modalWin.style.display = 'none';
      overlay.style.display = 'none';
    });

    const nameApp = document.createElement('h2');
    nameApp.textContent = 'Fun Chut';

    const title = document.createElement('p');
    title.textContent =
      'What could be better than chatting with friends using a chat app? But what if the owner of the service deletes your messages? Or, conversely, they can store your chat history without your consent!';

    const authorApp = document.createElement('a');
    authorApp.href = 'https://github.com/Dasha2101';
    authorApp.textContent = 'My GitHub';

    const exitButton = document.createElement('button');
    exitButton.classList.add('mod__close-button');
    exitButton.textContent = 'Exit';
    modalWin.append(nameApp, title, authorApp, exitButton);
    this.chutContainer?.append(modalWin);
    exitButton.onclick = () => {
      modalWin.style.display = 'none';
      overlay.style.display = 'none';
    };
  }
  generateChut() {
    const chutContent = document.createElement('div');
    chutContent.classList.add('chut-content');

    const searchContainer = document.createElement('div');
    searchContainer.classList.add('search-container');

    const searchInput = document.createElement('input');
    searchInput.classList.add('searchInput');
    searchInput.placeholder = 'Find user';
    searchInput.addEventListener('input', () => {
      const search = searchInput.value.toLowerCase();
      this.filterUser(search);
    });

    searchContainer.append(searchInput);
    chutContent.append(searchContainer);

    chutContent.append(this.userListContainer);
    this.chutContainer?.append(chutContent);
    this.updateUserList();

    // Generate messages screen
    const messageScreen = document.createElement('div');
    messageScreen.dataset.user = '';
    messageScreen.style.minWidth = '300px';
    messageScreen.style.minHeight = '200px';
    chutContent.append(messageScreen);

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageScreen.append(messageContent);

    const inputElem = document.createElement('input');
    inputElem.placeholder = 'Enter message...';
    messageScreen.append(inputElem);

    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    messageScreen.append(sendButton);

    sendButton.addEventListener('click', () => {
      const user = messageScreen.dataset.user;
      const text = inputElem.value.trim();
      if (user && text !== '') {
        this.chat.sendMessage(user, text);
        inputElem.value = '';
      }
    });


    inputElem.addEventListener('keyup', (e) => {
      console.log('work')
      if (e.code === 'Enter') {
        sendButton.click();
      }
    });

    this.displaySavedMessages(messageContent);

  }

  displaySavedMessages(messageContent: HTMLElement) {
    console.log('Kik')
    const messages = sessionStorage.getItem('sentMessages');
    if (messages) {
      const parsedMessages: Message[] = JSON.parse(messages);
      parsedMessages.forEach(message => {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${message.to}: ${message.text}`;
        messageContent.append(messageDiv);
      });
    }
  }



  filterUser(search: string) {
    const filter = search.toLowerCase();
    const userList = this.userListContainer.querySelectorAll('div');

    userList.forEach((user: HTMLDivElement) => {
        const userName = user.dataset.login?.toLowerCase() ?? '';
        if (userName.includes(filter)) {
          user.style.display = 'block';
        } else {
          user.style.display = 'none';
        }
    });
    // this.updateUserList();
  }

  updateUserList() {
    const userListJSON = sessionStorage.getItem('userList');
    const userListInactiveJSON = sessionStorage.getItem('userListInactive');
    const userDataJSON = sessionStorage.getItem('userData');

    if (userListJSON === this.userListActiveCache && userListInactiveJSON === this.userListInactiveCache)
      return;

    this.userListActiveCache = userListJSON ?? '';
    this.userListInactiveCache = userListInactiveJSON ?? '';

    if (userListJSON && userDataJSON && userListInactiveJSON) {
      const userList = JSON.parse(userListJSON);
      const userListInactive = JSON.parse(userListInactiveJSON);
      const userData = JSON.parse(userDataJSON);
      this.userListContainer.innerHTML = '';

      userList?.forEach((user: User) => {
        if (user.login !== userData.login) {
          const divElement = this.createUserElement(user.login, 'green');
          this.userListContainer.append(divElement);
        }
      });

      userListInactive?.forEach((user: User) => {
        if (user.login !== userData.login) {
          const divElement = this.createUserElement(user.login, 'red');
          this.userListContainer.append(divElement);
        }
      });
      this.userListContainer.style.overflowY = 'auto';
      this.userListContainer.style.maxHeight = '200px';
    }
    const searchInput = document.querySelector('.searchInput') as HTMLInputElement;
    if (searchInput && searchInput.value) {
      this.filterUser(searchInput.value);
    }
  }

  createUserElement(login: string, color: string) {
    const divElement = document.createElement('div');
    divElement.classList.add('user-element');
    divElement.setAttribute('data-login', login);
    const spanElement = document.createElement('span');
    spanElement.textContent = login;
    spanElement.style.color = color;
    divElement.append(spanElement);
    return divElement;
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
