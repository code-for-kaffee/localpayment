const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USERNAME,
  process.env.MYSQL_ROOT_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_LOCAL_PORT,
  }
);

module.exports = sequelize;
