const Connection = require('../../database/models/connection');
const RequestDAO = require('../dao/request');
const { Op } = require('sequelize');


class ConnectionDAO {
  constructor() {
    this.getAllConnections = this.getAllConnections.bind(this);
    this.findOneConnection = this.findOneConnection.bind(this);
    this.createConnection = this.createConnection.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  };

  getAllConnections({ aUUID, rUUID }) {
    //
  };

  findOneConnection({ aUUID, rUUID }) {
    return Connection.findOne({
      where: {
        [Op.or]: [
          {
            aUUID: aUUID,
            rUUID: rUUID
          },
          {
            aUUID: rUUID,
            rUUID: aUUID
          }
        ]
      }
    })
  };

  createConnection({ aUUID, rUUID }) {
    return RequestDAO.deleteRequest({ aUUID, rUUID})
      .then((result) => {
        if (!result) {
          throw result;
        }
        return Connection.create({ aUUID, rUUID })
      })
  };

  deleteConnection({ aUUID, rUUID }) {
    return Connection.destroy({ 
      where: {
        [Op.or]: [
          {
            aUUID: aUUID,
            rUUID: rUUID
          },
          {
            aUUID: rUUID,
            rUUID: aUUID
          }
        ]
      }
    });
  };
};


module.exports = new ConnectionDAO;
