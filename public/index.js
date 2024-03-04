import LoginAndSignupLayout from './pages/loginAndSignupLayout/loginAndSignupLayout.js';

const root = document.querySelector('#app');

const login = new LoginAndSignupLayout(root, 'login');
login.render();
