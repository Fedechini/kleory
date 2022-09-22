import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';

// DOM
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('#logout-btn');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateSettings({ name, email }, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save--password').innerHTML = 'Updating...';

    const currentPassword = document.getElementById('password-current').value;
    const password = document.getElementById('password-new').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { currentPassword, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save--password').innerHTML = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password-new').value = '';
    document.getElementById('password-confirm').value = '';
  });
}
