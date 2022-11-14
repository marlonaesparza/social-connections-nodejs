const router = require('express').Router();
const RequestBusiness = require('./../business/request');


router.get('/all', (req, res) => {
  return RequestBusiness.getAllRequests(req, res);
});

router.post('/create', (req, res) => {
  return RequestBusiness.createRequest(req, res);
});

router.delete('/delete', (req, res) => {
  return RequestBusiness.deleteRequest(req, res);
});


module.exports = router;
