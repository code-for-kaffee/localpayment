const { QueryTypes } = require('sequelize');
const sequelize = require('../dBs/sequelize');
const { getUserAvailability } = require('../middleware/utilities');

const registerUser = async (req, res) => {
  try {
    const { name, doc_number } = req.body;
    await getUserAvailability(doc_number).then(async (available) => {
      if (available) {
        await register(name, doc_number).catch((err) => {
          return res
            .status(409)
            .send({ error: 'Error name or document number missing' });
        });
        const response = {
          status: 'user sucesfully registered',
        };
        return res
          .status(201)
          .send({ code: 'OK', message: `${response.status}` });
      } else {
        res.status(409).send({ error: 'Error user duplicated' });
      }
    });
  } catch (error) {
    throw res
      .status(409)
      .send({ error: 'Error name or document number duplicated' });
  }
};

const register = (name, doc_number) => {
  return sequelize.query(
    `INSERT INTO users ( name, doc_number, createdAt, updatedAt) 
          VALUES("${name}", "${doc_number}", CURRENT_DATE, CURRENT_DATE)`,
    { type: QueryTypes.INSERT }
  );
};

const deleteUser = async (req, res) => {
  try {
    const userExist = await getUserAvailability(req.params.doc_number);
    if (!userExist) {
      await sequelize
        .query(`DELETE FROM users WHERE doc_number=${req.params.doc_number}`, {
          type: QueryTypes.DELETE,
        })
        .then((resp) => {
          return res.status(201).send({ message: 'User sucessfully deleted' });
        });
    } else {
      return res
        .status(409)
        .send({ error: 'User doesnt exist, please try with another document' });
    }
  } catch (error) {
    throw res.status(500).send({ error: 'Unexpected error, try again later' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await sequelize.query(`SELECT * FROM users`, {
      type: QueryTypes.SELECT,
    });
    res.status(201).send(users);
  } catch (error) {
    throw res.status(204).send({ error: 'There are no users in this dB!' });
  }
};

const getUserByDocNumber = async (req, res) => {
  try {
    const user = await sequelize.query(
      `SELECT * FROM users WHERE doc_number=${req.params.doc_number}`,
      { type: QueryTypes.SELECT }
    );
    if (user.length > 0) {
      res.status(200).send(user);
    } else {
      res
        .status(400)
        .send({ error: 'Could not find user with that document number' });
    }
  } catch (error) {
    throw res.status(500).send({ error: 'Unknow error, try again later' });
  }
};

const editUser = async (req, res) => {
  try {
    const userExist = await getUserAvailability(req.params.doc_number);

    if (!userExist) {
      await sequelize
        .query(
          `UPDATE users SET name='${req.body.name}', updatedAt=CURRENT_DATE WHERE doc_number=${req.params.doc_number}`,
          { type: QueryTypes.UPDATE }
        )
        .then(res.status(200).send({ message: 'User sucesfully updated' }))
        .catch((err) => console.log(err));
    } else {
      throw res
        .status(400)
        .send({ error: 'Could not find user wit that document number' });
    }
  } catch (error) {
    throw res.status(500).send({ error: 'Unknow error, try again later' });
  }
};

module.exports = {
  registerUser,
  deleteUser,
  getAllUsers,
  getUserByDocNumber,
  editUser,
};
