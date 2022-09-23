import '@babel/polyfill';
import { login, logout } from './login';
import { updateSettings } from './updateSettings';
import { comment } from './comment';
import { newPost, deletePost } from './post';

// DOM
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('#logout-btn');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const commentPostForm = document.querySelector('.form-post-comment');
const newPostForm = document.querySelector('.new__post-form');
const deletePostBtn = document.getElementById('delete-post');

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

    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
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

if (commentPostForm) {
  // if comment btn click, focus on comment input
  document.getElementById('comment-btn').addEventListener('click', () => {
    document.getElementById('comment').focus();
  });

  commentPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const postId = window.location.pathname.split('/')[2];
    const newComment = document.getElementById('comment').value;

    comment(newComment, postId);
  });
}

if (newPostForm) {
  newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('.new__post-title').value;
    const body = document.querySelector('.new__post-body').value;

    newPost(title, body);
  });
}

if (deletePostBtn) {
  deletePostBtn.addEventListener('click', () => {
    const postId = window.location.pathname.split('/')[2];

    deletePost(postId);
  });
}
