export const fetchWrapper = {
  get,
  post,
  put,
  delete: _delete
};

function get(url: string) {
  const requestOptions = {
    method: 'GET'
  };

  return fetch(url, requestOptions).then(handleResponse);
}

function post(url: string, body: any): any {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions).then(handleResponse);
}

function put(url: string, body: any) {
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  };

  return fetch(url, requestOptions).then(handleResponse);
}

// Prefixed with underscored because delete is a reserved word in javascript
function _delete(url: string) {
  const requestOptions = {
    method: 'DELETE'
  };

  return fetch(url, requestOptions).then(handleResponse);
}

// Helper functions

function handleResponse(response: any) {
  return response.text().then((text: any) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      /*
       * If ([401, 403].includes(response.status) && userService.userValue) {
       *     // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
       *     userService.logout();
       * }
       */

      const error = (data && data.message) || response.statusText;

      return Promise.reject(error);
    }

    return data;
  });
}
