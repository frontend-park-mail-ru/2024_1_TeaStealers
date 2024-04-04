import { Router } from '@modules';
import './index.scss';
import { mainView, advertView } from '@views';
import { mainControler } from '@controllers';

// создаю роутер и регаю роуты, создаю вьюшки и контроллеры, потом старт роутера

const router = new Router();

router.register('/', mainView);
router.register('/advert', advertView);
router.start();

mainControler.updateMainModel();
