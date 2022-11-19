const router = require('express').Router();
const ConnectionBusiness = require('./../business/connection');

router.get('/getAllConnections', (req, res) => {
  return ConnectionBusiness.getAllConnections(req, res);
});

router.get('/connectionStatus', (req,res) => {
  return ConnectionBusiness.getConnectionStatus(req, res);
});

router.post('/create', (req, res) => {
  return ConnectionBusiness.createConnection(req, res);
});

router.delete('/delete', (req, res) => {
  return ConnectionBusiness.deleteConnection(req, res);
});


module.exports = router;
