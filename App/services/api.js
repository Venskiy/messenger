const TOKEN = '7caf8056046d7e59d2a8a0c7874db6eb0fd2f0a2';
const API_ROOT = 'http://127.0.0.1:8000/';

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
