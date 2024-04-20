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
    this.heartbeat();
  }

  messageHandler(message: MessageEvent) {
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
    }
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
        },
      },
    };
    if (this.ws) this.ws.send(JSON.stringify(message));
    console.log('THIS IS ', message);
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
}
