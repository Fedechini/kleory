import axios from 'axios';
import { showAlert } from './alerts';

// action = 'login' || 'signup'
export const loginSignup = async (data, action) => {
  try {
    const url =
      action === 'login' ? '/api/v1/users/login' : '/api/v1/users/signup';

    const res = await axios({
      method: 'POST',
      url,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `${action.toUpperCase()} succesfull`);
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout',
    });

    if ((res.data.status = 'success')) location.reload(true);
  } catch (err) {
    showAlert('error', 'Error logging out! Try again.');
  }
};
