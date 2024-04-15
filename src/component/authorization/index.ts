class Authorization {

  formContainer: HTMLDivElement | null;

    constructor() {
      this.formContainer = null;

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
      inputName.classList.add("form-input");

      const surName: HTMLInputElement = document.createElement('input');
      surName.type = 'text';
      surName.placeholder = 'Please enter your surname';
      surName.classList.add("form-input");

      const buttonSubmit: HTMLButtonElement = document.createElement('button');
      buttonSubmit.type = "submit";
      buttonSubmit.textContent = "login to the application";
      buttonSubmit.classList.add('button-sub');

      this.formContainer?.append(inputName, surName, buttonSubmit);
    }

    showHtml() {
      return this.formContainer;
    }
  }

  export default Authorization;