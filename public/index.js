import MainPage from './pages/main/main.js';
import { checkAuth } from './modules/api.js';

let isAuthenticated = false;

async function checkAuthentication() {
  const [statusCode, data] = await checkAuth();

  if (statusCode === 200) {
    console.log(data);
    isAuthenticated = true;
    return;
  }
  isAuthenticated = false;
}
checkAuthentication()
  .then(() => {
    const main = new MainPage(document.getElementById('app'), { isAuthenticated });
    main.render();
  });
