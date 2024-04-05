import { router } from '@modules';
import './index.scss';
import { mainView, advertView, profileView } from '@views';
import { mainControler } from '@controllers';
import { authModel } from '@models';

await authModel.checkAuthentication();

router.register('/', mainView);
router.register('/advert', advertView);
router.register('/profile', profileView);
router.start();

mainControler.updateMainModel();
