import { mainModel } from '@models';

class MainController {
  updateMainModel() {
    mainModel.updateWithParameters('');
  }

  updateMainModelWithParameters(queryParameters) {
    let requestURL = '?';
    const keys = Object.keys(queryParameters);

    // Iterate over the keys and append each query parameter to the request URL
    keys.forEach((key) => {
      if (requestURL === '?') {
        requestURL += `${key}=${queryParameters[key]}`;
      } else {
        if (queryParameters[key] === 'undefined') {
          return;
        }
        requestURL += `&${key}=${queryParameters[key]}`;
      }
    });
    mainModel.updateWithParameters(requestURL);
  }
}

export const mainControler = new MainController();
