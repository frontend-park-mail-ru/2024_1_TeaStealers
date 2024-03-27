// пусть модель прочитает и обновит данные
//  валидация данных и взаимодействие модели и вью

import { mainModel } from '@models';

class MainController {
    constructor() {
    }

    updateMainModel() {
        mainModel.updateState();
    }
}

export const mainControler = new MainController();