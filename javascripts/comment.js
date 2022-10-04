import axios from 'axios';
import { showAlert } from './alerts';

export const comment = async (comment, postId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/posts/${postId}/comments`,
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

export const deleteComment = async (commentId) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/comments/${commentId}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Comment deleted successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
