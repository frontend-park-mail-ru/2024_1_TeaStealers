const CACHE_NAME = 'SW cache';

/**
 * Добавление обработчика на событие установки SW
 */
self.addEventListener('install', (event) => {
  console.log('install');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(['/']);
      }),
  );
});

/**
 * Функция выполняет сетевой запрос с кэшированием результата
 * @param {Request} request - Объект запроса для выполнения сетевого запроса.
 * @param {int} timeout - Время ожидания ответа на запрос в миллисекундах.
 * @returns {Promise<Response>} Промис, который разрешается с объектом
 * Response в случае успешного запроса или отклоняется при ошибке.
 */
const networkFirst = (request, timeout) => {
  return new Promise((resolve, reject) => {
    const requestTimeout = setTimeout(reject, timeout);
    fetch(request).then((result) => {
      clearTimeout(requestTimeout);
      const responseClone = result.clone();
      caches.open(CACHE_NAME).then((cache) => {
        if (request.method !== 'GET') {
          return;
        }
        cache.put(request, responseClone);
      });
      resolve(result);
    }, reject);
  });
};

/**
 * Получает ответ на запрос из кэша. Если соответствующий запрос не найден в кэше,
 * функция отклоняет промис с соответствующим сообщением об ошибке.
 * @param {Request} request - Объект запроса для которой требуется получить кэшированный ответ.
 * @returns {Promise<Response>} - Промис, который разрешается с объектом Response, если ответ найден в кэше,
 * или отклоняется с сообщением об ошибке, если ответ в кэше отсутствует.
 */
const getCache = (requst) => {
  return caches.open(CACHE_NAME).then((cache) => {
    return cache.match(requst).then((result) => {
      return result || Promise.reject('no exist at cache');
    });
  });
};

/**
 * Добавление обработчика на событие fetch
 */
self.addEventListener('fetch', (event) => {
  event.respondWith(networkFirst(event.request, 1000)
    .catch(() => { return getCache(event.request); }));
});
