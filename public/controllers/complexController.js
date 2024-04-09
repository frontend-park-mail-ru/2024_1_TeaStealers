import { complexModel } from '@models';

class AdvertPageController {
  updateComplexModel(id) {
    complexModel.getInfoComplex(id);
  }
}

export const advertPageController = new AdvertPageController();
