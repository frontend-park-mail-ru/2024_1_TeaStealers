export const checkLogin = (login) => {
  if (login.length < 4) {
    return ['Минимальная длина 4 символа', false];
  }
  if (login.length > 30) {
    return ['Максимальная длина 30 символа', false];
  }

  let hasLetter = false;

  for (let i = 0; i < login.length; i += 1) {
    const char = login[i];
    if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
      hasLetter = true;
    } else if (!(char >= '0' && char <= '9')) {
      return ['Можно использовать латинские буквы и цифры', false];
    }
  }

  if (hasLetter) {
    return ['', true];
  }

  return ['Должна быть хотя бы одна буква', false];
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
