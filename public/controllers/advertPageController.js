import { advertModel } from '@models';

class AdvertPageController {
  updateAdvertPageModel(id) {
    advertModel.getInfoAdvert(id);
  }
}

export const advertPageController = new AdvertPageController();
