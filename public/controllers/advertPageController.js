import { advertModel } from '@models';

class AdvertPageController {
  updateAdvertPageModel() {
    advertModel.updateState();
  }
}

export const advertPageController = new AdvertPageController();
