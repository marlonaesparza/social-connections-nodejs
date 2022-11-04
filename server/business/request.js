const RequestDAO = require('./../dao/request');


class RequestBusiness {
  constructor() {
    this.createRequest = this.createRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.getAllRequests = this.getAllRequests.bind(this);
  }

  createRequest(req, res) {
    const requestInfo = req.body;
    console.log('RequestBusiness (Create Request):', requestInfo);
    return res.status(200).send({});
  }

  deleteRequest(req, res) {
    const requestInfo = req.body;
    console.log('RequestBusiness (Delete Request):', requestInfo);
    return res.status(200).send({});
  }

  getAllRequests(req, res) {
    const requestInfo = req.query;
    console.log('RequestBusiness (Get All Requests):', requestInfo);
    return res.status(200).send({});
  }
}


module.exports = new RequestBusiness;
