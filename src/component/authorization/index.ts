class Authorization {
  formContainer: HTMLDivElement | null;
  inputName: HTMLInputElement | null;
  inputSurname: HTMLInputElement | null;
  nameErrorMessage: HTMLElement | null;
  surnameErrorMessage: HTMLElement | null;
  submitButton: HTMLButtonElement | null;
  navigateTo: (component: string) => void;



  constructor(navigateTo: (component: string) => void)  {
    this.navigateTo = navigateTo;
    this.formContainer = null;
    this.inputName = null;
    this.inputSurname = null;
    this.nameErrorMessage = null;
    this.surnameErrorMessage = null;
    this.submitButton = null;

    this.init();
  }

  init() {
    const formContainer: HTMLDivElement = document.createElement('div');
    formContainer.classList.add('form-container');
    this.formContainer = formContainer;
    this.createRegField();
  }

  createRegField() {
    const inputName: HTMLInputElement = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Please enter your name';
    inputName.classList.add('form-input');
    this.inputName = inputName;

    const surName: HTMLInputElement = document.createElement('input');
    surName.type = 'text';
    surName.placeholder = 'Please enter your surname';
    surName.classList.add('form-input');
    this.inputSurname = surName;

    const buttonSubmit: HTMLButtonElement = document.createElement('button');
    buttonSubmit.type = 'submit';
    buttonSubmit.textContent = 'login to the application';
    buttonSubmit.classList.add('button-sub');
    this.submitButton = buttonSubmit;
    this.submitButton.disabled = true;
    this.submitButton.addEventListener("click", () => this.handleSubmit());


    //error name/surname
    const nameErrorMessage = document.createElement('p');
    nameErrorMessage.classList.add('error-massage');
    nameErrorMessage.textContent = "Please enter correct data for first name";
    nameErrorMessage.style.display = "none";
    this.nameErrorMessage = nameErrorMessage;

    const surnameErrorMessage = document.createElement('p');
    surnameErrorMessage.classList.add('error-massage');
    surnameErrorMessage.textContent = "Please enter correct data for surname";
    surnameErrorMessage.style.display = "none";
    this.surnameErrorMessage = surnameErrorMessage;

    //event
    this.inputName.addEventListener("input", () => {
      this.validateInput(this.inputName, this.nameErrorMessage);
    });
    this.inputName.addEventListener("blur", () => {
      this.validateInput(this.inputName, this.nameErrorMessage);
    });

    this.inputName.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.validateInput(this.inputName, this.nameErrorMessage);
        this.handleSubmit()
      }
    });

    this.inputSurname.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.validateInput(this.inputName, this.nameErrorMessage);
        this.handleSubmit();
      }
    });

    this.inputSurname.addEventListener("input", () => {
      this.validateInput(this.inputSurname, this.surnameErrorMessage);
    });
    this.inputSurname.addEventListener("blur", () => {
      this.validateInput(this.inputSurname, this.surnameErrorMessage);
    });

    this.formContainer?.append(this.inputName, this.nameErrorMessage, this.inputSurname, this.surnameErrorMessage, this.submitButton);
  }

  isValidName(name: string) {
    return /^[A-Z][a-zA-Z-]{2,}$/.test(name);
  }

  isValidSurname(surname: string) {
    return /^[A-Z][a-zA-Z-]{3,}$/.test(surname);
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
      input.classList.add("invalid");
      errorMessage.textContent = "Field cannot be empty";
      errorMessage.style.display = "block";
    } else if (!isValid) {
      input.classList.add("invalid");
      errorMessage.textContent = "Please enter correct data";
      errorMessage.style.display = "block";
    } else {
      input.classList.remove("invalid");
      errorMessage.style.display = "none";
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

  async handleSubmit() {
    const firstName = (this.inputName as HTMLInputElement).value.trim();
    const surName = (this.inputSurname as HTMLInputElement).value.trim();
    const userData = {firstName, surName}

    await this.saveUserData(userData)
    this.checkUserAuthenticated(userData);
  }

  saveUserData(userData: {firstName: string; surName: string}) {
    let existingData: { firstName: string; surName: string }[] = [];

    const dataJSON = localStorage.getItem('userData');
    if (dataJSON) {
      existingData = JSON.parse(dataJSON);
    }

    if (!Array.isArray(existingData)) {
      existingData = [];
    }

    existingData.push(userData);
    localStorage.setItem("userData", JSON.stringify(existingData));
  }


  checkUserAuthenticated(userData: {firstName: string; surName: string}) {
    const dataJSON: string | null = localStorage.getItem('userData');
    if (dataJSON) {
      const existData: {firstName: string; surName: string }[] = JSON.parse(dataJSON);
      const isAuthenticated = existData.some(data => data.firstName === userData.firstName && data.surName === userData.surName);

      if (isAuthenticated) {
        this.navigateTo('chut');
      } else {
        this.navigateTo('authorization');
      }
    } else {
      this.navigateTo('authorization');
    }
    return false
  }

  showHtml() {
    return this.formContainer;
  }
}

export default Authorization;
