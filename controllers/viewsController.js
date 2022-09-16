exports.getHome = (req, res) => {
  res.status(200).render('home', {
    title: 'Home',
  });
};

exports.getPost = (req, res) => {
  res.status(200).render('post', {
    title: 'Post',
  });
};
