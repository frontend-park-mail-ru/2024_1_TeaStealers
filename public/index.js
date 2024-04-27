import { router } from '@modules';
import './index.scss';
import {
  CsatView,
} from '@views';
import { authModel } from '@models';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/' })
    .then((reg) => {
    })
    .catch((e) => {
    });
}

router.register('/csat/', CsatView);
router.start();
document.addEventListener('DOMContentLoaded', authModel.checkAuthentication.bind(authModel));
