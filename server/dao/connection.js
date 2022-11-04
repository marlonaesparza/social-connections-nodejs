const Connection = require('../../database/models/connection');


class ConnectionDAO {
  constructor() {
    this.createConnection = this.createConnection.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
    this.getAllConnections = this.getAllConnections.bind(this);
  };

  getAllConnections({ pUUID, rUUID }) {
    //
  };

  createConnection({ pUUID, rUUID }) {
    //
  };

  deleteConnection({ pUUID, rUUID }) {
    //
  };
};


module.exports = new ConnectionDAO;
