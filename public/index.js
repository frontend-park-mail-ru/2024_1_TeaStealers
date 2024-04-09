import { router } from '@modules';
import './index.scss';
import {
  AdvertView, ComplexView,
  MainView, ProfileView,
} from '@views';
import { authModel } from '@models';
import { NavbarView } from './views/navbarView';

const navbar = new NavbarView();
navbar.render();
router.register('/', MainView);
router.register('/profile/', ProfileView);
router.register('/adverts/', AdvertView);
router.register('/complex/', ComplexView);
router.start();
document.addEventListener('DOMContentLoaded', authModel.checkAuthentication.bind(authModel));
