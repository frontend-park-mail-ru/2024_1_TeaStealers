import { globalVariables } from '@models';

/**
   * GET-запрос
   * @async
   * @param {String} url Путь запроса
   * @return {Promise<any[]>} Ответ с сервера
   * @return {Promise<any[]>} Ответ с сервера
   */
export const getRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const body = await response.json();
    if (!body) {
      return [response.status, {}];
    }
    return [response.status, body];
  } catch (error) {
    return [globalVariables.HTTP_INTERNAL_SERVER_ERROR, error];
  }
};

/**
   * POST-запрос
   * @async
   * @param {String} url Путь запроса
   * @param {Object} data Тело запроса
   * @return {Promise<any[]>} Ответ с сервера
   * @return {Promise<any[]>} Ответ с сервера
   */
export const postRequest = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    const body = await response.json();
    if (!body) {
      return [response.status, {}];
    }

    return [response.status, body];
  } catch (error) {
    return [globalVariables.HTTP_INTERNAL_SERVER_ERROR, error];
  }
};

/**
   * POST-запрос c form-data
   * @async
   * @param {String} url Путь запроса
   * @param {Object} data Тело запроса
   * @return {Promise<any[]>} Ответ с сервера
   */
export const postRequestFormData = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: data,
    });
    const body = await response.json();
    if (!body) {
      return [response.status, {}];
    }

    return [response.status, body];
  } catch (error) {
    return [globalVariables.HTTP_INTERNAL_SERVER_ERROR, error];
  }
};

/**
   * PUT-запрос
   * @async
   * @param {String} url Путь запроса
   * @param {Object} data Тело запроса
   * @return {Promise<any[]>} Ответ с сервера
   * @return {Promise<any[]>} Ответ с сервера
   */
export const putRequest = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    const body = await response.json();
    if (!body) {
      return [response.status, {}];
    }

    return [response.status, body];
  } catch (error) {
    return [globalVariables.HTTP_INTERNAL_SERVER_ERROR, error];
  }
};

/**
   * DELETE-запрос
   * @async
   * @param {String} url Путь запроса
   * @return {Promise<any[]>} Ответ с сервера
   * @return {Promise<any[]>} Ответ с сервера
   */
export const deleteRequest = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const body = await response.json();
    if (!body) {
      return [response.status, {}];
    }

    return [response.status, body];
  } catch (error) {
    return [globalVariables.HTTP_INTERNAL_SERVER_ERROR, error];
  }
};
