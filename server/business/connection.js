const ConnectionDAO = require('./../dao/connection');
const RequestDAO = require('./../dao/request');


class ConnectionBusiness {
  constructor() {
    this.getAllConnections = this.getAllConnections.bind(this);
    this.getConnectionStatus = this.getConnectionStatus.bind(this);
    this.createConnection = this.createConnection.bind(this);
    this.deleteConnection = this.deleteConnection.bind(this);
  }

  //-----------------------------------------------------------
  /*
    GET ALL CONNECTIONS

    SUMMARY
      - Gets all uuids for all connections.

    PARAMS
      - uuid = the uuid of user sending request
  */
  getAllConnections(req, res) {
    return ConnectionDAO.getAllConnections(req.query.uuid)
      .then(connections => {
        console.log('BUSINESS Get All Connections (results):', connections);
        return res.status(200).send(connections);
      })
      .catch(error => {
        return res.status(400).send();
      });
  };

  //-----------------------------------------------------------

  //-----------------------------------------------------------
  /*
    GET CONNECTION STATUS

    SUMMARY
      - Checks the status of each potential connection a user can have.
      - Updates list of pConnections with a status field: pending, accept, friends, add

    PARAMS
      - userUUID = the uuid of user sending request
      - pConnections = all potential connections for user to add as friend
      
  */
  async getConnectionStatus(req, res) {
    const { userUUID, pConnections } = req.query;
    const pConnectionsWithStatuses = [];

    try {
      for(const connection of pConnections) {
        let transformedConnection;
        const parsedConnection = JSON.parse(connection);
        const { uuid } = parsedConnection;
        const sentRequestExist = await RequestDAO.findSentRequestStatus({aUUID: uuid, rUUID: userUUID});
        const acceptRequestExist = await RequestDAO.findAcceptRequestStatus({aUUID: userUUID, rUUID: uuid})
        const connectionExist = await ConnectionDAO.findOneConnection({aUUID: uuid, rUUID: userUUID});
  
        if (sentRequestExist) {
          transformedConnection = {
            ...parsedConnection,
            status: 'pending'
          };
          pConnectionsWithStatuses.push(transformedConnection);
  
        } else if(acceptRequestExist) {
          transformedConnection = {
            ...parsedConnection,
            status: 'accept'
          };
          pConnectionsWithStatuses.push(transformedConnection);
  
        } else if(connectionExist) {
          transformedConnection = {
            ...parsedConnection,
            status: 'delete'
          };
          pConnectionsWithStatuses.push(transformedConnection);
  
        } else {
          transformedConnection = {
            ...parsedConnection,
            status: 'add'
          }
          pConnectionsWithStatuses.push(transformedConnection);
        }
      }
      return res.status(200).send(pConnectionsWithStatuses);

    } catch (e) {
      console.log('Error: getConnectionStatus:', e);
      return res.status(500).send([]);
    }
  };
  
  //-----------------------------------------------------------

  async createConnection(req, res) {
    console.log('Create Connection (body)):', req.body);
    const connectionInfo = req.body;
    const { aUUID, rUUID } = connectionInfo;

    try {
      const { dataValues } = await ConnectionDAO.createConnection({ aUUID, rUUID });
      console.log('Create Connection (result):', dataValues);
      return res.status(201).send({ rUUID: dataValues.rUUID });

    } catch (e) {
      return res.status(400).send({});
    }
  };

  //-----------------------------------------------------------

  async deleteConnection(req, res) {
    console.log('Delete Connection (body)):', req.body);
    const connectionInfo = req.body;
    const { aUUID, rUUID } = connectionInfo;

    try {
      const result = await ConnectionDAO.deleteConnection({ aUUID, rUUID });
      console.log('Create Connection (result):', result);
      return res.status(201).send({ rUUID });

    } catch (e) {
      return res.status(400).send({});
    }
  };

}


module.exports = new ConnectionBusiness;
