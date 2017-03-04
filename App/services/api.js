import { TOKEN, API_ROOT } from '../config/settings';

export const obtainAccessToken = (username, password) => {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    fetch(`${API_ROOT}api-token-auth/`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: username,
        password: password,
      })
    })
    .then(response => {
      response.json().then(response => resolve(response));
    });
  });
};

export const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Authorization', `Token ${TOKEN}`);

    fetch(`${API_ROOT}api/get_authenticated_user`, {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      if(response.status === 200) {
        response.json().then(user => resolve(user));
      }
      else {
        response.json().then(message => reject(message));
      }
    });
  });
};

export const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Authorization', `Token ${TOKEN}`);

    fetch(`${API_ROOT}api/get_all_users`, {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      if(response.status === 200) {
        response.json().then(users => resolve(users));
      }
      else {
        response.json().then(message => reject(message));
      }
    });
  });
};

export const createChat = (username) => {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Authorization', `Token ${TOKEN}`);
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    fetch(`${API_ROOT}api/create_chat`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        username: username
      }),
    })
    .then(response => {
      if(response.status === 200) {
        response.json().then(response => resolve(response));
      }
      else {
        response.json().then(message => reject(message));
      }
    });
  });
};

export const fetchChats = () => {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Authorization', `Token ${TOKEN}`);

    fetch(`${API_ROOT}api/get_user_chats`, {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      if(response.status === 200) {
        response.json().then(chats => resolve(chats));
      }
      else {
        response.json().then(message => reject(message));
      }
    });
  });
};

export const fetchMessages = (chatId) => {
  return new Promise((resolve, reject) => {
    let headers = new Headers();
    headers.append('Authorization', `Token ${TOKEN}`);

    fetch(`${API_ROOT}api/load_chat_messages/?page=1&chat_id=${chatId}`, {
      method: 'GET',
      headers: headers,
    })
    .then(response => {
      if(response.status === 200) {
        response.json().then(response => resolve(response));
      }
      else {
        response.json().then(message => reject(message));
      }
    });
  });
};
