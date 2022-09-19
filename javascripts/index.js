import '@babel/polyfill';
import { login } from './login';

// DOM
const loginForm = document.querySelector('.form');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
