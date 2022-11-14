const Request = require('../../database/models/request');
const { Op } = require('sequelize');


class RequestDAO {
  constructor() {
    this.findSentRequestStatus = this.findSentRequestStatus.bind(this);
    this.findAcceptRequestStatus = this.findAcceptRequestStatus.bind(this);
    this.findOneRequest = this.findOneRequest.bind(this);
    this.createRequest = this.createRequest.bind(this);
    this.deleteRequest = this.deleteRequest.bind(this);
    this.getAllRequests = this.getAllRequests.bind(this);
  };

  findSentRequestStatus({ aUUID, rUUID }) {
    return Request.findOne({
      where: {
        aUUID: aUUID,
        rUUID: rUUID
      }
    });
  };

  findAcceptRequestStatus({ aUUID, rUUID }) {
    return Request.findOne({
      where: {
        aUUID: aUUID,
        rUUID: rUUID
      }
    })
  };

  findOneRequest({ aUUID, rUUID }) {
    return Request.findOne({
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
      .then((result) => {
        console.log('Find One Request (result):', result);
        return result;
      })
      .catch((e) => {
        console.log('Fine One Request (error):', e);
        return {};
      })
  };

  getAllRequests({ aUUID, rUUID }) {
    //
  };

  createRequest({ aUUID, rUUID }) {
    return this.findOneRequest({ aUUID, rUUID })
      .then((result) => {
        if (result) {
          throw result;
        }
        
        return Request.create({ aUUID, rUUID});
      })
      .catch((e) => {
        console.log('Create Request DAO (error):', e);
        return {};
      });
  };

  deleteRequest({ aUUID, rUUID }) {
    return Request.destroy({
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


module.exports = new RequestDAO;
