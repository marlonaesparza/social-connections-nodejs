const router = require('express').Router();
const RequestBusiness = require('./../business/request');


router.get('/all', (req, res) => {
  return RequestBusiness.getAllPosts(req, res);
});

router.post('/create', (req, res) => {
  return RequestBusiness.createPost(req, res);
});

router.delete('/delete', (req, res) => {
  return RequestBusiness.deletePost(req, res);
});


module.exports = router;
