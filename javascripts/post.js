import axios from 'axios';
import { showAlert } from './alerts';

export const newPost = async (title, body) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/posts',
      data: {
        title,
        body,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Post created successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deletePost = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `/api/v1/posts/${id}`,
    });

    if (res.status === 204) {
      showAlert('success', 'Post deleted successfully!');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
