const router = require('express').Router();
const ConnectionBusiness = require('./../business/connection');


router.get('/all', (req, res) => {
  return ConnectionBusiness.getAllPosts(req, res);
});

router.post('/create', (req, res) => {
  return ConnectionBusiness.createPost(req, res);
});

router.delete('/delete', (req, res) => {
  return ConnectionBusiness.deletePost(req, res);
});


module.exports = router;
