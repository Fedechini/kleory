import axios from 'axios';
import { showAlert } from './alerts';

export const newPost = async (title, body) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:3000/api/v1/posts`,
      data: {
        title,
        body,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Post created successfully!');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
