import axios from 'axios';
import { showAlert } from './alerts';

export const comment = async (comment, postId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/posts/${postId}/comments`,
      data: {
        comment,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Comment added successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
