const RequestDAO = require('./../dao/request');


class RequestBusiness {
  constructor() {
    this.createRequest = this.createRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.getAllRequests = this.getAllRequests.bind(this);
  }

  createRequest(req, res) {
    const requestInfo = req.body;
    return RequestDAO.createRequest(requestInfo)
      .then(({ dataValues }) => {
        console.log('Create Request Result (Business):', dataValues);
        return res.status(201).send(dataValues);
      })
      .catch((e) => {
        console.log('ERROR Create Request (Business):', e);
        return res.status(401).send({});
      })
  }

  deleteRequest(req, res) {
    console.log('RequestBusiness (Delete Request):', req.body);
    const requestInfo = req.body; 

    return RequestDAO.deleteRequest(requestInfo)
      .then((result) =>{
        console.log('Delete Request (Result):', result);
        return res.status(200).send({ aUUID: requestInfo.aUUID});
      })
      .catch((e) => {
        console.log('Delete Request (Business):', e);
        return res.status(400).send();
      })
  }

  getAllRequests(req, res) {
    const requestInfo = req.query;
    console.log('RequestBusiness (Get All Requests):', requestInfo);
    return res.status(200).send({});
  }
}


module.exports = new RequestBusiness;
