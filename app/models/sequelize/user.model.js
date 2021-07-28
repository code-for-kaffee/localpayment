const Sequelize = require('sequelize');
const sequelize = require('../../dBs/sequelize');
const User = sequelize.define('user', {
  name: { type: Sequelize.STRING, allowNull: false },

  doc_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },

  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
});
module.exports = User;
