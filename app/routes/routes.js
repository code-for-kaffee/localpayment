const router = require('express').Router();

const {
  registerUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUserByDocNumber,
} = require('../controllers/users');
const version = 'api/v1';

router.post(`/${version}/register`, registerUser);
router.get(`/${version}/users`, getAllUsers);
router.get(`/${version}/user/:doc_number`, getUserByDocNumber);
router.put(`/${version}/user/:doc_number`, editUser);
router.delete(`/${version}/user/:doc_number`, deleteUser);

module.exports = router;
