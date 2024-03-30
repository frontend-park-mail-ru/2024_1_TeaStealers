import { mainModel } from '@models';

class MainController {
  updateMainModel() {
    mainModel.updateState();
  }
}

export const mainControler = new MainController();
