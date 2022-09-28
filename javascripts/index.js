import '@babel/polyfill';
import { loginSignup, logout } from './login';
import { updateSettings } from './updateSettings';
import { comment, deleteComment } from './comment';
import { newPost, deletePost } from './post';
import { sendReq, acceptReq, rejectReq, deleteFriend } from './friend';
import { forgotPassword, resetPassword } from './forgotPassword';

// DOM
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const forgotPasswordForm = document.querySelector('.form--password');
const resetPasswordForm = document.querySelector('.form-reset-password');
const logOutBtn = document.querySelector('#logout-btn');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const commentPostForm = document.querySelector('.form-post-comment');
const deleteCommentBtn = document.querySelectorAll('.delete-comment');
const newPostForm = document.querySelector('.new__post-form');
const deletePostBtn = document.getElementById('delete-post');
const sendReqBtn = document.querySelector('.add-friends');
const acceptReqBtn = document.getElementById('accept-req');
const rejectReqBtn = document.getElementById('reject-req');
const deleteFriendBtn = document.querySelector('.remove-friends');

// DELEGATION
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loginSignup({ email, password }, 'login');
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('new-name').value;
    const email = document.getElementById('new-email').value;
    const password = document.getElementById('new-password').value;
    const passwordConfirm = document.getElementById(
      'new-passwordConfirm'
    ).value;

    loginSignup({ name, email, password, passwordConfirm }, 'signup');
  });
}

if (forgotPasswordForm) {
  forgotPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    await forgotPassword(email);

    document.getElementById('email').value = '';
  });
}

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const password = document.getElementById('reset-password').value;
    const passwordConfirm = document.getElementById(
      'reset-passwordConfirm'
    ).value;
    const token = window.location.pathname.split('/')[2];

    resetPassword(password, passwordConfirm, token);
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

if (deleteCommentBtn) {
  deleteCommentBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const { commentId } = e.target.dataset;

      deleteComment(commentId);
    });
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

if (sendReqBtn) {
  sendReqBtn.addEventListener('click', () => {
    const userId = window.location.pathname.split('/')[2];

    sendReq(userId);
  });
}

if (acceptReqBtn) {
  acceptReqBtn.addEventListener('click', (e) => {
    const { reqId } = e.target.dataset;

    acceptReq(reqId);
  });
}

if (rejectReqBtn) {
  rejectReqBtn.addEventListener('click', (e) => {
    const { reqId } = e.target.dataset;

    rejectReq(reqId);
  });
}

if (deleteFriendBtn) {
  deleteFriendBtn.addEventListener('click', () => {
    const friendId = window.location.pathname.split('/')[2];

    deleteFriend(friendId);
  });
}
