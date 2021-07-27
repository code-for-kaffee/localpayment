const { QueryTypes } = require('sequelize');
const sequelize = require('../dB/sequelize');

const getUserAvailability = async (doc_number) => {
  const available = await sequelize.query(
    `SELECT * FROM users WHERE doc_number=${doc_number}`,
    {
      type: QueryTypes.SELECT,
    }
  );

  return available.length === 0 ? true : false;
};

module.exports = { getUserAvailability };
