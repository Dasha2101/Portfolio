import Chat from '../../serves/chut';

class Authorization {
  formContainer: HTMLDivElement | null;
  inputName: HTMLInputElement | null;
  inputSurname: HTMLInputElement | null;
  nameErrorMessage: HTMLElement | null;
  surnameErrorMessage: HTMLElement | null;
  submitButton: HTMLButtonElement | null;
  navigateTo: (component: string) => void;
  chat: Chat;

  constructor(navigateTo: (component: string) => void) {
    this.navigateTo = navigateTo;
    this.formContainer = null;
    this.inputName = null;
    this.inputSurname = null;
    this.nameErrorMessage = null;
    this.surnameErrorMessage = null;
    this.chat = new Chat();
    this.submitButton = null;

    this.init();
  }

  async init() {
    const formContainer: HTMLDivElement = document.createElement('div');
    formContainer.classList.add('form-container');
    this.formContainer = formContainer;
    await this.createRegField();
    console.log('regi');
  }

  async createRegField() {
    const inputName: HTMLInputElement = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Please enter your login';
    inputName.classList.add('form-input');
    this.inputName = inputName;

    const password: HTMLInputElement = document.createElement('input');
    password.type = 'password';
    password.placeholder = 'Please enter your password';
    password.classList.add('form-input');
    this.inputSurname = password;

    const buttonSubmit: HTMLButtonElement = document.createElement('button');
    buttonSubmit.type = 'submit';
    buttonSubmit.textContent = 'login to the application';
    buttonSubmit.classList.add('button-sub');
    this.submitButton = buttonSubmit;
    this.submitButton.disabled = true;
    this.submitButton.addEventListener('click', () => this.handleSubmit());

    const infoBtn = document.createElement('button');
    infoBtn.classList.add('info__btn');
    infoBtn.textContent = 'Information about';
    infoBtn.addEventListener('click', this.modalWin.bind(this));

    //error name/surname
    const nameErrorMessage = document.createElement('p');
    nameErrorMessage.classList.add('error-massage');
    nameErrorMessage.textContent = 'Please enter correct data for login';
    nameErrorMessage.style.display = 'none';
    this.nameErrorMessage = nameErrorMessage;

    const surnameErrorMessage = document.createElement('p');
    surnameErrorMessage.classList.add('error-massage');
    surnameErrorMessage.textContent = 'Please enter correct data for password';
    surnameErrorMessage.style.display = 'none';
    this.surnameErrorMessage = surnameErrorMessage;

    //event
    this.inputName.addEventListener('input', () => {
      this.validateInput(this.inputName, this.nameErrorMessage);
    });
    this.inputName.addEventListener('blur', () => {
      this.validateInput(this.inputName, this.nameErrorMessage);
    });

    this.inputName.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.validateInput(this.inputName, this.nameErrorMessage);
        this.handleSubmit();
      }
    });

    this.inputSurname.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.validateInput(this.inputSurname, this.nameErrorMessage);
        this.handleSubmit();
      }
    });

    this.inputSurname.addEventListener('input', () => {
      this.validateInput(this.inputSurname, this.surnameErrorMessage);
    });
    this.inputSurname.addEventListener('blur', () => {
      this.validateInput(this.inputSurname, this.surnameErrorMessage);
    });

    this.formContainer?.append(
      this.inputName,
      this.nameErrorMessage,
      this.inputSurname,
      this.surnameErrorMessage,
      this.submitButton,
      infoBtn
    );
  }

  isValidName(name: string) {
    return /^[A-Z][a-zA-Z-]{1,6}$/.test(name);
  }

  isValidSurname(surname: string) {
    return /^\d{3,}$/.test(surname);
  }

  validateInput(input: HTMLInputElement | null, errorMessage: HTMLElement | null) {
    if (!input || !errorMessage) return;

    const inputValue = input.value.trim();
    let isValid: boolean = false;

    if (input === this.inputName) {
      isValid = this.isValidName(inputValue);
    } else if (input === this.inputSurname) {
      isValid = this.isValidSurname(inputValue);
    }

    if (!inputValue) {
      input.classList.add('invalid');
      errorMessage.textContent = 'Field cannot be empty';
      const windowError = this.chat.handleError('incorrect data');
      if (windowError) document.body.append(windowError);
      errorMessage.style.display = 'block';
    } else if (!isValid) {
      input.classList.add('invalid');
      const windowError = this.chat.handleError('incorrect data');
      if (windowError) document.body.append(windowError);

      errorMessage.textContent =
        'login (capital letter/at least three characters but no more than 7) and password (only number/least three characters)';

      errorMessage.style.display = 'block';
    } else {
      input.classList.remove('invalid');
      errorMessage.style.display = 'none';
    }
    this.validateForm();
  }

  validateForm() {
    const firstNameValue = this.inputName?.value.trim();
    const surNameValue = this.inputSurname?.value.trim();

    if (firstNameValue && surNameValue && this.isValidName(firstNameValue) && this.isValidSurname(surNameValue)) {
      if (this.submitButton) this.submitButton.disabled = false;
    } else {
      if (this.submitButton) this.submitButton.disabled = true;
    }
  }

  saveNewUserData(userNewData: { login: string; password: string }) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('userNewData', JSON.stringify(userNewData));
    }
  }

  saveUserData(userData: { login: string; password: string }) {
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem('userData', JSON.stringify(userData));
    }
  }

  async handleSubmit() {
    const login = (this.inputName as HTMLInputElement).value.trim();
    const password = (this.inputSurname as HTMLInputElement).value.trim();

    this.chat.authorization(login, password);
    this.saveUserData({ login, password });
    let existingNewUserData: { [key: string]: string } = {};
    const existingNewUserDataJSON: string | null = sessionStorage.getItem('userNewData');
    sessionStorage.setItem('currentPage', window.location.href);
    if (existingNewUserDataJSON) {
      existingNewUserData = JSON.parse(existingNewUserDataJSON);
    }
    if (login in existingNewUserData) {
      const savedPassword = existingNewUserData[login];
      if (savedPassword === password) {
        this.navigateTo('chut');
        return;
      } else {
        const errorMessage = this.chat.handleError('Incorrect login or password');
        if (errorMessage) this.formContainer?.append(errorMessage);
        return;
      }
    }

    existingNewUserData[login] = password;
    sessionStorage.setItem('userNewData', JSON.stringify(existingNewUserData));
    this.navigateTo('chut');
  }

  // checkUserAuthenticated(userNewData: { login: string; password: string }) {
  //   const dataJSON: string | null = sessionStorage.getItem('userNewData');
  //   if (dataJSON) {
  //     const existingData: { login: string; password: string } = JSON.parse(dataJSON);
  //     if (existingData.login === userNewData.login && existingData.password === userNewData.password) {
  //       return true;
  //     } else {
  //       const errorMessage = this.chat.handleError('Incorrect login or password');
  //       if (errorMessage) this.formContainer?.append(errorMessage);
  //       return false;
  //     }
  //   } else {
  //     const errorMessage = this.chat.handleError('No user data found');
  //   if (errorMessage) this.formContainer?.append(errorMessage);
  //   return false;
  //   }
  // }

  modalWin() {
    const modalWin = document.createElement('div');
    modalWin.classList.add('show-modal');

    const overlay: HTMLElement = document.createElement('div');
    overlay.classList.add('overlay');
    this.formContainer?.appendChild(overlay);
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
    this.formContainer?.append(modalWin);
    exitButton.onclick = () => {
      modalWin.style.display = 'none';
      overlay.style.display = 'none';
    };
  }
  showHtml() {
    return this.formContainer;
  }
}

export default Authorization;
