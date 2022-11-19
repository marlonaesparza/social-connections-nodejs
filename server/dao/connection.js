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

  getAllConnections(uuid) {
    return Connection.findAll({
      where: {
        [Op.or]: [
          { aUUID: uuid },
          { rUUID: uuid }
        ]
      }
    })
      .then(results => {
        console.log('DAO Get All Connections (results):', results);
        const connections = results.map(({ dataValues }) => {
          if (dataValues.aUUID === uuid) {
            return dataValues.rUUID;

          } else if (dataValues.rUUID === uuid) {
            return dataValues.aUUID;
          };
        });

        return connections;
      })
      .catch(error => {
        console.log('DAO Get All Connections (error):', error);
        return;
      })
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
