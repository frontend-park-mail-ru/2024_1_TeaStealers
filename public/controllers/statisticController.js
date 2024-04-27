import { statisticModel } from '@models';

class StatisticController {
  updateStatisticModel() {
    statisticModel.updateState();
  }
}

export const statisticControler = new StatisticController();
