const Request = require('../../database/models/connection');


class RequestDAO {
  constructor() {
    this.createRequest = this.createRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.getAllRequests = this.getAllRequests.bind(this);
  };

  getAllRequests({ pUUID, rUUID }) {
    //
  };

  createRequest({ pUUID, rUUID }) {
    //
  };

  deleteRequest({ pUUID, rUUID }) {
    //
  };
};


module.exports = new RequestDAO;
