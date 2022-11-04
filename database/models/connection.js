const { connection, sequelize } = require('./../index');

const Connection = connection.define('Connection', {
  id: {
    type: sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    primaryKey: true
  },
  aUUID: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    unique: false
  },
  rUUID: {
    type: sequelize.DataTypes.STRING,
    allowNull: false,
    unique: false
  }
}, {
  tableName: 'connection'
});

Connection.sync({force: true})
  .then(() => {
    console.log('Connection table recreated successfully');
  })

module.exports = Connection;
