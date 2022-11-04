const { connection, sequelize } = require('./../index');

const Request = connection.define('Request', {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  rUUID: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  aUUID: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    unique: false
  }
}, {
  tableName: 'request'
});

Request.sync({force: true})
  .then(() => {
    console.log('Request table recreated successfully');
  })

module.exports = Request;
