import axios from 'axios';
import { showAlert } from './alerts';

export const sendReq = async (userId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/friends`,
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
      url: `/api/v1/friends/acceptFriend/${reqId}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Request accepted successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const rejectReq = async (reqId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/friends/rejectFriend/${reqId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Request rejected successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteFriend = async (friendId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/friends/deleteFriend/${friendId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Friend deleted successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
