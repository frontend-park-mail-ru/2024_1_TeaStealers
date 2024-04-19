export const checkLogin = (login) => {
  if (login.length > 30) {
    return ['Максимальная длина 30 символа', false];
  }

  for (let i = 0; i < login.length; i += 1) {
    const char = login[i];
    if (!(char >= 'а' && char <= 'я') && !(char >= 'А' && char <= 'Я')) {
      return ['Можно использовать только кириллицу'];
    }
  }
  return ['', true];
};

export const checkPassword = (password) => {
  if (password.length < 8) {
    return ['Минимальная длина 8 символов', false];
  }
  if (password.length > 30) {
    return ['Максимальная длина 30 символа', false];
  }

  let hasLowercase = false;
  let hasUppercase = false;
  let hasDigit = false;

  for (let i = 0; i < password.length; i += 1) {
    const char = password[i];
    if (char >= 'a' && char <= 'z') {
      hasLowercase = true;
    } else if (char >= 'A' && char <= 'Z') {
      hasUppercase = true;
    } else if (char >= '0' && char <= '9') {
      hasDigit = true;
    }
  }

  if (hasLowercase && hasUppercase && hasDigit) {
    return ['', true];
  }

  return ['Должна быть хотя бы одна строчная, прописная буква и цифра', false];
};

export const checkRepeatPassword = (password, repeatPassword) => {
  if (password !== repeatPassword) {
    return ['Пароли не совпадают', false];
  }
  return ['', true];
};

export const checkPriceFilter = (priceFrom, priceTo) => {
  if (priceFrom > priceTo) {
    return ['Неверное использование фильтра', false];
  }
  return ['', true];
};

/**
 * Валидирует номер телефона
 */
export const checkPhone = (phone) => {
  phone = phone.replace('+7 ', '');
  let formattedValue = '';

  for (let i = 0; i < phone.length; i += 1) {
    const char = phone.charAt(i);
    if (!isNaN(char) && char !== ' ' && formattedValue.length < 10) {
      formattedValue += char;
    }
  }

  if (formattedValue.length > 0) {
    if (formattedValue.length <= 3) {
      formattedValue = `(${formattedValue}`;
    } else if (formattedValue.length <= 6) {
      formattedValue = `(${formattedValue.substring(0, 3)}) ${formattedValue.substring(3)}`;
    } else if (formattedValue.length <= 8) {
      formattedValue = `(${formattedValue.substring(0, 3)}) ${formattedValue.substring(3, 6)}-${formattedValue.substring(6)}`;
    } else if (formattedValue.length <= 10) {
      formattedValue = `(${formattedValue.substring(0, 3)}) ${formattedValue.substring(3, 6)}-${formattedValue.substring(6, 8)}-${formattedValue.substring(8)}`;
    }
    if (formattedValue.length === 15) {
      return [`+7 ${formattedValue}`, true];
    }
    return [`+7 ${formattedValue}`, false];
  }
  return ['', false];
};

export const checkEmail = (email) => {
  const atIndex = email.indexOf('@');
  if (atIndex === -1) {
    return false;
  }

  const dotIndex = email.indexOf('.', atIndex);
  if (dotIndex === -1 || dotIndex === atIndex + 1) {
    return false;
  }

  if (dotIndex === email.length - 1) {
    return false;
  }

  const afterDot = email.substring(dotIndex + 1);
  if (afterDot.length === 0) {
    return false;
  }

  return true;
};

export const checkDateDirthday = (date) => {
  const dateObject = new Date(date);
  const currentDate = new Date();

  const ageDiffMilliseconds = currentDate - dateObject;

  // Преобразуем разницу в годы
  const ageDate = new Date(ageDiffMilliseconds);
  const age = (ageDate.getUTCFullYear() - 1970);
  if (age >= 1 && age <= 100) {
    return true; // Валидный возраст
  }
  return false; // Невалидный возраст
};

export const checkYear = (year) => {
  if (year.includes('.')) {
    return ['Некорректный ввод', false];
  }
  const yearInt = parseInt(year, 10);
  if (yearInt % 1 !== 0) {
    return ['Некорректный ввод', false];
  }
  if (yearInt < 1772) {
    return ['Укажите год позднее чем 1772', false];
  }
  if (yearInt > 2024) {
    return ['Укажите год не позднее чем 2024', false];
  }
  return ['', true];
};

export const checkFloor = (floor) => {
  if (floor.includes('.')) {
    return ['Некорректный ввод', false];
  }
  const floorInt = parseInt(floor, 10);
  if (floorInt % 1 !== 0) {
    return ['Некорректный ввод', false];
  }
  if (floorInt < 1) {
    return ['Не может быть меньше 1', false];
  }
  if (floorInt > 100) {
    return ['Не более 100', false];
  }
  return ['', true];
};

export const formatInteger = (value, maxLength) => {
  let formatValue = '';

  let leadingZeros = true;
  for (let index = 0; index < value.length && formatValue.length < maxLength; index += 1) {
    if (leadingZeros && value[index] === '0') {
      continue;
    }
    leadingZeros = false;

    if (value[index] >= '0' && value[index] <= '9') {
      formatValue += value[index];
    }
  }

  return formatValue;
};

export const formatFloat = (value, maxNumber) => {
  let formatValue = '';
  let haveDot = false;
  let dotIndex = 0;
  let leadingZeros = true;
  for (let i = 0; i < value.length; i += 1) {
    if (leadingZeros && value[i] === '0') {
      continue;
    }
    leadingZeros = false;

    if (haveDot && formatValue.length > dotIndex + maxNumber) {
      continue;
    }

    if (value[i] >= '0' && value[i] <= '9') {
      formatValue += value[i];
    }
    if (value[i] === ',' && !haveDot && formatValue !== '') {
      haveDot = true;
      dotIndex = i;
      formatValue += value[i];
    }
  }

  return formatValue;
};
