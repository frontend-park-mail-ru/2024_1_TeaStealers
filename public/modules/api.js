import { getRequest, postRequest } from '@modules';

// const BASE_URL = 'http://5.35.16.157/api';
const BASE_URL = 'http://localhost:8080/api';

const API_CONST = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  CHECK_AUTH: `${BASE_URL}/auth/check_auth`,
  GET_ADVERT_LIST: `${BASE_URL}/advert/get/list`,
  GET_ADVERT: `${BASE_URL}/adverts/`,
};

/**
 * POST-запрос для авторизации пользователя
 * @function login
 * @param {Object} userInput - Объект с входными данными, содержащий логин и пароль пользователя
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const login = (userInput) => {
  const url = API_CONST.LOGIN;
  return postRequest(url, userInput);
};

/**
   * POST-запрос для регистрации пользователя
   * @function signup
   * @param {Object} userInput - Объект с входными данными, содержащий логин и пароль пользователя
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const signup = (userInput) => {
  const url = API_CONST.SIGNUP;
  return postRequest(url, userInput);
};

/**
   * GET-запрос для логаута пользователя
   * @function logout
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const logout = () => {
  const url = API_CONST.LOGOUT;
  return getRequest(url);
};

/**
 * GET-запрос для получения списка объявлений
 * @function getAdvertList
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getAdvertList = () => {
  const url = API_CONST.GET_ADVERT_LIST;
  return getRequest(url);
};

/**
 * GET-запрос для получения выбранного объявления
 * @function getAdvertList
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getAdvert = (advertId) => {
  const url = API_CONST.GET_ADVERT + advertId;
  return getRequest(url);
};
/**
 * GET-запрос для проверки авторизации пользователя
 * @function checkAuth
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const checkAuth = () => {
  const url = API_CONST.CHECK_AUTH;
  return getRequest(url);
};
