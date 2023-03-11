import axios from 'axios';
const baseUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3000';

const get = (query: string) => {
  const request = axios.get(baseUrl + query);
  return request
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(`Error response status: ${error.response.status}`);
        console.log(`Error message data: `, error.response.data);
        console.log(`Error response headers: `, error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(`Error Request:`, error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(`Error config: `, error.config);
    });
};

const getExternal = (query: string) => {
  const request = axios.get(query);
  return request
    .then((response) => response.data)
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(`Error response status: ${error.response.status}`);
        console.log(`Error message data: `, error.response.data);
        console.log(`Error response headers: `, error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(`Error Request:`, error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(`Error config: `, error.config);
    });
};

const create = (newObject) => {
  const request = axios.post(`${baseUrl}/posts`, newObject);
  return request
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(`Error response status: ${error.response.status}`);
        console.log(`Error message data: `, error.response.data);
        console.log(`Error response headers: `, error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(`Error Request:`, error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(`Error config: `, error.config);
    });
};

const upd = (id, newObject, notification = { message: 'No Message Selected', duration: 5000 }) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request
    .then((response) => {
      // notification.setNotificationMessage(notification.message);
      setTimeout(() => {
        // notification.setNotificationMessage(null);
      }, notification.duration);

      return response.data;
    })
    .catch((error) => {
      // notification.setNotificationMessage(`Failed to update ${id}`);
      setTimeout(() => {
        // notification.setNotificationMessage(null);
      }, notification.duration);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(`Error response status: ${error.response.status}`);
        console.log(`Error message data: `, error.response.data);
        console.log(`Error response headers: `, error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(`Error Request:`, error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(`Error config: `, error.config);
    });
};

const del = (id) => {
  const request = axios
    .delete(`${baseUrl}/posts/${id}`)
    .then(() => {})
    .catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(`Error response status: ${error.response.status}`);
        console.log(`Error message data: `, error.response.data);
        console.log(`Error response headers: `, error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(`Error Request:`, error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(`Error config: `, error.config);
    });
};

export default {
  get,
  getExternal,
  create,
  upd,
  del,
};
