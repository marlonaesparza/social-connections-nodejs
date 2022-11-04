const ConnectionDAO = require('./../dao/connection');


class ConnectionBusiness {
  constructor() {
    this.createConnection = this.createConnection.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
    this.getAllConnections = this.getAllConnections.bind(this);
  }

  createConnection(req, res) {
    const connectionInfo = req.body;
    console.log('ConnectionBusiness (Create Request):', connectionInfo);
    return res.status(200).send({});
  };

  deleteConnection(req, res) {
    const connectionInfo = req.body;
    console.log('ConnectionBusiness (Delete Request):', connectionInfo);
    return res.status(200).send({});
  };

  getAllConnections(req, res) {
    const connectionInfo = req.query;
    console.log('ConnectionBusiness (Get All Requests):', connectionInfo);
    return res.status(200).send({});
  };
}


module.exports = new ConnectionBusiness;
