import { mainModel } from '@models';

class MainController {
  updateMainModel() {
    mainModel.updateWithParameters('');
  }

  updateMainModelWithParameters(queryParameters) {
    const filter = queryParameters.dealtype;
    console.log(filter);
    let requestURL = '?';
    const keys = Object.keys(queryParameters);

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
    mainModel.updateWithParameters(requestURL, filter);
  }
}

export const mainControler = new MainController();
