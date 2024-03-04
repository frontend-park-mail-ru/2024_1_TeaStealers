import LoginAndSignupLayout from './pages/loginAndSignupLayout/loginAndSignupLayout.js';
import mainPage from './.pages/main/main.js';

const root = document.querySelector('#app');

const login = new LoginAndSignupLayout(root, 'login');
login.render();
