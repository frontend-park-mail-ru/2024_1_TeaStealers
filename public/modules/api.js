import { getRequest, postRequest } from '@modules';
import { deleteRequest, postRequestFormData } from './ajax.js';

const BASE_URL = 'https://tean.homes/api';
// const BASE_URL = 'http://localhost:8080/api';

const API_CONST = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,
  LOGOUT: `${BASE_URL}/auth/logout`,
  CHECK_AUTH: `${BASE_URL}/auth/check_auth`,
  GET_GRID_ADVERTS: `${BASE_URL}/adverts/rectanglelist/`,
  GET_ADVERTS_LIST: `${BASE_URL}/adverts/rectanglelist/`,
  UPLOAD_ADVERT_IMAGE: `${BASE_URL}/adverts/image/`,
  DELETE_ADVERT_IMAGE: `${BASE_URL}/adverts/{id}/image/`,
  GET_ADVERT_BY_ID: `${BASE_URL}/adverts/{id}`,
  UPDATE_ADVERT_BY_ID: `${BASE_URL}/adverts/{id}`,
  DELETE_ADVERT_BY_ID: `${BASE_URL}/adverts/{id}`,
  CREATE_FLAT_ADVERT: `${BASE_URL}/adverts/flats/`,
  CREATE_HOUSE_ADVERT: `${BASE_URL}/adverts/houses/`,
  GET_COMPLEX_INFO: `${BASE_URL}/complexes/{id}`,
  GET_COMPLEX_ADVERTS: `${BASE_URL}/complexes/{id}/rectanglelist/`,
  GET_ME: `${BASE_URL}/users/me`,
  UPLOAD_AVATAR: `${BASE_URL}/users/avatar`,
  UPDATE_USER_INFO: `${BASE_URL}/users/info`,
  UPDATE_USER_PASSWORD: `${BASE_URL}/users/password`,
  GET_MY_ADVERTS: `${BASE_URL}/users/myadverts`,
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
 * GET-запрос для проверки авторизации пользователя
 * @function checkAuth
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const checkAuth = () => {
  const url = API_CONST.CHECK_AUTH;
  return getRequest(url);
};

/**
 * GET-запрос для получения прямоугольных (больших) объявлений с поиском
 * @function getAdvertsList
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getAdvertsList = () => {
  const url = API_CONST.GET_ADVERTS_LIST;
  return getRequest(url);
};

/**
   * POST-запрос для загрузки фотографии объявления
   * @function uploadAdvertImage
   * @param {Object} data - Объект с входными данными,
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const uploadAdvertImage = (data) => {
  const url = API_CONST.UPLOAD_ADVERT_IMAGE;
  return postRequestFormData(url, data);
};

/**
   * DELETE-запрос для удаления фотографии объявления
   * @function deleteAdvertImage
   * @param {Object} idImage - Объект с входными данными, содержащий айди изображения
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const deleteAdvertImage = (idImage) => {
  const url = API_CONST.DELETE_ADVERT_IMAGE.replace('{id}', idImage);
  return deleteRequest(url);
};

/**
 * GET-запрос для получения объявления
 * @function getAdvertById
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getAdvertById = (id) => {
  const url = API_CONST.GET_ADVERT_BY_ID.replace('{id}', id);
  return getRequest(url);
};

/**
   * POST-запрос для изменения объявления
   * @function updateAdvertById
   * @param {Object} data - Объект с входными данными,
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const updateAdvertById = (data, id) => {
  const url = API_CONST.UPDATE_ADVERT_BY_ID.replace('{id}', id);
  return postRequest(url, data);
};

/**
   * DELETE-запрос для удаления объявления
   * @function deleteAdvertById
   * @param {Object} id - Объект с входными данными, содержащий айди изображения
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const deleteAdvertById = (id) => {
  const url = API_CONST.DELETE_ADVERT_BY_ID.replace('{id}', id);
  return deleteRequest(url);
};

/**
   * POST-запрос для создания объявления квартиры
   * @function createFlatAdvert
   * @param {Object} data - Объект с входными данными,
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const createFlatAdvert = (data) => {
  const url = API_CONST.CREATE_FLAT_ADVERT;
  return postRequest(url, data);
};

/**
   * POST-запрос для создания объявления дома
   * @function createHouseAdvert
   * @param {Object} data - Объект с входными данными,
   * @returns {Promise<Object>} - Объект, представляющий результат запроса.
   */
export const createHouseAdvert = (data) => {
  const url = API_CONST.CREATE_HOUSE_ADVERT;
  return postRequest(url, data);
};

/**
 * Get-запрос на полчение информации о жк
 * @function getComplexInfo
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getComplexInfo = (id) => {
  const url = API_CONST.GET_COMPLEX_INFO.replace('{id}', id);
  return getRequest(url);
};

/**
 * Get-запрос на полчение объявлений в жк
 * @function getComplexInfo
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getComplexAdverts = (id) => {
  const url = API_CONST.GET_COMPLEX_ADVERTS.replace('{id}', id);
  return getRequest(url);
};

/**
 * Get-запрос на полчение информации о текущем пользователе
 * @function getMe
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getMe = () => {
  const url = API_CONST.GET_ME;
  return getRequest(url);
};

/**
 * POST-запрос для обновления аватара пользователя
 * @function uploadAvatar
 * @param {Object} userInput - Объект с входными данными, содержащий
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const uploadAvatar = (userInput) => {
  const url = API_CONST.UPLOAD_AVATAR;
  return postRequestFormData(url, userInput);
};

/**
 * POST-запрос для обновления пользователя
 * @function updateUserInfo
 * @param {Object} userInfo - Объект с входными данными, содержащий
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const updateUserInfo = (userInfo) => {
  const url = API_CONST.UPDATE_USER_INFO;
  return postRequest(url, userInfo);
};

/**
 * POST-запрос для обновления пароля пользователя
 * @function updateUserPassword
 * @param {Object} userInfo - Объект с входными данными, содержащий
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const updateUserPassword = (userInfo) => {
  const url = API_CONST.UPDATE_USER_PASSWORD;
  return postRequest(url, userInfo);
};

/**
 * Get-запрос на получение обявлений пользователя
 * @function getMyAdverts
 * @returns {Promise<Object>} - Объект, представляющий результат запроса.
 */
export const getMyAdverts = () => {
  const url = API_CONST.GET_MY_ADVERTS;
  return getRequest(url);
};
/**
 * GET-запрос для получения объявлений с фильтром
 */
export const getGridAdverts = (queryParamenrts) => {
  const url = API_CONST.GET_GRID_ADVERTS + queryParamenrts;
  return getRequest(url);
};
