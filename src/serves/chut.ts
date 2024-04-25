export default class Chat {
  host = 'ws://localhost';
  port = 4000;

  url = `${this.host}:${this.port}`;

  ws: WebSocket | null;

  heartbeatHandler: NodeJS.Timeout | null = null;
  usersActive = [];

  constructor() {
    this.ws = new WebSocket(this.url);
    this.ws.onmessage = this.messageHandler;
    this.ws.onclose = this.handleClose;
    this.heartbeat();
  }

  messageHandler = (message: MessageEvent) => {
    const data = JSON.parse(message.data);
    switch (data.type) {
      case 'USER_ACTIVE':
        this.usersActive = data.payload.users;
        sessionStorage.setItem('userList', JSON.stringify(this.usersActive));
        break;
      case 'USER_INACTIVE':
        this.usersActive = data.payload.users;
        sessionStorage.setItem('userListInactive', JSON.stringify(this.usersActive));
        break;
      case 'USER_LOGIN':
        this.usersActive = data.payload.user;
        sessionStorage.setItem('userData', JSON.stringify(this.usersActive));
        break;
      case 'USER_LOGOUT':
        this.usersActive = data.payload.user;
        sessionStorage.removeItem('userData');
        break;
      // case 'MSG_SEND':
      // const { to, text } = data.payload.message;
      // this.saveSentMessage(to, text);
      // break;
      case 'ERROR':
        this.handleError(data.payload.errorMessage);
        break;
    }
  };

  //   saveSentMessage(to: string, text: string) {
  //   const messages = sessionStorage.getItem('sentMessages');
  //   const newMessage = { to, text };
  //   if (messages) {
  //     const parsedMessages = JSON.parse(messages);
  //     parsedMessages.push(newMessage);
  //     sessionStorage.setItem('sentMessages', JSON.stringify(parsedMessages));
  //   } else {
  //     sessionStorage.setItem('sentMessages', JSON.stringify([newMessage]));
  //   }
  // }

  handleClose = (event: CloseEvent) => {
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('show-modal');
    errorMessage.textContent = 'The connection is closed. Code: ' + event.code;
    document.body.append(errorMessage);

    setTimeout(() => {
      errorMessage.remove();
      this.reconnect();
    }, 5000);
  };

  reconnect() {
    setTimeout(() => {
      const errorMessage = document.createElement('div');
      errorMessage.textContent = 'Attempting to reconnect...';
      errorMessage.classList.add('show-modal');
      document.body.append(errorMessage);

      this.ws = new WebSocket(this.url);
      this.ws.onmessage = this.messageHandler;
      this.ws.onclose = this.handleClose.bind(this);
      this.heartbeat();

      const userDataJSON = sessionStorage.getItem('userData');
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        this.authorization(userData.login, userData.password);
      }
    }, 3000);
  }

  heartbeat() {
    this.heartbeatHandler = setInterval(() => {
      const message_a = {
        id: 'string',
        type: 'USER_ACTIVE',
        payload: null,
      };
      const message_ia = {
        id: 'string',
        type: 'USER_INACTIVE',
        payload: null,
      };
      // const message_er = {

      // }
      if (this.ws) this.ws.send(JSON.stringify(message_a));
      if (this.ws) this.ws.send(JSON.stringify(message_ia));
    }, 100);
  }

  authorization(username: string, password: string) {
    const message = {
      id: '1234',
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: username,
          password: password,
          isLogined: true,
        },
      },
    };
    if (this.ws) this.ws.send(JSON.stringify(message));
  }

  logOut(username: string, password: string) {
    const message = {
      id: '1234',
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: username,
          password: password,
        },
      },
    };
    if (this.ws) this.ws.send(JSON.stringify(message));
    sessionStorage.removeItem('userData');
  }

  sendMessage(to: string, text: string) {
    const message = {
      id: '1234',
      type: 'MSG_SEND',
      payload: {
        message: {
          to: to,
          text: text,
        },
      },
    };
    if (this.ws) this.ws.send(JSON.stringify(message));
    console.log(to, text);
  }

  errorMessageShown: boolean = false;

  handleError(errorMessage: string) {
    if (this.errorMessageShown) {
      return;
    }

    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('error-message');
    switch (errorMessage) {
      case 'No user data found':
        errorMessageElement.textContent = 'Пользователь с указанным логином не найден.';
        break;
      case 'incorrect data':
        errorMessageElement.textContent = 'Incorrect login or password';
        break;
      case 'the user was not authorized':
        errorMessageElement.textContent = 'User was not authorized';
        break;
      case 'a user with this login is already authorized':
        errorMessageElement.textContent = 'user with this login is already authorized';
        break;
      default:
        errorMessageElement.textContent = 'Произошла ошибка аутентификации: ' + errorMessage;
        break;
    }
    errorMessageElement.style.display = 'block';
    setTimeout(() => {
      errorMessageElement.style.display = 'none';
      this.errorMessageShown = false;
    }, 1000);
    this.errorMessageShown = true;
    return errorMessageElement;
  }
}
