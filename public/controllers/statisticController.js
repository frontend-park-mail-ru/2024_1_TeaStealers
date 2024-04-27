import { statisticModel } from '@models';

class StatisticController {
  updateStatisticModel() {
    // statisticModel.updateWithParameters();
  }

  //   updateMainModelWithParameters(queryParameters) {
  //     const filter = queryParameters.dealtype;
  //     let requestURL = '?';
  //     const keys = Object.keys(queryParameters);

//     keys.forEach((key) => {
//       if (requestURL === '?') {
//         requestURL += `${key}=${queryParameters[key]}`;
//       } else {
//         if (queryParameters[key] === undefined) {
//           return;
//         }
//         requestURL += `&${key}=${queryParameters[key]}`;
//       }
//     });
//     mainModel.updateWithParameters(requestURL, filter);
//   }
}

export const statisticControler = new StatisticController();
