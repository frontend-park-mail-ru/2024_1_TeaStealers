import { router } from '@modules';
import './index.scss';
import {
  AdvertView, ComplexView,
  MainView, ProfileView,
  NewAdvertView, MyAdvertView,
  EditAdvertView, NavbarView,
  ErrorView,
} from '@views';
import { authModel } from '@models';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/' })
    .then((reg) => {
      console.log('SW register', reg);
    })
    .catch((e) => {
      console.log('SW error', e);
    });
}

const navbar = new NavbarView();
navbar.render();
router.register('/', MainView);
router.register('/error', ErrorView);
router.register('/profile/', ProfileView, true);
router.register('/adverts/', AdvertView);
router.register('/complex/', ComplexView);
router.register('/new-advert/', NewAdvertView, true);
router.register('/my-advert/', MyAdvertView, true);
router.register('/edit-advert/', EditAdvertView, true);
router.start();
document.addEventListener('DOMContentLoaded', authModel.checkAuthentication.bind(authModel));
