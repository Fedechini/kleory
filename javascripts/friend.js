import axios from 'axios';
import { showAlert } from './alerts';

export const sendReq = async (userId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/friends`,
      data: {
        to: userId,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request sent successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const acceptReq = async (reqId) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://127.0.0.1:3000/api/v1/friends/acceptFriend/${reqId}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request accepted successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
